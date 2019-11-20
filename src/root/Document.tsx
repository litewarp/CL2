import * as React from "react";
import { ServerStyleSheet } from 'styled-components'
import { AfterRoot, AfterData } from "@jaredpalmer/after";
import routes from "../routes";

const prefix =
  process.env.NODE_ENV === "production"
    ? "/"
    : `http://${process.env.HOST}:${parseInt(process.env.PORT, 10) + 1}/`;

class Document extends React.Component {
  static async getInitialProps({ assets, data, renderPage, req }) {
    const sheet = new ServerStyleSheet();
    const page = await renderPage(App => props => sheet.collectStyles
    (<App {...props}/>));
    const styleTags = sheet.getStyleElement();

    return { assets, data, styleTags, ...page };
  }

  render() {
    const { helmet, assets, data, styleTags, serverState } = this.props;
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          {styleTags}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          <script dangerouslySetInnerHTML={{__html: `window.INITIAL_STATE = ${JSON.stringify(serverState)}` }}></script>
          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
        </body>
      </html>
    );
  }
}

export default Document;
