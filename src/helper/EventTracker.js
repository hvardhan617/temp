"use client";

import mixpanel from "mixpanel-browser";
// import ReactPixel from 'react-facebook-pixel';
import ReactGA from "react-ga4";

const sendMixPanelEvent = (eventName, extras) => {
  mixpanel.track(eventName, extras);
  console.log('mixpanel.get_distinct_id()', mixpanel.get_distinct_id(),);
};

export const initEventApps = () => {
  mixpanel.init("912d68a7f947fbc07f7a883043c61079", { debug: true });
  // ReactPixel.init('590918032795677');
  ReactGA.initialize("G-PDVX1QFG0G");
};

export const sendEvent = (eventName, extras = {}) => {
  sendMixPanelEvent(eventName, extras);
  //   sendPixelEvent(eventName);

  ReactGA.event({
    category: "logo",
    action: "click",
  });
};

const sendPixelEvent = (eventName) => {
  if (eventName === "User Landed") {
    window.fbq("track", "PageView");
  }

  if (
    eventName === "Click_Product_Changed" ||
    eventName === "Click_Variant_Changed"
  ) {
    window.fbq("track", "ViewContent");
  }

  if (eventName === "Click_Add_To_Cart") {
  }
  if (
    eventName === "Click_Bottom_Buy_Button" ||
    eventName === "Click_Brand_Card_Checkout" ||
    eventName === "Click_Brand_Deal_Checkout" ||
    eventName === "Click_Amazon_Card_Checkout" ||
    eventName === "Click_Amazon_Deal_Checkout"
  ) {
  }

  if (
    eventName === "Click_Amazon_Card_Checkout" ||
    eventName === "Click_Amazon_Deal_Checkout"
  ) {
  }
};

// export const initGA = () => {
//   ReactGA.initialize('GA_TRACKING_ID');
// };

// export const logPageView = () => {
//   ReactGA.set({ page: window.location.pathname });
//   ReactGA.pageview(window.location.pathname);
// };

// export const logEvent = (category = '', action = '') => {
//   if (category && action) {
//     ReactGA.event({
//       category,
//       action,
//     });
//   }
// };

// export const logException = (description = '', fatal = false) => {
//   if (description) {
//     ReactGA.exception({
//       description,
//       fatal,
//     });
//   }
// };
