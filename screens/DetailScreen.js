import { StyleSheet, ActivityIndicator, ScrollView, Image, Text, Dimensions, View ,TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { getMovieDetail } from '../services/service';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../redux/FavoriteSlice';
import { addToWatchList } from '../redux/WatchListSlice';
const placeholderImage = require('../assets/images/placehoder.png');

const dimention = Dimensions.get('screen');

const DetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const movieId = route.params.MovieId;
  const [detail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const watchList = useSelector((state) => state.watchList.WatchListItems);
  const favorite = useSelector((state) => state.favorite.favoriteMovies);

  useEffect(() => {
    getMovieDetail(movieId).then((MovieData) => {
      setMovieDetail(MovieData);
      setLoaded(true);
    });
  }, [movieId]);


  return (
    <>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                detail.poster_path
                  ? { uri: 'https://image.tmdb.org/t/p/w500' + detail.poster_path }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <Text style={styles.title}>{detail.title}</Text>
              {detail.genres && (
                <View style={styles.genreContainer}>
                  {detail.genres.map((genre) => {
                    return (
                      <Text style={styles.genreTitle} key={genre.id}>{genre.name}</Text>
                    )
                  })}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                rating={detail.vote_average / 2}
                fullStarColor={'gold'}
              />
              <Text style={styles.overview}>{detail.overview}</Text>
              <Text style={styles.releaseDate}>{'Release Date: ' + detail.release_date}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50, marginHorizontal: 10 }}>
              
              <TouchableOpacity style={styles.watchlistbtn} onPress={()=> dispatch(addToWatchList({item:detail}))}>
                <Icon name='playlist-plus' size={30} color='#fff' />
                <Text style={{fontWeight:'700',fontSize:15}}> Add to WatchList</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addToFavorite} onPress={() => dispatch(addToFavorite({item:detail}))}>
                <Ionicon name="heart-outline" size={30} color="#fff" />
                <Text style={{fontWeight:'700',fontSize:15}}> Add to Favorite</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  image: {
    height: dimention.height / 1.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    color: '#000',
  },
  genreContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  genreTitle: {
    marginRight: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  overview: {
    padding: 10,
    color: '#000',
  },
  releaseDate: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToFavorite: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#308a5d',
    borderRadius: 5,
    height: 50,
    paddingHorizontal:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchlistbtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#30368a',
    paddingHorizontal: 10,
    height: 50,
    borderRadius:5,
  }
})