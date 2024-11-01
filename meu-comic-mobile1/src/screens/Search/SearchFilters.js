import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchFilters = ({ selectedFilter, setSelectedFilter }) => {
  const filters = ['All', 'Comics', 'Authors'];

  return (
    <View style={styles.filterContainer}>
      {filters.map(filter => (
        <TouchableOpacity
          key={filter}
          style={[styles.filterButton, selectedFilter === filter && styles.selectedFilter]}
          onPress={() => setSelectedFilter(filter)}
        >
          <Text style={styles.filterText}>{filter}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  selectedFilter: {
    backgroundColor: '#007bff',
  },
  filterText: {
    color: '#333',
  },
});

export default SearchFilters;