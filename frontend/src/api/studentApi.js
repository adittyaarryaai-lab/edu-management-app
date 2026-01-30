import axios from "./axios"; // already configured instance

export const createStudent = (data) => {
  return axios.post("/students", data);
};

export const getStudents = () => {
  return axios.get("/students");
};
