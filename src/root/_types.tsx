/** @format */

export interface HtmlProps {
  data: {},
  helmet: {
    bodyAttributes: {
      toComponent: () => {}
    },
    htmlAttributes: {
      toComponent: () => {}
    },
    link: {
      toComponent: () => {}
    },
    meta: {
      toComponent: () => {}
    },
    title: {
      toComponent: () => {}
    },

},
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
