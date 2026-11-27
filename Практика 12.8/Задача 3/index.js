const promocodeArr = [
    {
        promocode: "PROM10",
        gift: "Скидка 10%",
    },
    {
        promocode: "PROM50",
        gift: "Скидка 50%",
    },
    {
        promocode: "GIFT",
        gift: "Подарок в корзине",
    },
];

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const form = document.querySelector(".promo-form");
const input = document.querySelector(".promo-input");
const message = document.querySelector(".promo-message");

function getCookie() {
    return document.cookie.split("; ").reduce((acc, item) => {
        const [name, value] = item.split("=");
        acc[name] = value;
        return acc;
    }, {});
}

function applyPromocode(code) {
    const found = promocodeArr.find((item) => item.promocode === code);

    form.classList.toggle("promo-form--success", Boolean(found));
    message.textContent = found ? `Промокод применён. ${found.gift}` : "";

    return Boolean(found);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const code = new FormData(form).get("promocode").trim().toUpperCase();

    if (applyPromocode(code)) {
        document.cookie = `promocode=${code}; max-age=${COOKIE_MAX_AGE}; path=/`;
    }
});

const cookie = getCookie();

if (cookie.promocode) {
    input.value = cookie.promocode;
    applyPromocode(cookie.promocode);
}
