import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TodoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <Text style={styles.text}>TodoScreen Loaded Successfully</Text>
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
});