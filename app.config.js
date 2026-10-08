module.exports = {
  expo: {
    name: "finalProject",
    slug: "finalProject",
    scheme: "careerlaunch",
    version: "1.0.0",
    plugins: ["@react-native-community/datetimepicker"],
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