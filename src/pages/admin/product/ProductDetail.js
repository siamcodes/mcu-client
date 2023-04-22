import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, saveDetail } from "../../../functions/product";

import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from '../../../helpers/quill';

const ProductDetail = ({ match, history }) => {
    const { user } = useSelector((state) => ({ ...state }));
    // state
    const [title, setTitle] = useState(false);
    const [loading, setLoading] = useState(false);


    const detailFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }
        if (localStorage.getItem('detail')) {
            return JSON.parse(localStorage.getItem('detail'));
        } else {
            return false;
        }
    };

    const [detail, setDetail] = useState(detailFromLS);

    // router
    const { slug } = match.params;

    useEffect(() => {
        loadProduct();
    }, []);


    const loadProduct = () => {
        getProduct(slug).then((p) => {
            // console.log("single product", p);
            // 1 load single proudct
            console.log('Product ', p.data.title)
            setTitle(p.data.title);
            setDetail(p.data.detail);
        });
    };


    const saveDetailToDB = () => {
        console.log(slug, detail);
        saveDetail(slug, detail).then((res) => {
            if (res.data.ok) {
                setLoading(false);
                setDetail(true);
                toast.success("detail saved");
                history.push(`/admin/product/${slug}`);
            }
        });
    };

    const handleDetail = (e) => {
        // setLoading(true);
        console.log(e);
        setDetail(e);
        if (typeof window !== 'undefined') {
            localStorage.setItem(`detail`, JSON.stringify(e));
        }
    };


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? (
                        <LoadingOutlined className="text-danger h1" />
                    ) : (
                        <h4>ตัวอย่างการใช้งาน</h4>
                    )}

                    <form>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        value={title}
                                        onChange={setTitle}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </form>

                    <div>
                        <ReactQuill
                            modules={QuillModules}
                            formats={QuillFormats}
                            // theme="snow" 
                            value={detail}
                            onChange={handleDetail}
                        />
                        <Button className="mt-2" onClick={saveDetailToDB} type="primary" ghost>
                            SAVE
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
