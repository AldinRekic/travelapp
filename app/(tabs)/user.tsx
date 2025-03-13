import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { router } from "expo-router";

// Dummy data for trips
const recentTrips = [
  {
    id: 1,
    destination: "Paris, France",
    date: "March 15-22, 2024",
    duration: "7 days",
    cost: 2500,
    description: "Spring break in the City of Light"
  },
  {
    id: 2,
    destination: "Tokyo, Japan",
    date: "January 10-20, 2024",
    duration: "10 days",
    cost: 3500,
    description: "Winter exploration of Japanese culture"
  },
  {
    id: 3,
    destination: "Bali, Indonesia",
    date: "December 1-7, 2023",
    duration: "6 days",
    cost: 1800,
    description: "Tropical getaway"
  }
];

// Calculate statistics
const totalTrips = recentTrips.length;
const totalCost = recentTrips.reduce((sum, trip) => sum + trip.cost, 0);
const averageCost = Math.round(totalCost / totalTrips);

export default function UserScreen() {
  const handleNewTrip = () => {
    router.push("/(tabs)/new-trip" as any);
  };

  const handleTripPress = (tripId: number) => {
    router.push(`/(tabs)/trip/${tripId}` as any);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Travel Journal
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Your travel memories and statistics
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        <ThemedView style={styles.statCard}>
          <IconSymbol name="house.fill" size={24} color="#007AFF" />
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            {totalTrips}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Total Trips</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statCard}>
          <IconSymbol name="paperplane.fill" size={24} color="#007AFF" />
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            ${totalCost.toLocaleString()}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Total Spent</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statCard}>
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={24} color="#007AFF" />
          <ThemedText type="defaultSemiBold" style={styles.statValue}>
            ${averageCost}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Avg. Cost</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedView style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Recent Trips
          </ThemedText>
          <TouchableOpacity style={styles.newTripButton} onPress={handleNewTrip}>
            <IconSymbol name="paperplane.fill" size={20} color="#fff" />
            <ThemedText style={styles.newTripButtonText}>New Trip</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        {recentTrips.map((trip) => (
          <TouchableOpacity 
            key={trip.id} 
            style={styles.tripCard}
            onPress={() => handleTripPress(trip.id)}
          >
            <ThemedView style={styles.tripHeader}>
              <ThemedText type="defaultSemiBold" style={styles.tripDestination}>
                {trip.destination}
              </ThemedText>
              <ThemedText style={styles.tripDate}>{trip.date}</ThemedText>
            </ThemedView>
            <ThemedText style={styles.tripDescription}>{trip.description}</ThemedText>
            <ThemedView style={styles.tripDetails}>
              <ThemedView style={styles.tripDetail}>
                <ThemedText style={styles.tripDetailLabel}>Duration</ThemedText>
                <ThemedText style={styles.tripDetailValue}>{trip.duration}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.tripDetail}>
                <ThemedText style={styles.tripDetailLabel}>Cost</ThemedText>
                <ThemedText style={styles.tripDetailValue}>${trip.cost.toLocaleString()}</ThemedText>
              </ThemedView>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 0,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
  },
  newTripButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  newTripButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tripDestination: {
    fontSize: 18,
  },
  tripDate: {
    fontSize: 14,
    opacity: 0.7,
  },
  tripDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  tripDetail: {
    flex: 1,
  },
  tripDetailLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  tripDetailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 