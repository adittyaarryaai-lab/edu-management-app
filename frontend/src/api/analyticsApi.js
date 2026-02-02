import axios from "./axios";

export const getClassPerformance = (className) =>
  axios.get("/analytics/class-performance", {
    params: { className }
  });
