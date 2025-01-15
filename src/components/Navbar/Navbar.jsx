import React, { useState } from "react";
import "./Navbar.css";
import Dropdown from "./Dropdown";

export default function Navbar({
  setSelectedGenre,
  setDateFilter,
  onHomeClick,
}) {
  const [view, setView] = useState(false);
  const [viewDateDropdown, setViewDateDropdown] = useState(false);

  const handleDateClick = (filter) => {
    setDateFilter(filter); // 부모로 필터 상태 전달
    setViewDateDropdown(false); // 드롭다운 닫기
  };
  return (
    <nav className="navbar">
      <h1>Performance App</h1>

      <div className="navbar_links">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onHomeClick();
          }}
        >
          HOME
        </a>
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

        <div
          className="navbar_item"
          onClick={() => setViewDateDropdown(!viewDateDropdown)}
        >
          <span>날짜순</span>
          <span className={`arrow ${viewDateDropdown ? "rotate" : ""}`}>
            &#9660;
          </span>
        </div>
        {viewDateDropdown && (
          <ul className="dropdown_menu">
            <li onClick={() => handleDateClick("공연예정")}>공연예정</li>
            <li onClick={() => handleDateClick("공연중")}>공연중</li>
            <li onClick={() => handleDateClick("공연완료")}>공연완료</li>
          </ul>
        )}
      </div>
    </nav>
  );
}
