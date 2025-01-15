import React, { useState } from "react";
import "./Navbar.css";
import Dropdown from "./Dropdown";
import "./Dropdown.css";

export default function Navbar({
  setSelectedGenre,
  setDateFilter,
  onHomeClick,
  setSelectedCharge,
}) {
  const [viewDateDropdown, setViewDateDropdown] = useState(false);
  const [viewGenreDropdown, setViewGenreDropdown] = useState(false);

  const toggleGenreDropdown = () => {
    setViewGenreDropdown(!viewGenreDropdown);
    setViewDateDropdown(false); // 날짜순 드롭다운 닫기
  };

  const toggleDateDropdown = () => {
    setViewDateDropdown(!viewDateDropdown); // 토글 동작
    setViewGenreDropdown(false); // 장르별 드롭다운 닫기
  };

  const handleDateClick = (filter) => {
    setDateFilter(filter); // 부모로 필터 상태 전달
    setViewDateDropdown(false); // 드롭다운 닫기
  };

  const handleFreeClick = () => {
    setSelectedCharge("무료");
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
        <ul className="navbar_item" onClick={toggleGenreDropdown}>
          <span>장르별</span>
          {/* 화살표 아이콘 */}
          <span className={`arrow ${viewGenreDropdown ? "rotate" : ""}`}>
            &#9660;
          </span>
          {/* 장르별 {view ? "⌃" : "⌄"} */}
        </ul>
        {viewGenreDropdown && (
          <div className="dropdown-container genre-dropdown">
            <Dropdown setSelectedGenre={setSelectedGenre} />
          </div>
        )}

        <div className="navbar_item" onClick={toggleDateDropdown}>
          <span>날짜순</span>
          <span className={`arrow ${viewDateDropdown ? "rotate" : ""}`}>
            &#9660;
          </span>
        </div>
        {viewDateDropdown && (
          <div className="dropdown-container date-dropdown">
            <ul className="dropdown_menu">
              <li onClick={() => handleDateClick("공연예정")}>공연예정</li>
              <li onClick={() => handleDateClick("공연중")}>공연중</li>
              <li onClick={() => handleDateClick("공연완료")}>공연완료</li>
            </ul>
          </div>
        )}

        <div className="navbar_item" onClick={handleFreeClick}>
          <span>무료 공연</span>
        </div>
      </div>
    </nav>
  );
}
