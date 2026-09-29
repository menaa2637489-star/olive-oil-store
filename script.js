/* =========================================================
   DR. ABU EL NASR OLIVE OIL
   MAIN WEBSITE SCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const loginBtn = document.getElementById("loginBtn");
const loginPanel = document.getElementById("loginPanel");
const loginOverlay = document.getElementById("loginOverlay");
const closeLogin = document.getElementById("closeLogin");

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const contactBtn = document.getElementById("contactBtn");
const contactPanel = document.getElementById("contactPanel");
const closeContact = document.getElementById("closeContact");

const languageBtn = document.getElementById("languageBtn");

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const checkoutBtn = document.getElementById("checkoutBtn");

const orderModal = document.getElementById("orderModal");
const closeOrderModal = document.getElementById("closeOrderModal");
const orderOverlay = document.getElementById("orderOverlay");

const orderForm = document.getElementById("orderForm");

const heroSlides = document.querySelectorAll(".hero-slide");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage =
    localStorage.getItem("siteLanguage") || "ar";


/* =========================================================
   SHARED CART
========================================================= */

let cart =
    JSON.parse(localStorage.getItem("oliveOilCart")) || [];


/* =========================================================
   PRODUCTS
========================================================= */

const products = {

    "virgin-oil": {
        ar: "زيت زيتون بكر ممتاز",
        en: "Extra Virgin Olive Oil",
        page: "virgin oil.html"
    },

    "garlic-oil": {
        ar: "زيت زيتون بالثوم",
        en: "Garlic Infused Olive Oil",
        page: "garlic-oil.html"
    },

    "onion-oil": {
        ar: "زيت زيتون بالبصل",
        en: "Onion Infused Olive Oil",
        page: "onion oil.html"
    },

    "vitamin-oil": {
        ar: "زيت زيتون بفيتامين E و D",
        en: "Olive Oil with Vitamin E & D",
        page: "vitamin oil.html"
    },

    "rosemary-oil": {
        ar: "زيت زيتون بالروزماري",
        en: "Rosemary Infused Olive Oil",
        page: "rosemary oil.html"
    },

    "frying-oil": {
        ar: "زيت زيتون للقلي (منقى من الألياف)",
        en: "Olive Oil for Frying (Fiber Purified)",
        page: "frying oil.html"
    }

};


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
   UPDATE CART COUNT
========================================================= */

function updateCartCount() {

    if (!cartCount) return;

    const totalQuantity = cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );

    cartCount.textContent = totalQuantity;

}


/* =========================================================
   GET PRODUCT NAME
========================================================= */

function getProductName(productId) {

    const product = products[productId];

    if (!product) {

        return currentLanguage === "ar"
            ? "منتج"
            : "Product";

    }

    return currentLanguage === "ar"
        ? product.ar
        : product.en;

}


/* =========================================================
   UPDATE OLD CART ITEM NAMES
========================================================= */

function updateCartItemNames() {

    cart.forEach(item => {

        if (!item.productId) return;

        item.name =
            getProductName(item.productId);

    });

}


/* =========================================================
   ADD PRODUCT TO CART
========================================================= */

function addProductToCart(productId) {

    if (!productId) return;


    /*
       المنتجات التي يتم إضافتها من الصفحة الرئيسية
       ليس لها حجم محدد بعد.
    */

    const existingItem = cart.find(
        item =>
            item.productId === productId &&
            (!item.size || item.size === "")
    );


    if (existingItem) {

        existingItem.quantity =
            Number(existingItem.quantity || 0) + 1;

    }

    else {

        cart.push({

            productId: productId,

            name: getProductName(productId),

            size: "",

            price: 0,

            quantity: 1

        });

    }


    updateCartItemNames();

    saveCart();

    updateCartCount();

    renderCart();

    openCart();

}


/* =========================================================
   ADD BUTTONS
========================================================= */

document
    .querySelectorAll(".add-product-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    this.dataset.productId;

                addProductToCart(productId);

            }
        );

    });


/* =========================================================
   CART RENDER
========================================================= */

function renderCart() {

    if (!cartItems) return;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                ${
                    currentLanguage === "ar"
                        ? "السلة فارغة"
                        : "Your cart is empty"
                }

            </div>

        `;


        if (cartTotal) {

            cartTotal.textContent =
                currentLanguage === "ar"
                    ? "0 جنيه"
                    : "0 EGP";

        }

        return;

    }


    let total = 0;


    cart.forEach(
        (item, index) => {

            const quantity =
                Number(item.quantity || 0);

            const price =
                Number(item.price || 0);


            total +=
                price * quantity;


            const itemName =
                getProductName(item.productId) ||
                item.name ||
                (
                    currentLanguage === "ar"
                        ? "منتج"
                        : "Product"
                );


            const sizeText =
                item.size
                    ? `
                        <div class="cart-item-size">
                            ${escapeHTML(item.size)}
                        </div>
                      `
                    : "";


            const priceText =
                price > 0

                    ? `
                        ${price}
                        ${currentLanguage === "ar"
                            ? "جنيه"
                            : "EGP"}
                      `

                    : `
                        ${
                            currentLanguage === "ar"
                                ? "اختاري الحجم من صفحة المنتج"
                                : "Choose a size from the product page"
                        }
                      `;


            const productPage =
                products[item.productId]?.page || "#";


            const itemElement =
                document.createElement("div");


            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

                <div class="cart-item-info">

                    <div class="cart-item-name">

                        ${escapeHTML(itemName)}

                    </div>

                    ${sizeText}

                    <div class="cart-item-price">

                        ${priceText}

                    </div>

                </div>


                <div class="cart-item-actions">

                    <button
                        class="quantity-btn"
                        type="button"
                        data-index="${index}"
                        data-change="1"
                    >
                        +
                    </button>


                    <span class="cart-quantity">

                        ${quantity}

                    </span>


                    <button
                        class="quantity-btn"
                        type="button"
                        data-index="${index}"
                        data-change="-1"
                    >
                        -
                    </button>


                    <button
                        class="remove-cart-item"
                        type="button"
                        data-index="${index}"
                    >
                        ×
                    </button>

                </div>


                ${
                    !item.size

                        ? `

                            <button
                                class="choose-size-btn"
                                type="button"
                                data-product-page="${escapeHTML(productPage)}"
                            >

                                ${
                                    currentLanguage === "ar"
                                        ? "اختيار الحجم"
                                        : "Choose Size"
                                }

                            </button>

                          `

                        : ""
                }

            `;


            cartItems.appendChild(
                itemElement
            );

        }
    );


    /*
       أزرار السلة
    */

    cartItems
        .querySelectorAll(".quantity-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            this.dataset.index
                        );

                    const change =
                        Number(
                            this.dataset.change
                        );

                    changeQuantity(
                        index,
                        change
                    );

                }
            );

        });


    /*
       حذف المنتج
    */

    cartItems
        .querySelectorAll(".remove-cart-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            this.dataset.index
                        );

                    removeFromCart(index);

                }
            );

        });


    /*
       اختيار الحجم
    */

    cartItems
        .querySelectorAll(".choose-size-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const page =
                        this.dataset.productPage;

                    goToProduct(page);

                }
            );

        });


    if (cartTotal) {

        cartTotal.textContent =
            `${total} ${
                currentLanguage === "ar"
                    ? "جنيه"
                    : "EGP"
            }`;

    }

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(index, change) {

    if (!cart[index]) return;


    cart[index].quantity =
        Number(cart[index].quantity || 0)
        + change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================================
   REMOVE ITEM
========================================================= */

function removeFromCart(index) {

    if (!cart[index]) return;


    cart.splice(
        index,
        1
    );


    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================================
   GO TO PRODUCT PAGE
========================================================= */

function goToProduct(page) {

    if (!page || page === "#") return;

    window.location.href =
        page;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

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
   CART PANEL
========================================================= */

function openCart() {

    if (!cartPanel) return;


    cartPanel.classList.add(
        "active"
    );


    if (cartOverlay) {

        cartOverlay.classList.add(
            "active"
        );

    }

}


function closeCartPanel() {

    if (!cartPanel) return;


    cartPanel.classList.remove(
        "active"
    );


    if (cartOverlay) {

        cartOverlay.classList.remove(
            "active"
        );

    }

}


if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        openCart
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeCartPanel
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCartPanel
    );

}


/* =========================================================
   LOGIN PANEL
========================================================= */

function openLogin() {

    if (!loginPanel) return;


    loginPanel.classList.add(
        "active"
    );


    if (loginOverlay) {

        loginOverlay.classList.add(
            "active"
        );

    }

}


function closeLoginPanel() {

    if (!loginPanel) return;


    loginPanel.classList.remove(
        "active"
    );


    if (loginOverlay) {

        loginOverlay.classList.remove(
            "active"
        );

    }

}


if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        openLogin
    );

}


if (closeLogin) {

    closeLogin.addEventListener(
        "click",
        closeLoginPanel
    );

}


if (loginOverlay) {

    loginOverlay.addEventListener(
        "click",
        closeLoginPanel
    );

}


/* =========================================================
   CONTACT PANEL
========================================================= */

function openContact() {

    if (!contactPanel) return;

    contactPanel.classList.add(
        "active"
    );

}


function closeContactPanel() {

    if (!contactPanel) return;

    contactPanel.classList.remove(
        "active"
    );

}


if (contactBtn) {

    contactBtn.addEventListener(
        "click",
        openContact
    );

}


if (closeContact) {

    closeContact.addEventListener(
        "click",
        closeContactPanel
    );

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
   UPDATE LANGUAGE
========================================================= */

function updateLanguage() {

    document.documentElement.lang =
        currentLanguage;


    document.documentElement.dir =
        currentLanguage === "ar"
            ? "rtl"
            : "ltr";


    /*
       النصوص التي تحتوي data-ar / data-en
    */

    document
        .querySelectorAll(
            "[data-ar][data-en]"
        )
        .forEach(element => {

            element.textContent =
                currentLanguage === "ar"
                    ? element.dataset.ar
                    : element.dataset.en;

        });


    /*
       Placeholders
    */

    document
        .querySelectorAll(
            "[data-placeholder-ar][data-placeholder-en]"
        )
        .forEach(element => {

            element.placeholder =
                currentLanguage === "ar"
                    ? element.dataset.placeholderAr
                    : element.dataset.placeholderEn;

        });


    /*
       HTML title
    */

    const pageTitle =
        document.querySelector(
            "title[data-ar][data-en]"
        );


    if (pageTitle) {

        pageTitle.textContent =
            currentLanguage === "ar"
                ? pageTitle.dataset.ar
                : pageTitle.dataset.en;

    }


    /*
       Language button
    */

    if (languageBtn) {

        languageBtn.textContent =
            currentLanguage === "ar"
                ? "English"
                : "العربية";

    }


    /*
       تحديث أسماء المنتجات الموجودة في السلة
    */

    updateCartItemNames();


    saveCart();


    renderCart();

    updateCartCount();

}


/* =========================================================
   CHECKOUT
========================================================= */

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert(
                    currentLanguage === "ar"
                        ? "السلة فارغة"
                        : "Your cart is empty"
                );

                return;

            }


            openOrderModal();

        }
    );

}


/* =========================================================
   ORDER MODAL
========================================================= */

function openOrderModal() {

    if (!orderModal) return;


    renderOrderSummary();


    orderModal.classList.add(
        "active"
    );


    if (orderOverlay) {

        orderOverlay.classList.add(
            "active"
        );

    }

}


function closeOrderModalFunction() {

    if (!orderModal) return;


    orderModal.classList.remove(
        "active"
    );


    if (orderOverlay) {

        orderOverlay.classList.remove(
            "active"
        );

    }

}


if (closeOrderModal) {

    closeOrderModal.addEventListener(
        "click",
        closeOrderModalFunction
    );

}


if (orderOverlay) {

    orderOverlay.addEventListener(
        "click",
        closeOrderModalFunction
    );

}


/* =========================================================
   ORDER SUMMARY
========================================================= */

function renderOrderSummary() {

    const summary =
        document.getElementById(
            "orderSummary"
        );

    const finalTotal =
        document.getElementById(
            "finalTotal"
        );


    if (!summary) return;


    summary.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        const quantity =
            Number(item.quantity || 0);

        const price =
            Number(item.price || 0);


        total +=
            price * quantity;


        const row =
            document.createElement(
                "div"
            );


        row.className =
            "order-summary-item";


        const name =
            getProductName(
                item.productId
            );


        row.innerHTML = `

            <span>

                ${escapeHTML(name)}

                ${
                    item.size
                        ? ` - ${escapeHTML(item.size)}`
                        : ""
                }

                × ${quantity}

            </span>


            <strong>

                ${
                    price > 0

                        ? `${price * quantity} ${
                            currentLanguage === "ar"
                                ? "جنيه"
                                : "EGP"
                          }`

                        : "-"

                }

            </strong>

        `;


        summary.appendChild(
            row
        );

    });


    if (finalTotal) {

        finalTotal.textContent =
            `${total} ${
                currentLanguage === "ar"
                    ? "جنيه"
                    : "EGP"
            }`;

    }

}


/* =========================================================
   ORDER FORM
========================================================= */

if (orderForm) {

    orderForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    currentLanguage === "ar"
                        ? "السلة فارغة"
                        : "Your cart is empty"
                );

                return;

            }


            const formData =
                new FormData(
                    orderForm
                );


            const customerName =
                formData.get("name") || "";


            const phone =
                formData.get("phone") || "";


            const address =
                formData.get("address") || "";


            const governorate =
                formData.get("governorate") || "";


            const payment =
                formData.get("payment") || "";


            let message =
                currentLanguage === "ar"

                    ? "طلب جديد من موقع زيت زيتون دكتور أبو النصر%0A%0A"

                    : "New order from Dr. Abu El Nasr Olive Oil%0A%0A";


            message +=

                currentLanguage === "ar"

                    ? `الاسم: ${encodeURIComponent(customerName)}%0A`

                    : `Name: ${encodeURIComponent(customerName)}%0A`;


            message +=

                currentLanguage === "ar"

                    ? `الهاتف: ${encodeURIComponent(phone)}%0A`

                    : `Phone: ${encodeURIComponent(phone)}%0A`;


            message +=

                currentLanguage === "ar"

                    ? `العنوان: ${encodeURIComponent(address)}%0A`

                    : `Address: ${encodeURIComponent(address)}%0A`;


            message +=

                currentLanguage === "ar"

                    ? `المحافظة: ${encodeURIComponent(governorate)}%0A`

                    : `Governorate: ${encodeURIComponent(governorate)}%0A`;


            message +=

                currentLanguage === "ar"

                    ? `طريقة الدفع: ${encodeURIComponent(payment)}%0A%0A`

                    : `Payment: ${encodeURIComponent(payment)}%0A%0A`;


            message +=

                currentLanguage === "ar"

                    ? "المنتجات:%0A"

                    : "Products:%0A";


            cart.forEach(item => {

                const name =
                    getProductName(
                        item.productId
                    );


                const quantity =
                    Number(
                        item.quantity || 0
                    );


                const price =
                    Number(
                        item.price || 0
                    );


                message +=
                    encodeURIComponent(
                        name
                    );


                if (item.size) {

                    message +=
                        ` - ${encodeURIComponent(item.size)}`;

                }


                message +=
                    ` × ${quantity}`;


                if (price > 0) {

                    message +=
                        ` = ${price * quantity} ${
                            currentLanguage === "ar"
                                ? "جنيه"
                                : "EGP"
                        }`;

                }


                message +=
                    "%0A";

            });


            const total =
                cart.reduce(
                    (sum, item) =>
                        sum +
                        Number(item.price || 0) *
                        Number(item.quantity || 0),
                    0
                );


            message +=
                "%0A";


            message +=

                currentLanguage === "ar"

                    ? `الإجمالي: ${total} جنيه`

                    : `Total: ${total} EGP`;


            const whatsappNumber =
                "201272154551";


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${message}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


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

                currentLanguage === "ar"

                    ? "تسجيل الدخول سيتم تفعيله قريبًا"

                    : "Login will be available soon"

            );

        }
    );

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


            const name =
                document.getElementById(
                    "contactName"
                )?.value || "";


            const phone =
                document.getElementById(
                    "contactPhone"
                )?.value || "";


            const messageText =
                document.getElementById(
                    "contactMessage"
                )?.value || "";


            const whatsappMessage =

                "الاسم: " +
                encodeURIComponent(name) +
                "%0A" +

                "الهاتف: " +
                encodeURIComponent(phone) +
                "%0A" +

                "الرسالة: " +
                encodeURIComponent(messageText);


            const whatsappURL =
                `https://wa.me/201272154551?text=${whatsappMessage}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* =========================================================
   HERO SLIDER
========================================================= */

let currentSlide = 0;

let heroInterval;


function showHeroSlide(index) {

    if (!heroSlides.length) return;


    if (
        index >=
        heroSlides.length
    ) {

        currentSlide = 0;

    }

    else if (index < 0) {

        currentSlide =
            heroSlides.length - 1;

    }

    else {

        currentSlide =
            index;

    }


    heroSlides.forEach(
        (slide, i) => {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        }
    );

}


function nextHeroSlide() {

    showHeroSlide(
        currentSlide + 1
    );

}


function previousHeroSlide() {

    showHeroSlide(
        currentSlide - 1
    );

}


function startHeroSlider() {

    clearInterval(
        heroInterval
    );


    heroInterval =
        setInterval(
            nextHeroSlide,
            5000
        );

}


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


showHeroSlide(0);

startHeroSlider();


/* =========================================================
   QUALITY VIDEO
========================================================= */

const qualityVideo =
    document.getElementById(
        "qualityVideo"
    );


if (qualityVideo) {

    qualityVideo.muted =
        true;

    qualityVideo.loop =
        true;

    qualityVideo.autoplay =
        true;

    qualityVideo.playsInline =
        true;


    qualityVideo
        .play()
        .catch(() => {});

}


/* =========================================================
   DASHBOARD DATA
========================================================= */

function loadDashboardData() {

    /*
       الهوية
    */

    const identity =
        JSON.parse(
            localStorage.getItem(
                "oliveOilIdentity"
            )
        );


    /*
       محتوى الصفحة الرئيسية
    */

    const homeContent =
        JSON.parse(
            localStorage.getItem(
                "oliveOil_content_home"
            )
        );


    /*
       من نحن
    */

    const aboutContent =
        JSON.parse(
            localStorage.getItem(
                "oliveOil_aboutUs_home"
            )
        );


    /* =====================================================
       IDENTITY
    ===================================================== */

    if (identity) {

        document
            .querySelectorAll(
                "[data-site-name]"
            )
            .forEach(element => {

                if (identity.name) {

                    element.textContent =
                        identity.name;

                }

            });

    }


    /* =====================================================
       HOME CONTENT
    ===================================================== */

    if (homeContent) {

        Object.keys(
            homeContent
        )
        .forEach(key => {

            const element =
                document.querySelector(
                    `[data-dashboard="${key}"]`
                );


            if (!element) return;


            if (
                typeof homeContent[key] ===
                "object"
            ) {

                return;

            }


            element.textContent =
                homeContent[key];

        });

    }


    /* =====================================================
       ABOUT US
    ===================================================== */

    if (aboutContent) {

        Object.keys(
            aboutContent
        )
        .forEach(key => {

            const element =
                document.querySelector(
                    `[data-about="${key}"]`
                );


            if (!element) return;


            if (
                typeof aboutContent[key] ===
                "object"
            ) {

                return;

            }


            element.textContent =
                aboutContent[key];

        });

    }

}


/* =========================================================
   STORAGE SYNC
========================================================= */

window.addEventListener(
    "storage",
    function (event) {

        /*
           Cart
        */

        if (
            event.key ===
            "oliveOilCart"
        ) {

            cart =
                JSON.parse(
                    event.newValue || "[]"
                );


            updateCartItemNames();

            updateCartCount();

            renderCart();

        }


        /*
           Language
        */

        if (
            event.key ===
            "siteLanguage"
        ) {

            currentLanguage =
                event.newValue || "ar";


            updateLanguage();

        }


        /*
           Dashboard identity
        */

        if (
            event.key ===
            "oliveOilIdentity"
        ) {

            loadDashboardData();

        }


        /*
           Dashboard home content
        */

        if (
            event.key ===
            "oliveOil_content_home"
        ) {

            loadDashboardData();

        }


        /*
           Dashboard about
        */

        if (
            event.key ===
            "oliveOil_aboutUs_home"
        ) {

            loadDashboardData();

        }

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Load cart
        */

        try {

            cart =
                JSON.parse(
                    localStorage.getItem(
                        "oliveOilCart"
                    )
                ) || [];

        }

        catch {

            cart = [];

        }


        /*
           Load language
        */

        currentLanguage =
            localStorage.getItem(
                "siteLanguage"
            ) || "ar";


        /*
           Initial updates
        */

        updateCartItemNames();

        saveCart();

        updateCartCount();

        renderCart();

        updateLanguage();

        loadDashboardData();

    }
);
