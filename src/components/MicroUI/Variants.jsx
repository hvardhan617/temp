import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { sendEvent } from "../../helper/EventTracker";

const Variants = () => {
  const { globalState, setGlobalState } = useContext(ProductContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const variants = globalState.productDetails.variants[0].details;
  const tempVariantsOptions = globalState.productDetails.options;

  const [variantOptions, setVariantOption] = useState([...tempVariantsOptions]);

  useEffect(() => {
    console.log("variantusss", globalState.productDetails);
    let optionObj = {};

    let x = { ...globalState.selectedVariant.options };

    Object.keys(x).map((k) => {
      if (!x[k].label) {
        x[k] = {
          label: x[k],
          enable: true,
        };
      }
    });

    console.log("xxxx", x);

    setSelectedOption(x);
  }, []);

  const handleOption = (key, value) => {
    sendEvent("Click_Variant_Changed");

    let optionObj = {
      ...selectedOption,
      [key]: value,
    };

    let tempVariantOptions = getValues({ key: key, value: value });

    setVariantOption(tempVariantOptions);

    setSelectedOption(optionObj);

    const selectedVariant = getMatchedVariant(variants, optionObj);

    if (!selectedVariant) {
      return;
    }
    let search = window.location.search;

    search = search.split("?")[1];

    if (search.includes("variant")) {
      let newsearch = search.substring(search.indexOf("&") + 1);
      search = newsearch;
    }

    window.history.replaceState(
      "",
      "",
      `?variant=${selectedVariant._id}&${search}`
    );

    let state = {
      ...globalState,
      selectedVariant: {
        ...selectedVariant,
      },
      storesData: { ...selectedVariant.pricesFromStores },
    };

    if (!globalState.multi) {
      let cartItems = globalState.cartItems;
      let price = selectedVariant.price;

      cartItems[0] = {
        ...cartItems[0],
        ...selectedVariant,
        pid: selectedVariant._id,
        price: price,
      };

      setGlobalState({
        ...state,
        cartItems: cartItems,
      });

      return;
    }

    setGlobalState({
      ...state,
    });
  };

  const getMatchedVariant = (variants, optionObj) => {
    let mVairant = variants.filter((variant) => {
      let variantOptions = variant.options;
      let matchedVariant = true;
      Object.keys(variantOptions).map((option) => {
        if (variantOptions[option] !== optionObj[option].label) {
          matchedVariant = false;
        }
      });

      return matchedVariant;
    })[0];

    console.log("mvairant", mVairant, variants, optionObj);
    return mVairant;
  };

  const getValues = (optionObj) => {
    let exp2 = [];
    variants.map((variant) => {
      let variantOptions = variant.options;
      if (variantOptions[optionObj.key] === optionObj.value.label) {
        Object.keys(variantOptions).map((key) => {
          if (key != optionObj.key) {
            exp2.push(variantOptions[key]);
          }
        });
      }
    });

    let tempOptions = [...variantOptions];

    tempOptions.map((variant, i) => {
      if (optionObj.key !== variant.key) {
        const updated = variant.values.map((v) => {
          if (!exp2.includes(v.label)) {
            v.enable = false;
          } else {
            v.enable = true;
          }
          return v;
        });

        let updatedObj = {
          key: variant.key,
          values: updated,
          position: 2,
        };

        tempOptions[i] = updatedObj;
      }
    });

    console.log("new temp", exp2, tempOptions);
    return tempOptions;
    // Object.keys(variantOptions).map((key) => {
    //   if (key !== optionObj.key) {
    //     setVariantOption([...variantOptions, { [key]: [...exp2] }]);
    //   }
    // });
  };

  if (selectedOption) {
    return (
      <div className="select-none variantLayout">
        {/* <Variant data={data} /> */}
        {variantOptions.map((option, i) => {
          return (
            <VariantV2
              data={option}
              key={i}
              id={i}
              selectedOption={selectedOption}
              handleOption={handleOption}
            />
          );
        })}
      </div>
    );
  }
};

Variants.propTypes = {};

const Variant = ({ data }) => {
  const { globalState, setGlobalState } = useContext(ProductContext);
  const variantDetails = globalState.productDetails.variants[0].details;

  const theme = {
    solid: "#2D2D2D",
    outline: "#2D2D2D",
    ...globalState.theme,
  };
  const [active, setActive] = useState(globalState.selectedVariant._id);

  useEffect(() => {
    setActive(globalState.selectedVariant._id);
  }, [globalState]);

  const handleChange = (id) => {
    let search = window.location.search;

    search = search.split("?")[1];

    if (search.includes("variant")) {
      let newsearch = search.substring(search.indexOf("&") + 1);
      search = newsearch;
    }

    window.history.replaceState("", "", `?variant=${id}&${search}`);
    sendEvent("Variant Changed", {
      id: id,
    });

    setActive(id);

    let variants = [...globalState.variants.details];

    const selectedVariant = variants.filter((variant) => variant._id === id)[0];

    let state = {
      ...globalState,
      selectedVariant: {
        ...selectedVariant,
      },
      storesData: { ...selectedVariant.pricesFromStores },
    };

    if (!globalState.multi) {
      let cartItems = globalState.cartItems;
      let price = selectedVariant.price;

      cartItems[0] = {
        ...cartItems[0],
        ...selectedVariant,
        pid: selectedVariant._id,
        price: price,
      };

      setGlobalState({
        ...state,
        cartItems: cartItems,
      });

      return;
    }

    setGlobalState({
      ...state,
    });
  };

  return (
    <div className="variantCard">
      <div className="variantHeader">
        <p className="variantTitle">{data.type}</p>
        <p className="variantOptions">{variantDetails.length} options</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {variantDetails.map((value, i) => {
          return (
            <button
              key={i}
              style={
                active === value._id
                  ? {
                      backgroundColor: theme.solid,
                      borderColor: "white",
                      color: "white",
                      fontWeight: "bolder",
                    }
                  : {
                      backgroundColor: "white",
                      borderColor: theme.outline,
                      color: "black",
                      fontWeight: "600",
                    }
              }
              className={`py-[4px] px-4 rounded-3xl border-[2px] lg:py-2 lg:px-6 ${
                active === value._id
                  ? "bg-[#2D2D2D] border-white"
                  : "border-[#737373]"
              }`}
              data-test={`variant-${i}`}
              id={`variant-${i}`}
              onClick={() => handleChange(value._id)}
            >
              {value.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

Variant.propTypes = {
  data: PropTypes.object,
  id: PropTypes.number,
};

export default Variants;

const VariantV2 = ({ data, selectedOption, handleOption, id }) => {
  const { globalState } = useContext(ProductContext);

  const theme = {
    solid: "#2D2D2D",
    outline: "#2D2D2D",
    ...globalState.theme,
  };

  // const handleChange = (id) => {
  //   let search = window.location.search;

  //   search = search.split('?')[1];

  //   if (search.includes('variant')) {
  //     let newsearch = search.substring(search.indexOf('&') + 1);
  //     search = newsearch;
  //   }

  //   window.history.replaceState('', '', `?variant=${id}&${search}`);
  //   sendEvent('Variant Changed', {
  //     id: id,
  //   });

  //   setActive(id);

  //   let variants = [...globalState.variants.details];

  //   const selectedVariant = variants.filter((variant) => variant._id === id)[0];

  //   let state = {
  //     ...globalState,
  //     selectedVariant: {
  //       ...selectedVariant,
  //     },
  //     storesData: { ...selectedVariant.pricesFromStores },
  //   };

  //   if (!globalState.multi) {
  //     let cartItems = globalState.cartItems;
  //     let price = selectedVariant.price;

  //     cartItems[0] = {
  //       ...cartItems[0],
  //       ...selectedVariant,
  //       pid: selectedVariant._id,
  //       price: price,
  //     };

  //     setGlobalState({
  //       ...state,
  //       cartItems: cartItems,
  //     });

  //     return;
  //   }

  //   setGlobalState({
  //     ...state,
  //   });
  // };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <p className="text-base font-semibold">{data.key}</p>
        <p className="text-sm text-zinc-400 lg:hidden">
          {data.values.length} options
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        {id === 0
          ? data.values.map((value, i) => {
              return (
                <button
                  key={i}
                  style={
                    selectedOption[data.key].label === value.label
                      ? {
                          backgroundColor: theme.solid,
                          borderColor: "white",
                          color: "white",
                          fontWeight: "bolder",
                        }
                      : {
                          backgroundColor: "white",
                          borderColor: theme.outline,
                          color: "black",
                          fontWeight: "600",
                        }
                  }
                  className={`py-[4px] px-4 rounded-3xl border-[2px] lg:py-2 lg:px-6 disabled:opacity-20 ${
                    selectedOption[data.key] === value
                      ? "bg-[#2D2D2D] border-white"
                      : "border-[#737373]"
                  }`}
                  data-test={`variant-${i}`}
                  id={`variant-${i}`}
                  onClick={() => handleOption(data.key, value)}
                >
                  {value.label}
                </button>
              );
            })
          : data.values.map((value, i) => {
              return (
                <button
                  key={i}
                  disabled={!value.enable}
                  style={
                    selectedOption[data.key].label === value.label
                      ? {
                          backgroundColor: theme.solid,
                          borderColor: "white",
                          color: "white",
                          fontWeight: "bolder",
                        }
                      : {
                          backgroundColor: "white",
                          borderColor: theme.outline,
                          color: "black",
                          fontWeight: "600",
                        }
                  }
                  className={`py-[4px] px-4 rounded-3xl border-[2px] lg:py-2 lg:px-6 disabled:opacity-20 ${
                    selectedOption[data.key] === value
                      ? "bg-[#2D2D2D] border-white"
                      : "border-[#737373]"
                  }`}
                  data-test={`variant-${i}`}
                  id={`variant-${i}`}
                  onClick={() => handleOption(data.key, value)}
                >
                  {value.label}
                </button>
              );
            })}
      </div>
    </div>
  );
};

VariantV2.propTypes = {
  data: PropTypes.object,
  selectedOption: PropTypes.func,
  handleOption: PropTypes.func,
  key: PropTypes.number,
  id: PropTypes.number,
};
