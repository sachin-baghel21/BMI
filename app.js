// Toggle dropdown menu visibility in mobile view
document.querySelector('[data-collapse-toggle]').addEventListener('click', function () {
  const target = document.getElementById(this.getAttribute('aria-controls'));
  target.classList.toggle('hidden');
});
// this code drop down links
document.addEventListener("DOMContentLoaded", () => {
// Select the dropdown button and the dropdown menu
const dropdownButton = document.getElementById("mega-menu-icons-dropdown-button");
const dropdownMenu = document.getElementById("mega-menu-icons-dropdown");

// Select the toggle button for mobile menu
const toggleButton = document.querySelector("[data-collapse-toggle='mega-menu-icons']");
const megaMenu = document.getElementById("mega-menu-icons");

// Add click event for dropdown button
dropdownButton.addEventListener("click", (e) => {
    e.preventDefault();
    dropdownMenu.classList.toggle("hidden");
});

// Add click event for toggle button (mobile view)
toggleButton.addEventListener("click", (e) => {
    e.preventDefault();
    megaMenu.classList.toggle("hidden");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add("hidden");
    }
});
});
//navbar code
const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');


button.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});
