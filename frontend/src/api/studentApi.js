import axios from "./axios"; // already configured instance

export const createStudent = (data) => {
  return axios.post("/students", data);
};

export const getStudents = () => {
  return axios.get("/students");
};
export const updateStudent = (id, data) => {
  return axios.put(`/students/${id}`, data);
};

export const deleteStudent = (id) => {
  return axios.delete(`/students/${id}`);
};
