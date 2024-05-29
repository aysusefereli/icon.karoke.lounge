import React, { useEffect, useState } from "react";
import "./styles/ProductsList.css";

export default function ProductsList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(
      "https://icon-karaoke-and-lounge-back.onrender.com/api/categories-with-items"
    )
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <div className="list">
      {categories.map((category) => (
        <div className="category" key={category._id}>
          <div className="product">{category.name}</div>
          <div className="food">
            {category.items.map((item) => (
              <button className="foodBtn" key={item._id}>
                <div className="namePrice">
                  <span className="foodName">{item.name}</span>
                  <span className="price">{item.price} ₼</span>
                </div>
                <div className="thePrice">
                  <span className="price">{item.price} ₼</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
