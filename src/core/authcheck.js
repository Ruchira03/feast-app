import axios from "axios";

export const isauth = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return true;
  } else {
    return false;
  }
};

export const signout = () => {
  alert("you will be signed out");
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};
