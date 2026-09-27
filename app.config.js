module.exports = {
  expo: {
    name: "finalProject",
    slug: "finalProject",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/rocket-icon.png",
    userInterfaceStyle: "light",
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./src/assets/rocket-icon.png"
      }
    },
    web: {
      output: "single"
    },
    experiments: {
      baseUrl: "/CareerLaunch-/"
    }
  }
};