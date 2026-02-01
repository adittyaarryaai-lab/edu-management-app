import axios from "./axios";

export const markAttendance = (records) => {
  return axios.post("/attendance/mark", { records });
};

export const getAttendance = (params) => {
  return axios.get("/attendance", { params });
};
