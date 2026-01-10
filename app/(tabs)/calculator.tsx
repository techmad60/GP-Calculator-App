import Button from "@/components/Button";
import GoodLuck from "@/components/GoodLuck";
import { HighlightText } from "@/components/HighlightText";
import { SplashText } from "@/components/SplashText";
import StudyTip, { getRandomTip } from "@/components/StudyTip";
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
    Image,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Course = { unit?: number; grade: string };

export default function CalculatorScreen() {
  const [courses, setCourses] = useState<Course[]>([
    { unit: undefined, grade: "" },
  ]);
  const [gpa, setGpa] = useState<string>("0.00");
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [totalUnits, setTotalUnits] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTip, setSelectedTip] = useState<string>("");

  const addCourse = () => {
    setCourses([...courses, { unit: undefined, grade: "" }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length === 1) return;
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  const updateCourse = <K extends keyof Course>(
    index: number,
    field: K,
    value: Course[K]
  ) => {
    const updated = [...courses];
    updated[index][field] = value;
    setCourses(updated);
  };

  const calculateGPA = () => {
    let points = 0;
    let units = 0;

    const gradeToPoint = (grade: string) => {
      switch (grade.toUpperCase()) {
        case "A":
          return 5;
        case "B":
          return 4;
        case "C":
          return 3;
        case "D":
          return 2;
        case "E":
          return 1;
        case "F":
          return 0;
        default:
          return 0;
      }
    };

    for (const course of courses) {
      if (!course.unit || !course.grade) {
        setGpa("0.00");
        setTotalPoints(0);
        setTotalUnits(0);
        return;
      }
      points += gradeToPoint(course.grade) * course.unit;
      units += course.unit;
    }

    setTotalPoints(points);
    setTotalUnits(units);
    setGpa(units ? (points / units).toFixed(2) : "0.00");
    // pick a random study tip
    setSelectedTip(getRandomTip());
    setIsModalOpen(true);
  };

  return (
    <ScrollView className="flex-1 bg-primary px-4 pt-4">
      <GoodLuck />

      <View className="mt-16">
        <SplashText className="text-secondary text-2xl text-center mb-6">
          GPA Calculator
        </SplashText>

        {courses.map((course, idx) => (
          <View key={idx} className="flex-row gap-2 mb-4 items-center">
            {/* Unit Load Picker */}
            <View className="flex-1 border border-accent rounded bg-secondary">
              <Picker
                selectedValue={course.unit?.toString() ?? ""}
                onValueChange={(value) =>
                  updateCourse(idx, "unit", value ? parseInt(value) : undefined)
                }
                style={{ color: "#000" }}
              >
                <Picker.Item label="Select unit" value="" />
                {[...Array(10)].map((_, i) => (
                  <Picker.Item
                    key={i + 1}
                    label={`${i + 1} unit${i + 1 > 1 ? "s" : ""}`}
                    value={i + 1}
                  />
                ))}
              </Picker>
            </View>

            {/* Grade Picker */}
            <View className="flex-1 border border-accent rounded bg-secondary">
              <Picker
                selectedValue={course.grade || ""}
                onValueChange={(value) => updateCourse(idx, "grade", value)}
                style={{ color: "#000" }}
              >
                <Picker.Item label="Select grade" value="" />
                {["A", "B", "C", "D", "E", "F"].map((g) => (
                  <Picker.Item key={g} label={g} value={g} />
                ))}
              </Picker>
            </View>

            {/* Delete Button */}
            <TouchableOpacity
              onPress={() => removeCourse(idx)}
              className="bg-accent p-4 rounded"
            >
                <FontAwesome name="trash" size={24} className="text-primary"/>
            </TouchableOpacity>
          </View>
        ))}

        {/* Add Course Button */}
        <View className="mt-4">
          <Button label="Add Course" onPress={addCourse} variant="secondary" />
        </View>

        {/* Calculate Button */}
        <View className="mt-12 items-center">
          <Button label="Generate" onPress={calculateGPA} />
        </View>
      </View>

      {/* Result Modal */}
      <Modal
        visible={isModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsModalOpen(false)}
          className="flex-1 bg-black/50  justify-center items-center"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            className="bg-primary rounded-2xl p-8 w-80 items-center"
          >
            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setIsModalOpen(false)}
              className="absolute -top-4 -right-4 bg-accent p-4 rounded-full z-10"
            >
              <FontAwesome name="close" size={16} className="text-primary"/>
            </TouchableOpacity>

            {/* Wizard Owl Image */}
            <Image
              source={require("../../assets/images/wizard.png")}
              style={{ width: 80, height: 80, marginBottom: 16 }}
              resizeMode="contain"
            />

            {/* Title */}
            <Text
              style={{ fontFamily: "Irish" }}
              className="text-2xl text-center mb-6"
            >
              <Text className="text-secondary">Techmad&apos;s GP</Text>
              <HighlightText className="text-accent"> Calculator</HighlightText>
            </Text>

            {/* Results */}
            <View className="gap-4 w-full mb-6">
              <View className="items-center">
                <Text style={{ fontFamily: "Irish" }} className="text-secondary text-lg ">Total Points :
                    <HighlightText> {totalPoints}</HighlightText>
                </Text>
              </View>

              <View className="items-center">
                <Text style={{ fontFamily: "Irish" }} className="text-secondary text-lg">Total Unit Load :
                    <HighlightText> {totalUnits}</HighlightText>
                </Text>
              </View>

              <View className="items-center">
                <Text style={{ fontFamily: "Irish" }} className="text-secondary text-lg">GPA : 
                    <HighlightText> {gpa}</HighlightText>
                </Text>
              </View>
            </View>
            {/* Study Tip */}
            <StudyTip tip={selectedTip} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}
