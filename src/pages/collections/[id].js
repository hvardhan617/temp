import ExtraContent from "@/components/ExtraContent";
import BottomBar from "@/components/Layout/BottomBar";
import Cart from "@/components/Layout/Cart";
import Navbar from "@/components/Layout/Navbar";
import ImageSlider from "@/components/MicroUI/ImageSlider";
import ProductList from "@/components/Multiproduct/ProductList";
import ProductInfo from "@/components/ProductInfo";
import { ProductContext } from "@/context/ProductContext";
import { getCartDetails } from "@/helper/apiHelper";
import { initEventApps } from "@/helper/EventTracker";
import { getDataLayer } from "@/helper/globalDataLayer";
import { getCouponCode, isInViewport } from "@/helper/utilityHelper";
import Head from "next/head";
import redis from '../../redis';
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const Collection = ({ productData, campaignData, brandData }) => {
  const router = useRouter();
  const { id } = router.query;
  const { globalState, setGlobalState } = useContext(ProductContext);
  const [extraContent, setExtraContent] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const [hideBottom, setHideBottom] = useState(true);

  useEffect(() => {
    let state = getDataLayer({
      data: productData,
      brandData,
      multi: true,
      campaignData,
    });
    setExtraContent(true);
    setGlobalState({ ...state });
    initGlobalState(state);
    if (typeof window !== undefined) {
      initEventApps();
    }

    setTimeout(() => {
      toggleBottomBar();
    }, 200);

    document.addEventListener("scroll", toggleBottomBar, {
      passive: true,
    });
  }, []);

  const initGlobalState = async (state) => {
    console.log("initGlobalState", state);
    let cartArr = [
      {
        variantId: state.selectedVariant._id,
        quantity: state.cartItems[0].quantity,
      },
    ];

    console.log(
      "getCouponCode(state.campaignData)",
      getCouponCode(state.campaignData)
    );

    let checkoutDetails = await getCartDetails(
      state.campaignData._id,
      cartArr,
      getCouponCode(state.campaignData)
    );
    setGlobalState({ ...state, checkoutDetails: checkoutDetails.checkout });
  };

  const toggleBottomBar = () => {
    const box = document.querySelector(".storeCard");
    isInViewport(box) ? setHideBottom(true) : setHideBottom(false);
  };

  const handleCart = (value) => {
    setOpenCart(value);
  };

  return (
    <div className="relative">
      <Head>
        <title></title>
      </Head>
      <div className="flex flex-row justify-between lg:justify-center items-center w-full lg:gap-16 h-[53px]">
        <Navbar setOpenCart={handleCart} brandData={brandData} />
      </div>
      <div className="flex justify-between w-full">
        <div className="hidden lg:flex justify-center w-[15%]">
          <div className="flex flex-col md:items-center lg:items-start lg:flex-row lg:gap-8">
            <div className="">
              <div className="hidden lg:flex lg:justify-end border-r-[1px] border-zinc-200 h-[95vh] lg:p-6 z-30 bg-white  overflow-scroll fixed left-0">
                {extraContent && <ProductList />}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full">
          <div className="flex flex-col lg:items-start lg:justify-between gap-10 lg:flex-row lg:max-w-[1800px]">
            <div className="lg:w-[32vw] lg:max-w-[768px] xl:w-[36vw] xl:max-w-[768px]">
              <div className="lg:fixed lg:w-[32vw] lg:max-w-[40vw] xl:w-[36vw] xl:max-w-[40vw]">
                {extraContent ? (
                  <ImageSlider />
                ) : (
                  <div className="w-full px-4 mx-auto my-4 lg:h-full lg:max-h-[525px] lg:max-w-[525px] rounded-xl text-center relative">
                    <div className="max-w-[460px] flex justify-center">
                      <img
                        src={productData.products[0].media[0].url}
                        className="w-full mx-auto select-none rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-[36vw] lg:max-w-[850px]">
              <ProductInfo details={productData.products[0]} />
              {extraContent && (
                <ExtraContent featured={globalState.brandData.highlights} />
              )}
            </div>
          </div>
          {extraContent && !hideBottom && (
            <>
              <BottomBar setOpenCart={setOpenCart} />
              <div
                className={`ease-in-out absolute w-full bg-black bg-opacity-70 top-0 z-30 ${openCart ? "visible" : "invisible"
                  }`}
              >
                <div
                  className={`lg:hidden w-full ease-in-out fixed bottom-0 ${openCart ? "translate-y-0" : "translate-y-full"
                    }`}
                >
                  <Cart setOpenCart={setOpenCart} />
                </div>
                <div
                  className={`hidden lg:flex ease-in-out fixed bottom-0 lg:right-0 lg:top-0 ${openCart ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                  <Cart setOpenCart={setOpenCart} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;

export async function getServerSideProps({ query }) {
  console.log("query1122", JSON.stringify(query));

  // Check if the requested page exists in Redis cache
  const cachedPage = await redis.get(`page:${query}`);
  if (cachedPage) {
    console.log(":::::CACHED PAGE:::::")
    return {
      props: {
        data: JSON.parse(cachedPage)
      }
    };
  }

  // If the requested page does not exist in cache, fetch it from the origin server
  const productData = await getCollectionData(query.id);
  console.log("productData", productData);
  const campaignData = await getCampaignData(query.campaign);
  console.log("campaignData", campaignData);
  const brandData = await getBrandData(campaignData.data.id.brandId);
  console.log("branddata", brandData);

  let data = {
    productData: productData.data,
    campaignData: { ...campaignData.data, _id: query.campaign },
    brandData: brandData.data,
  }
  // Store the fetched page in Redis cache
  console.log("::::Setting page data into redis:::::")
  await redis.set(`page:${query}`, JSON.stringify(data), 'EX', 60 * 5); // set expiry time to 5 minutes

  let stringifyP = JSON.stringify(productData);
  let stringifyC = JSON.stringify(campaignData);
  let stringifyB = JSON.stringify(brandData);

  console.log("stringified", stringifyB, stringifyC, stringifyP);

  return {
    props: { data },
  };
}

async function getProductsData(id) {
  // let dev = 'https://myapi.fibr.shop/';
  let staging = "https://staging-api.fibr.shop/product";
  let res = await fetch(`${staging}/pdp/products/${id}`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
}

async function getBrandData(id) {
  // let dev = 'https://brands-api.fibr.shop/';
  let staging = "https://staging-api.fibr.shop/brand";
  let res = await fetch(`${staging}/pdp/brand/${id}`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
}

async function getCollectionData(id) {
  let staging = "https://staging-api.fibr.shop/product";

  let res = await fetch(`${staging}/pdp/product-groups/${id}`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
}

async function getCampaignData(id) {
  // let dev = 'https://dev-brands.fibr.shop';
  let staging = "https://staging-api.fibr.shop/brand";

  let res = await fetch(`${staging}/pdp/campaign/${id}`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
}
