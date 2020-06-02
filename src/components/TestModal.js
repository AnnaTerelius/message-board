import React, {useState} from 'react'
import Modal from 'react-modal'
import {useDispatch} from 'react-redux'
import { openModal } from '../reducers/messages'


export const TestModal = () => {
    const dispatch = useDispatch()
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    
const handleOpen =(event) => {
    event.preventDefault()
    setModalIsOpen(true)
    console.log("inside handleOpen")
   
}



    return (
      <div className="modal">
      <button type="button" onClick={handleOpen}>Open Modal</button>
        <Modal isOpen={modalIsOpen} className="modal">
      
          <h2>Hello</h2>
          <div>I am a modal</div>
          <form>
            <input />
            <button onClick={() => setModalIsOpen(false) }>close modal</button>
          </form>
      </Modal>
      </div>
      
      
    );
};
