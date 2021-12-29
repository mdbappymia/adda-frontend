/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import useStore from '../../hooks/useStore';
import SinglePost from '../SinglePost/SinglePost';

const AllPost = () => {
  const {posts, renderPost} = useStore();

  return (
    <View style={{marginTop: 10}}>
      {!renderPost.length && (
        <Text style={{textAlign: 'center'}}>Not Found</Text>
      )}
      {posts.length > 0 && (
        <FlatList
          style={{height: '72%'}}
          data={renderPost}
          renderItem={({item}) => <SinglePost key={item._id} post={item} />}
          keyExtractor={post => post._id.toString()}
        />
      )}
    </View>
  );
};

export default AllPost;
