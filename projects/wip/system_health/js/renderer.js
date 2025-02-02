// Author Name: Noah Hamblen
// File Name: main.js
// Date: 2/2/25

// This script runs in the renderer process (i.e., the UI), fetching system stats and handling chatbot interactions.

const { ipcRenderer } = require("electron");

// Function to update system health data
async function updateSystemStats() {
  try {
    const systemInfo = await ipcRenderer.invoke("get-system-info");

    // Format CPU information
    document.getElementById("cpu").innerHTML = `
      <strong>CPU:</strong> ${systemInfo.cpu.brand} (${systemInfo.cpu.speed} GHz, ${systemInfo.cpu.cores} cores)
    `;

    // Format RAM information with conversion to GB
    document.getElementById("ram").innerHTML = `
      <strong>RAM:</strong> ${systemInfo.memory.used} / ${systemInfo.memory.total} (${systemInfo.memory.percentUsed}%) used
    `;

    // Format Disk information with conversion to GB
    document.getElementById("disk").innerHTML = `
      <strong>Disk:</strong> ${systemInfo.disk.used} / ${systemInfo.disk.total} (${systemInfo.disk.percentUsed}%) used
    `;

    // OS Info
    document.getElementById("os").innerHTML = `
      <strong>OS:</strong> ${systemInfo.os.platform} - ${systemInfo.os.distro} (${systemInfo.os.release})
    `;
  } catch (error) {
    console.error("Error fetching system stats:", error);
    document.getElementById("cpu").innerText = "Error loading CPU data";
    document.getElementById("ram").innerText = "Error loading RAM data";
    document.getElementById("disk").innerText = "Error loading Disk data";
    document.getElementById("os").innerText = "Error loading OS data";
  }
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
