const thumbnails = document.querySelectorAll(".thumbnail");
const preview = document.querySelector(".preview");

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
        const url = thumbnail.getAttribute("src");
        const image = document.createElement("img");
        image.src = url;
        image.alt = thumbnail.alt;

        preview.replaceChildren(image);
    });
});
