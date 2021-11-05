import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Web3ReactProvider } from '@web3-react/core'
import { getProvider } from '../utils/web3';
import Layout from '../components/layout';

// https://coolors.co/ffbe0b-fb5607-ff006e-8338ec-3a86ff
const colors = {
  brand: {
    900: "#FF006E", // winter sky
    800: "#FFBE0B", // mango
    700: "#8338EC", // blue violet
  },
}

const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <Web3ReactProvider  getLibrary={getProvider}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
