import { HighlightText } from "@/components/HighlightText";
import { SplashText } from "@/components/SplashText";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen(){
  const router = useRouter();
  const logoScale = useRef(new Animated.Value(0.9)).current;
  const logoTranslateY = useRef(new Animated.Value(30)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(10)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, useNativeDriver: true, bounciness: 12 }),
        Animated.timing(logoTranslateY, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(textTranslateY, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      Animated.timing(buttonOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View className="flex-1 justify-center bg-primary">
      <Animated.Image
        source={require("../../assets/images/welcome.png")}
        style={{
          height: 200,
          width: 200,
          alignSelf: 'center',
          transform: [{ scale: logoScale }, { translateY: logoTranslateY }],
        }}
      />

      <Animated.View style={{ opacity: textOpacity, transform: [{ translateY: textTranslateY }] }}>
        <SplashText className="text-center mt-4 px-8 text-secondary">
          Techmad says
          <HighlightText> Welcome!</HighlightText>
        </SplashText>
      </Animated.View>

      <View className="items-center mt-8">
        <Animated.View style={{ opacity: buttonOpacity }}>
          <TouchableOpacity
            onPress={() => router.push('/calculator')}
            className="bg-accent px-6 py-3 rounded-full"
          >
            <Text style={{ fontFamily: 'Irish' }} className="text-primary text-lg">Start</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}