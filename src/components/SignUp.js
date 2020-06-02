import React, {useState} from 'react'
import Modal from 'react-modal'
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router'
import { signIn } from '../reducers/messages'

//const URL = 'https://api-project-yoga-poses.herokuapp.com/sessions'
const URL = 'https://localhost:8000/messages'



export const SignUp = () => {
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    

    const history = useHistory()

    const handleFormSubmit = event => {
      event.preventDefault()
      dispatch(signIn (userName, password))
      setUserName('')
      setPassword('')

    }

    return (
      <div>
        <h1>WELCOME TO MESSAGE-BOARD</h1>
        <p>Please sign up below</p>
      
      <div className="logIn">
        
        <form className='logInForm' onSubmit={handleFormSubmit}>
        <input 
            value={userName}
            placeholder='Username' 
            type='name'
            name='name'
            onChange={event => { setUserName(event.target.value); console.log("event onChange: username är " + event.target.value) }} 
            required>
        </input>
        <input 
          value={password}
          placeholder='Password' 
          type='password'
          name='password'
          onChange={event => { setPassword(event.target.value); console.log("event onChange: password är " + event.target.value) }} 
          required>
        </input>
        <button className="signUpButton"onClick={handleFormSubmit} type="submit">Sign up</button>
        </form>
      </div>
      </div>
      
      
    );
};