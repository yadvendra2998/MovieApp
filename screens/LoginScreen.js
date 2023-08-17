import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = ({ navigation }) => {
  const [text, onChangeText] = useState("");
  const [password, onChangePassword] = useState("");

  const LoginUser = async () => {
    try {
      if (text === null) return;
      if (text && password.length > 5) {
        const userJson = await AsyncStorage.getItem('user');
        const user = userJson != null ? JSON.parse(userJson) : null;
        console.log(user);
        
        navigation.navigate('Main', {screen:'HomeTab', params: { username: text } });
      } else {
        navigation.navigate('Register');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ color: '#000', fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>Login</Text>
        <TextInput

          value={text}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder='Username'
          placeholderTextColor="gray"
        />
        <TextInput
          value={password}
          onChangeText={onChangePassword}
          style={styles.input}
          secureTextEntry={true}
          placeholder='Password'
          placeholderTextColor="gray"
        />
        <TouchableOpacity style={styles.button} onPress={LoginUser}>
          <Text style={{ fontWeight: '700', fontSize: 20 }}>Login</Text>
        </TouchableOpacity>
        <View style={styles.navigate}>
          <Text style={styles.text}>New member? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          ><Text style={{ color: 'blue' }}>Register</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  text: {
    color: '#000',
  },
  input: {
    width: '90%',
    marginHorizontal: 10,
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 20,
    color: '#000',
  },
  button: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#303675',
    borderRadius: 5,
    marginBottom: 10,
  },
  navigate: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})