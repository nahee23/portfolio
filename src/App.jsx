import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { PerformanceList } from "./components/PerformanceList/PerformanceList";

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState("전체"); // 상태 관리
  const [dateFilter, setDateFilter] = useState("");

  const handleHomeClick = (e) => {
    setSelectedGenre("전체"); // 장르를 "전체"로 설정
    setDateFilter(""); // 날짜 필터 초기화
  };

  return (
    <>
      <div className="App">
        <Navbar
          setSelectedGenre={setSelectedGenre}
          setDateFilter={setDateFilter}
          onHomeClick={handleHomeClick} // HOME 클릭 핸들러 전달
        />

        <PerformanceList GENRE={selectedGenre} dateFilter={dateFilter} />
      </div>
    </>
  );
}
