import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import Tag from "./CheckoutComponents/Tag";
import { getTotal, calculatePercentage } from "../../helper/QuantityHelper";
import RightArrowIcon from "../Icons/RightArrowIcon";
import AmazonIcon from "/src/assets/utility/amazon.svg";
import PrimeIcon from "/src/assets/stores/prime.svg";
import { sendEvent } from "../../helper/EventTracker";
import Box from "@/components/Icons/Box.svg";

const AmazonStoreCard = () => {
  const { globalState } = useContext(ProductContext);
  const store = globalState.selectedVariant.pricesFromStores.filter(
    (store) => store.storeId === "amazon.com"
  )[0];
  const amazonDetails = globalState.selectedVariant.amazonDetails;
  const amazonStore = globalState.productDetails.stores.filter(
    (store) => store.storeId === "amazon.com"
  )[0];

  const theme = {
    solid: "#2D2D2D",
    outline: "#2D2D2D",
    ...globalState.theme,
  };

  return (
    <div className="w-full border-b-[1px] border-zinc-100 flex flex-col justify-between gap-1 pb-4">
      <div className="flex justify-between gap-4">
        <Tag title="FAST DELIVERY" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-start gap-2">
          <div className="flex items-center gap-2">
            <img src={AmazonIcon.src} className="object-contain w-20 h-16" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-end gap-3 storeCard">
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
                  globalState.currency +
                    getTotal(globalState.cartItems, store).totalCostPrice}
              </del>
            </div>
            <p className="text-3xl font-semibold">
              {globalState.currency}
              {getTotal(globalState.cartItems, store).totalSellingPrice}
            </p>
          </div>
        </div>

        <button
          className="items-center justify-center hidden w-32 gap-3 font-semibold text-white bg-black rounded-md lg:flex h-14 storeCard"
          style={{
            backgroundColor: theme.solid,
            color: theme.text,
          }}
          onClick={() => {
            sendEvent("Amazon Card Checkout");
            window.location = amazonStore.url;
          }}
        >
          Buy
          <RightArrowIcon />{" "}
        </button>
      </div>

      <div className="flex items-center justify-between w-full gap-3 lg:gap-9">
        <ShippingCard amazonDetails={amazonDetails} />
        <button
          className="flex items-center justify-center w-32 gap-3 font-semibold text-white bg-black rounded-md lg:hidden h-14 storeCard"
          style={{
            backgroundColor: theme.solid,
            color: theme.text,
          }}
          onClick={() => {
            sendEvent("Click_Amazon_Card_Checkout");
            window.location = amazonStore.url;
          }}
        >
          Buy
          <RightArrowIcon />{" "}
        </button>
      </div>
    </div>
  );
};

export default AmazonStoreCard;

const ShippingCard = ({ amazonDetails }) => {
  return (
    <div className="flex items-center justify-between gap-3 lg:gap-9">
      <div className="bg-blue-50 lg:bg-white bg-opacity-60 flex items-center p-2 rounded-md border-dashed border-[1px] border-[#9FD5ECE5] h-14 lg:h-8">
        {amazonDetails.isPrime ? (
          <div className="pr-2 border-dashed border-r-[1px] border-blue-200">
            <img src={PrimeIcon.src} className="w-10 h-6" />
          </div>
        ) : (
          <div className="pr-2 border-dashed border-r-[1px] border-blue-200">
            <img src={Box.src} className="w-6 h-6" />
          </div>
        )}
        {amazonDetails.minShippingDays === '0' ? (
          <div className="items-center gap-6 pl-4 lg:flex">
            <p className="text-[10px] font-semibold text-[#2193C2E5]">
              Delivery in {amazonDetails.minShippingDays}-
              {amazonDetails.maxShippingDays} days
            </p>
          </div>
        ) : amazonDetails.isPrime ? (
          <div className="items-center gap-6 pl-4 lg:flex">
            <p className="text-[10px] font-semibold text-[#2193C2E5]">
              Prime eligible
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
