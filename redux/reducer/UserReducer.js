import * as ActionList from "../actions/ActionsList";
const initialState = {
  IS_LOGGED: false,
  TOKEN: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionList.IS_LOGGED_IN:
      return { ...state, IS_LOGGED: true };
    case ActionList.IS_LOGGED_OUT:
      return { ...state, IS_LOGGED: false };
    case ActionList.USER_TOKEN:
      return { ...state, TOKEN: payload };
    default:
      return state;
  }
};
