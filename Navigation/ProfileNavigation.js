import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoriteScreen from '../screens/FavoriteScreen';
import WatchListScreen from '../screens/WatchListScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
      <Stack.Navigator initialRouteName='Profile'>
          <Stack.Screen name='Profile' component={ProfileScreen} />
          <Stack.Screen name='Favorite' component={FavoriteScreen} />
          <Stack.Screen name='WatchList' component={WatchListScreen} />
    </Stack.Navigator>
  )
}

export default ProfileNavigation