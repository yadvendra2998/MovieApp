import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { addToFavorite } from '../redux/FavoriteSlice';
import { removeItem } from '../redux/WatchListSlice';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
const placeholderImage = require('../assets/images/placehoder.png');

const WatchListCard = ({ navigation, item }) => {
    
    const dispatch = useDispatch();
    return (
        <View style={styles.allround}>
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('HomeTab', { screen: 'Detail', params: { MovieId: item.id } })}>
                <Image resizeMode='cover' style={styles.image} source={item.poster_path ? { uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path } : placeholderImage} />
                {!item.poster_path && (
                    <Text style={styles.movieName}>{item.title}</Text>
                )}
                <Text style={{ color: '#000', fontSize: 20, fontWeight: '700',alignSelf:'flex-start',marginLeft:10 }}>{item.title}</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => dispatch(addToFavorite({ item }))}
                    style={{flexDirection:'row', alignItems: 'center' }}>
                    <Entypo name='heart-outlined' size={25} color='#000' />
                    <Text style={{ color: '#000' }}> Add to Favorite</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(removeItem({ item }))}>
                    <Icon name='delete-outline' size={25} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default WatchListCard

const styles = StyleSheet.create({
    container: {
        padding: 5,
        position: 'relative',
        alignItems: 'center',
        height: 200,
    },
    allround: {
        height: 400,
        width: '95%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#e6e6e6',
        marginHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginTop:10,

    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginVertical: 10
    },
    image: {
        height: 300,
        width: '100%',
        borderRadius: 20,
    },
    movieName: {
        position: 'absolute',
        width: 100,
        top: 10,
        textAlign: 'center',
    },
})