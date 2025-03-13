import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

type FormData = {
  email: string;
  password: string;
};

// Dummy user data - replace with real API calls later
const DUMMY_USERS = [
  {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
    id: "1",
  },
];

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;

  const handleForgotPassword = () => {
    Alert.alert(
      "Reset Password",
      "A password reset link will be sent to your email address.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Send Reset Link",
          onPress: () => {
            // Implement password reset logic here
            Alert.alert("Success", "Password reset link sent to your email!");
          },
        },
      ]
    );
  };

  const handleSignUp = () => {
    router.push("/register");
  };

  const storeAuthToken = async (token: string) => {
    try {
      await SecureStore.setItemAsync("auth_token", token);
      await AsyncStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      console.error("Error storing auth token:", error);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      
      // Check for too many attempts
      if (attempts >= MAX_ATTEMPTS) {
        setError("Too many failed attempts. Please try again later.");
        return;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Dummy authentication - replace with real auth later
      const user = DUMMY_USERS.find(
        u => u.email === data.email && u.password === data.password
      );

      if (user) {
        // Reset attempts on successful login
        setAttempts(0);
        
        // Store auth token and user data
        const dummyToken = "dummy_jwt_token_" + Date.now();
        await storeAuthToken(dummyToken);
        
        // Store user data
        await AsyncStorage.setItem("userData", JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
        }));

        // Navigate to explore page after successful login
        router.push("/explore");
      } else {
        // Increment failed attempts
        setAttempts(prev => prev + 1);
        setError(`Invalid email or password. ${MAX_ATTEMPTS - attempts - 1} attempts remaining.`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login");
    }
  };

  return (
    <View className="space-y-4">
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              editable={attempts < MAX_ATTEMPTS}
            />
            {errors.email && (
              <ThemedText className="text-red-500 text-sm mt-1">{errors.email.message}</ThemedText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              editable={attempts < MAX_ATTEMPTS}
            />
            {errors.password && (
              <ThemedText className="text-red-500 text-sm mt-1">{errors.password.message}</ThemedText>
            )}
          </View>
        )}
      />

      {error && <ThemedText className="text-red-500 text-sm text-center">{error}</ThemedText>}

      <TouchableOpacity
        className="bg-blue-500 rounded-lg py-3 px-4 mt-4"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting || attempts >= MAX_ATTEMPTS}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <ThemedText className="text-white text-center font-semibold">Login</ThemedText>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-between mt-4">
        <TouchableOpacity onPress={handleForgotPassword}>
          <ThemedText className="text-blue-500 text-sm">Forgot Password?</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp}>
          <ThemedText className="text-blue-500 text-sm">Sign Up</ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedText className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
        Test credentials: test@example.com / password123
      </ThemedText>
    </View>
  );
} 