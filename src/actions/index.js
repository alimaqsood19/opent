import OpenTable from '../apis/OpenTable';

export const fetchPosts = () => async (dispatch) => {
  const response = await OpenTable.get('/cities');
  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};
