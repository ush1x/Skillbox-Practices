const form = document.querySelector(".product-form");
const tableBody = document.querySelector(".product-table tbody");

const NAME_PATTERN = /[A-Za-zА-Яа-яЁё]/;

const checkersDict = {
    required: {
        test: (value) => value.trim().length > 0,
        message: "Обязательное поле для заполнения",
    },
    productName: {
        test: (value) => NAME_PATTERN.test(value) && value.trim().length <= 50,
        message: "Название должно содержать буквы и быть не длиннее 50 символов",
    },
    positive: {
        test: (value) => +value > 0,
        message: "Введите положительное число",
    },
};

const validators = [
    {
        field: "name",
        error: document.querySelector(".name-error"),
        checkers: ["required", "productName"],
    },
    {
        field: "weight",
        error: document.querySelector(".weight-error"),
        checkers: ["required", "positive"],
    },
    {
        field: "distance",
        error: document.querySelector(".distance-error"),
        checkers: ["required", "positive"],
    },
];

function validateForm(formData) {
    return validators
        .map(({ field, error, checkers }) => {
            const value = formData.get(field);
            const failedChecker = checkers.find(
                (checker) => !checkersDict[checker].test(value)
            );

            error.textContent = failedChecker
                ? checkersDict[failedChecker].message
                : "";

            return !failedChecker;
        })
        .every(Boolean);
}

function addProductToTable(formData) {
    const name = formData.get("name").trim();
    const weight = +formData.get("weight");
    const distance = +formData.get("distance");
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

    const formData = new FormData(form);

    if (!validateForm(formData)) {
        return;
    }

    addProductToTable(formData);
    form.reset();
});
