import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner2/spinner.component";
import {
    selectCategoriesIsLoading,
    selectCategoriesMap
} from "../../store/categories/category.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview
                            key={title}
                            title={title}
                            products={products}
                        />
                    );
                })
            )}
        </Fragment>
    );
};

export default CategoriesPreview;
