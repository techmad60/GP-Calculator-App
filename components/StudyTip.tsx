import React from "react";
import { Text, View } from "react-native";
import { HighlightText } from "./HighlightText";

export const tips = [
  "Take short, frequent breaks (5–10 min every hour).",
  "Teach someone else — it solidifies your understanding.",
  "Use active recall instead of rereading notes.",
  "Turn headings into questions and answer them.",
  "Study the hardest topic first when fresh.",
  "Use spaced repetition for long-term memory.",
  "Summarize concepts in your own words.",
  "Use past papers to practice exam-style questions.",
  "Limit distractions: phone on Do Not Disturb.",
  "Set concrete goals for each study session.",
  "Break large tasks into 25–50 minute focused blocks.",
  "Use visual aids: diagrams, mind maps, charts.",
  "Explain concepts aloud — it reveals gaps.",
  "Mix related topics (interleaving) for better retention.",
  "Practice problems before reviewing solutions.",
  "Sleep well — memory consolidation happens during sleep.",
  "Stay hydrated and keep snacks handy for energy.",
  "Change study location to improve recall cues.",
  "Limit multitasking; focus on one concept at a time.",
  "Use mnemonic devices for lists and sequences.",
  "Create a quick cheat-sheet of core formulas.",
  "Review notes within 24 hours for better retention.",
  "Use timers to create urgency (Pomodoro technique).",
  "Highlight only key phrases — avoid over-highlighting.",
  "Prioritize understanding over memorization.",
  "Set up a tidy, well-lit study space.",
  "Group study: quiz each other for active recall.",
  "Record voice notes and listen during commutes.",
  "Practice explaining answers concisely.",
  "Reward progress to stay motivated (small treats).",
];

export function getRandomTip() {
  return tips[Math.floor(Math.random() * tips.length)];
}

export default function StudyTip({ tip }: { tip: string }) {
  if (!tip) return null;
  return (
    <View className="w-full mt-2 px-2">
      <HighlightText style={{ fontFamily: "Irish" }} className="text-sm text-secondary text-center">
        💡 Study Tip
      </HighlightText>
      <Text style={{ fontFamily: "Irish" }} className="text-base text-secondary text-center mt-1">
        {tip}
      </Text>
    </View>
  );
}
