import React, { useState } from "react";
import "./Card.css";
import defaultImg from "../../assets/default-featured-image.png.jpg";
import spinner from "../../assets/Spinner@1x-1.0s-200px-200px.gif";

export default function Card({ performance }) {
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  return (
    <a className="movie_card" href={performance.URL} target="_blank">
      {loading && (
        <div className="image_spinner">
          <img src={spinner} alt="Loading..." />
        </div>
      )}
      {performance.IMAGE_OBJECT ? (
        <img
          src={performance.IMAGE_OBJECT}
          alt={performance.TITLE || "No Image Available"}
          className="movie_poster"
          onLoad={() => setLoading(false)}
        />
      ) : (
        <div className="imgText">
          <img
            src={defaultImg}
            alt="No Image Available"
            onLoad={() => setLoading(false)}
          />
          <div className="alt-text">
            <p>{performance.TITLE}</p>
          </div>
        </div>
      )}

      <div className="movie_details">
        <h3 className="movie_details_heading">{performance.TITLE}</h3>
        <div className="align_center movie_date_rate">
          <p>{performance.PERIOD}</p>
        </div>
        <div className="align_center movie_date_rate">
          <p className="align_center">
            {performance.SPATIAL_COVERAGE ||
              performance.EVENT_SITE ||
              performance.CNTC_INSTT_NM ||
              "Unknown Location"}
          </p>
        </div>

        <p className="movie_description">{performance.CHARGE}</p>
      </div>
    </a>
  );
}
