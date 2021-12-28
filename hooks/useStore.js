import {useContext} from 'react';
import {MyContext} from '../context/AllContextProvider';

const useStore = () => {
  return useContext(MyContext);
};

export default useStore;
