const initialState = {
  user: null,
  loading: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer; 