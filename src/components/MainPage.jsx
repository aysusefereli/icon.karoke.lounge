import React, { useState } from "react";
import "./styles/MainPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>
              </button>
              <button className="mode" id="sun" onClick={switchTheme}>
              <svg className="sun-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>
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
