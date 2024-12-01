import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

const responseTimeCreate = new Trend('create_movie_under_200ms');
const responseTimeList = new Trend('list_movie_under_100ms');
const responseTimeUpdate = new Trend('update_movie_under_300ms');
const responseTimeDelete = new Trend('delete_movie_under_400ms');

export const options = {
  stages: [
    { duration: '10s', target: 50}, // Crescendo até 50 requisições por segundo em 10s
  ],
  thresholds: {
    'create_movie_under_200ms': ['max<200'],
    'list_movie_under_100ms': ['max<100'], 
    'update_movie_under_300ms': ['max<300'],
    'delete_movie_under_400ms': ['max<400'], 
    'http_req_failed': ['rate<0.01'], 
  },
};

export default function () {
  const baseUrl = 'http://localhost:3000/movies';
  const createParams = { headers: { 'Content-Type': 'application/json' } };
  const createPayload = JSON.stringify({
    title: "TÍTULO",
    description: "DESCRIÇÃO",
    launchdate: "2024-12-01",
    showtimes: ["10:00", "14:00", "18:00"],
  });
  const createRes = http.post(baseUrl, createPayload, createParams);

  check(createRes, {
    'Criação retorna 201': (r) => r.status === 201,
  });

  responseTimeCreate.add(createRes.timings.duration);

  const listRes = http.get(`${baseUrl}?page=1&limit=20`);
  check(listRes, {
    'Listagem retorna 200': (r) => r.status === 200
  });

  responseTimeList.add(listRes.timings.duration);

  const movies = JSON.parse(listRes.body);
  const movie = movies.find((m) => m.title === "TÍTULO");
  const movieId = movie ? movie._id : null;

  if (movie) {
    const movieId = movie._id;
    const updatePayload = JSON.stringify({
      title: "Novo filme",
      description: "DESCRIÇÃO",
      launchdate: " ",
      showtimes: [
        ""
      ]
    });

    const updateRes = http.put(`${baseUrl}/${movieId}`, updatePayload, createParams);

    check(updateRes, {
      'Atualização retorna 200': (r) => r.status === 200,
    });

    responseTimeUpdate.add(updateRes.timings.duration);
  }

  if (movieId) {
    const deleteRes = http.del(`${baseUrl}/${movieId}`);

    check(deleteRes, {
      'Exclusão retorna 200': (r) => r.status === 200,
    });

    responseTimeDelete.add(deleteRes.timings.duration);
  }
  else {
    console.error('ID nao encontrado.');
  }

  sleep(0.1);
}

export function handleSummary(data) {
  return {
    "reports/movies_report.html": htmlReport(data),
  };
}
