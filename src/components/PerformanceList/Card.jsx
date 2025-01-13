import React from "react";
import "./Card.css";

export default function Card({ performance }) {
  return (
    <a className="movie_card" href={performance.URL} target="_blank">
      <img
        src={performance.IMAGE_OBJECT}
        alt="movie poster"
        className="movie_poster"
      />

      <div className="movie_details">
        <h3 className="movie_details_heading">{performance.TITLE}</h3>
        <div className="align_center movie_date_rate">
          <p>{performance.PERIOD}</p>
        </div>
        <div className="align_center movie_date_rate">
          <p className="align_center">{performance.CNTC_INSTT_NM}</p>
        </div>

        <p className="movie_description">{performance.CHARGE}</p>
      </div>
    </a>
  );
}
