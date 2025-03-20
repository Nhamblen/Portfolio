// Author Name: Noah Hamblen
// File Name: renderer.js

// Enables strict mode to catch common coding mistakes and prevent the use of potentially unsafe features.
"use strict";

// This script runs in the renderer process (i.e., the UI), fetching system stats and handling chatbot interactions.

const { ipcRenderer } = require("electron");

let currentSortDirection = "asc"; // Default sorting direction is ascending
let currentSortColumn = "cpu"; // Default sorting column is cpu

// Function to update system health data
async function updateSystemStats() {
  try {
    const systemInfo = await ipcRenderer.invoke("get-system-info");

    // CPU Info
    document.getElementById("cpu").innerHTML = `
      <strong>CPU:</strong> ${systemInfo.cpu.brand} (${systemInfo.cpu.speed} GHz, ${systemInfo.cpu.cores} cores)
    `;

    // RAM Info (make sure it's formatted properly)
    document.getElementById("ram").innerHTML = `
      <strong>RAM:</strong> ${systemInfo.memory.used} / ${systemInfo.memory.total} (${systemInfo.memory.usedPercentage}%)
    `;

    // Disk Info
    const diskListElement = document.getElementById("disk-list");
    diskListElement.innerHTML = "";

    systemInfo.disks.forEach((disk) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${disk.name}</td>
        <td>${disk.type}</td>
        <td>${disk.size}</td>
        <td>${disk.usedPercentage}</td>
      `;
      diskListElement.appendChild(row);
    });

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

// Event listener if user presses enter to the chatbot
document
  .getElementById("user_input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

// Chatbot functionality
function sendMessage() {
  const userInput = document.getElementById("user_input").value;

  if (userInput.trim() !== "") {
    // Add the user's message to the chat box
    const chatBox = document.getElementById("chat_box");
    const userMessage = document.createElement("div");
    userMessage.classList.add("user_message");
    userMessage.innerHTML = `<span class="user_label">You:</span> ${userInput}`;
    chatBox.appendChild(userMessage);

    // Clear the input field
    document.getElementById("user_input").value = "";

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulate a response (you can replace this with actual chatbot logic)
    const botResponse = document.createElement("div");
    botResponse.classList.add("bot_response");
    botResponse.innerHTML = `<span class="bot_label">Bot:</span> I received your message: ${userInput}`;
    chatBox.appendChild(botResponse);

    // Scroll to the bottom of the chat box after bot response
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Update process list with sorted processes
async function updateProcessList() {
  const processes = await ipcRenderer.invoke("get-processes");

  // Ensure that CPU values are treated as numbers for sorting
  processes.sort((a, b) => {
    const cpuA = parseFloat(a.cpu);
    const cpuB = parseFloat(b.cpu);
    return cpuB - cpuA; // Always sort descending by CPU
  });

  const processListElement = document.getElementById("process-list");
  processListElement.innerHTML = "";

  processes.forEach((proc) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${proc.name}</td>
      <td>${proc.cpu}</td>
      <td>${proc.memory}</td>
      <td><button onclick="killProcess(${proc.pid})">End Task</button></td>
    `;

    processListElement.appendChild(row);
  });
}

// Update processes every 2 seconds
setInterval(updateProcessList, 2000); // Just update process list directly

// Update system stats every 2 seconds
setInterval(updateSystemStats, 2000);

// Initial sort by CPU when the page is loaded
window.addEventListener("load", () => {
  updateProcessList(); // Directly call this when the page loads
});
