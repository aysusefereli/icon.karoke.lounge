import React, { useEffect, useState } from "react";
import "./styles/Menu.css";
import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBasketShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "rsuite/dist/rsuite.css";
import { FreeMode, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useTheme, useThemeProps } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useThemeManager } from "./theme";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../store/slices/counterSlice";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Explore } from "@mui/icons-material";

export default function Menu() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [input, setInput] = useState("");
  const [isModal4Open, setModal4Open] = useState(false);
  const { theme, switchTheme } = useThemeManager();
  const [isModalOpenEmpty, setModalOpenEmpty] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalPrdctOpen, setModalPrdctOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const counter = useSelector((state) => state.counterStore.counter);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);

  const handleChangePanel = (panel) => (event, isExpanded) => {
    setExpanded({ ...expanded, [panel]: isExpanded });
  };

  const openModal = (product) => {
    setActiveProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openPrdctModal = (product) => {
    setActiveProduct(product);
    setModalPrdctOpen(true);
  };

  const closePrdctModal = () => {
    setModalPrdctOpen(false);
  };

  const openModalEmpty = () => {
    setModalOpenEmpty(true);
  };

  const closeModalEmpty = () => {
    setModalOpenEmpty(false);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  let min = 0;
  let max = 0;
  const [sliderValue, setSliderValue] = useState([1, 25]);

  const bisirilmeVaxtiMetni = `Bişirilmə vaxtı: ${sliderValue[0]}-${sliderValue[1]} dəq`;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const names = [
    "Qabıqlı balıqlar",
    "Yumurta",
    "Balıq",
    "Süd",
    "Fıstıq",
    "Soya",
    "Qoz-fındıq",
    "Buğda",
    "Qlütenli taxıllar",
    "Sulfitlər",
    "Qarabaşaq yarması",
    "Kərəviz",
    "Acıpaxla",
    "Molyusklar qabıqlı balıqlar",
    "Xardal",
    "Küncüt",
  ];
  function getStyles(name, personName, thetheme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? thetheme.typography.fontWeightRegular
          : thetheme.typography.fontWeightMedium,
    };
  }

  const thetheme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/categories-with-items")
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
  const [activeButtons, setActiveButtons] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleButtonClick = (index) => {
    const newActiveButtons = [...activeButtons];
    newActiveButtons[index] = !newActiveButtons[index];
    setActiveButtons(newActiveButtons);
  };

  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const footer1 = document.querySelector(".footer1");
  const footer2 = document.querySelector(".footer2");

  window.addEventListener(
    "scroll",
    function () {
      let currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop === lastScrollTop) {
        console.log("Sayfanın konumu değişmedi.");
      } else {
        console.log("Sayfanın konumu değişti.");
        if (currentScrollTop < lastScrollTop) {
          footer1.style.display = "block";
          footer2.style.display = "none";
        } else {
          footer1.style.display = "none";
          footer2.style.display = "block";
        }
        lastScrollTop = currentScrollTop;
      }
    },
    false
  );

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("cartItems");
    if (storedOrders) {
      setTheOrders(JSON.parse(storedOrders));
    }
  }, []);
  const [theOrders, setTheOrders] = useState(() => {
    const storedOrders = localStorage.getItem("cartItems");
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(theOrders));
  }, [theOrders]);

  const addOrders = (item) => {
    setTheOrders((prevOrders) => [...prevOrders, item]);
    setModalPrdctOpen(false);
  };

  const removeOrder = (index) => {
    const updatedOrders = [...theOrders];
    updatedOrders.splice(index, 1);
    setTheOrders(updatedOrders);

    if (updatedOrders.length < 1) {
      closeModal();
    }
  };

  const removeAllOrders = () => {
    setTheOrders([]);
    setModalOpen(false);
  };
  let totalPrice = 0;
  theOrders.forEach((order) => {
    totalPrice += order.price * counter;
  });

  const handleIncrement = () => {
    dispatch(increment(activeProduct));
  };

  const handleDecrement = () => {
    dispatch(decrement(activeProduct));
  };

  const handleWhatsAppOrder = () => {
    const orderDetails = theOrders
      .map((order, index) => {
        return `${index + 1} ${order.name} - ${order.price * counter} AZN, `;
      })
      .join("");

    let message = `Sifarişlər:
      ${orderDetails}
      Cəm: ${totalPrice} AZN`;

    const note = document.querySelector(".note").value;
    if (note.trim() !== "") {
      message += `\nQeyd: ${note}`;
    }

    const encodedMessage = encodeURIComponent(message);

    const whatsappLink = `https://api.whatsapp.com/send/?phone=%2B994553532243&text=${encodedMessage}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <div className={`main-container ${theme}`}>
      <div className="container">
        <div className={`border-container ${visible ? "" : "hide"}`}>
          <div className="header-border">
            <div className="menu-header">
              <div className="arrow_moon">
                <Link to="/" className="back">
                  <FontAwesomeIcon className="back-arrow" icon={faArrowLeft} />
                </Link>
                <button className="menu-mode" onClick={switchTheme}>
                  {theme === "light" ? (
                    <svg
                      className="moonIcon"
                      xmlns="http://www.w3.org/2000/svg"
                      height="28px"
                      viewBox="0 -960 960 960"
                      width="28px"
                      fill="#000"
                    >
                      <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
                    </svg>
                  ) : (
                    <svg
                      className="sunIcon"
                      xmlns="http://www.w3.org/2000/svg"
                      height="28px"
                      viewBox="0 -960 960 960"
                      width="28px"
                      fill="#fff"
                    >
                      <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
                    </svg>
                  )}
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
                className={`mySwiper ${
                  theme === "light" ? "light-theme" : "dark-theme"
                }`}
              >
                {categories.map((category) => (
                  <SwiperSlide key={category.id} className="swiper-slide-auto">
                    <button
                      className="meal"
                      onClick={() => scrollToSection(category.name)}
                    >
                      {category?.name}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
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
          <p>Hesaba 10% servis haqqı əlavə olunur</p>
        </div>
        <div className="productsList">
          {categories.map((category) => (
            <div className="category" key={category._id}>
              <div id={category.name} className="product" key={category._id}>
                {category.name}
              </div>
              <div className="food">
                {category.items.map((item) => (
                  <button
                    className="foodBtn"
                    key={item._id}
                    onClick={() => openPrdctModal(item)}
                  >
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
                  </button>
                ))}
              </div>
            </div>
          ))}
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

                  <div className="basket-main">
                    <div className="counter">
                      <button
                        onClick={() => dispatch(decrement())}
                        disabled={counter <= 1}
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
                        <button
                          className="addBasket"
                          onClick={() => addOrders(activeProduct)}
                        >
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
        <div
          className="footer1"
          onClick={() =>
            theOrders.length === 0 ? openModalEmpty() : openModal()
          }
        >
          <button className="footerBtn">
            <div className="basket">
              <FontAwesomeIcon className="faBasket" icon={faBasketShopping} />
            </div>
            <div className="total">Cəm: {totalPrice} ₼</div>
          </button>
          {theOrders.length > 0 && (
            <span className="order-count">{theOrders.length}</span>
          )}
        </div>
        <div
          className="footer2"
          onClick={() =>
            theOrders.length === 0 ? openModalEmpty() : openModal()
          }
        >
          {" "}
          {theOrders.length > 0 && (
            <span className="order-count2">{theOrders.length}</span>
          )}
          <button>
            <div className="basket">
              <FontAwesomeIcon className="faBasket" icon={faBasketShopping} />
            </div>
          </button>
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
                <button
                  className={`filtersBtn ${activeButtons[0] ? "active" : ""}`}
                  onClick={() => handleButtonClick(0)}
                >
                  <img
                    className="filtersBtn-img"
                    src="./assets/halal-sign.png"
                    alt="Halal"
                  />
                  <span className="filtersBtn-span">Halal</span>
                </button>
                <button
                  className={`filtersBtn ${activeButtons[1] ? "active" : ""}`}
                  onClick={() => handleButtonClick(1)}
                >
                  <img
                    className="filtersBtn-img"
                    src="./assets/kosher.png"
                    alt="Kosher"
                  />
                  <span className="filtersBtn-span">Kosher</span>
                </button>
                <button
                  className={`filtersBtn ${activeButtons[2] ? "active" : ""}`}
                  onClick={() => handleButtonClick(2)}
                >
                  <img
                    className="filtersBtn-img"
                    src="./assets/vegan.png"
                    alt="Vegetarian"
                  />
                  <span className="filtersBtn-span"> Vegetarian</span>
                </button>
                <button
                  className={`filtersBtn ${activeButtons[3] ? "active" : ""}`}
                  onClick={() => handleButtonClick(3)}
                >
                  <img
                    className="filtersBtn-img"
                    src="./assets/salad.png"
                    alt="Vegan"
                  />
                  <span className="filtersBtn-span">Vegan</span>
                </button>
                <button
                  className={`filtersBtn ${activeButtons[4] ? "active" : ""}`}
                  onClick={() => handleButtonClick(4)}
                >
                  <img
                    className="filtersBtn-img"
                    src="./assets/chili-pepper.png"
                    alt="Acılı"
                  />
                  <span className="filtersBtn-span">Acılı</span>
                </button>
              </div>
              <div className="allergies">
                <p>Allergiyalar</p>
              </div>

              <div>
                <FormControl
                  className="allergies-form"
                  sx={{ m: 1, width: 450 }}
                >
                  <InputLabel
                    id="demo-multiple-name-label"
                    className="allergiya-sec"
                  >
                    Seç
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, thetheme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <p className="bisirilme-vaxti">{bisirilmeVaxtiMetni}</p>
                <Box sx={{ width: 450, margin: "15px 0" }}>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    color="dark"
                    max={25}
                    min={1}
                  />
                </Box>
              </div>
              <div className="filter-section-buttons">
                <button className="filter-section-delete-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ff0000"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </button>
                <button
                  className="filter-section-confirm-button"
                  onClick={close4Modal}
                >
                  Tətbiq et
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpenEmpty && (
        <div id="myModal" className="modal">
          <div className="modal-content5">
            <span className="close" onClick={closeModalEmpty}>
              &times;
            </span>
            <div className="vaul-scrollable">
              <div className="rounded-top"></div>
            </div>
            <div className="modal_info">
              <div className="choice">Səbətdəki məhsullar</div>
              <div className="emptyBasket">
                <img
                  className="basketImg"
                  src="./assets/wicker-basket (2).png"
                />
              </div>
              <div className="basketText">Səbət boşdur</div>
            </div>
          </div>
        </div>
      )}
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
              <div className="choice-basket">Səbətdəki məhsullar</div>
              {theOrders.length > 0 &&
                theOrders.map((order, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded[`panel${index}`]}
                    onChange={handleChangePanel(`panel${index}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: "95%", flexShrink: 0 }}>
                        <div key={index} className="basket-item-top">
                          <div>
                            {counter} x {order.name}
                          </div>
                          <div>{order.price * counter} ₼</div>
                        </div>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ width: "92%", flexShrink: 0 }}>
                        <div className="basket-item-bottom">
                          <div className="counter-basket">
                            <button
                              onClick={() => handleDecrement()}
                              disabled={counter <= 1}
                            >
                              <span id="count">-</span>
                            </button>
                            <div className="countNmbr">{counter}</div>
                            <button onClick={() => handleIncrement()}>
                              <span id="count">+</span>
                            </button>
                          </div>
                          <div onClick={() => removeOrder(index)}>
                            <svg
                              className="basket-item-remove"
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="20px"
                              fill="#ff0000"
                            >
                              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                            </svg>
                          </div>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}

              <div className="basket-main">
                <div className="basket-main-left">
                  <div></div>
                </div>
                <div className="basket-main-right"></div>
              </div>
              <div className="notes">
                <textarea
                  className="note"
                  placeholder="Qeyd əlavə edin"
                  rows={4}
                ></textarea>
              </div>
              <div className="footerBtns">
                <button
                  onClick={() => removeAllOrders()}
                  className="filter-section-delete-button2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ff0000"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </button>
                <button className="wp-order" onClick={handleWhatsAppOrder}>
                  <FontAwesomeIcon className="faWhatsapp" icon={faWhatsapp} />
                  <p>WhatsApp sifarişi {totalPrice}₼</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
