import { Box } from "@mui/system";
import Img1 from "../assets/images/png/startingViewpngs/planesAroundWorld.png";
import backgroundVideo from "../assets/images/video/skytrackerBackgroundVideo.mp4";
import { TitleSubTitleCont } from "../components/containers/TitleSubTitleCont";
import { AirLanesTicker } from "../components/presentational/AirLanesTicker";
import { BaseTabs } from "../components/presentational/BaseTabs";
import { HeroSection } from "../components/presentational/HeroSection";
import { StartingViewSection3 } from "../components/presentational/StartingViewSection3";

const tabData = [
  { tabTitle: "OpenSKy", tabContent: "OpenSKy is smth" },
  { tabTitle: "FireBase", tabContent: "FireBase is smth" }
];

const StartingView = () => (
  <>
    <Box>
      <HeroSection
        title="PLANE TRACKER"
        subtitle="TRACK PLANES FORM AROUND THE WORLD"
        banner={backgroundVideo}
      />
    </Box>
    <AirLanesTicker />
    <Box
      display="flex"
      sx={{
        p: 2,
        flexDirection: { xs: "column", sm: "column", md: "row" },
        justifyContent: "center"
      }}
    >
      <TitleSubTitleCont
        gap="1.5rem"
        title="Real-Time Flight Monitoring at Your Fingertips"
        subtitle="Imagine being able to follow flights anywhere in the world, in real-time. SkyTrack uses live
      data from trusted sources like the OpenSky Network to provide up-to-the-minute updates on
      aircraft positions, altitudes, speeds, and destinations. Watch as planes move across the globe
      with precision and accuracy, all from a sleek and intuitive interface."
      />
      <Box component="img" src={Img1} alt="PlanesAroundTheWorld" />
    </Box>

    <StartingViewSection3 />

    <BaseTabs tabData={tabData} />
  </>
);

export default StartingView;
