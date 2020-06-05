import {createSlice} from '@reduxjs/toolkit'
import { useHistory } from 'react-router'


/*const initialMessages = [
    { id: 1, text: 'Watch video on actions & reducers', author: 11 },
    { id: 2, text: 'Follow redux codealong', author: 12 },
    { id: 3, text: 'Fork weekly assignment', author: 13 },
    { id: 4, text: 'Create a todo app', author: 14 },
]*/
export const messages = createSlice({
    name: 'messages',
    initialState: {
        messages: []
    },
    reducers: { 

        showMessages: (state, action) => {
            state.messages = action.payload
        },

        addMessage: (state, action) => {
            state.messages = action.payload
        },

        toggleMarkAsRead: (state, action) => {
            const foundItem = state.messages.find((message) => message._id === action.payload)

            if (foundItem) {
                foundItem.read = !foundItem.read
            }
        },

        deletedMessage: (state, action) => {
            state.messages = state.messages.filter((message) => message._id !== action.payload)
        },
        

        editMessage: (state, action) => {
            const foundItem = state.messages.find((message) => message._id === action.payload._id)
            console.log("inside editMessage" + foundItem)
            console.log("inside editMessage" + action.payload._id)
            console.log(action.payload)

            if (foundItem) {
                foundItem.message = action.payload.message
            }
        },

    }
});

/*fetch(backendUrl+'/secrets', {
      method: 'GET',
      headers: { 'Authorization': accessToken }
    })*/
export const fetchMessages = (accessToken) => {
    return dispatch => { 
        fetch(`http://localhost:8000/messages`, { 
            method: 'GET',
            headers: { 'Authorization': accessToken}
    })
            .then (res => res.json())
            .then (json => {
                console.log(json)
                    dispatch(messages.actions.showMessages(json))
            }); 
}}


export const postNewMessage = (author, message, accessToken) => {
    return dispatch => {
        fetch(`http://localhost:8000/messages`, { 
        method: 'POST',
        body: JSON.stringify({author, message}),
        headers: { 'Content-Type': 'application/json', 'Authorization': accessToken}
    })
    
    .then(() => {
        return dispatch(messages.actions.addMessage(message));
    });

    fetch(`http://localhost:8000/messages`, { 
        method: 'GET',
        headers: { 'Authorization': accessToken}
    })
			.then((res) => res.json())
			.then((json) => {
				dispatch(messages.actions.showMessages(json));
			});
    }}

    
export const updateMessage = (_id, newMessage, accessToken, userId) => {
    console.log("inside update")
    return dispatch => {
        fetch(`http://localhost:8000/messages/${_id}`, {
        method: 'PUT',
        body: JSON.stringify({ message: newMessage }),
        headers: { 'Content-Type': 'application/json', 'Authorization': accessToken, 'userId': userId}
        })
        .then(() => {
            console.log("update")
            return dispatch(messages.actions.editMessage({'_id': _id, 'message': newMessage}));  
        })
    }
}

    export const  deleteMessage = (_id) => {
        console.log("inside delete") 
        console.log(_id) 
        return dispatch => {
            fetch(`http://localhost:8000/messages/${_id}`, {
                method: 'DELETE',
                body: JSON.stringify({ _id }),
                headers: { 'Content-Type': 'application/json'}
            })
          .then(() => {
            console.log("delete")
            return dispatch(messages.actions.deletedMessage(_id));
          });
        };
    };

    export const openModal = (props) => {
        console.log("inside modal")
        return dispatch => (messages.actions.modalIsOpen);
    }

    export const signIn = (userName, password) => {
        return dispatch => {
            fetch(`http://localhost:8000/users`, {
            method: 'POST',
            body: JSON.stringify({ userName: userName, password: password }),
            headers: { 'Content-Type': 'application/json' }
        })

        .then(() => {
            console.log("inside signIn POST")
           // return dispatch(messages.actions.deletedMessage());
          });
           // .then(res => res.json())
            //.then(user => {
            //console.log(user)
              //  if (user.message) {
                // setErrorMsg(user.message)
                //} else {
                // window.localStorage.setItem('userId', user.userId)
                // window.localStorage.setItem('accessToken', user.accessToken)
                // onAuthenticate(user.accessToken) 
                //history.push('/Welcome')
               // }
           // })
           // .catch(err => console.log('error:', err))
    }};
   
    export const logIn = (userName, password) => {
        
        return dispatch => {
                fetch(`http://localhost:8000/sessions`, {
                  method: 'POST',
                  body: JSON.stringify({ userName: userName, password: password  }),
                  headers: { 'Content-Type': 'application/json' }
                })
                /*.then((res) => res.json())
			.then((json) => {
				dispatch(messages.actions.showMessages(json));
			});*/
            
                  .then((res) => res.json()) 
                 .then((json) => {
                   console.log(json)
                      if (json.notFound) {
                          console.log('login failed')
                       // setErrorMsg(user.message)
                      } else {
                          console.log('login successful: ' + json.accessToken)
                        window.localStorage.setItem('userId', json.userId)
                        window.localStorage.setItem('accessToken', json.accessToken)
                        window.location.href="/messages"
                       // onAuthenticate(user.accessToken)
                        

                        
                      }
            
                  })
                  .catch(err => console.log('error:', err))
             // }
        }
    }
    