/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import useStore from '../../hooks/useStore';
import SinglePost from '../SinglePost/SinglePost';

const AllPost = () => {
  const {posts} = useStore();

  return (
    <View style={{marginTop: 10}}>
      {posts.map((post, index) => (
        <SinglePost key={post._id || index} post={post} />
      ))}
    </View>
  );
};

export default AllPost;
