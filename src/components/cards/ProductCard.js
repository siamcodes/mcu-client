import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import NoImg from "../../images/noimg.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const [tooltip, setTooltip] = useState("Click to add");

    // redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

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

    // destructure
    const { images, title, description, slug, price, quantity, sold } = product;
    return (
        <>
            {/* {product && product.ratings && product.ratings.length > 0 ? (
                showAverage(product)
            ) : (
                <div className="text-center pt-1 pb-3">No rating yet</div>
            )} */}
            <Card
            
                cover={
                    <Link to={`/product/${slug}`}>
                        <img
                            src={images && images.length ? images[0].url : NoImg}
                            style={{ maxWidth: "220px", objectFit: "cover" }}
                            className="p-1"
                        />
                    </Link>
                }

                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" /> <br /> View Product
                    </Link>,
                    <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                            <ShoppingCartOutlined className="text-danger" /> <br />
                            {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
                        </a></Tooltip>,
                ]}
            >

                {/* <Meta
                    title={`${title} - ฿${price}`}
                    description={`${description && description.substring(0, 70)}...`}
                /> */}

                <div className="text-wrap text-sm">{`${title && title.substring(0, 50)}`}</div>
                <div className="d-flex justify-content-center justify-content-between pt-1">
                    <div style={{ color: "#FF6600", fontWeight: "bold" }}>{`฿${price}`}</div>
                    <div style={{ color: "#009900"}}>{product.sold < 1 ? "  " : `ขายแล้ว ${sold} ชิ้น`}</div>
                </div>

                <div className="d-flex justify-content-center justify-content-between pt-1">
                <div style={{ color: "#888888" }}> {product.quantity < 1? " ": `(${quantity}Qty)`}</div>
                    {product && product.ratings && product.ratings.length > 0 ? (
                        showAverage(product)
                    ) : (
                        <div className="text-center">No rating yet</div>
                    )}

                </div>
            </Card>
        </>
    );
}

export default ProductCard;