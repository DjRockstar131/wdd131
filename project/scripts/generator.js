// Simple random generators + favorites using array methods and localStorage

const hooks = [
  "A village hires you to track a missing caravan through a haunted bog.",
  "A noble’s heirloom sword sings when goblins are near—why?",
  "A lighthouse beam has turned crimson; ships vanish in the fog."
];

const monsters = [
  { name: "Owlbear", cr: 3 },
  { name: "Gelatinous Cube", cr: 2 },
  { name: "Mimic", cr: 2 },
  { name: "Adult Red Dragon", cr: 17 }
];

function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

function getFaves(){
  return JSON.parse(localStorage.getItem("faves") || "[]");
}
function setFaves(f){ localStorage.setItem("faves", JSON.stringify(f)); }

function renderFaves(){
  const ul = document.getElementById("favorites-list");
  if (!ul) return;
  const faves = getFaves();
  ul.innerHTML = faves.map(item => `<li class="card">${item}</li>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const out = document.getElementById("gen-output");
  const btnHook = document.getElementById("gen-hook");
  const btnMonster = document.getElementById("gen-monster");
  const btnClear = document.getElementById("clear-faves");

  const show = text => {
    out.innerHTML = `
      <div>${text}</div>
      <button id="save-fave" class="btn">Save to Favorites</button>
    `;
    document.getElementById("save-fave").addEventListener("click", () => {
      const faves = getFaves();
      if (!faves.includes(text)) {
        setFaves([...faves, text]);   // array method + template literal
        renderFaves();
      }
    });
  };

  btnHook?.addEventListener("click", () => show(`Quest Hook: ${pick(hooks)}`));

  btnMonster?.addEventListener("click", () => {
    const m = pick(monsters);
    const note = m.cr >= 10 ? " (high level!)" : "";
    show(`Monster: ${m.name} — CR ${m.cr}${note}`);
  });

  btnClear?.addEventListener("click", () => { setFaves([]); renderFaves(); });

  renderFaves();
});
