export const SWITCH_WINDOW = "SWITCH_WINDOW";
export const SET_URL = "SET_URL";
export const SWITCH_MODAL = "SWITCH_MODAL";

export const switchWindow = (item) => ({
  type: SWITCH_WINDOW,
  item,
});

export const setUrl = (item) => ({
  type: SET_URL,
  item,
});

export const switchModal = (item) => ({
  type: SWITCH_MODAL,
  item,
});
