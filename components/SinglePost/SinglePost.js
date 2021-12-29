/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Paragraph,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import useStore from '../../hooks/useStore';
import UpdatePost from '../UpdatePost/UpdatePost';

const SinglePost = ({post}) => {
  const {user, posts, setPosts, getSingleUserByEmail} = useStore();
  const [show, setShow] = useState(false);
  const [more, setMore] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [postUser, setPostUser] = useState({});

  const {_id, name, postText, date, like, comment, email} = post;
  const displayDate = new Date(date);

  useEffect(() => {
    getSingleUserByEmail(email, setPostUser);
  }, [getSingleUserByEmail, email]);
  // delete post
  const handleDeletePost = id => {
    fetch(`http://192.168.43.64:5000/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(result => {
        if (result.acknowledged) {
          const remainingPost = posts.filter(item => item._id !== id);
          setPosts(remainingPost);
          Alert.alert('Post delete successfully');
        }
      });
  };
  // handle like function

  let isLike = like.find(item => item === user.email);
  const handleLike = id => {
    let likes = [...like];
    for (let newPost of posts) {
      if (newPost._id === id) {
        if (newPost.like.length) {
          const isFindEmail = newPost.like.find(item => item === user.email);
          if (isFindEmail) {
            likes = newPost.like.filter(item => item !== user.email);
          } else {
            likes.push(user.email);
          }
        } else {
          likes.push(user.email);
          console.log('hello');
        }
        newPost.like = likes;
      }
    }

    fetch(`http://192.168.43.64:5000/likes/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(likes),
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        if (result.acknowledged) {
          let updatePost = [];
          for (let applyPost of posts) {
            if (applyPost._id === id) {
              applyPost.like = likes;
            }
            updatePost.push(applyPost);
          }
          setPosts(updatePost);
        }
      });
  };
  return (
    <View>
      <Card style={{marginBottom: 20, zIndex: -1}}>
        <Card.Content style={{zIndex: -1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Avatar.Image
                size={24}
                style={{marginTop: 5}}
                source={{
                  uri:
                    postUser.photoURL ||
                    'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                }}
              />

              <Title style={{marginLeft: 10, fontSize: 14}}>{name}</Title>
            </View>
            {user.email === email && (
              <TouchableRipple
                style={{height: 25, width: 25}}
                onPress={() => setShow(!show)}
                rippleColor="rgba(0, 0, 0, .32)">
                <Avatar.Icon size={24} icon="dots-horizontal" />
              </TouchableRipple>
            )}
            {show && (
              <View
                style={{
                  position: 'absolute',
                  top: 35,
                  right: 0,
                  backgroundColor: 'red',
                  zIndex: 1,
                }}>
                <TouchableRipple
                  style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                  onPress={() => handleDeletePost(_id)}
                  rippleColor="rgba(0, 0, 0, .32)">
                  <Text style={{color: 'white'}}>Delete</Text>
                </TouchableRipple>
                <TouchableRipple
                  style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                  onPress={() => {
                    setUpdateShow(true);
                    setShow(false);
                  }}
                  rippleColor="rgba(0, 0, 0, .32)">
                  <Text style={{color: 'white'}}>Update</Text>
                </TouchableRipple>
              </View>
            )}
          </View>
          <Text
            style={{
              borderBottomWidth: 0.3,
              borderBottomColor: 'lightgray',
              paddingBottom: 5,
              marginBottom: 10,
              fontSize: 10,
            }}>
            {displayDate.toDateString()}
          </Text>
          <Paragraph>{!more ? postText.slice(0, 200) : postText}</Paragraph>
          {postText.length > 200 && (
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableRipple
                onPress={() => console.log('Pressed')}
                rippleColor="rgba(0, 0, 0, .32)">
                <Text
                  onPress={() => setMore(!more)}
                  style={{padding: 10, color: 'salmon'}}>
                  See {more ? 'less' : 'more...'}
                </Text>
              </TouchableRipple>
            </View>
          )}
        </Card.Content>
        {user.email && (
          <View style={{flexDirection: 'row'}}>
            <TouchableRipple
              onPress={() => {}}
              rippleColor="rgba(0, 0, 0, .32)">
              <Button onPress={() => handleLike(_id)}>
                {like?.length} {isLike ? 'Unlike' : 'Like'}
              </Button>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {}}
              rippleColor="rgba(0, 0, 0, .32)">
              <Button>{comment.length} Comment</Button>
            </TouchableRipple>
          </View>
        )}
        {updateShow && (
          <View style={{position: 'absolute', top: 0, zIndex: 99}}>
            <UpdatePost
              setUpdateShow={setUpdateShow}
              postText={postText}
              _id={_id}
            />
          </View>
        )}
      </Card>
    </View>
  );
};

export default SinglePost;
