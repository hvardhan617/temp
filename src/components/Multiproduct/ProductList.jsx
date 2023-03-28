// import React from 'react';
import { getCartDetails } from "@/helper/apiHelper";
import { getCouponCode } from "@/helper/utilityHelper";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { sendEvent } from "../../helper/EventTracker";
import { getProductDetails } from "../../helper/globalDataLayer";

const ProductList = () => {
  const { globalState, setGlobalState } = useContext(ProductContext);
  const list = globalState.productList;

  const handleProducts = async (prod) => {
    sendEvent("Click_Product_Changed", {});
    let newObj = getProductDetails({ ...globalState }, prod);
    console.log("productChanges", prod, newObj);

    if (newObj.multiProductCart.length === 0) {
      let cartArr = [
        {
          variantId: newObj.selectedVariant._id,
          quantity: newObj.cartItems[0].quantity,
        },
      ];

      let checkoutDetails = await getCartDetails(
        newObj.campaignData._id,
        cartArr,
        getCouponCode(newObj.campaignData)
      );
      setGlobalState({
        ...newObj,
        checkoutDetails: checkoutDetails ? checkoutDetails.checkout : null,
      });
      return
    }

    setGlobalState({ ...newObj });
  };

  return (
    <div className="variantCard">
      <div className="flex flex-col items-start justify-between">
        <p className="text-base font-semibold">{globalState.collectionName}</p>
        <p className="text-sm text-zinc-400">{list && list.length} options</p>
      </div>

      <div className="flex gap-2 overflow-scroll lg:flex-col lg:justify-around w-[90vw] lg:w-full">
        {list &&
          list.map((prod, i) => {
            return (
              <div
                key={i}
                onClick={() => handleProducts(prod)}
                className="lg:border-b-[1px] lg:border-zinc-300 lg:p-4 last:border-white"
              >
                <div
                  className={`border-[2.5px] border-zinc-100 text-zinc-500 rounded-md w-24 h-24  ${
                    globalState.selectedVariant.productId ===
                    prod.variants[0].details[0].productId
                      ? "border-zinc-800 text-zinc-800 lg:border-none lg:scale-100"
                      : "lg:scale-75 hover:scale-100"
                  }`}
                >
                  <img
                    src={prod.variants[0].details[0].media[0].url}
                    className="object-contain w-24 h-24 rounded-md"
                  />
                </div>
                <div className="w-24 text-center">
                  <p
                    className={`text-sm p-2 overflow-hidden h-14 leading-6 ${
                      globalState.selectedVariant.pid ===
                      prod.variants[0].details[0].pid
                        ? "text-zinc-800"
                        : "text-zinc-400"
                    }`}
                  >
                    {prod.title}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  product: PropTypes.object,
  setProduct: PropTypes.func,
};

export default ProductList;
