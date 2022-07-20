import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Grommet } from "grommet";
import {
  sketchesService,
  SketchesServiceContext,
} from "../services/sketchesService";

function App({ Component, pageProps }: AppProps) {
  return (
    <Grommet full>
      <SketchesServiceContext.Provider value={sketchesService}>
        <Component {...pageProps} />
      </SketchesServiceContext.Provider>
    </Grommet>
  );
}

export default App;
