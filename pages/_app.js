import { ChakraProvider } from "@chakra-ui/react";
import Router from 'next/router';
import Layout from "../components/Layout";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { StateContext } from "../context/StateContext";
import NProgress from "nprogress";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
   NProgress.configure({ showSpinner: false })

   Router.events.on('routeChangeStart', () => {
      NProgress.start();
   })

   Router.events.on('routeChangeComplete', () => {
      NProgress.done();
   })
   return (
      <>
         <Head>
            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==' crossOrigin='anonymous' referrerPolicy='no-referrer' />
         </Head>
         <ChakraProvider>
            <StateContext articles={pageProps}>
               <Provider store={store}>
                  <Layout>
                     <Component {...pageProps} />
                  </Layout>
               </Provider>
            </StateContext>
         </ChakraProvider>
      </>
   );
}

export default MyApp;
