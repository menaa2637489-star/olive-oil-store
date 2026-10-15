"use strict";

/* =========================
   ELEMENTS
========================= */

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

const pageBackBtn = document.getElementById("pageBackBtn");
const mainProductImage = document.getElementById("mainProductImage");
const productPriceElement = document.getElementById("productPrice");
const sizeButtons = document.querySelectorAll(".size-btn");

const PRODUCT_ID = "frying-oil";
const CART_KEY = "oliveOilCart";
const ORDERS_KEY = "oliveOilOrders";
const LANGUAGE_KEY = "siteLanguage";

/* =========================
   LANGUAGE
========================= */

let currentLanguage =
    localStorage.getItem(LANGUAGE_KEY) || "ar";

if (!["ar", "en"].includes(currentLanguage)) {
    currentLanguage = "ar";
}

/* =========================
   TRANSLATIONS
========================= */

const translations = {
    ar: {
        productName: "زيت زيتون للقلي",
        productType: "زيت زيتون للقلي - منقى من الألياف",
        chooseSize: "اختاري الحجم",
        price: "السعر:",
        buyNow: "اشتر الآن",
        addCart: "أضف للسلة",

        half: "نصف لتر",
        one: "1 لتر",
        two: "2 لتر",

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

        arabic: "العربية",
        english: "English"
    },

    en: {
        productName: "Olive Oil for Frying",
        productType: "Olive Oil for Frying - Fiber Filtered",
        chooseSize: "Choose Size",
        price: "Price:",
        buyNow: "Buy Now",
        addCart: "Add to Cart",

        half: "Half Liter",
        one: "1 Liter",
        two: "2 Liters",

        emptyCart: "Your cart is currently empty",
        cancel: "Remove",
        cancelAll: "Remove All",
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

        arabic: "العربية",
        english: "English"
    }
};

/* =========================
   PRODUCT DATA
========================= */

const productData = {
    half: {
        image: "زيت للقلي 500 مل.jpg",
        nameAr: "زيت زيتون للقلي - منقى من الألياف",
        nameEn: "Olive Oil for Frying - Fiber Filtered",
        price: 250
    },

    one: {
        image: "1 لتر قلي.jpg",
        nameAr: "زيت زيتون للقلي - منقى من الألياف",
        nameEn: "Olive Oil for Frying - Fiber Filtered",
        price: 350
    },

    two: {
        image: "زيت للقلي 2 لتر.jpg",
        nameAr: "زيت زيتون للقلي - منقى من الألياف",
        nameEn: "Olive Oil for Frying - Fiber Filtered",
        price: 700
    }
};

let selectedSize = "half";
let quantity = 1;
let cart = getCart();

/* =========================
   SHARED CART
========================= */

function getCart() {
    try {
        const savedCart = localStorage.getItem(CART_KEY);
        const parsedCart = savedCart ? JSON.parse(savedCart) : [];

        return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
        console.error("Cart loading error:", error);
        return [];
    }
}

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function money(amount) {
    return `${Number(amount) || 0} ${currentLanguage === "ar" ? "ج.م" : "EGP"}`;
}

function getSizeName(size) {
    const t = translations[currentLanguage];
    return t[size] || size;
}

function getProductName(item) {
    if (item.productId === PRODUCT_ID) {
        return currentLanguage === "ar"
            ? (item.nameAr || "زيت زيتون للقلي - منقى من الألياف")
            : (item.nameEn || "Olive Oil for Frying - Fiber Filtered");
    }

    if (item.nameAr && item.nameEn) {
        return currentLanguage === "ar" ? item.nameAr : item.nameEn;
    }

    return item.name || "";
}

function getSelectedProductQuantity() {
    return cart.filter(item =>
        item.productId === PRODUCT_ID &&
        item.size === selectedSize
    ).length;
}

/* =========================
   PRODUCT DISPLAY
========================= */

function updateProductDisplay() {
    const product = productData[selectedSize];
    if (!product) return;

    if (mainProductImage) {
        mainProductImage.src = product.image;
        mainProductImage.alt = currentLanguage === "ar"
            ? product.nameAr
            : product.nameEn;
    }

    if (productPriceElement) {
        productPriceElement.textContent = money(product.price);
    }

    sizeButtons.forEach(button => {
        const isActive = button.dataset.size === selectedSize;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    updateQuantityDisplay();
}

function selectSize(button) {
    const newSize = button.dataset.size;

    if (!productData[newSize]) return;

    selectedSize = newSize;

    if (mainProductImage) {
        mainProductImage.classList.remove("product-in");
        mainProductImage.classList.add("product-out");
    }

    window.setTimeout(() => {
        updateProductDisplay();

        if (mainProductImage) {
            mainProductImage.classList.remove("product-out");
            mainProductImage.classList.add("product-in");
        }
    }, 200);
}

sizeButtons.forEach(button => {
    button.addEventListener("click", () => selectSize(button));
});

/* =========================
   QUANTITY
========================= */

function updateQuantityDisplay() {
    const cartQuantity = getSelectedProductQuantity();
    quantity = cartQuantity > 0 ? cartQuantity : 1;

    if (quantityValue) {
        quantityValue.textContent = quantity;
    }
}

function addOneToCart() {
    const product = productData[selectedSize];
    if (!product) return;

    cart.push({
        id: `${PRODUCT_ID}-${selectedSize}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        productId: PRODUCT_ID,
        size: selectedSize,
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        price: product.price
    });

    saveCart();
    updateCart();
    updateQuantityDisplay();
}

function removeOneFromCart() {
    const index = cart.findLastIndex(item =>
        item.productId === PRODUCT_ID &&
        item.size === selectedSize
    );

    if (index === -1) {
        updateQuantityDisplay();
        return;
    }

    cart.splice(index, 1);
    saveCart();
    updateCart();
    updateQuantityDisplay();
}

if (plusOneBtn) {
    plusOneBtn.addEventListener("click", () => {
        addOneToCart();
        openCart();
    });
}

if (minusOneBtn) {
    minusOneBtn.addEventListener("click", removeOneFromCart);
}

/* =========================
   ADD SELECTED PRODUCT
========================= */

function addSelectedProductToCart() {
    const existingQuantity = getSelectedProductQuantity();
    const wantedQuantity = Math.max(1, quantity);
    const difference = wantedQuantity - existingQuantity;

    for (let i = 0; i < difference; i++) {
        const product = productData[selectedSize];

        cart.push({
            id: `${PRODUCT_ID}-${selectedSize}-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
            productId: PRODUCT_ID,
            size: selectedSize,
            nameAr: product.nameAr,
            nameEn: product.nameEn,
            price: product.price
        });
    }

    saveCart();
    updateCart();
    updateQuantityDisplay();
}

if (addCartBtn) {
    addCartBtn.addEventListener("click", () => {
        addOneToCart();
        openCart();
    });
}

/* =========================
   CART PANEL
========================= */

function openCart() {
    if (cartPanel) cartPanel.classList.add("active");
    if (cartOverlay) cartOverlay.classList.add("active");

    updateCart();
}

function closeCartPanel() {
    if (cartPanel) cartPanel.classList.remove("active");
    if (cartOverlay) cartOverlay.classList.remove("active");
}

if (cartBtn) cartBtn.addEventListener("click", openCart);
if (closeCart) closeCart.addEventListener("click", closeCartPanel);
if (cartOverlay) cartOverlay.addEventListener("click", closeCartPanel);

/* =========================
   UPDATE CART
========================= */

function updateCart() {
    cart = getCart();

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    if (!cartItems || !cartTotal) return;

    const t = translations[currentLanguage];

    if (cart.length === 0) {
        cartItems.innerHTML = "";

        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-cart";
        emptyMessage.textContent = t.emptyCart;
        cartItems.appendChild(emptyMessage);

        cartTotal.textContent = money(0);
        return;
    }

    let total = 0;
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const price = Number(item.price) || 0;
        total += price;

        const card = document.createElement("div");
        card.className = "cart-product";

        const name = document.createElement("p");
        name.textContent = getProductName(item);

        const size = document.createElement("p");
        size.textContent = `${t.size} ${getSizeName(item.size)}`;

        const itemPrice = document.createElement("p");
        itemPrice.textContent = `${t.itemPrice} ${money(price)}`;

        const removeButton = document.createElement("button");
        removeButton.className = "cancel-cart-btn";
        removeButton.type = "button";
        removeButton.textContent = t.cancel;
        removeButton.addEventListener("click", () => removeFromCart(index));

        card.append(name, size, itemPrice, removeButton);
        cartItems.appendChild(card);
    });

    cartTotal.textContent = money(total);

    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.className = "clear-cart-btn";
    clearButton.textContent = t.cancelAll;
    clearButton.addEventListener("click", clearCart);

    cartItems.appendChild(clearButton);
}

function removeFromCart(index) {
    if (index < 0 || index >= cart.length) return;

    cart.splice(index, 1);
    saveCart();
    updateCart();
    updateQuantityDisplay();
}

function clearCart() {
    cart = [];
    saveCart();
    updateCart();
    updateQuantityDisplay();
}

/* =========================
   ORDER MODAL
========================= */

function openOrderModal() {
    cart = getCart();

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

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        cart = getCart();

        if (cart.length === 0) {
            alert(translations[currentLanguage].emptyAlert);
            return;
        }

        closeCartPanel();
        openOrderModal();
    });
}

if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
        addOneToCart();
        closeCartPanel();
        openOrderModal();
    });
}

if (backBtn) {
    backBtn.addEventListener("click", () => {
        closeOrderModal();

        if (cart.length > 0) {
            openCart();
        }
    });
}

/* =========================
   ORDER SUMMARY
========================= */

function updateOrderSummary() {
    const orderSummary = document.querySelector(".order-summary");
    if (!orderSummary) return;

    cart = getCart();

    const t = translations[currentLanguage];
    let total = 0;

    orderSummary.innerHTML = "";

    cart.forEach(item => {
        const price = Number(item.price) || 0;
        total += price;

        const row = document.createElement("div");
        row.className = "order-item";

        const description = document.createElement("span");
        description.textContent =
            `${getProductName(item)} - ${getSizeName(item.size)} × 1`;

        const amount = document.createElement("span");
        amount.textContent = money(price);

        row.append(description, amount);
        orderSummary.appendChild(row);
    });

    const totalRow = document.createElement("div");
    totalRow.className = "order-total";

    const totalLabel = document.createElement("strong");
    totalLabel.textContent = t.total;

    const totalAmount = document.createElement("strong");
    totalAmount.textContent = money(total);

    totalRow.append(totalLabel, totalAmount);
    orderSummary.appendChild(totalRow);
}

/* =========================
   CONFIRM ORDER
========================= */

if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener("click", () => {
        const fullName = document.getElementById("fullName")?.value.trim() || "";
        const phone = document.getElementById("phone")?.value.trim() || "";
        const governorate = document.getElementById("governorate")?.value || "";
        const address = document.getElementById("address")?.value.trim() || "";
        const notes = document.getElementById("notes")?.value.trim() || "";

        const paymentMethod =
            document.querySelector('input[name="payment"]:checked')?.value || "cash";

        const t = translations[currentLanguage];

        if (!fullName || !phone || !governorate || !address) {
            alert(t.incompleteAlert);
            return;
        }

        cart = getCart();

        if (cart.length === 0) {
            alert(t.emptyAlert);
            closeOrderModal();
            return;
        }

        const total = cart.reduce(
            (sum, item) => sum + (Number(item.price) || 0),
            0
        );

        const newOrder = {
            id: `ORD-${Date.now()}`,
            name: fullName,
            phone,
            governorate,
            address,
            notes,
            paymentMethod,
            total,
            status: paymentMethod === "cash" ? "جديد" : "بانتظار الدفع",
            items: cart.map(item => ({ ...item })),
            date: new Date().toLocaleString("ar-EG")
        };

        let orders = [];

        try {
            orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
            if (!Array.isArray(orders)) orders = [];
        } catch (error) {
            orders = [];
        }

        orders.push(newOrder);

        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

        alert(t.successAlert);

        cart = [];
        saveCart();
        updateCart();
        updateQuantityDisplay();
        closeOrderModal();

        ["fullName", "phone", "governorate", "address", "notes"].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = "";
        });
    });
}

/* =========================
   PAGE BACK BUTTON
========================= */

if (pageBackBtn) {
    pageBackBtn.addEventListener("click", () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    });
}

/* =========================
   APPLY LANGUAGE
========================= */

function changeLanguage(language) {
    if (!translations[language]) return;

    currentLanguage = language;
    localStorage.setItem(LANGUAGE_KEY, language);

    const t = translations[language];

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    if (languageText) {
        languageText.textContent = language === "ar" ? "English" : "العربية";
    }

    document.querySelectorAll("[data-ar][data-en]").forEach(element => {
        element.textContent = element.getAttribute(
            language === "ar" ? "data-ar" : "data-en"
        );
    });

    const productName = document.getElementById("productName");
    const productType = document.querySelector(".product-type");
    const sizesTitle = document.querySelector(".sizes-title");
    const priceLabel = document.querySelector(".product-price span");

    if (productName) productName.textContent = t.productName;
    if (productType) productType.textContent = t.productType;
    if (sizesTitle) sizesTitle.textContent = t.chooseSize;
    if (priceLabel) priceLabel.textContent = t.price;

    sizeButtons.forEach(button => {
        const size = button.dataset.size;
        button.textContent = getSizeName(size);
    });

    if (addCartBtn) addCartBtn.textContent = t.addCart;
    if (buyNowBtn) buyNowBtn.textContent = t.buyNow;

    const cartTitle = cartPanel?.querySelector("h2");
    const cartTotalLabel = cartPanel?.querySelector(".cart-total span");

    if (cartTitle) {
        cartTitle.textContent = language === "ar" ? "عربة التسوق" : "Shopping Cart";
    }

    if (cartTotalLabel) cartTotalLabel.textContent = t.total;
    if (checkoutBtn) checkoutBtn.textContent = t.checkout;

    const orderTitle = document.querySelector(".order-header h2");
    if (orderTitle) orderTitle.textContent = t.orderTitle;

    const labelMap = {
        fullName: t.fullName,
        phone: t.phone,
        governorate: t.governorate,
        address: t.address,
        notes: t.notes
    };

    Object.entries(labelMap).forEach(([id, text]) => {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label) label.textContent = text;
    });

    const placeholderMap = {
        fullName: t.fullNamePlaceholder,
        phone: t.phonePlaceholder,
        address: t.addressPlaceholder,
        notes: t.notesPlaceholder
    };

    Object.entries(placeholderMap).forEach(([id, text]) => {
        const input = document.getElementById(id);
        if (input) input.placeholder = text;
    });

    const governorate = document.getElementById("governorate");
    if (governorate?.options[0]) {
        governorate.options[0].text = t.chooseGovernorate;
    }

    const paymentTitle = document.querySelector(".payment-section h3");
    if (paymentTitle) paymentTitle.textContent = t.payment;

    const paymentOptions = document.querySelectorAll(".payment-option span");

    if (paymentOptions[0]) paymentOptions[0].textContent = t.cash;
    if (paymentOptions[1]) paymentOptions[1].textContent = t.card;
    if (paymentOptions[2]) paymentOptions[2].textContent = t.wallet;

    if (backBtn) backBtn.textContent = t.back;
    if (confirmOrderBtn) confirmOrderBtn.textContent = t.confirm;

    updateProductDisplay();
    updateCart();

    if (orderModal?.classList.contains("active")) {
        updateOrderSummary();
    }
}

if (languageBtn) {
    languageBtn.addEventListener("click", () => {
        changeLanguage(currentLanguage === "ar" ? "en" : "ar");
    });
}

/* =========================
   FAQ ACCORDION
========================= */

document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
        const item = question.closest(".faq-item");
        if (!item) return;

        item.classList.toggle("active");

        question.setAttribute(
            "aria-expanded",
            String(item.classList.contains("active"))
        );
    });
});

/* =========================
   QUALITY VIDEO
========================= */

const qualityVideo = document.getElementById("qualityVideo");

if (qualityVideo) {
    qualityVideo.muted = true;
    qualityVideo.autoplay = true;
    qualityVideo.loop = true;
    qualityVideo.playsInline = true;

    qualityVideo.play().catch(() => {});
}

/* =========================
   CONTACT - ABOUT BUTTON
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
   DASHBOARD ACCESS
========================= */

function openDashboardLogin() {
    const password = prompt("أدخلي كلمة مرور لوحة التحكم:");

    if (password === null) return;

    if (password === "2026") {
        window.location.href = "dashboard.html";
    } else {
        alert("كلمة المرور غير صحيحة ❌");
    }
}

/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCartPanel();
        closeOrderModal();
    }
});

/* =========================
   INITIALIZE
========================= */

updateProductDisplay();
updateCart();
updateQuantityDisplay();
changeLanguage(currentLanguage);

/* =========================
   SYNC SHARED CART / LANGUAGE
========================= */

window.addEventListener("storage", event => {
    if (event.key === CART_KEY) {
        cart = getCart();
        updateCart();
        updateQuantityDisplay();
    }

    if (event.key === LANGUAGE_KEY && event.newValue) {
        changeLanguage(event.newValue);
    }
});
