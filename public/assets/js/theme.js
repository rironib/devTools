const theme = document.getElementById("theme");
const light = document.getElementById("light");
const dark = document.getElementById("dark");

if (
  localStorage.theme === "dark" ||
  (!localStorage.theme &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  dark.classList.remove("hidden");
} else {
  document.documentElement.classList.remove("dark");
  light.classList.remove("hidden");
}

theme.addEventListener("click", function () {
  dark.classList.toggle("hidden");
  light.classList.toggle("hidden");

  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.theme = isDark ? "dark" : "light";
});
