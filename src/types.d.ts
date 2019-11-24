// type definitions for Court Listener
import { DocumentProps, InitialProps } from '@jaredpalmer/after'

declare module '*.png'

type Merge<A, B> = (Omit<A, keyof B> & B) extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

interface Assets {
  [name: string]: {
    [ext: string]: string
  }
}

interface InjectedDocumentProps {
  styleTags: React.ReactElement<any>,
  serverState: ApplicationState
}

export interface HtmlProps extends Merge<DocumentProps, InjectedDocumentProps> {}

export interface CtxProps {
  assets: Assets,
  req?: {},
  res?: {},
  history?: {},
  location?: {},
  data: {},
  renderPage: (node: React.ReactNode) => {},
}

export interface ApplicationState {
  layout: {
    darkMode: boolean,
  }
}
