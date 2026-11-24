const form = document.querySelector(".survey-form");
const nameInput = document.querySelector(".name-input");
const nameError = document.querySelector(".name-error");
const emailInput = document.querySelector(".email-input");
const emailError = document.querySelector(".email-error");
const ratingInput = document.querySelector(".rating-input");
const commentsInput = document.querySelector(".comments-input");
const result = document.querySelector(".result");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName() {
    const isValid = nameInput.value.trim() !== "";

    nameError.textContent = isValid ? "" : "Введите имя пользователя";

    return isValid;
}

function validateEmail() {
    const value = emailInput.value.trim();
    let message = "";

    if (value === "") {message = "Введите email";}
    else if (!EMAIL_PATTERN.test(value)) {message = "Введите email в формате name@mail.ru";}

    emailError.textContent = message;

    return message === "";
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);

function showResult(data) {
    const title = document.createElement("h2");
    title.textContent = "Данные пользователя";

    const lines = [
        ["Имя", data.name],
        ["Email", data.email],
        ["Пол", data.gender],
        ["Оценка сервиса", data.rating],
        ["Интересы", data.interests.length ? data.interests.join(", ") : "не выбраны"],
        ["Комментарии", data.comments || "нет"],
    ];

    const paragraphs = lines.map(([label, value]) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = `${label}: ${value}`;
        return paragraph;
    });

    result.replaceChildren(title, ...paragraphs);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    if (!isNameValid || !isEmailValid) {
        result.replaceChildren();
        return;
    }

    const gender = document.querySelector(".gender-input:checked").value;
    const interests = [...document.querySelectorAll(".interest-input:checked")].map(
        (interest) => interest.value
    );

    showResult({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        gender,
        rating: ratingInput.value,
        interests,
        comments: commentsInput.value.trim(),
    });
});
