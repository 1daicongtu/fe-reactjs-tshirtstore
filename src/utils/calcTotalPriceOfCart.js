export default function calcTotalPriceOfCart(cart) {
  return cart.reduce((acc, item) => {
    return acc + item.productDetailSelected.price * item.quantity;
  }, 0);
}