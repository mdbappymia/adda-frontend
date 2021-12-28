/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, Alert} from 'react-native';
import {Button, TouchableRipple} from 'react-native-paper';
import useStore from '../../hooks/useStore';

const AddPost = () => {
  const [postText, setPostText] = useState('');
  const {user, posts, setPosts, profileUser} = useStore();
  const onSubmitPost = () => {
    if (!postText) {
      Alert.alert('Post text should not empty');
      return;
    }
    const date = new Date();
    const post = {
      name: user.displayName,
      email: user.email,
      postText,
      like: 0,
      comment: [],
      date,
      photoURL: profileUser.photoURL,
    };
    fetch('http://192.168.43.64:5000/posts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.acknowledged) {
          Alert.alert('Post successfully');
          setPostText('');
          setPosts([{_id: result.insertedId, ...post}, ...posts]);
        }
      });
  };

  return (
    <View style={{marginTop: 30}}>
      <TextInput
        multiline={true}
        numberOfLines={4}
        value={postText}
        style={{
          height: 80,
          borderColor: 'gray',
          borderWidth: 1,
          textAlignVertical: 'top',
          marginBottom: 10,
        }}
        onChangeText={text => setPostText(text)}
        placeholder="You can type in me"
      />
      <View style={{width: 90}}>
        <TouchableRipple
          onPress={() => console.log('Pressed')}
          rippleColor="rgba(0, 0, 0, .32)">
          <Button onPress={onSubmitPost} mode="outlined">
            Post
          </Button>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default AddPost;
