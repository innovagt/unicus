import '../public/css/bootstrap.css';
import '../public/css/all.css';
import '../public/css/animate.css'
import '../public/css/headroom.css'
import '../public/css/fonts.css'
import Layout from '../components/layout/Layout'
// import '../public/css/fancybox.css'
// import '../public/css/slick.css'
// import '../public/css/slick-theme.csss'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
