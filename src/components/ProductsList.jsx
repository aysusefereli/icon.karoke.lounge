import React from "react";
import "./styles/ProductsList.css";

export default function ProductsList() {
  return (
    <div className="list">
      <div className="products">
        <div className="product">Suplar</div>
        <div className="food">
          <button className="foodBtn">
            <div className="namePrice">
              <span className="foodName">Toyuq Şorbası</span>
              <span className="price">5.00 ₼</span>
            </div>
            <div className="thePrice">
              <span className="price">5.00 ₼</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
