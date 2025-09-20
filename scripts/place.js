/* place.js
   - Footer year + last modified
   - Wind chill calculation with gating rules
   - Static example values for now (API will come later)
*/

// ===== Footer dynamic fields =====
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastmodified").textContent = document.lastModified;

// ===== Static example weather values (match your visible content) =====
// Choose "imperial" (°F, mph) or "metric" (°C, km/h)
const UNITS = "imperial";
const temperature = 46;   // °F if imperial, °C if metric
const windSpeed   = 7;    // mph if imperial, km/h if metric

// Reflect static values into the UI (keeps HTML & JS in sync)
document.getElementById("temp-text").textContent = UNITS === "imperial" ? `${temperature} °F` : `${temperature} °C`;
document.getElementById("wind-text").textContent = UNITS === "imperial" ? `${windSpeed} mph` : `${windSpeed} km/h`;

// ===== Wind chill calculation =====
// Single-line return as required; uses correct formula by unit system
function calculateWindChill(T, V, units = "imperial"){
  return units === "imperial"
    ? 35.74 + 0.6215 * T - 35.75 * Math.pow(V, 0.16) + 0.4275 * T * Math.pow(V, 0.16)
    : 13.12 + 0.6215 * T - 11.37 * Math.pow(V, 0.16) + 0.3965 * T * Math.pow(V, 0.16);
}

// Apply gating rules before computing:
// Imperial: temp <= 50°F and wind > 3 mph
// Metric:   temp <= 10°C and wind > 4.8 km/h
const meetsConditions =
  (UNITS === "imperial" && temperature <= 50 && windSpeed > 3) ||
  (UNITS === "metric"   && temperature <= 10 && windSpeed > 4.8);

const chillEl = document.getElementById("windchill-text");

if (meetsConditions) {
  const wc = calculateWindChill(temperature, windSpeed, UNITS);
  const rounded = Math.round(wc); // You can use toFixed(1) if you prefer one decimal place
  chillEl.textContent = UNITS === "imperial" ? `${rounded} °F` : `${rounded} °C`;
} else {
  chillEl.textContent = "N/A";
}
