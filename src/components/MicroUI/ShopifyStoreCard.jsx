import { useContext, useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext';
import Tag from './CheckoutComponents/Tag';
import { calculateFinalCart, getTotal } from '../../helper/QuantityHelper';
import RightArrowIcon from '../Icons/RightArrowIcon';
import Box from '/src/components/Icons/Box.svg';
import { sendEvent } from '../../helper/EventTracker';
import PropTypes from 'prop-types';

const ShopifyStoreCard = () => {
  const { globalState } = useContext(ProductContext);
  const store = globalState.selectedVariant.pricesFromStores.filter(
    (store) => store.storeId === 'shopify'
  )[0];
  const OutofStock = globalState.selectedVariant.availability.currentStock === 0;
  const brandData = globalState.brandData;
  const theme = {
    solid: '#2D2D2D',
    outline: '#2D2D2D',
    ...globalState.theme,
  };

  useEffect(() => {}, [globalState]);

  return (
    <div className="w-full border-y-[1px] border-zinc-100 flex flex-col justify-between gap-1 pb-4">
      <div className="flex gap-4 justify-between">
        <Tag title="BEST DEAL" />
        <div className="lg:hidden">
          <CouponCard />
        </div>
      </div>
      <div className="flex justify-between items-center lg:items-end">
        <div className="flex flex-col gap-2 justify-start">
          <div className="flex gap-2 items-center">
            <img src={brandData.logo.url} className="w-20 h-16 object-contain" />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <div className="hidden lg:flex">
            <CouponCard1 />
          </div>
          <div className="flex justify-end items-center gap-3 storeCard">
            <div className="flex flex-col items-end">
              <p className="text-[14px] font-semibold text-red-500">
                {calculateFinalCart(store, getTotal(globalState.cartItems, store)).msg}
              </p>
              <del className="text-[14px] font-normal text-zinc-400 leading-3">
                {globalState.currency}
                {getTotal(globalState.cartItems, store).totalCostPrice}
              </del>
            </div>
            <p className="text-3xl font-semibold">
              {globalState.currency}
              {calculateFinalCart(store, getTotal(globalState.cartItems, store)).finalPrice}
            </p>
          </div>
        </div>
        <button
          className="hidden bg-black text-white rounded-md font-semibold lg:flex justify-center items-center gap-3 w-32 h-14 disabled:bg-zinc-500"
          id="checkOut1"
          disabled={OutofStock}
          style={{
            backgroundColor: OutofStock ? '#8c8c8c' : theme.solid,
            color: theme.text,
          }}
          onClick={() => {
            sendEvent('Click_Brand_Card_Checkout');
            window.location = globalState.storesData.Shopify.redirectionURL;
          }}
        >
          Buy
          <RightArrowIcon />{' '}
        </button>
      </div>

      <div className="flex justify-between items-center gap-3 lg:gap-9 lg:mt-3 w-full">
        <ShippingCard shipping={brandData.shipping} shippingIncluded={store.shippingIncluded} />
        <button
          className="lg:hidden bg-black text-white rounded-md font-semibold flex justify-center items-center gap-3 w-32 h-14"
          id="checkOut2"
          disabled={OutofStock}
          style={{
            backgroundColor: OutofStock ? '#8c8c8c' : theme.solid,
            color: theme.text,
          }}
          onClick={() => {
            sendEvent('Click_Brand_Card_Checkout');
            window.location = globalState.storesData.Shopify.redirectionURL;
          }}
        >
          Buy
          <RightArrowIcon />{' '}
        </button>
      </div>
    </div>
  );
};

const CouponCard = () => {
  return (
    <div className="flex items-center p-1 rounded-md border-dashed border-[1px] border-[#B7E2CD] mt-2">
      <div className="flex items-center">
        <p className="text-[10px] text-[#0F9F5A] px-2 ">Coupon applied</p>
        <p className="text-[10px] text-[#0F9F5A] px-2 font-semibold border-dashed border-l-[1px] border-[#B7E2CD]">
          XYZDR
        </p>
      </div>
    </div>
  );
};

const CouponCard1 = () => {
  return (
    <div className=" flex items-center p-1 rounded-md border-dashed border-[1px] border-[#B7E2CD] mt-2">
      <div className="flex items-center">
        <p className="text-[10px] text-[#0F9F5A] px-2 ">Coupon applied</p>
        <p className="text-[10px] text-[#0F9F5A] px-2 font-semibold border-dashed border-l-[1px] border-[#B7E2CD]">
          XYZDR
        </p>
      </div>
    </div>
  );
};

export default ShopifyStoreCard;

const ShippingCard = ({ shipping, shippingIncluded }) => {
  return (
    <div className="flex justify-between items-center gap-3 lg:gap-9">
      <div className="bg-blue-50 lg:bg-white bg-opacity-60 flex items-center p-2 rounded-md border-dashed border-[1px] border-[#9FD5ECE5] h-14 lg:h-8">
        <div className="pr-2 border-dashed border-r-[1px] border-blue-200">
          <img src={Box} className="w-6 h-6" />
        </div>
        <div className="pl-4 lg:flex items-center gap-6">
          <p className="text-[10px] font-semibold text-[#2193C2E5]">
            Delivery in {shipping.minDelivery}-{shipping.maxDelivery} days
          </p>
          <p className="text-[8px] lg:text-[10px] text-[#2193C2E5]">
            {shippingIncluded ? 'Free Shipping' : 'Shipping Extra'}
          </p>
        </div>
      </div>
    </div>
  );
};

ShippingCard.propTypes = {
  shipping: PropTypes.object,
  shippingIncluded: PropTypes.object,
};
