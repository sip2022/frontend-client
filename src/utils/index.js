export const logout = () => {
  localStorage.removeItem("accessToken");
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("accessToken"));
}

