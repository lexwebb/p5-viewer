import { createContext, useContext } from "react";
import { Fetcher } from "swr";
import { Sketches } from "../dto/sketches";

export interface SketchesService {
  getSketches: Fetcher<Sketches>;
}

export const sketchesService: SketchesService = {
  getSketches: async () => {
    return fetch("/api/sketches").then((res) => res.json());
  },
};

export const SketchesServiceContext = createContext<
  SketchesService | undefined
>(undefined);

export const useSketchesService = (): SketchesService => {
  const s = useContext(SketchesServiceContext);

  if (s === undefined) {
    throw new Error("SketchesService must be initialised before use");
  }

  return s;
};
