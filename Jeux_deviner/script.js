const number = document.getElementById("number");
const btnDeviner = document.getElementById("btnDeviner");
const btnContainer = document.getElementById("btnContainer");
const body = document.getElementById("body");
let i = 0;

const random_number = Math.floor(Math.random() * 100);

function deviner() {
  i++;
  nombre = number.value;
  if (!nombre == "") {
    if (nombre == random_number) {
      // Overlay
      const overlay = document.createElement("div");

      overlay.classList.add("overlay");

      para = document.createElement("p");
      para.classList.toggle("para");
      para.textContent = "🎉 Felicitations vous avez deviné le nombre !";

      successDiv = document.createElement("div");
      successDiv.classList.toggle("successDiv");
      successDiv.appendChild(para);
      body.appendChild(successDiv);

      overlay.appendChild(successDiv);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => {
        overlay.remove();
        bouton();
      });

      successDiv.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    } else {
      if (i < 7) {
        if (nombre < 0 || nombre > 100) {
          alert("Le nombre doit etre entre 0 ~ 100");
          number.value = "";
        } else if (nombre < random_number) {
          alert("Tentez un nombre superieur");
          number.value = "";
        } else if (nombre > random_number) {
          alert("Tentez un nombre inferieur");
          number.value = "";
        }
      } else {
        alert("Vous avez echoue ! Le bon nombre etait : " + random_number);
        bouton();
      }
    }
  } else {
    alert("Aucun nombre entre");
  }
}

btnDeviner.addEventListener("click", deviner);

function bouton() {
  const btn = document.createElement("button");
  btn.classList.toggle("btn");
  btn.textContent = "Recommencer";
  btnContainer.appendChild(btn);
  btnDeviner.disabled = true;

  btn.addEventListener("click", () => {
    window.location = "index.html";
  });
}
