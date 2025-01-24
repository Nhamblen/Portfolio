// Retrieves current URL
const url = window.location.href;

// Check if the URL contains ".html" and remove it in the URL
if (url.includes(".html")) {
  const cleanUrl = url.replace(".html", "");
  window.history.replaceState({}, document.title, cleanUrl);
}
