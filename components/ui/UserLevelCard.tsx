import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

interface UserLevelCardProps {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
}

const getLevelTitle = (level: number): string => {
  if (level < 5) return 'Novice Explorer';
  if (level < 10) return 'Adventure Seeker';
  if (level < 15) return 'Journey Master';
  if (level < 20) return 'Travel Expert';
  if (level < 25) return 'Globe Trotter';
  if (level < 30) return 'World Wanderer';
  return 'Legendary Voyager';
};

export default function UserLevelCard({ level, currentXP, xpToNextLevel }: UserLevelCardProps) {
  const progress = (currentXP / xpToNextLevel) * 100;
  const title = getLevelTitle(level);

  return (
    <LinearGradient
      colors={['#4F46E5', '#7C3AED']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-2xl p-4 mb-4"
    >
      <View className="flex-row justify-between items-center mb-2">
        <ThemedText className="text-white text-lg font-bold">Level {level}</ThemedText>
        <ThemedText className="text-white/80 text-sm">{title}</ThemedText>
      </View>
      
      <View className="h-2 bg-white/20 rounded-full overflow-hidden">
        <View 
          className="h-full bg-white rounded-full" 
          style={{ width: `${progress}%` }}
        />
      </View>
      
      <View className="flex-row justify-between mt-2">
        <ThemedText className="text-white/80 text-sm">
          {currentXP} / {xpToNextLevel} XP
        </ThemedText>
        <ThemedText className="text-white/80 text-sm">
          {Math.round(progress)}%
        </ThemedText>
      </View>
    </LinearGradient>
  );
} 