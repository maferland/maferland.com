import Layout from '@/components/Layout'
import '@/styles/globals.css'

import type {AppProps} from 'next/app'

export default function App({Component, pageProps}: AppProps) {
  const getLayout = (Component as any).getLayout
    ? (Component as any).getLayout
    : (page: any) => page
  ;(page: any) => page

  return getLayout(
    <>
      <Layout>
        {/* <Head>
              <meta
                name='viewport'
                content='width=device-width, initial-scale=1'
              />
            </Head> */}
        <Component {...pageProps} />
      </Layout>
    </>,
  )
}
