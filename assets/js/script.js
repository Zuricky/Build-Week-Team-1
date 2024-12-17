const stars = document.querySelectorAll(".star");
let selectedRating = 0;

// Funzione per colorare le stelle
function updateStars(index) {
  stars.forEach((star, i) => {
    if (i <= index) {
      star.querySelector("path").setAttribute("fill", "#00FFFF")
    } else {
      star.querySelector("path").setAttribute("fill", "#0B113B");
    }
  });
}
//Da qui ho copiato quasi tutto)))
stars.forEach((star, index) => {
  star.addEventListener("mouseover", () => {
    updateStars(index);
  });

  star.addEventListener("click", () => {
    selectedRating = index + 1;
    console.log(`Hai selezionato ${selectedRating} stelle!`);
  });

  star.addEventListener("mouseout", () => {
    updateStars(selectedRating - 1);
  });
});