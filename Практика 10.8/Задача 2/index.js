const list = document.querySelector(".list");
const addButton = document.querySelector(".add-button");
const removeButton = document.querySelector(".remove-button");

addButton.addEventListener("click", () => {
    const item = document.createElement("li");
    item.textContent = "Новый элемент списка";
    list.appendChild(item);
});

removeButton.addEventListener("click", () => {
    const lastItem = list.lastElementChild;

    if (lastItem) {lastItem.remove();}
});
