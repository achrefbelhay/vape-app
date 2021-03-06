import axios from "axios";
import {
  USER_LOADING,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  GET_AUTH_USER,
  AUTH_ERRORS,
} from "../constants/ActionsTypes";
// userLoading
const userLoading = () => (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
};
// Register USer
export const registerUser = (formData) => async (dispatch) => {
  dispatch(userLoading());
  try {
    const res = await axios.post(" api/auth/register", formData);

    dispatch({
      type: REGISTER_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    console.dir(error);
    const { errors, msg } = error.response.data;

    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    console.log(errors);
    if (msg) {
      alert(msg);
    }

    dispatch({
      type: AUTH_ERRORS,
    });
  }
};
// login user
export const loginUser = (formData) => async (dispatch) => {
  dispatch(userLoading());
  try {
    const res = await axios.post("api/auth/login", formData);

    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    console.dir(error);
    const { errors, msg } = error.response.data;

    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    console.log(errors);
    if (msg) {
      alert(msg);
    }

    dispatch({
      type: AUTH_ERRORS,
    });
  }
};

// logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};
// GET_AUTH_USER
export const getAuthUser = () => async (dispatch) => {
  dispatch(userLoading());

  try {
    //headers
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    const res = await axios.get("/api/auth/user", config);
    dispatch({
      type: GET_AUTH_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
