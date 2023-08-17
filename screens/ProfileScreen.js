import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import userImage from '../assets/images/user.png';
const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState([]);

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
  // console.log(user);
  const LogOutUser = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('HomeTab');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {user && (
        <TouchableOpacity>
          <Text>Click on Username to Login</Text>
        </TouchableOpacity>
      )}
      <View style={styles.parent}>
        <View style={styles.user}>
          <Image source={userImage} resizeMode='cover' style={styles.image} />
          <Text style={{ color: '#000', fontSize: 20, fontWeight: '500', marginBottom: 10 }}>{user.username}</Text>
          <Text style={{ color: '#000', fontSize: 20, fontWeight: '500', marginBottom: 10 }}>{user.email}</Text>
          <Text style={{ color: '#000', fontSize: 20, fontWeight: '500', marginBottom: 10 }}>{user.phone}</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Favorite')}>
            <Text style={{ color: '#595959', fontSize: 20, fontWeight: '700' }}>My Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WatchList')}>
            <Text style={{ color: '#595959', fontSize: 20, fontWeight: '700' }}>My WatchList</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={LogOutUser}>
            <Text style={{ color: '#595959', fontSize: 20, fontWeight: '700' }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      </>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  parent: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#80ffff',
    width: '100%',
    alignItems: 'center',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10,
  },
  user: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 20,
  }
})