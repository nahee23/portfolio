import React, { useState } from "react";
import "./Navbar.css";
import Dropdown from "./Dropdown";

export default function Navbar({ setSelectedGenre }) {
  const [view, setView] = useState(false);
  return (
    <nav className="navbar">
      <h1>Performance App</h1>

      <div className="navbar_links">
        <ul
          className="navbar_item"
          onClick={() => {
            setView(!view);
          }}
        >
          <span>장르별</span>
          {/* 화살표 아이콘 */}
          <span className={`arrow ${view ? "rotate" : ""}`}>&#9660;</span>
          {/* 장르별 {view ? "⌃" : "⌄"} */}
        </ul>
        {view && <Dropdown setSelectedGenre={setSelectedGenre} />}

        <a href="">날짜순</a>
        <a href="">My Performance</a>
      </div>
    </nav>
  );
}
