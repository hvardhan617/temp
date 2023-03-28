import { ProductContext } from "@/context/ProductContext";
import { useState } from "react";
import '@/styles/globals.css'
export default function App({ Component, pageProps }) {
  const [globalState, setGlobalState] = useState();
  let api_Host = process.env.NEXT_PUBLIC_API_HOST;
  console.log('api_Host env', api_Host);
  return (
    <ProductContext.Provider value={{ globalState, setGlobalState }}>
      <Component {...pageProps} />
    </ProductContext.Provider>
  );
}
