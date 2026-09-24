/* =========================================================
   ROSEMARY OIL - SHARED CART
   نفس السلة في كل صفحات الموقع
========================================================= */


/* =========================
   ELEMENTS
========================= */

const loginBtn = document.getElementById("loginBtn");
const loginPanel = document.getElementById("loginPanel");
const loginOverlay = document.getElementById("loginOverlay");
const closeLogin = document.getElementById("closeLogin");

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const languageBtn = document.getElementById("languageBtn");
const languageText = document.getElementById("languageText");

const addCartBtn = document.getElementById("addCartBtn");
const buyNowBtn = document.getElementById("buyNowBtn");

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const orderModal = document.getElementById("orderModal");
const checkoutBtn = document.getElementById("checkoutBtn");
const backBtn = document.getElementById("backBtn");
const confirmOrderBtn = document.getElementById("confirmOrderBtn");

const plusOneBtn = document.getElementById("plusOneBtn");
const minusOneBtn = document.getElementById("minusOneBtn");
const quantityValue = document.getElementById("quantityValue");

const mainProductImage =
    document.getElementById("mainProductImage");

const productPriceElement =
    document.getElementById("productPrice");

const sizeButtons =
    document.querySelectorAll(".size-btn");

const pageBackBtn =
    document.getElementById("pageBackBtn");


/* =========================================================
   SHARED CART
========================================================= */

const CART_KEY = "oliveOilCart";


/* =========================================================
   PRODUCT ID
   الروزماري له ID مستقل
========================================================= */

const PRODUCT_ID = "rosemary-oil";


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage =
    localStorage.getItem("siteLanguage") || "ar";


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    ar: {

        productName:
            "زيت زيتون بالروزماري",

        productType:
            "زيت زيتون بالروزماري",

        chooseSize:
            "اختاري الحجم",

        price:
            "السعر:",

        buyNow:
            "اشتر الآن",

        addCart:
            "أضف للسلة",

        half:
            "نصف لتر",

        one:
            "1 لتر",

        two:
            "2 لتر",

        five:
            "5 لتر",

        emptyCart:
            "السلة فارغة حاليًا",

        cancel:
            "إلغاء",

        cancelAll:
            "إلغاء الكل",

        total:
            "الإجمالي",

        checkout:
            "إتمام الطلب",

        orderTitle:
            "إتمام الطلب",

        fullName:
            "الاسم بالكامل",

        fullNamePlaceholder:
            "مثال: أحمد محمد",

        phone:
            "رقم الهاتف",

        phonePlaceholder:
            "01xxxxxxxxx",

        governorate:
            "المحافظة",

        chooseGovernorate:
            "اختر المحافظة",

        address:
            "العنوان بالتفصيل",

        addressPlaceholder:
            "الشارع، رقم العمارة، الحي، علامة مميزة",

        notes:
            "ملاحظات (اختياري)",

        notesPlaceholder:
            "مثال: التسليم مساءً",

        payment:
            "طريقة الدفع",

        cash:
            "💵 الدفع عند الاستلام (كاش)",

        card:
            "💳 بطاقة ائتمان / فيزا",

        wallet:
            "📱 محفظة إلكترونية",

        back:
            "رجوع",

        confirm:
            "تأكيد الطلب",

        emptyAlert:
            "السلة فارغة، أضيفي منتج أولًا.",

        incompleteAlert:
            "من فضلك اكملي بيانات الطلب.",

        successAlert:
            "تم تأكيد الطلب بنجاح ❤️",

        login:
            "تسجيل الدخول",

        loginSubtitle:
            "سجل دخولك للوصول إلى حسابك",

        emailPhone:
            "البريد الإلكتروني أو رقم الهاتف",

        password:
            "كلمة المرور",

        remember:
            "تذكرني",

        forgot:
            "نسيت كلمة المرور؟",

        or:
            "أو",

        google:
            "تسجيل الدخول باستخدام جوجل",

        facebook:
            "تسجيل الدخول باستخدام فيسبوك"

    },


    en: {

        productName:
            "Rosemary Infused Olive Oil",

        productType:
            "Rosemary Infused Olive Oil",

        chooseSize:
            "Choose Size",

        price:
            "Price:",

        buyNow:
            "Buy Now",

        addCart:
            "Add to Cart",

        half:
            "Half Liter",

        one:
            "1 Liter",

        two:
            "2 Liters",

        five:
            "5 Liters",

        emptyCart:
            "Your cart is currently empty",

        cancel:
            "Cancel",

        cancelAll:
            "Clear All",

        total:
            "Total",

        checkout:
            "Checkout",

        orderTitle:
            "Complete Your Order",

        fullName:
            "Full Name",

        fullNamePlaceholder:
            "Example: Ahmed Mohamed",

        phone:
            "Phone Number",

        phonePlaceholder:
            "01xxxxxxxxx",

        governorate:
            "Governorate",

        chooseGovernorate:
            "Choose Governorate",

        address:
            "Detailed Address",

        addressPlaceholder:
            "Street, building number, district, landmark",

        notes:
            "Notes (Optional)",

        notesPlaceholder:
            "Example: Delivery in the evening",

        payment:
            "Payment Method",

        cash:
            "💵 Cash on Delivery",

        card:
            "💳 Credit / Visa Card",

        wallet:
            "📱 Electronic Wallet",

        back:
            "Back",

        confirm:
            "Confirm Order",

        emptyAlert:
            "Your cart is empty. Please add a product first.",

        incompleteAlert:
            "Please complete your order information.",

        successAlert:
            "Your order has been confirmed successfully ❤️",

        login:
            "Login",

        loginSubtitle:
            "Login to access your account",

        emailPhone:
            "Email or Phone Number",

        password:
            "Password",

        remember:
            "Remember me",

        forgot:
            "Forgot Password?",

        or:
            "OR",

        google:
            "Continue with Google",

        facebook:
            "Continue with Facebook"

    }

};


/* =========================================================
   PRODUCT DATA
========================================================= */

const productData = {

    half: {

        image:
            "250ml.jpeg",

        nameAr:
            "زيت زيتون بالروزماري",

        nameEn:
            "Rosemary Infused Olive Oil",

        price:
            320

    },

    one: {

        image:
            "1liter.jpeg",

        nameAr:
            "زيت زيتون بالروزماري",

        nameEn:
            "Rosemary Infused Olive Oil",

        price:
            580

    },

    two: {

        image:
            "1liter.jpeg",

        nameAr:
            "زيت زيتون بالروزماري",

        nameEn:
            "Rosemary Infused Olive Oil",

        price:
            1080

    },

    five: {

        image:
            "5liter.jpeg",

        nameAr:
            "زيت زيتون بالروزماري",

        nameEn:
            "Rosemary Infused Olive Oil",

        price:
            2600

    }

};


/* =========================================================
   SELECTED SIZE
========================================================= */

let selectedSize = "half";


/* =========================================================
   QUANTITY
========================================================= */

let quantity = 1;


/* =========================================================
   LOAD SHARED CART
========================================================= */

let cart = [];

function loadCart() {

    try {

        cart =
            JSON.parse(
                localStorage.getItem(CART_KEY)
            ) || [];

    } catch (error) {

        cart = [];

    }

}


/* =========================================================
   SAVE SHARED CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/* =========================================================
   SIZE NAME
========================================================= */

function getSizeName(size) {

    const t =
        translations[currentLanguage];

    if (size === "half") {
        return t.half;
    }

    if (size === "one") {
        return t.one;
    }

    if (size === "two") {
        return t.two;
    }

    if (size === "five") {
        return t.five;
    }

    return "";

}


/* =========================================================
   GET PRODUCT NAME
========================================================= */

function getProductName() {

    const product =
        productData[selectedSize];

    if (!product) {
        return "";
    }

    return currentLanguage === "ar"
        ? product.nameAr
        : product.nameEn;

}


/* =========================================================
   LOGIN
========================================================= */

function openLogin() {

    if (loginPanel) {
        loginPanel.classList.add("active");
    }

    if (loginOverlay) {
        loginOverlay.classList.add("active");
    }

}


function closeLoginPanel() {

    if (loginPanel) {
        loginPanel.classList.remove("active");
    }

    if (loginOverlay) {
        loginOverlay.classList.remove("active");
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
   CART PANEL
========================================================= */

function openCart() {

    loadCart();

    updateCart();

    if (cartPanel) {
        cartPanel.classList.add("active");
    }

    if (cartOverlay) {
        cartOverlay.classList.add("active");
    }

}


function closeCartPanel() {

    if (cartPanel) {
        cartPanel.classList.remove("active");
    }

    if (cartOverlay) {
        cartOverlay.classList.remove("active");
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
   PRODUCT DISPLAY
========================================================= */

function updateProductDisplay() {

    const product =
        productData[selectedSize];

    if (!product) {
        return;
    }

    if (productPriceElement) {

        productPriceElement.textContent =
            product.price +
            (
                currentLanguage === "ar"
                    ? " ج.م"
                    : " EGP"
            );

    }

    if (quantityValue) {

        quantityValue.textContent =
            quantity;

    }

}


/* =========================================================
   SIZE BUTTONS
========================================================= */

sizeButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const newSize =
                button.getAttribute(
                    "data-size"
                );

            if (!productData[newSize]) {
                return;
            }

            if (newSize === selectedSize) {
                return;
            }

            const newProduct =
                productData[newSize];


            if (mainProductImage) {

                mainProductImage.classList.remove(
                    "product-in"
                );

                mainProductImage.classList.add(
                    "product-out"
                );

            }


            setTimeout(function () {

                if (mainProductImage) {

                    mainProductImage.src =
                        newProduct.image;

                }


                selectedSize =
                    newSize;


                sizeButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                if (mainProductImage) {

                    mainProductImage.classList.remove(
                        "product-out"
                    );

                    mainProductImage.classList.add(
                        "product-in"
                    );

                }


                updateProductDisplay();

            }, 350);

        }
    );

});


/* =========================================================
   PLUS BUTTON
   + يضيف وحدة واحدة للسلة فورًا
========================================================= */

if (plusOneBtn) {

    plusOneBtn.addEventListener(
        "click",
        function () {

            addSelectedProductToCart(1);

            quantity = 1;

            if (quantityValue) {

                quantityValue.textContent =
                    quantity;

            }

        }
    );

}


/* =========================================================
   MINUS BUTTON
========================================================= */

if (minusOneBtn) {

    minusOneBtn.addEventListener(
        "click",
        function () {

            if (quantity > 1) {

                quantity--;

            }

            if (quantityValue) {

                quantityValue.textContent =
                    quantity;

            }

        }
    );

}


/* =========================================================
   ADD SELECTED PRODUCT TO SHARED CART
========================================================= */

function addSelectedProductToCart(amount) {

    const selectedProduct =
        productData[selectedSize];

    if (!selectedProduct) {
        return;
    }


    amount =
        Number(amount) || 1;


    loadCart();


    const existingItem =
        cart.find(function (item) {

            return (

                item.productId === PRODUCT_ID &&

                item.size === selectedSize

            );

        });


    if (existingItem) {

        existingItem.quantity =
            (Number(existingItem.quantity) || 0) +
            amount;


        existingItem.name =
            currentLanguage === "ar"
                ? selectedProduct.nameAr
                : selectedProduct.nameEn;

        existingItem.nameAr =
            selectedProduct.nameAr;

        existingItem.nameEn =
            selectedProduct.nameEn;

        existingItem.price =
            selectedProduct.price;

        existingItem.image =
            selectedProduct.image;

    } else {

        cart.push({

            id:
                Date.now(),

            productId:
                PRODUCT_ID,

            name:
                currentLanguage === "ar"
                    ? selectedProduct.nameAr
                    : selectedProduct.nameEn,

            nameAr:
                selectedProduct.nameAr,

            nameEn:
                selectedProduct.nameEn,

            size:
                selectedSize,

            sizeName:
                getSizeName(selectedSize),

            price:
                selectedProduct.price,

            image:
                selectedProduct.image,

            quantity:
                amount

        });

    }


    saveCart();

    updateCart();

}


/* =========================================================
   UPDATE SHARED CART
========================================================= */

function updateCart() {

    loadCart();


    const t =
        translations[currentLanguage];


    if (!cartItems) {
        return;
    }


    let totalItems = 0;

    let totalPrice = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                ${t.emptyCart}

            </p>

        `;


        if (cartCount) {
            cartCount.textContent = "0";
        }


        if (cartTotal) {

            cartTotal.textContent =
                currentLanguage === "ar"
                    ? "0 ج.م"
                    : "0 EGP";

        }

        return;

    }


    let cartHTML = "";


    cart.forEach(function (item, index) {

        const itemQuantity =
            Number(item.quantity) || 1;

        const itemPrice =
            Number(item.price) || 0;

        const itemTotal =
            itemPrice * itemQuantity;


        totalItems +=
            itemQuantity;

        totalPrice +=
            itemTotal;


        let itemName =
            item.name;


        if (
            currentLanguage === "ar" &&
            item.nameAr
        ) {

            itemName =
                item.nameAr;

        }


        if (
            currentLanguage === "en" &&
            item.nameEn
        ) {

            itemName =
                item.nameEn;

        }


        const itemSize =
            item.size
                ? getSizeName(item.size)
                : (
                    item.sizeName || ""
                );


        cartHTML += `

            <div class="cart-product">

                <p>
                    ${itemName}
                </p>

                ${
                    itemSize
                        ? `
                            <p>
                                ${
                                    currentLanguage === "ar"
                                        ? "الحجم:"
                                        : "Size:"
                                }
                                ${itemSize}
                            </p>
                        `
                        : ""
                }

                <p>

                    ${
                        currentLanguage === "ar"
                            ? "السعر:"
                            : "Price:"
                    }

                    ${itemPrice}

                    ${
                        currentLanguage === "ar"
                            ? " ج.م"
                            : " EGP"
                    }

                </p>


                <p>

                    ${
                        currentLanguage === "ar"
                            ? "الكمية:"
                            : "Quantity:"
                    }

                    ${itemQuantity}

                </p>


                <button
                    class="cancel-cart-btn"
                    onclick="removeFromCart(${index})">

                    ${
                        currentLanguage === "ar"
                            ? "إلغاء"
                            : "Cancel"
                    }

                </button>

            </div>

        `;

    });


    cartItems.innerHTML =
        cartHTML;


    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }


    if (cartTotal) {

        cartTotal.textContent =
            totalPrice +
            (
                currentLanguage === "ar"
                    ? " ج.م"
                    : " EGP"
            );

    }


    const clearButton =
        document.createElement("button");


    clearButton.className =
        "clear-cart-btn";


    clearButton.textContent =
        t.cancelAll;


    clearButton.addEventListener(
        "click",
        clearCart
    );


    cartItems.appendChild(
        clearButton
    );

}


/* =========================================================
   REMOVE PRODUCT
========================================================= */

function removeFromCart(index) {

    loadCart();


    if (
        index < 0 ||
        index >= cart.length
    ) {

        return;

    }


    cart.splice(
        index,
        1
    );


    saveCart();

    updateCart();

}


/* =========================================================
   CLEAR CART
========================================================= */

function clearCart() {

    cart = [];

    saveCart();

    updateCart();

}


/* =========================================================
   ADD TO CART BUTTON
========================================================= */

if (addCartBtn) {

    addCartBtn.addEventListener(
        "click",
        function () {

            addSelectedProductToCart(
                quantity
            );


            quantity = 1;


            if (quantityValue) {

                quantityValue.textContent =
                    quantity;

            }


            openCart();

        }
    );

}


/* =========================================================
   ORDER MODAL
========================================================= */

function openOrderModal() {

    loadCart();


    if (cart.length === 0) {

        alert(
            translations[currentLanguage]
                .emptyAlert
        );

        return;

    }


    updateOrderSummary();


    if (orderModal) {

        orderModal.classList.add(
            "active"
        );

    }

}


function closeOrderModal() {

    if (orderModal) {

        orderModal.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   CHECKOUT
========================================================= */

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function () {

            closeCartPanel();

            openOrderModal();

        }
    );

}


/* =========================================================
   BUY NOW
========================================================= */

if (buyNowBtn) {

    buyNowBtn.addEventListener(
        "click",
        function () {

            addSelectedProductToCart(
                quantity
            );


            quantity = 1;


            if (quantityValue) {

                quantityValue.textContent =
                    quantity;

            }


            openOrderModal();

        }
    );

}


/* =========================================================
   ORDER BACK BUTTON
========================================================= */

if (backBtn) {

    backBtn.addEventListener(
        "click",
        function () {

            closeOrderModal();

        }
    );

}


/* =========================================================
   PAGE BACK BUTTON
========================================================= */

if (pageBackBtn) {

    pageBackBtn.addEventListener(
        "click",
        function () {

            if (
                window.history.length > 1
            ) {

                window.history.back();

            } else {

                window.location.href =
                    "index.html";

            }

        }
    );

}


/* =========================================================
   ORDER SUMMARY
========================================================= */

function updateOrderSummary() {

    const orderSummary =
        document.querySelector(
            ".order-summary"
        );


    if (!orderSummary) {
        return;
    }


    const t =
        translations[currentLanguage];


    loadCart();


    let summaryHTML = "";

    let total = 0;


    cart.forEach(function (item) {

        const itemQuantity =
            Number(item.quantity) || 1;

        const itemPrice =
            Number(item.price) || 0;

        const itemTotal =
            itemPrice * itemQuantity;


        total +=
            itemTotal;


        let itemName =
            item.name;


        if (
            currentLanguage === "ar" &&
            item.nameAr
        ) {

            itemName =
                item.nameAr;

        }


        if (
            currentLanguage === "en" &&
            item.nameEn
        ) {

            itemName =
                item.nameEn;

        }


        const itemSize =
            item.size
                ? getSizeName(item.size)
                : "";


        summaryHTML += `

            <div class="order-item">

                <span>

                    ${itemName}

                    ${
                        itemSize
                            ? " - " + itemSize
                            : ""
                    }

                    × ${itemQuantity}

                </span>


                <span>

                    ${itemTotal}

                    ${
                        currentLanguage === "ar"
                            ? " ج.م"
                            : " EGP"
                    }

                </span>

            </div>

        `;

    });


    summaryHTML += `

        <div class="order-total">

            <strong>
                ${t.total}
            </strong>

            <strong>

                ${total}

                ${
                    currentLanguage === "ar"
                        ? " ج.م"
                        : " EGP"
                }

            </strong>

        </div>

    `;


    orderSummary.innerHTML =
        summaryHTML;

}


/* =========================================================
   CONFIRM ORDER
========================================================= */

if (confirmOrderBtn) {

    confirmOrderBtn.addEventListener(
        "click",
        function () {

            const fullNameElement =
                document.getElementById(
                    "fullName"
                );

            const phoneElement =
                document.getElementById(
                    "phone"
                );

            const governorateElement =
                document.getElementById(
                    "governorate"
                );

            const addressElement =
                document.getElementById(
                    "address"
                );

            const notesElement =
                document.getElementById(
                    "notes"
                );


            const fullName =
                fullNameElement
                    ? fullNameElement.value.trim()
                    : "";


            const phone =
                phoneElement
                    ? phoneElement.value.trim()
                    : "";


            const governorate =
                governorateElement
                    ? governorateElement.value
                    : "";


            const address =
                addressElement
                    ? addressElement.value.trim()
                    : "";


            const notes =
                notesElement
                    ? notesElement.value.trim()
                    : "";


            const paymentMethod =
                document.querySelector(
                    'input[name="payment"]:checked'
                )?.value || "cash";


            if (
                fullName === "" ||
                phone === "" ||
                governorate === "" ||
                address === ""
            ) {

                alert(
                    translations[currentLanguage]
                        .incompleteAlert
                );

                return;

            }


            loadCart();


            let total = 0;


            cart.forEach(
                function (item) {

                    total +=
                        (
                            Number(item.price) || 0
                        ) *
                        (
                            Number(item.quantity) || 1
                        );

                }
            );


            const orderId =
                "ORD-" + Date.now();


            const newOrder = {

                id:
                    orderId,

                name:
                    fullName,

                phone:
                    phone,

                governorate:
                    governorate,

                address:
                    address,

                notes:
                    notes,

                paymentMethod:
                    paymentMethod,

                total:
                    total,

                status:
                    paymentMethod === "cash"
                        ? "جديد"
                        : "بانتظار الدفع",

                items:
                    cart,

                date:
                    new Date()
                        .toLocaleString("ar-EG")

            };


            let orders = [];


            try {

                orders =
                    JSON.parse(
                        localStorage.getItem(
                            "oliveOilOrders"
                        )
                    ) || [];

            } catch (error) {

                orders = [];

            }


            orders.push(
                newOrder
            );


            localStorage.setItem(
                "oliveOilOrders",
                JSON.stringify(orders)
            );


            alert(
                translations[currentLanguage]
                    .successAlert
            );


            cart = [];


            saveCart();

            updateCart();

            closeOrderModal();


            if (fullNameElement) {
                fullNameElement.value = "";
            }

            if (phoneElement) {
                phoneElement.value = "";
            }

            if (governorateElement) {
                governorateElement.value = "";
            }

            if (addressElement) {
                addressElement.value = "";
            }

            if (notesElement) {
                notesElement.value = "";
            }

        }
    );

}


/* =========================================================
   CHANGE LANGUAGE
========================================================= */

function changeLanguage(language) {

    currentLanguage =
        language;


    localStorage.setItem(
        "siteLanguage",
        language
    );


    const t =
        translations[language];


    document.documentElement.lang =
        language;


    document.documentElement.dir =
        language === "ar"
            ? "rtl"
            : "ltr";


    if (languageText) {

        languageText.textContent =
            language === "ar"
                ? "English"
                : "العربية";

    }


    const elements =
        document.querySelectorAll(
            "[data-ar][data-en]"
        );


    elements.forEach(
        function (element) {

            element.textContent =
                language === "ar"
                    ? element.getAttribute(
                        "data-ar"
                    )
                    : element.getAttribute(
                        "data-en"
                    );

        }
    );


    /* =========================
       PRODUCT
    ========================= */

    const productNameElement =
        document.getElementById(
            "productName"
        );


    const productTypeElement =
        document.querySelector(
            ".product-type"
        );


    const sizesTitle =
        document.querySelector(
            ".sizes-title"
        );


    const priceLabel =
        document.querySelector(
            ".product-price span"
        );


    if (productNameElement) {

        productNameElement.textContent =
            t.productName;

    }


    if (productTypeElement) {

        productTypeElement.textContent =
            t.productType;

    }


    if (sizesTitle) {

        sizesTitle.textContent =
            t.chooseSize;

    }


    if (priceLabel) {

        priceLabel.textContent =
            t.price;

    }


    sizeButtons.forEach(
        function (button) {

            const size =
                button.getAttribute(
                    "data-size"
                );


            button.textContent =
                getSizeName(size);

        }
    );


    if (addCartBtn) {

        addCartBtn.textContent =
            t.addCart;

    }


    if (buyNowBtn) {

        buyNowBtn.textContent =
            t.buyNow;

    }


    /* =========================
       LOGIN
    ========================= */

    if (loginPanel) {

        const loginTitle =
            loginPanel.querySelector(
                "h2"
            );


        const loginSubtitle =
            loginPanel.querySelector(
                ".panel-subtitle"
            );


        const remember =
            loginPanel.querySelector(
                ".login-options span"
            );


        const forgot =
            loginPanel.querySelector(
                ".login-options a"
            );


        const loginSubmit =
            loginPanel.querySelector(
                ".login-submit"
            );


        const orText =
            loginPanel.querySelector(
                ".or-line span"
            );


        const google =
            loginPanel.querySelector(
                ".google-login span:last-child"
            );


        const facebook =
            loginPanel.querySelector(
                ".facebook-login span:last-child"
            );


        if (loginTitle)
            loginTitle.textContent =
                t.login;


        if (loginSubtitle)
            loginSubtitle.textContent =
                t.loginSubtitle;


        if (remember)
            remember.textContent =
                t.remember;


        if (forgot)
            forgot.textContent =
                t.forgot;


        if (loginSubmit)
            loginSubmit.textContent =
                t.login;


        if (orText)
            orText.textContent =
                t.or;


        if (google)
            google.textContent =
                t.google;


        if (facebook)
            facebook.textContent =
                t.facebook;


        const loginInputs =
            loginPanel.querySelectorAll(
                ".login-input"
            );


        if (loginInputs[0])
            loginInputs[0].placeholder =
                t.emailPhone;


        if (loginInputs[1])
            loginInputs[1].placeholder =
                t.password;

    }


    /* =========================
       CART
    ========================= */

    if (cartPanel) {

        const cartTitle =
            cartPanel.querySelector(
                "h2"
            );


        const cartTotalLabel =
            cartPanel.querySelector(
                ".cart-total span"
            );


        if (cartTitle) {

            cartTitle.textContent =
                language === "ar"
                    ? "عربة التسوق"
                    : "Shopping Cart";

        }


        if (cartTotalLabel) {

            cartTotalLabel.textContent =
                t.total;

        }

    }


    if (checkoutBtn) {

        checkoutBtn.textContent =
            t.checkout;

    }


    /* =========================
       ORDER
    ========================= */

    const orderTitle =
        document.querySelector(
            ".order-header h2"
        );


    if (orderTitle) {

        orderTitle.textContent =
            t.orderTitle;

    }


    const fullNameLabel =
        document.querySelector(
            'label[for="fullName"]'
        );


    const phoneLabel =
        document.querySelector(
            'label[for="phone"]'
        );


    const governorateLabel =
        document.querySelector(
            'label[for="governorate"]'
        );


    const addressLabel =
        document.querySelector(
            'label[for="address"]'
        );


    const notesLabel =
        document.querySelector(
            'label[for="notes"]'
        );


    if (fullNameLabel)
        fullNameLabel.textContent =
            t.fullName;


    if (phoneLabel)
        phoneLabel.textContent =
            t.phone;


    if (governorateLabel)
        governorateLabel.textContent =
            t.governorate;


    if (addressLabel)
        addressLabel.textContent =
            t.address;


    if (notesLabel)
        notesLabel.textContent =
            t.notes;


    const fullNameInput =
        document.getElementById(
            "fullName"
        );


    const phoneInput =
        document.getElementById(
            "phone"
        );


    const addressInput =
        document.getElementById(
            "address"
        );


    const notesInput =
        document.getElementById(
            "notes"
        );


    if (fullNameInput)
        fullNameInput.placeholder =
            t.fullNamePlaceholder;


    if (phoneInput)
        phoneInput.placeholder =
            t.phonePlaceholder;


    if (addressInput)
        addressInput.placeholder =
            t.addressPlaceholder;


    if (notesInput)
        notesInput.placeholder =
            t.notesPlaceholder;


    const governorate =
        document.getElementById(
            "governorate"
        );


    if (governorate) {

        governorate.options[0].text =
            t.chooseGovernorate;

    }


    const paymentTitle =
        document.querySelector(
            ".payment-section h3"
        );


    if (paymentTitle) {

        paymentTitle.textContent =
            t.payment;

    }


    const paymentOptions =
        document.querySelectorAll(
            ".payment-option span"
        );


    if (paymentOptions[0])
        paymentOptions[0].textContent =
            t.cash;


    if (paymentOptions[1])
        paymentOptions[1].textContent =
            t.card;


    if (paymentOptions[2])
        paymentOptions[2].textContent =
            t.wallet;


    if (backBtn) {

        backBtn.textContent =
            t.back;

    }


    if (confirmOrderBtn) {

        confirmOrderBtn.textContent =
            t.confirm;

    }


    updateProductDisplay();

    updateCart();


    if (
        orderModal &&
        orderModal.classList.contains(
            "active"
        )
    ) {

        updateOrderSummary();

    }

}


/* =========================================================
   LANGUAGE BUTTON
========================================================= */

if (languageBtn) {

    languageBtn.addEventListener(
        "click",
        function () {

            if (
                currentLanguage === "ar"
            ) {

                changeLanguage("en");

            } else {

                changeLanguage("ar");

            }

        }
    );

}


/* =========================================================
   SYNC CART + LANGUAGE BETWEEN PAGES
========================================================= */

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key === CART_KEY
        ) {

            loadCart();

            updateCart();

        }


        if (
            event.key === "siteLanguage"
        ) {

            const newLanguage =
                event.newValue || "ar";


            if (
                newLanguage !==
                currentLanguage
            ) {

                changeLanguage(
                    newLanguage
                );

            }

        }

    }
);


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeLoginPanel();

            closeCartPanel();

            closeOrderModal();

        }

    }
);


/* =========================================================
   FAQ
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const faqItems =
            document.querySelectorAll(
                ".faq-item"
            );


        faqItems.forEach(
            function (item) {

                const question =
                    item.querySelector(
                        ".faq-question"
                    );


                if (!question) {
                    return;
                }


                question.addEventListener(
                    "click",
                    function () {

                        item.classList.toggle(
                            "active"
                        );

                    }
                );

            }
        );

    }
);


/* =========================================================
   QUALITY VIDEO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const qualityVideo =
            document.getElementById(
                "qualityVideo"
            );


        if (!qualityVideo) {
            return;
        }


        qualityVideo.muted = true;

        qualityVideo.autoplay = true;

        qualityVideo.loop = true;

        qualityVideo.playsInline = true;


        qualityVideo.play().catch(
            function () {

                console.log(
                    "Video autoplay blocked by browser"
                );

            }
        );

    }
);


/* =========================================================
   ABOUT
========================================================= */

function openAboutSection() {

    const aboutSection =
        document.querySelector(
            ".about-section"
        );


    if (aboutSection) {

        aboutSection.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }

}


/* =========================================================
   DASHBOARD
========================================================= */

function openDashboardLogin() {

    const password =
        prompt(
            "أدخلي كلمة مرور لوحة التحكم:"
        );


    if (password === null) {
        return;
    }


    if (password === "2026") {

        window.location.href =
            "dashboard.html";

    } else {

        alert(
            "كلمة المرور غير صحيحة ❌"
        );

    }

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.documentElement.lang =
    currentLanguage;


document.documentElement.dir =
    currentLanguage === "ar"
        ? "rtl"
        : "ltr";


if (languageText) {

    languageText.textContent =
        currentLanguage === "ar"
            ? "English"
            : "العربية";

}


sizeButtons.forEach(
    function (button) {

        if (
            button.getAttribute(
                "data-size"
            ) === selectedSize
        ) {

            button.classList.add(
                "active"
            );

        }

    }
);


loadCart();

updateProductDisplay();

updateCart();


/* =========================================================
   MAKE REMOVE FUNCTION GLOBAL
   عشان onclick الموجود داخل السلة يشتغل
========================================================= */

window.removeFromCart =
    removeFromCart;
