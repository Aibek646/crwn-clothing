import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import "./category.styles.scss";
import {
    selectCategoriesMap,
    selectCategoriesIsLoading
} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner2/spinner.component";

const Category = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

    const { category } = useParams();

    const isLoading = useSelector(selectCategoriesIsLoading);

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <h2 className="category-title">{category.toUpperCase}</h2>

            {isLoading ? (
                <Spinner />
            ) : (
                <div className="category-container">
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>
            )}
        </Fragment>
    );
};

export default Category;
