// components/HighlightText.tsx
import { Text, TextProps } from "react-native";

interface HighlightTextProps extends TextProps {
  color?: string;
}

export function HighlightText({ color = "#F9940A", style, children, ...props }: HighlightTextProps) {
  return (
    <Text
      {...props}
      style={[
        { color }, // default color for highlight
        style,
      ]}
    >
      {children}
    </Text>
  );
}
