import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Web3ReactProvider } from '@web3-react/core'
import { getProvider } from '../utils/web3';
import Layout from '../components/layout';


// new 
// https://coolors.co/0d1b2a-1b263b-415a77-778da9-e0e1dd
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
