import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './components/message';
import './App.css';
import db from './firebase';
import firebase, { firestore } from 'firebase'; // importing from the actual module
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send'; // icon of the send button
import { IconButton } from '@material-ui/core'; // material UI tag to wrap the button inside
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import swal from 'sweetalert';




function App() {
  // setting the value for input field and messages, so that later messages can store the input value using setMessages
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // ask to input something on prompt when the "App" loads and assign that value to "username"
  useEffect(() => {
    setUsername(prompt("Enter your name"))
  }, []) //condition


  // call this function as soon as the submit button clicked
  const SendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      user: username,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setMessages([...messages, { user: username, text: input }]); // keep the old messages and append the new messages to the end 

    setInput("")
  }


  // useEffect calls as soon as the App component loads
  //as soon as data added to the database, this useEffect will run
  useEffect(() => {
    db.collection("messages").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
    })
  }, [])


  //deleteing all the messages 
  const delMessages = (event) => {
    // event.preventDefault()
    let ref = db.collection('messages')
    swal({
      title: "All the chats wil be deleted for everyone.Are you sure?",
      text: "Once deleted, you will not be able to recover the chats!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          db.collection("messages").onSnapshot(snapshot => {

            snapshot.docs.map(doc => {
              ref.doc(doc.id).delete()
                .catch(error => {
                  console.log(error)
                })

            })
          })
          swal("All the messages has been deleted!", {
            icon: "success",
          });
        } else {
          swal("All the chats are safe!");
        }
      });


  }


  return (

    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=80&h=80" />

      <DeleteForeverIcon onClick={delMessages} variant="contained" color="primary" type="submit" className="delete">Delete all messages</DeleteForeverIcon>

      <h1>Facebook Messenger App</h1>
      <h4>Welcome {username}</h4>

      <section className="app_form__center">
        <form className="app__form">
          <FormControl className="app__formControl">
            <InputLabel>Enter a message</InputLabel>
            {/* as soon as we type something on the input field,store the value in input State and display that on the input field */}
            <Input className="app__input" value={input} onChange={event => setInput(event.target.value)} />
            {/* right after clicking the button, call the "sendMessage" function */}

            <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={SendMessage}>
              <SendIcon /> {/* the icon that we imported for the submit*/}
            </IconButton>

            {/* <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={SendMessage}>Send message</Button> Material-ui Button */}
          </FormControl>
        </form>
      </section>


      <FlipMove>
        {/* Map through the "messages state" variable and inherit to the "message component" */}
        {messages.map(({ id, message }) => (

          <Message key={id} username={username} message={message} /> //unique id is added to every message inside of "key"

        ))}
      </FlipMove>
    </div>


  );
}

export default App;
