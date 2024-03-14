const fetchData = async (domain) => {
  try {
    const res = await fetch(`https://sslcheckerapi.vercel.app/${domain}`); // my own api
    const data = await res.json();
    displaySSLInformation(data);
  } catch (error) {
    result.innerHTML = `<div class="text-red-800">${error.message}</div>`;
  }
};

document.getElementById("checkBtn").addEventListener("click", function () {
  const domain = document.getElementById("domain").value;
  if (domain === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Domain is Empty!",
    });
    return;
  }

  clearResult();

  fetchData(domain);
});

const result = document.getElementById("result");

function displaySSLInformation(data) {
  result.innerHTML = `
  <div>
    <div class="dark:bg-slate-700 text-black dark:text-white text-center text-2xl font-bold py-2 px-4 md:col-span-2  border rounded-t-md">SSL Information</div>
    <ul class="*:border *:border-t-0 *:p-2">
      <li><strong>Domain Name:</strong> ${data.domain}</li>
      <li><strong>SSL Provider:</strong> ${data.provider}</li>
      <li><strong>Issued:</strong> ${data.issued}</li>
      <li><strong>Expires:</strong> ${data.expires}</li>
      <li><strong>Expires in:</strong> ${data.daysLeft} Days</li>
    </ul>
  </div>`;
}

function clearResult() {
  result.innerHTML = "";
}

function reset() {
  document.getElementById("domain").value = "";
  clearResult();
}
