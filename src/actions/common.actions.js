import {
  START_LOADING,
  END_LOADING,
  TEMPERATURE,
  PREVIOUSREADINGS,
} from "../constants/common-constant";

export function startLoading(payload) {
  return {
    type: START_LOADING,
    payload,
  };
}

export function tempAction(payload) {
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
export function setOldReadings(payload) {
  return {
    type: PREVIOUSREADINGS,
    payload,
  };
}
