import { Dispatch } from 'redux'
export const FETCH_TEST = 'fetch_test';

export const fetchTest = () => async (dispatch: Dispatch) => {
  const res = await fetch.get('http://jsonplaceholder.typicode.com/posts');

  dispatch({
    payload: res.data,
    type: FETCH_TEST,
  });
};
