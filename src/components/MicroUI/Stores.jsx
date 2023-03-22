import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import Shopify from '../Stores/Shopify';
import Amazon from '../Stores/Amazon';
import { sendEvent } from '../../helper/EventTracker';

const Stores = () => {
  const { globalState, setGlobalState } = useContext(ProductContext);
  const storesData = globalState.storesData;

  const store = globalState.selectedStore === 'Shopify' ? storesData.Shopify : storesData.Amazon;

  const selectStore = (storeName) => {
    if (storeName === 'Shopify') sendEvent('Shopify Store Selected');
    else {
      sendEvent('Amazon Store Selected');
    }

    setGlobalState({
      ...globalState,
      selectedStore: storeName,
    });
  };

  if (globalState.multiProductCart.length > 0) {
    return (
      <div className="w-full px-6">
        <p className="font-semibold mb-4">Selected Store</p>
        <div className="flex justify-between p-2 py-3 px-4 border-2 border-zinc-900 rounded-xl">
          <div className="flex w-full gap-2 justify-between items-center">
            <div className="flex gap-2 items-center">
              <img src={store.logo} className="w-8 h-8" />
              <div className="">
                <p className="font-semibold">{store.name}</p>
                <p className="text-[9px] text-zinc-400">{store.url}</p>
              </div>
            </div>
            <div>
              <p className="text-zinc-400 text-xs">
                Delivery in <span className="font-semibold">{storesData.deliveryDays}</span> days
              </p>
              <p className="text-zinc-400 text-xs">
                Shipping Fee : <span className="font-semibold">$ 0.88</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-6">
      <p className="font-semibold">Available Deals</p>
      <div onClick={() => selectStore('Shopify')} className="cursor-pointer">
        <Shopify store={storesData.Shopify} active={globalState.selectedStore === 'Shopify'} />
      </div>
      <div onClick={() => selectStore('Amazon')} className="cursor-pointer">
        <Amazon store={storesData.Amazon} active={globalState.selectedStore === 'Amazon'} />
      </div>
    </div>
  );
};

Stores.propTypes = {
  setAmazonStore: PropTypes.func,
  storesData: PropTypes.array,
};

export default Stores;
