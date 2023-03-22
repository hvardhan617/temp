import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import PropTypes from 'prop-types';
import amazon from '../../assets/stores/amazon.svg';
import RightArrowIcon from '../Icons/RightArrowIcon';
import { sendEvent } from '../../helper/EventTracker';

const AmazonCheckout = ({ priceDetails }) => {
  const { globalState } = useContext(ProductContext);

  return (
    <div className="flex gap-3 h-24 max-h-20 py-3 px-6 cursor-pointer w-full">
      <div
        className="w-full"
        onClick={() => {
          sendEvent('Amazon Checkout');
          window.location = globalState.storesData.Amazon.redirectionURL;
        }}
      >
        <div className="flex items-center bg-[#FBBC04] rounded-lg h-full px-4 gap-2">
          <div className="border-r-[1px] border-[#F5600B] flex items-end gap-1 pr-3 w-[35%]">
            <div className="text-lg text-zinc-800 font-semibold leading-none">
              {globalState.currency}
              {priceDetails.totalSellingPrice}
            </div>
            <div className="text-[10px] text-zinc-800 leading-none">
              <del>
                {globalState.currency}
                {priceDetails.totalCostPrice}
              </del>
            </div>
          </div>
          <div className="w-full text-right flex justify-end items-center gap-1 text-sm font-semibold">
            <img src={amazon} />
            <p>Checkout from amazon</p>
            <RightArrowIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

AmazonCheckout.propTypes = {
  priceDetails: PropTypes.object,
};

export default AmazonCheckout;
