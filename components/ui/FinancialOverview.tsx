import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Svg, { Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

interface FinancialOverviewProps {
  totalTrips: number;
  totalDistance: number;
  totalCost: number;
  klimaTicketCost: number;
}

const KLIMATICKET_PRICE = 1297.80;
const CIRCLE_SIZE = 200;
const CIRCLE_STROKE_WIDTH = 20;
const CIRCLE_RADIUS = (CIRCLE_SIZE - CIRCLE_STROKE_WIDTH) / 2;
const CIRCLE_CENTER = CIRCLE_SIZE / 2;

export function FinancialOverview({ totalTrips, totalDistance, totalCost, klimaTicketCost }: FinancialOverviewProps) {
  const savings = totalCost; // The money saved by having the KlimaTicket
  const savingsPercentage = ((savings / KLIMATICKET_PRICE) * 100).toFixed(1);
  const remainingToBreakEven = KLIMATICKET_PRICE - savings;

  const percentage = Math.min((savings / KLIMATICKET_PRICE) * 100, 100);
  const tripsNeeded = Math.ceil(remainingToBreakEven / 2.50);

  const circumference = 2 * Math.PI * CIRCLE_RADIUS;
  const progressOffset = circumference - (percentage / 100) * circumference;

  return (
    <LinearGradient
      colors={['#4F46E5', '#7C3AED']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ThemedText style={styles.title}>Financial Overview</ThemedText>
      
      <View style={styles.row}>
        <ThemedText style={styles.label}>Total Trips</ThemedText>
        <ThemedText style={styles.value}>{totalTrips}</ThemedText>
      </View>
      
      <View style={styles.row}>
        <ThemedText style={styles.label}>Total Distance</ThemedText>
        <ThemedText style={styles.value}>{totalDistance} km</ThemedText>
      </View>
      
      <View style={styles.row}>
        <ThemedText style={styles.label}>Total Cost</ThemedText>
        <ThemedText style={styles.value}>€{totalCost.toFixed(2)}</ThemedText>
      </View>
      
      <View style={styles.row}>
        <ThemedText style={styles.label}>KlimaTicket Ö Cost</ThemedText>
        <ThemedText style={styles.value}>€{KLIMATICKET_PRICE.toFixed(2)}</ThemedText>
      </View>
      
      <View style={styles.savingsRow}>
        <ThemedText style={styles.savingsLabel}>Money Saved</ThemedText>
        <ThemedText style={styles.savingsValue}>
          €{savings.toFixed(2)} ({savingsPercentage}%)
        </ThemedText>
      </View>

      <View style={styles.breakEvenRow}>
        <ThemedText style={styles.breakEvenLabel}>To Break Even</ThemedText>
        <ThemedText style={styles.breakEvenValue}>
          €{remainingToBreakEven.toFixed(2)} remaining
        </ThemedText>
      </View>

      <View style={styles.progressContainer}>
        <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
          <Circle
            cx={CIRCLE_CENTER}
            cy={CIRCLE_CENTER}
            r={CIRCLE_RADIUS}
            stroke="#E5E7EB"
            strokeWidth={CIRCLE_STROKE_WIDTH}
          />
          <Circle
            cx={CIRCLE_CENTER}
            cy={CIRCLE_CENTER}
            r={CIRCLE_RADIUS}
            stroke="#007AFF"
            strokeWidth={CIRCLE_STROKE_WIDTH}
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${CIRCLE_CENTER} ${CIRCLE_CENTER})`}
          />
        </Svg>
        <View style={styles.progressText}>
          <ThemedText type="title" style={styles.percentageText}>
            {Math.round(percentage)}%
          </ThemedText>
          <ThemedText style={styles.progressSubtext}>
            of KlimaTicket Ö
          </ThemedText>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <IconSymbol name="eurosign.circle.fill" size={24} color="#fff" />
          <ThemedText style={styles.statValue}>€{totalCost.toFixed(2)}</ThemedText>
          <ThemedText style={styles.statLabel}>Money Saved</ThemedText>
        </View>

        <View style={styles.statItem}>
          <IconSymbol name="bus" size={24} color="#fff" />
          <ThemedText style={styles.statValue}>{totalTrips}</ThemedText>
          <ThemedText style={styles.statLabel}>Total Trips</ThemedText>
        </View>

        <View style={styles.statItem}>
          <IconSymbol name="arrow.up.circle.fill" size={24} color="#fff" />
          <ThemedText style={styles.statValue}>€{remainingToBreakEven.toFixed(2)}</ThemedText>
          <ThemedText style={styles.statLabel}>To Break Even</ThemedText>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <ThemedText style={styles.infoText}>
          {tripsNeeded} more trips needed to break even
        </ThemedText>
        <ThemedText style={styles.timeFrameText}>
          Based on trips in the last {totalDistance} km
        </ThemedText>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  savingsLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  savingsValue: {
    color: '#4ADE80',
    fontSize: 18,
    fontWeight: 'bold',
  },
  breakEvenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  breakEvenLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  breakEvenValue: {
    color: '#FFA500',
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  percentageText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  progressSubtext: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  timeFrameText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
}); 