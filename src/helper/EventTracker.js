"use client";

import mixpanel from "mixpanel-browser";
// import ReactPixel from 'react-facebook-pixel';
// import ReactGA from 'react-ga';

const sendMixPanelEvent = (eventName, extras) => {
  mixpanel.track(eventName, extras);
};

export const initEventApps = () => {
  mixpanel.init("912d68a7f947fbc07f7a883043c61079", { debug: true });
  //   ReactPixel.init('590918032795677');
  //   ReactGA.initialize('G-YZ3X85LCKZ');
};

export const sendEvent = (eventName, extras = {}) => {
  sendMixPanelEvent(eventName, extras);
  //   sendPixelEvent(eventName);
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
