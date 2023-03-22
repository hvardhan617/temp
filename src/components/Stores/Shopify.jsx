import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { calculateFinalCart, getTotal } from '../../helper/QuantityHelper';
import BestPrice from '../MicroUI/BestPrice';
const Shopify = () => {
  const { globalState } = useContext(ProductContext);
  const active = globalState.selectedStore === 'Shopify';
  const store = globalState.storesData.Shopify;
  const theme = {
    solid: '#2D2D2D',
    ...globalState.theme,
  };
  return (
    <div className={active ? 'relative mt-6' : undefined}>
      <div
        style={active ? { backgroundColor: theme.solid } : { backgroundColor: '#2D2D2D' }}
        className={`flex items-start gap-2 justify-center text-xs bg-[#2D2D2D] text-white rounded-md w-36 h-10 py-1 text-center absolute -z-10 -mt-7 transition duration-700 ease-in-out ${
          active ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex justify-center items-center gap-2">
          <CouponIcon /> <span className="font-semibold">Deal Selected</span>
        </div>
      </div>
      <div
        style={active ? { borderColor: theme.solid } : { borderColor: '' }}
        className={`rounded-lg bg-white delay-100 border-opacity-20 ease-in ${
          active ? 'border-[2px] border-[#2D2D2D]' : 'border-[2px] border-zinc-400'
        } overflow-hidden`}
      >
        <div className="flex justify-between p-2 px-4">
          <div className="flex flex-col gap-2 justify-start">
            <div className="flex gap-2 items-center">
              <img src={store.logo} className="w-8 h-8 object-contain" />
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
          </div>
          <div>
            <div className="flex flex-col justify-end items-end">
              {store.bestPrice && <BestPrice />}
              <p className="text-[20px] font-semibold">
                {store.currency}
                {calculateFinalCart(store, getTotal(globalState.cartItems)).finalPrice}
              </p>
              <p className="text-[12px] font-semibold text-red-500 lg:flex lg:gap-2 lg:items-center lg:text-[14px]">
                {calculateFinalCart(store, getTotal(globalState.cartItems)).msg}{' '}
                <del className="text-[14px] font-normal text-zinc-400">
                  {store.currency}
                  {getTotal(globalState.cartItems).totalCostPrice}
                </del>
              </p>
            </div>
          </div>
        </div>
        {store.couponApplied && (
          <div className="relative mt-2">
            <div className="h-4 w-4 bg-[#F0FFE5] rotate-45 absolute -mt-2 right-8 border-t-2 border-l-2 border-[#e1fbce]"></div>
            <div className="bg-[#F0FFE5] text-[#5B873A] p-1 text-xs flex justify-between py-2 px-6 border-t-2 border-[#e4f9d4]">
              <p>
                Deal applied : <span className="font-semibold">{store.couponApplied.code}</span>
              </p>
              <p>
                Saving {globalState.currency}
                {calculateFinalCart(store, getTotal(globalState.cartItems)).totalSavings}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Shopify.propTypes = {};

export default Shopify;

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
