function checkSSL() {
  const domain = document.getElementById("url").value;
  const resultDiv = document.getElementById("result");

  if (!domain) {
    resultDiv.innerHTML = '<p class="text-red-500">Please enter a domain.</p>';
    return;
  }

  const apiUrl = `https://api.ssllabs.com/api/v3/analyze?host=${domain}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("ERROR: Failed to fetch domain information.");
      }
      return response.json();
    })
    .then((data) => {
      displaySSLResult(data);
    })
    .catch((error) => {
      resultDiv.innerHTML = `<p class="text-red-500">An error occurred: ${error.message}</p>`;
    });
}

function displaySSLResult(data) {
  const resultDiv = document.getElementById("result");
  const endpoints = data.endpoints
    .map((endpoint) => {
      return `<p>IP Address: ${endpoint.ipAddress} - Grade: ${endpoint.grade}</p>`;
    })
    .join("");

  resultDiv.innerHTML = `<ul class="grid md:grid-cols-2 text-left">
      <li class="dark:bg-slate-700 text-black dark:text-white text-center text-xl font-bold py-2 px-4 md:col-span-2  border rounded-t-md">SSL Information</li>
      <li class="border p-2"><strong>Host:</strong> ${data.host}</li>
      <li class="border p-2"><strong>Port:</strong> ${data.port}</li>
      <li class="border p-2"><strong>Protocol:</strong> ${data.protocol}</li>
      <!-- Add more properties as needed -->
      ${endpoints}
      <li class="border p-2 md:col-span-2 rounded-b-md"><strong>User Agent:</strong> ${navigator.userAgent}</li>
    </ul>`;
}
