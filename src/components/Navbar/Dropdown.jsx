import React from "react";
import "./Dropdown.css";

const Dropdown = ({ setSelectedGenre }) => {
  return (
    <ul className="dropdown_menu">
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedGenre("전체");
          }}
        >
          전체
        </a>
      </li>
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedGenre("클래식"); // 부모 상태 업데이트
          }}
        >
          클래식
        </a>
      </li>
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedGenre("독주");
          }}
        >
          독주
        </a>
      </li>
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedGenre("뮤지컬");
          }}
        >
          뮤지컬
        </a>
      </li>
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedGenre("콘서트");
          }}
        >
          콘서트
        </a>
      </li>
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedGenre("실내악");
          }}
        >
          실내악
        </a>
      </li>
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedGenre("성악");
          }}
        >
          성악
        </a>
      </li>
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedGenre("교향곡");
          }}
        >
          교향곡
        </a>
      </li>
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedGenre("기타");
          }}
        >
          기타
        </a>
      </li>
    </ul>
  );
};

export default Dropdown;
