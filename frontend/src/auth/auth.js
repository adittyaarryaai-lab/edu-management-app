export const saveAuth = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getRole = () => {
  return localStorage.getItem("role");
};
