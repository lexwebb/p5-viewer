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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
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
