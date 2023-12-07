import { conectServer } from './socket-client.ts'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client</h1>

    <input id="jwt-token" placeholder="Json Web Token" /><br>
    <button id="btn-conect">Conect</button><br>

    <span id="server-status">Offline</span>


    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input type="text" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// conectServer();
const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConect = document.querySelector('#btn-conect')!;

btnConect.addEventListener('click', () => {

  if(jwtToken.value.trim().length <= 0) return alert('Enter a valid JWT');
  conectServer( jwtToken.value );
});
