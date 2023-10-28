import Cookies from "js-cookie";

// Function for set token.
export const setToken = (data) => {
  if (typeof window === "undefined") {
    return;
  }

  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("email", data.user.email);
  Cookies.set("jwt", data.jwt);
};

// Function for unset token.
export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  Cookies.remove("id");
  Cookies.remove("username");
  Cookies.remove("jwt");
};

// Get data from local cookie
export const getUserFromLocalCookie = () => {
  return Cookies.get("username");
};

export const getEmailFromLocalCookie = () => {
  return Cookies.get("email");
};

export const getJwtFromLocalCookie = () => {
  return Cookies.get("jwt");
};
