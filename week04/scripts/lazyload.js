// Add fade-in class when each image actually finishes loading.
// Works with native lazy loading (loading="lazy").
// Also handles cached images that may already be complete.

function applyFadeIn(img) {
  // Guard: naturalHeight > 0 ensures the image decoded successfully
  if (img.complete && img.naturalHeight > 0) {
    img.classList.add('fade-in');
  } else {
    img.addEventListener('load', () => img.classList.add('fade-in'), { once: true });
    img.addEventListener('error', () => {
      // Optional: handle broken image (keep it from staying fully black)
      img.style.opacity = 1;
      img.style.filter = 'none';
    }, { once: true });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Fade behavior
  document.querySelectorAll('img.lazy-img').forEach(applyFadeIn);

  // Footer info
  const yearEl = document.getElementById('year');
  const lmEl = document.getElementById('lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lmEl) lmEl.textContent = document.lastModified;
});
