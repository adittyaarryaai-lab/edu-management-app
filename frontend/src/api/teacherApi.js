import axios from "./axios";

export const createTeacher = (data) => {
  return axios.post("/teachers", data);
};

export const getTeachers = () => {
  return axios.get("/teachers");
};
