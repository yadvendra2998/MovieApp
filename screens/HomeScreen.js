import { StyleSheet,ActivityIndicator, Dimensions, ScrollView, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDocumentaryMovies, getFamilyMovies, getPopularMovies, getPopularTv, getTop_ratedMovies, getUpcomigMovies } from '../services/service';
import { SliderBox } from 'react-native-image-slider-box'
import List from '../components/List';
import { useDispatch, useSelector } from 'react-redux';

const dimention =Dimensions.get('screen');
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const watchList = useSelector((state) => state.watchList.WatchListItems);
  const favorite = useSelector((state) => state.favorite.favoriteMovies);
  const [user, setUser] = useState();
  const [MoviesImages, setMoviesImages] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState();
  const [topRated, setTopRated] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaryMovies, setDocumentaryMovies] = useState();

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const getData = () => {
    return Promise.all([
      getUpcomigMovies(),
      getPopularMovies(),
      getTop_ratedMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const user = jsonValue != null ? JSON.parse(jsonValue) : null;

      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          topRatedMoviesData,
          popularTvData,
          familyMoviesData,
          documentaryMoviesData,
        ]) => {
          const moviesImagesArray = [];
          const upcomingMovies = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path
            );
          });
          upcomingMoviesData.forEach(movie => {
            upcomingMovies.push(movie);
          });
          setUpcomingMovies(upcomingMovies);
          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setTopRated(topRatedMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <>
      {loaded && !error && (
        <ScrollView>
          {MoviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                dotStyle={styles.sliderStyle}
                images={MoviesImages}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={dimention.height / 1.5}
              />
            </View>
          )}
          {popularMovies && (
            <View style={styles.carousel}>
              <List navigation={navigation} title={'Popular Movies'} content={popularMovies} watchlist={watchList} favorite={favorite} />
            </View>
          )}
          {topRated && (
            <View style={styles.carousel}>
              <List navigation={navigation} title={'Top Rated'} content={topRated} watchlist={watchList} favorite={favorite} />
            </View>
          )}
          {popularTv && (
            <View style={styles.carousel}>
              <List navigation={navigation} title={'Popular TV Shows'} content={popularTv} watchlist={watchList} favorite={favorite} />
            </View>
          )}
          {familyMovies && (
            <View style={styles.carousel}>
              <List navigation={navigation} title={'Family Movies'} content={familyMovies} watchlist={watchList} favorite={favorite} />
            </View>
          )}
          {documentaryMovies && (
            <View style={styles.carousel}>
              <List navigation={navigation} title={'Documentry Movies'} content={documentaryMovies} watchlist={watchList} favorite={favorite} />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    height:350,
    alignItems: 'center',
    justifyContent: 'center',
  },
})