const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();

// Sending all type of messages from server
socket.on('message', message => {
    console.log("MESSAGE: ", message);

    document.getElementById('msg').focus();

    // Function to create de html message
    outputMessage(message);

    // Scroll down the page on every message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text from input in chat.html
    const msg = e.target.elements.msg.value;
    // console.log("MSG: ", msg);

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output Message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
                    <p class="text">
                        ${message}
                    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
} 
