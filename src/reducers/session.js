const initialState = {
  authUser: null
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser
});

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case "AUTH_USER_SET": {
      return applySetAuthUser(state, action);
    }
    default:
      return state;
  }
}

export default sessionReducer;
