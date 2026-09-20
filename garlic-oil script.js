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
const checkoutBtn = document.querySelector(".checkout-btn");
const backBtn = document.getElementById("backBtn");
const confirmOrderBtn = document.getElementById("confirmOrderBtn");


/* =========================
   LANGUAGE
========================= */

let currentLanguage = "ar";


/* =========================
   TRANSLATIONS
========================= */

const translations = {

    ar: {

        productName: "زيت الثوم من دكتور أبو النصر",
        productType: "زيت ثوم طبيعي",
        chooseSize: "اختاري الحجم",
        price: "السعر:",
        buyNow: "اشتر الآن",
        addCart: "أضف للسلة",

        half: "نصف لتر",
        one: "1 لتر",
        two: "2 لتر",
        five: "5 لتر",

        emptyCart: "السلة فارغة حاليًا",
        cancel: "إلغاء",
        cancelAll: "إلغاء الكل",
        size: "الحجم:",
        itemPrice: "السعر:",
        total: "الإجمالي",

        checkout: "إتمام الطلب",

        orderTitle: "إتمام الطلب",
        fullName: "الاسم بالكامل",
        fullNamePlaceholder: "مثال: أحمد محمد",
        phone: "رقم الهاتف",
        phonePlaceholder: "01xxxxxxxxx",
        governorate: "المحافظة",
        chooseGovernorate: "اختر المحافظة",
        address: "العنوان بالتفصيل",
        addressPlaceholder: "الشارع، رقم العمارة، الحي، علامة مميزة",
        notes: "ملاحظات (اختياري)",
        notesPlaceholder: "مثال: التسليم مساءً",

        payment: "طريقة الدفع",
        cash: "💵 الدفع عند الاستلام (كاش)",
        card: "💳 بطاقة ائتمان / فيزا",
        wallet: "📱 محفظة إلكترونية",

        back: "رجوع",
        confirm: "تأكيد الطلب",

        emptyAlert: "السلة فارغة، أضيفي منتج أولًا.",
        incompleteAlert: "من فضلك اكملي بيانات الطلب.",
        successAlert: "تم تأكيد الطلب بنجاح ❤️",

        login: "تسجيل الدخول",
        loginSubtitle: "سجل دخولك للوصول إلى حسابك",
        emailPhone: "البريد الإلكتروني أو رقم الهاتف",
        password: "كلمة المرور",
        remember: "تذكرني",
        forgot: "نسيت كلمة المرور؟",
        or: "أو",
        google: "تسجيل الدخول باستخدام جوجل",
        facebook: "تسجيل الدخول باستخدام فيسبوك",

        arabic: "العربية",
        english: "English"

    },


    en: {

        productName: "Dr. Abu El Nasr Garlic Oil",
        productType: "Natural Garlic Oil",
        chooseSize: "Choose Size",
        price: "Price:",
        buyNow: "Buy Now",
        addCart: "Add to Cart",

        half: "Half Liter",
        one: "1 Liter",
        two: "2 Liters",
        five: "5 Liters",

        emptyCart: "Your cart is currently empty",
        cancel: "Cancel",
        cancelAll: "Cancel All",
        size: "Size:",
        itemPrice: "Price:",
        total: "Total",

        checkout: "Checkout",

        orderTitle: "Complete Your Order",
        fullName: "Full Name",
        fullNamePlaceholder: "Example: Ahmed Mohamed",
        phone: "Phone Number",
        phonePlaceholder: "01xxxxxxxxx",
        governorate: "Governorate",
        chooseGovernorate: "Choose Governorate",
        address: "Detailed Address",
        addressPlaceholder: "Street, building number, district, landmark",
        notes: "Notes (Optional)",
        notesPlaceholder: "Example: Delivery in the evening",

        payment: "Payment Method",
        cash: "💵 Cash on Delivery",
        card: "💳 Credit / Visa Card",
        wallet: "📱 Electronic Wallet",

        back: "Back",
        confirm: "Confirm Order",

        emptyAlert: "Your cart is empty. Please add a product first.",
        incompleteAlert: "Please complete your order information.",
        successAlert: "Your order has been confirmed successfully ❤️",

        login: "Login",
        loginSubtitle: "Login to access your account",
        emailPhone: "Email or Phone Number",
        password: "Password",
        remember: "Remember me",
        forgot: "Forgot Password?",
        or: "OR",
        google: "Continue with Google",
        facebook: "Continue with Facebook",

        arabic: "العربية",
        english: "English"

    }

};


/* =========================
   LOGIN PANEL
========================= */

function openLogin() {

    loginPanel.classList.add("active");
    loginOverlay.classList.add("active");

}

function closeLoginPanel() {

    loginPanel.classList.remove("active");
    loginOverlay.classList.remove("active");

}

loginBtn.addEventListener("click", openLogin);

closeLogin.addEventListener("click", closeLoginPanel);

loginOverlay.addEventListener("click", closeLoginPanel);


/* =========================
   CART PANEL
========================= */

function openCart() {

    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");

}

function closeCartPanel() {

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");

}

cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


/* =========================
   PRODUCT DATA
========================= */

const productData = {

    half: {
        image: "garlic-250ml.jpeg",
        name: "زيت الثوم من دكتور أبو النصر",
        price: 350
    },

    one: {
        image: "garlic-1liter.jpeg",
        name: "زيت الثوم من دكتور أبو النصر",
        price: 650
    },

    two: {
        image: "garlic-2liter.jpeg",
        name: "زيت الثوم من دكتور أبو النصر",
        price: 1200
    },

    five: {
        image: "garlic-5liter.jpeg",
        name: "زيت الثوم من دكتور أبو النصر",
        price: 2800
    }

};


/* =========================
   PRODUCT ELEMENTS
========================= */

let selectedSize = "half";

const mainProductImage =
    document.getElementById("mainProductImage");

const productPriceElement =
    document.getElementById("productPrice");

const sizeButtons =
    document.querySelectorAll(".size-btn");


productPriceElement.textContent =
    productData.half.price + " ج.م";


/* =========================
   CART DATA
========================= */

let cart = [];


/* =========================
   SIZE NAME
========================= */

function getSizeName(size) {

    const t = translations[currentLanguage];

    if (size === "half") return t.half;
    if (size === "one") return t.one;
    if (size === "two") return t.two;
    if (size === "five") return t.five;

}


/* =========================
   CHANGE PRODUCT SIZE
========================= */

sizeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const newSize =
            button.getAttribute("data-size");

        if (newSize === selectedSize) {
            return;
        }

        const newProduct =
            productData[newSize];

        mainProductImage.classList.remove("product-in");

        mainProductImage.classList.add("product-out");


        setTimeout(function () {

            mainProductImage.src =
                newProduct.image;

            productPriceElement.textContent =
                newProduct.price + " ج.م";

            selectedSize = newSize;


            sizeButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });

            button.classList.add("active");


            mainProductImage.classList.remove("product-out");

            mainProductImage.classList.add("product-in");

        }, 350);

    });

});


/* =========================
   QUANTITY CONTROL
========================= */

let quantity = 1;

const plusOneBtn =
    document.getElementById("plusOneBtn");

const minusOneBtn =
    document.getElementById("minusOneBtn");

const quantityValue =
    document.getElementById("quantityValue");


plusOneBtn.addEventListener("click", function () {

    quantity++;

    quantityValue.textContent =
        quantity;

});


minusOneBtn.addEventListener("click", function () {

    if (quantity > 1) {

        quantity--;

        quantityValue.textContent =
            quantity;

    }

});


/* =========================
   ADD PRODUCT TO CART
========================= */

function addSelectedProductToCart() {

    const selectedProduct =
        productData[selectedSize];


    for (let i = 0; i < quantity; i++) {

        cart.push({

            id: Date.now() + i,

            size: selectedSize,

            name: selectedProduct.name,

            price: selectedProduct.price

        });

    }


    updateCart();


    quantity = 1;

    quantityValue.textContent =
        quantity;

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const t = translations[currentLanguage];

    cartCount.textContent =
        cart.length;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                ${t.emptyCart}
            </p>

        `;

        cartTotal.textContent =
            "0 ج.م";

        return;
    }


    let total = 0;

    let cartHTML = "";


    cart.forEach(function (item, index) {

        total += item.price;


        cartHTML += `

            <div class="cart-product">

                <p>
                    ${item.name}
                </p>

                <p>
                    ${currentLanguage === "ar"
                        ? "الحجم:"
                        : "Size:"}
                    ${getSizeName(item.size)}
                </p>

                <p>
                    ${currentLanguage === "ar"
                        ? "السعر:"
                        : "Price:"}
                    ${item.price}
                    ${currentLanguage === "ar"
                        ? "ج.م"
                        : "EGP"}
                </p>

                <button
                    class="cancel-cart-btn"
                    onclick="removeFromCart(${index})">

                    ${currentLanguage === "ar"
                        ? "إلغاء"
                        : "Cancel"}

                </button>

            </div>

        `;

    });


    cartItems.innerHTML =
        cartHTML;


    cartTotal.textContent =
        total + " ج.م";


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


/* =========================
   REMOVE ONE PRODUCT
========================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =========================
   CLEAR CART
========================= */

function clearCart() {

    cart = [];

    updateCart();

}


/* =========================
   ADD TO CART
========================= */

addCartBtn.addEventListener("click", function () {

    addSelectedProductToCart();

    openCart();

});


/* =========================
   ORDER MODAL
========================= */

function openOrderModal() {

    if (cart.length === 0) {

        alert(
            translations[currentLanguage].emptyAlert
        );

        return;
    }


    updateOrderSummary();

    orderModal.classList.add("active");

}


/* =========================
   CLOSE ORDER MODAL
========================= */

function closeOrderModal() {

    orderModal.classList.remove("active");

}


/* =========================
   CHECKOUT
========================= */

checkoutBtn.addEventListener("click", function () {

    closeCartPanel();

    openOrderModal();

});


/* =========================
   BUY NOW
========================= */

buyNowBtn.addEventListener("click", function () {

    addSelectedProductToCart();

    openOrderModal();

});


/* =========================
   BACK BUTTON
========================= */

backBtn.addEventListener("click", function () {

    closeOrderModal();

});


/* =========================
   ORDER SUMMARY
========================= */

function updateOrderSummary() {

    const orderSummary =
        document.querySelector(".order-summary");

    const t =
        translations[currentLanguage];


    let summaryHTML = "";

    let total = 0;


    cart.forEach(function (item) {

        total += item.price;


        summaryHTML += `

            <div class="order-item">

                <span>
                    ${item.name}
                    ${getSizeName(item.size)}
                    × 1
                </span>

                <span>
                    ${item.price} ج.م
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
                ${total} ج.م
            </strong>

        </div>

    `;


    orderSummary.innerHTML =
        summaryHTML;

}


/* =========================
   CONFIRM ORDER
========================= */

confirmOrderBtn.addEventListener("click", function () {

    const fullName =
        document.getElementById("fullName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const governorate =
        document.getElementById("governorate").value;

    const address =
        document.getElementById("address").value.trim();

    const notes =
        document.getElementById("notes").value.trim();

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
            translations[currentLanguage].incompleteAlert
        );

        return;
    }


    let total = 0;

    cart.forEach(function (item) {

        total += item.price;

    });


    const orderId =
        "GARLIC-ORD-" + Date.now();


    const newOrder = {

        id: orderId,

        productType: "garlic-oil",

        name: fullName,

        phone: phone,

        governorate: governorate,

        address: address,

        notes: notes,

        paymentMethod: paymentMethod,

        total: total,

        status:
            paymentMethod === "cash"
                ? "جديد"
                : "بانتظار الدفع",

        items: cart.map(function (item) {

            return {

                name: item.name,

                size: item.size,

                price: item.price

            };

        }),

        date:
            new Date().toLocaleString("ar-EG")

    };


    /*
       بنستخدم نفس مفتاح الطلبات
       علشان الطلب يظهر في لوحة التحكم
    */

    const savedOrders =
        localStorage.getItem("oliveOilOrders");


    const orders =
        savedOrders
            ? JSON.parse(savedOrders)
            : [];


    orders.push(newOrder);


    localStorage.setItem(
        "oliveOilOrders",
        JSON.stringify(orders)
    );


    alert(
        translations[currentLanguage].successAlert
    );


    cart = [];

    updateCart();


    closeOrderModal();


    document.getElementById("fullName").value = "";

    document.getElementById("phone").value = "";

    document.getElementById("governorate").value = "";

    document.getElementById("address").value = "";

    document.getElementById("notes").value = "";

});


/* =========================
   APPLY LANGUAGE
========================= */

function changeLanguage(language) {

    currentLanguage = language;

    const t =
        translations[language];


    document.documentElement.lang =
        language;


    document.documentElement.dir =
        language === "ar"
            ? "rtl"
            : "ltr";


    languageText.textContent =
        language === "ar"
            ? "English"
            : "العربية";


    const elements =
        document.querySelectorAll(
            "[data-ar][data-en]"
        );


    elements.forEach(function (element) {

        element.textContent =
            language === "ar"
                ? element.getAttribute("data-ar")
                : element.getAttribute("data-en");

    });


    /* =========================
       PRODUCT
    ========================= */

    const productNameElement =
        document.getElementById("productName");

    const productTypeElement =
        document.querySelector(".product-type");

    const sizesTitle =
        document.querySelector(".sizes-title");

    const priceLabel =
        document.querySelector(".product-price span");


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


    /* =========================
       SIZE BUTTONS
    ========================= */

    sizeButtons.forEach(function (button) {

        const size =
            button.getAttribute("data-size");

        button.textContent =
            getSizeName(size);

    });


    /* =========================
       PRODUCT BUTTONS
    ========================= */

    addCartBtn.textContent =
        t.addCart;

    buyNowBtn.textContent =
        t.buyNow;


    /* =========================
       LOGIN
    ========================= */

    const loginTitle =
        loginPanel.querySelector("h2");

    const loginSubtitle =
        loginPanel.querySelector(".panel-subtitle");

    const remember =
        loginPanel.querySelector(
            ".login-options span"
        );

    const forgot =
        loginPanel.querySelector(
            ".login-options a"
        );

    const loginSubmit =
        loginPanel.querySelector(".login-submit");

    const orText =
        loginPanel.querySelector(".or-line span");

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


    /* Login placeholders */

    const loginInputs =
        loginPanel.querySelectorAll(".login-input");


    if (loginInputs[0])
        loginInputs[0].placeholder =
            t.emailPhone;

    if (loginInputs[1])
        loginInputs[1].placeholder =
            t.password;


    /* =========================
       CART
    ========================= */

    const cartTitle =
        cartPanel.querySelector("h2");

    const cartTotalLabel =
        cartPanel.querySelector(".cart-total span");


    if (cartTitle)
        cartTitle.textContent =
            language === "ar"
                ? "عربة التسوق"
                : "Shopping Cart";


    if (cartTotalLabel)
        cartTotalLabel.textContent =
            t.total;


    checkoutBtn.textContent =
        t.checkout;


    /* =========================
       ORDER MODAL
    ========================= */

    const orderTitle =
        document.querySelector(".order-header h2");


    if (orderTitle)
        orderTitle.textContent =
            t.orderTitle;


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


    /* =========================
       PLACEHOLDERS
    ========================= */

    const fullNameInput =
        document.getElementById("fullName");

    const phoneInput =
        document.getElementById("phone");

    const addressInput =
        document.getElementById("address");

    const notesInput =
        document.getElementById("notes");


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


    /* =========================
       GOVERNORATE
    ========================= */

    const governorate =
        document.getElementById("governorate");


    if (governorate) {

        governorate.options[0].text =
            t.chooseGovernorate;

    }


    /* =========================
       PAYMENT
    ========================= */

    const paymentTitle =
        document.querySelector(
            ".payment-section h3"
        );


    if (paymentTitle)
        paymentTitle.textContent =
            t.payment;


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


    /* =========================
       ORDER BUTTONS
    ========================= */

    backBtn.textContent =
        t.back;

    confirmOrderBtn.textContent =
        t.confirm;


    /* =========================
       UPDATE CART
    ========================= */

    updateCart();


    if (orderModal.classList.contains("active")) {

        updateOrderSummary();

    }

}


/* =========================
   LANGUAGE BUTTON
========================= */

languageBtn.addEventListener("click", function () {

    if (currentLanguage === "ar") {

        changeLanguage("en");

    } else {

        changeLanguage("ar");

    }

});


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeLoginPanel();

        closeCartPanel();

        closeOrderModal();

    }

});


/* =========================
   FAQ ACCORDION
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(function (item) {

        const question =
            item.querySelector(".faq-question");


        if (!question) return;


        question.addEventListener("click", function () {

            item.classList.toggle("active");

        });

    });

});


/* =========================
   INITIAL
========================= */

updateCart();


/* =========================
   QUALITY VIDEO
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const qualityVideo =
        document.getElementById("qualityVideo");


    if (!qualityVideo) return;


    qualityVideo.muted = true;

    qualityVideo.autoplay = true;

    qualityVideo.loop = true;

    qualityVideo.playsInline = true;


    qualityVideo.play().catch(function () {

        console.log(
            "Video autoplay blocked by browser"
        );

    });

});


/* =========================
   CONTACT - ABOUT BUTTON
========================= */

function openAboutSection() {

    const aboutSection =
        document.querySelector(".about-section");


    if (aboutSection) {

        aboutSection.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }

}


/* =========================
   DASHBOARD ACCESS
========================= */

function openDashboardLogin() {

    const password =
        prompt("أدخلي كلمة مرور لوحة التحكم:");


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

ده كده نسخة الثوم، والبيانات الوهمية كلها موجودة في جزء واحد اسمه PRODUCT DATA عشان لما نجيب الأسعار والصور الحقيقية نغيرهم بسهولة.

مهم: أسماء الصور اللي الكود مستنيها حاليًا:
"garlic-250ml.jpeg"
"garlic-1liter.jpeg"
"garlic-2liter.jpeg"
"garlic-5liter.jpeg"

بعد ما تحطي ملف الـJS، الخطوة اللي بعدها نربطه بـ "garlic-oil.html" ونجرب الأحجام + الكمية + السلة + الطلب واحدة واحدة.
