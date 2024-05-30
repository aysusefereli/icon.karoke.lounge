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

export default function Search({ theme, switchTheme }) {
  const [filteredItems, setFilteredItems] = useState([]);
  const [input, setInput] = useState("");
  const [isModal4Open, setModal4Open] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isModalSearchOpen, setModalSearchOpen] = useState(false);

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

  useEffect(() => {
    console.log("Current theme:", theme);
  }, [theme]);

  return (
    <div>
      <div
        id="mySearchModal"
        className={`search-modal ${theme === "dark" ? "dark" : ""}`}
      >
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
                <button className="itemBtn">
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
                        <div className="thePrice">
                          <span className="price">{item.price} ₼</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}