/* =========================
   LANGUAGE
========================= */

const languageBtn = document.getElementById("languageBtn");

let currentLanguage = "ar";

languageBtn.addEventListener("click", function () {

    if (currentLanguage === "ar") {

        currentLanguage = "en";

        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";

        languageBtn.textContent = "العربية";

    } else {

        currentLanguage = "ar";

        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";

        languageBtn.textContent = "English";
    }

    const elements = document.querySelectorAll("[data-ar][data-en]");

    elements.forEach(function (element) {

        element.textContent =
            currentLanguage === "ar"
                ? element.getAttribute("data-ar")
                : element.getAttribute("data-en");

    });

});


/* =========================
   DISCOVER PRODUCTS
========================= */

const heroProductsBtn =
    document.querySelector(".hero-products-btn");

if (heroProductsBtn) {

    heroProductsBtn.addEventListener("click", function () {

        const productsSection =
            document.getElementById("products");

        if (productsSection) {
            productsSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

}
