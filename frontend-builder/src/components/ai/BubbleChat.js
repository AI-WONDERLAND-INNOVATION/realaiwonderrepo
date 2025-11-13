import React, { useState, useRef, useEffect } from 'react';

const initialMessages = [
  { sender: 'ai', text: 'Hello! How can I assist you today?' }
];

export default function BubbleChat({ aiName = 'AI Assistant' }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'ai', text: getAIResponse(input) }
      ]);
    }, 600);
  };

  function getAIResponse(userText) {
    // Simple AI stub, replace with real API if needed
    if (userText.toLowerCase().includes('hello')) return 'Hi there!';
    if (userText.toLowerCase().includes('help')) return 'I am here to help. What do you need?';
    return "I'm not sure, but I can try to help!";
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>{aiName} Bubble Chat</div>
      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={msg.sender === 'ai' ? styles.aiBubble : styles.userBubble}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form style={styles.inputRow} onSubmit={handleSend}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button style={styles.button} type="submit">Send</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: 320,
    border: '2px solid #fff',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(255,255,255,0.08)',
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    margin: '16px auto',
  },
  header: {
    background: '#000',
    color: '#fff',
    padding: '10px 16px',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    fontWeight: 'bold',
    fontSize: 16,
    borderBottom: '2px solid #fff',
  },
  chatBox: {
    flex: 1,
    padding: '12px',
    overflowY: 'auto',
    minHeight: 180,
    maxHeight: 260,
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    borderBottom: '2px solid #fff',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    background: '#000',
    color: '#fff',
    borderRadius: 16,
    padding: '8px 14px',
    maxWidth: '80%',
    marginBottom: 2,
    fontSize: 15,
    border: '2px solid #fff',
  },
  userBubble: {
    alignSelf: 'flex-end',
    background: '#000',
    color: '#fff',
    borderRadius: 16,
    padding: '8px 14px',
    maxWidth: '80%',
    marginBottom: 2,
    fontSize: 15,
    border: '2px solid #fff',
  },
  inputRow: {
    display: 'flex',
    borderTop: '2px solid #fff',
    padding: '10px',
    gap: 8,
    background: '#000',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  input: {
    flex: 1,
    padding: '8px',
    borderRadius: 8,
    border: '2px solid #fff',
    fontSize: 15,
    background: '#000',
    color: '#fff',
  },
  button: {
    background: '#000',
    color: '#fff',
    border: '2px solid #fff',
    borderRadius: 8,
    padding: '8px 16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 15,
  },
};
