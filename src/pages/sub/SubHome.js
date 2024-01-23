import React, { useState, useEffect } from "react";
//import {Link} from "react-router-dom";
import { getSub, getSubs } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";

const SubHome = ({ match }) => {
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getSub(slug).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setSub(res.data.sub);
            setProducts(res.data.products);
            setLoading(false);
        });

        getSubs().then((res) => {
            setSubs(res.data);
            setLoading(false);
        });
    }, []);

    const showSubs = () =>
        subs.map((s) => (

            <div
                key={s._id}
                className="list-group-item list-group-item-action pt-2 pb-2"
            >
                <a href={`/sub/${s.slug}`}>{s.name}</a>
            </div>
        ));

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2">
                    <h5 className="text-center p-1 mt-2 mb-2 display-5 jumbotron">Sub Categories</h5>
                    <div className="container-fluid">   
                        <div className="row">
                            {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
                        </div>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col">
                            {loading ? (
                                <h4 className="text-center p-3 mt-2 mb-5 display-5 jumbotron">
                                    Loading...
                                </h4>
                            ) : (
                                <h4 className="text-center p-3 mt-2 mb-5 display-5 jumbotron">
                                    {products.length} Products in "{sub.name}" sub category
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

export default SubHome;
