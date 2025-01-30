function updateStats() {
  document.getElementById("cpu").innerText = Math.floor(Math.random() * 100);
  document.getElementById("ram").innerText = Math.floor(Math.random() * 100);
  document.getElementById("disk").innerText = Math.floor(Math.random() * 100);
}
setInterval(updateStats, 3000); // Update every 3 seconds
updateStats();
