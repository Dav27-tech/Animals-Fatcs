// ==========================
// 1. CONFIGURATION
// ==========================
const API = {
  cat: "https://catfact.ninja/fact",
  dog: "https://cdn.jsdelivr.net/gh/DucNgn/Dog-facts-API-DEPRECATED-@master/data.json",
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
let dogFacts = [];

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
  try {
    if (type === "dog") {
      if (dogFacts.length === 0) {
        const response = await fetch(API.dog);

        if (!response.ok) {
          throw new Error("Erreur serveur");
        }

        dogFacts = await response.json();
      }

      const randomIndex = Math.floor(Math.random() * dogFacts.length);
      return dogFacts[randomIndex].fact;
    }

    const response = await fetch(API.cat);

    if (!response.ok) {
      throw new Error("Erreur serveur");
    }

    const data = await response.json();
    return data.fact;
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
    factEl.textContent = "Clique pour générer un fait";
    errorEl.textContent = "";
  });
});

// Traduction
async function translateToFrench(text) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|fr`;
    const response = await fetch(url);
    const data = await response.json();

    return data.responseData.translatedText;
  } catch (error) {
    return text; //
  }
}

// Bouton principal
btn.addEventListener("click", async () => {
  showLoader();
  try {
    let fact = await fetchFact(currentType);
    fact = await translateToFrench(fact);
    displayFact(fact);
  } catch (error) {
    displayError(error.message);
  } finally {
    hideLoader();
  }
});

console.log("TYPE:", currentType);
