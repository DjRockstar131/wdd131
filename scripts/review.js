// Rehydrate submitted data from the query string and display a summary.
(function showSummary() {
const params = new URLSearchParams(window.location.search);
const submitted = {
productId: params.get('productId') || '',
rating: params.get('rating') || '',
installed: params.get('installed') || '',
// getAll collects multiple checkboxes with the same name
features: params.getAll('features'),
review: params.get('review') || '',
username: params.get('username') || ''
};


// Map product id back to human-readable name using the same array
const products = [
{ id: "wdx-100", name: "Widget X 100" },
{ id: "wdx-200", name: "Widget X 200" },
{ id: "gdo-10", name: "Gadget One 10" },
{ id: "gdo-20", name: "Gadget One 20" },
{ id: "prm-1", name: "Pro Max 1" },
{ id: "prm-2", name: "Pro Max 2" }
];
const productName = products.find(p => p.id === submitted.productId)?.name || '(Unknown)';


const summary = document.getElementById('summary');
const add = (term, value) => {
const dt = document.createElement('dt');
dt.textContent = term;
const dd = document.createElement('dd');
dd.textContent = value;
summary.append(dt, dd);
};


add('Product', productName);
add('Rating', submitted.rating ? `${submitted.rating} / 5` : '(not provided)');
add('Installed On', submitted.installed || '(not provided)');
add('Useful Features', submitted.features.length ? submitted.features.join(', ') : '(none selected)');
add('Written Review', submitted.review || '(not provided)');
add('Your Name', submitted.username || '(anonymous)');
})();


// Local Storage review counter
(function countReviews() {
const KEY = 'reviewsCount';
const count = Number(localStorage.getItem(KEY) || 0) + 1;
localStorage.setItem(KEY, String(count));
document.getElementById('reviewCount').textContent = count;
})();