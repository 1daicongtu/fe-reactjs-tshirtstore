const convertPriceInt = (priceInt) => {
    if (Number.isInteger(priceInt)) {
        return Number.parseInt(priceInt).toFixed(2);
    }
    return priceInt + '';
};
export default convertPriceInt;
