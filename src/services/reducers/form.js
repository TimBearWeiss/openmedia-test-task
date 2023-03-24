import { SWITCH_WINDOW } from "../actions/form";
import { SET_URL } from "../actions/form";
import { SWITCH_MODAL } from "../actions/form";

const defaultState = {
  url: "",
  isPost: false,
  isModalOpen: false,
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

    case SWITCH_MODAL:
      return {
        ...state,
        isModalOpen: action.item,
      };

    default:
      return state;
  }
};
