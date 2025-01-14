import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { PerformanceList } from "./components/PerformanceList/PerformanceList";

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState("전체"); // 상태 관리

  return (
    <>
      <div className="App">
        <Navbar setSelectedGenre={setSelectedGenre} />

        <PerformanceList GENRE={selectedGenre} />
      </div>
    </>
  );
}
