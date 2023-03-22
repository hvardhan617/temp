import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { calculatePercentage, getTotal, getTotalAmazon } from '../../helper/QuantityHelper';
import amazonLogo from '/src/assets/stores/amazon.svg';
import primeLogo from '/src/assets/stores/prime.svg';

const Amazon = () => {
  const { globalState } = useContext(ProductContext);
  const active = globalState.selectedStore === 'Amazon';
  const store = globalState.storesData.Amazon;

  return (
    <div className={active ? 'relative mt-6' : undefined}>
      <div
        className={`flex items-start gap-2 justify-center text-xs bg-[#FBBC04] text-[#2D2D2D] rounded-md w-36 h-10 py-1 text-center absolute -z-10 -mt-[30px] transition duration-700 ease-in-out ${
          active ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex justify-center items-center gap-2">
          <CouponIcon /> <span className="font-semibold">Deal Selected</span>
        </div>
      </div>
      <div
        className={`rounded-lg bg-white delay-100 ease-in ${
          active ? 'border-[2px] border-[#FBBC04]' : 'border-[2px] border-zinc-200'
        } overflow-hidden`}
      >
        <div className="flex justify-between p-2 px-4">
          <div className="flex flex-col gap-2 justify-start">
            <div className="flex gap-2 items-center">
              <img src={amazonLogo} className="w-8 h-8" />
              <div className="">
                <p className="font-semibold">{store.name}</p>
                <p className="text-[11px] text-zinc-400">{store.url}</p>
              </div>
            </div>
            {store.deliveryFree ? (
              <p className="text-zinc-400 text-xs">
                Free delivery in <span className="font-semibold">{store.deliveryDays}</span> days
              </p>
            ) : (
              <p className="text-zinc-400 text-xs">
                Delivery in <span className="font-semibold">{store.deliveryDays}</span> days | Fee :{' '}
                <span className="font-semibold">Extra</span>{' '}
              </p>
            )}
            {store.primeCheck && <img src={primeLogo} className="w-12 h-4" />}
          </div>
          <div>
            <div className="flex flex-col justify-end items-end">
              {store.bestPrice && <FastDelivery />}
              <p className="text-[20px] font-semibold">
                {store.currency}
                {getTotalAmazon(globalState.cartItems).totalSellingPrice}
              </p>
              {getTotalAmazon(globalState.cartItems).totalSavings !== 0 && (
                <p className="text-[12px] font-semibold text-red-500 lg:flex lg:gap-2 lg:items-center lg:text-[14px]">
                  {calculatePercentage(
                    getTotalAmazon(globalState.cartItems).totalSellingPrice,
                    getTotalAmazon(globalState.cartItems).totalCostPrice
                  )}{' '}
                  <del className="text-[14px] font-normal text-zinc-400">
                    {store.currency}
                    {getTotal(globalState.cartItems).totalCostPrice}
                  </del>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Amazon.propTypes = {};

export default Amazon;

const CouponIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
      />
    </svg>
  );
};

const FastDelivery = () => {
  return (
    <p className="text-xs text-center bg-green-50 text-green-600 font-bold rounded-[4px] p-1 px-2 lg:text-[11px] lg:border-0 lg:py-1">
      FAST DELIVERY
    </p>
  );
};
