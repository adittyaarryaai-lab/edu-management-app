import axios from "./axios";

export const saveMarks = (data) =>
  axios.post("/marks", data);

export const getReport = (studentId) =>
  axios.get("/marks/report", { params: { studentId } });
