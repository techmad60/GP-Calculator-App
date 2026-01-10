import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

export default function Button({ label, onPress, variant = "primary" }: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${isPrimary ? "bg-accent" : "bg-primary"} px-6 py-3 rounded-full`}
    >
      <Text
        style={{ fontFamily: "Irish" }}
        className={`${isPrimary ? "text-primary" : "text-accent"} text-lg`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
