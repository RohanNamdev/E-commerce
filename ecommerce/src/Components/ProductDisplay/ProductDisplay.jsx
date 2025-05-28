import React, { use, useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="product-display">
      <div className="product-display-left">
        <div className="left-images">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="product-display-main">
          <img
            className="product-display-main-image"
            src={product.image}
            alt=""
          />
        </div>
      </div>
      <div className="product-display-right">
        <h2>{product.name}</h2>
        <div className="stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="item-prices">
          <div className="old-price">${product.old_price}</div>
          <div className="new-price">${product.new_price}</div>
        </div>
        <div className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi incidunt
          quam, error deserunt enim minima quis.
        </div>
        <div className="sizes">
          <h2>Select Size</h2>
          <div className="size">
            <div className="s">S</div>
            <div className="m">M</div>
            <div className="l">L</div>
            <div className="xl">XL</div>
            <div className="xxl">XXL</div>
          </div>
        </div>
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        <p className="product-display-right-category">
          <span>Category: </span> Women, T-Shirt, Crop Top.{" "}
        </p>
        <p className="product-display-right-category">
          <span>Tags: </span> Modern, Latest Trend, Best Selling.
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
