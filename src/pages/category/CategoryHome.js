import React, { useState, useEffect } from "react";
import { getCategory, getCategories } from "../../functions/category";
//import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
    const [categories, setCategories] = useState([]);   // 
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

        getCategories().then((c) => {
            setCategories(c.data);
            setLoading(false);
        });

    }, []);

    const showCategories = () =>
        categories.map((c) => (
            <div
                key={c._id}
                className="list-group-item list-group-item-action pt-2 pb-2"
            >
                <a href={`/category/${c.slug}`}>{c.name}</a>
            </div>
        ));

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <h5 className="text-center p-1 mt-2 mb-2 display-5 jumbotron">Categories</h5>
                    <div className="container-fluid">
                        
                        <div className="row">
                            {loading ? (
                                <h4 className="text-center">Loading...</h4>
                            ) : (
                                showCategories()
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-md-10">
                    <div className="row">
                        <div className="col">
                            {loading ? (
                                <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                                    Loading...
                                </h4>
                            ) : (
                                <h4 className="p-3 mt-2 mb-2 display-5 jumbotron">
                                    ประเภทสินค้า : <span className="text-danger">{category.name}</span> {' '}
                                    จำนวนสินค้า :  {products.length}
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
