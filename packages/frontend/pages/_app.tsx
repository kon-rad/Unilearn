import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Web3ReactProvider } from '@web3-react/core'
import { getProvider } from '../utils/web3';
import Layout from '../components/layout';
import { SEO } from '../components/seo'

const colors = {}

const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider  getLibrary={getProvider}>
      <ChakraProvider theme={theme}>
        <SEO />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
