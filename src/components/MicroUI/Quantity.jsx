import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { checkInCart, removeItemsFromCart } from "../../helper/QuantityHelper";
import { sendEvent } from "../../helper/EventTracker";
import { persistCart } from "@/helper/globalDataLayer";

const Quantity = () => {
  const [counter, setCounter] = useState(1);
  const { globalState, setGlobalState } = useContext(ProductContext);
  const [inCart, setInCart] = useState(false);
  const theme = {
    solid: "#2D2D2D",
    outline: "#E8E8E8",
    ...globalState.theme,
  };

  useEffect(() => {
    if (globalState.multiProductCart.length > 0) {
      let { alreadyInCart, quantity } = checkInCart(
        globalState.multiProductCart,
        globalState.selectedVariant._id
      );
      setInCart(alreadyInCart);
      setCounter(quantity === 0 ? 1 : quantity);
    } else {
      let { quantity } = checkInCart(
        globalState.cartItems,
        globalState.selectedVariant._id
      );
      setCounter(quantity === 0 ? 1 : quantity);
      setInCart(false);
    }
  }, [globalState]);

  const addToCart = () => {
    sendEvent("Click_Add_To_Cart");

    let cartItems = globalState.multiProductCart;

    let details = {
      ...globalState.selectedVariant,
    };

    cartItems.push({
      quantity: 1,
      thumbnail: globalState.productDetails.media[0].url,
      ...details,
    });

    setGlobalState({ ...globalState, multiProductCart: cartItems });

    persistCart(cartItems)
  };

  const increaseQuantity = () => {
    sendEvent("Click_Increase_Quantity", {
      source: "Man matters 1",
    });

    let cartItems = globalState.cartItems;

    if (globalState.multi) {
      cartItems = globalState.multiProductCart;
    }

    cartItems.forEach((item, i) => {
      if (item._id === globalState.selectedVariant._id) {
        let tempItems = [...cartItems];

        tempItems[i] = {
          ...cartItems[i],
          quantity: cartItems[i].quantity + 1,
        };

        if (globalState.multi) {
          setGlobalState({
            ...globalState,
            multiProductCart: tempItems,
          });
          persistCart(tempItems)
        } else {
          setGlobalState({
            ...globalState,
            cartItems: tempItems,
          });

          persistCart(tempItems);
        }
      }
    });
  };

  const decreaseQuantity = () => {
    sendEvent("Click_Decrease_Quantity");

    let cartItems = globalState.cartItems;

    if (globalState.multi) {
      cartItems = globalState.multiProductCart;
    }

    let updatedCart = removeItemsFromCart(
      cartItems,
      globalState.selectedVariant._id
    );

    if (globalState.multi) {
      setGlobalState({
        ...globalState,
        multiProductCart: updatedCart,
      });
      persistCart(updatedCart)

      return;
    }

    setGlobalState({
      ...globalState,
      cartItems: updatedCart,
    });

    persistCart(updatedCart);

  };

  const getAvailability = () => {
    return globalState.selectedVariant.availability.currentStock === 0;
  };

  if (getAvailability()) {
    return (
      <button className="w-full p-4 border-[2.5px] border-zinc-400 text-zinc-400 rounded-lg font-bold text-[15px] mt-4 lg:mt-2 pointer-events-none">
        Product Sold Out
      </button>
    );
  }

  if (globalState.multi) {
    return (
      <div>
        {inCart ? (
          <div className="flex items-center justify-between gap-20 mt-2">
            <p className="quantityLabel">Quantity</p>
            <div className="flex items-center border-t-[2px] border-b-[2px] border-zinc-200 rounded-lg w-[45%]">
              <button
                className="quantityBtn"
                data-test="decreaseQ"
                onClick={() => decreaseQuantity()}
              >
                {" "}
                -{" "}
              </button>
              <p className="w-full text-base font-semibold text-center">
                {counter}
              </p>
              <button
                className="quantityBtn"
                data-test="increaseQ"
                onClick={() => increaseQuantity()}
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>
        ) : (
          <button
            className="w-full p-4 border-[2.5px] border-zinc-600 rounded-lg font-bold text-[15px] mt-2 lg:mt-0"
            onClick={() => addToCart()}
          >
            Add product to the cart
          </button>
        )}{" "}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-20 mt-4 select-none lg:justify-start lg:my-4">
      <p className="quantityLabel">Quantity</p>
      <div className="flex items-center h-full border-[2px] border-zinc-200 rounded-lg overflow-hidden w-[45%]">
        <button
          style={{
            color: counter === 1 ? "#e8e8e8" : theme.solid,
          }}
          className={`h-9 w-12 border-r-[2px] border-zinc-200 text-2xl rounded-l-lg font-semibold bg-white grid place-items-center cursor-pointer ${
            counter === 1 ? "text-opacity-50 pointer-events-none" : undefined
          }`}
          data-test="decreaseQ"
          onClick={() => decreaseQuantity()}
        >
          <SubtractIcon />
        </button>
        <p
          className="w-full text-base font-semibold text-center"
          data-test="textQ"
        >
          {counter}{" "}
          <span className="hidden lg:inline">
            {counter === 1 ? "unit" : "units"}
          </span>
        </p>
        <button
          style={{
            color: theme.solid,
          }}
          className="h-9 w-12 border-l-[2px] border-zinc-200 text-2xl rounded-r-lg font-semibold bg-white grid place-items-center cursor-pointer disabled:opacity-60"
          onClick={() => increaseQuantity()}
          disabled={
            counter === globalState.selectedVariant.availability.currentStock
          }
          data-test="increaseQ"
        >
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

Quantity.propTypes = {
  available: PropTypes.number,
};

export default Quantity;

const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
};

const SubtractIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  );
};
