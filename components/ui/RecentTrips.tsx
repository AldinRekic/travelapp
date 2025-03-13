import React from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

type Trip = {
  id: string;
  destination: string;
  date: string;
  imageUrl: string;
  duration: string;
};

// Dummy data - replace with real data later
const DUMMY_TRIPS: Trip[] = [
  {
    id: '1',
    destination: 'Paris, France',
    date: 'March 15-20, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    duration: '6 days',
  },
  {
    id: '2',
    destination: 'Tokyo, Japan',
    date: 'April 1-7, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da93',
    duration: '7 days',
  },
  {
    id: '3',
    destination: 'New York, USA',
    date: 'May 10-15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    duration: '6 days',
  },
];

export default function RecentTrips() {
  return (
    <View className="space-y-4">
      <View className="flex-row justify-between items-center">
        <ThemedText type="title" className="text-xl">
          Recent Trips
        </ThemedText>
        <TouchableOpacity>
          <ThemedText className="text-blue-500">See All</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
      >
        {DUMMY_TRIPS.map((trip) => (
          <TouchableOpacity 
            key={trip.id}
            className="w-64 rounded-xl overflow-hidden shadow-lg"
          >
            <View className="relative">
              <Image
                source={{ uri: trip.imageUrl }}
                className="w-full h-40"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-black/30" />
              <View className="absolute bottom-0 left-0 right-0 p-4">
                <ThemedText className="text-white text-lg font-semibold">
                  {trip.destination}
                </ThemedText>
                <ThemedText className="text-white/80 text-sm">
                  {trip.date}
                </ThemedText>
                <View className="absolute top-2 right-2 bg-white/90 rounded-full px-3 py-1">
                  <ThemedText className="text-sm font-medium">
                    {trip.duration}
                  </ThemedText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
} 