import React, { useState } from "react";
import "./styles/MainPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronRight,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function MainPage({ switchTheme, theme }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="mainPage" data-theme={theme}>
      <div>
        <div>
          <div className="header">
            <div className="az_moon">
              <button className="az" onClick={openModal}>
                AZ
              </button>
              <button className="mode" id="moon" onClick={switchTheme}>
                <FontAwesomeIcon className="moonIcon" icon={faMoon} />
              </button>
              <button className="mode" id="sun" onClick={switchTheme}>
                <FontAwesomeIcon className="sunIcon" icon={faSun} />
              </button>
            </div>
            <button className="user">
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
              <p> Menyu</p>
            </div>
            <FontAwesomeIcon className="faChevronRight" icon={faChevronRight} />
          </Link>
        </div>
        <hr />
        <div>
          <button className="connect-link">
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
            <div className="l flex justify-center z-10 vaul-scrollable">
              <div className="rounded-top"></div>
            </div>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="modal_info">
              <div className="choice">Dil seçimi</div>
              <div>
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
    </div>
  );
}
