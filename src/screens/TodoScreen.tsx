import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, SafeAreaView,
} from 'react-native';

import TodoItem from '../components/TodoItem';
import FilterBar from '../components/FilterBar';
import { Todo } from '../models/Todo';
import { getTodos, saveTodos } from '../utils/storage';

const TodoScreen = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [filter, setFilter] = useState('ALL');

  const isFirstLoad = useRef(true); // prevents saving empty array on first render

  useEffect(() => {
    const load = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    load();
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    saveTodos(todos);
  }, [todos]);

  const addTodo = () => {
    if (!task.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: task.trim(),
      completed: false,
      progress: 0,         // NEW: every task starts at 0%
    };
    setTodos(prev => [...prev, newTodo]);
    setTask('');
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const editTodo = (todo: Todo) => {
    setTask(todo.title);
    setEditId(todo.id);
  };

  const cancelEdit = () => {
    setTask('');
    setEditId(null);
  };

  const updateTodo = () => {
    if (!task.trim()) return;
    setTodos(prev =>
      prev.map(t => t.id === editId ? { ...t, title: task.trim() } : t)
    );
    setTask('');
    setEditId(null);
  };

  // NEW: replaces toggleTodo — updates progress and auto-sets completed flag
  const updateProgress = (id: string, value: number) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, progress: value, completed: value === 100 }
          : t
      )
    );
  };

  const handleSubmit = () => {
    editId ? updateTodo() : addTodo();
  };

  // FILTER: COMPLETED means progress is 100, ACTIVE means less than 100
  const filteredTodos = todos.filter(todo => {
    if (filter === 'ACTIVE') return todo.progress < 100;
    if (filter === 'COMPLETED') return todo.progress === 100;
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>My Todo App</Text>

        <TextInput
          style={styles.input}
          placeholder={editId ? 'Edit task...' : 'Add a new task...'}
          value={task}
          onChangeText={setTask}
          onSubmitEditing={handleSubmit}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{editId ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
          {editId && (
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelEdit}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>

        <FilterBar filter={filter} setFilter={setFilter} />

        {filteredTodos.length === 0 ? (
          <Text style={styles.emptyText}>
            {filter === 'ALL' ? 'No tasks yet. Add one!' : `No ${filter.toLowerCase()} tasks.`}
          </Text>
        ) : (
          <FlatList
            data={filteredTodos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                onDelete={() => deleteTodo(item.id)}
                onEdit={() => editTodo(item)}
                onProgressChange={updateProgress}  // NEW: was onToggle
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f2f2f2' },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#222' },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#ccc', fontSize: 16 },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  button: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  addButton: { backgroundColor: '#28a745' },
  cancelButton: { backgroundColor: '#6c757d' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
});