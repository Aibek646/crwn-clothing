import { Route, Routes } from "react-router";
import Home from "./routes/Home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener
} from "./routes/utils/firebase/firesbase.utils";
import { useEffect } from "react";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
        return unsubscribe;
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="checkout" element={<Checkout />} />
            </Route>
        </Routes>
    );
}

export default App;
