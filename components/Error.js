import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Error = ({errorText1, errorText2}) => {
  return (
    <View style={styles.container}>
          <Text>{errorText1}</Text>
          <Text>{errorText2}</Text>
    </View>
  )
}

export default Error

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontWeight: 'bold',
        color:'#eee'
    },
})