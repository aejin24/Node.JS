const hrefBtnEls = document.querySelectorAll(".wrap button");
const formEls = document.querySelectorAll("div[data-form]");
const updateBtnEl = document.getElementById("update");
const updateFormEl = document.querySelector("div[data-form='update']");

for (const hrefBtn of hrefBtnEls) {
    hrefBtn.addEventListener("click", () => {
        for (const form of formEls) {
            form.style.display = "none";
        }

        document.querySelector(`div[data-form=${hrefBtn.id}]`).style.display = "block";
    });
}

if (updateBtnEl) {
    updateBtnEl.addEventListener("click", () => {
        updateFormEl.style.display = "block";
    });
}