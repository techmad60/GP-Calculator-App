import React from "react";
import { Animated, Image, ImageSourcePropType, View } from "react-native";
import { HighlightText } from "./HighlightText";
import { SplashText } from "./SplashText";

type Props = {
  image: ImageSourcePropType;
  title: string;
  highlight?: string;
  textAnimatedStyle?: any;
};

export default function SplashSlide({ image, title, highlight, textAnimatedStyle }: Props) {
  return (
    <View className="flex-1 items-center justify-center w-full px-8">
      <Image source={image} className="mb-8 h-100 w-100" />
      <Animated.View style={textAnimatedStyle}>
        <SplashText className="text-secondary flex text-center">
          {title}
          {highlight && <HighlightText> {highlight}</HighlightText>}
        </SplashText>
      </Animated.View>
    </View>
  );
}
