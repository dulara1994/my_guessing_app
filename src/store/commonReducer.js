import { START_LOADING, END_LOADING, TEST } from "../constants/common-constant";

const initialState = {
  loading: false,
  testdata: 'initial data',
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

    case TEST:
      return {
        ...state,
        testdata: action.payload,
      };

    default:
      return state;
  }
};
