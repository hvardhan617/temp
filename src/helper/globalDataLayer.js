export const getDataLayer = (server) => {
  // let server = {
  //   data: {
  //     _id: '63edfbd50bc94b2355e85173',
  //     id: {
  //       brandId: '63ff3ee9bb27651b846c3bf1',
  //       code: 'dwThbHuO_L2tE_JrgZEDM',
  //     },
  //     title: 'Adipiscing suspen q',
  //     details:
  //       'Venenatis duis tristique accumsan netus enim in posuere torquent ut ullamcorper integer aliquam a mi curae elementum. Maecenas iaculis viverra tellus ridiculus a sevestibulum dapibus. Ante a mollis habitant duis urna cum iaculis ullamcorper luctus.\n\n65% Polyester, 23% Elastane\nAbitur parturient praesent ipsu\nMinceptos pri 187cm/3’1.3″ tall\nDiam parturient dictumst nibh mu',
  //     shortTitle: 'Adipiscing',
  //     shortDetails:
  //       'Posuere in netus a eu varius adipiscing suspendisse elementum vitae tempor suspendisse ullamcorper aenean taciti morbi potenti cursus id tortor. Cursus nulla consectetur a eros adipiscing himenaeos nam taciti id turpis a scelerisque vel habitasse',
  //     rating: {
  //       avgRating: 4.25,
  //       totalNoOfRating: 6049,
  //     },
  //     ratingSources: [
  //       {
  //         avgRating: 3.5,
  //         totalNoOfRating: 50,
  //         storeId: 'shopify',
  //       },
  //     ],
  //     stores: [
  //       {
  //         storeId: 'shopify',
  //         storeProductId: '8859320386',
  //         url: 'https://fibr-test-pilot.myshopify.com/admin',
  //         affiliateUrl: '',
  //       },
  //     ],
  //     variants: [
  //       {
  //         _id: '63ee08f64d94ca4699add3ab',
  //         id: {
  //           brandId: '63ff3ee9bb27651b846c3bf1',
  //           code: 'NPTjvi-4bTbfo2Zctdwxp',
  //         },
  //         skuId: 'SKU10',
  //         title: 'Black',
  //         details:
  //           'Venenatis duis tristique accumsan netus enim in posuere torquent ut ullamcorper integer aliquam a mi curae elementum. Maecenas iaculis viverra tellus ridiculus a sed vestibulum dapibus. Ante a mollis habitant duis urna cum iaculis ullamcorper luctus.\n\n65% Polyester, 23% Elastane\nAbitur parturient praesent ipsu\nMinceptos pri 187cm/3’1.3″ tall\nDiam parturient dictumst nibh mu',
  //         shortTitle: 'Black',
  //         shortDetails:
  //           'Posuere in netus a eu varius adipiscing suspendisse elementum vitae tempor suspendisse ullamcorper aenean taciti morbi potenti cursus id tortor. Cursus nulla consectetur a eros adipiscing himenaeos nam taciti id turpis a scelerisque vel habitasse',
  //         price: {
  //           marketPrice: 569,
  //           listPrice: 450,
  //           currency: 'INR',
  //           taxPercent: 5.5,
  //           taxesIncluded: false,
  //           shippingIncluded: true,
  //         },
  //         pricesFromStores: [
  //           {
  //             marketPrice: 569,
  //             listPrice: 450,
  //             currency: 'INR',
  //             taxPercent: 5.5,
  //             taxesIncluded: false,
  //             shippingIncluded: true,
  //             storeId: 'shopify',
  //           },
  //         ],
  //         asin: 'B07756XRZJ',
  //         ean: '',
  //         iban: '',
  //         position: 1,
  //         media: [
  //           {
  //             url: 'https://cdn.shopify.com/s/files/1/0088/5932/0386/products/clocks5_2.jpg?v=1597784128',
  //             name: '',
  //             key: '',
  //             bucket: '',
  //             dimensions: {
  //               height: 800,
  //               width: 700,
  //             },
  //             mimeType: 'image/jpg',
  //             type: 'image',
  //             source:
  //               'https://cdn.shopify.com/s/files/1/0088/5932/0386/products/clocks5.jpg?v=1597784128',
  //           },
  //         ],
  //         availability: {
  //           inventoryId: '34098389385282',
  //           status: 'instock',
  //           currentStock: 1000,
  //         },
  //         deleted: false,
  //         createdAt: '2023-02-16T10:44:06.406Z',
  //         updatedAt: '2023-02-16T10:44:06.406Z',
  //         __v: 0,
  //         productId: '63edfbd50bc94b2355e85173',
  //       },
  //       {
  //         _id: '63ee09febaf003ad48315eb1',
  //         id: {
  //           brandId: '63ff3ee9bb27651b846c3bf1',
  //           code: 'Zqfoct00kr57K1iNtbtzD',
  //         },
  //         skuId: 'SKU11',
  //         title: 'Yellow',
  //         details:
  //           'Venenatis duis tristique accumsan netus enim in posuere torquent ut ullamcorper integer aliquam a mi curae elementum. Maecenas iaculis viverra tellus ridiculus a sed vestibulum dapibus. Ante a mollis habitant duis urna cum iaculis ullamcorper luctus.\n\n65% Polyester, 23% Elastane\nAbitur parturient praesent ipsu\nMinceptos pri 187cm/3’1.3″ tall\nDiam parturient dictumst nibh mu',
  //         shortTitle: 'Yellow',
  //         shortDetails:
  //           'Posuere in netus a eu varius adipiscing suspendisse elementum vitae tempor suspendisse ullamcorper aenean taciti morbi potenti cursus id tortor. Cursus nulla consectetur a eros adipiscing himenaeos nam taciti id turpis a scelerisque vel habitasse',
  //         price: {
  //           marketPrice: 569,
  //           listPrice: 450,
  //           currency: 'INR',
  //           taxPercent: 5.5,
  //           taxesIncluded: false,
  //           shippingIncluded: true,
  //         },
  //         pricesFromStores: [
  //           {
  //             marketPrice: 569,
  //             listPrice: 450,
  //             currency: 'INR',
  //             taxPercent: 5.5,
  //             taxesIncluded: false,
  //             shippingIncluded: true,
  //             storeId: 'shopify',
  //           },
  //         ],
  //         asin: 'B097MRR2W3',
  //         ean: '',
  //         iban: '',
  //         position: 2,
  //         media: [
  //           {
  //             url: 'https://cdn.shopify.com/s/files/1/0088/5932/0386/products/clocks5_2.jpg?v=1597784128',
  //             name: '',
  //             key: '',
  //             bucket: '',
  //             dimensions: {
  //               height: 800,
  //               width: 700,
  //             },
  //             mimeType: 'image/jpg',
  //             type: 'image',
  //             source:
  //               'https://cdn.shopify.com/s/files/1/0088/5932/0386/products/clocks5_2.jpg?v=1597784128',
  //           },
  //         ],
  //         availability: {
  //           inventoryId: '34098389418050',
  //           status: 'instock',
  //           currentStock: 1000,
  //         },
  //         deleted: false,
  //         createdAt: '2023-02-16T10:48:30.836Z',
  //         updatedAt: '2023-02-16T10:48:30.836Z',
  //         __v: 0,
  //         productId: '63edfbd50bc94b2355e85173',
  //       },
  //     ],
  //   },
  // };
  let data = {};
  if (!server) {
    return;
  }
  if (server.multi) {
    data = {
      brand: {
        logo: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/boat_logo_small.webp?v=1672379935",
        social: [
          {
            platform: "instagram",
            count: "188K",
          },
          {
            platform: "facebook",
            count: "215K",
          },
          {
            platform: "twitter",
            count: "110K",
          },
        ],
        // theme:{
        //   outline:"#ec1d22",
        //   solid:"#ec1d22"
        // },
      },
      details: {
        ...server.data.products[0],
        variants: [
          {
            type: "Colour",
            details: [...server.data.products[0].variants],
          },
        ],

        options: cleanOptions(server.data.products[0].options),
      },
      selectedVariant: { ...server.data.products[0].variants[0] },
      productList: getProductDetailsObj(server.data.products),
      stores: server.data.stores,
      collectionName: server.data.name,
    };
  } else {
    data = {
      brand: {
        logo: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/boat_logo_small.webp?v=1672379935",
        social: [
          {
            platform: "instagram",
            count: "188K",
          },
          {
            platform: "facebook",
            count: "215K",
          },
          {
            platform: "twitter",
            count: "110K",
          },
        ],
        // theme:{
        //   outline:"#ec1d22",
        //   solid:"#ec1d22"
        // },
      },
      details: {
        ...server.data,
        options: cleanOptions(server.data.options),
        variants: [
          {
            type: "Colour",
            details: [...server.data.variants],
          },
        ],
      },
      selectedVariant: { ...server.data.variants[0] },
      stores: server.data.stores,
    };
  }

  return {
    store: "Brand",
    multi: server.multi,
    currency: getCurrency("USD"),
    theme: { ...data.brand.theme },
    productAddedToCart: false,
    cartItems: getCart() ?? [
      {
        ...data.details.variants[0].details[0],
        quantity: 1,
        thumbnail:
          "https://ik.manmatters.com/media/misc/pdp_rcl/26166797/4_-Redensyl-Oil-_600X600_-with-ingredients_xs66fiKuT.png?tr=w-600",
      },
    ],
    multiProductCart: [],
    productList: data.productList ? [...data.productList] : undefined,
    selectedStore: "Shopify",
    stores: data.stores,
    storesData: { ...data.details.variants[0].details[0].storesPrices },
    selectedVariant: { ...data.selectedVariant },
    variants: { ...data.details.variants[0] },
    productDetails: data.details,
    brandData: server.brandData,
    collectionName: data.collectionName,
    variantDetails: data.details.variants,
    finalCart: {},
  };
};

const getProductDetailsObj = (data) => {
  let products = data.map((prod) => {
    return {
      ...prod,
      variants: [
        {
          type: "Colour",
          details: [...prod.variants],
        },
      ],
    };
  });

  console.log("aaallllProducts", products.variants);

  return products;
};

export const getProductDetails = (globalState, prod) => {
  return {
    ...globalState,
    selectedProduct: { ...prod, options: cleanOptions(prod.options) },
    storesData: { ...prod.variants[0].details[0].storesPrices },
    selectedVariant: { ...prod.variants[0].details[0] },
    variants: { ...prod.variants[0] },
    productDetails: {
      ...prod,
      options: cleanOptions(prod.options),
    },

    cartItems: [
      {
        ...prod.variants[0].details[0],
        quantity: 1,
        thumbnail:
          "https://ik.manmatters.com/media/misc/pdp_rcl/26166797/4_-Redensyl-Oil-_600X600_-with-ingredients_xs66fiKuT.png?tr=w-600",
      },
    ],
  };
};

const getCurrency = (currency) => {
  if (currency === "USD") return "$";
  if (currency === "INR") return "₹";
};

const cleanOptions = (options) => {
  let newOptions = options.map((option) => {
    let newValues = option.values.map((value) => {
      let newValue = {
        label: value,
        enable: true,
      };
      return newValue;
    });

    return { ...option, values: newValues };
  });
  console.log("cleanOptions", newOptions);

  return newOptions;
};

export const persistCart = (cart) => {
  sessionStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = () => {
  try {
    let cart = sessionStorage.getItem("cart");
    if (cart) {
      return JSON.parse(cart);
    }
    return undefined;
  } catch (error) {
    return [];
  }
};
