import axios from "./axios";

/* -------- SAVE / UPDATE TIMETABLE -------- */
export const saveTimetable = (data) => {
  return axios.post("/timetable", data);
};

/* -------- GET TIMETABLE BY CLASS -------- */
export const getTimetable = (classId) => {
  return axios.get("/timetable", {
    params: { classId }
  });
};
