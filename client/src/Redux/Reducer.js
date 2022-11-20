import { GETDATA, UPDATEDATA } from "./actionTypes";

const initState = {
  data: [],
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GETDATA: {
      return {
        ...state,
        data: [...payload],
      };
    }
    case UPDATEDATA: {
      return {
        ...state,
        data: [payload],
      };
    }
    default:
      return state;
  }
};
