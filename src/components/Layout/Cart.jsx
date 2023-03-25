import cross from '../../assets/utility/cross.png';
import truck from '../../assets/utility/truck.png';
import { useContext, useEffect, useState } from 'react';
import Payment from './Payment';
import PropTypes from 'prop-types';
import { ProductContext } from '../../context/ProductContext';
import {
  calculateFinalCart,
  calculateTotalItems,
  getTotalMultiProduct,
} from '../../helper/QuantityHelper';
import AmazonCheckout from '../MicroUI/AmazonCheckout';
import ShopifyCheckout from '../MicroUI/ShopifyCheckout';
import CartItem from '../MicroUI/CartItem';

function Cart({ setOpenCart }) {
  const [open, setOpen] = useState(false);
  const { globalState } = useContext(ProductContext);
  const Amazon = globalState.selectedStore === 'Amazon';
  const store = Amazon ? globalState.storesData.Amazon : globalState.storesData.Shopify;
  const [priceDetails, setPriceDetails] = useState({
    totalSellingPrice: 0,
    totalCostPrice: 0,
    totalMRP: 0,
    totalSavings: 0,
    ts2: 0,
  });
  let ids = [];

  useEffect(() => {
    let { totalSavings } = calculateFinalCart(
      store,
      getTotalMultiProduct(globalState.multiProductCart)
    );

    let { totalSellingPrice, totalCostPrice } = getTotalMultiProduct(globalState.multiProductCart);
    if (globalState.multiProductCart.length === 0) {
      handleCart(false);
    } else {
      if (!Amazon) {
        let { finalPrice, additionalSaving } = calculateFinalCart(
          store,
          getTotalMultiProduct(globalState.multiProductCart)
        );
        console.log(
          {
            totalSellingPrice,
            totalCostPrice,
            totalSavings,
            finalPrice,
            additionalSaving,
          },
          'allll'
        );
        setPriceDetails({
          totalSellingPrice,
          finalPrice,
          totalCostPrice,
          totalSavings,
          additionalSaving,
        });
      } else {
        console.log('Amazon', { totalSellingPrice, totalCostPrice, totalSavings });
        setPriceDetails({
          finalPrice: totalSellingPrice,
          totalSellingPrice,
          totalCostPrice,
          totalSavings,
        });
      }
    }
  }, [globalState]);

  const handleCart = (value) => {
    setOpenCart(value);
    if (value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  };

  return (
    <div className="w-full bg-black bg-opacity-70 lg:flex lg:w-screen">
      <div className="w-full h-screen" onClick={() => handleCart(false)}></div>
      <div
        className={`w-full bg-white rounded-t-2xl lg:w-[40%] lg:rounded-tr-none lg:rounded-l-lg`}
      >
        <div className="rounded-t-2xl py-4 flex flex-col gap-3 border-b-[1px] border-zinc-100">
          <div className="flex justify-between items-center px-4 text-[14px]">
            <p>Cart Summary</p>
            <img className="" src={cross.src} onClick={() => handleCart(false)} />
          </div>
          <div className="flex items-center gap-2 px-4 ">
            {calculateTotalItems(
              globalState.multiProductCart.length > 0
                ? globalState.multiProductCart
                : globalState.cartItems
            )}{' '}
            total
            <p className="font-semibold">
              {globalState.currency}
              {parseFloat(priceDetails.finalPrice).toFixed()}
            </p>
          </div>
        </div>
        <div className="h-[50vh] lg:h-[75vh] overflow-scroll">
          <div className="">
            {globalState.multiProductCart.map((item) => {
              if (!ids.includes(item.productId)) {
                ids.push(item.productId);
                return <CartItem details={item} key={item.pid} />;
              }
            })}
          </div>
          <div className="flex p-4 px-6 items-center gap-8 border-b-[1px] border-zinc-100">
            <img src={truck.src} />
            <p className="text-xs font-light text-zinc-400">
              Usually delivered in 2-3 Business days
            </p>
          </div>

          <div className="px-6">
            <div className="py-2 border-b-[1px] border-zinc-100">
              <p>Bill Details</p>
            </div>

            <div className="py-6 border-b-[1px] border-zinc-100">
              <div className="flex items-center justify-between text-xs">
                <p className="font-light text-zinc-400">Item total</p>
                <p className="font-medium text-zinc-400">
                  {globalState.currency} {parseFloat(priceDetails.totalCostPrice)}
                </p>
              </div>
              {store && (
                <div className="flex items-center justify-between text-xs">
                  <p className="font-light text-zinc-400">
                    Discount Applied{' '}
                    <span className="font-semibold">{store.couponApplied.code}</span>
                  </p>
                  <p className="font-medium text-zinc-400">
                    - {globalState.currency} {parseFloat(priceDetails.totalSavings).toFixed()}
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between text-xs">
                <p className="font-light text-zinc-400">Shipping charges</p>
                <p className="font-medium text-zinc-400">Extra</p>
              </div>
            </div>
            <div className="py-2">
              <div className="flex items-center justify-between text-xs">
                <p className="font-light text-zinc-700">Bill Total</p>
                <p className="font-medium text-zinc-800">
                  {globalState.currency} {parseFloat(priceDetails.finalPrice).toFixed()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full lg:bottom-0 ">
          {Amazon ? (
            <AmazonCheckout priceDetails={priceDetails} />
          ) : (
            <ShopifyCheckout priceDetails={priceDetails} setOpen={setOpen} />
          )}
        </div>

        <div className={`hidden lg:grid ${open ? 'visible' : 'invisible'}`}>
          <Payment setClose={setOpen} hideHeader />
        </div>
        <div
          className={`lg:hidden ease-in-out absolute w-full bg-black bg-opacity-70 bottom-0 ${
            open ? 'visible' : 'invisible'
          }`}
        >
          <div
            className={`ease-in-out ${
              open ? 'translate-y-0 lg:translate-x-0' : 'translate-y-full lg:translate-x-full'
            }`}
          >
            <Payment setClose={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  setOpenCart: PropTypes.func,
};

export default Cart;
