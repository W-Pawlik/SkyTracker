import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Img1 from "../assets/images/png/startingViewpngs/planesAroundWorld.png";
import backgroundVideo from "../assets/images/video/skytrackerBackgroundVideo.mp4";
import { TitleSubTitleCont } from "../components/containers/TitleSubTitleCont";
import { AirLanesTicker } from "../components/presentational/AirLanesTicker";
import { BaseTabs } from "../components/presentational/BaseTabs";
import { CommonButton } from "../components/presentational/Button";
import { FAQ } from "../components/presentational/FAQ";
import { HeroSection } from "../components/presentational/HeroSection";
import { Newsletter } from "../components/presentational/Newsletter";
import { StartingViewSection3 } from "../components/presentational/StartingViewSection3";
import { FAQData } from "../consts/data/faqData";
import { tabData } from "../consts/data/tabData";

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

    <Box
      sx={{
        alignSelf: "center",
        width: "70%",
        padding: "2rem",
        paddingTop: "3rem",
        height: "35rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        backgroundColor: "#082D64",
        borderRadius: "400px"
      }}
    >
      <Typography variant="h1">Frequently Asked Questions</Typography>
      <FAQ faqData={FAQData} />
    </Box>

    <Box
      sx={{
        display: "flex",
        alignSelf: "center",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Typography maxWidth="50%" variant="body1" fontSize="1.9rem">
        So now you know everytihnk... you know what to do
      </Typography>
      <CommonButton text="Try it!" size="large" />
    </Box>

    <Newsletter />
  </>
);

export default StartingView;
