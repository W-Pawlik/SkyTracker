import { css, Theme, useTheme } from "@emotion/react";
import { SvgIconComponent } from "@mui/icons-material";
import { ListItemButton } from "@mui/material";
import { Box } from "@mui/system";

interface SocialMediaIcon {
  icon: SvgIconComponent;
  url: string;
}

interface SocialMediaContainerProps {
  icons: SocialMediaIcon[];
}

const socialMediaContainerCss = {
  smContainer: () =>
    css({
      gap: "1.25rem"
      //   padding: "0"
    }),
  item: (theme: Theme) =>
    css({
      padding: "0",
      "&:hover": {
        color: theme.palette.primary.main
      }
    })
};

export const SocialMediaContainer = ({ icons }: SocialMediaContainerProps) => {
  const theme: Theme = useTheme();
  return (
    <Box display="flex" component="div" css={socialMediaContainerCss.smContainer}>
      {icons.map(({ icon: Icon, url }, i) => (
        <Box key={i}>
          <ListItemButton
            component="a"
            target="_blank"
            href={url}
            data-testid="link"
            css={socialMediaContainerCss.item(theme)}
          >
            <Icon />
          </ListItemButton>
        </Box>
      ))}
    </Box>
  );
};
