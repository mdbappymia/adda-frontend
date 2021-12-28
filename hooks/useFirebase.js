/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */

import auth, {firebase} from '@react-native-firebase/auth';

import {useEffect, useState} from 'react';

const useFirebase = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({});
  const [profileUser, setProfileUser] = useState({});

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      setUser(user);
    } else {
      setUser({});
    }
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // register user
  const registerWithEmailAndPassword = (email, password, name, navigation) => {
    setInitializing(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.updateProfile({displayName: name})
          .then(() => {
            setUser({email: email, displayName: name});
            saveUserToDatabase(email, name);
            navigation.navigate('Home');
          });
        console.log('User account created & signed in!');
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setInitializing(false));
  };
  // sign in user email and password
  const signInUsingEmailAndPassword = (email, password, navigation) => {
    setInitializing(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Home');
      })
      .catch(error => console.log(error))
      .finally(() => setInitializing(false));
  };
  // sign out
  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        setInitializing(false);
      });
  };
  // save user to database
  const saveUserToDatabase = (email, name) => {
    fetch('http://192.168.43.64:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({email, name, photoURL: user.photoURL || ''}),
    });
  };
  // get a single profile user data
  // get single user
  useEffect(() => {
    fetch(`http://192.168.43.64:5000/users/${user.email}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setProfileUser(data));
  }, [user.email]);
  return {
    registerWithEmailAndPassword,
    signInUsingEmailAndPassword,
    logOut,
    initializing,
    user,
    setUser,
    profileUser,
    setProfileUser,
  };
};

export default useFirebase;
