import { Manager, Socket } from "socket.io-client"


export const conectServer = ( token: string) => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js',{
        extraHeaders: {
            hola: 'mundo',
            authentication: token
        }
    })

    const socket = manager.socket('/');

    addListeners( socket );
}

const addListeners = ( socket: Socket) => {
    const serverStatus = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector('#messages-ul')!;

    socket.on('connect', () => {
        serverStatus.innerHTML = 'Connected';
    });

    socket.on('disconnect', () => {
        serverStatus.innerHTML = 'Disconnected';
    });

    socket.on('clients-updated', ( clients: string[] ) => {
        let clientsHtml = '';
        clients.forEach( client => {
            clientsHtml += `<li>${client}</li>`
        })
        clientsUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if(messageInput.value.trim() === '') return;

        socket.emit('message-from-client', { 
            id: 'YO!!', message: messageInput.value 
        });
        
        
        messageInput.value = '';
    });
    
    socket.on('message-from-server', (payload:{fullName: string, message: string}) => {
        const nesMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;

        const li = document.createElement('li');
        li.innerHTML = nesMessage;
        messagesUl.append(li);
    });
}