document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const cards = document.querySelectorAll(".cards");
  const nothingFound = document.getElementById("nothing-alert");
  let number = 0;

  function filterIcons(searchQuery) {
    cards.forEach(function (card) {
      const name = card.querySelector("span").textContent.toLowerCase();
      if (name.includes(searchQuery.toLowerCase())) {
        nothingFound.style.display = "none";
        card.style.display = "flex";
        number++;
      } else {
        card.style.display = "none";
      }
    });
    if (number === 0) {
      nothingFound.style.display = "block";
    }
  }
  searchInput.addEventListener("input", function () {
    const searchQuery = searchInput.value.trim();
    number = 0;
    filterIcons(searchQuery);
  });
});
