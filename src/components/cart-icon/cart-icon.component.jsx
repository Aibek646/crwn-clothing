import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = ({ setToggleCart }) => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <ItemCount onClick={setToggleCart}>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
