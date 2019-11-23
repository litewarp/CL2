import { createAction, createReducer } from '@reduxjs/toolkit'

export const toggleDarkMode = createAction('@layout/TOGGLE_DARK_MODE')

const initialState = { darkMode: true }

export const layoutReducer = createReducer(initialState, {
  [toggleDarkMode]: ({ layout }, action) => ({ ...layout, darkMode: !state.darkMode })
})
