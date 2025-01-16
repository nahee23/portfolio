import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./PerformanceList.css";
import Spinner from "../layout/Spinner";

export const PerformanceList = ({ GENRE, dateFilter, selectedCharge }) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 14; // 한 페이지에 표시할 카드 수

  const [performances, setPerformances] = useState([]);
  const [filteredPerformances, setFilteredPerformances] = useState([]);
  const [loading, setLoading] = useState(false);

  // 날짜 문자열을 유효한 Date 객체로 변환
  const parseDate = (dateString) => {
    // 이미 Date 객체라면 그대로 반환
    if (dateString instanceof Date) {
      return dateString;
    }

    // YYYY-MM-DD 형식
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return new Date(dateString);
    }

    // YYYYMMDD 형식
    if (/^\d{8}$/.test(dateString)) {
      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6);
      const day = dateString.slice(6, 8);
      return new Date(`${year}-${month}-${day}`);
    }
    console.warn("Invalid date format:", dateString);
    // 인식할 수 없는 형식일 경우 null 반환
    return null;
  };

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

  // 날짜 필터링 함수
  const filterByDate = (performances, filter) => {
    const today = new Date();

    return performances.filter((performance) => {
      const period = performance.PERIOD || "";

      // PERIOD 값이 예상하지 못한 형식일 경우 대비
      if (typeof period !== "string") {
        return false;
      }

      // 시작일과 종료일 파싱 (공백 또는 ~를 기준으로 분리)
      const dates = period.split(/[\s~]+/).map((date) => date.trim());
      if (dates.length < 2) {
        console.warn("Skipping: Incomplete PERIOD range:", period);
        return false; // 시작일과 종료일이 모두 있어야 함
      }

      const start = parseDate(dates[0]); // 첫 번째 날짜를 시작일로 간주
      const end = parseDate(dates[1]); // 두 번째 날짜를 종료일로 간주

      if (!start || !end) {
        return false; // 유효하지 않은 날짜는 제외
      }

      if (filter === "공연완료") {
        return end < today; // 종료일이 오늘 이전
      }
      if (filter === "공연중") {
        return start <= today && end >= today; // 현재 날짜가 공연 기간 내
      }
      if (filter === "공연예정") {
        return start > today; // 시작일이 오늘 이후
      }
      return true; // 기본 값
    });
  };

  // 필터링 처리
  useEffect(() => {
    let filtered = performances;

    //장르 필터링
    if (GENRE !== "전체") {
      filtered =
        GENRE === "기타"
          ? performances.filter(
              (performance) =>
                ![
                  "클래식",
                  "독주",
                  "뮤지컬",
                  "콘서트",
                  "실내악",
                  "성악",
                  "교향곡",
                ].includes(performance.GENRE)
            )
          : performances.filter((performance) => performance.GENRE === GENRE);
    }

    // 날짜 필터링
    if (dateFilter) {
      filtered = filterByDate(filtered, dateFilter);
    }

    setFilteredPerformances(filtered);
  }, [GENRE, dateFilter, performances]);

  // 선택된 장르와 요금에 따라 데이터 필터링
  useEffect(() => {
    const filterPerformances = () => {
      let filtered = performances;

      if (GENRE && GENRE !== "전체") {
        if (GENRE === "기타") {
          filtered = performances.filter(
            (performance) => !predefinedGenres.includes(performance.GENRE)
          );
        } else {
          filtered = performances.filter(
            (performance) => performance.GENRE === GENRE
          );
        }
      }

      if (selectedCharge) {
        filtered = filtered.filter(
          (performance) =>
            performance.CHARGE === "무료" ||
            performance.CHARGE === "전석 무료" ||
            performance.CHARGE === "전석 초대"
        );
      }

      setFilteredPerformances(filtered);
      setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
    };

    filterPerformances();
  }, [GENRE, selectedCharge, performances]);

  if (!loading) {
    return (
      <section className="movie_list">
        <header className="align_center movie_list_header">
          <h2 className="align_center movie_list_heading">
            {selectedCharge === "무료"
              ? "무료 공연"
              : GENRE && dateFilter === ""
              ? GENRE
              : `${GENRE} - ${dateFilter}`}
          </h2>
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
