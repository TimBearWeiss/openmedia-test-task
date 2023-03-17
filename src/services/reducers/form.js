import { SWITCH_WINDOW } from "../actions/form";
import { SET_URL } from "../actions/form";

const defaultState = {
  url: "",
  isPost: false,
};

export const formReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SWITCH_WINDOW:
      return {
        ...state,
        isPost: action.item,
      };

    case SET_URL:
      return {
        ...state,
        url: action.item,
      };

    default:
      return state;
  }
};
