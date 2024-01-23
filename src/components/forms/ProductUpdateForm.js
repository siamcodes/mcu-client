import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
    handleSubmit,
    handleChange,
    setValues,
    values,
    handleCategoryChange,
    categories,
    subOptions,
    arrayOfSubs,
    setArrayOfSubs,
    selectedCategory,

    /*  
      handleBrandChange,
      brands,
      generationOptions,
      arrayOfGenerations,
      setArrayOfGenerations,
      selectedBrand,  
    */

}) => {
    // destructure
    const {
        title,
        description,
        price,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand,
        //generations,
    } = values;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={title}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                name="price"
                                className="form-control"
                                value={price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                className="form-control"
                                value={quantity}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                            <label>Color</label>
                            <select
                                value={color}
                                name="color"
                                className="form-control"
                                onChange={handleChange}
                            >
                                {colors.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                            <label>Brand</label>
                            <select
                                value={brand}
                                name="brand"
                                className="form-control"
                                onChange={handleChange}
                            >
                                {brands.map((b) => (
                                    <option key={b} value={b}>
                                        {b}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                            <label>Shipping</label>
                            <select
                                value={shipping === "Yes" ? "Yes" : "No"}
                                name="shipping"
                                className="form-control"
                                onChange={handleChange}
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/*            
             <div className="form-group">
                <label>ยี่ห้อ</label>
                <select
                    name="brand"
                    className="form-control"
                    onChange={handleBrandChange}
                    value={selectedBrand ? selectedBrand : brand._id}
                >
                    {brands.length > 0 &&
                        brands.map((b) => (
                            <option key={b._id} value={b._id}>
                                {b.name}
                            </option>
                        ))}
                </select>
            </div>

            <div>
                <label>รุ่น</label>
                <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    value={arrayOfGenerations}
                    onChange={(value) => setArrayOfGenerations(value)}
                >
                    {generationOptions.length &&
                        generationOptions.map((g) => (
                            <Option key={g._id} value={g._id}>
                                {g.name}
                            </Option>
                        ))}
                </Select>
            </div> */}

                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                name="category"
                                className="form-control"
                                onChange={handleCategoryChange}
                                value={selectedCategory ? selectedCategory : category._id}
                            >
                                {categories.length > 0 &&
                                    categories.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <label>Sub Categories</label>
                            <Select
                                mode="multiple"
                                style={{ width: "100%" }}
                                placeholder="Please select"
                                value={arrayOfSubs}
                                onChange={(value) => setArrayOfSubs(value)}
                            >
                                {subOptions.length &&
                                    subOptions.map((s) => (
                                        <Option key={s._id} value={s._id}>
                                            {s.name}
                                        </Option>
                                    ))}
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>รายละเอียดสินค้า</label>
                    <textarea
                        rows="5"
                        type="text"
                        name="description"
                        className="form-control"
                        value={description}
                        onChange={handleChange}
                    />
                </div>
                <button className="btn btn-outline-info btn-lg">Save</button>
            </form>
        </div>
    );
};

export default ProductUpdateForm;
