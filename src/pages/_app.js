import { ProductContext } from "@/context/ProductContext";
import { useState } from "react";
import '@/styles/globals.css'
export default function App({ Component, pageProps }) {
  const [globalState, setGlobalState] = useState();

  return (
    <ProductContext.Provider value={{ globalState, setGlobalState }}>
      <Component {...pageProps} />
    </ProductContext.Provider>
  );
}
