// getdates.js

// 1. Output current year in the footer
document.getElementById("currentyear").textContent = new Date().getFullYear();

// 2. Output last modified date/time of the document
document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;
