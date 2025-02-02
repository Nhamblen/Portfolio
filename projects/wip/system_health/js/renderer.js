// Author Name: Noah Hamblen
// File Name: main.js
// Date: 2/2/25

// This script runs in the renderer process (i.e., the UI), fetching system stats and handling chatbot interactions.

const { ipcRenderer } = require("electron");

// Function to update system health data
async function updateSystemStats() {
  const systemInfo = await ipcRenderer.invoke("get-system-info");

  document.getElementById(
    "cpu"
  ).innerText = `${systemInfo.cpu.speed} (${systemInfo.cpu.cores} cores)`;
  document.getElementById(
    "ram"
  ).innerText = `${systemInfo.memory.used} used / ${systemInfo.memory.total}`;
  document.getElementById(
    "disk"
  ).innerText = `${systemInfo.disk.used} used / ${systemInfo.disk.total}`;
}

// Update system stats every 2 seconds
setInterval(updateSystemStats, 2000);

// Chatbot functionality
function sendMessage() {
  const userInput = document.getElementById("user_input").value.trim();
  const chatBox = document.getElementById("chat_box");

  if (userInput === "") return;

  // Display user message
  const userMessage = document.createElement("p");
  userMessage.innerHTML = `<strong>You:</strong> ${userInput}`;
  chatBox.appendChild(userMessage);

  // Generate bot response
  let botResponse = "I'm not sure how to answer that.";
  if (userInput.toLowerCase().includes("cpu"))
    botResponse = "Your CPU usage is being monitored.";
  if (userInput.toLowerCase().includes("ram"))
    botResponse = "Your RAM usage is displayed on the dashboard.";
  if (userInput.toLowerCase().includes("disk"))
    botResponse = "Your disk space usage is also displayed.";
  if (userInput.toLowerCase().includes("help"))
    botResponse = "Try restarting your computer or checking Task Manager.";

  // Display bot response
  const botMessage = document.createElement("p");
  botMessage.innerHTML = `<strong>Bot:</strong> ${botResponse}`;
  chatBox.appendChild(botMessage);

  // Scroll chat box to the latest message
  chatBox.scrollTop = chatBox.scrollHeight;

  // Clear input field
  document.getElementById("user_input").value = "";
}
