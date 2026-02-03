import axios from "./axios";

export const getParentDashboard = () =>
  axios.get("/parent/dashboard");
