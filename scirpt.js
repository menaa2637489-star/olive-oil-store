/* =========================
   LANGUAGE
========================= */

const languageBtn = document.getElementById("languageBtn");

let currentLanguage = "ar";

function updateLanguage() {

    /* =========================
       CHANGE TEXT
    ========================= */

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


    /* =========================
       ABOUT US
    ========================= */

    const aboutAr = document.querySelector(".about-ar");
    const aboutEn = document.querySelector(".about-en");

    if (aboutAr && aboutEn) {

        if (currentLanguage === "en") {

            aboutAr.style.display = "none";
            aboutEn.style.display = "block";

        } else {

            aboutAr.style.display = "block";
            aboutEn.style.display = "none";

        }

    }


    /* =========================
       PAGE LANGUAGE
    ========================= */

    if (currentLanguage === "en") {

        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";

        languageBtn.textContent = "العربية";

    } else {

        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";

        languageBtn.textContent = "English";

    }

}


/* =========================
   LANGUAGE BUTTON
========================= */

if (languageBtn) {

    languageBtn.addEventListener("click", function () {

        if (currentLanguage === "ar") {

            currentLanguage = "en";

        } else {

            currentLanguage = "ar";

        }

        updateLanguage();

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

alert("JavaScript is working");
