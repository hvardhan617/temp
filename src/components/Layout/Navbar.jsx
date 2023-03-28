import SocialCounter from "../MicroUI/SocialCounter";
import PropTypes from "prop-types";
import cartIcon from "/src/assets/utility/cartIcon.png";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { calculateTotalItems } from "../../helper/QuantityHelper";
import { sendEvent } from "../../helper/EventTracker";

const Navbar = ({ brandData, setOpenCart }) => {
  // const brandData = globalState.brandData
  const { globalState, setGlobalState } = useContext(ProductContext);

  return (
    <div className="flex justify-center w-full lg:fixed p-3 border-b-[1px] border-zinc-200 bg-white top-0 z-20">
      <div
        className={`w-full lg:w-[90vw] flex justify-between lg:px-4 lg:max-w-[1800px] ${
          setOpenCart ? "lg:gap-24" : ""
        }`}
      >
        <div
          className=""
          onClick={() => {
            sendEvent("Brand Logo Clicked");
            window.location.href = "https://" + brandData.domain;
          }}
        >
          <img
            src={brandData.logo.url}
            className="object-contain h-10 cursor-pointer w-14"
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <div className="px-2">
            <SocialCounter social={brandData.socialMedia} />
          </div>
          {globalState && setOpenCart && (
            <div
              className={`hidden relative lg:grid ${
                globalState.multiProductCart.length > 0
                  ? "visible"
                  : "invisible"
              }`}
              onClick={() => setOpenCart(true)}
            >
              <p className="rounded-full bg-purple-800 text-[8px] text-white px-1 text-center absolute top-0 right-0">
                {calculateTotalItems(globalState.multiProductCart, true)}
              </p>
              <img className="" src={cartIcon.src} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  brand: PropTypes.object,
  setOpenCart: PropTypes.func,
  brandData: PropTypes.object,
};

export default Navbar;

//read more
