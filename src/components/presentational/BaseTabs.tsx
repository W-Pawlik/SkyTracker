import { css } from "@emotion/react";
import { Tab } from "@mui/base/Tab";
import { TabPanel } from "@mui/base/TabPanel";
import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import { Typography } from "@mui/material";
import { Box, Theme, useTheme } from "@mui/system";

interface TabData {
  tabTitle: string | React.ReactNode;
  tabContent: string | React.ReactNode;
  tabImg?: string;
  contentImg?: string;
}

interface BaseTabsProps {
  tabData: TabData[];
}

const BaseTabsCss = {
  tabList: (theme: Theme) =>
    css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: `1px solid ${theme.palette.common.lightGrey}`,
      gap: "2rem"
    }),
  tab: (theme: Theme) =>
    css({
      position: "relative",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      "&.base--selected": {
        borderBottom: `5px solid ${theme.palette.primary.main}`,
        "&:: after": {
          content: '""',
          position: "absolute",
          bottom: "-16px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "0",
          height: "0",
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderTop: `12px solid ${theme.palette.primary.main}`
        }
      }
    }),
  tabPanel: () =>
    css({
      display: "flex",
      alignItems: "start",
      justifyContent: "center",
      padding: "2rem 9rem",
      "&.base-TabPanel-hidden": {
        display: "none !important"
      }
    }),
  tabPanelContent: () =>
    css({
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      width: "50%",
      padding: "0 2rem"
    }),
  tabPanelContentImg: () =>
    css({
      height: "20rem",
      width: "30rem"
    })
};

export const BaseTabs = ({ tabData }: BaseTabsProps) => {
  const theme: Theme = useTheme();

  return (
    <Tabs defaultValue={0}>
      <TabsList css={BaseTabsCss.tabList(theme)}>
        {tabData.map((tab, i) => (
          <Tab value={i} key={i} css={BaseTabsCss.tab}>
            {tab.tabImg ? <Box component="img" src={tab.tabImg} /> : tab.tabTitle}
          </Tab>
        ))}
      </TabsList>
      {tabData.map((tab, i) => (
        <TabPanel value={i} key={i} css={BaseTabsCss.tabPanel}>
          <Box css={BaseTabsCss.tabPanelContent}>
            <Typography variant="h2" sx={{ fontSize: "2rem" }}>
              {tab.tabTitle}
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: "80%" }}>
              {tab.tabContent}
            </Typography>
          </Box>
          <Box
            component="img"
            src={tab.contentImg}
            alt="smth"
            css={BaseTabsCss.tabPanelContentImg}
          />
        </TabPanel>
      ))}
    </Tabs>
  );
};
