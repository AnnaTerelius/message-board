import React, {useState} from 'react'
import Modal from 'react-modal'
import {useDispatch} from 'react-redux'
import { logIn } from '../reducers/messages'
import { useHistory } from 'react-router'

//const URL = 'https://api-project-yoga-poses.herokuapp.com/sessions'
const URL = 'https://localhost:8000/messages'



export const LogIn = () => {
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)

    const history = useHistory()
   // const getToken = async () => {
    const handleFormSubmit  = async event => {
      event.preventDefault()
      await dispatch(logIn (userName, password))
      setUserName('')
      setPassword('')
      //history.push('/messages')

    }

  

    return (
      <div className="formBackground">
          <section className="backLink"> 
        <button className="logIn-Out-Btn" onClick={() => history.goBack()}>
          Sign up
        </button>
      </section> 
        <h1>WELCOME TO MESSAGE-BOARD</h1>
        <p>Please log in</p>
      
      <div className="logIn">
        
        <form className='logInForm' onSubmit={handleFormSubmit}>
        <input 
            className="inputField"
            value={userName}
            placeholder='Username' 
            type='name'
            name='name'
            onChange={event => { setUserName(event.target.value) }} 
            required>
        </input>
        <input 
          className="inputField"
          value={password}
          placeholder='Password' 
          type='password'
          name='password'
          onChange={event => { setPassword(event.target.value) }} 
          required>
        </input>
        <button className="submit-btn"onClick={handleFormSubmit} type="submit">Log in</button>
        </form>
      </div>
    
      </div>
      
      
      
    );
};