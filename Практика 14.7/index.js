const form = document.querySelector(".movie-form");
const titleInput = document.querySelector(".title-input");
const genreInput = document.querySelector(".genre-input");
const yearInput = document.querySelector(".year-input");
const watchedInput = document.querySelector(".watched-input");
const submitButton = document.querySelector(".submit-button");
const cancelButton = document.querySelector(".cancel-button");
const sortSelect = document.querySelector(".sort-select");
const sortButton = document.querySelector(".sort-button");
const tableBody = document.querySelector(".movie-table tbody");

const fields = ["title", "genre", "year"];

// при первом запуске вывод 2 фильмов из localstorage
let movies = JSON.parse(localStorage.getItem("movies")) || [
    { id: 1, title: "Назад в будущее", genre: "Приключение", year: 1985, watched: true },
    { id: 2, title: "Матрица", genre: "Киберпанк", year: 1999, watched: false },
];
let editingId = null;

function saveMovies() {
    localStorage.setItem("movies", JSON.stringify(movies));
}

// создание строки таблицы для фильма
function createRow(movie) {
    const row = document.createElement("tr");
    row.dataset.id = movie.id;

    [movie.title, movie.genre, movie.year, movie.watched ? "Да" : "Нет"].forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    const actions = document.createElement("td");
    actions.innerHTML = `
        <button class="edit-button">Редактировать</button>
        <button class="delete-button">Удалить</button>
    `;
    row.appendChild(actions);

    return row;
}

function renderMovies() {
    tableBody.replaceChildren(...movies.map(createRow));
}

function clearErrors() {
    fields.forEach((field) => {
        document.querySelector(`.${field}-error`).textContent = "";
    });
}

// проверка на заполнение всех полей формы
function validate(formData) {
    clearErrors();
    let isValid = true;

    fields.forEach((field) => {
        if (formData.get(field).trim() === "") {
            document.querySelector(`.${field}-error`).textContent = "Заполните поле";
            isValid = false;
        }
    });

    return isValid;
}

function exitEditMode() {
    editingId = null;
    form.reset();
    clearErrors();
    submitButton.textContent = "Добавить";
    cancelButton.hidden = true;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    if (!validate(formData)) {return;}

    const data = {
        title: formData.get("title").trim(),
        genre: formData.get("genre").trim(),
        year: +formData.get("year"),
        watched: formData.has("watched"),
    };

    if (editingId === null) {
        const movie = { id: Date.now(), ...data };
        movies.push(movie);
        tableBody.appendChild(createRow(movie));
    } else {
        const movie = movies.find((item) => item.id === editingId);
        Object.assign(movie, data);
        tableBody.querySelector(`[data-id="${editingId}"]`).replaceWith(createRow(movie));
    }

    saveMovies();
    exitEditMode();
});

cancelButton.addEventListener("click", exitEditMode);

tableBody.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) {return;}

    const row = button.closest("tr");
    const id = +row.dataset.id;

    if (button.classList.contains("delete-button")) {
        movies = movies.filter((movie) => movie.id !== id);
        saveMovies();
        row.remove();

        if (editingId === id) {exitEditMode();}
    } else {
        const movie = movies.find((item) => item.id === id);

        editingId = id;
        titleInput.value = movie.title;
        genreInput.value = movie.genre;
        yearInput.value = movie.year;
        watchedInput.checked = movie.watched;

        clearErrors();
        submitButton.textContent = "Обновить";
        cancelButton.hidden = false;
    }
});

sortButton.addEventListener("click", () => {
    const key = sortSelect.value;

    movies.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    saveMovies();
    renderMovies();
});

renderMovies();
