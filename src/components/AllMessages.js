import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import Modal from 'react-modal'
import {messages} from '../reducers/messages'
import { deleteMessage } from '../reducers/messages'
import { updateMessage } from '../reducers/messages'
import { fetchMessages } from '../reducers/messages'
import { openModal } from '../reducers/messages'



export const AllMessages = () => {
    const dispatch = useDispatch()
    const allMessages = useSelector((state) =>state.messages.messages)
    const [newMessage, setnewMessage] = useState ('')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessageId, setModalMessageId] = useState('');

    const accessToken = window.localStorage.getItem('accessToken')
    const userId = window.localStorage.getItem('userId')
   
    useEffect(() => {
     
      console.log("Access token from localStorage: " + accessToken)
      console.log("allMessages about to fetch messages " + accessToken)
      dispatch(fetchMessages(accessToken));
      console.log(allMessages)
    }, []);

    const handleEditOnClick = (event) => {
        event.preventDefault()
        dispatch(updateMessage(event.target.value, ''))
        console.log("updateMessage: Texten är tom sträng")
      }

    const handleDeleteOnClick = (event) => {
        event.preventDefault()
        dispatch(deleteMessage(event.target.value))
      }

      const handleOpen = (event) => {
        event.preventDefault()
        setModalIsOpen(true)
        setModalMessageId(event.target.value)
        setnewMessage(event.target.title)
        console.log(event.target)
        console.log("inside handleOpen")
        
    }

    const handleClose = (event) => {
      event.preventDefault()
      dispatch(updateMessage(event.target.value, newMessage, accessToken, userId))
      console.log("inside handleClose")
      setModalIsOpen(false)
      setnewMessage('')
    }

    return (
     <> 
   
    <ul> 
    {allMessages.map((message)=> (
        <div className="allMessages">
            <li key={message._id}> 
                <p className="message-text">{message.message}</p>
                <div className="input-buttons-container">
                    <div className="delete-edit-btn-container">
                      <button value={message._id} title={message.message} className="edit-btn" type="button" onClick={handleOpen}>Edit</button>
                      <button value={message._id} className="edit-btn" type="button" onClick={handleEditOnClick}>Clear Message</button> 
                      <button value={message._id} className="delete-btn" type="button" onClick={handleDeleteOnClick}>Delete</button> 
                    </div>
                </div> 
            </li>
        </div>
    ))}
  </ul>
  <Modal isOpen={modalIsOpen} className="modalContainer">
    <div className="modal">
      <p>Edit your message</p>
      <form className="form">
      <input  value={newMessage} rows="3" minLength="5" maxLength="140" required className="inputField" onChange={(event) => { setnewMessage(event.target.value); console.log("event onChange: Texten är " + event.target.value) }} />
      <button value={modalMessageId} className="send-btn" type="button" onClick={handleClose}>Ok</button>
      </form>
      </div>
  </Modal> 
  </>
    );
}
