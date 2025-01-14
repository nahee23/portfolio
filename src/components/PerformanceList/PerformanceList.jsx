import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./PerformanceList.css";
import Spinner from "../layout/Spinner";

export const PerformanceList = ({ GENRE }) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 14; // 한 페이지에 표시할 카드 수

  const [performances, setPerformances] = useState([]);
  const [filteredPerformances, setFilteredPerformances] = useState([]);
  const [loading, setLoading] = useState(false);

  const predefinedGenres = [
    "전체",
    "클래식",
    "독주",
    "뮤지컬",
    "콘서트",
    "실내악",
    "성악",
    "교향곡",
  ];

  useEffect(() => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "http://api.kcisa.kr/openapi/API_CCA_144/request?serviceKey=eef092b1-e625-4786-aaa0-56e90db1252d&numOfRows=100&pageNo=1",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setPerformances(data.response.body.items.item))
      .catch((error) => console.error(error));

    setLoading(false);
  }, []);

  // 선택된 장르에 따라 데이터 필터링
  useEffect(() => {
    const filterPerformances = () => {
      if (GENRE === "전체") {
        setFilteredPerformances(performances); // 모든 공연 표시
      } else if (GENRE === "기타") {
        const others = performances.filter(
          (performance) => !predefinedGenres.includes(performance.GENRE)
        );
        setFilteredPerformances(others);
      } else {
        const filtered = performances.filter(
          (performance) => performance.GENRE === GENRE
        );
        setFilteredPerformances(filtered); // 선택된 장르만 표시
      }
    };

    filterPerformances();
    setCurrentPage(1); // 장르 변경 시 첫 페이지로 이동
  }, [GENRE, performances]); // 의존성 배열에 GENRE와 performances 추가

  // 현재 페이지에 표시할 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredPerformances.slice(startIndex, endIndex);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredPerformances.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!loading) {
    return (
      <section className="movie_list">
        <header className="align_center movie_list_header">
          <h2 className="align_center movie_list_heading">{GENRE}</h2>
        </header>
        <div className="movie_cards">
          {currentItems.map((performance) => (
            <Card key={performance.id} performance={performance} />
          ))}
          {/* {performances &&
          performances.map((performance, index) => (
            <div key={index} className="movie_card">
              <h3 className="movie_card_title">{performance.TITLE}</h3>
              <p className="movie_card_date">Date: {performance.PERIOD}</p>
            </div>
          ))} */}
        </div>
        <div className="pagination">
          {/* 이전 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* 페이지 번호 */}
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={currentPage === page + 1 ? "active" : ""}
            >
              {page + 1}
            </button>
          ))}

          {/* 다음 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>
    );
  } else {
    return <Spinner />;
  }
};
