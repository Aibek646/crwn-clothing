import { Fragment, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { setCategoriesMap } from "../../store/categories/category.action";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { getCategoriesAndDocuments } from "../utils/firebase/firesbase.utils";
import "./shop.styles.scss";
import { useDispatch } from "react-redux";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments();
            console.log(categoriesArray);
            // dispatch(setCategoriesMap(categoryMap));
        };

        getCategoriesMap();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
