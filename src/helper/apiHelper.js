let api_Host = process.env.NEXT_API_HOST;

export async function getProductsData(id) {
  // let dev = 'https://myapi.fibr.shop/';
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/product/pdp/products/${id}`,
    {
      method: "GET",
    }
  );
  let data = await res.json();
  return data;
}

export async function getBrandData(id) {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/brand/pdp/brand/${id}`,
    {
      method: "GET",
    }
  );
  let data = await res.json();
  return data;
}

export async function getCollectionData(id) {
  let staging = api_Host;
  console.log("env variable ", api_Host);

  let res = await fetch(`${staging}/product/pdp/product-groups/${id}`, {
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
    discountCode: coupon,
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
