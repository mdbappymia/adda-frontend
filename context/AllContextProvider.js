import React, {createContext} from 'react';
import useData from '../hooks/useData';
import useFirebase from '../hooks/useFirebase';

export const MyContext = createContext();
const AllContextProvider = ({children}) => {
  const authContext = useFirebase();
  const dataContext = useData();
  const allContextValue = {...authContext, ...dataContext};
  return (
    <MyContext.Provider value={allContextValue}>{children}</MyContext.Provider>
  );
};

export default AllContextProvider;
