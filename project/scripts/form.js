// Dynamic select options using array methods
const resources = [
  "Player’s Handbook",
  "Dungeon Master’s Guide",
  "Monster Manual",
  "Starter Set",
  "D&D Beyond Article"
];

document.addEventListener("DOMContentLoaded", () => {
  const sel = document.getElementById("product");
  if (sel) {
    resources.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      sel.appendChild(opt);
    });
  }

  // Simple client-side guard (example of event + conditional)
  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      alert("Please complete all required fields.");
    }
  });
});
// --- Left-to-right star rating enhancer ---
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelector(".stars-ltr");
  if (!stars) return;

  const labels = Array.from(stars.querySelectorAll("label[data-value]"));
  const inputs = Array.from(stars.querySelectorAll('input[type="radio"][name="rating"]'));

  const fill = (n) => {
    labels.forEach(l => l.classList.toggle("is-filled", Number(l.dataset.value) <= n));
  };

  // Restore previously selected (if user navigates back)
  const checked = inputs.findIndex(i => i.checked);
  if (checked >= 0) {
    stars.dataset.selected = String(checked + 1);
    fill(checked + 1);
  }

  // Mouse / touch
  labels.forEach((lab) => {
    lab.addEventListener("mouseenter", () => fill(Number(lab.dataset.value)));
    lab.addEventListener("mouseleave", () => fill(Number(stars.dataset.selected || 0)));
    lab.addEventListener("click", () => {
      const n = Number(lab.dataset.value);
      stars.dataset.selected = String(n);
      inputs[n - 1].checked = true;
      fill(n);
    });
  });

  // Keyboard (left/right arrows)
  labels.forEach((lab, i) => {
    lab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" && i < labels.length - 1) {
        e.preventDefault();
        labels[i + 1].click();
        labels[i + 1].focus();
      } else if (e.key === "ArrowLeft" && i > 0) {
        e.preventDefault();
        labels[i - 1].click();
        labels[i - 1].focus();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        lab.click();
      }
    });
  });
});
