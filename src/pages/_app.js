import { ProductContext } from "@/context/ProductContext";
import { useState,useEffect } from "react";
import { useRouter } from 'next/router';
import '@/styles/globals.css'
import App from 'next/app';
import ReactGA from 'react-ga';

MyApp.getInitialProps = async (appContext) => {
  // const apiUrl = process.env.API_URL; // replace with your API URL
  // const res = await fetch(apiUrl);
  // const { gaId, pixelId } = await res.json();
  //  gaId = GTM-N3VZMP4;
  const pixelId = 590918032795677;
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, pageProps: {pixelId } };
};
const cacheControlMiddleware = (res) => {
  // Set cache time to one week (604800 seconds) and mark as immutable
  res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
};

export default function MyApp({ Component, pageProps }) {
  // ReactGA.initialize(pageProps.gaId);
  useEffect(() => {
    import('react-facebook-pixel').then(ReactPixel => {
      ReactPixel.init(pageProps.pixelId);
    });
  }, [pageProps.pixelId]);
  // if (typeof window !== 'undefined') {
  //   ReactPixel.init(pageProps.pixelId);
  // }
  // ReactPixel.init(pageProps.pixelId);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // Apply caching headers to server response
      const { res } = router;
      if (res) {
        cacheControlMiddleware(res);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
  const [globalState, setGlobalState] = useState();

  return (
    <ProductContext.Provider value={{ globalState, setGlobalState }}>
      <Component {...pageProps} />
    </ProductContext.Provider>
  );
}
