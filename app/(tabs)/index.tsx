import { Image, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import LoginForm from "@/components/ui/LoginForm";

export default function HomeScreen() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
			headerImage={
				<Image
					source={require("@/assets/images/partial-react-logo.png")}
					style={styles.reactLogo}
				/>
			}
		>
			<ThemedView className="px-4 py-6">
				<ThemedText type="title" className="text-center mb-6">
					Welcome to TravelApp
				</ThemedText>
				<ThemedText type="subtitle" className="text-center mb-8">
					Your journey begins here
				</ThemedText>

				<LoginForm />

				<ThemedView className="mt-8 space-y-4">
					<ThemedText type="subtitle" className="text-center">
						Why Choose TravelApp?
					</ThemedText>
					
					<ThemedView className="space-y-3">
						<FeatureItem 
							title="Plan Your Trips"
							description="Create detailed itineraries and organize your travel plans"
						/>
						<FeatureItem 
							title="Discover Destinations"
							description="Explore new places and get inspired for your next adventure"
						/>
						<FeatureItem 
							title="Share Experiences"
							description="Connect with fellow travelers and share your journey"
						/>
					</ThemedView>
				</ThemedView>
			</ThemedView>
		</ParallaxScrollView>
	);
}

function FeatureItem({ title, description }: { title: string; description: string }) {
	return (
		<ThemedView className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
			<ThemedText type="defaultSemiBold" className="mb-1">{title}</ThemedText>
			<ThemedText type="default" className="text-gray-600 dark:text-gray-300">{description}</ThemedText>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
