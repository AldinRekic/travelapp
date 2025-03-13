import React from "react";
import { View, ScrollView, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import LoginForm from "@/components/ui/LoginForm";

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
							Track Your Trips, Save the Climate
						</ThemedText>
						<ThemedText className="text-white text-lg mt-2 text-center">
							And your wallet too
						</ThemedText>
					</View>
				</View>

				{/* Login Form Section */}
				<View className="px-4 py-6">
					<LoginForm />
				</View>

				{/* Feature Highlights */}
				<View className="px-4 py-6">
					<ThemedText type="subtitle" className="text-center mb-6">
						Why Track Your Journeys?
					</ThemedText>
					<View className="space-y-4">
						<View className="flex-row items-center">
							<View className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mr-3">
								<ThemedText className="text-blue-500 dark:text-blue-300">✓</ThemedText>
							</View>
							<ThemedText>Reduce your carbon footprint</ThemedText>
						</View>
						<View className="flex-row items-center">
							<View className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mr-3">
								<ThemedText className="text-blue-500 dark:text-blue-300">✓</ThemedText>
							</View>
							<ThemedText>Save money with KlimaTicket Ö</ThemedText>
						</View>
						<View className="flex-row items-center">
							<View className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mr-3">
								<ThemedText className="text-blue-500 dark:text-blue-300">✓</ThemedText>
							</View>
							<ThemedText>Make informed decisions about your transport</ThemedText>
						</View>
					</View>
				</View>

				{/* Reference Price Info */}
				<View className="px-4 py-6 bg-white dark:bg-gray-800">
					<ThemedText type="subtitle" className="text-center mb-4">
						Reference Prices
					</ThemedText>
					<View className="space-y-2">
						<ThemedText className="text-center">
							Single Bus Trip: €2.50
						</ThemedText>
						<ThemedText className="text-center">
							KlimaTicket Ö Classic: €1,297.80/year
						</ThemedText>
						<ThemedText className="text-sm text-center opacity-70 mt-2">
							Track your daily trips to see if the yearly ticket pays off
						</ThemedText>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
