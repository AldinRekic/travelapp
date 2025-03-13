import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";
import { FinancialOverview } from "@/components/ui/FinancialOverview";

// Dummy data for trips
const recentTrips = [
  {
    id: 1,
    destination: "Work",
    date: "Today",
    time: "08:30",
    transportType: "Bus",
    cost: 2.50,
    description: "Morning commute"
  },
  {
    id: 2,
    destination: "Gym",
    date: "Yesterday",
    time: "17:45",
    transportType: "Train",
    cost: 2.50,
    description: "Evening workout"
  },
  {
    id: 3,
    destination: "Shopping",
    date: "Mar 18",
    time: "14:20",
    transportType: "Bus",
    cost: 2.50,
    description: "Weekend shopping"
  }
];

// Calculate statistics
const totalTrips = recentTrips.length;
const totalCost = recentTrips.reduce((sum, trip) => sum + trip.cost, 0);

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
          My Climate Journey
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Track your impact and savings
        </ThemedText>
      </ThemedView>

      {/* Financial Overview */}
      <FinancialOverview totalTrips={totalTrips} timeFrame="year" />

      {/* Recent Trips */}
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
                <ThemedText style={styles.tripDetailLabel}>Time</ThemedText>
                <ThemedText style={styles.tripDetailValue}>{trip.time}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.tripDetail}>
                <ThemedText style={styles.tripDetailLabel}>Transport</ThemedText>
                <ThemedText style={styles.tripDetailValue}>{trip.transportType}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.tripDetail}>
                <ThemedText style={styles.tripDetailLabel}>Cost</ThemedText>
                <ThemedText style={styles.tripDetailValue}>€{trip.cost.toFixed(2)}</ThemedText>
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