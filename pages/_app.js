import RootContextProvider from '../contexts/RootContextProvider'
import SiteLayout from '../layouts/SiteLayout'
import '../styles/main.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

function MyApp({ Component, pageProps }) {
  return (
    <RootContextProvider>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </RootContextProvider>
  )
}

export default MyApp
