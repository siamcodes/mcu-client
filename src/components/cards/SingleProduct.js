import React, { useState } from "react";
import renderHTML from 'react-render-html';
import { Card, Tabs, Tooltip } from "antd";
//import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NoImg from "../../images/noimg.jpg";
import ProductListItems from "./ProductListItems";
import MiniBestSellers from "../home/MiniBestSellers";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

/* const { Meta } = Card; */
const { TabPane } = Tabs;

// this is childrend component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
    const [tooltip, setTooltip] = useState("Click to add");
    // redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    // router
    let history = useHistory();
    const { title, description, images, _id, content, detail } = product;

    const handleAddToCart = () => {
        // create cart array
        let cart = [];
        if (typeof window !== "undefined") {
            // if cart is in local storage GET it
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            // save to local storage
            // console.log('unique', unique)
            localStorage.setItem("cart", JSON.stringify(unique));
            // show tooltip
            setTooltip("Added");
            // add to reeux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
            // show cart items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    };

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token).then((res) => {
            console.log("ADDED TO WISHLIST", res.data);
            toast.success("Added to wishlist");
            history.push("/user/wishlist");
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-8">
                    {images && images.length ? (
                        <Carousel showArrows={true} autoPlay infiniteLoop>
                            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                        </Carousel>
                    ) : (
                        <Card cover={<img src={NoImg} className="mb-2 card-image" />}></Card>
                    )}
                </div>

                <div className="col-sm-4">
                    <h5 className="text-white p-3" style={{ backgroundColor:"#5500FF" ,borderRadius: "10px" }}>{title}</h5>

                    {product && product.ratings && product.ratings.length > 0 ? (
                        showAverage(product)
                    ) : (
                        <div className="text-center pt-1 pb-3">No rating yet</div>
                    )}

                    <Card
                        actions={[
                            <Tooltip title={tooltip}>
                                <a onClick={handleAddToCart}>
                                    <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                                    Cart
                                </a>
                            </Tooltip>,
                            <a onClick={handleAddToWishlist}>
                                <HeartOutlined className="text-info" /> <br /> Add to Wishlist
                            </a>,
                            <RatingModal>
                                <StarRating
                                    name={_id}
                                    numberOfStars={5}
                                    rating={star}
                                    changeRating={onStarClick}
                                    isSelectable={true}
                                    starRatedColor="red"
                                />
                            </RatingModal>,
                        ]}

                        size="small"
                    >
                        {/*  <Meta description={description} /> */}
                        <ProductListItems product={product} />
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <Tabs type="card">
                        <TabPane tab="รายละเอียดสินค้า" key="1">
                            <b style={{ color: 'blue' }}>{description && description}</b>
                            <br />
                            {content && content.length ? (<div className="content"> {renderHTML(content)} </div>) : (<div></div>)}
                        </TabPane>
                        <TabPane tab="ตัวอย่างการใช้งาน" key="2">
                            {detail && detail.length ? (<div className="content"> {renderHTML(detail)} </div>) : (<div></div>)}
                        </TabPane>
                    </Tabs>
                </div>
                {/* <div className="col-md-4">
                    <h4 className="text-center p-3 mt-2 mb-2 display-4 jumbotron">Best Sellers</h4>
                    <MiniBestSellers />
                </div> */}
            </div>
        </div>
    );
};

export default SingleProduct;
