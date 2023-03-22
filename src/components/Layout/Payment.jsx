import gPay from '../../assets/utility/gPayW.png';
import applePay from '../../assets/utility/applePay.png';
import cardPay from '../../assets/utility/card.png';
import payPal from '../../assets/utility/payPal.png';
import shopPay from '../../assets/utility/shopPay.png';
import cross from '../../assets/utility/cross.png';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { calculateTotalItems, getTotal } from '../../helper/QuantityHelper';

const Payment = ({ setClose, hideHeader }) => {
  const { globalState } = useContext(ProductContext);

  const [priceDetails, setPriceDetails] = useState({
    totalSellingPrice: 0,
    totalCostPrice: 0,
    totalMRP: 0,
  });

  useEffect(() => {
    let { totalSellingPrice, totalCostPrice } =
      { totalCostPrice: 0, totalSellingPrice: 0 } || getTotal(globalState.cartItems);

    if (globalState.cartItems.length === 0) {
      setPriceDetails({ totalSellingPrice: 94.0, totalCostPrice: 188.0 });
    } else {
      setPriceDetails({ totalSellingPrice, totalCostPrice });
    }
  }, [globalState]);

  return (
    <div className="bg-white rounded-t-2xl py-4 flex flex-col gap-3">
      {!hideHeader && (
        <>
          <div className="flex justify-between items-center px-4 text-[14px]">
            <p>Order Summary</p>
            <img className="" src={cross} onClick={() => setClose(false)} />
          </div>
          <div className="flex gap-2 px-4 items-center ">
            <p className="font-semibold ">{calculateTotalItems(globalState.cartItems)}</p>
            <p className="font-semibold ">
              {globalState.currency}
              {parseFloat(priceDetails.totalSellingPrice)}
            </p>
            <p className=" text-[#17A572]">
              <span className="text-xs">
                Savings {globalState.currency}
                {getTotal(globalState.cartItems, {}).totalSavings}
              </span>
            </p>
          </div>
          <div className="bg-[#DDFBEF]">
            <p className="px-4 text-[#17A572] text-[10px] py-1">
              <span className="text-xs font-semibold">NEW50</span> coupon code applied
            </p>
          </div>
        </>
      )}
      <div
        className="px-4 flex flex-col gap-3"
        onClick={() => (window.location = globalState.redirectionURL)}
      >
        <p className="text-sm text-zinc-500">Choose payment method</p>
        <div className="flex gap-2 w-full justify-center bg-black p-4 text-white rounded-lg text-[15px] font-semibold items-center">
          Pay now with <img src={gPay} />
        </div>
        <div className="flex gap-2 w-full justify-center p-4 text-zinc-600 rounded-lg text-[15px] font-semibold items-center bg-white border-[1px] border-zinc-200">
          Pay now with <img src={applePay} />
        </div>
        <div className="flex gap-2 w-full justify-center bg-[#5A31F4] p-4 text-white rounded-lg text-[15px] font-semibold items-center">
          Pay now with <img src={shopPay} />
        </div>
        <div className="flex gap-2 w-full justify-center bg-[#FFC439] black p-4 text-zinc-700 rounded-lg text-[15px] font-semibold items-center">
          Pay now with <img src={payPal} />
        </div>
        <div className="flex gap-2 w-full justify-center bg-black p-4 text-white rounded-lg text-[15px] font-semibold items-center">
          Pay using Credit / Debit Card <img src={cardPay} className="ml-1" />
        </div>
      </div>
    </div>
  );
};

Payment.propTypes = {
  setClose: PropTypes.func,
  hideHeader: PropTypes.bool,
};

export default Payment;
