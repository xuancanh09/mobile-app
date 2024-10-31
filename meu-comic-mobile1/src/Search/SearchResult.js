import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import SearchFilters from './SearchFilters';

const SearchResults = ({ searchTerm }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const results = {
    comics: [
      { id: '1', title: 'DanMachi 4', author: 'Omori Fujino', genre: 'Fantasy', image: require('./assets/Danmachi.jpg') },
      { id: '2', title: 'Danshi Kinshitsu!', author: 'Shigano Iori', genre: 'Comedy', image: require('./assets/DanshiKinishitsu.jpg') },
      { id: '3', title: 'Genshoku Tsundere Danshi Semekare', author: 'Aikawa Hiro', genre: 'Romance', image: require('./assets/GenshokuTsundereDanshiSemekare.jpg') },
    ],
    authors: [
      { id: 'a1', name: 'Dan', followers: '1.000K', image: require('./assets/Meo.jpg') },
      { id: 'a2', name: 'Ego Dance', followers: '1.000K', image: require('./assets/Meo.jpg') },
      { id: 'a3', name: 'Daniel Lima', followers: '10K', image: require('./assets/Meo.jpg') },
    ],
  };

  const filteredComics = results.comics.filter(comic =>
    (comic.title.toLowerCase().includes(searchTerm.toLowerCase()) || comic.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedFilter === 'All' || comic.genre === selectedFilter)
  );

  const filteredAuthors = results.authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchFilters selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      <Text style={styles.sectionTitle}>Comics</Text>
      <FlatList
        data={filteredComics}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemText}>{item.title} by {item.author}</Text>
          </View>
        )}
      />
      <Text style={styles.sectionTitle}>Authors</Text>
      <FlatList
        data={filteredAuthors}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemImage: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
});

export default SearchResults;