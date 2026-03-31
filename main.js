// ==========================
// 1. CONFIGURATION
// ==========================
const API = {
  cat: "https://catfact.ninja/fact",
  dog: "https://dog-api.kinduff.com/api/facts",
};

// ==========================
// 2. DOM ELEMENTS
// ==========================
const factEl = document.getElementById("fact");
const loaderEl = document.getElementById("loader");
const errorEl = document.getElementById("error");
const btn = document.getElementById("getFactBtn");
const typeButtons = document.querySelectorAll(".type-btn");

let currentType = "cat";

// ==========================
// 3. FUNCTIONS
// ==========================

// UI
function showLoader() {
  loaderEl.style.display = "block";
}

function hideLoader() {
  loaderEl.style.display = "none";
}

function displayFact(fact) {
  factEl.textContent = fact;
  errorEl.textContent = "";
}

function displayError(message) {
  errorEl.textContent = message;
}

// API
async function fetchFact(type) {
  const url = API[type];

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erreur serveur");
    }

    const data = await response.json();

    // Normalisation des réponses
    return type === "dog" ? data.facts[0] : data.fact;
  } catch (error) {
    throw new Error("Impossible de récupérer un fait.");
  }
}

// ==========================
// 4. EVENTS
// ==========================

// Sélection chat / chien
typeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    typeButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    currentType = button.dataset.type;
  });
});

// Bouton principal
btn.addEventListener("click", async () => {
  showLoader();

  try {
    const fact = await fetchFact(currentType);
    displayFact(fact);
  } catch (error) {
    displayError(error.message);
  } finally {
    hideLoader();
  }
});
