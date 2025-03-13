import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Svg, { Circle } from 'react-native-svg';

type FinancialOverviewProps = {
  totalTrips: number;
  timeFrame: string;
  totalCost: number;
};

const KLIMATICKET_PRICE = 1297.80;
const CIRCLE_SIZE = 200;
const CIRCLE_STROKE_WIDTH = 20;
const CIRCLE_RADIUS = (CIRCLE_SIZE - CIRCLE_STROKE_WIDTH) / 2;
const CIRCLE_CENTER = CIRCLE_SIZE / 2;

export function FinancialOverview({ totalTrips, timeFrame, totalCost }: FinancialOverviewProps) {
  const percentage = Math.min((totalCost / KLIMATICKET_PRICE) * 100, 100);
  const remainingValue = Math.max(KLIMATICKET_PRICE - totalCost, 0);
  const tripsNeeded = Math.ceil(remainingValue / 2.50);

  const circumference = 2 * Math.PI * CIRCLE_RADIUS;
  const progressOffset = circumference - (percentage / 100) * circumference;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Financial Overview
      </ThemedText>

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
          <IconSymbol name="eurosign.circle.fill" size={24} color="#007AFF" />
          <ThemedText style={styles.statValue}>€{totalCost.toFixed(2)}</ThemedText>
          <ThemedText style={styles.statLabel}>Total Value</ThemedText>
        </View>

        <View style={styles.statItem}>
          <IconSymbol name="bus" size={24} color="#007AFF" />
          <ThemedText style={styles.statValue}>{totalTrips}</ThemedText>
          <ThemedText style={styles.statLabel}>Total Trips</ThemedText>
        </View>

        <View style={styles.statItem}>
          <IconSymbol name="arrow.down.circle.fill" size={24} color="#007AFF" />
          <ThemedText style={styles.statValue}>€{remainingValue.toFixed(2)}</ThemedText>
          <ThemedText style={styles.statLabel}>Remaining</ThemedText>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <ThemedText style={styles.infoText}>
          {tripsNeeded} more trips needed to break even
        </ThemedText>
        <ThemedText style={styles.timeFrameText}>
          Based on trips in the last {timeFrame}
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
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
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