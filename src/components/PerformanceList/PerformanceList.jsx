import React, { useEffect, useState } from "react";
import Fire from "../../assets/fire.png";
import Card from "./Card";
import "./PerformanceList.css";
import Spinner from "../layout/Spinner";

export const PerformanceList = ({ GENRE }) => {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });
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
  const filteredPerformances =
    GENRE === "전체"
      ? performances
      : performances.filter((performance) => performance.GENRE === GENRE);

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };
  console.log(sort);

  if (!loading) {
    return (
      <section className="movie_list">
        <header className="align_center movie_list_header">
          <h2 className="align_center movie_list_heading">
            {GENRE} <img src={Fire} alt="fire emoji" className="navbar_emoji" />
          </h2>

          <div className="align_center movie_list_fs">
            <select
              name="by"
              id=""
              onChange={handleSort}
              className="movie_sorting"
            >
              <option value="default">SortBy</option>
              <option value="release_date">Date</option>
              <option value="title">Title</option>
            </select>
            <select
              name="order"
              id=""
              onChange={handleSort}
              className="movie_sorting"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
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
