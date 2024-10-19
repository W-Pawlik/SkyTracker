import { css } from "@emotion/react";
import { Tab } from "@mui/base/Tab";
import { TabPanel } from "@mui/base/TabPanel";
import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";

interface TabData {
  tabTitle: string | React.ReactNode;
  tabContent: string | React.ReactNode;
}

interface BaseTabsProps {
  tabData: TabData[];
}

const BaseTabsCss = {
  box: (gap: string) =>
    css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: `${gap}`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      paddingTop: "1rem",
      maxHeight: "60rem",
      maxWidth: "60rem"
    })
};

export const BaseTabs = ({ tabData }: BaseTabsProps) => (
  <Tabs defaultValue={0}>
    <TabsList>
      <Tab value={0}>OpenSKy</Tab>
      <Tab value={1}>GoogleMaps</Tab>
    </TabsList>
    <TabPanel value={0}>OpenSKy</TabPanel>
    <TabPanel value={1}>GoogleMaps</TabPanel>
  </Tabs>
);
