import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {messages} from '../reducers/messages'
import { postNewMessage } from '../reducers/messages'
import { fetchMessages } from '../reducers/messages'




export const PostMessage = () => {
    const [message, setMessage] = useState ('')
    const [author, setAuthor] = useState ('')
    const [authStatus, setAuthStatus] = useState('')
    const [secret, setSecret] = useState('')

    const accessToken = window.localStorage.getItem('accessToken')
    const userId = window.localStorage.getItem('userId')
    console.log("Access token from localStorage: " + accessToken)
    const dispatch = useDispatch()
    
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(postNewMessage(userId, message, accessToken))
        dispatch(fetchMessages(accessToken));
        setMessage('')
        setAuthor('')
      }
    

    return (
        <div>
            <header className="App-header">
            </header>
            <button className='logIn-Out-Btn' onClick={() => (
           window.localStorage.removeItem('accessToken'),
           window.location.href = "/"
           )} type="button"> Log Out </button>
            <form onSubmit={handleSubmit} className="formBackground" >
           
                <article className="formContainer">
               
                    <h1>MESSAGE BOARD</h1>
                    <div className="inputContainer" >
                         <input value={author}  rows="1"  required placeholder='Password' className="inputField" onChange={(event) => { setAuthor(event.target.value); console.log("event onChange: author är " + event.target.value) }} /><br /> 
                        <input  value={message} rows="3" minLength="5" maxLength="140" required placeholder='Your message' className="inputField" onChange={(event) => { setMessage(event.target.value); console.log("event onChange: Texten är " + event.target.value) }} /><br />
                        <button className="submit-btn" type="submit">Send Message</button>
                    </div>
                </article>
            </form>
        </div>
    );
}