/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, ScrollView, Alert, View} from 'react-native';
import {ActivityIndicator, Avatar, Button, TextInput} from 'react-native-paper';
import useStore from '../../hooks/useStore';
import SinglePost from '../SinglePost/SinglePost';

const UserProfile = () => {
  const {user, profileUser, setProfileUser, posts} = useStore();
  const [isEdit, setIsEdit] = useState(false);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  // const [userPosts, setUserPosts] = useState([]);

  // Profile update
  const handleUpdateProfile = () => {
    const updateUser = {
      address: address || profileUser.address,
      phoneNumber: phoneNumber || profileUser.phoneNumber,
      aboutMe: aboutMe || profileUser.aboutMe,
      photoURL: photoURL || profileUser.photoURL,
    };
    if (!address && !phoneNumber && !aboutMe && !photoURL) {
      setIsEdit(false);
      return;
    }
    fetch('http://192.168.43.64:5000/users', {
      method: 'PUT',
      headers: {
        email: user.email,
        'content-type': 'application/json',
      },
      body: JSON.stringify(updateUser),
    })
      .then(res => res.json())
      .then(result => {
        if (result.acknowledged) {
          setProfileUser(updateUser);
          setIsEdit(false);
          Alert.alert('Profile update successfully');
        }
      });
  };

  // posts filter by user email
  const userPosts = posts.filter(post => post.email === user.email);

  if (!user?.email && !profileUser?.email) {
    return (
      <ActivityIndicator
        style={{justifyContent: 'center', marginTop: 20}}
        size="large"
      />
    );
  }
  return (
    <ScrollView style={{padding: 12, marginBottom: 10}}>
      <View style={{alignItems: 'center'}}>
        <Avatar.Image
          size={44}
          source={{
            uri:
              profileUser.photoURL ||
              'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
          }}
        />
        <Text style={{fontWeight: 'bold', fontSize: 25, color: '#D11F0D'}}>
          {user.displayName}
        </Text>
        <Text style={{borderWidth: 1, padding: 10, borderRadius: 3}}>
          {profileUser.aboutMe || 'none'}
        </Text>
        <Text>Address: {profileUser.address || 'none'}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Phone: {profileUser.phoneNumber || 'none'}</Text>
        <Button onPress={() => setIsEdit(!isEdit)}>Edit</Button>
      </View>

      {isEdit && (
        <ScrollView>
          <TextInput
            mode="outlined"
            label="About"
            multiline={true}
            numberOfLines={2}
            onChangeText={text => setAboutMe(text)}
          />
          <TextInput
            mode="outlined"
            label="Address"
            multiline={true}
            numberOfLines={2}
            onChangeText={text => setAddress(text)}
          />
          <TextInput
            mode="outlined"
            label="Phone"
            multiline={true}
            numberOfLines={2}
            onChangeText={text => setPhoneNumber(text)}
          />
          <TextInput
            mode="outlined"
            label="Photo url"
            numberOfLines={2}
            onChangeText={text => setPhotoURL(text)}
          />
          <Button
            style={{marginTop: 10}}
            mode="contained"
            onPress={() => handleUpdateProfile()}>
            Update
          </Button>
        </ScrollView>
      )}
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          padding: 10,
          marginBottom: 10,
          borderBottomWidth: 1,
        }}>
        My all post
      </Text>
      {!userPosts.length && (
        <Text style={{textAlign: 'center', color: 'red', margin: 20}}>
          No post yet
        </Text>
      )}
      {userPosts.map(post => (
        <SinglePost key={post._id} post={post} />
      ))}
    </ScrollView>
  );
};

export default UserProfile;
