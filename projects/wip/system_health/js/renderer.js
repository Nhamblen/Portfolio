// Author Name: Noah Hamblen
// File Name: main.js
// Date: 2/2/25

// This script runs in the renderer process (i.e., the UI), fetching system stats and handling chatbot interactions.

const { ipcRenderer } = require("electron");

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

// Function to fetch and display running processes
async function updateProcessList() {
  const processes = await ipcRenderer.invoke("get-processes");

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

// Function to kill a process
async function killProcess(pid) {
  const response = await ipcRenderer.invoke("kill-process", pid);
  alert(response.message);
  updateProcessList();
}

// Update process list every 5 seconds
setInterval(updateProcessList, 5000);
updateProcessList();
