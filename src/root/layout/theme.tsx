import { deepFreeze } from 'grommet/utils'

export default deepFreeze({
  defaultMode: 'light',
  global: {
    colors: {
      'accent-1': '#689d6a',
      'accent-2': '#98971a',
      'accent-3': '#d79921',
      'accent-4': '#b16286',
      'active': 'rgba(102,102,102,0.5)',
      'active-background': 'background-weak',
      'active-text': 'text-strong',
      'background': {
        dark: '#282828',
        light: '#f9f5d7'
      },
      'background-strong': {
        dark: '#1d2021',
        light: '#f9f5d7'
      },
      'background-weak': {
        dark: '#3c3836',
        light: '#ebdbb2'
      },
      'background-xweak': {
        dark: '#504945',
        light: '#d5c4a1'
      },
      'border': 'background-xweak',
      'brand': '#fb4934',
      'dark-1': '#1d2021',
      'dark-2': '#282828',
      'dark-3': '#3c3836',
      'dark-4': '#504945',
      'dark-5': '#665c54',
      'dark-6': '#7c6f64',
      'focus': '#d65d0e',
      'light-1': '#f9f5d7',
      'light-2': '#fbf1c7',
      'light-3': '#ebdbb2',
      'light-4': '#d5c4al',
      'light-5': '#bdae93',
      'light-6': '#a89984',
      'neutral-1': '#458588',
      'neutral-2': '#d3869b',
      'neutral-3': '#83a598',
      'neutral-4': '#b57614',
      'selected-background': 'background-strong',
      'selected-text': 'text-strong',
      'status-critical': '#cc241d',
      'status-disabled': '#a89984',
      'status-ok': '#b8bb26',
      'status-unknown': '#a899984',
      'status-warning': '#fabd2f',
      'text': {
        dark: 'light-2',
        light: 'dark-2'
      },
      'text-strong': {
        dark: 'light-1',
        light: 'dark-1'
      },
      'text-weak': {
        dark: 'light-3',
        light: 'dark-3'
      },
      'text-xweak': {
        dark: 'light-4',
        light: 'dark-4'
      },
    },
    font: {
      family: 'Roboto',
      height: '20px',
      size: '14px',
    },
    graph: {
      colors: {
        dark: [
          'brand'
        ],
        light: [
          'brand'
        ]
      }
    }
  },
  name: 'CourtListener',
  rounding: 4,
  spacing: 20,
})
