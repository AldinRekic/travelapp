import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { NewTripForm } from '@/components/ui/NewTripForm';

export default function NewTripScreen() {
  return (
    <ThemedView style={styles.container}>
      <NewTripForm />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 