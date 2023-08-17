import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import FavoriteCard from '../components/FavoriteCard';

const FavoriteScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.favorite.favoriteMovies);

  return (
    <>
      {Object.values(favorites).length > 0 ? (
        <ScrollView>
          {Object.values(favorites).map((movie) => (
            <FavoriteCard navigation={navigation} item={movie} />
          ))}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.empty} onPress={() => navigation.navigate('Home')}>
            <Text style={{ color: '#fff', fontSize: 25, fontWeight: '600' }}>Add Movies to Favorite List</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  )
}

export default FavoriteScreen

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