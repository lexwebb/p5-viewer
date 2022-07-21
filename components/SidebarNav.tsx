import { Button, Heading, Nav, Sidebar } from "grommet";
import React from "react";
import { Sketches } from "../dto/sketches";

interface SidebarNavProps {
  data?: Sketches;
  selectSketch: (sketch: string) => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ data, selectSketch }) => {
  return (
    <Sidebar
      header={
        <Heading margin="none" size="small">
          ✏️ Sketches
        </Heading>
      }
      footer={<Button hoverIndicator>Help</Button>}
      background="light-3"
    >
      <Nav gap="small">
        {data?.files.map((f) => (
          <Button key={f} hoverIndicator onClick={() => selectSketch(f)}>
            {f}
          </Button>
        ))}
      </Nav>
    </Sidebar>
  );
};

export default SidebarNav;
