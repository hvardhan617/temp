import { useContext, useEffect, useRef } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { getLatestVariantPrices } from '../../dummyBrand';
import AmazonStoreCard from './AmazonStoreCard';
import ShopifyStoreCard from './ShopifyStoreCard';

const CheckoutCard = () => {
  const { globalState, setGlobalState } = useContext(ProductContext);
  const stores = globalState.selectedVariant.pricesFromStores;
  const store = globalState.stores[0];
  const latestSelectedVariant = useRef(globalState);

  useEffect(() => {
    getLatestPricing();
  }, []);

  const getLatestPricing = () => {
    const interval = setInterval(async () => {
      let variantData = await getLatestVariantPrices(
        latestSelectedVariant.current.selectedVariant._id
      );

      latestSelectedVariant.current.selectedVariant.pricesFromStores = variantData.pricesFromStores;

      setGlobalState({
        ...latestSelectedVariant.current,
        productDetails: latestSelectedVariant.current.productDetails,
        selectedVariant: latestSelectedVariant.current.selectedVariant,
      });

      return () => clearInterval(interval);
    }, 5000);
  };

  useEffect(() => {
    latestSelectedVariant.current = globalState;
  }, [globalState]);

  if (globalState.multiProductCart.length > 0) {
    return (
      <div className="w-full px-6">
        <p className="font-semibold mb-4">Selected Store</p>
        <div className="flex justify-between p-2 py-3 px-4 border-2 border-zinc-900 rounded-xl">
          <div className="flex w-full gap-2 justify-between items-center">
            <div className="flex gap-6 items-center">
              <img src={globalState.brandData.logo.url} className="w-16 h-12 object-contain" />
              <div className="">
                <p className="font-semibold">{globalState.brandData.registeredName}</p>
                <p className="text-[9px] text-zinc-400">{store.url}</p>
              </div>
            </div>
            <div>
              <p className="text-zinc-400 text-xs">
                Delivery in <span className="font-semibold">{store.deliveryDays}</span> days
              </p>
              <p className="text-zinc-400 text-xs">Shipping Fee Extra</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-6">
      <p className="font-semibold">Available Deals</p>

      <div className="">
        {stores.map((storeData) => {
          if (storeData.storeId === 'shopify') {
            return <ShopifyStoreCard key={'shopify'} storeData={storeData} />;
          }
          if (storeData.storeId === 'amazon.com') {
            return <AmazonStoreCard key={'amazon.com'} storeData={storeData} />;
          }
        })}
      </div>
    </div>
  );
};

CheckoutCard.propTypes = {};

export default CheckoutCard;
