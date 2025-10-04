// ===== Data source (id used as value, name used for display) =====
const products = [
{ id: "wdx-100", name: "Widget X 100" },
{ id: "wdx-200", name: "Widget X 200" },
{ id: "gdo-10", name: "Gadget One 10" },
{ id: "gdo-20", name: "Gadget One 20" },
{ id: "prm-1", name: "Pro Max 1" },
{ id: "prm-2", name: "Pro Max 2" }
];


// Populate the product <select>
(() => {
const select = document.getElementById('product');
products.forEach(p => {
const opt = document.createElement('option');
opt.value = p.id; // value = id
opt.textContent = p.name; // display = name
opt.dataset.name = p.name; // handy for client-side needs
select.appendChild(opt);
});
})();


// Optional: client-side guard for required radios (helps older browsers)
(() => {
const form = document.getElementById('reviewForm');
form.addEventListener('submit', (e) => {
const hasRating = form.querySelector('input[name="rating"]:checked');
if (!hasRating) {
alert('Please select an overall rating.');
e.preventDefault();
}
});
})();