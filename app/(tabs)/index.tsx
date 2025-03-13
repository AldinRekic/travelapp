import React from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import LoginForm from "@/components/ui/LoginForm";
import RecentTrips from "@/components/ui/RecentTrips";

export default function HomeScreen() {
	return (
		<ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
			<View className="flex-1">
				{/* Hero Section */}
				<View className="relative h-48 bg-blue-500">
					<Image
						source={require("@/assets/images/icon.png")}
						className="absolute inset-0 w-full h-full"
						resizeMode="cover"
					/>
					<View className="absolute inset-0 bg-black/40" />
					<View className="absolute inset-0 flex items-center justify-center">
						<ThemedText type="title" className="text-white text-3xl font-bold text-center">
							Welcome to TravelApp
						</ThemedText>
					</View>
				</View>

				{/* Quick Actions */}
				<View className="flex-row justify-around py-4 bg-white dark:bg-gray-800">
					<TouchableOpacity className="items-center">
						<View className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mb-2">
							<ThemedText className="text-blue-500 dark:text-blue-300 text-xl">✈️</ThemedText>
						</View>
						<ThemedText className="text-sm">Book Flight</ThemedText>
					</TouchableOpacity>
					<TouchableOpacity className="items-center">
						<View className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mb-2">
							<ThemedText className="text-blue-500 dark:text-blue-300 text-xl">🏨</ThemedText>
						</View>
						<ThemedText className="text-sm">Hotels</ThemedText>
					</TouchableOpacity>
					<TouchableOpacity className="items-center">
						<View className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mb-2">
							<ThemedText className="text-blue-500 dark:text-blue-300 text-xl">🎫</ThemedText>
						</View>
						<ThemedText className="text-sm">Activities</ThemedText>
					</TouchableOpacity>
				</View>

				{/* Recent Trips Section */}
				<View className="px-4 py-6">
					<RecentTrips />
				</View>

				{/* Login Form Section */}
				<View className="px-4 py-6">
					<LoginForm />
				</View>

				{/* Feature Highlights */}
				<View className="px-4 py-6 bg-white dark:bg-gray-800">
					<ThemedText type="title" className="text-center mb-6">
						Why Choose TravelApp?
					</ThemedText>
					<View className="space-y-4">
						<View className="flex-row items-center space-x-3">
							<View className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center">
								<ThemedText className="text-blue-500 dark:text-blue-300">✓</ThemedText>
							</View>
							<ThemedText>Personalized travel recommendations</ThemedText>
						</View>
						<View className="flex-row items-center space-x-3">
							<View className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center">
								<ThemedText className="text-blue-500 dark:text-blue-300">✓</ThemedText>
							</View>
							<ThemedText>Local insights and tips</ThemedText>
						</View>
						<View className="flex-row items-center space-x-3">
							<View className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center">
								<ThemedText className="text-blue-500 dark:text-blue-300">✓</ThemedText>
							</View>
							<ThemedText>Offline access to travel guides</ThemedText>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
