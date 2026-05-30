import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  filter: string;
  setFilter: (value: string) => void;
};

const FilterBar = ({ filter, setFilter }: Props) => {
  return (
    <View style={styles.container}>
      {['ALL', 'ACTIVE', 'COMPLETED'].map(item => (
        <TouchableOpacity key={item} onPress={() => setFilter(item)}>
          <Text style={[styles.text, filter === item && styles.active]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    color: 'gray',
  },
  active: {
    color: 'black',
    fontWeight: 'bold',
  },
});