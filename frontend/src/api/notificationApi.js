import axios from "./axios";

export const getNotifications = () =>
  axios.get("/notifications");

export const markAsRead = (id) =>
  axios.patch(`/notifications/${id}/read`);
