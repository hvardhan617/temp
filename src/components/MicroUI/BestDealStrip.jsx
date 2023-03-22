import AmazonIcon from '/src/assets/stores/amazon.svg';
import PropTypes from 'prop-types';
import { sendEvent } from '../../helper/EventTracker';

const BestDealStrip = (setOpenDeals, store) => {
  return (
    <div
      className="flex justify-between items-center w-full text-xs lg:hidden px-6 py-1 border-y-[1px] border-zinc-100"
      onClick={() => {
        setOpenDeals(true);
        sendEvent('Click_View_Deals');
      }}
    >
      <p className="">🎉 Best deal selected for you </p>
      <div className="flex gap-2 items-center">
        <div className="flex">
          <img src={AmazonIcon} className="rounded-full w-6 h-6 object-contain" />
          <img src={store.icon} className="w-6 h-6 object-contain rounded-full -translate-x-2" />
        </div>
        <p className="font-semibold">view all deals</p>
      </div>
    </div>
  );
};

BestDealStrip.propTypes = {
  setOpenDeals: PropTypes.func,
  store: PropTypes.object,
};

export default BestDealStrip;
