import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <meta charset="utf-8" />
          <meta name="author" content="INNOVATE" />
          <meta property="og:image" content="" />
          <meta property="og:description" content="" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="UNICUS WEB" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
