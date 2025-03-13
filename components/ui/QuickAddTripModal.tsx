import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type QuickAddTripModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (trip: {
    date: Date;
    cost: number;
    description?: string;
  }) => void;
};

export function QuickAddTripModal({ visible, onClose, onSubmit }: QuickAddTripModalProps) {
  const [date, setDate] = useState(new Date());
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      date,
      cost: parseFloat(cost),
      description: description.trim() || undefined,
    });
    // Reset form
    setDate(new Date());
    setCost('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <View style={styles.header}>
            <ThemedText type="subtitle">Quick Add Trip</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <IconSymbol name="xmark.circle.fill" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Date Picker */}
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <IconSymbol name="calendar" size={20} color="#007AFF" />
            <ThemedText style={styles.dateButtonText}>
              {date.toLocaleString()}
            </ThemedText>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}

          {/* Cost Input */}
          <View style={styles.inputContainer}>
            <IconSymbol name="eurosign.circle.fill" size={20} color="#007AFF" />
            <TextInput
              style={styles.input}
              value={cost}
              onChangeText={setCost}
              placeholder="Cost (€)"
              keyboardType="decimal-pad"
              placeholderTextColor="#666"
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputContainer}>
            <IconSymbol name="text.bubble" size={20} color="#007AFF" />
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Description (optional)"
              placeholderTextColor="#666"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={!cost}
          >
            <ThemedText style={styles.submitButtonText}>Add Trip</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateButtonText: {
    marginLeft: 8,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 