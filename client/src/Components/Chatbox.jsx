import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Container, Box } from '@mui/material';
import axios from 'axios';

const Chatbox = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Mock server endpoint (replace with your server endpoint)
  const serverEndpoint = `https://dev.grasstouching.com/chat`;
  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    try {
      // Mock server interaction (replace with actual server logic) 
        let response = await axios.post(serverEndpoint, {
        messages:
            [{
                role:"user",
                content:`${inputMessage}`
            }]
      });


      response = response.data;
      let lastElement = response[response.length - 1];


      // Update local state with the sent message
      setMessages((prevMessages) => [...prevMessages, { text: inputMessage, type: 'user' }]);

      // Receive and display the server's response
      setMessages((prevMessages) => [...prevMessages, { text: lastElement.content, type: 'server' }]);

      // Clear the input field
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    // Mock: Simulate receiving a message from the server after mounting
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: 'Hello! How can I help you?', type: 'server' },
    ]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container maxWidth="sm" sx={{ marginTop: '20px', textAlign: 'center' }}>
      <Paper elevation={3} sx={{ padding: '20px', minHeight: '600px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}
          >
            <Paper
              sx={{
                padding: '10px',
                borderRadius: '10px',
                background: message.type === 'user' ? '#1976D2' : '#EDEDED',
                color: message.type === 'user' ? '#fff' : '#000',
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
            </Paper>
          </Box>
        ))}
      </Paper>

      <TextField
        label="Type your message"
        variant="outlined"
        fullWidth
        sx={{ marginTop: '10px' }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: '10px' }}
        onClick={sendMessage}
      >
        Send
      </Button>
    </Container>
  );
};

export default Chatbox;