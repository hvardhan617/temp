import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import {
  getTotalMultiProduct,
  removeItemsFromCart,
} from "../../helper/QuantityHelper";
import PropTypes from "prop-types";
import { persistCart } from "@/helper/globalDataLayer";
import { getCartDetails } from "@/helper/apiHelper";

const CartItem = ({ details, quantity }) => {
  const { globalState, setGlobalState } = useContext(ProductContext);
  const [multiVariants, setMultiVariants] = useState(null);
  useEffect(() => {
    findMultiVariants();
  }, [globalState]);

  const findMultiVariants = () => {
    let variants = 0;
    let variantsData = [{ ...details }];
    globalState.multiProductCart.map((item) => {
      if (item.productId === details.productId && item._id !== details._id) {
        variants++;
        variantsData.push(item);
      }
    });

    if (variants > 0) {
      setMultiVariants([...variantsData]);
    } else {
      setMultiVariants(null);
    }
  };

  const increaseQuantity = (id) => {
    let cartItems = globalState.multiProductCart;

    cartItems.forEach(async (item, i) => {
      if (item._id === id) {
        let tempItems = [...cartItems];

        tempItems[i] = {
          ...cartItems[i],
          quantity: cartItems[i].quantity + 1,
        };

        let cartArr = tempItems.map((item) => {
          return {
            variantId: item._id,
            quantity: item.quantity,
          };
        });

        let checkoutDetails = await getCartDetails(
          globalState.campaignData._id,
          cartArr,
          ""
        );

        setGlobalState({
          ...globalState,
          multiProductCart: tempItems,
          checkoutDetails: checkoutDetails ? checkoutDetails.checkout : null,
        });

        persistCart(tempItems);
      }
    });
    findMultiVariants();
  };

  const decreaseQuantity = async (id) => {
    let cartItems = globalState.multiProductCart;

    let updatedCart = removeItemsFromCart(cartItems, id);
    console.log("updatedCart", id, updatedCart);

    let cartArr = updatedCart.map((item) => {
      return {
        variantId: item._id,
        quantity: item.quantity,
      };
    });

    let checkoutDetails = await getCartDetails(
      globalState.campaignData._id,
      cartArr,
      ""
    );

    setGlobalState({
      ...globalState,
      multiProductCart: updatedCart,
      checkoutDetails: checkoutDetails ? checkoutDetails.checkout : null,
    });

    persistCart(updatedCart);

    findMultiVariants();
  };

  if (multiVariants) {
    return (
      <div className="flex flex-col p-4 px-6 justify-between gap-4 border-b-[1px] border-zinc-100">
        <div className="flex justify-between gap-4">
          <img
            src={globalState.productDetails.media[0].url}
            className="rounded-md w-14 h-14"
          />
          <div className="w-[40%] flex flex-col gap-1">
            <p className="h-12 overflow-hidden text-xs">{details.title}</p>
            <p className="text-xs text-zinc-400">
              {multiVariants.length} variants in cart
            </p>
          </div>
          <div className="w-[35%] text-right flex flex-col justify-start">
            <p className="text-lg font-semibold">
              {globalState.currency}
              {getTotalMultiProduct(multiVariants).totalSellingPrice}
            </p>
          </div>
        </div>
        {multiVariants.map((vdetails) => {
          return (
            <div
              className="flex justify-between gap-4 border-b-[1px] border-zinc-100 last:border-white pb-2"
              key={vdetails}
            >
              <div className="w-[40%] flex flex-col gap-1">
                <p className="text-xs text-zinc-400">Size: {vdetails.title}</p>
                <p className="text-xs text-zinc-400">
                  Quantity: {vdetails.quantity}
                </p>
              </div>
              <div className="w-[35%] text-right flex flex-col justify-start">
                <p className="text-lg font-semibold">
                  {globalState.currency}
                  {vdetails.price.listPrice * vdetails.quantity}
                </p>
                <p className="text-[9px] font-semibold text-red-500">
                  <span>{vdetails.discount}</span>
                  <del className="text-[14px] font-normal text-zinc-60ml-2">
                    {globalState.currency}
                    {vdetails.price.marketPrice * vdetails.quantity}
                  </del>
                </p>
                <div className="flex items-end justify-end mt-2 text-xs">
                  <div className="flex items-center bg-zinc-200">
                    <button
                      className={`bg-zinc-800 rounded-lg w-6 h-6 text-white ${
                        quantity === 1
                          ? "pointer-events-none"
                          : "pointer-events-auto" //not handled empty cart
                      }`}
                      onClick={() => decreaseQuantity(vdetails._id)}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <p className="w-8 text-center rounded-sm bg-zinc-200">
                      {vdetails.quantity}
                    </p>
                    <button
                      className={`bg-zinc-800 rounded-lg w-6 h-6 text-white`}
                      onClick={() => increaseQuantity(vdetails._id)}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex p-4 px-6 justify-between gap-4 border-b-[1px] border-zinc-100 pb-4">
      <img
        src={globalState.productDetails.media[0].url}
        className="rounded-md w-14 h-14"
      />
      <div className="w-[40%] flex flex-col gap-1">
        <p className="h-12 overflow-hidden text-xs">{details.title}</p>
        <p className="text-xs text-zinc-400">{details.label}</p>
      </div>
      <div className="w-[35%] text-right flex flex-col justify-start">
        <p className="text-lg font-semibold">
          {globalState.currency}
          {details.price.listPrice * details.quantity}
        </p>
        <p className="text-[9px] font-semibold text-red-500">
          <span>{details.discount}</span>
          <del className="text-[14px] font-normal text-zinc-60ml-2">
            {globalState.currency}
            {details.price.marketPrice * details.quantity}
          </del>
        </p>
        <div className="flex items-end justify-end mt-2 text-xs">
          <div className="flex items-center bg-zinc-200">
            <button
              className={`bg-zinc-800 rounded-lg w-6 h-6 text-white ${
                quantity === 1 ? "pointer-events-none" : "pointer-events-auto" //not handled empty cart
              }`}
              onClick={() => decreaseQuantity(details._id)}
            >
              {" "}
              -{" "}
            </button>
            <p className="w-8 text-center rounded-sm bg-zinc-200">
              {details.quantity}
            </p>
            <button
              className={`bg-zinc-800 rounded-lg w-6 h-6 text-white`}
              onClick={() => increaseQuantity(details._id)}
            >
              {" "}
              +{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  details: PropTypes.object,
  quantity: PropTypes.number,
  thumbnail: PropTypes.any,
  pid: PropTypes.number,
};

export default CartItem;
