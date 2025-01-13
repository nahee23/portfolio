import React from "react";
import Fire from "../../assets/fire.png";
import Party from "../../assets/partying-face.png";
import music from "../../assets/partying-face.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>Performance App</h1>

      <div className="navbar_links">
        <a href="">
          인기순
          <img className="navbar_emoji" src={Fire} alt="fire emoji" />
        </a>
        <a href="">
          최신순
          <img className="navbar_emoji" src={Party} alt="party emoji" />
        </a>
        <a href="">
          My Performance
          <img className="navbar_emoji" src={music} alt="music emoji" />
        </a>
      </div>
    </nav>
  );
}
