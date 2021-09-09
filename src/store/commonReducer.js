/* eslint-disable import/no-anonymous-default-export */
import {
  START_LOADING,
  END_LOADING,
  // TEST,
  TEMPERATURE,
  PREVIOUSREADINGS,
} from "../constants/common-constant";

const initialState = {
  loading: false,
  temperature: "",
  previousReadings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case END_LOADING:
      return {
        ...state,
        loading: false,
      };
    case PREVIOUSREADINGS:
      return {
        ...state,
        previousReadings: action.payload,
      };

    case TEMPERATURE:
      return {
        ...state,
        temperature: action.payload,
      };

    default:
      return state;
  }
};
