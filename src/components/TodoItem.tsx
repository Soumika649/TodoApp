import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet}  from 'react-native';
import { Todo } from '../models/Todo';

type Props = {
    item : Todo;
    onDelete: () => void;
    onEdit: () => void;
    onToggle: () => void;
};

const TodoItem=  ({ item , onDelete, onEdit, onToggle}: Props)=> {
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={onToggle}>
                <Text style={[styles.text, item.completed && styles.done]}>
                    {item.title}
                </Text>
            </TouchableOpacity>

            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit}>
                    <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onDelete}>
                    <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default TodoItem;



// STYLES
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
  },
  text: {
    fontSize: 16,
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  edit: {
    color: 'blue',
    marginRight: 10,
  },
  delete: {
    color: 'red',
  },
});