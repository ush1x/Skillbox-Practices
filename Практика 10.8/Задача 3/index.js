const prices = [100, 500, 250, 750, 300];

const list = document.querySelector(".list");
const sortAscButton = document.querySelector(".sort-asc-button");
const sortDescButton = document.querySelector(".sort-desc-button");

function renderPrices() {
    list.innerHTML = "";

    prices.forEach((price) => {
        const item = document.createElement("li");
        item.textContent = price;
        list.appendChild(item);
    });
}

function sortAscending() {
    prices.sort();
}

function sortDescending() {
    prices.sort((a, b) => b - a);
}

sortAscButton.addEventListener("click", () => {
    sortAscending();
    renderPrices();
});

sortDescButton.addEventListener("click", () => {
    sortDescending();
    renderPrices();
});

renderPrices();
