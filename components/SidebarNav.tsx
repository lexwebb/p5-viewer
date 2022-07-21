import { Button, Heading, Nav, Sidebar } from "grommet";
import React from "react";
import { Sketches } from "../dto/sketches";

const SidebarNav: React.FC<{ data?: Sketches }> = ({ data }) => {
  return (
    <Sidebar
      header={<Heading margin="none" size="small">✏️ Sketches</Heading>}
      footer={<Button hoverIndicator>Help</Button>}
      background="light-3"

    >
      <Nav gap="small">
        {data?.files.map((f) => (
          <Button key={f} hoverIndicator>{f}</Button>
        ))}
      </Nav>
    </Sidebar>
  );
};

export default SidebarNav;
