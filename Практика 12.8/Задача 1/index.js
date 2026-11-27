const giftArr = [
    {
        title: "Скидка 20% на первую покупку в нашем магазине!",
        icon: "img/discount.svg",
    },
    {
        title: "Скидка 10% на всё!",
        icon: "img/discount_2.svg",
    },
    {
        title: "Подарок при первой покупке в нашем магазине!",
        icon: "img/gift.svg",
    },
    {
        title: "Бесплатная доставка для вас!",
        icon: "img/delivery.svg",
    },
    {
        title: "Сегодня день больших скидок!",
        icon: "img/discount_3.svg",
    },
];

function getRandomGift() {
    const index = Math.floor(Math.random() * giftArr.length);
    return giftArr[index];
}

function createGiftCard({ title, icon }) {
    const card = document.createElement("div");
    card.classList.add("popup");

    const image = document.createElement("img");
    image.classList.add("popup-icon");
    image.src = icon;
    image.alt = "";

    const content = document.createElement("div");
    content.classList.add("popup-content");

    const text = document.createElement("p");
    text.classList.add("popup-title");
    text.textContent = title;

    const button = document.createElement("button");
    button.classList.add("popup-button");
    button.textContent = "Отлично!";

    button.addEventListener("click", () => {
        card.remove();
    });

    content.append(text, button);
    card.append(image, content);

    return card;
}

setTimeout(() => {
    document.body.appendChild(createGiftCard(getRandomGift()));
}, 3000);
