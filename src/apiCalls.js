import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      // "http://localhost:8001/v1/auth/login",
      "https://mo-connect.onrender.com/api/v1/auth/login",
      userCredential
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data.user });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const registerCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "https://mo-connect.onrender.com/api/v1/auth/register",
      userCredential
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data.user });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
