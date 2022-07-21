import { Box, Button, Heading, Sidebar } from "grommet";
import React, { useMemo } from "react";
import { Sketches } from "../dto/sketches";
import TreeMenu, { TreeNodeInArray } from "react-simple-tree-menu";

interface SidebarNavProps {
  data?: Sketches;
  selectSketch: (sketch: string) => void;
}

type Intermediary = {
  [key: string]: Intermediary | string;
};

const SidebarNav: React.FC<SidebarNavProps> = ({ data, selectSketch }) => {
  const treeData = useMemo(() => {
    const getTree = (obj: Intermediary, parts: string[]) => {
      if (parts.length === 1) {
        obj[parts[0]] = parts[0];
      } else {
        if (!obj[parts[0]]) {
          obj[parts[0]] = {};
        }
        obj[parts[0]] = {};
        getTree(obj[parts[0]] as Intermediary, parts.slice(1));
      }

      return obj;
    };

    const asObj = data?.files.reduce((obj, curr) => {
      const parts = curr.split("\\");

      return getTree(obj, parts);
    }, {} as Intermediary);

    const getData = (
      obj: Intermediary,
      parentKey?: string
    ): TreeNodeInArray[] => {
      return Object.keys(obj).map<TreeNodeInArray>((key) => {
        if (typeof obj[key] === "string") {
          return {
            key: obj[key] as string,
            label: parentKey
              ? `${parentKey}\\${obj[key] as string}`
              : (obj[key] as string),
          };
        } else {
          return {
            key: key,
            label: key,
            nodes: getData(obj[key] as Intermediary, key),
          };
        }
      });
    };

    return asObj && getData(asObj);
  }, [data?.files]);

  return (
    <Box>
      <Sidebar
        header={
          <Heading margin="none" size="small">
            ✏️ Sketches
          </Heading>
        }
        footer={<Button hoverIndicator>❔</Button>}
        round="small"
        elevation="small"
        pad="medium"
      >
        <TreeMenu
          data={treeData}
          openNodes={data?.files
            .filter((f) => f.includes("\\"))
            .map((f) => f.replace("\\", "/").slice(0, f.lastIndexOf("\\")))}
          onClickItem={(item) => {
            selectSketch(item.label);
          }}
        >
          {({ items }) => (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {items.map(({ key, ...props }) => (
                <li key={key} style={{ paddingBottom: "0.5rem" }}>
                  <Button
                    style={{
                      padding: "0.5rem",
                      marginLeft: `${1 * props.level}rem`,
                      background: props.active ? "#f6d992" : undefined,
                      borderRadius: "0.5rem",
                    }}
                    onClick={(e) => props.onClick(e as any)}
                    hoverIndicator
                    size="large"
                  >
                    {props.hasNodes ? "📂" : "✏️"}{" "}
                    {props.label.slice(props.label.lastIndexOf("\\") + 1)}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </TreeMenu>
      </Sidebar>
    </Box>
  );
};

export default SidebarNav;
