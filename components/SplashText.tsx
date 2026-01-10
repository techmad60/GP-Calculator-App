// components/SplashText.tsx
import { Text, TextProps } from 'react-native';

export function SplashText({ style, ...props }: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: 'Irish', fontSize: 32, },
        style,
      ]}
    />
  );
}
