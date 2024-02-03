// Function to fetch and display IP information
function getIpInformation(ipAddress) {
  fetch(`https://ipapi.co/${ipAddress}/json/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("ERROR: Failed to fetch IP information.");
      }
      return response.json();
    })
    .then((data) => {
      displayIpInformation(data);
    })
    .catch((error) => {
      console.error(error);
      displayErrorMessage("ERROR: IP Address not found.");
    });
}

// Function to display IP information
function displayIpInformation(data) {
  const result = document.getElementById("result");
  result.innerHTML = `<ul class="grid md:grid-cols-2 text-left">
    <li class="dark:bg-slate-700 text-black dark:text-white text-center text-xl font-bold py-2 px-4 md:col-span-2  border rounded-t-md">IP Information</li>
    <li class="border p-2"><strong>IP Address:</strong> ${data.ip}</li>
    <li class="border p-2"><strong>IP Version:</strong> ${data.version}</li>
    <li class="border p-2"><strong>ISP:</strong> ${data.org}</li>
    <li class="border p-2"><strong>City:</strong> ${data.city}</li>
    <li class="border p-2"><strong>Region:</strong> ${data.region}</li>
    <li class="border p-2"><strong>Capital:</strong> ${data.country_capital}</li>
    <li class="border p-2"><strong>Country:</strong> ${data.country_name}</li>
    <li class="border p-2"><strong>Country TLD:</strong> ${data.country_tld}</li>
    <li class="border p-2"><strong>Region Code:</strong> ${data.region_code}</li>
    <li class="border p-2"><strong>Postal Code:</strong> ${data.postal}</li>
    <li class="border p-2"><strong>Latitude:</strong> ${data.latitude}</li>
    <li class="border p-2"><strong>Longitude:</strong> ${data.longitude}</li>
    <li class="border p-2"><strong>Timezone:</strong> ${data.timezone}</li>
    <li class="border p-2"><strong>Currency:</strong> ${data.currency}</li>
    <li class="border p-2"><strong>Currency Name:</strong> ${data.currency_name}</li>
    <li class="border p-2"><strong>Calling Code:</strong> ${data.country_calling_code}</li>
    <li class="border p-2"><strong>Languages:</strong> ${data.languages}</li>
    <li class="border p-2"><strong>ASN:</strong> ${data.asn}</li>
    <li class="border p-2"><strong>Organization:</strong> ${data.org}</li>
    <li class="border p-2"><strong>Hostname:</strong> ${data.hostnamee}</li>
    <li class="border p-2 md:col-span-2 rounded-b-md"><strong>User Agent:</strong> ${navigator.userAgent}</li>
  </ul>`;
}

// Function to clear IP information
function clearIpInformation() {
  const result = document.getElementById("result");
  result.innerHTML = "";
}

// Function to display error message
function displayErrorMessage(message) {
  const result = document.getElementById("result");
  result.innerHTML = `<p>${message}</p>`;
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Get user's IP address using a free service like ipify.org
  fetch("https://api.ipify.org?format=json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("ERROR: Failed to fetch IP address.");
      }
      return response.json();
    })
    .then((data) => {
      const ipAddressInput = document.getElementById("ipAddress");
      ipAddressInput.value = data.ip;

      // Automatically perform IP information lookup
      getIpInformation(data.ip);
    })
    .catch((error) => {
      console.error(error);
      displayErrorMessage("ERROR: Failed to fetch IP address.");
    });

  // Handle the "Check" button click
  document.getElementById("checkBtn").addEventListener("click", function () {
    const ipAddress = document.getElementById("ipAddress").value;

    // Perform IP information lookup
    getIpInformation(ipAddress);
  });

  // Handle the "Clear" button click
  document.getElementById("clearBtn").addEventListener("click", function () {
    // Clear the displayed information
    clearIpInformation();
  });
});
