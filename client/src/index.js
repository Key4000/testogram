import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createContext } from 'react'
import UserStore from "./store/UserStore"
import PublicationStore from "./store/PublicationStore"
import SubscriptionStore from "./store/SubscriptionStore"
import SubscriberStore from "./store/SubscriberStore"



export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      publication: new PublicationStore(),
      subscription: new SubscriptionStore(),
      subscriber: new SubscriberStore()
    }}>
    <App />
  </Context.Provider>
);