import { ProductContext } from "@/context/ProductContext";
import { calculatePercentage } from "@/helper/QuantityHelper";
import { useContext, useState } from "react";
import Quantity from "./MicroUI/Quantity";
import { Rating } from "./MicroUI/Rating";
import Variants from "./MicroUI/Variants";
import ProductList from "./Multiproduct/ProductList";
import PropTypes from "prop-types";
import { splitLongProductTitle } from "@/helper/utilityHelper";

// import BestPrice from './MicroUI/BestPrice';
const ProductInfo = ({ details }) => {
  const { globalState } = useContext(ProductContext);
  const [hideDecription, setHideDecription] = useState(false);

  const splitLongProductTitle = (title) => {
    if (title.length < 20) {
      return [title, title];
    }
    let types = [":", ",", "|"];
    let shortestTitle = title;
    let mainTitle = "";
    types.map((key) => {
      shortestTitle =
        shortestTitle.length > title.substring(title.indexOf(key) + 1).length
          ? title.substring(title.indexOf(key) + 1)
          : shortestTitle;

      mainTitle =
        mainTitle.length < title.substring(0, title.indexOf(key)).length
          ? title.substring(0, title.indexOf(key))
          : mainTitle;
    });

    if (mainTitle === "") {
      mainTitle = title;
    }

    if (shortestTitle.length > 150) {
      setHideDecription(true);
    }
    return [mainTitle, shortestTitle];
  };

  if (globalState) {
    const productDetails = globalState.productDetails;
    const shopifyPrice = globalState.selectedVariant.pricesFromStores.filter(
      (store) => store.storeId === "shopify"
    )[0];
    return (
      <div className="flex flex-col justify-center gap-2 px-6 pb-2 lg:gap-4 lg:pt-5">
        <div className="flex items-start justify-between gap-2 lg:flex-col lg:gap-4">
          <div className="flex flex-col justify-between w-full gap-2 lg:h-full lg:gap-4 min-h-20">
            <p className="w-full lg:h-full text-[20px] font-semibold text-slate-800 lg:text-3xl lg:flex overflowText">
              {splitLongProductTitle(productDetails.title)[0]}
            </p>
            <Rating count={5} ratingCount={10} />
          </div>
          <div className="w-[50%] lg:hidden">
            <div className="flex flex-col items-end justify-between h-full gap-2 pt-1 lg:items-start lg:hidden">
              <div className="text-right">
                <p className="text-[22px] font-semibold text-slate-900 lg:text-[28px] md:font-bold">
                  {globalState.currency}
                  {shopifyPrice.listPrice}
                </p>
                <p className="text-[12px] font-semibold text-red-500 lg:flex lg:flex-row-reverse lg:gap-2 lg:items-center lg:text-[14px]">
                  {calculatePercentage(
                    shopifyPrice.listPrice,
                    shopifyPrice.marketPrice
                  )}{" "}
                  {calculatePercentage(
                    shopifyPrice.listPrice,
                    shopifyPrice.marketPrice
                  ) && (
                    <del className="text-[14px] font-normal text-zinc-400">
                      {globalState.currency}
                      {shopifyPrice.marketPrice}
                    </del>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:gap-4">
          <p className="text-zinc-400 text-[14px] leading-[1.4rem]">
            {hideDecription ? (
              <>
                {splitLongProductTitle(productDetails.title)[1]}
                <span
                  className="font-semibold cursor-pointer text-zinc-600"
                  onClick={() => {
                    setHideDecription(!hideDecription);
                    sendEvent(
                      hideDecription
                        ? "Click_Short_Description_Less"
                        : "Click_Short_Description_More"
                    );
                  }}
                >
                  {" "}
                  ...Read more
                </span>
              </>
            ) : (
              <>
                {splitLongProductTitle(productDetails.title)[1]}
                {splitLongProductTitle(productDetails.title)[1].length >
                  150 && (
                  <span
                    className="font-semibold cursor-pointer text-zinc-600"
                    onClick={() => setHideDecription(!hideDecription)}
                  >
                    {" "}
                    Read Less
                  </span>
                )}
              </>
            )}
          </p>
        </div>
        <div className="pricingStyle hideOnMobile">
          <div className="items-end justify-end lg:flex lg:gap-3">
            <p className="priceText">
              {globalState.currency}
              {shopifyPrice.listPrice}
            </p>
            <p className="text-[12px] font-semibold text-red-500 lg:flex lg:flex-row-reverse lg:gap-2 lg:items-center lg:text-[14px] pb-1">
              <span>
                {calculatePercentage(
                  shopifyPrice.listPrice,
                  shopifyPrice.marketPrice
                )}
              </span>{" "}
              {calculatePercentage(
                shopifyPrice.listPrice,
                shopifyPrice.marketPrice
              ) && (
                <del className="ogPrice">
                  {globalState.currency}
                  {shopifyPrice.marketPrice}
                </del>
              )}
            </p>
          </div>
        </div>

        {globalState.productList && (
          <div className="lg:hidden">
            <ProductList list={globalState.productList} />
          </div>
        )}
        {globalState.variants.details.length > 0 && (
          <Variants data={globalState.variants} />
        )}
        <Quantity />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-2 px-6 pb-2 lg:gap-4 lg:pt-5">
      <div className="flex items-start justify-between gap-2 lg:flex-col lg:gap-4">
        <div className="flex flex-col justify-between w-full gap-2 lg:h-full lg:gap-4 min-h-20">
          <p className="w-full lg:h-full text-[20px] font-semibold text-slate-800 lg:text-3xl lg:flex overflowText">
            {splitLongProductTitle(details.title)[0]}
          </p>
          <Rating count={5} ratingCount={10} />
        </div>
        <div className="w-[50%] lg:hidden">
          <div className="flex flex-col items-end justify-between h-full gap-2 pt-1 lg:items-start lg:hidden">
            <div className="text-right">
              <p className="text-[22px] font-semibold text-slate-900 lg:text-[28px] md:font-bold">
                ${details.variants[0].listPrice}
              </p>
              <p className="text-[12px] font-semibold text-red-500 lg:flex lg:flex-row-reverse lg:gap-2 lg:items-center lg:text-[14px]">
                {calculatePercentage(
                  details.variants[0].listPrice,
                  details.variants[0].marketPrice
                )}{" "}
                {calculatePercentage(
                  details.variants[0].listPrice,
                  details.variants[0].marketPrice
                ) && (
                  <del className="text-[14px] font-normal text-zinc-400">
                    ${details.variants[0].marketPrice}
                  </del>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 lg:gap-4">
        <p className="text-zinc-400 text-[14px] leading-[1.4rem]">
          {hideDecription ? (
            <>
              {splitLongProductTitle(details.title)[1]}
              <span
                className="font-semibold cursor-pointer text-zinc-600"
                onClick={() => {
                  setHideDecription(!hideDecription);
                  sendEvent(
                    hideDecription
                      ? "Click_Short_Description_Less"
                      : "Click_Short_Description_More"
                  );
                }}
              >
                {" "}
                ...Read more
              </span>
            </>
          ) : (
            <>
              {splitLongProductTitle(details.title)[1]}
              {splitLongProductTitle(details.title)[1].length > 150 && (
                <span
                  className="font-semibold cursor-pointer text-zinc-600"
                  onClick={() => setHideDecription(!hideDecription)}
                >
                  {" "}
                  Read Less
                </span>
              )}
            </>
          )}
        </p>
      </div>
      <div className="pricingStyle hideOnMobile">
        <div className="items-end justify-end lg:flex lg:gap-3">
          <p className="priceText">${details.variants[0].listPrice}</p>
          <p className="text-[12px] font-semibold text-red-500 lg:flex lg:flex-row-reverse lg:gap-2 lg:items-center lg:text-[14px] pb-1">
            <span>
              {calculatePercentage(
                details.variants[0].listPrice,
                details.variants[0].marketPrice
              )}
            </span>{" "}
            {calculatePercentage(
              details.variants[0].listPrice,
              details.variants[0].marketPrice
            ) && (
              <del className="ogPrice">${details.variants[0].marketPrice}</del>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  details: PropTypes.object,
  list: PropTypes.array,
  product: PropTypes.object,
  serverData: PropTypes.object,
  setProduct: PropTypes.func,
};

export default ProductInfo;
