import FireBaseLogo from "../../assets/images/png/startingViewpngs/Firebase_Logo.png";
import FirebaseContent from "../../assets/images/png/startingViewpngs/firebaseContent.png";
import GoogleMapsLogo from "../../assets/images/png/startingViewpngs/googlemaps_logo.png";
import GoogleMapsConent from "../../assets/images/png/startingViewpngs/googlemapsContent.png";
import OpenSkyNetworkLogo from "../../assets/images/png/startingViewpngs/OpenSky_Network_logo.png";
import OpenSkyNetworkContent from "../../assets/images/png/startingViewpngs/openskyContent.png";

export const tabData = [
  {
    tabTitle: "OpenSky Network API",
    tabContent:
      "OpenSky Network is an open-source platform that provides real-time and historical air traffic data. It leverages a global network of ADS-B receivers to track aircraft movements, collecting data such as position, altitude, speed, and flight path. This data can be accessed through the OpenSky Network API, which is designed for developers to integrate flight tracking features into their applications.",
    tabImg: OpenSkyNetworkLogo,
    contentImg: OpenSkyNetworkContent
  },
  {
    tabTitle: "Google Maps API",
    tabContent:
      "Google Maps API is a suite of services that allows developers to integrate Google Maps into their websites and applications. It provides powerful tools to embed maps, display geospatial data, and enable interactive map features like zooming, panning, and route calculations. The API is highly customizable, allowing developers to tailor the look and behavior of the map to suit the needs of their application.",
    tabImg: GoogleMapsLogo,
    contentImg: GoogleMapsConent
  },
  {
    tabTitle: "Firebase Authentication",
    tabContent:
      "Firebase Authentication is a part of Google’s Firebase platform that allows developers to easily implement secure user authentication and identity management in their applications. It supports various authentication methods, such as email/password, phone number, and federated identity providers like Google, Facebook, and Twitter. Firebase Authentication ensures a seamless and secure user experience, allowing users to log in or sign up with minimal effort.",
    tabImg: FireBaseLogo,
    contentImg: FirebaseContent
  }
];
