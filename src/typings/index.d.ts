// type definitions for Court Listener
import { DocumentProps, InitialProps } from '@jaredpalmer/after'

declare module '*.png'
export interface ThemeContext {
  mode: string,
  toggleMode(): void | undefined;
}
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

export interface StatelessPage<P = {}> extends React.FC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}
export interface CtxProps {
  assets: Assets,
  req?: {},
  res?: {},
  history?: {},
  location?: {},
  data: {},
  renderPage: (node: React.ReactNode) => {},
}

interface HomePageData {
  latestAudioData: {},
  latestOpinionData: {},
}

export interface HomePageProps extends Merge<InitialProps, HomePageData> {}
