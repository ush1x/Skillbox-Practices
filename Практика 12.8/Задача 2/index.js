const promocodeObj = {
    promocode: "PROM50",
    gift: "Скидка 50%",
};

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // неделя в секундах

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
    const isValid = code === promocodeObj.promocode;

    form.classList.toggle("promo-form--success", isValid);
    message.textContent = isValid
        ? `Промокод применён. ${promocodeObj.gift}`
        : "";

    return isValid;
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
