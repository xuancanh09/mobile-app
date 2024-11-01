import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const PopularSearches = () => {
  // Dữ liệu tìm kiếm nổi bật
  const popularSearches = [
    { id: '1', title: 'DanMachi' },
    { id: '2', title: 'One Piece' },
    { id: '3', title: 'Attack on Titan' },
    { id: '4', title: 'Naruto' },
    { id: '5', title: 'Demon Slayer' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm nổi bật</Text>
      <View style={styles.box}>
        <FlatList
          data={popularSearches}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          horizontal={true} // Thiết lập để hiển thị theo chiều ngang
          showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
        />
      </View>
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
    marginBottom: 10,
  },
  box: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Tăng độ nổi cho hiệu ứng đổ bóng
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10, // Khoảng cách giữa các mục
    borderRadius: 5,
    backgroundColor: '#f0f0f0', // Màu nền cho từng mục
  },
  itemText: {
    fontSize: 16,
  },
});

export default PopularSearches;