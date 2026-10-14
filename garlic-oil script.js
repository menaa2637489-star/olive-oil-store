"use strict";

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
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const languageBtn = document.getElementById("languageBtn");
const languageText = document.getElementById("languageText");

const addCartBtn = document.getElementById("addCartBtn");
const buyNowBtn = document.getElementById("buyNowBtn");

const orderModal = document.getElementById("orderModal");
const checkoutBtn =
    document.getElementById("checkoutBtn") ||
    document.querySelector(".checkout-btn");

const backBtn = document.getElementById("backBtn");
const confirmOrderBtn = document.getElementById("confirmOrderBtn");
const pageBackBtn = document.getElementById("pageBackBtn");

const mainProductImage = document.getElementById("mainProductImage");
const productPriceElement = document.getElementById("productPrice");
const productNameElement = document.getElementById("productName");
const productTypeElement = document.querySelector(".product-type");
const sizesTitle = document.querySelector(".sizes-title");
const priceLabel = document.querySelector(".product-price span");

const sizeButtons = document.querySelectorAll(".size-btn");
const plusOneBtn = document.getElementById("plusOneBtn");
const minusOneBtn = document.getElementById("minusOneBtn");
const quantityValue = document.getElementById("quantityValue");

const contactBtn = document.getElementById("contactBtn");

/* =========================
   LANGUAGE
========================= */

let currentLanguage =
    localStorage.getItem("siteLanguage") || "ar";

if (currentLanguage !== "ar" && currentLanguage !== "en") {
    currentLanguage = "ar";
}

/* =========================
   TRANSLATIONS
========================= */

const translations = {
    ar: {
        productName: "زيت الزيتون بالثوم",
        productType: "زيت الزيتون بالثوم",
        heroTitle: "زيت الزيتون بالثوم الأصلي",
        chooseSize: "اختاري الحجم",
        price: "السعر:",
        buyNow: "اشتر الآن",
        addCart: "أضف للسلة",

        size250ml: "250 مل",

        emptyCart: "السلة فارغة حاليًا",
        cancel: "إزالة",
        cancelAll: "إلغاء الكل",
        size: "الحجم:",
        itemPrice: "السعر:",
        quantity: "الكمية:",
        total: "الإجمالي",
        checkout: "إتمام الطلب",
        cartTitle: "عربة التسوق",

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

        dashboardPassword: "أدخلي كلمة مرور لوحة التحكم:",
        wrongPassword: "كلمة المرور غير صحيحة ❌",

        arabic: "العربية",
        english: "English"
    },

    en: {
        productName: "Garlic Infused Olive Oil",
        productType: "Garlic Infused Olive Oil",
        heroTitle: "Original Garlic Infused Olive Oil",
        chooseSize: "Choose Size",
        price: "Price:",
        buyNow: "Buy Now",
        addCart: "Add to Cart",

        size250ml: "250 ml",

        emptyCart: "Your cart is currently empty",
        cancel: "Remove",
        cancelAll: "Clear All",
        size: "Size:",
        itemPrice: "Price:",
        quantity: "Quantity:",
        total: "Total",
        checkout: "Checkout",
        cartTitle: "Shopping Cart",

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

        dashboardPassword: "Enter the dashboard password:",
        wrongPassword: "Incorrect password ❌",

        arabic: "العربية",
        english: "English"
    }
};

/* =========================
   PRODUCT DATA
========================= */

const productData = {
    half: {
        image: "توم زيت زيتون.jpg",
        nameAr: "زيت الزيتون بالثوم",
        nameEn: "Garlic Infused Olive Oil",
        sizeAr: "250 مل",
        sizeEn: "250 ml",
        price: 320
    }
};

/*
   يدعم اسم الحجم القديم 250ml
   واسم الحجم الموجود في HTML وهو half.
*/

function normalizeSize(size) {
    if (size === "250ml" || size === "half") {
        return "half";
    }

    return size;
}

let selectedSize = "half";
let quantity = 1;

/* =========================
   SHARED CART
========================= */

let cart = [];

try {
    const savedCart = localStorage.getItem("oliveOilCart");
    cart = savedCart ? JSON.parse(savedCart) || [] : [];

    if (!Array.isArray(cart)) {
        cart = [];
    }
} catch (error) {
    cart = [];
}

function saveCart() {
    localStorage.setItem("oliveOilCart", JSON.stringify(cart));
}

function loadSharedCart() {
    try {
        const savedCart = localStorage.getItem("oliveOilCart");
        cart = savedCart ? JSON.parse(savedCart) || [] : [];

        if (!Array.isArray(cart)) {
            cart = [];
        }
    } catch (error) {
        cart = [];
    }

    updateCart();
}

function getProductName() {
    const product = productData[selectedSize];

    if (!product) {
        return "";
    }

    return currentLanguage === "ar"
        ? product.nameAr
        : product.nameEn;
}

function getSizeName(size) {
    const normalizedSize = normalizeSize(size);
    const product = productData[normalizedSize];

    if (product) {
        return currentLanguage === "ar"
            ? product.sizeAr
            : product.sizeEn;
    }

    return size || "-";
}

function getCurrency() {
    return currentLanguage === "ar" ? "ج.م" : "EGP";
}

/* =========================
   CART COUNT
========================= */

function updateCartCount() {
    const totalQuantity = cart.reduce(function (total, item) {
        return total + Number(item.quantity || 1);
    }, 0);

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }
}

/* =========================
   PRODUCT SIZE
========================= */

sizeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const newSize = normalizeSize(button.getAttribute("data-size"));

        if (!productData[newSize]) {
            return;
        }

        selectedSize = newSize;

        sizeButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const product = productData[selectedSize];

        if (mainProductImage) {
            mainProductImage.classList.remove("product-in");
            mainProductImage.classList.add("product-out");

            window.setTimeout(function () {
                mainProductImage.src = product.image;
                mainProductImage.classList.remove("product-out");
                mainProductImage.classList.add("product-in");
            }, 200);
        }

        if (productPriceElement) {
            productPriceElement.textContent =
                product.price + " " + getCurrency();
        }
    });
});

/* =========================
   ADD GARLIC PRODUCT
   TO SHARED CART
========================= */

function addGarlicProductToSharedCart(amount = quantity) {
    const product = productData[selectedSize];

    if (!product) {
        return;
    }

    amount = Math.max(1, Number(amount) || 1);

    /*
       معالجة المنتج القديم إذا كان قد أضيف للسلة
       من صفحة أخرى دون حجم أو سعر.
    */

    const pendingItems = cart.filter(function (item) {
        return (
            item.productId === "garlic-oil" &&
            (!item.size || !Number(item.price))
        );
    });

    if (pendingItems.length > 0) {
        const pendingItem = pendingItems[0];

        pendingItem.productId = "garlic-oil";
        pendingItem.cartItemId = "garlic-oil-" + selectedSize;
        pendingItem.nameAr = product.nameAr;
        pendingItem.nameEn = product.nameEn;
        pendingItem.size = selectedSize;
        pendingItem.sizeAr = product.sizeAr;
        pendingItem.sizeEn = product.sizeEn;
        pendingItem.price = product.price;
        pendingItem.quantity = Number(pendingItem.quantity || 1) + amount;

        pendingItems.slice(1).forEach(function (item) {
            const index = cart.indexOf(item);

            if (index !== -1) {
                cart.splice(index, 1);
            }
        });
    } else {
        const existingItem = cart.find(function (item) {
            return (
                item.productId === "garlic-oil" &&
                normalizeSize(item.size) === selectedSize
            );
        });

        if (existingItem) {
            existingItem.quantity =
                Number(existingItem.quantity || 1) + amount;
        } else {
            cart.push({
                cartItemId: "garlic-oil-" + selectedSize,
                productId: "garlic-oil",
                nameAr: product.nameAr,
                nameEn: product.nameEn,
                size: selectedSize,
                sizeAr: product.sizeAr,
                sizeEn: product.sizeEn,
                price: product.price,
                quantity: amount
            });
        }
    }

    saveCart();
    updateCart();
}

/* =========================
   QUANTITY BUTTONS
========================= */

if (plusOneBtn) {
    plusOneBtn.addEventListener("click", function () {
        quantity++;
        if (quantityValue) {
            quantityValue.textContent = quantity;
        }
    });
}

if (minusOneBtn) {
    minusOneBtn.addEventListener("click", function () {
        if (quantity > 1) {
            quantity--;
        }

        if (quantityValue) {
            quantityValue.textContent = quantity;
        }
    });
}

function resetProductQuantity() {
    quantity = 1;

    if (quantityValue) {
        quantityValue.textContent = quantity;
    }
}

/* =========================
   ADD TO CART BUTTON
========================= */

if (addCartBtn) {
    addCartBtn.addEventListener("click", function () {
        addGarlicProductToSharedCart(quantity);
        resetProductQuantity();
        openCart();
    });
}

/* =========================
   UPDATE CART
========================= */

function updateCart() {
    updateCartCount();

    if (!cartItems || !cartTotal) {
        return;
    }

    const t = translations[currentLanguage];

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">${t.emptyCart}</p>
        `;

        cartTotal.textContent = "0 " + getCurrency();
        return;
    }

    let total = 0;
    let cartHTML = "";

    cart.forEach(function (item, index) {
        const itemQuantity = Number(item.quantity || 1);
        const itemPrice = Number(item.price || 0);
        const itemTotal = itemPrice * itemQuantity;

        total += itemTotal;

        const itemName = currentLanguage === "ar"
            ? (item.nameAr || t.productName)
            : (item.nameEn || t.productName);

        const itemSize = currentLanguage === "ar"
            ? (item.sizeAr || getSizeName(item.size))
            : (item.sizeEn || getSizeName(item.size));

        cartHTML += `
            <div class="cart-product">
                <p>${itemName}</p>

                <p>${t.size} ${itemSize || "-"}</p>

                <p>${t.itemPrice} ${itemPrice} ${getCurrency()}</p>

                <p>${t.quantity} ${itemQuantity}</p>

                <div class="cart-quantity-controls">
                    <button type="button"
                        onclick="decreaseCartItem(${index})"
                        aria-label="${currentLanguage === "ar" ? "تقليل الكمية" : "Decrease quantity"}">
                        −
                    </button>

                    <span>${itemQuantity}</span>

                    <button type="button"
                        onclick="increaseCartItem(${index})"
                        aria-label="${currentLanguage === "ar" ? "زيادة الكمية" : "Increase quantity"}">
                        +
                    </button>
                </div>

                <button type="button"
                    class="cancel-cart-btn"
                    onclick="removeFromCart(${index})">
                    ${t.cancel}
                </button>
            </div>
        `;
    });

    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = total + " " + getCurrency();

    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.className = "clear-cart-btn";
    clearButton.textContent = t.cancelAll;
    clearButton.addEventListener("click", clearCart);

    cartItems.appendChild(clearButton);
}

/* =========================
   CART QUANTITY CONTROLS
========================= */

function increaseCartItem(index) {
    if (!cart[index]) {
        return;
    }

    cart[index].quantity = Number(cart[index].quantity || 1) + 1;

    saveCart();
    updateCart();
}

function decreaseCartItem(index) {
    if (!cart[index]) {
        return;
    }

    const itemQuantity = Number(cart[index].quantity || 1);

    if (itemQuantity > 1) {
        cart[index].quantity = itemQuantity - 1;
    } else {
        cart.splice(index, 1);
    }

    saveCart();
    updateCart();
}

function removeFromCart(index) {
    if (!cart[index]) {
        return;
    }

    cart.splice(index, 1);

    saveCart();
    updateCart();
}

function clearCart() {
    cart = [];

    saveCart();
    updateCart();
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
    cartBtn.addEventListener("click", openCart);
}

if (closeCart) {
    closeCart.addEventListener("click", closeCartPanel);
}

if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCartPanel);
}

/* =========================
   ORDER MODAL
========================= */

function openOrderModal() {
    loadSharedCart();

    if (cart.length === 0) {
        alert(translations[currentLanguage].emptyAlert);
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
    checkoutBtn.addEventListener("click", function () {
        loadSharedCart();

        if (cart.length === 0) {
            alert(translations[currentLanguage].emptyAlert);
            return;
        }

        closeCartPanel();
        openOrderModal();
    });
}

/* =========================
   BACK BUTTON IN ORDER
========================= */

if (backBtn) {
    backBtn.addEventListener("click", function () {
        closeOrderModal();
        openCart();
    });
}

/* =========================
   BUY NOW
========================= */

if (buyNowBtn) {
    buyNowBtn.addEventListener("click", function () {
        addGarlicProductToSharedCart(quantity);
        resetProductQuantity();
        closeCartPanel();
        openOrderModal();
    });
}

/* =========================
   ORDER SUMMARY
========================= */

function updateOrderSummary() {
    const orderSummary = document.querySelector(".order-summary");

    if (!orderSummary) {
        return;
    }

    const t = translations[currentLanguage];
    let summaryHTML = "";
    let total = 0;

    cart.forEach(function (item) {
        const itemQuantity = Number(item.quantity || 1);
        const itemTotal = Number(item.price || 0) * itemQuantity;

        total += itemTotal;

        const itemName = currentLanguage === "ar"
            ? (item.nameAr || t.productName)
            : (item.nameEn || t.productName);

        const itemSize = currentLanguage === "ar"
            ? (item.sizeAr || getSizeName(item.size))
            : (item.sizeEn || getSizeName(item.size));

        summaryHTML += `
            <div class="order-item">
                <span>${itemName} - ${itemSize} × ${itemQuantity}</span>
                <span>${itemTotal} ${getCurrency()}</span>
            </div>
        `;
    });

    summaryHTML += `
        <div class="order-total">
            <strong>${t.total}</strong>
            <strong>${total} ${getCurrency()}</strong>
        </div>
    `;

    orderSummary.innerHTML = summaryHTML;
}

/* =========================
   CONFIRM ORDER
========================= */

if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener("click", function () {
        const fullName = document.getElementById("fullName")?.value.trim();
        const phone = document.getElementById("phone")?.value.trim();
        const governorate = document.getElementById("governorate")?.value;
        const address = document.getElementById("address")?.value.trim();
        const notes = document.getElementById("notes")?.value.trim();

        const paymentMethod =
            document.querySelector('input[name="payment"]:checked')?.value ||
            "cash";

        if (!fullName || !phone || !governorate || !address) {
            alert(translations[currentLanguage].incompleteAlert);
            return;
        }

        if (cart.length === 0) {
            alert(translations[currentLanguage].emptyAlert);
            return;
        }

        let total = 0;

        cart.forEach(function (item) {
            total +=
                Number(item.price || 0) *
                Number(item.quantity || 1);
        });

        const newOrder = {
            id: "ORD-" + Date.now(),
            name: fullName,
            phone: phone,
            governorate: governorate,
            address: address,
            notes: notes,
            paymentMethod: paymentMethod,
            total: total,
            status: paymentMethod === "cash" ? "جديد" : "بانتظار الدفع",
            items: cart.map(function (item) {
                return {
                    productId: item.productId,
                    nameAr: item.nameAr,
                    nameEn: item.nameEn,
                    size: item.size,
                    sizeAr: item.sizeAr,
                    sizeEn: item.sizeEn,
                    price: item.price,
                    quantity: item.quantity
                };
            }),
            date: new Date().toLocaleString(
                currentLanguage === "ar" ? "ar-EG" : "en-GB"
            )
        };

        let orders = [];

        try {
            orders = JSON.parse(
                localStorage.getItem("oliveOilOrders")
            ) || [];

            if (!Array.isArray(orders)) {
                orders = [];
            }
        } catch (error) {
            orders = [];
        }

        orders.push(newOrder);

        localStorage.setItem(
            "oliveOilOrders",
            JSON.stringify(orders)
        );

        alert(translations[currentLanguage].successAlert);

        cart = [];
        saveCart();
        updateCart();
        closeOrderModal();
        closeCartPanel();

        [
            "fullName",
            "phone",
            "governorate",
            "address",
            "notes"
        ].forEach(function (id) {
            const field = document.getElementById(id);

            if (field) {
                field.value = "";
            }
        });
    });
}

/* =========================
   CONTACT BUTTON
========================= */

if (contactBtn) {
    contactBtn.addEventListener("click", function (event) {
        const link = contactBtn.getAttribute("href");

        if (link && link !== "#") {
            return;
        }

        event.preventDefault();

        window.open(
            "https://www.facebook.com/share/1ckPpM1Tov/",
            "_blank",
            "noopener,noreferrer"
        );
    });
}

/* =========================
   LOGIN
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
    loginBtn.addEventListener("click", openLogin);
}

if (closeLogin) {
    closeLogin.addEventListener("click", closeLoginPanel);
}

if (loginOverlay) {
    loginOverlay.addEventListener("click", closeLoginPanel);
}

/* =========================
   PAGE BACK BUTTON
========================= */

if (pageBackBtn) {
    pageBackBtn.addEventListener("click", function () {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    });
}

/* =========================
   LANGUAGE HELPERS
========================= */

function setText(selector, text) {
    const element = document.querySelector(selector);

    if (element) {
        element.textContent = text;
    }
}

function changeLanguage(language) {
    if (language !== "ar" && language !== "en") {
        language = "ar";
    }

    currentLanguage = language;

    localStorage.setItem("siteLanguage", language);

    const t = translations[language];

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    if (languageText) {
        languageText.textContent =
            language === "ar" ? "English" : "العربية";
    }

    /*
       تغيير كل العناصر التي تحتوي على data-ar و data-en.
    */

    document.querySelectorAll("[data-ar][data-en]").forEach(function (element) {
        element.textContent = element.getAttribute(
            language === "ar" ? "data-ar" : "data-en"
        );
    });

    /*
       عنوان الصفحة وبيانات المنتج.
    */

    const heroTitle = document.querySelector(
        ".hero-content h1, .hero h1, .hero-title"
    );

    if (heroTitle && !heroTitle.hasAttribute("data-ar")) {
        heroTitle.textContent = t.heroTitle;
    }

    if (productNameElement) {
        productNameElement.textContent = t.productName;
    }

    if (productTypeElement) {
        productTypeElement.textContent = t.productType;
    }

    if (sizesTitle) {
        sizesTitle.textContent = t.chooseSize;
    }

    if (priceLabel) {
        priceLabel.textContent = t.price;
    }

    sizeButtons.forEach(function (button) {
        const size = normalizeSize(button.getAttribute("data-size"));

        if (productData[size]) {
            button.textContent = getSizeName(size);
        }
    });

    const product = productData[selectedSize];

    if (productPriceElement && product) {
        productPriceElement.textContent =
            product.price + " " + getCurrency();
    }

    if (addCartBtn) {
        addCartBtn.textContent = t.addCart;
    }

    if (buyNowBtn) {
        buyNowBtn.textContent = t.buyNow;
    }

    /*
       ترجمة لوحة تسجيل الدخول إن كانت موجودة في الصفحة.
    */

    if (loginPanel) {
        setTextWithin(loginPanel, "h2", t.login);
        setTextWithin(loginPanel, ".panel-subtitle", t.loginSubtitle);
        setTextWithin(loginPanel, ".login-options span", t.remember);
        setTextWithin(loginPanel, ".login-options a", t.forgot);
        setTextWithin(loginPanel, ".login-submit", t.login);
        setTextWithin(loginPanel, ".or-line span", t.or);
        setTextWithin(loginPanel, ".google-login span:last-child", t.google);
        setTextWithin(loginPanel, ".facebook-login span:last-child", t.facebook);

        const loginInputs = loginPanel.querySelectorAll(".login-input");

        if (loginInputs[0]) {
            loginInputs[0].placeholder = t.emailPhone;
        }

        if (loginInputs[1]) {
            loginInputs[1].placeholder = t.password;
        }
    }

    /*
       ترجمة السلة.
    */

    if (cartPanel) {
        setTextWithin(cartPanel, "h2", t.cartTitle);
        setTextWithin(cartPanel, ".cart-total span", t.total);
    }

    if (checkoutBtn) {
        checkoutBtn.textContent = t.checkout;
    }

    /*
       ترجمة نموذج الطلب.
    */

    setText(".order-header h2", t.orderTitle);

    const labelTranslations = {
        fullName: t.fullName,
        phone: t.phone,
        governorate: t.governorate,
        address: t.address,
        notes: t.notes
    };

    Object.keys(labelTranslations).forEach(function (id) {
        const label = document.querySelector('label[for="' + id + '"]');

        if (label) {
            label.textContent = labelTranslations[id];
        }
    });

    const fullNameInput = document.getElementById("fullName");
    const phoneInput = document.getElementById("phone");
    const addressInput = document.getElementById("address");
    const notesInput = document.getElementById("notes");

    if (fullNameInput) {
        fullNameInput.placeholder = t.fullNamePlaceholder;
    }

    if (phoneInput) {
        phoneInput.placeholder = t.phonePlaceholder;
    }

    if (addressInput) {
        addressInput.placeholder = t.addressPlaceholder;
    }

    if (notesInput) {
        notesInput.placeholder = t.notesPlaceholder;
    }

    /*
       ترجمة خيارات المحافظات إذا كانت بياناتها موجودة.
       أضيفي data-ar و data-en لكل option عند الحاجة.
    */

    const governorateSelect = document.getElementById("governorate");

    if (governorateSelect) {
        Array.from(governorateSelect.options).forEach(function (option) {
            if (option.hasAttribute("data-ar") &&
                option.hasAttribute("data-en")) {
                option.textContent = option.getAttribute(
                    language === "ar" ? "data-ar" : "data-en"
                );
            } else if (option.value === "") {
                option.textContent = t.chooseGovernorate;
            }
        });
    }

    setText(".payment-section h3", t.payment);

    const paymentOptions = document.querySelectorAll(".payment-option span");

    if (paymentOptions[0]) {
        paymentOptions[0].textContent = t.cash;
    }

    if (paymentOptions[1]) {
        paymentOptions[1].textContent = t.card;
    }

    if (paymentOptions[2]) {
        paymentOptions[2].textContent = t.wallet;
    }

    if (backBtn) {
        backBtn.textContent = t.back;
    }

    if (confirmOrderBtn) {
        confirmOrderBtn.textContent = t.confirm;
    }

    /*
       تحديث محتوى السلة وملخص الطلب بعد تغيير اللغة.
    */

    updateCart();

    if (orderModal && orderModal.classList.contains("active")) {
        updateOrderSummary();
    }
}

function setTextWithin(parent, selector, text) {
    const element = parent.querySelector(selector);

    if (element) {
        element.textContent = text;
    }
}

/* =========================
   LANGUAGE BUTTON
========================= */

if (languageBtn) {
    languageBtn.addEventListener("click", function () {
        changeLanguage(currentLanguage === "ar" ? "en" : "ar");
    });
}

/* =========================
   FAQ
========================= */

document.querySelectorAll(".faq-item").forEach(function (item) {
    const question = item.querySelector(".faq-question");

    if (!question) {
        return;
    }

    question.setAttribute("aria-expanded", "false");

    question.addEventListener("click", function () {
        const isOpen = item.classList.toggle("active");

        question.setAttribute("aria-expanded", String(isOpen));
    });
});

/* =========================
   QUALITY VIDEO
========================= */

function initializeQualityVideo() {
    const qualityVideo = document.getElementById("qualityVideo");

    if (!qualityVideo) {
        return;
    }

    qualityVideo.muted = true;
    qualityVideo.autoplay = true;
    qualityVideo.loop = true;
    qualityVideo.playsInline = true;

    const playPromise = qualityVideo.play();

    if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
            // بعض المتصفحات تمنع التشغيل التلقائي؛ لا نوقف الصفحة.
        });
    }
}

/* =========================
   ABOUT SECTION
========================= */

function openAboutSection() {
    const aboutSection = document.querySelector(".about-section");

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
    const t = translations[currentLanguage];
    const password = prompt(t.dashboardPassword);

    if (password === null) {
        return;
    }

    if (password === "2026") {
        window.location.href = "dashboard.html";
    } else {
        alert(t.wrongPassword);
    }
}

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
   SHARED CART & LANGUAGE SYNC
========================= */

window.addEventListener("storage", function (event) {
    if (event.key === "oliveOilCart") {
        loadSharedCart();
    }

    if (event.key === "siteLanguage") {
        const savedLanguage =
            localStorage.getItem("siteLanguage") || "ar";

        changeLanguage(savedLanguage);
    }
});

/* =========================
   INITIALIZE PAGE
========================= */

function initializePage() {
    if (productPriceElement && productData[selectedSize]) {
        productPriceElement.textContent =
            productData[selectedSize].price + " " + getCurrency();
    }

    sizeButtons.forEach(function (button) {
        button.classList.toggle(
            "active",
            normalizeSize(button.getAttribute("data-size")) === selectedSize
        );
    });

    if (quantityValue) {
        quantityValue.textContent = quantity;
    }

    changeLanguage(currentLanguage);
    loadSharedCart();
    initializeQualityVideo();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePage);
} else {
    initializePage();
}
