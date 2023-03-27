import { useContext, useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext';
import Tag from './CheckoutComponents/Tag';
import { calculateFinalCart, getTotal } from '../../helper/QuantityHelper';
import RightArrowIcon from '../Icons/RightArrowIcon';
import Box from '@/components/Icons/Box.svg';
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
      <div className="flex justify-between gap-4">
        <Tag title="BEST DEAL" />
        <div className="lg:hidden">
          <CouponCard />
        </div>
      </div>
      <div className="flex items-center justify-between lg:items-end">
        <div className="flex flex-col justify-start gap-2">
          <div className="flex items-center gap-2">
            <img src={brandData.logo.url} className="object-contain w-20 h-16" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="hidden lg:flex">
            <CouponCard1 />
          </div>
          <div className="flex items-center justify-end gap-3 storeCard">
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
          className="items-center justify-center hidden w-32 gap-3 font-semibold text-white bg-black rounded-md lg:flex h-14 disabled:bg-zinc-500"
          id="checkOut1"
          disabled={OutofStock}
          style={{
            backgroundColor: OutofStock ? '#8c8c8c' : theme.solid,
            color: theme.text,
          }}
          onClick={() => {
            sendEvent('Click_Brand_Card_Checkout');
            window.location = globalState.checkoutDetails.web_url;
          }}
        >
          Buy
          <RightArrowIcon />{' '}
        </button>
      </div>

      <div className="flex items-center justify-between w-full gap-3 lg:gap-9 lg:mt-3">
        <ShippingCard shipping={brandData.shipping} shippingIncluded={store.shippingIncluded} />
        <button
          className="flex items-center justify-center w-32 gap-3 font-semibold text-white bg-black rounded-md lg:hidden h-14"
          id="checkOut2"
          disabled={OutofStock}
          style={{
            backgroundColor: OutofStock ? '#8c8c8c' : theme.solid,
            color: theme.text,
          }}
          onClick={() => {
            sendEvent('Click_Brand_Card_Checkout');
            window.location = globalState.checkoutDetails.web_url;
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
    <div className="flex items-center justify-between gap-3 lg:gap-9">
      <div className="bg-blue-50 lg:bg-white bg-opacity-60 flex items-center p-2 rounded-md border-dashed border-[1px] border-[#9FD5ECE5] h-14 lg:h-8">
        <div className="pr-2 border-dashed border-r-[1px] border-blue-200">
          <img src={Box.src} className="w-6 h-6" />
        </div>
        <div className="items-center gap-6 pl-4 lg:flex">
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
  shippingIncluded: PropTypes.bool,
};
