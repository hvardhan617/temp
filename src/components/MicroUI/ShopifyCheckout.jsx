import { useContext } from 'react';
import PropTypes from 'prop-types';
import gPay from '../../assets/utility/googlePay.png';
import upTrio from '../../assets/utility/upTrio.png';
import { ProductContext } from '../../context/ProductContext';
import RightArrowIcon from '../Icons/RightArrowIcon';
import { sendEvent } from '../../helper/EventTracker';

const ShopifyCheckout = ({ priceDetails, setOpen }) => {
  const { globalState } = useContext(ProductContext);
  const theme = globalState.theme;
  const OutofStock = globalState.selectedVariant.availability.currentStock === 0;
  const activeMultiCart = globalState.multiProductCart.length > 0;

  if (OutofStock && !activeMultiCart) {
    return (
      <div className="flex gap-3 h-24 max-h-20 py-3 px-6 lg:px-5 cursor-pointer w-full">
        <div className="w-[50%] hidden" onClick={() => setOpen(true)}>
          <div className="bg-zinc-100 rounded-lg w-full h-full flex justify-center items-center gap-3">
            <img src={gPay} className="" />
            <img src={upTrio} />
          </div>
        </div>
        <div className="w-full">
          <div
            className={`flex justify-center font-semibold bg-zinc-400 items-center text-white rounded-lg h-full px-6`}
          >
            <div className=" flex gap-1 flex-col pr-4">Product Sold Out</div>
          </div>
        </div>
      </div>
    );
  }

  if (activeMultiCart) {
    return (
      <div className="flex gap-3 h-24 max-h-20 py-3 px-6 lg:px-5 cursor-pointer w-full">
        <div className="w-[50%] hidden" onClick={() => setOpen(true)}>
          <div className="bg-zinc-100 rounded-lg w-full h-full flex justify-center items-center gap-3">
            <img src={gPay} className="" />
            <img src={upTrio} />
          </div>
        </div>
        <div
          className="w-full"
          onClick={() => {
            sendEvent('Click_Bottom_Buy_Button');
            window.location = globalState.storesData.Shopify.redirectionURL;
          }}
        >
          <div
            className={`flex justify-between bg-zinc-800 items-center text-white rounded-lg h-full px-6`}
            style={{
              backgroundColor: theme.solid,
              color: theme.text,
            }}
          >
            <div className=" flex gap-1 flex-col pr-4">
              <div className="text-lg font-semibold leading-none">
                {globalState.currency}
                {parseFloat(priceDetails.finalPrice)}
              </div>
              <div className="text-[10px] text-opacity-60 leading-none">
                <del>
                  {globalState.currency}
                  {parseFloat(priceDetails.totalCostPrice)}
                </del>
              </div>
            </div>
            <div className="text-right flex justify-end items-center gap-4">
              <div className="w-full">
                <p className="font-semibold text-sm">Buy from</p>
                <p className="text-[10px] font-normal">{globalState.brandData.domain}</p>
              </div>
              <RightArrowIcon />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 h-24 max-h-20 py-3 px-6 lg:px-5 cursor-pointer w-full">
      <div className="w-[50%] hidden" onClick={() => setOpen(true)}>
        <div className="bg-zinc-100 rounded-lg w-full h-full flex justify-center items-center gap-3">
          <img src={gPay} className="" />
          <img src={upTrio} />
        </div>
      </div>
      <div
        className="w-full"
        onClick={() => {
          sendEvent('Click_Bottom_Buy_Button');
          window.location = globalState.storesData.Shopify.redirectionURL;
        }}
      >
        <div
          className={`flex justify-between bg-zinc-800 items-center text-white rounded-lg h-full px-6`}
          style={{
            backgroundColor: theme.solid,
            color: theme.text,
          }}
        >
          <div className=" flex gap-1 flex-col pr-4">
            <div className="text-lg font-semibold leading-none">
              {globalState.currency}
              {parseFloat(priceDetails.finalPrice)}
            </div>
            <div className="text-[10px] text-opacity-60 leading-none">
              <del>
                {globalState.currency}
                {parseFloat(priceDetails.totalCostPrice)}
              </del>
            </div>
          </div>
          <div className="text-right flex justify-end items-center gap-4">
            <div className="w-full">
              <p className="font-semibold text-sm">Buy from</p>
              <p className="text-[10px] font-normal">{globalState.brandData.domain}</p>
            </div>
            <RightArrowIcon />
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="flex gap-3 h-24 max-h-20 py-3 px-6 lg:px-5 cursor-pointer w-full">
  //     <div className="w-[50%] hidden" onClick={() => setOpen(true)}>
  //       <div className="bg-zinc-100 rounded-lg w-full h-full flex justify-center items-center gap-3">
  //         <img src={gPay} className="" />
  //         <img src={upTrio} />
  //       </div>
  //     </div>
  //     <div
  //       className="w-full"
  //       onClick={() => {
  //         window.location = globalState.storesData.Shopify.redirectionURL;
  //       }}
  //     >
  //       <div
  //         className={`flex justify-between bg-zinc-800 items-center text-white rounded-lg h-full px-6`}
  //         style={{
  //           backgroundColor: theme.solid,
  //         }}
  //       >
  //         <div className="border-r-[1px] border-white w-full flex items-end gap-1">
  //           <div className="text-lg font-semibold leading-none">
  //             {globalState.currency}
  //             {parseFloat(priceDetails.finalPrice)}
  //           </div>
  //           <div className="text-[10px] text-white text-opacity-60 leading-none">
  //             <del>
  //               {globalState.currency}
  //               {parseFloat(priceDetails.totalCostPrice)}
  //             </del>
  //           </div>
  //         </div>
  //         <div className="w-[40%] text-right flex justify-end items-center gap-2 text-white">
  //           <p>Pay</p>
  //           <RightArrowIcon />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

ShopifyCheckout.propTypes = {
  priceDetails: PropTypes.object,
  setOpen: PropTypes.func,
};

export default ShopifyCheckout;
