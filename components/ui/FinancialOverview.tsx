import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Constants
const KLIMATICKET_PRICE = 1297.80;
const SINGLE_TRIP_PRICE = 2.50;

type FinancialOverviewProps = {
  totalTrips: number;
  timeFrame: 'week' | 'month' | 'year';
};

export function FinancialOverview({ totalTrips, timeFrame }: FinancialOverviewProps) {
  const totalValue = totalTrips * SINGLE_TRIP_PRICE;
  const percentage = Math.min((totalValue / KLIMATICKET_PRICE) * 100, 100);
  const remainingValue = Math.max(KLIMATICKET_PRICE - totalValue, 0);
  const tripsNeeded = Math.ceil(KLIMATICKET_PRICE / SINGLE_TRIP_PRICE);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Financial Overview
      </ThemedText>

      {/* Progress Wheel */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressWheel, { transform: [{ rotate: `${percentage * 3.6}deg` }] }]}>
          <View style={styles.progressInner}>
            <ThemedText type="defaultSemiBold" style={styles.percentageText}>
              {Math.round(percentage)}%
            </ThemedText>
            <ThemedText style={styles.subText}>of ticket value</ThemedText>
          </View>
        </View>
      </View>

      {/* Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <IconSymbol name="paperplane.fill" size={24} color="#007AFF" />
          <ThemedText style={styles.statValue}>€{totalValue.toFixed(2)}</ThemedText>
          <ThemedText style={styles.statLabel}>Total Value</ThemedText>
        </View>
        <View style={styles.statItem}>
          <IconSymbol name="house.fill" size={24} color="#007AFF" />
          <ThemedText style={styles.statValue}>{totalTrips}</ThemedText>
          <ThemedText style={styles.statLabel}>Total Trips</ThemedText>
        </View>
        <View style={styles.statItem}>
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={24} color="#007AFF" />
          <ThemedText style={styles.statValue}>€{remainingValue.toFixed(2)}</ThemedText>
          <ThemedText style={styles.statLabel}>Remaining</ThemedText>
        </View>
      </View>

      {/* Additional Info */}
      <View style={styles.infoContainer}>
        <ThemedText style={styles.infoText}>
          You need {tripsNeeded} trips to break even with the KlimaTicket Ö
        </ThemedText>
        <ThemedText style={styles.infoText}>
          Current timeframe: {timeFrame}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressWheel: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressInner: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 24,
    color: '#007AFF',
  },
  subText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  infoContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
}); 