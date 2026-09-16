/* =========================
   LANGUAGE
========================= */

const languageBtn = document.getElementById("languageBtn");

let currentLanguage = "ar";

if (languageBtn) {

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

        const elements =
            document.querySelectorAll("[data-ar][data-en]");

        elements.forEach(function (element) {

            if (currentLanguage === "en") {

                element.textContent =
                    element.getAttribute("data-en");

            } else {

                element.textContent =
                    element.getAttribute("data-ar");

            }

        });

    });

}
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
