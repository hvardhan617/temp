export const checkInCart = (items, id) => {
  let alreadyInCart = false;
  let quantity = 0;
  items.forEach((item) => {
    if (item._id === id) {
      alreadyInCart = true;
      quantity = item.quantity;
    }
  });

  return { alreadyInCart, quantity };
};

export const getTotal = (items, storePrice) => {
  let totalSellingPrice = 0;
  let totalCostPrice = 0;
  let totalSavings = 0;

  items.forEach((item) => {
    totalSellingPrice = totalSellingPrice + item.quantity * storePrice.listPrice;
    totalCostPrice = totalCostPrice + item.quantity * storePrice.marketPrice;
    totalSavings = totalCostPrice - totalSellingPrice;
  });

  return { totalSellingPrice, totalCostPrice, totalSavings };
};

export const getTotalMultiProduct = (items) => {
  let totalSellingPrice = 0;
  let totalCostPrice = 0;
  let totalSavings = 0;

  items.forEach((item) => {
    let storePrice = item.pricesFromStores.filter((store) => store.storeId === 'shopify')[0];
    totalSellingPrice = totalSellingPrice + item.quantity * storePrice.listPrice;
    totalCostPrice = totalCostPrice + item.quantity * storePrice.marketPrice;
    totalSavings = totalCostPrice - totalSellingPrice;
  });

  return { totalSellingPrice, totalCostPrice, totalSavings };
};

export const getTotalAmazon = (items) => {
  let totalSellingPrice = 0;
  let totalCostPrice = 0;
  let totalSavings = 0;

  items.forEach((item) => {
    let amazon = item.pricesFromStores.filter((store) => store.storeId === 'amazon.com')[0];
    totalSellingPrice = totalSellingPrice + item.quantity * amazon.listPrice;
    totalCostPrice = totalCostPrice + item.quantity * amazon.marketPrice;
    totalSavings = totalCostPrice - totalSellingPrice;
  });

  return { totalSellingPrice, totalCostPrice, totalSavings };
};

export const calculateTotalItems = (items, nav = false) => {
  let total = 0;

  items.map((item) => {
    total += item.quantity;
  });

  if (nav) return total;

  return total > 1 ? `${total} Items` : `${total} Item`;
};

export const calculatePercentage = (sellingPrice, slashPrice) => {
  let discount = Math.round(100 - (sellingPrice / slashPrice) * 100);

  let dicountTxt = discount > 0 ? `${discount}% OFF` : null;

  return dicountTxt;
};

export const calculateFinalCart = (store, prices) => {
    // additionalSaving = 0,
   let percentageMsg = '';
  // let totalSavings = 0;

  console.log('prices--->', prices);
  let finalPrice = prices.totalSellingPrice;
  percentageMsg = calculatePercentage(finalPrice, prices.totalCostPrice);

  return {
    finalPrice,
    msg: percentageMsg,
  };

  // if (store.couponApplied.type === 'flat') {
  //   finalPrice = prices.totalSellingPrice - store.couponApplied.discount;
  //   percentageMsg = calculatePercentage(finalPrice, prices.totalCostPrice);
  //   additionalSaving = store.couponApplied.discount;
  // }

  // if (store.couponApplied.type === 'percentage') {
  //   additionalSaving = (store.couponApplied.discount / 100) * prices.totalSellingPrice;
  //   finalPrice = Math.round(prices.totalSellingPrice - additionalSaving);
  //   percentageMsg = calculatePercentage(finalPrice, prices.totalCostPrice);
  //   totalSavings = prices.totalCostPrice - finalPrice;
  // }

  // return {
  //   finalPrice,
  //   additionalSaving,
  //   msg: percentageMsg,
  //   totalSavings,
  //   discount: store.couponApplied.discount,
  // };
};

export const removeItemsFromCart = (items, id) => {
  let tempItems = [...items];

  items.forEach((item, i) => {
    if (item._id === id) {
      if (items[i].quantity - 1 === 0) {
        tempItems = items.filter((item) => item._id !== id);
      } else {
        tempItems[i] = {
          ...items[i],
          quantity: items[i].quantity - 1,
        };
      }
    }
  });

  return tempItems;
};
