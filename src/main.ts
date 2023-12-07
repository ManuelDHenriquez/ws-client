import { conectServer } from './socket-client.ts'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client</h1>

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
conectServer();
