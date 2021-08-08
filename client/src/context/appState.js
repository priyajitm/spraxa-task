import React, { createContext, useReducer } from 'react';
import AppReducer from './appReducer';
import axios from 'axios';

const initialState = {
  users: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  
  // Store Data

  const storeData = async (data) => {
    await axios.post('/adduser', data)
    dispatch({
        type: 'USER_DATA',
        payload: [data],
      });
  }


  // Fetch Data

  const getData = async () => {
      const res = await axios.get('/getusers')
      dispatch({
        type: 'GET_DATA',
        payload: res.data,
      });
  }


  // Delete Data

  const deleteData = async (email, newData) => {
      await axios.post(`/deleteuser/${email}`)
      dispatch({
        type: 'DELETE_DATA',
        payload: newData,
      });
  }

  

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        error: state.error,
        storeData,
        deleteData,
        getData
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};