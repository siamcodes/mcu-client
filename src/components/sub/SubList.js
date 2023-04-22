import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";

const SubList = () => {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubs().then((res) => {
            setSubs(res.data);
            setLoading(false);
        });
    }, []);

    const showSubs = () =>
        subs.map((s) => (
            <li
                key={s._id}
                className="list-group-item list-group-item-action"
            >
                <Link to={`/sub/${s.slug}`}>{s.name}</Link>
            </li>
        ));

    return (
        <div className="container">
            <div className="row">
                {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
            </div>
        </div>
    );
};

export default SubList;
