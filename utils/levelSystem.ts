export const calculateXPForNextLevel = (currentLevel: number): number => {
  // Base XP needed for level 1 is 100, increases by 50% each level
  return Math.floor(100 * Math.pow(1.5, currentLevel - 1));
};

export const calculateLevel = (totalXP: number): number => {
  // Inverse of the XP calculation to determine level
  return Math.floor(Math.log(totalXP / 100) / Math.log(1.5)) + 1;
};

export const calculateCurrentLevelXP = (totalXP: number, currentLevel: number): number => {
  // Calculate XP progress within current level
  const xpForCurrentLevel = calculateXPForNextLevel(currentLevel - 1);
  return totalXP - xpForCurrentLevel;
};

export const addXP = (currentXP: number, amount: number): number => {
  return currentXP + amount;
};

export const getXPForTrip = (distance: number, transportType: string): number => {
  // Base XP for any trip
  let baseXP = 10;
  
  // Additional XP based on distance (1 XP per km, capped at 50)
  const distanceXP = Math.min(distance, 50);
  baseXP += distanceXP;
  
  // Bonus XP for sustainable transport
  switch (transportType.toLowerCase()) {
    case 'bike':
      baseXP *= 1.5;
      break;
    case 'public transport':
      baseXP *= 1.3;
      break;
    case 'walk':
      baseXP *= 1.2;
      break;
    case 'car':
      baseXP *= 1.1;
      break;
    default:
      baseXP *= 1.0;
  }
  
  return Math.round(baseXP);
}; 