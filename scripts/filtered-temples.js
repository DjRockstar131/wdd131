/* Filtered Temples – WDD131
   - Builds cards dynamically from the 'temples' array
   - Responds to filter buttons: Home, Old, New, Large, Small
   - Lazy loads images via loading="lazy"
   - Fallback if an image fails
   - Footer year + last modified
*/

// ---------- Data ----------
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },

  // --- Added more temples ---
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/400x250/slctemple7.jpg",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/2-Rome-Temple-2190090.jpg",
  },
  {
    templeName: "Provo City Center",
    location: "Provo, Utah, United States",
    dedicated: "2016, March, 20",
    area: 85770,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/2018/400x250/Provo-City-Center-Temple03.jpg",
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 53997,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x640/tokyo_japan_temple-evening.jpeg",
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 42800,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/laie-hawaii/400x250/laie-temple-772758-wallpaper.jpg",
  },
];

// ---------- Helpers ----------
const yearFromDedicated = (dedicatedStr) => {
  const match = dedicatedStr.match(/\d{4}/);
  return match ? Number(match[0]) : NaN;
};

const fmtNumber = (n) => n.toLocaleString();

// ---------- DOM ----------
const cardsEl = document.querySelector("#cards");
const navButtons = document.querySelectorAll(".main-nav button");

function clearCards() {
  cardsEl.innerHTML = "";
}

function makeCard(t, index = 0) {
  const article = document.createElement("article");
  article.className = "card";

  const img = document.createElement("img");
  img.loading = index < 2 ? "eager" : "lazy";
  img.decoding = "async";
  img.referrerPolicy = "no-referrer";
  img.width = 400;
  img.height = 250;
  img.src = t.imageUrl?.replace(/^http:\/\//i, "https://");
  img.alt = t.templeName || "Temple photo";

  // Fallback if the image fails
  img.addEventListener(
    "error",
    () => {
      img.src = "https://via.placeholder.com/400x250?text=Image+Unavailable";
      img.alt = (t.templeName || "Temple photo") + " (image unavailable)";
    },
    { once: true }
  );

  const content = document.createElement("div");
  content.className = "content";

  const h2 = document.createElement("h2");
  h2.textContent = t.templeName;

  const pLoc = document.createElement("p");
  pLoc.className = "meta";
  pLoc.textContent = t.location;

  const pDed = document.createElement("p");
  pDed.className = "small";
  pDed.textContent = `Dedicated: ${t.dedicated}`;

  const pArea = document.createElement("p");
  pArea.className = "small";
  pArea.textContent = `Area: ${fmtNumber(t.area)} sq ft`;

  content.append(h2, pLoc, pDed, pArea);
  article.append(img, content);
  return article;
}

function render(list) {
  cardsEl.setAttribute("aria-busy", "true");
  clearCards();

  if (!list.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No temples match this filter.";
    cardsEl.append(empty);
  } else {
    const frag = document.createDocumentFragment();
    list.forEach((t, i) => frag.appendChild(makeCard(t, i)));
    cardsEl.appendChild(frag);
  }

  cardsEl.setAttribute("aria-busy", "false");
}

function setActive(filter) {
  navButtons.forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.filter === filter)
  );
}

// ---------- Filters ----------
const filters = {
  home: () => temples.slice(),
  old: () =>
    temples.filter((t) => {
      const y = yearFromDedicated(t.dedicated);
      return !Number.isNaN(y) && y < 1900;
    }),
  new: () =>
    temples.filter((t) => {
      const y = yearFromDedicated(t.dedicated);
      return !Number.isNaN(y) && y > 2000;
    }),
  large: () => temples.filter((t) => t.area > 90000),
  small: () => temples.filter((t) => t.area < 10000),
};

// ---------- Events ----------
navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    setActive(filter);
    render(filters[filter] ? filters[filter]() : temples);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ---------- Footer ----------
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ---------- Init ----------
setActive("home");
render(filters.home());
