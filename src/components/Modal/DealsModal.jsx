import PropTypes from "prop-types";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import AmazonIcon from "/src/assets/utility/amazon.svg";
import cross from "/src/assets/utility/cross.png";
import Tag from "../MicroUI/CheckoutComponents/Tag";
import {
  calculateFinalCart,
  getTotal,
  getTotalAmazon,
} from "../../helper/QuantityHelper";
import RightArrowIcon from "../Icons/RightArrowIcon";
// import ShopifyStoreCard from '../MicroUI/ShopifyStoreCard';
// import AmazonStoreCard from '../MicroUI/AmazonStoreCard';
// import flagsmith from 'flagsmith'; //Add this line if you're using flagsmith via npm
import { sendEvent } from "../../helper/EventTracker";

const DealsModal = ({ setCloseDeals }) => {
  const { globalState } = useContext(ProductContext);
  const stores = globalState.selectedVariant.pricesFromStores;

  return (
    <div className="flex flex-col gap-3 pt-4 bg-white rounded-t-lg">
      <div className="flex items-center justify-between px-4 text-lg">
        <p className="font-semibold">Available Deals</p>{" "}
        <img className="" src={cross} onClick={() => setCloseDeals(false)} />
      </div>
      {!globalState.multi && (
        <div className="">
          {stores.map((store, i) => {
            if (store.storeId === "shopify") {
              return <ShopifyDeal key={i} store={store} />;
            } else {
              return <AmazonDeal key={i} store={store} />;
            }
          })}
        </div>
      )}
    </div>
  );
};

DealsModal.propTypes = {
  setCloseDeals: PropTypes.func,
};

export default DealsModal;

const AmazonDeal = ({ store }) => {
  const { globalState } = useContext(ProductContext);

  const theme = {
    solid: "#2D2D2D",
    outline: "#2D2D2D",
    ...globalState.theme,
  };

  return (
    <div className="w-full border-y-[1px] border-zinc-100 flex flex-col justify-between gap-1 px-4 pb-4">
      <div className="flex justify-between gap-4">
        <Tag title="FAST DELIVERY" styles="w-24 text-[10px]" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-start gap-2">
          <div className="flex items-center gap-2">
            <img src={AmazonIcon} className="object-contain w-20 h-16" />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <del className="font-normal leading-3 text-zinc-400">
            {globalState.currency}
            {getTotal(globalState.cartItems, store).totalCostPrice}
          </del>
          <p className="text-3xl font-semibold">
            {globalState.currency}
            {getTotalAmazon(globalState.cartItems, store).totalSellingPrice}
          </p>
        </div>
        <button
          className="flex items-center justify-center w-32 gap-3 font-semibold text-white bg-black rounded-md h-14 lg:w-40"
          style={{
            backgroundColor: theme.solid,
            color: theme.text,
          }}
          onClick={() => {
            sendEvent("Click_Amazon_Deal_Checkout");
            window.location = store.redirectionURL;
          }}
        >
          Buy
          <RightArrowIcon />{" "}
        </button>{" "}
      </div>
    </div>
  );
};

AmazonDeal.propTypes = {
  store: PropTypes.object,
};

const ShopifyDeal = ({ store }) => {
  const { globalState } = useContext(ProductContext);

  const brandData = globalState.brandData;

  const theme = {
    solid: "#2D2D2D",
    outline: "#2D2D2D",
    ...globalState.theme,
  };

  return (
    <div className="w-full border-y-[1px] border-zinc-100 flex flex-col justify-between gap-1 px-4 pb-4">
      <div className="flex justify-between gap-4">
        <Tag title="BEST DEAL" styles="w-20 text-[10px]" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-start gap-2">
          <div className="flex items-center gap-2">
            <img
              src={brandData.logo.url}
              className="object-contain w-20 h-16"
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <del className="font-normal leading-3 text-zinc-400">
            {globalState.currency}
            {getTotal(globalState.cartItems, store).totalCostPrice}
          </del>
          <p className="text-3xl font-semibold">
            {globalState.currency}
            {
              calculateFinalCart(store, getTotal(globalState.cartItems, store))
                .finalPrice
            }
          </p>
        </div>
        <button
          className="flex items-center justify-center w-32 gap-3 font-semibold text-white bg-black rounded-md h-14 lg:w-40"
          style={{
            backgroundColor: theme.solid,
            color: theme.text,
          }}
          onClick={() => {
            sendEvent("Click_Brand_Deal_Checkout");

            window.location = "store.redirectionURL";
          }}
        >
          Buy
          <RightArrowIcon />{" "}
        </button>{" "}
      </div>
    </div>
  );
};

ShopifyDeal.propTypes = {
  store: PropTypes.object,
};
