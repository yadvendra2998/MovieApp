import { Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigation from './AuthNavigation';
const Stack = createNativeStackNavigator();


const HomeNavigation = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const user = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (user) setIsLoggedIn(true);
      setUser(user);
      if (!user) {
        navigation.navigate('Auth');
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUser();
  }, [user])

  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Auth' component={AuthNavigation} options={{ headerShown: false }} />

      <Stack.Screen name='Home' component={HomeScreen} options={{
        headerRight: () => <>{
          isLoggedIn
            ? <Text style={{ color: '#000', fontSize: 16, fontWeight: '500' }}>{user?.username}</Text>
            : <TouchableOpacity onPress={() => navigation.navigate('Auth')}><Text style={{ color: '#000', fontSize: 16, fontWeight: '500' }}>Username</Text></TouchableOpacity>
        }</>,
      }} />
      <Stack.Screen name='Detail' component={DetailScreen} />
    </Stack.Navigator>
  )
}

export default HomeNavigation