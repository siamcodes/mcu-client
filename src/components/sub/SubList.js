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
            <div
                key={s._id}
                className="list-group-item list-group-item-action pt-2 pb-2"
            >
                <Link to={`/sub/${s.slug}`}>{s.name}</Link>
            </div>
        ));

    return (
        <div className="container-fluid">
            <div className="row">
                {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
            </div>
        </div>
    );
};

export default SubList;
