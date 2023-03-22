import ExtraContent from "@/components/ExtraContent";
import BottomBar from "@/components/Layout/BottomBar";
import Navbar from "@/components/Layout/Navbar";
import ImageSlider from "@/components/MicroUI/ImageSlider";
import ProductInfo from "@/components/ProductInfo";
import { ProductContext } from "@/context/ProductContext";
import { initEventApps } from "@/helper/EventTracker";
import { getDataLayer } from "@/helper/globalDataLayer";
import { isInViewport } from "@/helper/utilityHelper";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useContext, useEffect, useState } from "react";

const Collection = ({ productData, campaignData, brandData }) => {
  const router = useRouter();
  const { id } = router.query;
  const { globalState, setGlobalState } = useContext(ProductContext);
  const [extraContent, setExtraContent] = useState(false);

  const [hideBottom, setHideBottom] = useState(true);

  useEffect(() => {
    let state = getDataLayer({ data: productData, brandData });
    console.log("globaleState", state);
    setExtraContent(true);
    setGlobalState({ ...state });
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

  const toggleBottomBar = () => {
    const box = document.querySelector(".storeCard");
    isInViewport(box) ? setHideBottom(true) : setHideBottom(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center justify-between w-full h-16 py-3 lg:justify-center lg:gap-16">
        <Navbar brandData={brandData} />
      </div>
      <div className="flex justify-center w-full ">
        <div className="flex flex-col lg:items-start lg:justify-between lg:flex-row lg:w-[90vw] lg:max-w-[1800px]">
          <div className="lg:w-[32vw] lg:max-w-[768px] xl:w-[36vw] xl:max-w-[768px]">
            <div className="lg:fixed lg:w-[32vw] lg:max-w-[40vw] xl:w-[36vw] xl:max-w-[40vw]">
              {extraContent ? (
                <ImageSlider />
              ) : (
                <div className="w-full px-4 mx-auto my-4 lg:h-full lg:max-h-[525px] lg:max-w-[525px] rounded-xl text-center relative">
                  <div className="max-w-[460px] flex justify-center">
                    <img
                      src={productData.media[0].url}
                      className="w-full mx-auto select-none rounded-xl"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-[45vw] lg:max-w-[850px]">
            <ProductInfo details={productData} />
            {extraContent && (
              <ExtraContent featured={globalState.brandData.highlights} />
            )}
          </div>
        </div>
      </div>
      {extraContent && !hideBottom && <BottomBar />}
    </div>
  );
};

export default Collection;

export async function getServerSideProps({ query }) {
  try {
    console.log("query1122", JSON.stringify(query));

    const productData = await getProductsData(query.id);
    console.log("productData", productData);
    const campaignData = await getCampaignData(query.campaign);
    console.log("campaignData", campaignData);
    const brandData = await getBrandData(campaignData.data.id.brandId);
    console.log("branddata", brandData);
    return {
      props: {
        productData: productData.data,
        campaignData,
        brandData: brandData.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
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
