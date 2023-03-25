import shoppingCart from '../../assets/utility/shopping-cart.png';
import PropTypes from 'prop-types';

const CartStrip = ({ handleCart, items }) => {
  return (
    <div
      className="flex justify-between items-center w-full text-sm lg:hidden px-6 py-1 border-y-[1px] border-zinc-100"
      onClick={() => handleCart(true)}
    >
      <div className="flex items-center gap-2">
        <img src={shoppingCart.src} className="w-4 h-4" />
        <span className="font-semibold">{items} total</span>
        in cart - coupon applied
      </div>
      <p className="font-bold">view cart</p>
    </div>
  );
};

CartStrip.propTypes = {
  handleCart: PropTypes.func,
  items: PropTypes.number,
};
export default CartStrip;
