import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { addToFavorite, removeFromFavorite } from '../redux/FavoriteSlice';
import { addToWatchList, removeItem } from '../redux/WatchListSlice';
const placeholderImage = require('../assets/images/placehoder.png');


const Card = ({ navigation, item, watchlist, favorite }) => {
  const dispatch = useDispatch();
  // console.log(typeof (watchlist), Object.values(watchlist).some(movie => movie.id === item.id));
  return (
    <View style={styles.allround}>
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Detail', { MovieId: item.id })}>
        <Image resizeMode='cover' style={styles.image} source={item.poster_path ? { uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path } : placeholderImage} />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
      <View style={styles.footer}>
        {Object.values(watchlist).some(movie => movie.id === item.id) ? (
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => dispatch(removeItem(item))}>
            <Icon name='playlist-remove' size={25} color='#de1d26' />
            <Text style={{ color: '#de1d26' }}> from WatchList</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => dispatch(addToWatchList(item))}>
            <Entypo name='add-to-list' size={25} color='#000' />
            <Text style={{ color: '#000' }}> Add to WatchList</Text>
          </TouchableOpacity>
        )}
        {Object.values(favorite).some(movie => movie.id === item.id) ? (
          <TouchableOpacity onPress={() => dispatch(removeFromFavorite(item))}>
            <Icon name='cards-heart' size={25} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => dispatch(addToFavorite(item))}>
            <Icon name='cards-heart-outline' size={25} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
  },
  allround: {
    height: 300,
    width: 250,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    paddingHorizontal: 10,

  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10
  },
  image: {
    height: 250,
    width: 200,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    top: 10,
    textAlign: 'center',
  },
})