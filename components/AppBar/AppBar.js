/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Searchbar, Text, TouchableRipple} from 'react-native-paper';
import {View} from 'react-native';
import useStore from '../../hooks/useStore';

const AppBar = () => {
  const navigation = useNavigation();
  const [submenuShow, setSubmenuShow] = useState(false);
  const {logOut, user} = useStore();
  return (
    <View>
      <Appbar.Header>
        <Appbar.Action
          icon="home"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
        <View>
          <Searchbar
            style={{width: 200, height: 45, margin: 0, padding: 0}}
            placeholder="Search"
          />
        </View>
        <Appbar.Action icon="message" onPress={() => {}} />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => {
            setSubmenuShow(!submenuShow);
          }}
        />
      </Appbar.Header>
      {/* submenu  */}
      {submenuShow && (
        <View
          style={{
            position: 'absolute',
            top: 60,
            right: 0,
            backgroundColor: 'blue',
            zIndex: 9,
          }}>
          {user?.email ? (
            <View>
              <TouchableRipple
                onPress={() => navigation.navigate('Profile')}
                rippleColor="rgba(0, 0, 0, .32)">
                <Text style={{color: 'white', padding: 10}}>
                  {user.displayName}
                </Text>
              </TouchableRipple>
              <TouchableRipple
                onPress={logOut}
                rippleColor="rgba(0, 0, 0, .32)">
                <Text style={{color: 'white', padding: 10}}>Logout</Text>
              </TouchableRipple>
            </View>
          ) : (
            <View>
              <TouchableRipple
                onPress={() => navigation.navigate('Login')}
                rippleColor="rgba(0, 0, 0, .32)">
                <Text style={{color: 'white', padding: 10}}>Login</Text>
              </TouchableRipple>
              <TouchableRipple
                onPress={() => navigation.navigate('Register')}
                rippleColor="rgba(0, 0, 0, .32)">
                <Text style={{color: 'white', padding: 10}}>Register</Text>
              </TouchableRipple>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default AppBar;
