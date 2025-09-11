// Fixed version – works correctly
const radiusOutput = document.getElementById('radius');
const areaOutput = document.getElementById('area'); // fixed selector

let area = 0;
const PI = 3.14159; // fixed operator

let radius = 10; // changed const → let so we can reassign
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area;

radius = 20;
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area;
