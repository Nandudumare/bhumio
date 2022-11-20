import axios from "axios";
import { GETDATA, UPDATEDATA } from "./actionTypes";

export const getData = () => (dispatch) => {
  axios
    .get("http://localhost:8080/family")
    .then((res) => dispatch({ type: GETDATA, payload: [...res.data] }))
    .catch((err) => console.log(err));
};

export const changeData = (id, level, payload) => (dispatch) => {
  axios
    .patch(`http://localhost:8080/family/${id}/${level}`, payload)
    .then((res) => dispatch(getData()))
    .catch((err) => console.log(err));
};

export const changeReduxData = (data) => (dispatch) => {
  dispatch({ type: UPDATEDATA, payload: [...data] });
};
