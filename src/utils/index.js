export const logout = () => {
  localStorage.removeItem("user");
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
}

