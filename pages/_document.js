import Document, { Head, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion-server'
import { flush } from 'emotion'
import { ThemeProvider } from 'theming'

const dev = process.env.NODE_ENV !== 'production'

const theme = {
    color: 'black'
}

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    // if (dev) { flush() }
    const page = renderPage()
    const styles = extractCritical(page.html)
    return { ...page, ...styles }
  }

  constructor (props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = ids
    }
  }

  render () {
    return (
      <html>
        <Head>
          <title>With Emotion</title>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <script src="https://use.typekit.net/ztk2zqe.js"></script>
          <script dangerouslySetInnerHTML={{ __html: 'try{Typekit.load({ async: false });}catch(e){}' }} />
        </Head>
        <body>
            <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

