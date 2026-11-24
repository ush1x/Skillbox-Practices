const form = document.querySelector(".product-form");
const nameInput = document.querySelector(".name-input");
const weightInput = document.querySelector(".weight-input");
const distanceInput = document.querySelector(".distance-input");
const nameError = document.querySelector(".name-error");
const weightError = document.querySelector(".weight-error");
const distanceError = document.querySelector(".distance-error");
const tableBody = document.querySelector(".product-table tbody");

const NAME_PATTERN = /[A-Za-zА-Яа-яЁё]/;

function getValidData() {
    const name = nameInput.value.trim();
    const weight = +weightInput.value;
    const distance = +distanceInput.value;

    const isNameValid = NAME_PATTERN.test(name) && name.length <= 50;
    const isWeightValid = weight > 0;
    const isDistanceValid = distance > 0;

    nameError.textContent = isNameValid
        ? ""
        : "Введите название товара (буквы, не более 50 символов)";
    weightError.textContent = isWeightValid
        ? ""
        : "Вес должен быть положительным числом";
    distanceError.textContent = isDistanceValid
        ? ""
        : "Расстояние должно быть положительным числом";

    if (!isNameValid || !isWeightValid || !isDistanceValid) { return null; }

    return { name, weight, distance };
}

function addProductToTable({ name, weight, distance }) {
    const cost = (weight * distance) / 10;
    const row = document.createElement("tr");

    [name, weight, distance, `${cost.toFixed(2)} руб.`].forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    tableBody.appendChild(row);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = getValidData();

    if (!data) { return; }

    addProductToTable(data);
    form.reset();
});
