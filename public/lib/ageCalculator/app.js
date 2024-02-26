// Get elements from the DOM
const birthdayInput = document.getElementById("birthday");
const todayInput = document.getElementById("today");
const resultContainer = document.getElementById("resultContainer");

// Set today's date as the default value for the "Age as of" input field
const todayDate = new Date();
const year = todayDate.getFullYear();
const month = String(todayDate.getMonth() + 1).padStart(2, "0");
const day = String(todayDate.getDate()).padStart(2, "0");
const formattedTodayDate = `${year}-${month}-${day}`;
todayInput.value = formattedTodayDate;

// Function to calculate the age
function calculate() {
  const birthday = new Date(birthdayInput.value);
  const today = new Date(todayInput.value);

  if (isNaN(birthday.getTime()) || isNaN(today.getTime())) {
    showError("Invalid date. Please enter valid dates.");
    return;
  }

  // Calculate the difference in milliseconds
  const ageInMilliseconds = today - birthday;

  // Convert milliseconds to years, months, and days
  const ageDate = new Date(ageInMilliseconds);
  const years = ageDate.getUTCFullYear() - 1970;
  const months = ageDate.getUTCMonth();
  const days = ageDate.getUTCDate() - 1;

  // Display the age
  document.getElementById("year").innerText = years;
  document.getElementById("month").innerText = months;
  document.getElementById("day").innerText = days;

  // Display the age in other units (optional)
  displayAgeInOtherUnits(ageInMilliseconds);

  // Remove the "hidden" class from resultContainer
  resultContainer.removeAttribute("class");
}

// Function to reset the form
function reset() {
  birthdayInput.value = "";
  todayInput.value = "";
  resetAgeDisplay();

  // Assign the "hidden" class to resultContainer
  resultContainer.classList.add("hidden");
}

// Function to display an error message using SweetAlert2
function showError(message) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
}

// Function to reset the age display
function resetAgeDisplay() {
  document.getElementById("year").innerText = "00";
  document.getElementById("month").innerText = "00";
  document.getElementById("day").innerText = "00";
  resetSingularExpression();
}

// Function to display the age in other units (optional)
function displayAgeInOtherUnits(milliseconds) {
  const inMonth = Math.floor(milliseconds / (30.44 * 24 * 60 * 60 * 1000));
  const inWeek = Math.floor(milliseconds / (7 * 24 * 60 * 60 * 1000));
  const inDay = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
  const inHour = Math.floor(milliseconds / (60 * 60 * 1000));
  const inMinute = Math.floor(milliseconds / (60 * 1000));
  const inSecond = Math.floor(milliseconds / 1000);

  document.getElementById("inMonth").innerText = inMonth;
  document.getElementById("inWeek").innerText = inWeek;
  document.getElementById("inDay").innerText = inDay;
  document.getElementById("inHour").innerText = inHour;
  document.getElementById("inMinute").innerText = inMinute;
  document.getElementById("inSecond").innerText = inSecond;
}

// Function to reset the singular expression display
function resetSingularExpression() {
  document.getElementById("inMonth").innerText = "00";
  document.getElementById("inWeek").innerText = "00";
  document.getElementById("inDay").innerText = "00";
  document.getElementById("inHour").innerText = "00";
  document.getElementById("inMinute").innerText = "00";
  document.getElementById("inSecond").innerText = "00";
}
