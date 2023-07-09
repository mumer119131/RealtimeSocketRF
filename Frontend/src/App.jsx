import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import io from 'socket.io-client';



function App() {
  const socket = io('http://127.0.0.1:5000'); // Replace with your server URL
  const [count, setCount] = useState(0)
  const [text, setText] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('server_message', (data) => {
      console.log(data)
      setText(data.data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    console.log('Sending message to the server')
    const newText = e.target.value;
    setText(newText);
    socket.emit('client_message', { text: newText });
  };
  return (
    <>
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
