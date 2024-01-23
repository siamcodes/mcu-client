import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  subOptions,
  showSub,

  handleBrandChange,
  generationOptions,
  showGeneration,

}) => {
  // destructure
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
    generations,
  } = values;

  return (
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
            <label>Category({categories.length})</label>
            <select
              name="category"
              className="form-control"
              onChange={handleCategoryChange}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {showSub && (
          <div className="col">
            <label>Sub Categories({subOptions.length})</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </div>
        )}
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
            <select name="color" className="form-control" onChange={handleChange}>
              <option>Please select</option>
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
            <label>Brand({brands.length})</label>
            <select name="brand" className="form-control" onChange={handleChange}>
              <option>Please select</option>
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
              name="shipping"
              className="form-control"
              onChange={handleChange}
            >
              <option>Please select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>
      </div>

      {/* 
      <div className="form-group">
        <label>Brand {brands.length}</label>
        <select
          name="brand"
          className="form-control"
          onChange={handleBrandChange}
        >
          <option>Please select </option>
          {brands.length > 0 &&
            brands.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
        </select>
      </div> 

       {showGeneration && (
        <div>
          <label>รุ่น {generationOptions.length}</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={generations}
            onChange={(value) => setValues({ ...values, generations: value })}
          >
            {generationOptions.length &&
              generationOptions.map((g) => (
                <Option key={g._id} value={g._id}>
                  {g.name}
                </Option>
              ))}
          </Select>
        </div>
      )} 
  */}

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
      <br />
      <button className="btn btn-outline-info btn-lg">Save</button>
    </form>

  );
};

export default ProductCreateForm;
