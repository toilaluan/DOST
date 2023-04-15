var ws = new WebSocket("ws://localhost:8000/ws");
ws.onmessage = function (event) {
  var messages = document.getElementById("chat-box");
  var message = document.createElement("div");
  message.setAttribute("class", "d-flex flex-row justify-content-start mb-4");
  var content = document.createElement("p");
  content.setAttribute("class", "small p-2 ms-3 mb-1 rounded-3 message");
  content.setAttribute("style", "background-color: #f5f6f7;");
  content.textContent = event.data;
  message.appendChild(content);
  messages.appendChild(message);
};
function sendMessage(event) {
  var input = document.getElementById("messageText");
  var messages = document.getElementById("chat-box");
  var message = document.createElement("div");
  message.setAttribute(
    "class",
    "d-flex flex-row justify-content-end mb-4 pt-1"
  );
  var content = document.createElement("p");
  content.setAttribute(
    "class",
    "small p-2 me-3 mb-1 text-white rounded-3 bg-primary message"
  );
  content.textContent = input.value;
  message.appendChild(content);
  messages.appendChild(message);
  ws.send(input.value);
  input.value = "";
  event.preventDefault();
}
