import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "rsuite/dist/rsuite.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles/Search.css";
import { useThemeManager } from "./theme";
import { decrement, increment } from "../store/slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [input, setInput] = useState("");
  const [isModal4Open, setModal4Open] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isModalSearchOpen, setModalSearchOpen] = useState(false);
  const { theme } = useThemeManager();
  const [activeProduct, setActiveProduct] = useState(null);
  const counter = useSelector((state) => state.counterStore.counter);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      "https://icon-karaoke-and-lounge-back.onrender.com/api/categories-with-items"
    )
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setInput(inputValue);

    const filteredCategories = categories
      .map((category) => {
        const filteredItems = category.items.filter((item) => {
          return item.name.toLowerCase().includes(inputValue);
        });

        if (filteredItems.length > 0) {
          return {
            ...category,
            items: filteredItems,
          };
        } else {
          return null;
        }
      })
      .filter(Boolean);

    setFilteredItems(filteredCategories);
  };

  const openSearchModal = () => {
    setModalSearchOpen(true);
  };

  const closeSearchModal = () => {
    setModalSearchOpen(false);
  };

  const [modalPrdctOpen, setModalPrdctOpen] = useState(false);
  const openPrdctModal = (product) => {
    setActiveProduct(product);
    setModalPrdctOpen(true);
  };

  const closePrdctModal = () => {
    setModalPrdctOpen(false);
  };

  return (
    <div>
      <div id="mySearchModal" className={`search-modal ${theme}`}>
        <div className="modal-search-content">
          <div className="search-header">
            <span onClick={closeSearchModal}>
              <Link to="/menu" className="back-modal">
                <div className="back-container">
                  <div className="back">
                    <FontAwesomeIcon
                      className="back-arrow-modal"
                      icon={faArrowLeft}
                    />
                  </div>
                  <p className="back-text">
                    <span className="bckText">Geri qayıt</span>
                  </p>
                </div>
              </Link>
            </span>
            <button className="search-modal-input">
              <FontAwesomeIcon
                className="searchIconModal"
                icon={faMagnifyingGlass}
              />
              <input
                className="main-search-input"
                type="text"
                placeholder="Axtardığınız qidanın adını yazın"
                value={input}
                onChange={handleInputChange}
              />
            </button>
          </div>
          <div className="search-list">
            {input.trim() !== "" &&
              filteredItems.map((category) => (
                <button className="itemBtn" onClick={openPrdctModal}>
                  <div
                    key={category._id}
                    id={`category-${category._id}`}
                    className="category-name"
                  >
                    {category.items.map((item) => (
                      <div key={item.id} className="prices">
                        <div className="namePrice">
                          <span className="foodName">{item.name}</span>
                          <span className="price">{item.price} ₼</span>
                        </div>
                        {item.image ? (
                          <span className="image">
                            <img
                              className="foodImg"
                              src={item.image}
                              alt={item.name}
                            />
                            <div className="plus">+</div>
                          </span>
                        ) : (
                          <div className="noImage">
                            <span className="price">{item.price} ₼</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </button>
              ))}
          </div>
        </div>
        {modalPrdctOpen && (
          <div id="myModal" className="modal">
            <div className="modal-content-product">
              <span className="close" onClick={closePrdctModal}>
                &times;
              </span>
              <div className="modal_info">
                {activeProduct && activeProduct.image && (
                  <div className="imgimg">
                    <img
                      className="productImg"
                      src={activeProduct.image}
                      alt={activeProduct.name}
                    />
                  </div>
                )}

                {activeProduct && activeProduct.name && (
                  <div className="choice">{activeProduct.name}</div>
                )}

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
                        Səbətə əlavə et {activeProduct.price * counter} ₼
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
