import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, saveContent } from "../../../functions/product";

//import dynamic from 'next/dynamic';
import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
//const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { QuillModules, QuillFormats } from '../../../helpers/quill';

const ProductContent = ({ match, history }) => {
    const { user } = useSelector((state) => ({ ...state }));
    // state
    const [title, setTitle] = useState(false);
    const [loading, setLoading] = useState(false);

    const contentFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }
        if (localStorage.getItem('content')) {
            return JSON.parse(localStorage.getItem('content'));
        } else {
            return false;
        }
    };
    const [content, setContent] = useState(contentFromLS);

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
            setContent(p.data.content);
        });
    };


    const saveContentToDB = () => {
        saveContent(slug, content).then((res) => {
            if (res.data.ok) {
                setLoading(false);
                setContent(true);
                toast.success("content saved");
                history.push(`/admin/product/${slug}`);
            }
        });

    };

    const handleContent = (e) => {
        console.log(e);
        setContent(e);
        if (typeof window !== 'undefined') {
            localStorage.setItem(`content`, JSON.stringify(e));
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
                        <h4>Product Description</h4>
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
                            //theme="snow" 
                            value={content}
                            onChange={handleContent}
                        />
                        <Button className="mt-2" onClick={saveContentToDB} type="primary" ghost>
                            SAVE
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductContent;
