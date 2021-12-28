import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import Main from './components/Main/Main';
import AllContextProvider from './context/AllContextProvider';

const App = () => {
  return (
    <AllContextProvider>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </AllContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
