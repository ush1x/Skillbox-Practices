const form = document.querySelector(".survey-form");
const result = document.querySelector(".result");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const checkersDict = {
    required: {
        test: (value) => value.trim().length > 0,
        message: "Обязательное поле для заполнения",
    },
    email: {
        test: (value) => EMAIL_PATTERN.test(value.trim()),
        message: "Введите email в формате name@mail.ru",
    },
};

const validators = [
    {
        field: "name",
        error: document.querySelector(".name-error"),
        checkers: ["required"],
    },
    {
        field: "email",
        error: document.querySelector(".email-error"),
        checkers: ["required", "email"],
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

function showResult(formData) {
    const interests = formData.getAll("interests");

    const lines = [
        ["Имя", formData.get("name").trim()],
        ["Email", formData.get("email").trim()],
        ["Пол", formData.get("gender")],
        ["Оценка сервиса", formData.get("rating")],
        ["Интересы", interests.length ? interests.join(", ") : "не выбраны"],
        ["Комментарии", formData.get("comments").trim() || "нет"],
    ];

    const title = document.createElement("h2");
    title.textContent = "Данные пользователя";

    const paragraphs = lines.map(([label, value]) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = `${label}: ${value}`;
        return paragraph;
    });

    result.replaceChildren(title, ...paragraphs);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    if (!validateForm(formData)) {
        result.replaceChildren();
        return;
    }

    showResult(formData);
});
