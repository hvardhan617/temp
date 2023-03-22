import PropTypes from 'prop-types';
import Payment from './Payment';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import {
  getTotal,
  calculateTotalItems,
  calculateFinalCart,
  getTotalMultiProduct,
} from '../../helper/QuantityHelper';
import AmazonCheckout from '../MicroUI/AmazonCheckout';
import ShopifyCheckout from '../MicroUI/ShopifyCheckout';
import DealsModal from '../Modal/DealsModal';
import { PercentageIcon } from '../Icons/PercentageIcon';
import CartStrip from '../MicroUI/CartStrip';
import BestDealStrip from '../MicroUI/BestDealStrip';

const BottomBar = ({ setOpenCart }) => {
  const [open, setOpen] = useState(false);
  const [openDeals, setOpenDeals] = useState(false);
  const [priceDetails, setPriceDetails] = useState({
    totalSellingPrice: 0,
    totalCostPrice: 0,
    totalSavings: 0,
    additionalSaving: 0,
    finalPrice: 0,
  });

  const [additionalSaving, setAdditionalSaving] = useState(0);
  const { globalState } = useContext(ProductContext);
  const Amazon = globalState.selectedStore === 'Amazon';
  const store = Amazon ? globalState.storesData.Amazon : globalState.storesData.Shopify;
  let stores = globalState.selectedVariant.pricesFromStores;
  let amazonExist = stores.filter((store) => store.storeId === 'amazon');
  let shopifyStorePrice = stores.filter((str) => str.storeId === 'shopify')[0];

  useEffect(() => {
    let cartItems = globalState.cartItems;
    if (globalState.multiProductCart.length > 0) {
      cartItems = globalState.multiProductCart;
      let { totalSellingPrice, totalCostPrice, totalSavings } = getTotalMultiProduct(cartItems);
      let { finalPrice, additionalSaving } = calculateFinalCart(
        store,
        getTotalMultiProduct(globalState.multiProductCart)
      );
      setPriceDetails({
        totalSellingPrice,
        finalPrice,
        totalCostPrice,
        totalSavings,
        additionalSaving,
      });
      return;
    }

    let { totalSellingPrice, totalCostPrice, totalSavings } = getTotal(
      cartItems,
      shopifyStorePrice
    );

    if (!Amazon) {
      let {
        finalPrice,
        additionalSaving,
        totalSavings: ts2,
      } = calculateFinalCart(store, getTotal(cartItems, shopifyStorePrice));
      setPriceDetails({
        totalSellingPrice,
        finalPrice,
        totalCostPrice,
        totalSavings,
        additionalSaving,
      });
      setAdditionalSaving(ts2);
    }
  }, [globalState]);

  useEffect(() => {
    document.body.style.overflow = openDeals ? 'hidden' : 'scroll';
  }, [openDeals]);

  const handleCart = (value) => {
    setOpenCart(value);
    if (value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  };

  return (
    <div className="w-full bg-white fixed bottom-0 shadow-2xl shadow-zinc-700 border-t-[1px] border-zinc-100 flex justify-center z-20">
      <div
        className={`w-full flex flex-col lg:flex-row lg:max-w-[1800px] ${
          setOpenCart ? 'lg:justify-center lg:gap-10 w-full' : 'lg:w-[90vw] lg:justify-between'
        }`}
      >
        <div className="hidden lg:flex items-center justify-between lg:w-[32vw] lg:max-w-[768px] xl:w-[36vw] xl:max-w-[768px]">
          <div className="px-4">
            <p className="text-xs">Cart Summary</p>
            <p className="text-xs font-semibold mt-2">
              {calculateTotalItems(globalState.cartItems)} total
            </p>
          </div>
          <div className={`${additionalSaving > 0 ? 'visible' : 'invisible'}`}>
            <div className="border-dashed border-[1px] border-[#B7E2CD] text-[#0F9F5A] flex items-center gap-4 text-xs w-56 p-3 rounded-lg">
              <div>
                <PercentageIcon />
              </div>
              {false && (
                <div className="border-l-[1px] border-[#5B873A] px-4 ">
                  <p>
                    Deal applied:{' '}
                    <span className="font-semibold">
                      {store.couponApplied ? store.couponApplied.code : null}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Savings {globalState.currency}
                    {additionalSaving}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {!globalState.multi && amazonExist.length > 0 && (
          <BestDealStrip setOpenDeals={setOpenDeals} store={store} />
        )}

        {globalState.multi && globalState.multiProductCart.length > 0 && (
          <CartStrip
            handleCart={handleCart}
            items={calculateTotalItems(globalState.multiProductCart)}
          />
        )}

        <div className={`w-full lg:max-w-[850px] ${setOpenCart ? 'lg:w-[36vw]' : 'lg:w-[45vw]'}`}>
          {Amazon ? (
            <AmazonCheckout priceDetails={priceDetails} />
          ) : (
            <ShopifyCheckout priceDetails={priceDetails} setOpen={setOpen} />
          )}
        </div>
        <div
          className={`lg:hidden ease-in-out absolute w-full bg-black bg-opacity-70 bottom-0 ${
            open ? 'visible' : 'invisible'
          }`}
        >
          <div className="w-full h-screen" onClick={() => setOpen(false)}></div>
          <div
            className={`ease-in-out ${
              open ? 'translate-y-0 lg:translate-x-0' : 'translate-y-full lg:translate-x-full'
            }`}
          >
            <Payment setClose={setOpen} />
          </div>
        </div>
        <div
          className={`lg:hidden ease-in-out absolute w-full bg-black bg-opacity-70 bottom-0 ${
            openDeals ? 'visible' : 'invisible'
          }`}
        >
          <div className="w-full h-screen" onClick={() => setOpenDeals(false)}></div>

          <div
            className={`ease-in-out ${
              openDeals ? 'translate-y-0 lg:translate-x-0' : 'translate-y-full lg:translate-x-full'
            }`}
          >
            <DealsModal setCloseDeals={setOpenDeals} />
          </div>
        </div>
        <div
          className={`hidden lg:flex justify-end bottom-0 ease-in-out absolute w-full h-screen   ${
            open ? 'visible' : 'invisible'
          }`}
        >
          <div
            className="w-screen h-screen bg-black bg-opacity-70"
            onClick={() => setOpen(false)}
          ></div>

          <div
            className={`   ease-in-out w-[30%] h-screen bg-white right-0 ${
              open ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <Payment setClose={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

BottomBar.propTypes = {
  setOpenCart: PropTypes.func,
};

export default BottomBar;
