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

    const handleFormSubmit = event => {
      event.preventDefault()
      dispatch(logIn (userName, password))
      setUserName('')
      setPassword('')

    }

  

    return (
      <div>
        <h1>WELCOME TO MESSAGE-BOARD</h1>
        <p>Please log in below</p>
      
      <div className="logIn">
        
        <form className='logInForm' onSubmit={handleFormSubmit}>
        <input 
            value={userName}
            placeholder='Username' 
            type='name'
            name='name'
            onChange={event => { setUserName(event.target.value) }} 
            required>
        </input>
        <input value={password}
          placeholder='Password' 
          type='password'
          name='password'
          onChange={event => { setPassword(event.target.value) }} 
          required>
        </input>
        <button className="signInButton"onClick={handleFormSubmit} type="submit">Log in</button>
        </form>
      </div>
      <section className="backLink"> 
        <button onClick={() => history.goBack()} className="backLink">
          Back
        </button>
      </section> 
      </div>
      
      
    );
};