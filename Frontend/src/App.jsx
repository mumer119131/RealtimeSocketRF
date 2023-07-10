import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import io from 'socket.io-client';
import {socket} from './socket.js';


function App() {
  const [count, setCount] = useState(0)
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('server_message', (data) => {
      console.log(data);
      setText(data.data);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  function handleChange(event) {
    setText(event.target.value);
    if (event.target.value.charAt(event.target.value.length - 1) === ' ') {
      socket.emit('client_message', {text: event.target.value});
    }
  }
  return (
    <>
      <p>{isConnected ? 'Connected' : 'Disconnected'}</p>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
        rows={10}
        cols={50}
      />
    </>
  )
}

export default App
