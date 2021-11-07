import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Web3ReactProvider } from '@web3-react/core'
import { getProvider } from '../utils/web3';
import Layout from '../components/layout';


/**
 * 
 * 

https://coolors.co/0d1b2a-1b263b-415a77-778da9-e0e1dd
--rich-black-fogra-29: #0d1b2aff;
--oxford-blue: #1b263bff;
--bdazzled-blue: #415a77ff;
--shadow-blue: #778da9ff;
--platinum: #e0e1ddff;

--rich-black-fogra-29: hsla(211, 53%, 11%, 1);
--oxford-blue: hsla(219, 37%, 17%, 1);
--bdazzled-blue: hsla(212, 29%, 36%, 1);
--shadow-blue: hsla(214, 23%, 56%, 1);
--platinum: hsla(75, 6%, 87%, 1);

https://coolors.co/64a6bd-90a8c3-ada7c9-d7b9d5-f4cae0
--maximum-blue: #64a6bdff;
--cadet-grey: #90a8c3ff;
--blue-bell: #ada7c9ff;
--pink-lavender: #d7b9d5ff;
--orchid-pink: #f4cae0ff;

--maximum-blue: hsla(196, 40%, 57%, 1);
--cadet-grey: hsla(212, 30%, 66%, 1);
--blue-bell: hsla(251, 24%, 72%, 1);
--pink-lavender: hsla(304, 27%, 78%, 1);
--orchid-pink: hsla(329, 66%, 87%, 1);

 */
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
