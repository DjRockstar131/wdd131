// Common header & footer injection + theme and lazy loading
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  const nav = `
    <div class="sitebar">
      <div class="brand">Adventurer’s Guide</div>
      <button class="nav-toggle" aria-expanded="false">Menu</button>
      <nav>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="learn.html">Resources</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="references.html">References</a></li>
        </ul>
      </nav>
      <button class="theme-toggle btn outline" title="Toggle theme">Theme</button>
    </div>
  `;
  const foot = `
    <p class="footer-note">© ${new Date().getFullYear()} Adventurer’s Guide • Images & text credited on <a href="references.html">References</a>.</p>
  `;

  if (header) header.innerHTML = nav;
  if (footer) footer.innerHTML = foot;

  // Active link highlight
  document.querySelectorAll('nav a').forEach(a => {
    if (location.pathname.endsWith(a.getAttribute('href'))) a.classList.add('active');
  });

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const navEl = document.querySelector("header nav");
  toggle?.addEventListener("click", () => {
    const expanded = navEl.classList.toggle("open");
    toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
  });

  // Theme toggle with localStorage
  const themeBtn = document.querySelector(".theme-toggle");
  const applyTheme = t => document.documentElement.classList.toggle("light", t === "light");
  applyTheme(localStorage.getItem("theme") || "dark");
  themeBtn?.addEventListener("click", () => {
    const next = document.documentElement.classList.contains("light") ? "dark" : "light";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });

  // Lazy load for images with data-src
  const lazyImgs = document.querySelectorAll("img.lazy");
  if (lazyImgs.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          img.classList.remove("lazy");
          obs.unobserve(img);
        }
      });
    }, { rootMargin: "200px" });
    lazyImgs.forEach(img => io.observe(img));
  }
});
