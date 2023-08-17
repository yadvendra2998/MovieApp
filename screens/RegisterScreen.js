import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';



const RegisterScreen = ({ navigation }) => {
  const [text, onChangeText] = useState("");
  const [email, onChangeEmail] = useState("");
  const [phone, onChangePhone] = useState("");
  const [password, onChangePassword] = useState("");
  const [cpassword, onChangeCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const RegisterUser = async () => {
    try {
      setIsLoading(true);
      if (text && email && phone && password && cpassword === null) return;
      if (password.length > 5 && cpassword === password) {
        const userData = {
          username: text,
          email: email,
          phone: phone,
          password: password,
        };
        const jsonValue = JSON.stringify(userData);
        await AsyncStorage.setItem('user', jsonValue);
        const user = JSON.parse(jsonValue);
        setIsLoading(false)
        // const user = userJson != null ? JSON.parse(userJson) : null;
        navigation.navigate('Home', { username:text });
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ color: '#000', fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>Register</Text>
        <TextInput
          value={text}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder='Username'
          placeholderTextColor="gray"
        />
        <TextInput
          value={email}
          onChangeText={onChangeEmail}
          style={styles.input}
          placeholder='Email'
          placeholderTextColor="gray"
        />
        <TextInput
          value={phone}
          onChangeText={onChangePhone}
          style={styles.input}
          placeholder='Phone No.'
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
        <TextInput
          value={cpassword}
          onChangeText={onChangeCPassword}
          style={styles.input}
          secureTextEntry={true}
          placeholder='Confirm Password'
          placeholderTextColor="gray"
        />
        <TouchableOpacity style={styles.button} onPress={RegisterUser}>
          {isLoading ? (
          <Text style={{ fontWeight: '700', fontSize: 20 }}>Loading...</Text>
          ):(
          <Text style={{ fontWeight: '700', fontSize: 20 }}>Register</Text>)}
      </TouchableOpacity>
        <View style={styles.navigate}>
          <Text style={styles.text}>Already a member? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
          ><Text style={{ color: 'blue' }}>Login</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
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