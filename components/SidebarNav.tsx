import { Button, Nav, Sidebar } from "grommet";
import React from "react";
import useSWR from "swr";
import { Sketches } from "../dto/sketches";
import { useSketchesService } from "../services/sketchesService";

const SidebarNav: React.FC<{ data?: Sketches }> = ({ data }) => {
  return (
    <Sidebar
      background="brand"
      round="small"
      header={"Files"}
      footer={<Button hoverIndicator>Help</Button>}
    >
      <Nav gap="small">
        {data?.files.map((f) => (
          <Button hoverIndicator>{f}</Button>
        ))}
      </Nav>
    </Sidebar>
  );
};

export default SidebarNav;
