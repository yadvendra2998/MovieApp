import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import WatchListCard from '../components/WatchListCard';

const WatchListScreen = ({navigation}) => {
  const watchlistMovies = useSelector((state) => state.watchList.WatchListItems);
  console.log(typeof(watchlistMovies));
  return (
    <>
      {Object.values(watchlistMovies).length > 0 ? (
        <ScrollView>
          {Object.values(watchlistMovies).map((movie) => (
            <WatchListCard navigation={navigation} item={movie} />
          ))}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.empty} onPress={() => navigation.navigate('Home')}>
            <Text style={{ color: '#fff', fontSize: 25, fontWeight: '600' }}>Add Movies to Watch List</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  )
}

export default WatchListScreen

const styles = StyleSheet.create({
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 50,
    borderRadius: 5,
    paddingHorizontal:10,
  },
})