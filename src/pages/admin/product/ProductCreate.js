import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getBrands, getBrandGenerations } from "../../../functions/brand";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "",
  descriptioin: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue", "Red", "Green"],
  color: "",
  brands: ["No Brand","Espressif", "Atmel", "Phillips", "Microchip", "Analog Device", "STMicroelectronics", "Parallax", "Cypress", "Texas Intruments", "Motorola", "Zilog", "Rabbit Semiconductor", "Renesas",
    "Sumsung", "Panasonic", "Sony", "Acer", "Apple", "Aston", "Dell", "Fujifilm", "GoPro", "HP", "JBL", "Lenovo", "LG", "Microsoft", "Sandisk", "WD", "Zotac"],
  // brands: [],
  brand: "",
  generations: [],
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [generationOptions, setGenerationOptions] = useState([]);
  const [showGeneration, setShowGeneration] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState(initialState);  //เพิ่ม

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadBrands();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const loadBrands = () =>
    getBrands().then((b) => setBrands({ ...brands, brands: b.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
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
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  const handleBrandChange = (e) => {
    e.preventDefault();
    console.log("CLICKED BRAND", e.target.value);
    setValues({ ...values, generations: [], brand: e.target.value });
    getBrandGenerations(e.target.value).then((res) => {
      console.log("GENERATION OPTIONS ON BRAND CLICK", res);
      setGenerationOptions(res.data);
    });
    setShowGeneration(true);
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
            <h4>Product create</h4>
          )}
          <hr />

          {/* {JSON.stringify(values.images)} */}
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            handleBrandChange={handleBrandChange}
            generationOptions={generationOptions}
            showGeneration={showGeneration}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
