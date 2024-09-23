import axios from 'axios';

export const fetchUser = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_USER_REQUEST' });

    try {
      const response = await axios.get('/api/user');
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch(fetchUserFailure(error));
    }
  };
}; 