import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
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
                    <Link to={`/category/${c.slug}`}>{c.name}</Link>
                </div>
        ));

    return (
        <div className="container-fluid">
            <div className="row">
                {loading ? (
                    <h4 className="text-center">Loading...</h4>
                ) : (
                    showCategories()
                )}
            </div>
        </div>
    );
};

export default CategoryList;