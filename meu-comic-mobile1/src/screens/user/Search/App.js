import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import SearchResults from './SearchResult';
import SearchHistory from './SearchHistory';
import PopularSearches from './PopularSearches';
import genshokuImage from './assets/GenshokuTsundereDanshiSemekare.jpg';
import meoImage from './assets/Meo.jpg';


const App = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.iconText}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search ..."
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
          <TouchableOpacity style={styles.clearButton} onPress={() => setSearchText('')}>
            <Text style={styles.iconText}>❌</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Các thành phần hiển thị lịch sử, tìm kiếm phổ biến, và kết quả tìm kiếm */}
      <SearchHistory />
      <PopularSearches />
      <SearchResults searchTerm={searchText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  clearButton: {
    padding: 4,
  },
  iconText: {
    fontSize: 18,
  },
});

export default App;
