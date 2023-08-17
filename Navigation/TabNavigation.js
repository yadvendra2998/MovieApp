import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileNavigation from './ProfileNavigation';
import HomeNavigation from './HomeNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
const Tab = createBottomTabNavigator();

const TabNavigation = ({ navigation }) => {

  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#59C1CC',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarHideOnKeyboard: true,
    }} initialRouteName='HomeTab'
    >
      <Tab.Screen name='HomeTab' component={HomeNavigation} options={{
        tabBarIcon: ({ color }) => <Icon name='home-outline' size={25} color={color} />,
        tabBarLabel: 'Home',
      }} />
      <Tab.Screen name='ProfileTab' component={ProfileNavigation} options={{
        tabBarIcon: ({ color }) => <Feather name='user' size={25} color={color} />,
        tabBarLabel: 'Profile',
      }} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
