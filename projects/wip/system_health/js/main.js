// Author Name: Noah Hamblen
// File Name: main.js
// Date: 2/2/25

// This script sets up the Electron app, creates the window, and fetches system health data using systeminformation.

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const si = require("systeminformation");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Allow `require` in renderer.js
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Handle system health requests from frontend
ipcMain.handle("get-system-info", async () => {
  const cpu = await si.cpu();
  const mem = await si.mem();
  const disk = await si.fsSize();
  const osInfo = await si.osInfo();

  return {
    cpu: {
      brand: cpu.brand,
      speed: cpu.speed.toFixed(2), // Round to 2 decimals
      cores: cpu.cores,
    },
    memory: {
      used: (mem.used / 1024 / 1024 / 1024).toFixed(2) + " GB",
      total: (mem.total / 1024 / 1024 / 1024).toFixed(2) + " GB",
      percentUsed: ((mem.used / mem.total) * 100).toFixed(2) + "%",
    },
    disk: {
      used: (disk[0].used / 1024 / 1024 / 1024).toFixed(2) + " GB",
      total: (disk[0].size / 1024 / 1024 / 1024).toFixed(2) + " GB",
      percentUsed: ((disk[0].used / disk[0].size) * 100).toFixed(2) + "%",
    },
    os: {
      platform: osInfo.platform,
      distro: osInfo.distro,
      release: osInfo.release,
    }
  };
});
