import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./PerformanceList.css";
import Spinner from "../layout/Spinner";

export const PerformanceList = ({ GENRE }) => {
  const [performances, setPerformances] = useState([]);
  const [filteredPerformances, setFilteredPerformances] = useState([]);
  const [loading, setLoading] = useState(false);
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
  }, [GENRE, performances]); // 의존성 배열에 GENRE와 performances 추가

  if (!loading) {
    return (
      <section className="movie_list">
        <header className="align_center movie_list_header">
          <h2 className="align_center movie_list_heading">{GENRE}</h2>
        </header>
        <div className="movie_cards">
          {filteredPerformances.map((performance) => (
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
      </section>
    );
  } else {
    return <Spinner />;
  }
};
