import '../public/css/bootstrap.css';
import '../public/css/all.css';
import '../public/css/animate.css'
import '../public/css/headroom.css'
import '../public/css/fonts.css'
import Layout from '../components/layout/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
