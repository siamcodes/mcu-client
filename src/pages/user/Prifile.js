import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getProfile, getWishlist, removeWishlist } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import NoImg from "../../images/noimg.jpg";
import renderHTML from 'react-render-html';

const Profile = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        address: '',
        createdAt:''
    });
    const [wishlist, setWishlist] = useState([]);


    useEffect(() => {
        loadProfile();
        loadWishlist();
    }, []);

    const loadProfile = () =>
        getProfile(user.token).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setProfile({ 
                name: res.data.user.name, 
                email: res.data.user.email, 
                address: res.data.user.address, 
                createdAt: res.data.user.createdAt});
        });



    const loadWishlist = () =>
        getWishlist(user.token).then((res) => {
            // console.log(res);
            setWishlist(res.data.wishlist);
        });

    const handleRemove = (productId) =>
        removeWishlist(productId, user.token).then((res) => {
            loadWishlist();
        });

    return (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>

                <div className="col-md-10">
                    <div className="card mb-3" style={{ maxWidth: 540 }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={NoImg} className="img-fluid rounded-start"/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <p className="card-text">{profile.email}</p>
                                    {/* <p className="card-text">{renderHTML(profile.address)}</p> */}
                                    <p className="card-text"><small className="text-muted">{profile.createdAt}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <h4>Wishlist</h4>
                    {wishlist.map((p) => (
                        <div key={p._id} className="alert alert-secondary">
                            <Link to={`/product/${p.slug}`}>{p.title}</Link>
                            <span
                                onClick={() => handleRemove(p._id)}
                                className="btn btn-sm float-right"
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Profile;
