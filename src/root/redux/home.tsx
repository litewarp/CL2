import { createAction, createReducer } from '@reduxjs/toolkit'

export const fetchData = createAction('@home/FETCH_DATA')

const initialState = {
  latestOpinions: [],
  loading: false,
}

export const homeReducer = createReducer(initialState, {
  [fetchData as any]: (state, action) => ({
    ...state,
    latestOpinions: action.payload.data
  })
})
