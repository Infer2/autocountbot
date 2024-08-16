const { Client } = require('discord.js-infer');
const express = require('express');
const app = express();
const port = 8080;
const client = new Client();

app.get('/', (req, res) => {
  res.send(`
<!doctype html>
<html>
<head>
<title>Made By Infer</title>
</head>
<body>
<h1>uwu</h1>
</body>
</html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

let latestMessageId = null;
let waitingForNewMessage = false;

client.once('ready', () => {
  console.log('Ready!');
});

client.login(process.env.token);

client.on('messageCreate', async (message) => {
  if (message.channel.id !== '966546228110311506') return;

  if (message.author.bot) return;

  if (message.author.id === '1246786098139758675') {
    waitingForNewMessage = true;
    return;
  }

  // Reset waitingForNewMessage if it's already true, indicating a new message from a different author
  if (waitingForNewMessage) {
    waitingForNewMessage = false;
  }

  // Update the latest message ID
  latestMessageId = message.author.id;

  // Function to determine the type of operation and call the corresponding function
  const processMessage = (content) => {
    let result;
    if (/^\d+$/.test(content)) {
      // Normal number - Call the normal function
      result = normalFunction(Number(content));
    } else if (/^\d+\s\+\s\d+$/.test(content)) {
      // Addition - Call the addition function
      result = additionFunction(content);
    } else if (/^\d+\s\-?\s\d+$/.test(content)) {
      // Subtraction - Call the subtraction function
      result = subtractionFunction(content);
    } else if (/^\d+\s\*\s\d+$/.test(content)) {
      // Multiplication - Call the multiplication function
      result = multiplicationFunction(content);
    } else if (/^\d+\s\/\s\d+$/.test(content)) {
      // Division - Call the division function
      result = divisionFunction(content);
    }

    if (result !== undefined) {
      message.channel.send(`${result}`);
      setTimeout(() => {}, 1300);
    }
  };

  // Placeholder functions for demonstration
  function normalFunction(number) {
    return number + 1; // Simply add 1 to the input number
  }

  // Placeholder functions for other operations remain unchanged
  function additionFunction(expression) {
    const parts = expression.split('+');
    return parts.map((part) => Number(part)).reduce((a, b) => a + b, 0);
  }

  function subtractionFunction(expression) {
    const parts = expression.split('-');
    return parts.map((part) => Number(part)).reduce((a, b) => a - b, 0);
  }

  function multiplicationFunction(expression) {
    const parts = expression.split('*');
    return parts.map((part) => Number(part)).reduce((a, b) => a * b, 1);
  }

  function divisionFunction(expression) {
    const parts = expression.split('/');
    return parts.map((part) => Number(part)).reduce((a, b) => a / b, 1);
  }

  processMessage(message.content);
});
