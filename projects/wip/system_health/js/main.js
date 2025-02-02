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
  const osInfo = await si.osInfo();
  const diskLayout = await si.diskLayout();
  const diskUsage = await si.fsSize(); // This retrieves the disk usage data

  console.log("Disk Layout:", diskLayout);
  console.log("Disk Usage:", diskUsage);

  // Calculate disk usage percentages
  const disks = diskLayout.map((disk) => {
    const diskStats = diskUsage.find((d) => d.mount === disk.mount);

    let usedPercentage = 0;
    if (diskStats && diskStats.used && diskStats.size) {
      usedPercentage = ((diskStats.used / diskStats.size) * 100).toFixed(2);
    }

    return {
      name: disk.device,
      type: disk.type,
      size: (disk.size / 1024 / 1024 / 1024).toFixed(2) + " GB",
      mount: disk.mount,
      usedPercentage: usedPercentage + "%", // Display used percentage
    };
  });

  return {
    cpu: {
      manufacturer: cpu.manufacturer,
      brand: cpu.brand,
      speed: cpu.speed + " GHz",
      cores: cpu.cores,
    },
    memory: {
      free: (mem.free / 1024 / 1024).toFixed(2) + " MB",
      total: (mem.total / 1024 / 1024).toFixed(2) + " MB",
      used: ((mem.used / mem.total) * 100).toFixed(2) + "%",
      usedPercentage: ((mem.used / mem.total) * 100).toFixed(2), // Added this to track RAM usage percentage
    },
    os: {
      platform: osInfo.platform,
      distro: osInfo.distro,
      release: osInfo.release,
    },
    disks: disks,
  };
});

// Fetch system processes
ipcMain.handle("get-processes", async () => {
  const processData = await si.processes();

  return processData.list.map((proc) => ({
    name: proc.name,
    pid: proc.pid,
    cpu: proc.cpu.toFixed(2) + "%",
    memory: (proc.memRss / 1024 / 1024).toFixed(2) + " MB",
    running: proc.running,
  }));
});

// Kill a process
ipcMain.handle("kill-process", async (event, pid) => {
  try {
    process.kill(pid);
    return { success: true, message: `Process ${pid} terminated.` };
  } catch (err) {
    return {
      success: false,
      message: `Failed to kill process: ${err.message}`,
    };
  }
});
