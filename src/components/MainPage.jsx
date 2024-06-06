import React, { useState } from "react";
import "./styles/MainPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faPhone,
  faUser,
  faArrowLeft,
  faClock,
  faLocationDot,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";

export default function MainPage({ switchTheme, theme }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);
  const [isModal3Open, setModal3Open] = useState(false);
  const [isModal2OpenNext, setModal2OpenNext] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const open2Modal = () => {
    setModal2Open(true);
  };

  const close2Modal = () => {
    setModal2Open(false);
  };

  const open3Modal = () => {
    setModal3Open(true);
  };

  const close3Modal = () => {
    setModal3Open(false);
  };

  const open2ModalNext = () => {
    setModal2OpenNext(true);
  };

  const close2ModalNext = () => {
    setModal2OpenNext(false);
  };

  const extractCountryAndNumber = (value) => {
    const countryLengths = {
      994: 12,
    };

    let countryCode = "";
    let phoneNumber = "";

    for (const code of Object.keys(countryLengths)) {
      if (value.startsWith(code)) {
        countryCode = code;
        phoneNumber = value.substring(code.length);
        break;
      }
    }

    return { countryCode, phoneNumber };
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    const { countryCode, phoneNumber } = extractCountryAndNumber(phoneValue);
    try {
      const response = await axios.post(
        "https://icon-karaoke-and-lounge-back.onrender.com/api/otp/send",
        { countryCode, phoneNumber }
      );
      console.log("Response:", response);
      if (response.status === 200) {
        console.log("Phone submitted successfully");
        setModal2Open(false);
        setModal2OpenNext(true);
        console.log(phoneValue);
      }
    } catch (error) {
      console.error("Error sending OTP", error);
    }

    console.log("Country Code:", countryCode);
    console.log("Phone Number:", phoneNumber);
  };

  return (
    <div className="mainPage" data-theme={theme}>
      <div className="bc-opacity"></div>
      <div className="header">
        <div className="header-left-side">
          <div className="header-left-side-top">
            <div className="time">
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#D9B852"
              >
                <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
              </svg>
              <p>09:00 - 23:00</p>
            </div>
            <div className="adress">
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#D9B852"
              >
                <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
              </svg>{" "}
              <p>Baku,Nizami street 53</p>
            </div>
          </div>
          <hr />
        </div>
        <div className="header-logo">
          {" "}
          <img
            width={"200px"}
            height={"113px"}
            src="../../public/assets/original-icon.png"
            alt=""
          />
        </div>
        <div className="header-right-side">
          <div className="header-right-side-top">
            <button className="log-in">
              <FontAwesomeIcon icon={faUser} />
            </button>
            <button className="basket">
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
            <button className="language">
              {" "}
              <span color="#D9B852"> AZ</span>
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#D9B852"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </button>
            <div className="phone" color="#D9B852">
              *9898
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div className="main-section">
        <p className="menu-text">MENU</p>
        <div className="buttons">
          <button>DOWNLOAD PDF</button>
          <span className="menuLink">
            <Link className="goToMenu" to="/menu">
              GO TO MENU
            </Link>
          </span>
        </div>
      </div>

      {/* <div>
        <div>
          <div className="header">
            <div className="az_moon">
              <button className="az" onClick={openModal}>
                AZ
              </button>
              <button className="mode" id="moon" onClick={switchTheme}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000"
                >
                  <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
                </svg>
              </button>
              <button className="mode" id="sun" onClick={switchTheme}>
                <svg
                  className="sun-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
                </svg>
              </button>
            </div>
            <button className="user" onClick={open2Modal}>
              <FontAwesomeIcon className="userIcon" icon={faUser} />
              <span className="giris">Giriş et</span>
            </button>
          </div>
          <div>
            <img
              className="icon_img"
              src="https://iconk.clopos.menu/_next/image?url=https%3A%2F%2Fcdn.clopos.com%2Ficonk%2Fe5b33c43-ba96-44ab-8713-50ae16b0170f%2Foriginal.png&w=1080&q=75"
            />
          </div>
          <div className="icon_karaoke_lounge">
            <img
              className="icon_karaoke_img"
              src="https://cdn.clopos.com/iconk/c85d64ba-0bd0-4096-ae45-a62f807a3a96/original.png"
            />
            <span className="icon_name">Icon Karaoke & Lounge</span>
          </div>
        </div>
        <div>
          <Link className="menu-link" to="/menu">
            <div className="menu-link-left-side">
              <img src="menu-icon.png" />
              <p className="menuPage"> Menyu</p>
            </div>
            <FontAwesomeIcon className="faChevronRight" icon={faChevronRight} />
          </Link>
        </div>
        <hr />
        <div>
          <button className="connect-link" onClick={open3Modal}>
            <FontAwesomeIcon className="faPhone" icon={faPhone} />
            <p> Əlaqə</p>
          </button>
        </div>
        <hr />
        <span className="footer">
          Powered by{" "}
          <Link target="_blank" to="https://www.clopos.com/az">
            {" "}
            Clopos
          </Link>
        </span>
      </div>

      {isModalOpen && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="vaul-scrollable">
              <div className="rounded-top"></div>
            </div>
            <div className="modal_info">
              <div className="choice">Dil seçimi</div>
              <div className="country">
                <button className="flag">
                  <img
                    className="flagIcon"
                    src="assets/azerbaijan.png"
                    alt="Azerbaijan Flag"
                  />
                  <span className="language">Azərbaycanca</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModal2Open && (
        <div id="myModal" className="modal2">
          <div className="modal-content2">
            <span className="close2" onClick={close2Modal}>
              &times;
            </span>
            <div className="modal_info2">
              <div className="choice2">Giriş et</div>
              <form onSubmit={handlePhoneSubmit}>
                <PhoneInput
                  className="phoneInput"
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="AZ"
                  value={phoneValue}
                  onChange={setPhoneValue}
                />
                <p className="phoneNumber">
                  Telefon nömrənizi doğrulamaq üçün kod göndərəcəyik
                </p>
                <div className="continue">
                  <button className="continueBtn" type="submit">
                    Davam et
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isModal3Open && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={close3Modal}>
              &times;
            </span>
            <div className="vaul-scrollable">
              <div className="rounded-top"></div>
            </div>
            <div className="modal_info">
              <div className="choice">Əlaqə</div>
              <div className="country">
                <a
                  href="tel:(055)%20353%2022%2043"
                  style={{ textDecoration: 1 }}
                >
                  <button className="flag">
                    <FontAwesomeIcon className="faPhone" icon={faPhone} />
                    <span className="language">(055) 353 22 43</span>
                  </button>
                </a>
                <a className="wp" href="https://web.whatsapp.com/">
                  <img
                    className="wpIcon"
                    src="assets/whatsapp.png"
                    alt="whatsapp"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModal2OpenNext && (
        <div id="myModal" className="modal2">
          <div className="modal-content2">
            <span className="close2" onClick={close2ModalNext}>
              &times;
            </span>
            <div className="modal_info2">
              <div>
                <div className="choice2">
                  <FontAwesomeIcon
                    className="back-arrow-modal"
                    icon={faArrowLeft}
                    onClick={() => {
                      setModal2OpenNext(false);
                      setModal2Open(true);
                    }}
                  />
                </div>
                <div className="choice2">Kodu daxil edin</div>
              </div>
              <div className="inputs">
                <input type="number"></input>
                <input type="number"></input>
                <input type="number"></input>
                <input type="number"></input>
              </div>
              <div className="continue">
                <button className="continueBtn">Davam et</button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
