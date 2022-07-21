import { Box, Grid, Page, PageContent, Image, Heading } from "grommet";
import type { NextPage } from "next";
import { useState } from "react";
import useSWR from "swr";
import SidebarNav from "../components/SidebarNav";
import Sketch from "../components/Sketch";
import { Sketches } from "../dto/sketches";
import { useSketchesService } from "../services/sketchesService";

const Home: NextPage = () => {
  const { getSketches } = useSketchesService();
  const { data, error } = useSWR<Sketches>("/api/sketches", getSketches);
  const [currentSketch, setCurrentSketch] = useState<string>();

  return (
    <Page height="100%">
      <Box
        gridArea="header"
        background="light-1"
        elevation="small"
        pad="xsmall"
        direction="row"
        margin={{"bottom": "medium"}}
      >
        <Grid
          rows={["xxsmall"]}
          columns={["small", "auto"]}
          areas={[
            { name: "logo", start: [0, 0], end: [0, 0] },
            { name: "topNav", start: [1, 0], end: [1, 0] },
          ]}
          height="100%"
          gap="small"
        >
          <Box gridArea="logo">
            <Image
              src="https://p5js.org/assets/img/p5js.svg"
              alt="logo"
              fit="contain"
            />
          </Box>
          <Box gridArea="topNav"></Box>
        </Grid>
      </Box>
      <PageContent height="100%">
        <Grid
          rows={["auto"]}
          columns={["medium", "auto"]}
          areas={[
            { name: "nav", start: [0, 0], end: [0, 0] },
            { name: "main", start: [1, 0], end: [1, 0] },
          ]}
          height="100%"
          gap="small"
        >
          <Box gridArea="nav">
            <SidebarNav data={data} selectSketch={setCurrentSketch} />
          </Box>
          <Box gridArea="main" height="100%">
            {currentSketch && <Sketch sketch={currentSketch} />}
            {!currentSketch && <Heading>Select a scetch from the left</Heading>}
          </Box>
        </Grid>
      </PageContent>
    </Page>
  );
};

export default Home;
