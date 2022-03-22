const hrefBtnEls = document.querySelectorAll(".wrap button");
const formEls = document.querySelectorAll("div[data-form]");

for (const hrefBtn of hrefBtnEls) {
    hrefBtn.addEventListener("click", () => {
        for (const form of formEls) {
            form.style.display = "none";
        }

        document.querySelector(`div[data-form=${hrefBtn.id}]`).style.display = "block";
    });
}