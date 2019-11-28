// Base HTML Template Used by Server-Side Renderer
import { AfterData, AfterRoot } from '@jaredpalmer/after'
import * as React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { CtxProps, HtmlProps } from '../../typings'

export default class HtmlTemplate extends React.Component<HtmlProps> {
  public static async getInitialProps({ assets, data, renderPage }: CtxProps) {
    const sheet = new ServerStyleSheet();
    const page = await renderPage((App: React.FC) => (props: any) => sheet.collectStyles(<App {...props}/>))
    const styleTags = sheet.getStyleElement();
    return { assets, data, styleTags, ...page };
  }

  public render() {
    const { helmet, assets, data, styleTags, serverState } = this.props
    const htmlAttrs = helmet.htmlAttributes.toComponent()
    const bodyAttrs = helmet.bodyAttributes.toComponent()

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:100,100italic,300,300italic,400,400italic,500,500italic,700&display=swap" />
          <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto+Slab&display=swap" />
          {styleTags}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          <script dangerouslySetInnerHTML={{__html: `window.INITIAL_STATE = ${JSON.stringify(serverState)}` }}/>
          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
        </body>
      </html>
    )
  }
}
