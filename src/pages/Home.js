/* import React, { useEffect, useState } from 'react'
import { getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";
import LoadingCard from "../components/cards/LoadingCard";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(3).then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    };

    return (
        <>
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
            </div>
            <div className="container">
                {loading ? (
                    <LoadingCard count={3} />
                ) : (
                        <div className="row">
                            {products.map((product) => (
                                <div key={product._id} className="col-md-4">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </>
    )
}

export default Home; */

import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
    return (
        <div>
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbotron text={[
                    "จำหน่ายอุปกรณ์อิเล็กทรอนิกส์",
                    "ไมโครคอนโทรลเลอร์ / สมองกลฝังตัว / Sensor",
                    "Internet of Things / Arduino / ESP32 / ESP8266",
                    "สินค้าโกดังในไทย ส่งถึงลูกค้าภายใน 1-3 วัน",
                    "Latest Products",
                    "New Arrivals",
                    "Best Sellers"
                ]} />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <a name="categories" />
                        <h5 className="text-center p-1 mt-1 mb-2 display-5 jumbotron">Categories</h5>
                        <div className="list-group">
                            <CategoryList />
                        </div>

                        <h4 className="text-center p-1 mt-1 mb-2 display-5 jumbotron">Sub Categories</h4>
                        <div className="list-group">
                            <SubList />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <a name="new-arrivals" />
                        <h4 className="text-center p-1 mt-1 mb-1 display-4 jumbotron">New Arrivals</h4>
                        <NewArrivals />

                        <a name="best-sellers" />
                        <h4 className="text-center p-1 mt-1 mb-1 display-4 jumbotron">Best Sellers</h4>
                        <BestSellers />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
