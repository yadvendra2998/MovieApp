import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const PlayButton = () => {
  return (
    <Pressable style={styles.button}>
      <Icon name='caret-forward-outline' size={25} color='white'/>
    </Pressable>
  )
}

export default PlayButton

const styles = StyleSheet.create({
    button: {
        alignItems:'center',
        borderRadius:50,
        width:50,
        paddingLeft:13,
        padding:10,
        backgroundColor:'#4481FC',
    }
})