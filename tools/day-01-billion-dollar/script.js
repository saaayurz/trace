// --- CONFIG ---
const START_BALANCE = 1_000_000_000;

// --- STATE ---
let balance = START_BALANCE;
let clicks = 0;

// --- DOM ---
const balanceEl = document.getElementById("balance");
const categoriesEl = document.getElementById("categories");
const logEl = document.getElementById("log");

// --- DATA ---
const STORE = {
  "Luxury": [
    { name: "Lamborghini", cost: 500000 },
    { name: "Porsche", cost: 250000 },
    { name: "Bugatti", cost: 3000000 }
  ],
  "Assets": [
    { name: "Mansion", cost: 80000000 },
    { name: "Yacht", cost: 90000000 },
    { name: "Private Jet", cost: 150000000 }
  ],
  "Impact": [
    { name: "Build Schools", cost: 20000000 },
    { name: "Clean Water Projects", cost: 30000000 }
  ]
};

// --- RENDER ---
function render() {
  balanceEl.textContent = balance.toLocaleString();

  for (const category in STORE) {
    const section = document.createElement("section");
    section.className = "category";

    const title = document.createElement("h2");
    title.textContent = category;

    const items = document.createElement("div");
    items.className = "items";

    STORE[category].forEach(item => {
      const btn = document.createElement("button");
      btn.className = "item";
      btn.textContent = `${item.name} — $${item.cost.toLocaleString()}`;
      btn.onclick = () => spend(item.cost);
      items.appendChild(btn);
    });

    section.appendChild(title);
    section.appendChild(items);
    categoriesEl.appendChild(section);
  }
}

// --- LOGIC ---
function spend(amount) {
  if (balance < amount) return;

  balance -= amount;
  clicks++;
  balanceEl.textContent = balance.toLocaleString();

  if (clicks < 5) logEl.textContent = "Okay.";
  else if (clicks < 12) logEl.textContent = "Still spending?";
  else logEl.textContent = "Interesting choices.";
}

// --- FEEDBACK TOGGLE ---
document.getElementById("toggleFeedback").onclick = () => {
  document.querySelector(".feedback-panel").classList.toggle("hidden");
};

// --- INIT ---
render();
