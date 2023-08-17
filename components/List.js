import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Card from './Card'

const List = ({ navigation, title, content,watchlist,favorite }) => {

    return (
        <View style={styles.list}>
            <View style={{ marginLeft: 20 }}>
                <Text style={styles.text}>{title}</Text>
            </View>
            <View>
                <FlatList
                    data={content}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Card navigation={navigation} item={item} watchlist={watchlist} favorite={favorite} />}
                />
            </View>
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    list: {
        marginTop: 25,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 10,
        marginTop: 20,
        color: '#000',
    },
})