import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Todo } from '../models/Todo';

type Props = {
  item: Todo;
  onDelete: () => void;
  onEdit: () => void;
  onProgressChange: (id: string, value: number) => void; 
};

const TodoItem = ({ item, onDelete, onEdit, onProgressChange }: Props) => {
  // If progress hits 100, mark it as visually complete
  const isComplete = item.progress === 100;

  return (
    <View style={styles.card}>

      {/* TITLE ROW */}
      <View style={styles.titleRow}>
        <Text style={[styles.text, isComplete && styles.done]}>
          {item.title}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* PROGRESS BAR  */}
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${item.progress}%` }]} />
      </View>

      {/* SLIDER + PERCENTAGE LABEL */}
      <View style={styles.sliderRow}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={10}              
          value={item.progress}
          minimumTrackTintColor="#28a745"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#28a745"
          onSlidingComplete={value => onProgressChange(item.id, value)}
        />
        <Text style={styles.progressLabel}>{item.progress}%</Text>
      </View>

    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    flex: 1,           
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  edit: {
    color: 'blue',
  },
  delete: {
    color: 'red',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: '#28a745',
    borderRadius: 3,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 36,
  },
  progressLabel: {
    width: 40,
    textAlign: 'right',
    fontSize: 13,
    color: '#555',
  },
});