const books = [
    "Мастер и Маргарита",
    "Гарри Поттер",
    "Над пропастью во ржи",
    "Властелин колец",
    "Дюна",
    "Отцы и дети",
];

const list = document.querySelector(".list");
const addButton = document.querySelector(".add-button");
const searchButton = document.querySelector(".search-button");

function addBookToList(book) {
    const item = document.createElement("li");
    item.textContent = book;
    list.appendChild(item);
}

addButton.addEventListener("click", () => {
    const title = prompt("Введите название книги");

    if (title === null) {return;}

    if (title.trim() === "") {
        alert("Название книги не введено!");
        return;
    }

    books.push(title.trim());
    addBookToList(title.trim());
});

searchButton.addEventListener("click", () => {
    const query = prompt("Введите название книги для поиска");

    if (query === null) {return;}

    const searchText = query.trim().toLowerCase();
    const items = [...document.querySelectorAll(".list li")];

    const results = items.map((item) => {
        const isFound =
            searchText !== "" &&
            item.textContent.toLowerCase().includes(searchText);

        item.classList.toggle("found", isFound);

        return isFound;
    });

    if (!results.includes(true)) {
        alert("Книга не найдена!");
    }
});

books.forEach(addBookToList);
