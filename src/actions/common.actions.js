import { START_LOADING, END_LOADING, TEST } from "../constants/common-constant";

export function startLoading(payload) {
  return {
    type: START_LOADING,
    payload,
  };
}

export function test(payload) {
  return {
    type: TEST,
    payload,
  };
}

export function endLoading(payload) {
  return {
    type: END_LOADING,
    payload,
  };
}
