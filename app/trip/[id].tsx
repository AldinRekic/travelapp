import { StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Dummy data - in a real app, this would come from a database
const trips = {
  1: {
    id: 1,
    destination: "Paris, France",
    date: "March 15-22, 2024",
    duration: "7 days",
    cost: 2500,
    description: "Spring break in the City of Light",
    highlights: [
      "Visited the Eiffel Tower",
      "Explored the Louvre Museum",
      "Strolled along the Seine River",
      "Tried authentic French cuisine"
    ]
  },
  2: {
    id: 2,
    destination: "Tokyo, Japan",
    date: "January 10-20, 2024",
    duration: "10 days",
    cost: 3500,
    description: "Winter exploration of Japanese culture",
    highlights: [
      "Shibuya Crossing experience",
      "Senso-ji Temple visit",
      "Tsukiji Fish Market tour",
      "Mount Fuji day trip"
    ]
  },
  3: {
    id: 3,
    destination: "Bali, Indonesia",
    date: "December 1-7, 2023",
    duration: "6 days",
    cost: 1800,
    description: "Tropical getaway",
    highlights: [
      "Beach hopping",
      "Ubud Temple tour",
      "Rice terrace visit",
      "Traditional dance show"
    ]
  }
};

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams();
  const tripId = typeof id === 'string' ? parseInt(id, 10) : null;
  const trip = tripId ? trips[tripId as keyof typeof trips] : null;

  if (!trip) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Trip not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.destination}>
          {trip.destination}
        </ThemedText>
        <ThemedText style={styles.date}>{trip.date}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Trip Overview
        </ThemedText>
        <ThemedView style={styles.overviewCard}>
          <ThemedView style={styles.overviewItem}>
            <IconSymbol name="house.fill" size={24} color="#007AFF" />
            <ThemedText style={styles.overviewLabel}>Duration</ThemedText>
            <ThemedText style={styles.overviewValue}>{trip.duration}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.overviewItem}>
            <IconSymbol name="paperplane.fill" size={24} color="#007AFF" />
            <ThemedText style={styles.overviewLabel}>Cost</ThemedText>
            <ThemedText style={styles.overviewValue}>${trip.cost.toLocaleString()}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Description
        </ThemedText>
        <ThemedText style={styles.description}>{trip.description}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Trip Highlights
        </ThemedText>
        {trip.highlights.map((highlight, index) => (
          <ThemedView key={index} style={styles.highlightItem}>
            <IconSymbol name="chevron.right" size={20} color="#007AFF" />
            <ThemedText style={styles.highlightText}>{highlight}</ThemedText>
          </ThemedView>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  destination: {
    fontSize: 28,
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  overviewCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewItem: {
    alignItems: 'center',
  },
  overviewLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 8,
  },
  overviewValue: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  highlightText: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
}); 