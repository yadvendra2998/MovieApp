import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { removeFromFavorite } from '../redux/FavoriteSlice'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch } from 'react-redux'
const placeholderImage = require('../assets/images/placehoder.png');

const FavoriteCard = ({ navigation, item }) => {
    const dispatch = useDispatch();
    return (

        <View style={styles.allround}>
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('HomeTab', {screen:'Detail', params:{ MovieId: item.id },})}>
                <Image resizeMode='cover' style={styles.image} source={item.poster_path ? { uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path } : placeholderImage} />
                {!item.poster_path && (
                    <Text style={styles.movieName}>{item.title}</Text>
                )}
            <Text style={{ color: '#000', fontSize: 20, fontWeight: '700',alignSelf:'flex-start',marginLeft:10 }}>{item.title}</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => dispatch(addToWatchList({ item }))}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Entypo name='add-to-list' size={25} color='#000' />
                    <Text style={{ color: '#000' }}> Add to WatchList</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(removeFromFavorite({ item }))}>
                    <Icon name='delete-outline' size={25} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FavoriteCard

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