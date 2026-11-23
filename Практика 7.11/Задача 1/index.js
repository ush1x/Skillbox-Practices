const books = [
    "Мастер и Маргарита",
    "Гарри Поттер",
    "Над пропастью во ржи",
    "Властелин колец",
    "Дюна",
    "Отцы и дети",
];

const list = document.getElementById("list");
const addButton = document.getElementById("add-button");
const searchButton = document.getElementById("search-button");

function renderBooks(foundIndexes = []) {
    list.innerHTML = "";

    books.forEach((book, index) => {
        const item = document.createElement("li");
        item.textContent = book;

        if (foundIndexes.includes(index)) {item.classList.add("found");}

        list.appendChild(item);
    });
}

addButton.addEventListener("click", () => {
    const title = prompt("Введите название книги");

    if (title === null) {return;}

    if (title.trim() === "") {
        alert("Название книги не введено!");
        return;
    }

    books.push(title.trim());
    renderBooks();
});

searchButton.addEventListener("click", () => {
    const query = prompt("Введите название книги для поиска");

    if (query === null) {return;}

    const searchText = query.trim().toLowerCase();
    const foundIndexes = [];

    books.forEach((book, index) => {
        if (searchText && book.toLowerCase().includes(searchText)) {foundIndexes.push(index);}
    });

    if (foundIndexes.length === 0) {
        alert("Книга не найдена!");
        renderBooks();
        return;
    }

    renderBooks(foundIndexes);
});

renderBooks();
