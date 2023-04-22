import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
//import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";

//import CategoryList from "../../components/category/CategoryList";
//import SubList from "../../components/sub/SubList";

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getCategory(slug).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setCategory(res.data.category);
            setProducts(res.data.products);
            setLoading(false);
        });


    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    {/* <h5 className="text-center p-1 mt-1 mb-2 display-4 jumbotron">Categories</h5>
                    <ul className="list-group">
                        <CategoryList />
                    </ul>

                    <h4 className="text-center p-1 mt-1 mb-2 display-5 jumbotron">Sub Categories</h4>
                    <ul className="list-group">
                        <SubList />
                    </ul> */}
                </div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col">
                            {loading ? (
                                <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                                    Loading...
                                </h4>
                            ) : (
                                <h4 className="text-center p-3 mt-2 mb-2 display-5 jumbotron">
                                    {products.length} Products in "{category.name}" category
                                </h4>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        {products.map((p) => (
                            <div className="col-lg-3 col-md-4 col-6" key={p._id}>
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryHome;
