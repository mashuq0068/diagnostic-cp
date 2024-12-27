export const calculateMoney = (totalAmount, discountPercentage) => {
    const discountAmount = (totalAmount * discountPercentage) / 100;
    return parseFloat(discountAmount).toFixed(2);
  };