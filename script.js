/* =========================
   LANGUAGE
========================= */

const languageBtn =
    document.getElementById("languageBtn");

let currentLanguage =
    localStorage.getItem("siteLanguage") || "ar";


/* =========================
   CART
========================= */

let cart =
    JSON.parse(localStorage.getItem("oliveOilCart")) || [];


/* =========================
   PANELS
========================= */

const cartPanel =
    document.getElementById("cartPanel");

const loginPanel =
    document.getElementById("loginPanel");

const contactPanel =
    document.getElementById("contactPanel");

const panelOverlay =
    document.getElementById("panelOverlay");


function closeAllPanels() {

    if (cartPanel) {
        cartPanel.classList.remove("active");
    }

    if (loginPanel) {
        loginPanel.classList.remove("active");
    }

    if (contactPanel) {
        contactPanel.classList.remove("active");
    }

    if (panelOverlay) {
        panelOverlay.classList.remove("active");
    }

}


/* =========================
   OPEN PANEL
========================= */

function openPanel(panel) {

    closeAllPanels();

    if (panel) {
        panel.classList.add("active");
    }

    if (panelOverlay) {
        panelOverlay.classList.add("active");
    }

}


/* =========================
   CART BUTTON
========================= */

const cartBtn =
    document.getElementById("cartBtn");

if (cartBtn) {

    cartBtn.addEventListener("click", function () {

        renderCart();

        openPanel(cartPanel);

    });

}


/* =========================
   LOGIN BUTTON
========================= */

const loginBtn =
    document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        openPanel(loginPanel);

    });

}


/* =========================
   CONTACT BUTTON
========================= */

const contactBtn =
    document.getElementById("contactBtn");

if (contactBtn) {

    contactBtn.addEventListener("click", function () {

        openPanel(contactPanel);

    });

}


/* =========================
   CLOSE OVERLAY
========================= */

if (panelOverlay) {

    panelOverlay.addEventListener(
        "click",
        closeAllPanels
    );

}


/* =========================
   ADD PRODUCT
========================= */

const addProductButtons =
    document.querySelectorAll(".add-product-btn");


addProductButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productName =
            currentLanguage === "en"
                ? button.getAttribute("data-product-en")
                : button.getAttribute("data-product");


        const existingProduct =
            cart.find(function (item) {

                return item.nameAr ===
                    button.getAttribute("data-product");

            });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                id: Date.now(),

                nameAr:
                    button.getAttribute("data-product"),

                nameEn:
                    button.getAttribute("data-product-en"),

                quantity: 1,

                price: 0

            });

        }


        saveCart();

        renderCart();

        openPanel(cartPanel);

    });

});


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "oliveOilCart",
        JSON.stringify(cart)
    );

}


/* =========================
   RENDER CART
========================= */

function renderCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartCount =
        document.getElementById("cartCount");


    if (!cartItems) return;


    let totalQuantity = 0;


    cart.forEach(function (item) {

        totalQuantity += item.quantity;

    });


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                ${
                    currentLanguage === "en"
                    ? "Your cart is currently empty"
                    : "السلة فارغة حاليًا"
                }

            </p>

        `;

        if (cartTotal) {

            cartTotal.textContent = "0";

        }

        return;

    }


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach(function (item) {

        const itemName =
            currentLanguage === "en"
                ? item.nameEn
                : item.nameAr;


        total +=
            (item.price || 0) *
            item.quantity;


        const itemElement =
            document.createElement("div");


        itemElement.className =
            "cart-item";


        itemElement.innerHTML = `

            <div class="cart-item-name">

                ${itemName}

            </div>


            <div class="cart-item-controls">

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>


                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})">

                    ${
                        currentLanguage === "en"
                        ? "Remove"
                        : "حذف"
                    }

                </button>

            </div>

        `;


        cartItems.appendChild(itemElement);

    });


    if (cartTotal) {

        cartTotal.textContent =
            total;

    }

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(id, change) {

    const item =
        cart.find(function (product) {

            return product.id === id;

        });


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(function (product) {

                return product.id !== id;

            });

    }


    saveCart();

    renderCart();

}


/* =========================
   REMOVE PRODUCT
========================= */

function removeFromCart(id) {

    cart =
        cart.filter(function (item) {

            return item.id !== id;

        });


    saveCart();

    renderCart();

}


/* =========================
   LOGIN
========================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value.trim();


            if (!email || !password) {

                alert(
                    currentLanguage === "en"
                        ? "Please enter your email and password."
                        : "من فضلك ادخلي البريد الإلكتروني وكلمة المرور."
                );

                return;

            }


            localStorage.setItem(
                "oliveOilUserEmail",
                email
            );


            alert(
                currentLanguage === "en"
                    ? "Login successful."
                    : "تم تسجيل الدخول بنجاح."
            );


            loginForm.reset();

            closeAllPanels();

        }
    );

}


/* =========================
   CONTACT
========================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "contactName"
                ).value.trim();


            const phone =
                document.getElementById(
                    "contactPhone"
                ).value.trim();


            const message =
                document.getElementById(
                    "contactMessage"
                ).value.trim();


            if (!name || !phone || !message) {

                alert(
                    currentLanguage === "en"
                        ? "Please complete all fields."
                        : "من فضلك اكملي جميع البيانات."
                );

                return;

            }


            const whatsappMessage =
                `الاسم: ${name}\nرقم الهاتف: ${phone}\nالرسالة: ${message}`;


            const whatsappUrl =
                "https://wa.me/201272154551?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            window.open(
                whatsappUrl,
                "_blank"
            );


            contactForm.reset();

        }
    );

}


/* =========================
   DASHBOARD DATA
========================= */

function getDashboardIdentity() {

    return JSON.parse(
        localStorage.getItem("oliveOilIdentity")
    ) || null;

}


function getDashboardContent() {

    return JSON.parse(
        localStorage.getItem("oliveOil_content_home")
    ) || null;

}


function getDashboardAbout() {

    return JSON.parse(
        localStorage.getItem("oliveOil_aboutUs_home")
    ) || null;

}


/* =========================
   APPLY DASHBOARD IDENTITY
========================= */

function applyDashboardIdentity() {

    const identity =
        getDashboardIdentity();


    if (!identity) return;


    const brandName =
        document.querySelector(".brand-name");


    if (brandName && identity.storeName) {

        brandName.textContent =
            identity.storeName;

    }


    const heroTitle =
        document.getElementById(
            "dashboardHeroTitle"
        );


    if (heroTitle && identity.mainTitle) {

        heroTitle.setAttribute(
            "data-ar",
            identity.mainTitle
        );

        heroTitle.textContent =
            identity.mainTitle;

    }


    const heroSubtitle =
        document.getElementById(
            "dashboardHeroSubtitle"
        );


    if (heroSubtitle && identity.mainSubtitle) {

        heroSubtitle.setAttribute(
            "data-ar",
            identity.mainSubtitle
        );

    }


    const logo =
        document.querySelector(
            ".header-brand img"
        );


    if (
        logo &&
        identity.logo
    ) {

        logo.src =
            identity.logo;

    }

}


/* =========================
   APPLY DASHBOARD HERO
========================= */

function applyDashboardHero() {

    const identity =
        getDashboardIdentity();


    if (!identity) return;


    const heroTitle =
        document.getElementById(
            "dashboardHeroTitle"
        );


    const heroSubtitle =
        document.getElementById(
            "dashboardHeroSubtitle"
        );


    if (heroTitle && identity.mainTitle) {

        heroTitle.setAttribute(
            "data-ar",
            identity.mainTitle
        );

        if (currentLanguage === "ar") {

            heroTitle.textContent =
                identity.mainTitle;

        }

    }


    if (
        heroSubtitle &&
        identity.mainSubtitle
    ) {

        heroSubtitle.setAttribute(
            "data-ar",
            identity.mainSubtitle
        );

        if (currentLanguage === "ar") {

            heroSubtitle.textContent =
                identity.mainSubtitle;

        }

    }

}


/* =========================
   APPLY DASHBOARD ABOUT
========================= */

function applyDashboardAbout() {

    const aboutData =
        getDashboardAbout();


    if (
        !aboutData ||
        !Array.isArray(aboutData)
    ) return;


    const aboutAr =
        document.querySelector(".about-ar");


    const aboutEn =
        document.querySelector(".about-en");


    if (!aboutAr) return;


    if (aboutData.length > 0) {

        const firstCard =
            aboutData[0];


        const title =
            firstCard.title ||
            firstCard.heading ||
            "";


        const text =
            firstCard.text ||
            firstCard.description ||
            "";


        if (title) {

            const titleElement =
                aboutAr.querySelector("h2, h3");


            if (titleElement) {

                titleElement.textContent =
                    title;

            }

        }


        if (text) {

            const textElement =
                aboutAr.querySelector("p");


            if (textElement) {

                textElement.textContent =
                    text;

            }

        }

    }

}


/* =========================
   APPLY DASHBOARD CONTENT
========================= */

function applyDashboardContent() {

    const contentData =
        getDashboardContent();


    if (
        !contentData ||
        !Array.isArray(contentData)
    ) return;


    const cards =
        document.querySelectorAll(
            "#products .product-card"
        );


    if (!cards.length) return;


    contentData.forEach(
        function (item, index) {

            if (!cards[index]) return;


            const card =
                cards[index];


            const title =
                card.querySelector("h3");


            const description =
                card.querySelector("p");


            if (
                title &&
                item.title
            ) {

                title.setAttribute(
                    "data-ar",
                    item.title
                );


                if (currentLanguage === "ar") {

                    title.textContent =
                        item.title;

                }

            }


            if (
                description &&
                item.text
            ) {

                description.setAttribute(
                    "data-ar",
                    item.text
                );


                if (currentLanguage === "ar") {

                    description.textContent =
                        item.text;

                }

            }

        }
    );

}


/* =========================
   APPLY ALL DASHBOARD DATA
========================= */

function applyDashboardData() {

    applyDashboardIdentity();

    applyDashboardHero();

    applyDashboardAbout();

    applyDashboardContent();

}


/* =========================
   LANGUAGE UPDATE
========================= */

function updateLanguage() {

    const elements =
        document.querySelectorAll(
            "[data-ar][data-en]"
        );


    elements.forEach(function (element) {

        if (currentLanguage === "en") {

            element.textContent =
                element.getAttribute("data-en");

        } else {

            element.textContent =
                element.getAttribute("data-ar");

        }

    });


    const aboutAr =
        document.querySelector(".about-ar");

    const aboutEn =
        document.querySelector(".about-en");


    if (aboutAr && aboutEn) {

        if (currentLanguage === "en") {

            aboutAr.style.display = "none";

            aboutEn.style.display = "block";

        } else {

            aboutAr.style.display = "block";

            aboutEn.style.display = "none";

        }

    }


    if (currentLanguage === "en") {

        document.documentElement.lang = "en";

        document.documentElement.dir = "ltr";


        if (languageBtn) {

            languageBtn.textContent =
                "العربية";

        }

    } else {

        document.documentElement.lang = "ar";

        document.documentElement.dir = "rtl";


        if (languageBtn) {

            languageBtn.textContent =
                "English";

        }

    }


    document
        .querySelectorAll(
            "[data-placeholder-ar][data-placeholder-en]"
        )
        .forEach(function (input) {

            input.placeholder =
                currentLanguage === "en"
                    ? input.getAttribute(
                        "data-placeholder-en"
                    )
                    : input.getAttribute(
                        "data-placeholder-ar"
                    );

        });


    applyDashboardData();

    renderCart();

}


/* =========================
   LANGUAGE BUTTON
========================= */

if (languageBtn) {

    languageBtn.addEventListener(
        "click",
        function () {

            currentLanguage =
                currentLanguage === "ar"
                    ? "en"
                    : "ar";


            localStorage.setItem(
                "siteLanguage",
                currentLanguage
            );


            updateLanguage();

        }
    );

}


/* =========================
   HERO PRODUCTS
========================= */

const heroProductsBtn =
    document.querySelector(
        ".hero-products-btn"
    );


if (heroProductsBtn) {

    heroProductsBtn.addEventListener(
        "click",
        function () {

            const productsSection =
                document.getElementById(
                    "products"
                );


            if (productsSection) {

                productsSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


/* =========================
   DASHBOARD
========================= */

function openDashboardLogin() {

    window.location.href =
        "dashboard.html";

}


/* =========================
   INITIALIZE
========================= */

applyDashboardData();

updateLanguage();

renderCart();
