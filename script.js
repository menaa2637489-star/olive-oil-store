/* =========================================================
   DR. ABU EL NASR OLIVE OIL
   MAIN WEBSITE SCRIPT
========================================================= */


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage =
    localStorage.getItem("siteLanguage") || "ar";


const languageBtn =
    document.getElementById("languageBtn");


const languageText =
    document.getElementById("languageText");


/* =========================================================
   SHARED CART
   ONE CART FOR THE WHOLE WEBSITE
========================================================= */

let cart = [];

try {

    cart =
        JSON.parse(
            localStorage.getItem("oliveOilCart")
        ) || [];

} catch (error) {

    cart = [];

}


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "oliveOilCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");


    if (!cartCount) return;


    let totalQuantity = 0;


    cart.forEach(function (item) {

        totalQuantity +=
            Number(item.quantity) || 0;

    });


    cartCount.textContent =
        totalQuantity;

}


/* =========================================================
   PANELS
========================================================= */

const cartPanel =
    document.getElementById("cartPanel");


const loginPanel =
    document.getElementById("loginPanel");


const contactPanel =
    document.getElementById("contactPanel");


const panelOverlay =
    document.getElementById("panelOverlay");


/* =========================================================
   CLOSE ALL PANELS
========================================================= */

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


window.closeAllPanels =
    closeAllPanels;


/* =========================================================
   OPEN PANEL
========================================================= */

function openPanel(panel) {

    if (!panel) return;


    closeAllPanels();


    panel.classList.add("active");


    if (panelOverlay) {

        panelOverlay.classList.add("active");

    }

}


/* =========================================================
   CART BUTTON
========================================================= */

const cartBtn =
    document.getElementById("cartBtn");


if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        function () {

            renderCart();

            openPanel(cartPanel);

        }
    );

}


/* =========================================================
   CLOSE CART
========================================================= */

const closeCart =
    document.getElementById("closeCart");


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeAllPanels
    );

}


/* =========================================================
   LOGIN BUTTON
========================================================= */

const loginBtn =
    document.getElementById("loginBtn");


if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        function () {

            openPanel(loginPanel);

        }
    );

}


/* =========================================================
   CLOSE LOGIN
========================================================= */

const closeLogin =
    document.getElementById("closeLogin");


if (closeLogin) {

    closeLogin.addEventListener(
        "click",
        closeAllPanels
    );

}


/* =========================================================
   CONTACT BUTTON
========================================================= */

const contactBtn =
    document.getElementById("contactBtn");


if (contactBtn) {

    contactBtn.addEventListener(
        "click",
        function () {

            openPanel(contactPanel);

        }
    );

}


/* =========================================================
   OVERLAY
========================================================= */

if (panelOverlay) {

    panelOverlay.addEventListener(
        "click",
        closeAllPanels
    );

}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeAllPanels();

        }

    }
);


/* =========================================================
   PRODUCT DATA
========================================================= */

const homepageProducts = {

    "زيت زيتون بكر ممتاز": {

        id: "virgin-oil",

        nameAr: "زيت زيتون بكر ممتاز",

        nameEn: "Extra Virgin Olive Oil",

        page: "virgin oil.html"

    },


    "زيت زيتون بالثوم": {

        id: "garlic-oil",

        nameAr: "زيت زيتون بالثوم",

        nameEn: "Garlic Infused Olive Oil",

        page: "garlic-oil.html"

    },


    "زيت زيتون بالبصل": {

        id: "onion-oil",

        nameAr: "زيت زيتون بالبصل",

        nameEn: "Onion Infused Olive Oil",

        page: "onion oil.html"

    },


    "زيت زيتون بفيتامين E و D": {

        id: "vitamin-oil",

        nameAr: "زيت زيتون بفيتامين E و D",

        nameEn: "Olive Oil with Vitamin E & D",

        page: "vitamin oil.html"

    },


    "زيت زيتون بالروزماري": {

        id: "rosemary-oil",

        nameAr: "زيت زيتون بالروزماري",

        nameEn: "Rosemary Infused Olive Oil",

        page: "rosemary oil.html"

    },


    "زيت زيتون للقلي (منقى من الألياف)": {

        id: "frying-oil",

        nameAr: "زيت زيتون للقلي (منقى من الألياف)",

        nameEn: "Olive Oil for Frying (Fiber Purified)",

        page: "frying oil.html"

    }

};


/* =========================================================
   ADD PRODUCT TO SHARED CART
========================================================= */

function addProductToCart(productData) {

    if (!productData) return;


    /*
       Product from homepage has no selected size.
       It stays in the SAME shared cart.
    */

    const existingProduct =
        cart.find(function (item) {

            return (
                item.productId === productData.id &&
                !item.size
            );

        });


    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity || 0) + 1;

    } else {

        cart.push({

            cartItemId:
                Date.now().toString() +
                Math.random()
                    .toString(36)
                    .substring(2, 8),

            productId:
                productData.id,

            nameAr:
                productData.nameAr,

            nameEn:
                productData.nameEn,

            size:
                "",

            sizeAr:
                "",

            sizeEn:
                "",

            price:
                0,

            quantity:
                1

        });

    }


    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================================
   HOMEPAGE PLUS BUTTONS
========================================================= */

const addProductButtons =
    document.querySelectorAll(
        ".add-product-btn"
    );


addProductButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                const nameAr =
                    button.getAttribute(
                        "data-product"
                    );


                const nameEn =
                    button.getAttribute(
                        "data-product-en"
                    );


                let productData =
                    homepageProducts[nameAr];


                if (!productData) {

                    productData = {

                        id:
                            button.getAttribute(
                                "data-product-id"
                            ) ||
                            nameAr,

                        nameAr:
                            nameAr || "",

                        nameEn:
                            nameEn || "",

                        page:
                            button.getAttribute(
                                "data-product-page"
                            ) || ""

                    };

                }


                addProductToCart(
                    productData
                );


                openPanel(cartPanel);

            }
        );

    }
);


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    updateCartCount();


    if (!cartItems) return;


    /* EMPTY CART */

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

            cartTotal.textContent =
                "0";

        }


        return;

    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(
        function (item) {

            const quantity =
                Number(item.quantity) || 0;


            const price =
                Number(item.price) || 0;


            total +=
                price * quantity;


            const itemName =
                currentLanguage === "en"
                    ? (
                        item.nameEn ||
                        item.nameAr ||
                        "Product"
                    )
                    : (
                        item.nameAr ||
                        item.nameEn ||
                        "منتج"
                    );


            let sizeText = "";


            if (item.size) {

                sizeText =
                    currentLanguage === "en"
                    ? (
                        item.sizeEn ||
                        item.size
                    )
                    : (
                        item.sizeAr ||
                        item.size
                    );

            }


            const itemElement =
                document.createElement(
                    "div"
                );


            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

                <div class="cart-item-name">

                    <strong>
                        ${escapeHTML(itemName)}
                    </strong>


                    ${
                        sizeText
                        ? `
                            <div class="cart-item-size">

                                ${
                                    currentLanguage === "en"
                                    ? "Size: "
                                    : "الحجم: "
                                }

                                ${escapeHTML(sizeText)}

                            </div>
                        `
                        : ""
                    }


                    ${
                        price > 0
                        ? `
                            <div class="cart-item-price">

                                ${
                                    currentLanguage === "en"
                                    ? "Price: "
                                    : "السعر: "
                                }

                                ${price}

                            </div>
                        `
                        : `
                            <div class="cart-item-price">

                                ${
                                    currentLanguage === "en"
                                    ? "Choose a size from the product page"
                                    : "اختاري الحجم من صفحة المنتج"
                                }

                            </div>
                        `
                    }

                </div>


                <div class="cart-item-controls">

                    <div class="quantity-controls">

                        <button
                            type="button"
                            onclick="changeQuantity('${item.cartItemId}', -1)"
                        >
                            −
                        </button>


                        <span>
                            ${quantity}
                        </span>


                        <button
                            type="button"
                            onclick="changeQuantity('${item.cartItemId}', 1)"
                        >
                            +
                        </button>

                    </div>


                    <button
                        type="button"
                        class="remove-item"
                        onclick="removeFromCart('${item.cartItemId}')"
                    >

                        ${
                            currentLanguage === "en"
                            ? "Remove"
                            : "حذف"
                        }

                    </button>

                </div>

            `;


            cartItems.appendChild(
                itemElement
            );

        }
    );


    if (cartTotal) {

        cartTotal.textContent =
            total;

    }

}


/* =========================================================
   CHANGE CART QUANTITY
========================================================= */

function changeQuantity(
    cartItemId,
    change
) {

    const item =
        cart.find(function (product) {

            return (
                product.cartItemId ===
                cartItemId
            );

        });


    if (!item) return;


    item.quantity =
        Number(item.quantity || 0) +
        Number(change);


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                function (product) {

                    return (
                        product.cartItemId !==
                        cartItemId
                    );

                }
            );

    }


    saveCart();

    updateCartCount();

    renderCart();

}


window.changeQuantity =
    changeQuantity;


/* =========================================================
   REMOVE ITEM
========================================================= */

function removeFromCart(
    cartItemId
) {

    cart =
        cart.filter(
            function (item) {

                return (
                    item.cartItemId !==
                    cartItemId
                );

            }
        );


    saveCart();

    updateCartCount();

    renderCart();

}


window.removeFromCart =
    removeFromCart;


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   LANGUAGE
========================================================= */

function updateLanguage() {

    /* HTML LANGUAGE */

    document.documentElement.lang =
        currentLanguage === "en"
        ? "en"
        : "ar";


    document.documentElement.dir =
        currentLanguage === "en"
        ? "ltr"
        : "rtl";


    /* GENERAL DATA */

    const elements =
        document.querySelectorAll(
            "[data-ar][data-en]"
        );


    elements.forEach(
        function (element) {

            const arabic =
                element.getAttribute(
                    "data-ar"
                );


            const english =
                element.getAttribute(
                    "data-en"
                );


            element.textContent =
                currentLanguage === "en"
                ? english
                : arabic;

        }
    );


    /* ABOUT */

    const aboutAr =
        document.querySelector(
            ".about-ar"
        );


    const aboutEn =
        document.querySelector(
            ".about-en"
        );


    if (aboutAr && aboutEn) {

        aboutAr.style.display =
            currentLanguage === "ar"
            ? "block"
            : "none";


        aboutEn.style.display =
            currentLanguage === "en"
            ? "block"
            : "none";

    }


    /* QUALITY */

    document
        .querySelectorAll(
            ".quality-ar"
        )
        .forEach(
            function (element) {

                element.style.display =
                    currentLanguage === "ar"
                    ? "block"
                    : "none";

            }
        );


    document
        .querySelectorAll(
            ".quality-en"
        )
        .forEach(
            function (element) {

                element.style.display =
                    currentLanguage === "en"
                    ? "block"
                    : "none";

            }
        );


    /* CONTACT */

    document
        .querySelectorAll(
            ".contact-ar"
        )
        .forEach(
            function (element) {

                element.style.display =
                    currentLanguage === "ar"
                    ? "inline"
                    : "none";

            }
        );


    document
        .querySelectorAll(
            ".contact-en"
        )
        .forEach(
            function (element) {

                element.style.display =
                    currentLanguage === "en"
                    ? "inline"
                    : "none";

            }
        );


    /* FOOTER */

    document
        .querySelectorAll(
            ".footer-ar"
        )
        .forEach(
            function (element) {

                element.style.display =
                    currentLanguage === "ar"
                    ? "inline"
                    : "none";

            }
        );


    document
        .querySelectorAll(
            ".footer-en"
        )
        .forEach(
            function (element) {

                element.style.display =
                    currentLanguage === "en"
                    ? "inline"
                    : "none";

            }
        );


    /* LANGUAGE BUTTON */

    if (languageText) {

        languageText.textContent =
            currentLanguage === "en"
            ? "العربية"
            : "English";

    } else if (languageBtn) {

        languageBtn.textContent =
            currentLanguage === "en"
            ? "العربية"
            : "English";

    }


    /* PLACEHOLDERS */

    document
        .querySelectorAll(
            "[data-placeholder-ar][data-placeholder-en]"
        )
        .forEach(
            function (input) {

                input.placeholder =
                    currentLanguage === "en"

                    ? input.getAttribute(
                        "data-placeholder-en"
                    )

                    : input.getAttribute(
                        "data-placeholder-ar"
                    );

            }
        );


    /* DASHBOARD */

    applyDashboardData();


    /* CART */

    renderCart();

}


/* =========================================================
   LANGUAGE BUTTON
========================================================= */

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


/* =========================================================
   QUALITY VIDEO
   AUTOPLAY / MUTED / LOOP
========================================================= */

function initializeQualityVideo() {

    const qualityVideo =
        document.getElementById(
            "qualityVideo"
        );


    if (!qualityVideo) return;


    qualityVideo.muted = true;

    qualityVideo.autoplay = true;

    qualityVideo.loop = true;

    qualityVideo.playsInline = true;


    /*
       Prevent user interaction
       with the video.
    */

    qualityVideo.controls = false;

    qualityVideo.style.pointerEvents =
        "none";


    /*
       Force autoplay.
    */

    const playVideo =
        function () {

            qualityVideo.play()
                .catch(function () {

                    /*
                       Browser may block autoplay
                       in some situations.
                       The video remains muted,
                       so no user interaction
                       is required by our code.
                    */

                });

        };


    playVideo();


    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                !document.hidden &&
                qualityVideo.paused
            ) {

                playVideo();

            }

        }
    );

}


/* =========================================================
   QUALITY VIDEO LANGUAGE DIRECTION
========================================================= */

function updateQualityDirection() {

    const qualityContainer =
        document.querySelector(
            ".quality-video-container"
        );


    if (!qualityContainer) return;


    if (currentLanguage === "en") {

        qualityContainer.style.direction =
            "ltr";

    } else {

        qualityContainer.style.direction =
            "rtl";

    }

}


/* =========================================================
   DASHBOARD HELPERS
========================================================= */

function readJSON(
    key,
    fallback = null
) {

    try {

        const value =
            localStorage.getItem(key);


        if (!value) {

            return fallback;

        }


        return JSON.parse(value);

    } catch (error) {

        return fallback;

    }

}


/* =========================================================
   DASHBOARD IDENTITY
========================================================= */

function getDashboardIdentity() {

    return readJSON(
        "oliveOilIdentity",
        null
    );

}


/* =========================================================
   DASHBOARD HOME CONTENT
========================================================= */

function getDashboardContent() {

    return readJSON(
        "oliveOil_content_home",
        null
    );

}


/* =========================================================
   DASHBOARD ABOUT
========================================================= */

function getDashboardAbout() {

    return readJSON(
        "oliveOil_aboutUs_home",
        null
    );

}


/* =========================================================
   GET ARABIC VALUE
========================================================= */

function getArabicValue(
    data,
    arabicKeys
) {

    if (!data) return "";


    for (
        let i = 0;
        i < arabicKeys.length;
        i++
    ) {

        const key =
            arabicKeys[i];


        if (
            data[key] !== undefined &&
            data[key] !== null &&
            data[key] !== ""
        ) {

            return data[key];

        }

    }


    return "";

}


/* =========================================================
   GET ENGLISH VALUE
========================================================= */

function getEnglishValue(
    data,
    englishKeys
) {

    if (!data) return "";


    for (
        let i = 0;
        i < englishKeys.length;
        i++
    ) {

        const key =
            englishKeys[i];


        if (
            data[key] !== undefined &&
            data[key] !== null &&
            data[key] !== ""
        ) {

            return data[key];

        }

    }


    return "";

}


/* =========================================================
   APPLY DASHBOARD IDENTITY
========================================================= */

function applyDashboardIdentity() {

    const identity =
        getDashboardIdentity();


    if (!identity) return;


    const brandName =
        document.querySelector(
            ".brand-name"
        );


    const brandAr =
        getArabicValue(
            identity,
            [
                "storeNameAr",
                "brandNameAr",
                "nameAr",
                "storeName"
            ]
        );


    const brandEn =
        getEnglishValue(
            identity,
            [
                "storeNameEn",
                "brandNameEn",
                "nameEn"
            ]
        );


    if (brandName) {

        if (brandAr) {

            brandName.setAttribute(
                "data-ar",
                brandAr
            );

        }


        if (brandEn) {

            brandName.setAttribute(
                "data-en",
                brandEn
            );

        }


        brandName.textContent =
            currentLanguage === "en"
            ? (
                brandEn ||
                brandAr
            )
            : (
                brandAr ||
                brandEn
            );

    }


    const logo =
        document.querySelector(
            ".logo img"
        );


    if (
        logo &&
        identity.logo
    ) {

        logo.src =
            identity.logo;

    }

}


/* =========================================================
   APPLY DASHBOARD HERO
========================================================= */

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


    if (heroTitle) {

        const titleAr =
            getArabicValue(
                identity,
                [
                    "mainTitleAr",
                    "heroTitleAr",
                    "titleAr",
                    "mainTitle"
                ]
            );


        const titleEn =
            getEnglishValue(
                identity,
                [
                    "mainTitleEn",
                    "heroTitleEn",
                    "titleEn"
                ]
            );


        if (titleAr) {

            heroTitle.setAttribute(
                "data-ar",
                titleAr
            );

        }


        if (titleEn) {

            heroTitle.setAttribute(
                "data-en",
                titleEn
            );

        }


        const finalTitle =
            currentLanguage === "en"
            ? (
                titleEn ||
                titleAr
            )
            : (
                titleAr ||
                titleEn
            );


        if (finalTitle) {

            heroTitle.textContent =
                finalTitle;

        }

    }


    if (heroSubtitle) {

        const subtitleAr =
            getArabicValue(
                identity,
                [
                    "mainSubtitleAr",
                    "heroSubtitleAr",
                    "subtitleAr",
                    "mainSubtitle"
                ]
            );


        const subtitleEn =
            getEnglishValue(
                identity,
                [
                    "mainSubtitleEn",
                    "heroSubtitleEn",
                    "subtitleEn"
                ]
            );


        if (subtitleAr) {

            heroSubtitle.setAttribute(
                "data-ar",
                subtitleAr
            );

        }


        if (subtitleEn) {

            heroSubtitle.setAttribute(
                "data-en",
                subtitleEn
            );

        }


        const finalSubtitle =
            currentLanguage === "en"
            ? (
                subtitleEn ||
                subtitleAr
            )
            : (
                subtitleAr ||
                subtitleEn
            );


        if (finalSubtitle) {

            heroSubtitle.textContent =
                finalSubtitle;

        }

    }

}


/* =========================================================
   APPLY DASHBOARD PRODUCT CONTENT
========================================================= */

function applyDashboardContent() {

    const contentData =
        getDashboardContent();


    if (!contentData) return;


    const cards =
        document.querySelectorAll(
            "#products .product-card"
        );


    if (!cards.length) return;


    let products =
        Array.isArray(contentData)
        ? contentData
        : (
            Array.isArray(
                contentData.products
            )
            ? contentData.products
            : []
        );


    products.forEach(
        function (item, index) {

            if (!cards[index]) return;


            const card =
                cards[index];


            const title =
                card.querySelector(
                    "h3"
                );


            const description =
                card.querySelector(
                    "p"
                );


            if (title) {

                const titleAr =
                    getArabicValue(
                        item,
                        [
                            "titleAr",
                            "nameAr",
                            "title",
                            "name"
                        ]
                    );


                const titleEn =
                    getEnglishValue(
                        item,
                        [
                            "titleEn",
                            "nameEn"
                        ]
                    );


                if (titleAr) {

                    title.setAttribute(
                        "data-ar",
                        titleAr
                    );

                }


                if (titleEn) {

                    title.setAttribute(
                        "data-en",
                        titleEn
                    );

                }


                const finalTitle =
                    currentLanguage === "en"
                    ? (
                        titleEn ||
                        titleAr
                    )
                    : (
                        titleAr ||
                        titleEn
                    );


                if (finalTitle) {

                    title.textContent =
                        finalTitle;

                }

            }


            if (description) {

                const textAr =
                    getArabicValue(
                        item,
                        [
                            "textAr",
                            "descriptionAr",
                            "text",
                            "description"
                        ]
                    );


                const textEn =
                    getEnglishValue(
                        item,
                        [
                            "textEn",
                            "descriptionEn"
                        ]
                    );


                if (textAr) {

                    description.setAttribute(
                        "data-ar",
                        textAr
                    );

                }


                if (textEn) {

                    description.setAttribute(
                        "data-en",
                        textEn
                    );

                }


                const finalText =
                    currentLanguage === "en"
                    ? (
                        textEn ||
                        textAr
                    )
                    : (
                        textAr ||
                        textEn
                    );


                if (finalText) {

                    description.textContent =
                        finalText;

                }

            }

        }
    );

}


/* =========================================================
   APPLY DASHBOARD ABOUT
========================================================= */

function applyDashboardAbout() {

    const aboutData =
        getDashboardAbout();


    if (!aboutData) return;


    let sections =
        Array.isArray(aboutData)
        ? aboutData
        : (
            Array.isArray(
                aboutData.sections
            )
            ? aboutData.sections
            : []
        );


    if (!sections.length) return;


    const aboutAr =
        document.querySelector(
            ".about-ar"
        );


    const aboutEn =
        document.querySelector(
            ".about-en"
        );


    if (!aboutAr || !aboutEn) return;


    const first =
        sections[0];


    const titleAr =
        getArabicValue(
            first,
            [
                "titleAr",
                "headingAr",
                "title",
                "heading"
            ]
        );


    const titleEn =
        getEnglishValue(
            first,
            [
                "titleEn",
                "headingEn"
            ]
        );


    const textAr =
        getArabicValue(
            first,
            [
                "textAr",
                "descriptionAr",
                "text",
                "description"
            ]
        );


    const textEn =
        getEnglishValue(
            first,
            [
                "textEn",
                "descriptionEn"
            ]
        );


    const arTitle =
        aboutAr.querySelector(
            "h2"
        );


    const enTitle =
        aboutEn.querySelector(
            "h2"
        );


    const arParagraph =
        aboutAr.querySelector(
            "p"
        );


    const enParagraph =
        aboutEn.querySelector(
            "p"
        );


    if (
        arTitle &&
        titleAr
    ) {

        arTitle.textContent =
            titleAr;

    }


    if (
        enTitle &&
        titleEn
    ) {

        enTitle.textContent =
            titleEn;

    }


    if (
        arParagraph &&
        textAr
    ) {

        arParagraph.textContent =
            textAr;

    }


    if (
        enParagraph &&
        textEn
    ) {

        enParagraph.textContent =
            textEn;

    }

}


/* =========================================================
   APPLY ALL DASHBOARD DATA
========================================================= */

function applyDashboardData() {

    applyDashboardIdentity();

    applyDashboardHero();

    applyDashboardContent();

    applyDashboardAbout();

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nameInput =
                document.getElementById(
                    "contactName"
                );


            const phoneInput =
                document.getElementById(
                    "contactPhone"
                );


            const messageInput =
                document.getElementById(
                    "contactMessage"
                );


            const name =
                nameInput
                ? nameInput.value.trim()
                : "";


            const phone =
                phoneInput
                ? phoneInput.value.trim()
                : "";


            const message =
                messageInput
                ? messageInput.value.trim()
                : "";


            if (
                !name ||
                !phone ||
                !message
            ) {

                alert(

                    currentLanguage === "en"

                    ? "Please complete all fields."

                    : "من فضلك اكملي جميع البيانات."

                );


                return;

            }


            const whatsappMessage =

                currentLanguage === "en"

                ? (
                    "Name: " +
                    name +
                    "\nPhone: " +
                    phone +
                    "\nMessage: " +
                    message
                )

                : (
                    "الاسم: " +
                    name +
                    "\nرقم الهاتف: " +
                    phone +
                    "\nالرسالة: " +
                    message
                );


            const whatsappURL =
                "https://wa.me/201272154551?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            window.open(
                whatsappURL,
                "_blank"
            );


            contactForm.reset();

        }
    );

}


/* =========================================================
   ABOUT BUTTON
========================================================= */

function openAboutSection() {

    const aboutSection =
        document.querySelector(
            ".about-section"
        );


    closeAllPanels();


    if (aboutSection) {

        aboutSection.scrollIntoView({

            behavior:
                "smooth"

        });

    }

}


window.openAboutSection =
    openAboutSection;


/* =========================================================
   DASHBOARD
========================================================= */

function openDashboardLogin() {

    window.location.href =
        "dashboard.html";

}


window.openDashboardLogin =
    openDashboardLogin;


/* =========================================================
   LOGIN FORM
========================================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            alert(

                currentLanguage === "en"

                ? "Login is currently being prepared."

                : "تسجيل الدخول قيد التجهيز حاليًا."

            );

        }
    );

}


/* =========================================================
   CHECKOUT BUTTON
========================================================= */

const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );


if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function () {

            if (!cart.length) {

                alert(

                    currentLanguage === "en"

                    ? "Your cart is empty."

                    : "السلة فارغة."

                );

                return;

            }


            alert(

                currentLanguage === "en"

                ? "Your order is ready for checkout."

                : "الأوردر جاهز لإتمام الطلب."

            );

        }
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

applyDashboardData();

updateLanguage();

initializeQualityVideo();

updateQualityDirection();

renderCart();

updateCartCount();


/* =========================================================
   HERO SLIDER
========================================================= */

const heroSlides =
    document.querySelectorAll(
        ".hero-slide"
    );


const heroPrev =
    document.getElementById(
        "heroPrev"
    );


const heroNext =
    document.getElementById(
        "heroNext"
    );


let currentHeroSlide = 0;

let heroInterval;


/* =========================================================
   SHOW HERO SLIDE
========================================================= */

function showHeroSlide(index) {

    if (!heroSlides.length) return;


    if (
        index >= heroSlides.length
    ) {

        currentHeroSlide = 0;

    } else if (
        index < 0
    ) {

        currentHeroSlide =
            heroSlides.length - 1;

    } else {

        currentHeroSlide =
            index;

    }


    heroSlides.forEach(
        function (slide, index) {

            slide.classList.toggle(
                "active",
                index === currentHeroSlide
            );

        }
    );

}


/* =========================================================
   NEXT HERO
========================================================= */

function nextHeroSlide() {

    showHeroSlide(
        currentHeroSlide + 1
    );

}


/* =========================================================
   PREVIOUS HERO
========================================================= */

function previousHeroSlide() {

    showHeroSlide(
        currentHeroSlide - 1
    );

}


/* =========================================================
   AUTO HERO
========================================================= */

function startHeroSlider() {

    if (!heroSlides.length) return;


    clearInterval(
        heroInterval
    );


    heroInterval =
        setInterval(
            function () {

                nextHeroSlide();

            },
            5000
        );

}


/* =========================================================
   HERO ARROWS
========================================================= */

if (heroNext) {

    heroNext.addEventListener(
        "click",
        function () {

            nextHeroSlide();

            startHeroSlider();

        }
    );

}


if (heroPrev) {

    heroPrev.addEventListener(
        "click",
        function () {

            previousHeroSlide();

            startHeroSlider();

        }
    );

}


/* =========================================================
   START HERO
========================================================= */

showHeroSlide(0);

startHeroSlider();
