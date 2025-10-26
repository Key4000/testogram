import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createContext } from 'react'
import UserStore from "./store/UserStore"
import SubStore from "./store/SubStore"
import PostStore from "./store/PostStore"



export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Context.Provider
    value={{
      user: new UserStore(),
      sub: new SubStore(),
      post: new PostStore()
    }}>
    <App/>
  </Context.Provider>
  </StrictMode>
);