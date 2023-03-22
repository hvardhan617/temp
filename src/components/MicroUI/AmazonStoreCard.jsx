import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import Tag from './CheckoutComponents/Tag';
import { getTotal, calculatePercentage } from '../../helper/QuantityHelper';
import RightArrowIcon from '../Icons/RightArrowIcon';
import AmazonIcon from '/src/assets/utility/amazon.svg';
import PrimeIcon from '/src/assets/stores/prime.svg';
import { sendEvent } from '../../helper/EventTracker';

const AmazonStoreCard = () => {
  const { globalState } = useContext(ProductContext);
  const store = globalState.selectedVariant.pricesFromStores.filter(
    (store) => store.storeId === 'amazon.com'
  )[0];
  // const store = globalState.storesData.Amazon;
  const theme = {
    solid: '#2D2D2D',
    outline: '#2D2D2D',
    ...globalState.theme,
  };

  return (
    <div className="w-full border-b-[1px] border-zinc-100 flex flex-col justify-between gap-1 pb-4">
      <div className="flex gap-4 justify-between">
        <Tag title="FAST DELIVERY" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 justify-start">
          <div className="flex gap-2 items-center">
            <img src={AmazonIcon} className="w-20 h-16 object-contain" />
          </div>
        </div>

        <div>
          <div className="flex justify-end items-center gap-3 storeCard">
            <div className="flex flex-col items-end">
              <p className="text-[14px] font-semibold text-red-500">
                {calculatePercentage(
                  getTotal(globalState.cartItems, store).totalSellingPrice,
                  getTotal(globalState.cartItems, store).totalCostPrice
                )}
              </p>
              <del className="text-[14px] font-normal text-zinc-400 leading-3">
                {getTotal(globalState.cartItems, store).totalCostPrice !==
                  getTotal(globalState.cartItems, store).totalSellingPrice &&
                  globalState.currency + getTotal(globalState.cartItems, store).totalCostPrice}
              </del>
            </div>
            <p className="text-3xl font-semibold">
              {globalState.currency}
              {getTotal(globalState.cartItems, store).totalSellingPrice}
            </p>
          </div>
        </div>

        <button
          className="hidden bg-black text-white rounded-md font-semibold lg:flex justify-center items-center gap-3 w-32 h-14 storeCard"
          style={{
            backgroundColor: theme.solid,
            color: theme.text,
          }}
          onClick={() => {
            sendEvent('Amazon Card Checkout');
            window.location = globalState.storesData.Amazon.redirectionURL;
          }}
        >
          Buy
          <RightArrowIcon />{' '}
        </button>
      </div>

      <div className="flex justify-between items-center gap-3 lg:gap-9 w-full">
        <ShippingCard />
        <button
          className="lg:hidden bg-black text-white rounded-md font-semibold flex justify-center items-center gap-3 h-14 w-32 storeCard"
          style={{
            backgroundColor: theme.solid,
            color: theme.text,
          }}
          onClick={() => {
            sendEvent('Click_Amazon_Card_Checkout');
            window.location = globalState.storesData.Amazon.redirectionURL;
          }}
        >
          Buy
          <RightArrowIcon />{' '}
        </button>
      </div>
    </div>
  );
};

export default AmazonStoreCard;

const ShippingCard = () => {
  return (
    <div className="flex justify-between items-center gap-3 lg:gap-9">
      <div className="bg-blue-50 lg:bg-white bg-opacity-60 flex items-center p-2 rounded-md border-dashed border-[1px] border-[#9FD5ECE5] h-14 lg:h-8">
        <div className="pr-2 border-dashed border-r-[1px] border-blue-200">
          <img src={PrimeIcon} className="w-10 h-6" />
        </div>
        <div className="pl-4 lg:flex items-center gap-6">
          <p className="text-[10px] font-semibold text-[#2193C2E5]">Delivery in 2-3 days</p>
          <p className="text-[8px] lg:text-[10px] text-[#2193C2E5]">
            Shipping : Extra | 10 Days Return{' '}
          </p>
        </div>
      </div>
    </div>
  );
};
