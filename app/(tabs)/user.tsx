import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";
import { FinancialOverview } from "@/components/ui/FinancialOverview";
import { QuickAddTripModal } from "@/components/ui/QuickAddTripModal";
import { useState } from "react";

type Trip = {
  id: string;
  date: Date;
  origin: string;
  destination: string;
  transportType: string;
  cost: number;
  description: string;
};

// Initial dummy data for trips
const initialTrips = [
  {
    id: 1,
    origin: "Home",
    destination: "Work",
    date: "Today",
    time: "08:30",
    transportType: "Bus",
    cost: 2.50,
    description: "Morning commute"
  },
  {
    id: 2,
    origin: "Work",
    destination: "Gym",
    date: "Yesterday",
    time: "17:45",
    transportType: "Train",
    cost: 2.50,
    description: "Evening workout"
  },
  {
    id: 3,
    origin: "Home",
    destination: "Shopping",
    date: "Mar 18",
    time: "14:20",
    transportType: "Bus",
    cost: 2.50,
    description: "Weekend shopping"
  }
];

export default function UserScreen() {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);

  const handleNewTrip = () => {
    setShowQuickAdd(true);
  };

  const handleTripPress = (tripId: number) => {
    router.push(`/(tabs)/trip/${tripId}` as any);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const handleQuickAddSubmit = (trip: {
    date: Date;
    origin: string;
    destination: string;
    transportType: string;
    cost: number;
    description?: string;
  }) => {
    const newTrip: Trip = {
      id: Date.now().toString(),
      date: trip.date,
      origin: trip.origin,
      destination: trip.destination,
      transportType: trip.transportType,
      cost: trip.cost,
      description: trip.description || '',
    };
    setTrips([newTrip, ...trips]);
  };

  // Calculate total cost from all trips
  const totalCost = trips.reduce((sum, trip) => sum + trip.cost, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">My Climate Journey</ThemedText>
        <ThemedText style={styles.subtitle}>Track your impact and savings</ThemedText>
      </View>

      <FinancialOverview 
        totalTrips={trips.length}
        timeFrame="year"
        totalCost={totalCost}
      />

      {/* Recent Trips */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Recent Trips</ThemedText>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleNewTrip}
          >
            <IconSymbol name="plus.circle.fill" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {trips.map((trip) => (
          <ThemedView key={trip.id} style={styles.tripCard}>
            <View style={styles.tripHeader}>
              <View>
                <ThemedText style={styles.tripTitle}>
                  {trip.origin} → {trip.destination}
                </ThemedText>
                <ThemedText style={styles.tripDate}>
                  {trip.date.toLocaleDateString()} {trip.date.toLocaleTimeString()}
                </ThemedText>
              </View>
              <ThemedText style={styles.tripCost}>€{trip.cost.toFixed(2)}</ThemedText>
            </View>
            <View style={styles.tripDetails}>
              <View style={styles.tripDetail}>
                <IconSymbol name="bus" size={16} color="#666" />
                <ThemedText style={styles.tripDetailText}>{trip.transportType}</ThemedText>
              </View>
              {trip.description && (
                <View style={styles.tripDetail}>
                  <IconSymbol name="text.bubble" size={16} color="#666" />
                  <ThemedText style={styles.tripDetailText}>{trip.description}</ThemedText>
                </View>
              )}
            </View>
          </ThemedView>
        ))}
      </View>

      {/* Quick Add Trip Modal */}
      <QuickAddTripModal
        visible={showQuickAdd}
        onClose={() => setShowQuickAdd(false)}
        onSubmit={handleQuickAddSubmit}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    padding: 8,
  },
  tripCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
  },
  tripCost: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  tripDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tripDetailText: {
    fontSize: 14,
    color: '#666',
  },
}); 