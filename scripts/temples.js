// Footer dynamic info + responsive hamburger
(function () {
  // Footer year + last modified
  const yearEl = document.getElementById("year");
  const modEl  = document.getElementById("lastModified");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl)  modEl.textContent  = document.lastModified;

  // Hamburger toggle (mobile only; CSS hides button on large screens)
  const toggleBtn = document.querySelector(".menu-toggle");
  const navList   = document.querySelector(".nav-list");

  if (toggleBtn && navList) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.textContent = isOpen ? "✖ Close" : "☰ Menu";
    });

    // Optional: close menu when clicking a link (mobile UX nicety)
    navList.addEventListener("click", (e) => {
      if (e.target instanceof HTMLAnchorElement && navList.classList.contains("open")) {
        navList.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.textContent = "☰ Menu";
      }
    });
  }
})();
