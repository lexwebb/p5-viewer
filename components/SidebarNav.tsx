import { Button, Heading, Nav, Sidebar } from "grommet";
import React from "react";
import useSWR from "swr";
import { Sketches } from "../dto/sketches";
import { useSketchesService } from "../services/sketchesService";

const SidebarNav: React.FC<{ data?: Sketches }> = ({ data }) => {
  return (
    <Sidebar
      header={<Heading margin="none" size="small">✏️ Sketches</Heading>}
      footer={<Button hoverIndicator>Help</Button>}
      background="light-3"
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
