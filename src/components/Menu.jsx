import React, { useEffect, useState } from "react";
import "./styles/Menu.css";
import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import ProductsList from "../components/ProductsList.jsx";
import "rsuite/dist/rsuite.css";
import { FreeMode, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export default function Menu() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [input, setInput] = useState("");
  const [isModal4Open, setModal4Open] = useState(false);
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    console.log(newTheme);
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

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

  const open4Modal = () => {
    setModal4Open(true);
  };

  const close4Modal = () => {
    setModal4Open(false);
  };

  const [isModalSearchOpen, setModalSearchOpen] = useState(false);
  const openSearchModal = () => {
    setModalSearchOpen(true);
  };

  const closeSearchModal = () => {
    setModalSearchOpen(false);
  };

  useEffect(() => {
    if (input.trim() !== "") {
      const firstLetter = input.trim().split(" ")[0].toLowerCase();
      const filtered = categories.filter((category) => {
        return (
          input &&
          category.items &&
          category.items.name &&
          category.items.name.toLowerCase().includes(input.toLowerCase())
        );
      });
      setFilteredItems(filtered);
    } else {
      setFilteredItems(categories);
    }
  }, [input, categories]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="main-container" data-theme={theme}>
      <div className="container">
        <div className="border-container">
          <div className="header-border">
            <div className="menu-header">
              <div className="arrow_moon">
                <Link to="/" className="back">
                  <FontAwesomeIcon className="back-arrow" icon={faArrowLeft} />
                </Link>
                <button className="menu-mode" id="moon" onClick={switchTheme}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28px"
                    viewBox="0 -960 960 960"
                    width="28px"
                    fill="#000"
                  >
                    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
                  </svg>
                </button>
                <button className="menu-mode" id="sun" onClick={switchTheme}>
                  <svg
                    className="sun-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    height="28px"
                    viewBox="0 -960 960 960"
                    width="28px"
                    fill="#fff"
                  >
                    <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
                  </svg>
                </button>
              </div>
              <div className="filter_search">
                <button className="filter" onClick={open4Modal}>
                  <svg
                    className="filterIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000"
                  >
                    <path d="M710-150q-63 0-106.5-43.5T560-300q0-63 43.5-106.5T710-450q63 0 106.5 43.5T860-300q0 63-43.5 106.5T710-150Zm0-80q29 0 49.5-20.5T780-300q0-29-20.5-49.5T710-370q-29 0-49.5 20.5T640-300q0 29 20.5 49.5T710-230Zm-550-30v-80h320v80H160Zm90-250q-63 0-106.5-43.5T100-660q0-63 43.5-106.5T250-810q63 0 106.5 43.5T400-660q0 63-43.5 106.5T250-510Zm0-80q29 0 49.5-20.5T320-660q0-29-20.5-49.5T250-730q-29 0-49.5 20.5T180-660q0 29 20.5 49.5T250-590Zm230-30v-80h320v80H480Zm230 320ZM250-660Z" />
                  </svg>
                </button>
                <Link className="search" to="/search">
                  <FontAwesomeIcon
                    className="searchIcon"
                    icon={faMagnifyingGlass}
                  />
                </Link>
              </div>
            </div>
            <div className="mealsOptions">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={10}
                freeMode={true}
                keyboard={{
                  enabled: true,
                  onlyInViewport: false,
                }}
                mousewheel={{
                  forceToAxis: true,
                }}
                simulateTouch={true}
                touchReleaseOnEdges={true}
                modules={[FreeMode, Keyboard, Mousewheel]}
                className="mySwiper"
              >
                {categories.map((category) => (
                  <SwiperSlide key={category.id} className="swiper-slide-auto">
                    <button className="meal">{category.name}</button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="menu-note">
            <svg
              className="menu-note-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <path
                fill="#334155"
                d="M11.999 2.014c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10m0 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2m-1 3h1a.986.986 0 0 1 .969 1.188l-.75 3.812h.781a1 1 0 0 1 0 2h-1c-1.183 0-2.013-1.027-1.781-2.188l.593-2.874c-.453-.096-.812-.456-.812-.938a1 1 0 0 1 1-1"
              />
            </svg>
            <span>Hesaba 10% servis haqqı əlavə olunur</span>
          </div>
        </div>
        <div className="productsList">
          <ProductsList />
        </div>
      </div>
      {isModal4Open && (
        <div id="myModal" className="modal">
          <div className="modal-content4">
            <span className="close" onClick={close4Modal}>
              &times;
            </span>
            <div className="vaul-scrollable">
              <div className="rounded-top"></div>
            </div>
            <div className="modal_info">
              <div className="choice">Filterler</div>
              <div className="filters">
                <button className="filtersBtn">
                  <img src="./assets/halal-sign.png" />
                  <span>Halal</span>
                </button>
                <button className="filtersBtn">
                  <img src="./assets/kosher.png" />
                  <span>Kosher</span>
                </button>
                <button className="filtersBtn">
                  <img src="./assets/vegan.png" />
                  <span>Vegetarian</span>
                </button>
                <button className="filtersBtn">
                  <img src="./assets/salad.png" />
                  <span>Vegan</span>
                </button>
                <button className="filtersBtn">
                  <img src="./assets/chili-pepper.png" />
                  <span>Acılı</span>
                </button>
              </div>
              <div className="allergies">
                <p>Allergiyalar</p>
              </div>
              <div className="choiceAllergie">
                <div className="select-picker" style={{ width: "450px" }}>
                  <select
                    style={{ width: "100%" }}
                    onChange={handleSelectChange}
                    value={selectedOption}
                  >
                    <option value="" disabled selected hidden>
                      Allergiyalar seç
                    </option>
                    <optgroup label="Allergiyalar">
                      <option value="Qabıqlı balıqlar">Qabıqlı balıqlar</option>
                      <option value="Yumurta">Yumurta</option>
                      <option value="Süd">Süd</option>
                      <option value="Balıq">Balıq</option>
                      <option value="Fıstıq">Fıstıq</option>
                      <option value="Soya">Soya</option>
                      <option value="Qoz-fındıq">Qoz-fındıq</option>
                      <option value="Buğda">Buğda</option>
                      <option value="Qlütenli Taxıllar">
                        Qlütenli Taxıllar
                      </option>
                      <option value="Sulfitlər">Sulfitlər</option>
                      <option value="Qarabaşaq yarması">
                        Qarabaşaq yarması
                      </option>
                      <option value="Kərəviz">Kərəviz</option>
                      <option value="Acı paxla">Acı paxla</option>
                      <option value="Molyusklar qabıqlı balıqlar">
                        Molyusklar qabıqlı balıqlar
                      </option>
                      <option value="Xardal">Xardal</option>
                      <option value="Küncüt">Küncüt</option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
