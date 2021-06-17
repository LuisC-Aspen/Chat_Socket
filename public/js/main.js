const chatForm = document.getElementById('chat-form')
const chatMessage = document.querySelector('.chat-messages')
//practica 11//
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users');
//fin practica 11//

const {username,room} = Qs.parse(location.search,{
  ignoreQueryPrefix: true
});

const socket = io();

socket.emit('joinRoom', {username, room});

//practica 11

socket.on('roomUsers', ({room, users}) =>{
  outputRoomName(room);
  outputUsers(users);
})

//fin practica 11

socket.on('message', message =>{
  outputMessage(message);

  chatMessage.scrollTop = chatMessage.scrollHeight;
});

chatForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  
  const msg = e.target.elements.msg.value

  socket.emit('chatMessage', msg)

  e.target.elements.msg.value ='';
  e.target.elements.msg.focus();

})

function outputMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML= `<p class= = "meta"> ${message.username} <span>${message.time}</span></p>
  <p class= "text">
    ${message.text}
  </p>`

  document.querySelector('.chat-messages').appendChild(div);
}

//Practica 11//

document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('¿Estás seguro que quieres salir?');
  if (leaveRoom) {
    window.location = '../index.html';
  }
  else{
  }
});

function outputRoomName(room){
  roomName.innerHTML = room;
}

function outputUsers(users) {
  userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}
//fin 11