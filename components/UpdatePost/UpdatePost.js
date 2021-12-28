/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import useStore from '../../hooks/useStore';

const UpdatePost = ({postText, setUpdateShow, _id}) => {
  const [updateText, setUpdateText] = useState('');
  const {posts, setPosts} = useStore();
  const handleUpdatePost = (id, updateText) => {
    if (!updateText) {
      return;
    }
    fetch(`http://192.168.43.64:5000/posts/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({updateText}),
    })
      .then(res => res.json())
      .then(result => {
        const updatePosts = [];
        for (let post of posts) {
          if (post._id === id) {
            post.postText = updateText;
          }
          updatePosts.push(post);
        }
        setPosts(updatePosts);
        Alert.alert('Post update successfully');
      });
  };
  return (
    <View>
      <View style={{zIndex: 1, flexDirection: 'row'}}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          defaultValue={postText}
          style={{
            height: 100,
            width: 320,
            borderWidth: 1,
            textAlignVertical: 'top',
            backgroundColor: 'white',
            marginBottom: 10,
          }}
          onChangeText={text => {
            setUpdateText(text);
          }}
          placeholder="You can type in me"
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          onPress={() => {
            handleUpdatePost(_id, updateText);
            setUpdateShow(false);
          }}
          mode="contained">
          Update
        </Button>
        <Button
          onPress={() => setUpdateShow(false)}
          color="red"
          mode="contained">
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default UpdatePost;
