/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import useStore from '../../hooks/useStore';

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const {registerWithEmailAndPassword, initializing} = useStore();

  const handleRegister = () => {
    registerWithEmailAndPassword(email, password, name, navigation);
    console.log('press');
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
    <View>
      <View style={{padding: 12}}>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          style={{marginBottom: 20}}
          label="Name"
        />
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
          onPress={handleRegister}
          style={{
            textAlign: 'center',
            margin: 10,
            backgroundColor: 'blue',
            color: '#FFF',
            fontWeight: '900',
            marginTop: 20,
          }}
          mode="contained">
          Register
        </Button>
      </View>
    </View>
  );
};

export default Register;
