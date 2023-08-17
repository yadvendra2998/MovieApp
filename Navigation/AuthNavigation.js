import React, { useEffect } from 'react'
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


const AuthNavigation = () => {
  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const user = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (!user) {
        await AsyncStorage.removeItem('user');
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUser();
  }, [])
  return (
    <Stack.Navigator screenOptions={{
        tabBarActiveTintColor: '#59C1CC',
        tabBarInactiveTintColor: 'gray',
      headerShown: false,
        tabBarHideOnKeyboard:true,
      }}
          initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigation