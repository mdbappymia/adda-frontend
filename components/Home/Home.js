/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import useStore from '../../hooks/useStore';
import AddPost from '../AddPost/AddPost';
import AllPost from '../AllPost/AllPost';
import AppBar from '../AppBar/AppBar';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const Home = () => {
  const {user, initializing} = useStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
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
      <AppBar />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{
          paddingLeft: 12,
          paddingRight: 12,
          marginBottom: 60,
          zIndex: -1,
        }}>
        {user.email ? (
          <AddPost />
        ) : (
          <Text style={{fontSize: 30, textAlign: 'center'}}>Please Login</Text>
        )}

        <AllPost />
      </ScrollView>
    </View>
  );
};

export default Home;
