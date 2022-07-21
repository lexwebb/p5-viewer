import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Grommet } from "grommet";
import {
  sketchesService,
  SketchesServiceContext,
} from "../services/sketchesService";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>P5 Sketches</title>
      </Head>
      <Grommet
        full
        theme={{
          global: {
            font: {
              family: "'Montserrat', sans-serif",
              size: '18px',
              height: '20px',
            },
          },
        }}
      >
        <SketchesServiceContext.Provider value={sketchesService}>
          <Component {...pageProps} />
        </SketchesServiceContext.Provider>
      </Grommet>
    </>
  );
}

export default App;
