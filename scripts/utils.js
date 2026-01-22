/***********************
 * CONFIG
 ***********************/
const START_BALANCE = 1_000_000_000;

const JUDGMENT_LEVELS = [
  { threshold: 5, message: "Interesting start." },
  { threshold: 12, message: "You’re enjoying this." },
  { threshold: 20, message: "Still clicking?" },
  { threshold: 30, message: "Does it feel different now?" },
  { threshold: 45, message: "You had everything." }
];

/***********************
 * STATE
 ***********************/
let balance = START_BALANCE;
let totalClicks = 0;

/***********************
 * DOM REFERENCES
 ***********************/
const balanceEl = document.getElementById("balance");
const logEl = document.getElementById("log");
const categoriesEl = document.getElementById("categories");

/***********************
 * DATA — SPEND OPTIONS
 ***********************/
const STORE = {
  "🚗 Luxury": [
    { name: "Lamborghini Aventador", cost: 500000 },
    { name: "Lamborghini Urus", cost: 350000 },
    { name: "Porsche 911 Turbo S", cost: 220000 },
    { name: "Ferrari SF90", cost: 625000 },
    { name: "Bugatti Chiron", cost: 3000000 },
    { name: "Rolls-Royce Phantom", cost: 460000 },
    { name: "Diamond Watch", cost: 1200000 },
    { name: "Luxury Garage (20 cars)", cost: 15000000 }
  ],

  "🏰 Assets": [
    { name: "Beachside Mansion", cost: 85000000 },
    { name: "New York Penthouse", cost: 120000000 },
    { name: "Private Island", cost: 200000000 },
    { name: "Yacht", cost: 90000000 },
    { name: "Private Jet", cost: 150000000 },
    { name: "Luxury Hotel", cost: 300000000 }
  ],

  "🌍 Impact": [
    { name: "Build 50 Schools", cost: 25000000 },
    { name: "Clean Water for Cities", cost: 40000000 },
    { name: "Cancer Research Funding", cost: 100000000 },
    { name: "Feed 1 Million People", cost: 60000000 },
    { name: "Affordable Housing Project", cost: 120000000 }
  ],

  "🔥 Chaos": [
    { name: "Gamble on Meme Coins", cost: 10000000 },
    { name: "Buy NFT of Nothing", cost: 5000000 },
    { name: "Burn Cash (why?)", cost: 20000000 },
    { name: "Buy Social Media Platform", cost: 440000000 }
  ]
};

/***********************
 * RENDERING
 ***********************/
function renderStore() {
  for (const category in STORE) {
    const section = document.createElement("section");
    section.className = "category";

    const title = document.createElement("h2");
    title.textContent = category;

    const grid = document.createElement("div");
    grid.className = "items";

    STORE[category].forEach(item => {
      const btn = document.createElement("button");
      btn.className = "item";
      btn.innerHTML = `
        <strong>${item.name}</strong>
        <span>$${item.cost.toLocaleString()}</span>
      `;
      btn.onclick = () => spend(item.cost);
      grid.appendChild(btn);
    });

    section.appendChild(title);
    section.appendChild(grid);
    categoriesEl.appendChild(section);
  }
}

/***********************
 * INTERACTION
 ***********************/
function spend(amount) {
  if (balance < amount) return;

  balance -= amount;
  totalClicks++;

  balanceEl.textContent = balance.toLocaleString();
  updateJudgment();

  if (balance === 0) {
    setTimeout(() => {
      logEl.textContent =
        "You had everything. What did you really want?";
    }, 1500);
  }
}

/***********************
 * PSYCHOLOGICAL LOGIC
 ***********************/
function updateJudgment() {
  for (let i = JUDGMENT_LEVELS.length - 1; i >= 0; i--) {
    if (totalClicks >= JUDGMENT_LEVELS[i].threshold) {
      logEl.textContent = JUDGMENT_LEVELS[i].message;
      break;
    }
  }
}

/***********************
 * FEEDBACK TOGGLE
 ***********************/
document.getElementById("toggleFeedback").onclick = () => {
  document
    .querySelector(".feedback-panel")
    .classList.toggle("hidden");
};

/***********************
 * INIT
 ***********************/
balanceEl.textContent = START_BALANCE.toLocaleString();
renderStore();
