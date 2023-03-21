import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { CartContext } from "../../context/cart.context";

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../utils/firebase/firesbase.utils";
import {
    NavigationContainer,
    NavLink,
    NavLinks,
    LogoContainer
} from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);

    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>

                <NavLinks className="nav-links-container">
                    <NavLink className="nav-link" to="/shop">
                        SHOP
                    </NavLink>
                    {currentUser ? (
                        <span as="span" onClick={signOutUser}>
                            SIGN OUT
                        </span>
                    ) : (
                        <NavLink className="nav-link" to="/auth">
                            SIGN IN
                        </NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
