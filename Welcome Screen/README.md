# CareerLaunch — Welcome Screen (React Native)

A self-contained onboarding screen matching the "CareerLaunch" welcome
mockup: logo, hero illustration with floating skill badges, tagline, and a
"Get started" / "Login" call-to-action.

## Folder contents

```
CareerLaunch/
├── index.js                 # public exports
├── WelcomeScreen.js          # the full screen
├── theme.js                  # colors, spacing, typography
├── App.example.js            # example root App usage
├── components/
│   ├── RocketIcon.js         # logo mark
│   ├── HeroIllustration.js   # bubble + character + floating badges
│   ├── IconBadge.js          # briefcase / cap / chart / clipboard badges
│   └── PrimaryButton.js      # "Get started" button
└── README.md
```

## Dependencies

This screen only needs one extra package beyond a standard React Native /
Expo project: `react-native-svg` (used to draw the rocket logo, the
character illustration, and the floating icons — no external image files
required).

```bash
npm install react-native-svg
# Expo projects:
npx expo install react-native-svg
```

## Usage

```jsx
import { WelcomeScreen } from './src/CareerLaunch';

export default function App() {
  return (
    <WelcomeScreen
      onGetStarted={() => navigation.navigate('SignUp')}
      onLogin={() => navigation.navigate('Login')}
    />
  );
}
```

Or drop `App.example.js` in as your `App.js` to preview it standalone.

## Notes

- All colors/spacing/typography live in `theme.js` — tweak there to
  re-theme the whole screen.
- The illustration scales responsively based on screen width
  (`Dimensions.get('window')`), so it adapts across phone sizes.
- No native linking is required for `react-native-svg` on Expo; on bare
  React Native, follow the library's install instructions for iOS
  (`pod install`) and Android (autolinking should handle it on RN ≥ 0.60).
