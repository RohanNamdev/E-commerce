import React, { useEffect, useState } from "react";
import "./Popular.css";
// import data_product from "../Assets/data.js";
import Item from "../Item/Item.jsx";

const Popular = () => {
  const [data_product, setDataProduct] = useState([]);

  useEffect(() => {
    fetch("https://e-commerce-backend-gy0t.onrender.com/popularinwomen")
      .then((res) => res.json())
      .then((data) => setDataProduct(data));
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMAN</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
