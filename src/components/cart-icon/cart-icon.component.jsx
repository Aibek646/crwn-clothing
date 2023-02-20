import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = ({ setToggleCart }) => {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <div onClick={toggleIsCartOpen} className="cart-icon-container">
            <ShoppingIcon className="shopping-icon" />
            <span onClick={setToggleCart} className="item-count">
                0
            </span>
        </div>
    );
};

export default CartIcon;
