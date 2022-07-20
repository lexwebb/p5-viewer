import { Box, Grid, Page, PageContent, Image } from "grommet";
import type { NextPage } from "next";
import useSWR from "swr";
import SidebarNav from "../components/SidebarNav";
import { Sketches } from "../dto/sketches";
import { useSketchesService } from "../services/sketchesService";

const Home: NextPage = () => {
  const { getSketches } = useSketchesService();
  const { data, error } = useSWR<Sketches>("/api/sketches", getSketches);

  return (
    <Page height="100%">
      <PageContent height="100%">
        <Grid
          rows={["xxsmall", "auto"]}
          columns={["small", "auto"]}
          gap="small"
          areas={[
            { name: "header", start: [0, 0], end: [1, 0] },
            { name: "nav", start: [0, 1], end: [0, 1] },
            { name: "main", start: [1, 1], end: [1, 1] },
          ]}
          height="100%"
        >
          <Box gridArea="header" background="brand">
            <Image
              src="https://p5js.org/assets/img/p5js.svg"
              alt="logo"
              fit="contain"
            />
          </Box>
          <Box gridArea="nav">
            <SidebarNav data={data} />
          </Box>
          <Box gridArea="main" height="100%">
            {data && data.files[0] && (
              <iframe
                src={`/api/sketch/${data.files[0]}`}
                className="p5-frame"
                frameBorder="0"
              ></iframe>
            )}
          </Box>
        </Grid>
      </PageContent>
    </Page>
  );
};

export default Home;
