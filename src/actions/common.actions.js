import {
  START_LOADING,
  END_LOADING,
  TEMPERATURE,
} from "../constants/common-constant";

export function startLoading(payload) {
  return {
    type: START_LOADING,
    payload,
  };
}

export function temperature(payload) {
  return {
    type: TEMPERATURE,
    payload,
  };
}

export function endLoading(payload) {
  return {
    type: END_LOADING,
    payload,
  };
}
