
// define the type of the initialState object
interface LayoutState {
  darkMode: boolean
}

// define the initialState object
const initialState: LayoutState = {
  darkMode: true
}

// create the reducer
export default (
  state = initialState,
  action: { type: string, payload: {} }
) => {
  switch (action.type) {
    default:
      return state
  }
}
