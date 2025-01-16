const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const url =
    "http://api.kcisa.kr/openapi/API_CCA_144/request?serviceKey=eef092b1-e625-4786-aaa0-56e90db1252d&numOfRows=100&pageNo=1";
  const response = await fetch(url);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
