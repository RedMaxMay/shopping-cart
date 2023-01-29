import React from "react";
import Product from "../Product";

const AddProductForm = () => {
  return (
    <div>
      <form className="add-product-form">
        <label htmlFor="product-id" className="label">
          To add a product write the ID number:
        </label>
        <input
          type="text"
          name="id"
          className="product-id"
          id="product-id"
          placeholder="Product's ID number..."
          required=""
        ></input>
        <button className="add-btn">Add product</button>
      </form>


    </div>
  );
};

export default AddProductForm;
