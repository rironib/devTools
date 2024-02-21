document.getElementById("checkBtn").addEventListener("click", function () {
  const domain = document.getElementById("domain").value.trim();
  if (domain === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Enter a valid domain!",
    });
    return;
  }

  // Clear previous results
  clearResult();

  const apiUrl = `https://api.ssllabs.com/api/v3/analyze?host=${domain}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("ERROR: Failed to fetch SSL information.");
      }
      return response.json();
    })
    .then((data) => {
      displaySSLInformation(data);
    })
    .catch((error) => {
      console.error(error);
      displayErrorMessage("ERROR: Failed to fetch SSL information.");
    });
});

function displaySSLInformation(data) {
  const result = document.getElementById("result");
  const grade = data.endpoints[0].grade;

  result.innerHTML = `<div class="bg-green-100 p-4 rounded-md">
<p class="text-lg font-bold">SSL Information for ${data.host}:</p>
<p class="mb-2"><strong>Grade:</strong> ${grade}</p>
<p class="mb-2"><strong>Details:</strong> ${data.endpoints[0].details}</p>
<p class="mb-2"><strong>Protocol:</strong> ${data.endpoints[0].details.protocols[0]}</p>
<p class="mb-2"><strong>Cipher Suite:</strong> ${data.endpoints[0].details.suites[0].name}</p>
</div>`;
}

function displayErrorMessage(message) {
  const result = document.getElementById("result");
  result.innerHTML = `<p class="text-red-500">${message}</p>`;
}

function clearResult() {
  const result = document.getElementById("result");
  result.innerHTML = "";
}

function reset() {
  document.getElementById("domain").value = "";
  document.getElementById("result").innerHTML = "";
}
