import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";
import { FinancialOverview } from "@/components/ui/FinancialOverview";
import { QuickAddTripModal } from "@/components/ui/QuickAddTripModal";
import UserLevelCard from "@/components/ui/UserLevelCard";
import { calculateLevel, calculateXPForNextLevel, calculateCurrentLevelXP, getXPForTrip, addXP } from "@/utils/levelSystem";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Trip {
  id: string;
  date: string;
  origin: string;
  destination: string;
  transportType: string;
  cost: number;
  distance: number;
  description: string;
}

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
    date: generateDate(0, 7, 30).toISOString(),
    transportType: "Bus",
    cost: 2.50,
    distance: 0,
    description: "Morning commute"
  },
  {
    id: "2",
    origin: "Work",
    destination: "Gym",
    date: generateDate(0, 17, 30).toISOString(),
    transportType: "Train",
    cost: 2.50,
    distance: 0,
    description: "Evening workout"
  },
  // Yesterday's trips
  {
    id: "3",
    origin: "Home",
    destination: "Work",
    date: generateDate(1, 7, 45).toISOString(),
    transportType: "Bus",
    cost: 2.50,
    distance: 0,
    description: "Morning commute"
  },
  {
    id: "4",
    origin: "Work",
    destination: "Shopping",
    date: generateDate(1, 15, 0).toISOString(),
    transportType: "Train",
    cost: 2.50,
    distance: 0,
    description: "Lunch break shopping"
  },
  // Last week's trips
  {
    id: "5",
    origin: "Home",
    destination: "Work",
    date: generateDate(7, 8, 0).toISOString(),
    transportType: "Bus",
    cost: 2.50,
    distance: 0,
    description: "Morning commute"
  },
  {
    id: "6",
    origin: "Work",
    destination: "Doctor",
    date: generateDate(7, 14, 30).toISOString(),
    transportType: "Train",
    cost: 2.50,
    distance: 0,
    description: "Medical appointment"
  },
  // Two weeks ago
  {
    id: "7",
    origin: "Home",
    destination: "Work",
    date: generateDate(14, 7, 30).toISOString(),
    transportType: "Bus",
    cost: 2.50,
    distance: 0,
    description: "Morning commute"
  },
  {
    id: "8",
    origin: "Work",
    destination: "Home",
    date: generateDate(14, 18, 0).toISOString(),
    transportType: "Bus",
    cost: 2.50,
    distance: 0,
    description: "Evening commute"
  },
  // Three weeks ago
  {
    id: "9",
    origin: "Home",
    destination: "Work",
    date: generateDate(21, 8, 15).toISOString(),
    transportType: "Bus",
    cost: 2.50,
    distance: 0,
    description: "Morning commute"
  },
  {
    id: "10",
    origin: "Work",
    destination: "Gym",
    date: generateDate(21, 17, 45).toISOString(),
    transportType: "Train",
    cost: 2.50,
    distance: 0,
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
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isQuickAddModalVisible, setIsQuickAddModalVisible] = useState(false);
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);

  useEffect(() => {
    loadUserData();
    loadUserXP();
  }, []);

  const loadUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const loadUserXP = async () => {
    try {
      const storedXP = await AsyncStorage.getItem("userXP");
      if (storedXP) {
        const xp = parseInt(storedXP);
        setUserXP(xp);
        setUserLevel(calculateLevel(xp));
      }
    } catch (error) {
      console.error("Error loading user XP:", error);
    }
  };

  const handleQuickAddSubmit = async (tripData: {
    date: Date;
    origin: string;
    destination: string;
    transportType: string;
    cost: number;
    description?: string;
    distance: number;
  }) => {
    try {
      const newTrip: Trip = {
        id: Date.now().toString(),
        date: tripData.date.toISOString(),
        origin: tripData.origin,
        destination: tripData.destination,
        transportType: tripData.transportType,
        cost: tripData.cost,
        distance: tripData.distance,
        description: tripData.description || "",
      };

      // Calculate XP for the new trip
      const tripXP = getXPForTrip(tripData.distance, tripData.transportType);
      const newXP = addXP(userXP, tripXP);
      
      // Update XP and level
      await AsyncStorage.setItem("userXP", newXP.toString());
      setUserXP(newXP);
      setUserLevel(calculateLevel(newXP));

      // Add trip to state
      setTrips(prevTrips => [newTrip, ...prevTrips]);
      setIsQuickAddModalVisible(false);
    } catch (error) {
      console.error("Error adding trip:", error);
    }
  };

  const handleNewTrip = () => {
    setIsQuickAddModalVisible(true);
  };

  const handleTripPress = (tripId: string) => {
    router.push(`/(tabs)/trip/${tripId}` as any);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  // Calculate total cost from all trips
  const totalCost = trips.reduce((sum, trip) => sum + trip.cost, 0);

  if (userData === null) {
    return (
      <View style={styles.container}>
        <ThemedText>Loading user data...</ThemedText>
      </View>
    );
  }

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1">
        <View className="p-4">
          {userData && (
            <View className="items-center mb-4">
              <Image
                source={{ uri: userData.avatar }}
                className="w-20 h-20 rounded-full mb-2"
              />
              <ThemedText className="text-xl font-bold">{userData.name}</ThemedText>
              <ThemedText className="text-gray-500">{userData.email}</ThemedText>
            </View>
          )}

          <UserLevelCard
            level={userLevel}
            currentXP={calculateCurrentLevelXP(userXP, userLevel)}
            xpToNextLevel={calculateXPForNextLevel(userLevel)}
          />

          <FinancialOverview
            totalTrips={trips.length}
            totalDistance={trips.reduce((sum, trip) => sum + trip.distance, 0)}
            totalCost={trips.reduce((sum, trip) => sum + trip.cost, 0)}
            klimaTicketCost={1090}
          />

          <View className="flex-row justify-between items-center mb-4">
            <ThemedText className="text-xl font-bold">Recent Trips</ThemedText>
            <TouchableOpacity
              onPress={() => setIsQuickAddModalVisible(true)}
              className="bg-blue-500 rounded-full p-2"
            >
              <ThemedText className="text-white text-xl">+</ThemedText>
            </TouchableOpacity>
          </View>

          {trips.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4"
              onPress={() => handleTripPress(trip.id)}
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <ThemedText className="text-lg font-semibold">
                    {trip.origin} → {trip.destination}
                  </ThemedText>
                  <ThemedText className="text-gray-500">
                    {formatDate(trip.date)} {formatTime(trip.date)}
                  </ThemedText>
                  <ThemedText className="text-gray-500">
                    {trip.transportType} • {trip.distance} km • €{trip.cost.toFixed(2)}
                  </ThemedText>
                  {trip.description && (
                    <ThemedText className="text-gray-500 mt-1">{trip.description}</ThemedText>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <QuickAddTripModal
        visible={isQuickAddModalVisible}
        onClose={() => setIsQuickAddModalVisible(false)}
        onSubmit={handleQuickAddSubmit}
      />
    </ThemedView>
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