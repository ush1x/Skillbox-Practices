const products = [
    "Молоко",
    "Яблоки",
    "Сахар",
    "Арбуз",
    "Кофе",
    "Книга",
    "Макароны",
];

const list = document.querySelector(".list");
const addButton = document.querySelector(".add-button");

function sortProducts() {
    products.sort((a, b) => a.localeCompare(b, "ru"));
}

function createProductItem(product) {
    const item = document.createElement("li");
    item.textContent = product;
    return item;
}

addButton.addEventListener("click", () => {
    const name = prompt("Введите название товара");

    if (name === null) {return;}

    if (name.trim() === "") {
        alert("Название товара не введено!");
        return;
    }

    products.push(name.trim());
    sortProducts();

    const index = products.indexOf(name.trim());
    list.insertBefore(createProductItem(name.trim()), list.children[index] || null);
});

sortProducts();
products.forEach((product) => list.appendChild(createProductItem(product)));
