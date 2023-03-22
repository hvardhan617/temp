// import data from './../src/data/auric';
// import data from './../src/data/manmatter';
import data from './../src/data/boat';
// import data from './../src/data/littlejoys1';
export const getData = () => {
  return { ...data };
};

export const getServerData = async () => {
  let res = await fetch('https://dev-products.fibr.shop/pdp/product/63edfbd50bc94b2355e85173', {
    method: 'GET',
  });
  let data = await res.json();
  return data;
};

export const getReviewsData = async (id) => {
  // let staging = 'https://staging-api.fibr.shop/product/';
  let res = await fetch(`https://staging-api.fibr.shop/product/pdp/product-reviews/${id}`, {
    method: 'GET',
  });
  let data = await res.json();
  return data;
};

export const getLatestVariantPrices = async (id) => {
  // let dev = 'https://dev-products.fibr.shop/pdp/price-availability';
  let staging = 'https://staging-api.fibr.shop/product/pdp/price-availability';
  let res = await fetch(`${staging}/${id}`, {
    method: 'GET',
  });
  let data = await res.json();
  return data.data;
};
// productList: [
//   {
//     pid: 11,
//     details: {
//       name: '4% Redensyl Oil Booster',
//       bestPrice: true,
//       price: 314,
//       previousPrice: 449.0,
//       discount: '30% OFF',
//       ratings: {
//         avg: 4.1,
//         ratingCount: 332,
//       },
//       description:
//         'Redensyl is the most effective non-prescription drug, which works by increasing the regeneration of hair follicles. It reactivates stem cells that promote new hair growth by increasing nutrients to the scalp.',
//       variants: [
//         {
//           type: 'Size',
//           values: ['30ml', '60ml'],
//           prices: [314, 350],
//           selectedVariant: 0,
//           details: [
//             {
//               name: '4% Redensyl Oil Booster',
//               bestPrice: true,
//               price: 314,
//               previousPrice: 449.0,
//               discount: '30% OFF',
//               ratings: {
//                 avg: 4.1,
//                 ratingCount: 332,
//               },
//               description:
//                 'Redensyl is the most effective non-prescription drug, which works by increasing the regeneration of hair follicles. It reactivates stem cells that promote new hair growth by increasing nutrients to the scalp.',
//             },
//             {
//               name: '4% Redensyl Oil Booster',
//               bestPrice: true,
//               price: 350.0,
//               previousPrice: 499.0,
//               discount: '30% OFF',
//               ratings: {
//                 avg: 4.1,
//                 ratingCount: 332,
//               },
//               description:
//                 'Redensyl is the most effective non-prescription drug, which works by increasing the regeneration of hair follicles. It reactivates stem cells that promote new hair growth by increasing nutrients to the scalp.',
//             },
//           ],
//         },
//       ],
//       skus: [[11], [12]],
//     },
//     images: [
//       'https://ik.manmatters.com/media/misc/pdp_rcl/26166797/4_-Redensyl-Oil-_600X600_-with-ingredients_xs66fiKuT.png?tr=w-600',
//       'https://m.media-amazon.com/images/I/61uOqDozgIL._SX679_.jpg',
//       'https://m.media-amazon.com/images/I/81dR69vBARL._SX679_.jpg',
//       'https://m.media-amazon.com/images/I/81dR69vBARL._SX679_.jpg',
//     ],
//     extraContent: [
//       {
//         title: 'Product Overview',
//         content: [
//           {
//             label: '',
//             text: 'Helps promote healthy hair growth: The 4% Redensyl in this hair oil booster has been clinically shown to stimulate hair growth and reduce hair loss.',
//           },
//           {
//             label: '',
//             text: 'Infused with nourishing ingredients: In addition to Redensyl, this hair oil booster is also infused with sunflower oil and coconut oil, which help to strengthen and nourish the hair and scalp.',
//           },
//           {
//             label: '',
//             text: 'Suitable for all hair types: This hair oil booster is suitable for all hair types and can be used by both men and women.',
//           },
//           {
//             label: '',
//             text: 'Convenient and portable: The compact size of this hair oil booster makes it easy to take with you on the go, so you can keep your hair looking and feeling its best wherever you are.',
//           },
//           {
//             label: '',
//             text: 'Easy to use: Simply add a few drops of the oil booster to an oil of your choice and apply it on your scalp and massage it in to help stimulate blood flow and support healthy hair growth.',
//           },
//         ],
//         type: 'overview',
//         header: '',
//       },
//       {
//         title: 'Product Description',
//         contentLabel: 'Product Details',
//         content: [
//           {
//             label: 'Driver',
//             text: 'Once you get a taste of the sweet spot, there’s no turning back. A titanium driver, designed with the perfect level of forgiveness and power, so you can really smoke it.',
//           },
//           {
//             label: 'How to use ',
//             text: '1: Unplug the bottle and take 1 ml of this oil shot and mix it with any hair oil of choice.  2: Once done, apply that mix to the hair roots on the scalp.  3: Gently massage for 3-5 minutes.  4: For best results, use daily, once a day.',
//           },
//           {
//             label: 'What does the product do?',
//             text: 'Promotes hair growth 4% Redensyl is clinically proven to promote new hair growth.',
//           },
//           {
//             label: 'Reduces hair fall',
//             text: 'Strengthens follicles and slows down follicle-ageing, i.e. not letting them get to the last hair fall stage.',
//           },
//           {
//             label: 'Nourishes follicles',
//             text: 'Nourishes and enhances blood circulation',
//           },
//           {
//             label: 'Improves quality of hair',
//             text: 'With regular use, you can expect thicker and stronger hair.',
//           },
//         ],
//         images: [
//           'https://ik.manmatters.com/media/misc/pdp_rcl/26166797/How-does-it-do_D4Z4gv2v0h.jpg?tr=w-600',
//           'https://ik.manmatters.com/media/misc/pdp_rcl/26166797/how-to-use-and-when-to-use__1__KIPzcmJoM.jpg?tr=w-600',
//           'https://ik.manmatters.com/media/misc/pdp_rcl/26166797/is-this-product-right-for-me__1__BGE8utX_c.jpg?tr=w-600',
//           'https://ik.manmatters.com/media/misc/pdp_rcl/26166797/What-does-it-do-_-timeline__1__iRv6rMocm.jpg?tr=w-600',
//         ],
//         type: 'description',
//       },
//       {
//         title: 'Top Reviews',
//         images: [
//           'https://m.media-amazon.com/images/I/61ahpxxwaxL._CR0,204,1224,1224_UX175.jpg',
//           'https://m.media-amazon.com/images/I/61ahpxxwaxL._CR0,204,1224,1224_UX175.jpg',
//           'https://m.media-amazon.com/images/I/61ahpxxwaxL._CR0,204,1224,1224_UX175.jpg',
//           'https://m.media-amazon.com/images/I/61ahpxxwaxL._CR0,204,1224,1224_UX175.jpg',
//         ],
//         content: [
//           {
//             customer: 'Anonymous',
//             date: '20 Jan, 2019',
//             rating: 5,
//             title: 'miracle oil booster',
//             comment:
//               'I bought this with a sceptic mind as i was facing severe hairfall in monsoons but this was a complete saviour and miracle hair oil.',
//           },
//           {
//             customer: 'Anonymous',
//             date: '20 Jan, 2019',
//             rating: 5,
//             title: 'Strongly Recommend',
//             comment:
//               'I have become a lifelong user and will very strongly recommend to those facing hairfall.',
//           },
//           {
//             customer: 'Anonymous',
//             date: '20 Jan, 2019',
//             rating: 4,
//             title: 'Reduced my hairfall',
//             comment: 'I like this product very much reduced my hair fall',
//           },
//           {
//             customer: 'Anonymous',
//             date: '20 Jan, 2019',
//             rating: 5,
//             title: 'great results',
//             comment:
//               'I have been using this hair oil just with their advance hair oil and it is amazing the oil which is non greasy n smells good has helped a lot in reducing my hairfall.',
//           },
//         ],
//         type: 'reviews',
//       },
//       {
//         title: 'Shipping Policy',
//         content: [
//           'Please enjoy FREE SHIPPING with this product! Standard delivery typically takes 2-5 business days depending on your location. ',
//           'Two day and overnight shipping is available for an additional charge.',
//         ],
//         type: 'basic',
//       },
//       {
//         title: 'Returns Policy',
//         content: [
//           'We offer FREE RETURNS up to 45 days after arrival. We allow returns whether you use the clubs or not so please take the clubs for a test drive! ',
//           'To initiate a return, please email us hello@robingolf.comor use the chat feature.',
//         ],
//         type: 'basic',
//       },
//     ],
//   },
//   {
//     pid: 31,
//     details: {
//       name: 'Anti Hair Fall Shampoo (60ml)',
//       bestPrice: true,
//       price: 431.0,
//       previousPrice: 499.0,
//       discount: '14% OFF',
//       ratings: {
//         avg: 4.3,
//         ratingCount: 1624,
//       },
//       description:
//         'Our dermatologically tested anti-hair fall shampoo is specially designed for strengthening men’s hair and promoting hair health.',
//       variants: [
//         {
//           type: 'Size',
//           values: ['30ml', '60ml'],
//           prices: [314, 350],
//           selectedVariant: 0,
//           details: [
//             {
//               name: '4% Redensyl Oil Booster',
//               bestPrice: true,
//               price: 314,
//               previousPrice: 449.0,
//               discount: '30% OFF',
//               ratings: {
//                 avg: 4.1,
//                 ratingCount: 332,
//               },
//               description:
//                 'Redensyl is the most effective non-prescription drug, which works by increasing the regeneration of hair follicles. It reactivates stem cells that promote new hair growth by increasing nutrients to the scalp.',
//             },
//             {
//               name: '4% Redensyl Oil Booster',
//               bestPrice: true,
//               price: 350.0,
//               previousPrice: 499.0,
//               discount: '30% OFF',
//               ratings: {
//                 avg: 4.1,
//                 ratingCount: 332,
//               },
//               description:
//                 'Redensyl is the most effective non-prescription drug, which works by increasing the regeneration of hair follicles. It reactivates stem cells that promote new hair growth by increasing nutrients to the scalp.',
//             },
//           ],
//         },
//       ],
//       skus: [[11], [12]],
//     },
//     images: [
//       'https://ik.manmatters.com/mosaic-wellness/image/upload/f_auto,w_800,c_limit/v1658414512/Man%20Matters/AHS%2060ml/product%20images/AHS-60ml.png',
//       'https://ik.manmatters.com/mosaic-wellness/image/upload/f_auto,w_800,c_limit/v1624858606/Man%20Matters/AHS%2060ml/view%20all/Slide-1.jpg',
//       'https://ik.manmatters.com/mosaic-wellness/image/upload/f_auto,w_800,c_limit/v1624973397/Man%20Matters/Random/Slide-2_1.jpg',
//       'https://ik.manmatters.com/mosaic-wellness/image/upload/f_auto,w_800,c_limit/v1624858606/Man%20Matters/AHS%2060ml/view%20all/Slide-3.jpg',
//     ],
//     extraContent: [
//       {
//         title: 'Product Overview',
//         content: [
//           {
//             label: 'STRENGTHENS AND NOURISHES HAIR FROM ROOT TO TIP',
//             text: 'Our dermatologically tested anti-hair fall shampoo is specially designed for strengthening men’s hair and promoting hair health. No more damaged or broken hair—your strands will transform to give strong, shiny, and smooth hair with regular use. Make this shampoo a part of your hair care routine to ensure healthy hair with improved texture and denser hair.',
//           },
//           {
//             label: 'CLEANSES YOUR SCALP AND FOLLICLES TO REDUCE HAIR FALL:',
//             text: 'The first step to controlling hair loss is maintaining a healthy scalp. Our anti-hair fall shampoo cleans any dirt, dust and residue build-up on your scalp, a result of everyday exposure to pollution, making it hydrated and cleansed. The shampoo unblocks and stimulates blood circulation to your follicles for a moisturized, clean and healthier scalp. A nourished scalp resists hair breakage for shinier, and more resilient hair. ',
//           },
//           {
//             label: 'NUTRIENT-PACKED FORMULA OF BIOTIN, ARGAN OIL AND CAFFEINE:',
//             text: 'Reduces hair fall and maintain overall hair health with a nice soft sheen, our shampoo does it all. Biotin is a vitamin that stimulates hair nourishment, thickens your hair making it appear more lustrous. Caffeine blocks the DHT hormone, which is the major cause of hair loss in men. Argan oil is rich in vitamin E to strengthen, repair, hydrate and soften your hair to give a frizz-free look.',
//           },
//           {
//             label: 'RENEWED CONFIDENCE FOR YOUR HAIR AND PHYSICAL APPEARANCE:',
//             text: 'Forget being conscious of scanty or dandruff-clad hair. Our hair fall rescue shampoo is a one-stop solution for all men and hair types, guaranteed to make you more confident of your hair and overall physical appearance. Simply apply it to wet hair, massage into the scalp and leave it on for 2-3 minutes before rinsing to give your scalp the complete nourishment it deserves, and reducing hair fall during the wash.',
//           },
//           {
//             label: 'LICENSED SAFE TO USE, FREE OF PARABENS AND SULPHATES:',
//             text: 'Our FDA-licensed shampoo is sulphate, SLS and paraben-free and is rid of any preservatives or harmful chemicals commonly used in cosmetic and pharmaceutical shampoos. The mild shampoo is composed of pure and natural ingredients to provide a complete package of nourishment leading to control hair fall, promote hair revival, and maintain healthy lustrous hair.',
//           },
//         ],
//         type: 'overview',
//         header: '4% Redensyl Oil Booster',
//       },
//       {
//         title: 'Product Description',
//         contentLabel: 'Product Details',
//         content: [
//           {
//             label: '',
//             text: 'Start your hair fall treatment right with Man Matters Anti Hair Fall Shampoo. This 2-in-1 DHT blocker shampoo helps reduce hair fall and strengthen hair follicles. This hair fall shampoo for men helps clean your scalp and treat your hair with nourishing ingredients. So, improve your hair health with every use with this DHT blocking shampoo for hair fall!',
//           },
//           {
//             label: 'How to Use?',
//             text: '1: Apply to wet hair and massage into the scalp. 2: Leave this DHT blocking anti hair fall shampoo on for 2-3 minutes and then rinse off. 3: Note: Avoid using a hair dryer to dry your hair.',
//           },
//           {
//             label: 'Curbs hair loss',
//             text: 'This hair fall control shampoo has Caffeine which helps prevent DHT formation - a hormone responsible for hair fall. With regular use, this DHT blocking shampoo for men helps result in less hair fall.',
//           },
//           {
//             label: 'Strengthens hair',
//             text: 'Enriched with Biotin, regular use of this paraben-free shampoo for men stimulates follicles and strengthens hair.',
//           },
//           {
//             label: 'Improves hair health',
//             text: 'Argan Oil in this hair-fall control shampoo helps improve hair texture by revitalising dull and dry hair, making your hair soft.',
//           },
//           {
//             label: 'Cleanses scalp',
//             text: 'The first step towards less hair-fall = clean scalp. This DHT blocking shampoo for hair fall deep cleanses the scalp and helps remove impurities.',
//           },
//         ],
//         images: [
//           'https://m.media-amazon.com/images/I/71IKb6eEw5L._SX679_.jpg',
//           'https://m.media-amazon.com/images/I/81ZYPyHmfyL._SX679_.jpg',
//           'https://m.media-amazon.com/images/I/71Q057vFbaL._SX679_.jpg',
//           'https://m.media-amazon.com/images/I/71lULI8sSoL._SX679_.jpg',
//         ],
//         type: 'description',
//       },
//       {
//         title: 'Shipping Policy',
//         content: [
//           'Please enjoy FREE SHIPPING with this product! Standard delivery typically takes 2-5 business days depending on your location. ',
//           'Two day and overnight shipping is available for an additional charge.',
//         ],
//         type: 'basic',
//       },
//       {
//         title: 'Returns',
//         content: [
//           'We offer FREE RETURNS up to 45 days after arrival. We allow returns whether you use the clubs or not so please take the clubs for a test drive! ',
//           'To initiate a return, please email us hello@robingolf.comor use the chat feature.',
//         ],
//         type: 'basic',
//       },
//       {
//         title: 'Top Reviews',
//         images: ['https://m.media-amazon.com/images/I/815qOhBfHSL.jpg', ''],
//         content: [
//           {
//             customer: 'Anonymous',
//             rating: 5,
//             title: 'Excellent',
//             comment:
//               'In the last two years I have used many Anti Hair Fall shampoos but none of them works my hair fall was getting worst day by day, so when I first heard about this shampoo, I thought I should give it a try, and I am glad that I did this shampoo WORKS!! & it has not only helped me control hair fall but my hair is also grow',
//           },
//           {
//             customer: 'Anonymous',
//             rating: 4,
//             title: 'Worth each penny.',
//             comment: 'Those who have dry, frizzy hair, go for it. Also, there',
//           },
//         ],

//         type: 'reviews',
//       },
//     ],
//   },
// ],
