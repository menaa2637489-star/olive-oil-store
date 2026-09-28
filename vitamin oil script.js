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

/* PAGE BACK BUTTON */
const pageBackBtn =
    document.getElementById("pageBackBtn");


/* =========================
   LANGUAGE
========================= */

let currentLanguage =
    localStorage.getItem("siteLanguage") || "ar";


/* =========================
   TRANSLATIONS
========================= */

const translations = {

    ar: {

        productName: "زيت زيتون دكتور أبو النصر",
        productType: "زيت زيتون بكر ممتاز",
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

        productName: "Dr. Abu El Nasr Olive Oil",
        productType: "Extra Virgin Olive Oil",
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
   PRODUCT DATA
========================= */

const productData = {

    half: {
        image: "250ml.jpeg",
        nameAr: "زيت زيتون دكتور أبو النصر",
        nameEn: "Dr. Abu El Nasr Olive Oil",
        price: 320
    },

    one: {
        image: "1liter.jpeg",
        nameAr: "زيت زيتون دكتور أبو النصر",
        nameEn: "Dr. Abu El Nasr Olive Oil",
        price: 580
    },

    two: {
        image: "1liter.jpeg",
        nameAr: "زيت زيتون دكتور أبو النصر",
        nameEn: "Dr. Abu El Nasr Olive Oil",
        price: 1080
    },

    five: {
        image: "5liter.jpeg",
        nameAr: "زيت زيتون دكتور أبو النصر",
        nameEn: "Dr. Abu El Nasr Olive Oil",
        price: 2600
    }

};


/* =========================
   PRODUCT ELEMENTS
========================= */

let selectedSize = "half";
let quantity = 1;

const mainProductImage =
    document.getElementById("mainProductImage");

const productPriceElement =
    document.getElementById("productPrice");

const sizeButtons =
    document.querySelectorAll(".size-btn");

const plusOneBtn =
    document.getElementById("plusOneBtn");

const minusOneBtn =
    document.getElementById("minusOneBtn");

const quantityValue =
    document.getElementById("quantityValue");


/* =========================
   SHARED CART
========================= */

let cart =
    JSON.parse(
        localStorage.getItem("oliveOilCart")
    ) || [];


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
   LOAD SHARED CART
========================= */

function loadSharedCart() {

    const savedCart =
        localStorage.getItem("oliveOilCart");

    if (savedCart) {

        try {

            cart =
                JSON.parse(savedCart) || [];

        } catch (error) {

            cart = [];

        }

    } else {

        cart = [];

    }

    updateCart();

}


/* =========================
   SIZE NAME
========================= */

function getSizeName(size) {

    const t =
        translations[currentLanguage];

    if (size === "half") return t.half;
    if (size === "one") return t.one;
    if (size === "two") return t.two;
    if (size === "five") return t.five;

    return size;

}


/* =========================
   PRODUCT NAME
========================= */

function getProductName() {

    const product =
        productData[selectedSize];

    return currentLanguage === "ar"
        ? product.nameAr
        : product.nameEn;

}


/* =========================
   UPDATE CART COUNT
========================= */

function updateCartCount() {

    const totalQuantity =
        cart.reduce(function (total, item) {

            return total +
                Number(item.quantity || 1);

        }, 0);

    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }

}


/* =========================
   CHANGE PRODUCT SIZE
========================= */

sizeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

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

            if (mainProductImage) {

                mainProductImage.src =
                    newProduct.image;

            }

            if (productPriceElement) {

                productPriceElement.textContent =
                    newProduct.price + " ج.م";

            }

            selectedSize =
                newSize;


            sizeButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });

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

    });

});


/* =========================
   ADD / UPDATE VIRGIN ITEM
========================= */

function addVirginProductToSharedCart() {

    const product =
        productData[selectedSize];

    if (!product) {
        return;
    }


    /*
       لو الرئيسية كانت أضافت المنتج
       بشكل مؤقت من زر +
       بدون حجم أو سعر،
       نحوله هنا للمنتج الحقيقي.
    */

    const pendingItem =
        cart.find(function (item) {

            return (
                item.productId === "virgin-oil" &&
                (!item.size || !item.price)
            );

        });


    if (pendingItem) {

        pendingItem.size =
            selectedSize;

        pendingItem.sizeAr =
            translations.ar[selectedSize];

        pendingItem.sizeEn =
            translations.en[selectedSize];

        pendingItem.nameAr =
            product.nameAr;

        pendingItem.nameEn =
            product.nameEn;

        pendingItem.price =
            product.price;

        pendingItem.cartItemId =
            "virgin-oil-" +
            selectedSize;

        pendingItem.quantity =
            Number(pendingItem.quantity || 1)
            + quantity - 1;

    } else {

        const existingItem =
            cart.find(function (item) {

                return (
                    item.productId === "virgin-oil" &&
                    item.size === selectedSize
                );

            });


        if (existingItem) {

            existingItem.quantity =
                Number(existingItem.quantity || 1)
                + quantity;

        } else {

            cart.push({

                cartItemId:
                    "virgin-oil-" +
                    selectedSize,

                productId:
                    "virgin-oil",

                nameAr:
                    product.nameAr,

                nameEn:
                    product.nameEn,

                size:
                    selectedSize,

                sizeAr:
                    translations.ar[selectedSize],

                sizeEn:
                    translations.en[selectedSize],

                price:
                    product.price,

                quantity:
                    quantity

            });

        }

    }


    saveCart();

    updateCart();


    quantity = 1;

    if (quantityValue) {

        quantityValue.textContent =
            quantity;

    }

}


/* =========================
   QUANTITY
========================= */

if (plusOneBtn) {

    plusOneBtn.addEventListener(
        "click",
        function () {

            quantity++;

            if (quantityValue) {

                quantityValue.textContent =
                    quantity;

            }

        }
    );

}


if (minusOneBtn) {

    minusOneBtn.addEventListener(
        "click",
        function () {

            if (quantity > 1) {

                quantity--;

                if (quantityValue) {

                    quantityValue.textContent =
                        quantity;

                }

            }

        }
    );

}


/* =========================
   ADD TO CART BUTTON
========================= */

if (addCartBtn) {

    addCartBtn.addEventListener(
        "click",
        function () {

            addVirginProductToSharedCart();

            openCart();

        }
    );

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    updateCartCount();


    if (!cartItems || !cartTotal) {
        return;
    }


    const t =
        translations[currentLanguage];


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                ${t.emptyCart}
            </p>

        `;

        cartTotal.textContent =
            currentLanguage === "ar"
                ? "0 ج.م"
                : "0 EGP";

        return;

    }


    let total = 0;

    let cartHTML = "";


    cart.forEach(function (item, index) {

        const itemQuantity =
            Number(item.quantity || 1);

        const itemPrice =
            Number(item.price || 0);

        const itemTotal =
            itemPrice * itemQuantity;

        total += itemTotal;


        const itemName =
            currentLanguage === "ar"
                ? item.nameAr
                : item.nameEn;


        const itemSize =
            currentLanguage === "ar"
                ? (
                    item.sizeAr ||
                    getSizeName(item.size)
                )
                : (
                    item.sizeEn ||
                    getSizeName(item.size)
                );


        cartHTML += `

            <div class="cart-product">

                <p>
                    ${itemName || t.productName}
                </p>

                <p>
                    ${t.size}
                    ${itemSize || "-"}
                </p>

                <p>
                    ${t.itemPrice}
                    ${itemPrice}
                    ${currentLanguage === "ar"
                        ? "ج.م"
                        : "EGP"}
                </p>

                <p>
                    ${currentLanguage === "ar"
                        ? "الكمية:"
                        : "Quantity:"}
                    ${itemQuantity}
                </p>

                <div class="cart-quantity-controls">

                    <button
                        onclick="decreaseCartItem(${index})">
                        −
                    </button>

                    <span>
                        ${itemQuantity}
                    </span>

                    <button
                        onclick="increaseCartItem(${index})">
                        +
                    </button>

                </div>

                <button
                    class="cancel-cart-btn"
                    onclick="removeFromCart(${index})">

                    ${t.cancel}

                </button>

            </div>

        `;

    });


    cartItems.innerHTML =
        cartHTML;


    cartTotal.textContent =
        total +
        (currentLanguage === "ar"
            ? " ج.م"
            : " EGP");


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
   INCREASE CART ITEM
========================= */

function increaseCartItem(index) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity =
        Number(cart[index].quantity || 1) + 1;

    saveCart();

    updateCart();

}


/* =========================
   DECREASE CART ITEM
========================= */

function decreaseCartItem(index) {

    if (!cart[index]) {
        return;
    }


    if (
        Number(cart[index].quantity || 1) > 1
    ) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

}


/* =========================
   REMOVE ONE PRODUCT
========================= */

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }

    cart.splice(index, 1);

    saveCart();

    updateCart();

}


/* =========================
   CLEAR CART
========================= */

function clearCart() {

    cart = [];

    saveCart();

    updateCart();

}


/* =========================
   ORDER MODAL
========================= */

function openOrderModal() {

    if (cart.length === 0) {

        alert(
            translations[currentLanguage]
                .emptyAlert
        );

        return;

    }


    updateOrderSummary();

    if (orderModal) {

        orderModal.classList.add("active");

    }

}


function closeOrderModal() {

    if (orderModal) {

        orderModal.classList.remove("active");

    }

}


/* =========================
   CHECKOUT
========================= */

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function () {

            closeCartPanel();

            openOrderModal();

        }
    );

}


/* =========================
   BUY NOW
========================= */

if (buyNowBtn) {

    buyNowBtn.addEventListener(
        "click",
        function () {

            addVirginProductToSharedCart();

            openOrderModal();

        }
    );

}


/* =========================
   ORDER SUMMARY
========================= */

function updateOrderSummary() {

    const orderSummary =
        document.querySelector(".order-summary");

    if (!orderSummary) {
        return;
    }


    const t =
        translations[currentLanguage];


    let summaryHTML = "";

    let total = 0;


    cart.forEach(function (item) {

        const itemQuantity =
            Number(item.quantity || 1);

        const itemTotal =
            Number(item.price || 0) *
            itemQuantity;

        total += itemTotal;


        const itemName =
            currentLanguage === "ar"
                ? item.nameAr
                : item.nameEn;


        const itemSize =
            currentLanguage === "ar"
                ? (
                    item.sizeAr ||
                    getSizeName(item.size)
                )
                : (
                    item.sizeEn ||
                    getSizeName(item.size)
                );


        summaryHTML += `

            <div class="order-item">

                <span>
                    ${itemName}
                    - ${itemSize}
                    × ${itemQuantity}
                </span>

                <span>
                    ${itemTotal}
                    ${currentLanguage === "ar"
                        ? "ج.م"
                        : "EGP"}
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
                ${currentLanguage === "ar"
                    ? "ج.م"
                    : "EGP"}
            </strong>

        </div>

    `;


    orderSummary.innerHTML =
        summaryHTML;

}


/* =========================
   CONFIRM ORDER
========================= */

if (confirmOrderBtn) {

    confirmOrderBtn.addEventListener(
        "click",
        function () {

            const fullName =
                document.getElementById(
                    "fullName"
                )?.value.trim();

            const phone =
                document.getElementById(
                    "phone"
                )?.value.trim();

            const governorate =
                document.getElementById(
                    "governorate"
                )?.value;

            const address =
                document.getElementById(
                    "address"
                )?.value.trim();

            const notes =
                document.getElementById(
                    "notes"
                )?.value.trim();

            const paymentMethod =
                document.querySelector(
                    'input[name="payment"]:checked'
                )?.value || "cash";


            if (
                !fullName ||
                !phone ||
                !governorate ||
                !address
            ) {

                alert(
                    translations[currentLanguage]
                        .incompleteAlert
                );

                return;

            }


            let total = 0;


            cart.forEach(function (item) {

                total +=
                    Number(item.price || 0) *
                    Number(item.quantity || 1);

            });


            const orderId =
                "ORD-" + Date.now();


            const newOrder = {

                id: orderId,

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

                items:
                    cart.map(function (item) {

                        return {

                            productId:
                                item.productId,

                            nameAr:
                                item.nameAr,

                            nameEn:
                                item.nameEn,

                            size:
                                item.size,

                            price:
                                item.price,

                            quantity:
                                item.quantity

                        };

                    }),

                date:
                    new Date().toLocaleString(
                        "ar-EG"
                    )

            };


            const savedOrders =
                localStorage.getItem(
                    "oliveOilOrders"
                );


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
                translations[currentLanguage]
                    .successAlert
            );


            cart = [];

            saveCart();

            updateCart();

            closeOrderModal();


            const fields = [
                "fullName",
                "phone",
                "governorate",
                "address",
                "notes"
            ];


            fields.forEach(function (id) {

                const field =
                    document.getElementById(id);

                if (field) {
                    field.value = "";
                }

            });

        }
    );

}


/* =========================
   OPEN / CLOSE LOGIN
========================= */

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


/* =========================
   OPEN / CLOSE CART
========================= */

function openCart() {

    loadSharedCart();

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
        function () {

            loadSharedCart();

            openCart();

        }
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


/* =========================
   PAGE BACK BUTTON
========================= */

if (pageBackBtn) {

    pageBackBtn.addEventListener(
        "click",
        function () {

            window.history.back();

        }
    );

}


/* =========================
   APPLY LANGUAGE
========================= */

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


    elements.forEach(function (element) {

        element.textContent =
            language === "ar"
                ? element.getAttribute("data-ar")
                : element.getAttribute("data-en");

    });


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


    sizeButtons.forEach(function (button) {

        const size =
            button.getAttribute(
                "data-size"
            );

        button.textContent =
            getSizeName(size);

    });


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
            cartPanel.querySelector("h2");

        const cartTotalLabel =
            cartPanel.querySelector(
                ".cart-total span"
            );


        if (cartTitle)
            cartTitle.textContent =
                language === "ar"
                    ? "عربة التسوق"
                    : "Shopping Cart";


        if (cartTotalLabel)
            cartTotalLabel.textContent =
                t.total;

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


    if (orderTitle)
        orderTitle.textContent =
            t.orderTitle;


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


    if (labels.fullName)
        labels.fullName.textContent =
            t.fullName;

    if (labels.phone)
        labels.phone.textContent =
            t.phone;

    if (labels.governorate)
        labels.governorate.textContent =
            t.governorate;

    if (labels.address)
        labels.address.textContent =
            t.address;

    if (labels.notes)
        labels.notes.textContent =
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


    if (backBtn)
        backBtn.textContent =
            t.back;

    if (confirmOrderBtn)
        confirmOrderBtn.textContent =
            t.confirm;


    updateCart();


    if (
        orderModal &&
        orderModal.classList.contains("active")
    ) {

        updateOrderSummary();

    }

}


/* =========================
   LANGUAGE BUTTON
========================= */

if (languageBtn) {

    languageBtn.addEventListener(
        "click",
        function () {

            if (currentLanguage === "ar") {

                changeLanguage("en");

            } else {

                changeLanguage("ar");

            }

        }
    );

}


/* =========================
   ESCAPE KEY
========================= */

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


/* =========================
   FAQ
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const faqItems =
            document.querySelectorAll(
                ".faq-item"
            );


        faqItems.forEach(function (item) {

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

        });

    }
);


/* =========================
   QUALITY VIDEO
========================= */

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


/* =========================
   ABOUT SECTION
========================= */

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


/* =========================
   DASHBOARD
========================= */

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


/* =========================
   SHARED CART SYNC
========================= */

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key === "oliveOilCart"
        ) {

            loadSharedCart();

        }


        if (
            event.key === "siteLanguage"
        ) {

            currentLanguage =
                localStorage.getItem(
                    "siteLanguage"
                ) || "ar";

            changeLanguage(
                currentLanguage
            );

        }

    }
);


/* =========================
   INITIAL
========================= */

if (productPriceElement) {

    productPriceElement.textContent =
        productData.half.price + " ج.م";

}


sizeButtons.forEach(function (button) {

    button.classList.remove("active");

});


const firstSizeButton =
    document.querySelector(
        '.size-btn[data-size="half"]'
    );


if (firstSizeButton) {

    firstSizeButton.classList.add(
        "active"
    );

}


if (quantityValue) {

    quantityValue.textContent =
        quantity;

}


changeLanguage(
    currentLanguage
);

loadSharedCart();
