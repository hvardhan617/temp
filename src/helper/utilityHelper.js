export const isInViewport = (el) => {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

async function getServerData(id) {
  // let dev = 'https://myapi.fibr.shop/';
  let staging = 'https://staging-api.fibr.shop/product/';
  let res = await fetch(`${staging}/pdp/product/${id}`, {
    method: 'GET',
  });
  let data = await res.json();
  return data;
}

async function getBrandData(id) {
  // let dev = 'https://brands-api.fibr.shop/';
  let staging = 'https://staging-api.fibr.shop/brand/';
  let res = await fetch(`${staging}/pdp/brand/${id}`, {
    method: 'GET',
  });
  let data = await res.json();
  return data;
}

async function getCollectionData(id) {
  let res = await fetch(`https://staging-api.fibr.shop/product/pdp/product-group/${id}`, {
    method: 'GET',
  });
  let data = await res.json();
  return data;
}

export async function dataCleaning(request) {
  try {
    let route = request.url;
    let productId = '',
      collectionId = '';
    let data = null,
      brandData = null;

    if (route.includes('products')) {
      productId = route.split('/products/')[1];
      data = await getServerData(productId);
      brandData = await getBrandData(data.data.id.brandId);
      data = {
        ...data,
        brandData: brandData.data,
        multi: false,
      };
    }

    if (route.includes('collections')) {
      collectionId = route.split('/collections/')[1];
      data = await getCollectionData(collectionId);
      brandData = await getBrandData(data.data.id.brandId);
      data = {
        ...data,
        brandData: brandData.data,
        multi: true,
      };
    }

    if (data && brandData) {
      return data;
    }
  } catch (error) {
    return error;
  }
}


