import axios from "./axios";

export const createExam = (data) =>
  axios.post("/exams", data);

export const getExams = (className) =>
  axios.get("/exams", { params: { className } });
