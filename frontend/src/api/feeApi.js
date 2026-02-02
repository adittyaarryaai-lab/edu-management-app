import axios from "./axios";

export const assignFee = (data) =>
  axios.post("/fees/assign", data);

export const addPayment = (data) =>
  axios.post("/fees/pay", data);

export const getStudentFees = (studentId) =>
  axios.get("/fees/student", { params: { studentId } });
