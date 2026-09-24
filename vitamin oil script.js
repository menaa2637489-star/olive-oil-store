/* =========================================================
   VITAMIN D & E OIL
   SHARED CART SYSTEM
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

const languageBtn = document.getElementById("languageBtn");
const languageText = document.getElementById("languageText");

const addCartBtn = document.getElementById("addCartBtn");
const buyNowBtn = document.getElementById("buyNowBtn");

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const orderModal = document.getElementById("orderModal");
const checkoutBtn = document.querySelector(".checkout-btn");
const backBtn = document.getElementById("backBtn");
const confirmOrderBtn = document.getElementById("confirmOrderBtn");

const plusOneBtn = document.getElementById("plusOneBtn");
const minusOneBtn = document.getElementById("minusOneBtn");
const quantityValue = document.getElementById("quantityValue");

const pageBackBtn = document.getElementById("pageBackBtn");

const mainProductImage =
    document.getElementById("mainProductImage");

const productPriceElement =
    document.getElementById("productPrice");

const sizeButtons =
    document.querySelectorAll(".size-btn");


/* =========================================================
   SHARED STORAGE
========================================================= */

const CART_KEY = "oliveOilCart";
const LANGUAGE_KEY = "siteLanguage";


/* =========================================================
   PRODUCT ID
========================================================= */

const PRODUCT_ID = "vitamin-oil";


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage =
    localStorage.getItem(LANGUAGE_KEY) || "ar";


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    ar: {

        productName:
            "زيت الزيتون بفيتامين D و E",

        productType:
            "زيت زيتون بفيتامين D و E",

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
            "Olive Oil with Vitamin D & E",

        productType:
            "Olive Oil with Vitamin D & E",

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
        image: "250ml.jpeg",
        nameAr: "زيت الزيتون بفيتامين D و E",
        nameEn: "Olive Oil with Vitamin D & E",
        price: 320
    },

    one: {
        image: "1liter.jpeg",
        nameAr: "زيت الزيتون بفيتامين D و E",
        nameEn: "Olive Oil with Vitamin D & E",
        price: 580
    },

    two: {
        image: "1liter.jpeg",
        nameAr: "زيت الزيتون بفيتامين D و E",
        nameEn: "Olive Oil with Vitamin D & E",
        price: 1080
    },

    five: {
        image: "5liter.jpeg",
        nameAr: "زيت الزيتون بفيتامين D و E",
        nameEn: "Olive Oil with Vitamin D & E",
        price: 2600
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
   CART
========================================================= */

let cart = [];


/* =========================================================
   LOAD CART
========================================================= */

function loadCart() {

    try {

        const savedCart =
            localStorage.getItem(CART_KEY);

        cart =
            savedCart
                ? JSON.parse(savedCart)
                : [];

        if (!Array.isArray(cart)) {
            cart = [];
        }

    } catch (error) {

        cart = [];

    }

}


/* =========================================================
   SAVE CART
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

    return size || "";

}


/* =========================================================
   PRODUCT NAME
========================================================= */

function getCurrentProductName() {

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
                button.getAttribute("data-size");

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

                selectedSize =
                    newSize;

                if (mainProductImage) {

                    mainProductImage.src =
                        newProduct.image;

                }

                if (productPriceElement) {

                    productPriceElement.textContent =
                        newProduct.price +
                        (
                            currentLanguage === "ar"
                                ? " ج.م"
                                : " EGP"
                        );

                }

                sizeButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add("active");

                if (mainProductImage) {

                    mainProductImage.classList.remove(
                        "product-out"
                    );

                    mainProductImage.classList.add(
                        "product-in"
                    );

                }

            }, 350);

        }
    );

});


/* =========================================================
   ADD PRODUCT TO SHARED CART
========================================================= */

function addSelectedProductToCart(amount = 1) {

    const selectedProduct =
        productData[selectedSize];

    if (!selectedProduct) {
        return;
    }

    amount =
        Number(amount) || 1;

    if (amount < 1) {
        amount = 1;
    }


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

        existingItem.nameAr =
            selectedProduct.nameAr;

        existingItem.nameEn =
            selectedProduct.nameEn;

        existingItem.name =
            currentLanguage === "ar"
                ? selectedProduct.nameAr
                : selectedProduct.nameEn;

        existingItem.price =
            selectedProduct.price;

        existingItem.image =
            selectedProduct.image;

    } else {

        cart.push({

            id:
                "vitamin-" +
                selectedSize +
                "-" +
                Date.now(),

            productId:
                PRODUCT_ID,

            nameAr:
                selectedProduct.nameAr,

            nameEn:
                selectedProduct.nameEn,

            name:
                currentLanguage === "ar"
                    ? selectedProduct.nameAr
                    : selectedProduct.nameEn,

            size:
                selectedSize,

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
   PLUS BUTTON
   + = إضافة وحدة واحدة للسلة فورًا
========================================================= */

if (plusOneBtn) {

    plusOneBtn.addEventListener(
        "click",
        function () {

            addSelectedProductToCart(1);

            quantity = 1;

            if (quantityValue) {

                quantityValue.textContent =
                    "1";

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
   UPDATE CART
========================================================= */

function updateCart() {

    loadCart();

    const t =
        translations[currentLanguage];

    let totalItems = 0;
    let totalPrice = 0;


    if (!cartItems) {
        return;
    }


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


    cart.forEach(
        function (item, index) {

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


            const itemName =
                currentLanguage === "ar"
                    ? (
                        item.nameAr ||
                        item.name ||
                        item.nameEn ||
                        "منتج"
                    )
                    : (
                        item.nameEn ||
                        item.name ||
                        item.nameAr ||
                        "Product"
                    );


            const itemSize =
                item.size
                    ? getSizeName(item.size)
                    : "";


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

                    <p>
                        ${
                            currentLanguage === "ar"
                                ? "الإجمالي:"
                                : "Total:"
                        }

                        ${itemTotal}

                        ${
                            currentLanguage === "ar"
                                ? " ج.م"
                                : " EGP"
                        }
                    </p>

                    <button
                        class="cancel-cart-btn"
                        data-cart-index="${index}"
                    >
                        ${
                            currentLanguage === "ar"
                                ? "إلغاء"
                                : "Cancel"
                        }
                    </button>

                </div>

            `;

        }
    );


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


    /* =========================
       REMOVE BUTTONS
    ========================= */

    const removeButtons =
        cartItems.querySelectorAll(
            ".cancel-cart-btn"
        );


    removeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.getAttribute(
                                "data-cart-index"
                            )
                        );

                    removeFromCart(index);

                }
            );

        }
    );


    /* =========================
       CLEAR CART
    ========================= */

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
   REMOVE ITEM
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
                    "1";

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
                    "1";

            }

            openOrderModal();

        }
    );

}


/* =========================================================
   BACK FROM ORDER MODAL
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
   HEADER PAGE BACK
========================================================= */

if (pageBackBtn) {

    pageBackBtn.addEventListener(
        "click",
        function () {

            if (
                document.referrer &&
                document.referrer !== window.location.href
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

    loadCart();

    const t =
        translations[currentLanguage];

    let summaryHTML = "";
    let total = 0;


    cart.forEach(
        function (item) {

            const itemQuantity =
                Number(item.quantity) || 1;

            const itemPrice =
                Number(item.price) || 0;

            const itemTotal =
                itemPrice * itemQuantity;

            total +=
                itemTotal;


            const itemName =
                currentLanguage === "ar"
                    ? (
                        item.nameAr ||
                        item.name ||
                        item.nameEn
                    )
                    : (
                        item.nameEn ||
                        item.name ||
                        item.nameAr
                    );


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
                                ? ` - ${itemSize}`
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

        }
    );


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
                document.getElementById("fullName");

            const phoneElement =
                document.getElementById("phone");

            const governorateElement =
                document.getElementById("governorate");

            const addressElement =
                document.getElementById("address");

            const notesElement =
                document.getElementById("notes");


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


            if (cart.length === 0) {

                alert(
                    translations[currentLanguage]
                        .emptyAlert
                );

                return;

            }


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


            const newOrder = {

                id:
                    "ORD-" +
                    Date.now(),

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
                    JSON.parse(
                        JSON.stringify(cart)
                    ),

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

                if (!Array.isArray(orders)) {
                    orders = [];
                }

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


            /* تفريغ السلة المشتركة */

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
   LANGUAGE
========================================================= */

function changeLanguage(language) {

    if (
        language !== "ar" &&
        language !== "en"
    ) {

        language = "ar";

    }


    currentLanguage =
        language;


    localStorage.setItem(
        LANGUAGE_KEY,
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


    /* PRODUCT */

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


    /* CART */

    if (cartPanel) {

        const cartTitle =
            cartPanel.querySelector("h2");

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


    /* LOGIN */

    if (loginPanel) {

        const loginTitle =
            loginPanel.querySelector("h2");

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


        if (loginTitle) {
            loginTitle.textContent =
                t.login;
        }

        if (loginSubtitle) {
            loginSubtitle.textContent =
                t.loginSubtitle;
        }

        if (remember) {
            remember.textContent =
                t.remember;
        }

        if (forgot) {
            forgot.textContent =
                t.forgot;
        }

        if (loginSubmit) {
            loginSubmit.textContent =
                t.login;
        }

        if (orText) {
            orText.textContent =
                t.or;
        }

        if (google) {
            google.textContent =
                t.google;
        }

        if (facebook) {
            facebook.textContent =
                t.facebook;
        }


        const loginInputs =
            loginPanel.querySelectorAll(
                ".login-input"
            );


        if (loginInputs[0]) {
            loginInputs[0].placeholder =
                t.emailPhone;
        }

        if (loginInputs[1]) {
            loginInputs[1].placeholder =
                t.password;
        }

    }


    /* ORDER */

    const orderTitle =
        document.querySelector(
            ".order-header h2"
        );


    if (orderTitle) {
        orderTitle.textContent =
            t.orderTitle;
    }


    const labels = {

        fullName:
            document.querySelector(
                'label[for="fullName"]'
            ),

        phone:
            document.querySelector(
                'label[for="phone"]'
            ),

        governorate:
            document.querySelector(
                'label[for="governorate"]'
            ),

        address:
            document.querySelector(
                'label[for="address"]'
            ),

        notes:
            document.querySelector(
                'label[for="notes"]'
            )

    };


    if (labels.fullName) {
        labels.fullName.textContent =
            t.fullName;
    }

    if (labels.phone) {
        labels.phone.textContent =
            t.phone;
    }

    if (labels.governorate) {
        labels.governorate.textContent =
            t.governorate;
    }

    if (labels.address) {
        labels.address.textContent =
            t.address;
    }

    if (labels.notes) {
        labels.notes.textContent =
            t.notes;
    }


    const fullNameInput =
        document.getElementById("fullName");

    const phoneInput =
        document.getElementById("phone");

    const addressInput =
        document.getElementById("address");

    const notesInput =
        document.getElementById("notes");


    if (fullNameInput) {
        fullNameInput.placeholder =
            t.fullNamePlaceholder;
    }

    if (phoneInput) {
        phoneInput.placeholder =
            t.phonePlaceholder;
    }

    if (addressInput) {
        addressInput.placeholder =
            t.addressPlaceholder;
    }

    if (notesInput) {
        notesInput.placeholder =
            t.notesPlaceholder;
    }


    const governorate =
        document.getElementById(
            "governorate"
        );


    if (
        governorate &&
        governorate.options.length > 0
    ) {

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


    if (paymentOptions[0]) {
        paymentOptions[0].textContent =
            t.cash;
    }

    if (paymentOptions[1]) {
        paymentOptions[1].textContent =
            t.card;
    }

    if (paymentOptions[2]) {
        paymentOptions[2].textContent =
            t.wallet;
    }


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
        orderModal.classList.contains("active")
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

            changeLanguage(
                currentLanguage === "ar"
                    ? "en"
                    : "ar"
            );

        }
    );

}


/* =========================================================
   STORAGE SYNC
========================================================= */

window.addEventListener(
    "storage",
    function (event) {

        if (event.key === CART_KEY) {

            loadCart();

            updateCart();

        }


        if (event.key === LANGUAGE_KEY) {

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

        if (event.key === "Escape") {

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


/* DEFAULT SIZE */

sizeButtons.forEach(
    function (button) {

        if (
            button.getAttribute("data-size") ===
            selectedSize
        ) {

            button.classList.add("active");

        }

    }
);


/* INITIAL DISPLAY */

changeLanguage(
    currentLanguage
);
