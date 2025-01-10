import { SET_ERROR, SET_LOADING, SET_USER, Token } from "./Actiontype";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { toast } from "react-toastify";

const UserSignup = (user) => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });

  axios
    .post("https://rnwprojectbackend.onrender.com/user/register", user)
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
      dispatch({ type: Token, payload: res.data.token });
      Cookies.set("token", res.data.token);

      const decodedToken = jwtDecode(res.data.token);
      const role = decodedToken.role;

      toast.success("Signup successful! Redirecting...");
      if (role === "student") {
        window.location.href = "/student-dashboard";
      } else if (role === "teacher") {
        window.location.href = "/teacher-dashboard";
      }
    })
    .catch((err) => {
      dispatch({ type: SET_ERROR, payload: err.message });
      toast.error("Signup failed. Please try again.");
    })
    .finally(() => {
      dispatch({ type: SET_LOADING, payload: false });
    });
};





const UserLogin = (user) => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
  
    axios
      .post("https://rnwprojectbackend.onrender.com/user/login", user)
      .then((res) => {
        dispatch({ type: SET_USER, payload: res.data });
        dispatch({ type: Token, payload: res.data.token });
        Cookies.set("token", res.data.token);
  
        const decodedToken = jwtDecode(res.data.token);
        const role = decodedToken.role;
  
        toast.success("Login successful! Redirecting...");
        if (role === "student") {
          window.location.href = "/student-dashboard";
        } else if (role === "teacher") {
          window.location.href = "/teacher-dashboard";
        }
      })
      .catch((err) => {
        dispatch({ type: SET_ERROR, payload: err.message });
        toast.error("Login failed. Please try again.");
      })
      .finally(() => {
        dispatch({ type: SET_LOADING, payload: false });
      });
  };
  
  
  

export { UserSignup,UserLogin }