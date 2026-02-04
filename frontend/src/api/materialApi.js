import axios from "./axios";

export const uploadMaterial = (data) =>
  axios.post("/materials", data);

export const getMaterials = (params) =>
  axios.get("/materials", { params });
