function updateStats() {
  document.getElementById("cpu").innerText = Math.floor(Math.random() * 100);
  document.getElementById("ram").innerText = Math.floor(Math.random() * 100);
  document.getElementById("disk").innerText = Math.floor(Math.random() * 100);
}
setInterval(updateStats, 1000); // Update every 1 second
updateStats();
