document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const cards = document.querySelectorAll(".cards");
  const nothingAlerts = document.querySelectorAll(".nothing-alert");
  let number = 0;

  function filterIcons(searchQuery) {
    cards.forEach(function (card) {
      const name = card.querySelector("span").textContent.toLowerCase();
      if (name.includes(searchQuery.toLowerCase())) {
        nothingAlerts.forEach(function (nothingAlert) {
          nothingAlert.style.display = "none";
        });
        card.style.display = "flex";
        number++;
      } else {
        card.style.display = "none";
      }
    });

    if (number === 0) {
      nothingAlerts.forEach(function (nothingAlert) {
        nothingAlert.style.display = "block";
      });
    }
  }

  searchInput.addEventListener("input", function () {
    const searchQuery = searchInput.value.trim();
    number = 0;
    filterIcons(searchQuery);
  });
});
