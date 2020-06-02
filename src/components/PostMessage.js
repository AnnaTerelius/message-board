import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {messages} from '../reducers/messages'
import { postNewMessage } from '../reducers/messages'
import { fetchMessages } from '../reducers/messages'




export const PostMessage = () => {
    const [message, setMessage] = useState ('')
    const [author, setAuthor] = useState ('')
    const dispatch = useDispatch()
    
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(postNewMessage(author, message))
        dispatch(fetchMessages());
        setMessage('')
        setAuthor('')
      }
    

    return (
        <div>
            <header className="App-header">
            </header>
            <form onSubmit={handleSubmit} className="formBackground" >
                <article className="formContainer">
                    <h1>MESSAGE BOARD</h1>
                    <p>Please type in your password and your message below</p>
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