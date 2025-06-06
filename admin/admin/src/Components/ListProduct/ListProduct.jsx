import React, { useState, useEffect } from "react";
import "./ListProduct.css";
import cart_cross_icon from "../../assets/cart_cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch("https://e-commerce-backend-gy0t.onrender.com/allproducts");
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }

    // await fetch("http://localhost:4000/allproducts")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setAllProducts(data);
    //   });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch("https://e-commerce-backend-gy0t.onrender.com/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts === 0 ? (
          <p>No Products</p>
        ) : (
          allproducts.map((product, index) => (
            <>
              <div
                key={index}
                className="listproduct-format-main listproduct-format"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="listproduct-product-icon"
                />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => {
                    remove_product(product.id);
                  }}
                  src={cart_cross_icon}
                  alt="crossIcon"
                  className="listproduct-remove-icon"
                />
              </div>
              <hr />
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default ListProduct;
