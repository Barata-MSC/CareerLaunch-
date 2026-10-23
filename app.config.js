module.exports = {
  expo: {
    name: "CareerLaunch!",
    slug: "careerlaunch",
    scheme: "careerlaunch",
    version: "1.0.0",
    plugins: [
      "@react-native-community/datetimepicker",
      [
        "expo-speech-recognition",
        {
          microphonePermission: "Allow CareerLaunch! to use the microphone when you choose voice input for interview answers.",
          speechRecognitionPermission: "Allow CareerLaunch! to transcribe your spoken interview answers.",
          androidSpeechServicePackages: [
            "com.google.android.googlequicksearchbox",
            "com.google.android.tts"
          ]
        }
      ]
    ],
    orientation: "portrait",
    icon: "./src/assets/rocket-icon.png",
    userInterfaceStyle: "light",
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.JavaRice.careerlaunch",
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./src/assets/rocket-icon.png"
      }
    },
    web: {
      output: "single"
    },
    extra: {
      eas: {
        projectId: "bc6dfca5-2003-48df-858c-a43b699876f4"
      }
    },
    experiments: {
      baseUrl: "/CareerLaunch-/"
    }
  }
};