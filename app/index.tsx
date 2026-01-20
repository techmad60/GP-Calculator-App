import SplashSlide from "@/components/SplashSlide";
import { useAudioPlayer } from "expo-audio";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Home() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);
  const autoRef = useRef<any>(null);
  const isPaused = useRef(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const player = useAudioPlayer(require("../assets/audio/welcome-hoot.mp3"));

  const slides = [
    {
      image: require("../assets/images/logo.png"),
      title: "Techmad's GP",
      highlight: "Calculator!",
    },
    {
      image: require("../assets/images/splash1.png"),
      title: "Your GPA, Delivered with a",
      highlight: "Hoot!",
    },
    {
      image: require("../assets/images/splash2.png"),
      title: "Calculate Smarter. Study Wiser. Hoot",
      highlight: "Louder!",
    },
  ];

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActive(index);
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  );

  // Auto-advance every 3.5s; pause while user interacts
  useEffect(() => {
    const INTERVAL = 3500;
    autoRef.current = setInterval(() => {
      if (isPaused.current) return;
      setActive((prev) => {
        const next = (prev + 1) % slides.length;
        // Stop auto-play on last slide
        if (next === 0) {
          if (autoRef.current) clearInterval(autoRef.current);
          return prev; // Stay on last slide
        }
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ x: next * width, animated: true });
        }
        return next;
      });
    }, INTERVAL);

    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, []);

  const isLastSlide = active === slides.length - 1;

  const handleFinish = async () => {
    try {
      await player.play();

      // Navigate after a short delay to let audio start
      setTimeout(() => {
        router.push("/welcome");
      }, 500);
    } catch (error) {
      console.error("Error playing audio:", error);
      // Navigate anyway if audio fails
      router.push("/welcome");
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <TouchableOpacity
        onPress={handleFinish}
        className="absolute top-20 right-8 z-10 p-2"
      >
        <Text style={{ fontFamily: "Inter" }} className="text-accent text-base">
          {isLastSlide ? "Finish" : "Skip"}
        </Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: "center" }}
        onTouchStart={() => (isPaused.current = true)}
        onTouchEnd={() => (isPaused.current = false)}
        onScrollBeginDrag={() => (isPaused.current = true)}
        onScrollEndDrag={() => (isPaused.current = false)}
      >
        {slides.map((slide, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const outputRange = [0.8, 1, 0.8];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange,
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: "clamp",
          });

          // Text fade-in from below animation
          const textOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: "clamp",
          });
          const textTranslateY = scrollX.interpolate({
            inputRange,
            outputRange: [30, 0, -30],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={{ width, transform: [{ scale }], opacity }}
            >
              <SplashSlide
                image={slide.image}
                title={slide.title}
                highlight={slide.highlight}
                textAnimatedStyle={{
                  opacity: textOpacity,
                  transform: [{ translateY: textTranslateY }],
                }}
              />
            </Animated.View>
          );
        })}
      </ScrollView>

      <View className="absolute bottom-20 left-0 right-0 items-center">
        <View className="flex-row gap-3">
          {slides.map((_, i) => (
            <View
              key={i}
              className={
                i === active
                  ? "bg-accent w-4 h-4 rounded-full"
                  : "bg-secondary w-3 h-3 rounded-full"
              }
            />
          ))}
        </View>
      </View>
    </View>
  );
}
