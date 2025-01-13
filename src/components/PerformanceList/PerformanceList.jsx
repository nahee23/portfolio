import React, { useEffect, useState } from "react";
import Fire from "../../assets/fire.png";
import Card from "./Card";
import "./PerformanceList.css";

export const PerformanceList = () => {
  const [performances, setPerformances] = useState([]);
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "http://api.kcisa.kr/openapi/API_CCA_144/request?serviceKey=eef092b1-e625-4786-aaa0-56e90db1252d&numOfRows=10&pageNo=1",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setPerformances(data.response.body.items.item))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          인기순 <img src={Fire} alt="fire emoji" className="navbar_emoji" />
        </h2>

        <div className="align_center movie_list_fs">
          <ul className="align_center movie_filter">
            <li className="movie_filter_item active">8+ Star</li>
            <li className="movie_filter_item">7+ Star</li>
            <li className="movie_filter_item">6+ Star</li>
          </ul>

          <select name="" id="" className="movie_sorting">
            <option value="">SortBy</option>
            <option value="">Date</option>
            <option value="">Rating</option>
          </select>
          <select name="" id="" className="movie_sorting">
            <option value="">Ascending</option>
            <option value="">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {performances.map((performance) => (
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
};
