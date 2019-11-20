/** @format */

export interface HtmlProps {
  data: {},
  helmet: {},
  styleTags: {},
  serverState: {},
  assets: {
    client: {
      js: string,
    },
    vendor: {
      js: string,
    },
  },
}

export interface CtxProps {
  assets: {
    client: {
      js: string,
    },
    vendor: {
      js: string,
    },
  },
  req?: {},
  res?: {},
  history?: {},
  location?: {},
  data: mixed,
  renderPage: (node: React.ReactNode) => {},
}
