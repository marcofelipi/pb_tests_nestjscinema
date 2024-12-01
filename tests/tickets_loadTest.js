import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

const responseTime = new Trend('response_time');

export const options = {
  stages: [
    { duration: '10s', target: 50 }, 
  ],
  
  thresholds: {
    'response_time': ['avg<300'], // Tempo médio de resposta < 300ms
    'http_req_failed': ['rate<0.01'], // Taxa de falhas < 1%
  },
};

export default function () {
  const url = 'http://localhost:3000/tickets';
  let seatNumber = 0;
  let price = 0;
  const payload = JSON.stringify({
    movieId: "",
    seatNumber: seatNumber++,
    price: price++,
    showtime: "data nao existe"
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status é 201': (r) => r.status === 201,
  });

  responseTime.add(res.timings.duration);

  sleep(0);
}

export function handleSummary(data) {
  return {
    "reports/tickets_report.html": htmlReport(data),
  };
}
