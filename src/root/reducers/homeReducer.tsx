import { FETCH_TEST } from '../actions'

interface HomeState {
  latestOpinions: any[]
}

const initialState: HomeState = {
  latestOpinions: []
}

export default (state = initialState, action: { type: string, payload: {} }) => {
  switch (action.type) {
    case FETCH_TEST:
      return action.payload;

    default:
      return state;
  }
};
