import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import TodoItem from '../components/TodoItem';
import FilterBar from '../components/FilterBar';
import { Todo } from '../models/Todo';
import { getTodos, saveTodos } from '../utils/storage';

const TodoScreen = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [filter, setFilter] = useState('ALL');

  // LOAD FROM STORAGE
  useEffect(() => {
    const load = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    load();
  }, []);

  // SAVE TO STORAGE
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // ADD
  const addTodo = () => {
    if (!task.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: task,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setTask('');
  };

  // DELETE
  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // EDIT
  const editTodo = (todo: Todo) => {
    setTask(todo.title);
    setEditId(todo.id);
  };

  // UPDATE
  const updateTodo = () => {
    setTodos(prev =>
      prev.map(t =>
        t.id === editId ? { ...t, title: task } : t
      )
    );
    setTask('');
    setEditId(null);
  };

  // TOGGLE COMPLETE
  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleSubmit = () => {
    editId ? updateTodo() : addTodo();
  };

  // FILTER LOGIC
  const filteredTodos = todos.filter(todo => {
    if (filter === 'ACTIVE') return !todo.completed;
    if (filter === 'COMPLETED') return todo.completed;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Production Todo App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task..."
        value={task}
        onChangeText={setTask}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {editId ? 'Update' : 'Add'}
        </Text>
      </TouchableOpacity>

      <FilterBar filter={filter} setFilter={setFilter} />

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onDelete={() => deleteTodo(item.id)}
            onEdit={() => editTodo(item)}
            onToggle={() => toggleTodo(item.id)}
          />
        )}
      />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});