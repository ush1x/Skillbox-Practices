const heights = [164, 157, 160, 143, 170];

const list = document.querySelector(".list");
const addButton = document.querySelector(".add-button");
const filterButton = document.querySelector(".filter-button");

function parseNumber(text) {
    return +text.trim().replace(",", ".");
}

function addHeightToList(height) {
    const item = document.createElement("li");
    item.textContent = height;
    list.appendChild(item);
}

function renderHeights(items) {
    list.innerHTML = "";
    items.forEach(addHeightToList);
}

addButton.addEventListener("click", () => {
    const value = prompt("Введите рост ученика");

    if (value === null) {return;}

    if (value.trim() === "") {
        alert("Рост не введён!");
        return;
    }

    const height = parseNumber(value);

    if (isNaN(height)) {
        alert("Рост должен быть числом!");
        return;
    }

    heights.push(height);
    addHeightToList(height);
});

filterButton.addEventListener("click", () => {
    const value = prompt("Введите минимальный рост");

    if (value === null) {return;}

    if (value.trim() === "") {
        renderHeights(heights);
        return;
    }

    const minHeight = parseNumber(value);

    if (isNaN(minHeight)) {
        alert("Минимальный рост должен быть числом!");
        return;
    }

    renderHeights(heights.filter((height) => height >= minHeight));
});

heights.forEach(addHeightToList);
