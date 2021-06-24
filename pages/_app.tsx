import '@assets/main.css';
import 'nprogress/nprogress.css';

import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
// import Script from 'next/script';

import ManagedUIContext from '@components/context';
import { CommonLayout } from '@components/layout';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Script src="/js/redirectIE.js" strategy="beforeInteractive" /> */}
      <Head>
        <script src="/js/redirectIE.js" defer />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ManagedUIContext>
        <CommonLayout>
          <Component {...pageProps} />
        </CommonLayout>
      </ManagedUIContext>
    </>
  );
}
