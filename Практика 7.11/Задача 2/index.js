const heights = [164, 157, 160, 143, 170];

const list = document.getElementById("list");
const addButton = document.getElementById("add-button");
const filterButton = document.getElementById("filter-button");

function parseNumber(text) {
    return Number(text.trim().replace(",", "."));
}

function renderHeights(items) {
    list.innerHTML = "";

    items.forEach((height) => {
        const item = document.createElement("li");
        item.textContent = height;
        list.appendChild(item);
    });
}

addButton.addEventListener("click", () => {
    const value = prompt("Введите рост ученика");

    if (value === null) {return;}

    if (value.trim() === "") {
        alert("Рост не введён!");
        return;
    }

    const height = parseNumber(value);

    if (Number.isNaN(height)) {
        alert("Рост должен быть числом!");
        return;
    }

    heights.push(height);
    renderHeights(heights);
});

filterButton.addEventListener("click", () => {
    const value = prompt("Введите минимальный рост");

    if (value === null) {return;}

    if (value.trim() === "") {
        renderHeights(heights);
        return;
    }

    const minHeight = parseNumber(value);

    if (Number.isNaN(minHeight)) {
        alert("Минимальный рост должен быть числом!");
        return;
    }

    renderHeights(heights.filter((height) => height >= minHeight));
});

renderHeights(heights);
