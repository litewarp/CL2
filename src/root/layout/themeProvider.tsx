import * as React from 'react'
import { ThemeContext } from '../../typings/index'

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

const defaultMode = 'dark'

export const ManageThemeContext: React.Context<ThemeContext> = React.createContext({
  mode: defaultMode,
  // tslint:disable-next-line
  toggleMode: () => {}
})

export const useTheme = () => React.useContext(ManageThemeContext)

export const ThemeManager: React.FC = ({ children }) => {
  const [themeState, setThemeState] = React.useState({
    mode: defaultMode
  })
  const toggle = (): void => {
    setThemeState({ mode: (themeState.mode === 'light' ? 'dark' : 'light')})
  }
  return (
    <ManageThemeContext.Provider
      value={{
        mode: themeState.mode,
        toggleMode: toggle,
      }}
    >
     {children}
    </ManageThemeContext.Provider>
  )
}
