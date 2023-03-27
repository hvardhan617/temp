export async function getProductsData(id) {
  // let dev = 'https://myapi.fibr.shop/';
  let staging = "https://staging-api.fibr.shop/product";
  let res = await fetch(`${staging}/pdp/products/${id}`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
}

export async function getBrandData(id) {
  // let dev = 'https://brands-api.fibr.shop/';
  let staging = "https://staging-api.fibr.shop/brand";
  let res = await fetch(`${staging}/pdp/brand/${id}`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
}

export async function getCollectionData(id) {
  let staging = "https://staging-api.fibr.shop/product";

  let res = await fetch(`${staging}/pdp/product-groups/${id}`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
}

export async function getCampaignData(id) {
  // let dev = 'https://dev-brands.fibr.shop';
  let staging = "https://staging-api.fibr.shop/brand";

  let res = await fetch(`${staging}/pdp/campaign/${id}`, {
    method: "GET",
  });
  let data = await res.json();
  return data;
}

export async function getCartDetails(campaignId, cartArr, coupon = "") {
  // let dev = 'https://dev-brands.fibr.shop';
  let staging = "https://staging-api.fibr.shop/product";

  let body = {
    discountCode: "",
    storeId: "shopify",
    items: cartArr,
  };

  let res = await fetch(`${staging}/pdp/cart/create/${campaignId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  let data = await res.json();
  return data.data;
}
