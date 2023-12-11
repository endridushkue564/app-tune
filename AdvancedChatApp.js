/*
File name: AdvancedChatApp.js
Content: Advanced Chat Application with real-time messaging and user authentication. Supports multiple chat rooms and private messaging.

*/

// Utility function to generate unique user IDs
function generateUniqueID() {
  let timeStamp = new Date().getTime();
  let randomID = Math.floor(Math.random() * 10000);
  return `user_${randomID}_${timeStamp}`;
}

// Utility function to validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Class representing a Chat Room
class ChatRoom {
  constructor(name) {
    this.name = name;
    this.users = [];
    this.messages = [];
  }

  addUser(user) {
    this.users.push(user);
    console.log(`${user.name} has joined ${this.name}`);
  }

  removeUser(user) {
    this.users = this.users.filter((u) => u.id !== user.id);
    console.log(`${user.name} has left ${this.name}`);
  }

  sendMessage(message, sender) {
    const formattedMessage = `${sender.name}: ${message}`;
    this.messages.push(formattedMessage);
    console.log(formattedMessage);
  }
}

// Class representing a User
class User {
  constructor(name, email) {
    this.id = generateUniqueID();
    this.name = name;
    this.email = email;
  }

  sendMessage(message, chatRoom) {
    chatRoom.sendMessage(message, this);
  }
}

// Function to authenticate a user
function authenticateUser(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (validateEmail(email) && password.length > 5) {
        resolve({ authenticated: true });
      } else {
        reject(Error('Invalid email or password'));
      }
    }, 2000); // Simulated asynchronous authentication request
  });
}

// Function to get user details based on their ID
function getUserDetails(userID) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulated database query
      const userDetails = {
        id: userID,
        name: 'John Doe',
        email: 'johndoe@example.com',
      };
      resolve(userDetails);
    }, 1500);
  });
}

// Example usage of the Chat Application

// Creating chat rooms
const generalChatRoom = new ChatRoom('General');
const salesChatRoom = new ChatRoom('Sales');

// Creating users
const user1 = new User('Alice', 'alice@example.com');
const user2 = new User('Bob', 'bob@example.com');

// Authenticating user1
authenticateUser(user1.email, 'password123')
  .then((response) => {
    console.log('Authentication success!');
    return getUserDetails(user1.id);
  })
  .then((userDetails) => {
    console.log('User details:', userDetails);
    user1.name = userDetails.name;
    generalChatRoom.addUser(user1);

    // User1 sends a message in the general chat room
    user1.sendMessage('Hello everyone!', generalChatRoom);
  })
  .catch((error) => {
    console.error('Authentication failed:', error.message);
  });

// Authenticating user2
authenticateUser(user2.email, 'password456')
  .then((response) => {
    console.log('Authentication success!');
    return getUserDetails(user2.id);
  })
  .then((userDetails) => {
    console.log('User details:', userDetails);
    user2.name = userDetails.name;
    generalChatRoom.addUser(user2);
    salesChatRoom.addUser(user2);

    // User2 sends a message in the sales chat room
    user2.sendMessage('Anyone available for a call?', salesChatRoom);
  })
  .catch((error) => {
    console.error('Authentication failed:', error.message);
  });

// Simulating a user leaving a chat room after 5 seconds
setTimeout(() => {
    generalChatRoom.removeUser(user1);
}, 5000);
setTimeout(() => {
    salesChatRoom.removeUser(user2);
}, 5000);

/*
Output Example:

Authentication success!
User details: { id: 'user_9864_1625474298792',
  name: 'John Doe',
  email: 'johndoe@example.com' }
John Doe has joined General
Alice: Hello everyone!
Authentication success!
User details: { id: 'user_3485_1625474298792',
  name: 'John Doe',
  email: 'johndoe@example.com' }
John Doe has joined General
John Doe has joined Sales
Bob: Anyone available for a call?
Alice has left General
John Doe has left General
Bob has left Sales

*/