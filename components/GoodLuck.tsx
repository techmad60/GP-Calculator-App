import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

interface WordItem {
  text: string;
  color: string;
}

export default function GoodLuck() {
  const words: WordItem[] = [
    { text: "All", color: "text-secondary" },
    { text: "the", color: "text-secondary" },
    { text: "best", color: "text-secondary" },
    { text: "mate!", color: "text-accent" },
  ];

  const owlOpacity = useRef(new Animated.Value(0)).current;
  const owlTranslateY = useRef(new Animated.Value(20)).current;
  const wordAnimations = useRef(
    words.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(20),
    }))
  ).current;

  useEffect(() => {
    const sequence = async () => {
      // Words enter one by one (ascending)
      const wordEnterAnimations = wordAnimations.map((anim, idx) => {
        return Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          delay: idx * 100,
        });
      });

      await Promise.all([
        Animated.stagger(100, wordEnterAnimations).start(),
      ]);

      // Owl appears
      await new Promise((resolve) => {
        Animated.parallel([
          Animated.timing(owlOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(owlTranslateY, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start(resolve);
      });

      // Wait 0.5s
      await new Promise((res) => setTimeout(res, 500));

      // Words exit one by one (descending)
      const wordExitAnimations = wordAnimations
        .map((anim) => ({
          opacity: anim.opacity,
          translateY: anim.translateY,
        }))
        .reverse()
        .map((anim) => {
          return Animated.parallel([
            Animated.timing(anim.opacity, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateY, {
              toValue: 20,
              duration: 400,
              useNativeDriver: true,
            }),
          ]);
        });

      await new Promise((resolve) => {
        Animated.stagger(100, wordExitAnimations).start(resolve);
      });

      // Owl disappears last
      Animated.parallel([
        Animated.timing(owlOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(owlTranslateY, {
          toValue: 20,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    };

    sequence();
  }, []);

  return (
    <View className="flex-row items-center justify-center mt-4 inset-0 top-6">
      <Animated.Image
        source={require("../assets/images/goodluck.png")}
        style={{
          width: 60,
          height: 90,
          opacity: owlOpacity,
          transform: [{ translateY: owlTranslateY }],
        }}
      />

      <View className="flex-row gap-2 flex-wrap justify-center ">
        {words.map((word, idx) => (
          <Animated.View
            key={idx}
            style={{
              opacity: wordAnimations[idx].opacity,
              transform: [{ translateY: wordAnimations[idx].translateY }],
            }}
          >
            <Text
              className={`${word.color} text-2xl`}
              style={{ fontFamily: "Irish" }}
            >
              {word.text}
            </Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}
