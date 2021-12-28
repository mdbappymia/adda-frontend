/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {View} from 'react-native';
import {ActivityIndicator, Button, Text, TextInput} from 'react-native-paper';
import useStore from '../../hooks/useStore';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const {signInUsingEmailAndPassword, initializing} = useStore();
  const handleSignIn = () => {
    signInUsingEmailAndPassword(email, password, navigation);
  };

  if (initializing) {
    return (
      <ActivityIndicator
        style={{justifyContent: 'center', marginTop: 20}}
        size="large"
      />
    );
  }
  return (
    <View style={{padding: 12}}>
      {initializing && <Text>Loading</Text>}
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        textContentType="emailAddress"
        style={{marginBottom: 20}}
        label="Email"
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        label="Password"
        secureTextEntry={!showPass}
        right={
          <TextInput.Icon onPress={() => setShowPass(!showPass)} name="eye" />
        }
      />
      <Button
        onPress={handleSignIn}
        style={{
          textAlign: 'center',
          margin: 10,
          backgroundColor: 'blue',
          color: '#FFF',
          fontWeight: '900',
        }}
        mode="contained">
        Login
      </Button>
    </View>
  );
};

export default Login;
