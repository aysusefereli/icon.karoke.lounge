import React, { useEffect, useState } from "react";
import "./styles/ProductsList.css";
import { useThemeManager } from "./theme";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../store/slices/counterSlice";

export default function ProductsList() {
  const [categories, setCategories] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { theme } = useThemeManager();
  const counter = useSelector((state) => state.counterStore.counter);
  const dispatch = useDispatch();

  const openModal = (product) => {
    setActiveProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
    <div className={`list ${theme}`}>
      {categories.map((category) => (
        <div className="category" key={category._id}>
          <div className="product">{category.name}</div>
          <div className="food">
            {category.items.map((item) => (
              <button
                className="foodBtn"
                key={item._id}
                onClick={() => openModal(item)}
              >
                <div className="namePrice">
                  <span className="foodName">{item.name}</span>
                  <span className="price">{item.price} ₼</span>
                </div>
                {item.image ? (
                  <span className="image">
                    <img className="foodImg" src={item.image} alt={item.name} />
                    <div className="plus">+</div>
                  </span>
                ) : (
                  <div className="noImage">
                    <span className="price">{item.price} ₼</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
      {isModalOpen && (
        <div id="myModal" className="modal">
          <div className="modal-content5">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="vaul-scrollable">
              <div className="rounded-top"></div>
            </div>
            <div className="modal_info">
              <div className="imgimg">
                {activeProduct.image && (
                  <img
                    className="productImg"
                    src={activeProduct.image}
                    alt={activeProduct.name}
                  />
                )}
              </div>
              <div className="choice">{activeProduct.name}</div>
              <div className="counter_basket">
                <div className="counter">
                  <button
                    onClick={() => dispatch(decrement())}
                    disabled={counter <= 0}
                  >
                    <span id="count">-</span>
                  </button>
                  <div className="countNmbr">{counter}</div>
                  <button onClick={() => dispatch(increment())}>
                    <span id="count">+</span>
                  </button>
                </div>
                <div className="add">
                  {activeProduct && (
                    <button className="addBasket">
                      Səbətə əlavə et {activeProduct.price*counter} ₼
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
