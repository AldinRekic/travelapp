import React from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import RegisterForm from "@/components/ui/RegisterForm";

export default function RegisterScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <View className="px-4 py-6">
        <ThemedText type="title" className="text-center mb-6">
          Create Account
        </ThemedText>
        <RegisterForm />
      </View>
    </View>
  );
} 