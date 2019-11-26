import { deepFreeze } from 'grommet/utils'

export default deepFreeze({
  defaultMode: 'light',
  global: {
    colors: {
      'accent-1': '#E6734B',
      'accent-2': '#E6C84B',
      'accent-3': '#915591',
      'active': 'rgba(102,102,102,0.5)',
      'active-background': 'background-weak',
      'active-text': 'text-strong',
      'background': {
        dark: '#222222',
        light: '#FFFFFF'
      },
      'background-strong': {
        dark: '#000000',
        light: '#FFFFFF'
      },
      'background-weak': {
        dark: '#444444a0',
        light: '#E8E8E880'
      },
      'background-xweak': {
        dark: '#66666699',
        light: '#CCCCCC90'
      },
      'border': 'background-xweak',
      'brand': '#0096D6',
      'control': 'brand',
      'dark-1': '#000001',
      'dark-2': '#676767',
      'focus': '#99d5ef',
      'light-1': '#F2F2F2',
      'light-2': '#E8E8E8',
      'light-3': '#CCCCCC',
      'neutral-1': '#006996',
      'neutral-2': '#A65336',
      'neutral-3': '#A69136',
      'neutral-4': '#774677',
      'selected-background': 'background-strong',
      'selected-text': 'text-strong',
      'status-critical': '#F04B37',
      'status-disabled': '#CCCCCC',
      'status-ok': '#509137',
      'status-unknown': '#CCCCCC',
      'status-warning': '#F0AA3C',
      'text': {
        dark: '#EEEEEE',
        light: '#333333'
      },
      'text-strong': {
        dark: '#FFFFFF',
        light: '#000000'
      },
      'text-weak': {
        dark: '#CCCCCC',
        light: '#444444'
      },
      'text-xweak': {
        dark: '#999999',
        light: '#666666'
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
