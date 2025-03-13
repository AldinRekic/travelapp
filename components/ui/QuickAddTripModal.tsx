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
    origin: string;
    destination: string;
    transportType: string;
    cost: number;
    description?: string;
  }) => void;
};

const TRANSPORT_TYPES = ['Bus', 'Train', 'Tram', 'Subway'];

export function QuickAddTripModal({ visible, onClose, onSubmit }: QuickAddTripModalProps) {
  const [date, setDate] = useState(new Date());
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [transportType, setTransportType] = useState(TRANSPORT_TYPES[0]);
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTransportPicker, setShowTransportPicker] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      date,
      origin,
      destination,
      transportType,
      cost: parseFloat(cost),
      description: description.trim() || undefined,
    });
    // Reset form
    setDate(new Date());
    setOrigin('');
    setDestination('');
    setTransportType(TRANSPORT_TYPES[0]);
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

          {/* Origin Input */}
          <View style={styles.inputContainer}>
            <IconSymbol name="mappin.circle.fill" size={20} color="#007AFF" />
            <TextInput
              style={styles.input}
              value={origin}
              onChangeText={setOrigin}
              placeholder="Origin"
              placeholderTextColor="#666"
            />
          </View>

          {/* Destination Input */}
          <View style={styles.inputContainer}>
            <IconSymbol name="mappin.circle.fill" size={20} color="#007AFF" />
            <TextInput
              style={styles.input}
              value={destination}
              onChangeText={setDestination}
              placeholder="Destination"
              placeholderTextColor="#666"
            />
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

          {/* Transport Type Picker */}
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowTransportPicker(true)}
          >
            <IconSymbol name="bus" size={20} color="#007AFF" />
            <ThemedText style={styles.dateButtonText}>
              {transportType}
            </ThemedText>
          </TouchableOpacity>

          {showTransportPicker && (
            <View style={styles.transportPicker}>
              {TRANSPORT_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.transportOption,
                    transportType === type && styles.transportOptionSelected
                  ]}
                  onPress={() => {
                    setTransportType(type);
                    setShowTransportPicker(false);
                  }}
                >
                  <ThemedText style={[
                    styles.transportOptionText,
                    transportType === type && styles.transportOptionTextSelected
                  ]}>
                    {type}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
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
            style={[
              styles.submitButton,
              (!origin || !destination || !cost) && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!origin || !destination || !cost}
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
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  transportPicker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  transportOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transportOptionSelected: {
    backgroundColor: '#f0f0f0',
  },
  transportOptionText: {
    fontSize: 16,
  },
  transportOptionTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
}); 