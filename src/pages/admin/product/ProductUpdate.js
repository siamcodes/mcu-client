import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct, saveContent, saveDetail } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getBrands, getBrandGenerations } from "../../../functions/brand";
import FileUpload from "../../../components/forms/FileUpload";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue", "Red", "Green"],
    brands: ["No Brand", "Espressif", "Atmel", "Phillips", "Microchip", "Analog Device", "STMicroelectronics", "Parallax", "Cypress", "Texas Intruments", "Motorola", "Zilog", "Rabbit Semiconductor", "Renesas",
        "Sumsung", "Panasonic", "Sony", "Acer", "Apple", "Aston", "Dell", "Fujifilm", "GoPro", "HP", "JBL", "Lenovo", "LG", "Microsoft", "Sandisk", "WD", "Zotac"],
    brand: "",
    color: "",
    //generations: []
};

const ProductUpdate = ({ match, history }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    // state
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [brands, setBrands] = useState([]);                           //
    const [generationOptions, setGenerationOptions] = useState([]);     //
    const [arrayOfGenerations, setArrayOfGenerations] = useState([]);   //
    const [selectedBrand, setSelectedBrand] = useState("");             //





    // router
    const { slug } = match.params;

    useEffect(() => {
        loadProduct();
        loadCategories();
        loadBrands();
    }, []);

    const loadProduct = () => {
        getProduct(slug).then((p) => {
            // console.log("single product", p);
            // 1 load single proudct
            setValues({ ...values, ...p.data });
            // 2 load single product category subs
            getCategorySubs(p.data.category._id).then((res) => {
                setSubOptions(res.data); // on first load, show default subs
            });
            // 3 prepare array of sub ids to show as default sub values in antd Select
            let arr = [];
            p.data.subs.map((s) => {
                arr.push(s._id);
            });
            console.log("ARR", arr);
            setArrayOfSubs((prev) => arr); // required for ant design select to work

            if (p.data.content != null) {
                setContent(p.data.content);  //กำหนดค่าให้ content
            }

            if (p.data.detail != null) {
                setDetail(p.data.detail);  //กำหนดค่าให้ detail
            }
        });
    };

    const loadCategories = () =>
        getCategories().then((c) => {
            console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
            setCategories(c.data);
        });

    const loadBrands = () =>
        getBrands().then((b) => {
            console.log("GET BRANDS IN UPDATE PRODUCT", b.data);
            setBrands(b.data);
        });


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        values.subs = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;
        //  values.generations = arrayOfGenerations; //
        //  values.brand = selectedBrand ? selectedBrand : values.brand; //

        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`"${res.data.title}" is updated`);
                history.push("/admin/products");
                localStorage.removeItem("content");
                localStorage.removeItem("detail");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(err.response.data.err);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(e.target.name, " ----- ", e.target.value);
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        //setValues({ ...values, subs: [], category: e.target.value });
        setValues({ ...values, subs: [] });

        setSelectedCategory(e.target.value);

        getCategorySubs(e.target.value).then((res) => {
            console.log("SUB OPTIONS ON CATEGORY CLICK", res);
            setSubOptions(res.data);
        });

        console.log("EXISTING CATEGORY values.category", values.category);
        // if user clicks back to the original category
        // show its sub categories in default
        if (values.category._id === e.target.value) {
            loadProduct();
        }
        // clear old sub category ids
        setArrayOfSubs([]);
    };

    /*    
        const handleBrandChange = (e) => {
            e.preventDefault();
            console.log("CLICKED BRAND", e.target.value);
            //setValues({ ...values, subs: [], category: e.target.value });
            setValues({ ...values, generations: [] });
    
            setSelectedBrand(e.target.value);
    
            getBrandGenerations(e.target.value).then((res) => {
                console.log("GENERATION OPTIONS ON BRAND CLICK", res);
                setGenerationOptions(res.data);
            });
    
            console.log("EXISTING BRAND values.brand", values.brand);
            // if user clicks back to the original category
            // show its sub categories in default
            if (values.brand._id === e.target.value) {
                loadProduct();
            }
            // clear old sub category ids
            setArrayOfGenerations([]);
        };    
    */


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
    const [content, setContent] = useState(contentFromLS());

    const saveContentToDB = () => {
        //console.log(slug, content);
        saveContent(slug, content).then((res) => {
            if (res.data.ok) {
                // setLoading(false);
                setContent(true);
                toast.success("content saved");
                history.push(`/admin/product/${slug}`);
                //localStorage.removeItem("content");
            }
        });
    };
    const handleContent = (e) => {
        //console.log(e);
        setContent(e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('content', JSON.stringify(e));
        }
    };

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
    const [detail, setDetail] = useState(detailFromLS());

    const saveDetailToDB = () => {
        //console.log(slug, detail);
        saveDetail(slug, detail).then((res) => {
            if (res.data.ok) {
                //  setLoading(false);
                setDetail(true);
                toast.success("detail saved");
                history.push(`/admin/product/${slug}`);
                //localStorage.removeItem("detail");
            }
        });
    };
    const handleDetail = (e) => {
        setDetail(e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('detail', JSON.stringify(e));
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
                        <h4>Product update</h4>
                    )}
                    {/* {JSON.stringify(values)} */}
                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />

                    </div>
                    <br />
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                        selectedCategory={selectedCategory}

                    /*   
                        handleBrandChange={handleBrandChange}
                        brands={brands}
                        generationOptions={generationOptions}
                        arrayOfGenerations={arrayOfGenerations}
                        setArrayOfGenerations={setArrayOfGenerations}
                        selectedBrand={selectedBrand}  
                    */
                    />

                    <div className="pt-4">
                        <ReactQuill theme="snow" value={content} onChange={handleContent} />
                        <Button className="mt-2" onClick={saveContentToDB} type="primary" ghost>
                            บันทึกรายละเอียดคุณสมบัติ
                        </Button>
                    </div>

                    <div className="pt-4">
                        <ReactQuill theme="snow" value={detail} onChange={handleDetail} />
                        <Button className="mt-2" onClick={saveDetailToDB} type="primary" ghost>
                            บันทึกตัวอย่างการใช้งาน
                        </Button>
                    </div>

                    <Link to={`/admin/product-content/${slug}`} className="btn btn-primary"> คลิกเพิ่มรายละเอียดคุณสมบัติ </Link>
                    <Link to={`/admin/product-detail/${slug}`} className="btn btn-primary">คลิกเพิ่มตัวอย่างการใช้งาน</Link>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
