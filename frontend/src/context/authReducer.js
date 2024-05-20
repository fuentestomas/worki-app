export const authReducer = (state, action) => {
  const { type, payload } = action;
  // console.log(type, payload);
  switch (type) {
    case '[Auth] Login':
      return {
        ...state,
        logged: true,
        user: payload,
      };
    case '[Auth] Logout':
      return {
        logged: false,
        user: {},
      };
    default:
      return state;
  }
};
