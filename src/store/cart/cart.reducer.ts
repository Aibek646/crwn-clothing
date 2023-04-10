import { AnyAction } from "redux";

import { setCartItems, setIsCartOpen } from "./cart.action";

import { CART_ACTION_TYPES, CartItem } from "./cart.types";

export type CartState = {
    isCartOpen: boolean;
    cartItems: CartItem[];
};

const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: []
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };
        default:
            return state;
    }
};
