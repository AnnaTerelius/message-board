import React from 'react';
import {Provider} from 'react-redux';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { PostMessage } from './components/PostMessage';
import { AllMessages } from './components/AllMessages';
import { LogIn } from './components/LogIn';
import { SignUp } from './components/SignUp'
import { TestModal } from './components/TestModal';
import {messages} from './reducers/messages'
import logo from './logo.svg';
import './App.css';

const reducer = combineReducers({
  messages: messages.reducer
})

const store = configureStore({ reducer: reducer })

export const App = (props) => ( 
  <Provider  store={store}>
    <div className="App">
      <div id="background-wrap">
        <div class="bubble x1"></div>
        <div class="bubble x2"></div>
        <div class="bubble x3"></div>
        <div class="bubble x4"></div>
        <div class="bubble x5"></div>
        <div class="bubble x6"></div>
        <div class="bubble x7"></div>
        <div class="bubble x8"></div>
        <div class="bubble x9"></div>
        <div class="bubble x10"></div>
      </div>
      
      <div className='backgroundContainer'>
       <PostMessage/>
       <AllMessages/>
       <SignUp/>
       <LogIn/>
      
      </div>
  
    </div>
  </Provider>
  );



