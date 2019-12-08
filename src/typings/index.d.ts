// Type definitions for [COURT_LISTENER] [V.0.0.1]
// Project: The Free Law Project (https://free.law)
// Definitions by: Nick Sethi (nick@sethipc.com)


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

export interface HomePageData {
  latestAudioData: {},
  latestOpinionData: {},
}

export interface HomePageProps extends Merge<InitialProps, HomePageData> {}

export interface DonationFormValues {
  amount: string,
  city: string,
  creditCardCvc: string,
  creditCardExpMonth: string,
  creditCardExpYear: string,
  creditCardNumber: string,
  donationFrequency: string,
  donationMethod: string,
  donationReminderOptIn: boolean,
  email: string,
  firstName: string,
  frequency: string,
  lastName: string,
  mailingAddress1: string,
  mailingAddress2: string,
  monthlyNewsletterOptIn: boolean,
  state: string,
  zip: string,
}

export interface CourtsTableProps {
  isFetching: boolean,
  isFetchingMore: boolean,
  canFetchMore: boolean,
  fetchMore: ({page}: { page: number }) => void,
  data: Promise<CourtsApiResponse[]> | CourtsApiResponse[],
  nextUrl: string
}
