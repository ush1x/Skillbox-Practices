const products = [
    "Молоко",
    "Яблоки",
    "Сахар",
    "Арбуз",
    "Кофе",
    "Книга",
    "Макароны",
];

const list = document.getElementById("list");
const addButton = document.getElementById("add-button");

function sortProducts() {
    products.sort((a, b) => a.localeCompare(b, "ru"));
}

function renderProducts() {
    sortProducts();
    list.innerHTML = "";

    products.forEach((product) => {
        const item = document.createElement("li");
        item.textContent = product;
        list.appendChild(item);
    });
}

addButton.addEventListener("click", () => {
    const name = prompt("Введите название товара");
    if (name === null) {return;}
    if (name.trim() === "") {
        alert("Название товара не введено!");
        return;
    }
    
    products.push(name.trim());
    renderProducts();
});

renderProducts();
