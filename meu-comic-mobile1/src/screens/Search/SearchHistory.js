import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchHistory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử tìm kiếm</Text>
      {/* Hiển thị lịch sử tìm kiếm ở đây */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchHistory;