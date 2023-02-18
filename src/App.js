import { Route, Routes } from "react-router";
import Home from "./routes/Home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sigin-in.compnent";

const Shop = () => {
    return <h1>I am the shop page</h1>;
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="sign-in" element={<SignIn />} />
            </Route>
        </Routes>
    );
}

export default App;
