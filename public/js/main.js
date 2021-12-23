const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

//join roomChat
socket.emit('joinRoom', {username, room});

//get room and users
socket.on('roomUsers', ({room, users})=> {
  outputRoomName(room);
  outputUsers(users);
});

//server message
socket.on('message', message  => {
  console.log(message);
  outputMessage(message);

   // Scroll down
   chatMessages.scrollTop = chatMessages.scrollHeight;
});


chatForm.addEventListener('submit', e => {
  e.preventDefault();
//getting message
  const msg = e.target.elements.msg.value;

  //send to server
  socket.emit('chatMessage', msg);

   // Clear input
   e.target.elements.msg.value = '';
   e.target.elements.msg.focus();
 });




//output chatMessage
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML += `<p class="meta">${message.username } <span>${message.time}</span></p>
  <p class="text">
  ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

//Add room name to document
function outputRoomName(room) {
roomName.innerText = room;
}

//Add users to DOM
function outputUsers(users) {
  userList.innerText = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}