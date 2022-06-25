import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import { AppProps } from 'next/app';

import '../styles/global.css';
import '../styles/garamond.css';
import '../styles/editor.css';

const theme = extendTheme({
  components: {
    Steps,
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default MyApp;
