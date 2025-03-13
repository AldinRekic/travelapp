import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";
import { FinancialOverview } from "@/components/ui/FinancialOverview";
import { QuickAddTripModal } from "@/components/ui/QuickAddTripModal";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Trip = {
  id: string;
  date: Date;
  origin: string;
  destination: string;
  transportType: string;
  cost: number;
  description: string;
};

// Helper function to generate dates
const generateDate = (daysAgo: number, hour: number, minute: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, minute, 0, 0);
  return date;
};

// Initial dummy data for trips
const initialTrips: Trip[] = [
  // Today's trips
  {
    id: "1",
    origin: "Home",
    destination: "Work",
    date: generateDate(0, 7, 30),
    transportType: "Bus",
    cost: 2.50,
    description: "Morning commute"
  },
  {
    id: "2",
    origin: "Work",
    destination: "Gym",
    date: generateDate(0, 17, 30),
    transportType: "Train",
    cost: 2.50,
    description: "Evening workout"
  },
  // Yesterday's trips
  {
    id: "3",
    origin: "Home",
    destination: "Work",
    date: generateDate(1, 7, 45),
    transportType: "Bus",
    cost: 2.50,
    description: "Morning commute"
  },
  {
    id: "4",
    origin: "Work",
    destination: "Shopping",
    date: generateDate(1, 15, 0),
    transportType: "Train",
    cost: 2.50,
    description: "Lunch break shopping"
  },
  // Last week's trips
  {
    id: "5",
    origin: "Home",
    destination: "Work",
    date: generateDate(7, 8, 0),
    transportType: "Bus",
    cost: 2.50,
    description: "Morning commute"
  },
  {
    id: "6",
    origin: "Work",
    destination: "Doctor",
    date: generateDate(7, 14, 30),
    transportType: "Train",
    cost: 2.50,
    description: "Medical appointment"
  },
  // Two weeks ago
  {
    id: "7",
    origin: "Home",
    destination: "Work",
    date: generateDate(14, 7, 30),
    transportType: "Bus",
    cost: 2.50,
    description: "Morning commute"
  },
  {
    id: "8",
    origin: "Work",
    destination: "Home",
    date: generateDate(14, 18, 0),
    transportType: "Bus",
    cost: 2.50,
    description: "Evening commute"
  },
  // Three weeks ago
  {
    id: "9",
    origin: "Home",
    destination: "Work",
    date: generateDate(21, 8, 15),
    transportType: "Bus",
    cost: 2.50,
    description: "Morning commute"
  },
  {
    id: "10",
    origin: "Work",
    destination: "Gym",
    date: generateDate(21, 17, 45),
    transportType: "Train",
    cost: 2.50,
    description: "Evening workout"
  }
];

const STORAGE_KEY = '@travelapp_trips';

// Function to load trips from storage
const loadTrips = async (): Promise<Trip[]> => {
  try {
    const storedTrips = await AsyncStorage.getItem(STORAGE_KEY);
    if (storedTrips) {
      const parsedTrips = JSON.parse(storedTrips);
      // Convert date strings back to Date objects
      return parsedTrips.map((trip: any) => ({
        ...trip,
        date: new Date(trip.date)
      }));
    }
    return initialTrips;
  } catch (error) {
    console.error('Error loading trips:', error);
    return initialTrips;
  }
};

// Function to save trips to storage
const saveTrips = async (trips: Trip[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  } catch (error) {
    console.error('Error saving trips:', error);
  }
};

export default function UserScreen() {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load trips when component mounts
  useEffect(() => {
    const loadInitialTrips = async () => {
      const loadedTrips = await loadTrips();
      setTrips(loadedTrips);
      setIsLoading(false);
    };
    loadInitialTrips();
  }, []);

  // Save trips whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveTrips(trips);
    }
  }, [trips, isLoading]);

  const handleNewTrip = () => {
    setShowQuickAdd(true);
  };

  const handleTripPress = (tripId: string) => {
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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ThemedText>Loading trips...</ThemedText>
      </View>
    );
  }

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
            <ThemedText style={styles.addButtonText}>Add Trip</ThemedText>
          </TouchableOpacity>
        </View>

        {trips.map((trip) => (
          <TouchableOpacity 
            key={trip.id} 
            onPress={() => handleTripPress(trip.id)}
          >
            <ThemedView style={styles.tripCard}>
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
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  addButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
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