const thumbnails = document.querySelector(".thumbnails");
const preview = document.querySelector(".preview");

thumbnails.addEventListener("click", (event) => {
    const thumbnail = event.target.closest(".thumbnail");

    if (!thumbnail) {return;}

    const url = thumbnail.getAttribute("src");

    const image = document.createElement("img");
    image.src = url;
    image.alt = thumbnail.alt;

    preview.replaceChildren(image);
});
