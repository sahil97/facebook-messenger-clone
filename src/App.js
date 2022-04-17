import { useEffect, useState } from 'react';
import Message from './Message';
import { Button, FormControl, InputLabel, Input } from '@mui/material';
import './App.css';
import db from './firebaseConfig';
import firebase from 'firebase/compat/app';
import FlipMove from 'react-flip-move';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function App() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({message: doc.data(), key:doc.id})));
    })
  }, []);

  useEffect(()=>{
    setUsername(prompt("Enter your username", "Unnamed"))
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    const newMessage = {username: username, message: input,  timestamp: firebase.firestore.FieldValue.serverTimestamp()};
    
    db.collection('messages').add(newMessage);

    setMessages([...messages, ]);
    setInput('');
  } 

  return (
    <div className="App">
      <img src="https://www.freepnglogos.com/uploads/facebook-messenger-png/black-messenger-facebook-logo-latest-facebook-logo-icon-gif-10.png" width="75" alt="black messenger facebook logo latest facebook logo icon gif"/>
      <h1>Sample Chat App!</h1>
      <h2>Welcome, {username}</h2>
      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input className="app__input" placeholder='Enter a message...' value={input} onChange={ e => setInput(e.target.value)}
          style={{width: '100%'}}/>

          <IconButton
          disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}
          className="app__iconBtn"
          >
            <SendIcon/>
          </IconButton>

        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({message, key}) => (
            <Message username={username} message={message} key={key}/>
          ))
        }
      </FlipMove>

    </div>
  );
}

export default App;
