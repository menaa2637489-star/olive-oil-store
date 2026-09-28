/* =========================================================
   ONION OIL - SHARED CART JAVASCRIPT
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
========================================================= */

const CART_KEY = "oliveOilCart";

let cart = [];


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


function saveCart() {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/* =========================================================
   PRODUCT ID
========================================================= */

const PRODUCT_ID = "onion-oil";


/* =========================================================
   PRODUCT DATA
========================================================= */

const productData = {

    half: {
        price: 320,
        image: "250ml.jpeg",
        sizeAr: "½ لتر",
        sizeEn: "½ Liter"
    },

    one: {
        price: 580,
        image: "1liter.jpeg",
        sizeAr: "1 لتر",
        sizeEn: "1 Liter"
    },

    two: {
        price: 1080,
        image: "1liter.jpeg",
        sizeAr: "2 لتر",
        sizeEn: "2 Liters"
    },

    five: {
        price: 2600,
        image: "5liter.jpeg",
        sizeAr: "5 لتر",
        sizeEn: "5 Liters"
    }

};


/* =========================================================
   PRODUCT ELEMENTS
========================================================= */

const mainProductImage =
    document.getElementById("mainProductImage");

const productName =
    document.getElementById("productName");

const productType =
    document.querySelector(".product-type");

const sizesTitle =
    document.querySelector(".sizes-title");

const sizeButtons =
    document.querySelectorAll(".size-btn");

const productPrice =
    document.getElementById("productPrice");

const quantityValue =
    document.getElementById("quantityValue");

const minusOneBtn =
    document.getElementById("minusOneBtn");

const plusOneBtn =
    document.getElementById("plusOneBtn");

const addCartBtn =
    document.getElementById("addCartBtn");

const buyNowBtn =
    document.getElementById("buyNowBtn");


/* =========================================================
   SELECTED SIZE + QUANTITY
========================================================= */

let selectedSize = "half";

let quantity = 1;


/* =========================================================
   SIZE NAME
========================================================= */

function getSizeName(size) {

    if (!productData[size]) {
        return "";
    }

    return currentLanguage === "ar"
        ? productData[size].sizeAr
        : productData[size].sizeEn;

}


/* =========================================================
   UPDATE PRODUCT
========================================================= */

function updateProduct() {

    const data =
        productData[selectedSize];

    if (!data) {
        return;
    }


    if (productPrice) {

        productPrice.textContent =
            `${data.price} ${
                currentLanguage === "ar"
                    ? "جنيه"
                    : "EGP"
            }`;

    }


    if (mainProductImage) {

        mainProductImage.src =
            data.image;

    }


    if (quantityValue) {

        quantityValue.textContent =
            quantity;

    }

}


/* =========================================================
   SIZE BUTTONS
========================================================= */

sizeButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            sizeButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            this.classList.add("active");


            selectedSize =
                this.dataset.size;


            if (!productData[selectedSize]) {
                return;
            }


            quantity = 1;


            updateProduct();

        }
    );

});


/* =========================================================
   QUANTITY - MINUS
========================================================= */

if (minusOneBtn) {

    minusOneBtn.addEventListener(
        "click",
        function () {

            if (quantity > 1) {

                quantity--;

            }


            updateProduct();

        }
    );

}


/* =========================================================
   ADD PRODUCT TO SHARED CART
========================================================= */

function addSelectedProductToCart(amount) {

    const productInfo =
        productData[selectedSize];


    if (!productInfo) {
        return;
    }


    amount =
        Number(amount) || 1;


    if (amount < 1) {
        return;
    }


    loadCart();


    const existingItem =
        cart.find(item =>

            item.productId === PRODUCT_ID &&
            item.size === selectedSize

        );


    if (existingItem) {

        existingItem.quantity =
            (Number(existingItem.quantity) || 0) +
            amount;


        /*
           تحديث البيانات لو اللغة اتغيرت
        */

        existingItem.name =
            currentLanguage === "ar"
                ? existingItem.nameAr
                : existingItem.nameEn;


        existingItem.sizeName =
            getSizeName(selectedSize);


        existingItem.price =
            productInfo.price;


        existingItem.image =
            productInfo.image;

    } else {

        cart.push({

            productId:
                PRODUCT_ID,

            nameAr:
                "زيت الزيتون بالبصل",

            nameEn:
                "Olive Oil with Onion",

            name:
                currentLanguage === "ar"
                    ? "زيت الزيتون بالبصل"
                    : "Olive Oil with Onion",

            size:
                selectedSize,

            sizeName:
                getSizeName(selectedSize),

            price:
                productInfo.price,

            image:
                productInfo.image,

            quantity:
                amount

        });

    }


    saveCart();

    updateCart();

}


/* =========================================================
   PLUS BUTTON
   يضيف قطعة واحدة للسلة
========================================================= */

if (plusOneBtn) {

    plusOneBtn.addEventListener(
        "click",
        function () {

            addSelectedProductToCart(1);


            quantity = 1;


            updateProduct();

        }
    );

}


/* =========================================================
   CART ELEMENTS
========================================================= */

const cartBtn =
    document.getElementById("cartBtn");

const cartCount =
    document.getElementById("cartCount");

const cartPanel =
    document.getElementById("cartPanel");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutBtn =
    document.getElementById("checkoutBtn");


/* =========================================================
   UPDATE CART
========================================================= */

function updateCart() {

    loadCart();


    let totalItems = 0;

    let totalPrice = 0;


    if (cartItems) {

        cartItems.innerHTML = "";

    }


    cart.forEach((item, index) => {

        const itemQuantity =
            Number(item.quantity) || 1;

        const itemPrice =
            Number(item.price) || 0;


        totalItems +=
            itemQuantity;


        totalPrice +=
            itemPrice * itemQuantity;


        if (!cartItems) {
            return;
        }


        const itemElement =
            document.createElement("div");


        itemElement.className =
            "cart-item";


        const itemName =
            currentLanguage === "ar"
                ? (
                    item.nameAr ||
                    item.name ||
                    "منتج"
                )
                : (
                    item.nameEn ||
                    item.name ||
                    "Product"
                );


        let itemSize = "";


        if (item.size && productData[item.size]) {

            itemSize =
                getSizeName(item.size);

        } else {

            itemSize =
                item.sizeName || "";

        }


        itemElement.innerHTML = `

            <div class="cart-item-info">

                <h4>
                    ${itemName}
                </h4>

                ${
                    itemSize
                        ? `<p>${itemSize}</p>`
                        : ""
                }

                <p>
                    ${itemPrice}
                    ${
                        currentLanguage === "ar"
                            ? "جنيه"
                            : "EGP"
                    }
                </p>

                <p>
                    ${
                        currentLanguage === "ar"
                            ? "الكمية"
                            : "Quantity"
                    }:
                    ${itemQuantity}
                </p>

            </div>

            <button
                type="button"
                class="remove-cart-item"
                onclick="removeFromCart(${index})"
                aria-label="${
                    currentLanguage === "ar"
                        ? "حذف المنتج"
                        : "Remove product"
                }"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        cartItems.appendChild(
            itemElement
        );

    });


    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }


    if (cartTotal) {

        cartTotal.textContent =
            `${totalPrice} ${
                currentLanguage === "ar"
                    ? "جنيه"
                    : "EGP"
            }`;

    }

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


    cart.splice(index, 1);


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
   OPEN CART
========================================================= */

if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        function () {

            updateCart();


            if (cartPanel) {

                cartPanel.classList.add(
                    "active"
                );

            }


            if (cartOverlay) {

                cartOverlay.classList.add(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCartPanel() {

    if (cartPanel) {

        cartPanel.classList.remove(
            "active"
        );

    }


    if (cartOverlay) {

        cartOverlay.classList.remove(
            "active"
        );

    }

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


            updateProduct();


            if (cartPanel) {

                cartPanel.classList.add(
                    "active"
                );

            }


            if (cartOverlay) {

                cartOverlay.classList.add(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   LOGIN
========================================================= */

const loginBtn =
    document.getElementById("loginBtn");

const loginPanel =
    document.getElementById("loginPanel");

const loginOverlay =
    document.getElementById("loginOverlay");

const closeLogin =
    document.getElementById("closeLogin");


if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        function () {

            if (loginPanel) {

                loginPanel.classList.add(
                    "active"
                );

            }


            if (loginOverlay) {

                loginOverlay.classList.add(
                    "active"
                );

            }

        }
    );

}


function closeLoginPanel() {

    if (loginPanel) {

        loginPanel.classList.remove(
            "active"
        );

    }


    if (loginOverlay) {

        loginOverlay.classList.remove(
            "active"
        );

    }

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
   ORDER MODAL
========================================================= */

const orderModal =
    document.getElementById("orderModal");

const backBtn =
    document.getElementById("backBtn");

const confirmOrderBtn =
    document.getElementById("confirmOrderBtn");


/* =========================================================
   ORDER SUMMARY
========================================================= */

function updateOrderSummary() {

    loadCart();


    const orderSummary =
        document.getElementById("orderSummary");


    if (!orderSummary) {
        return;
    }


    if (cart.length === 0) {

        orderSummary.innerHTML =
            currentLanguage === "ar"
                ? "السلة فارغة"
                : "Cart is empty";

        return;

    }


    let summaryHTML = "";

    let total = 0;


    cart.forEach(item => {

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
                    "منتج"
                )
                : (
                    item.nameEn ||
                    item.name ||
                    "Product"
                );


        let itemSize = "";


        if (item.size && productData[item.size]) {

            itemSize =
                getSizeName(item.size);

        } else {

            itemSize =
                item.sizeName || "";

        }


        summaryHTML += `

            <div class="order-summary-item">

                <strong>
                    ${itemName}
                </strong>

                ${
                    itemSize
                        ? `<span>${itemSize}</span>`
                        : ""
                }

                <span>
                    ${itemQuantity}
                    ×
                    ${itemPrice}
                    ${
                        currentLanguage === "ar"
                            ? "جنيه"
                            : "EGP"
                    }
                </span>

            </div>

        `;

    });


    summaryHTML += `

        <div class="order-summary-total">

            <strong>
                ${
                    currentLanguage === "ar"
                        ? "الإجمالي"
                        : "Total"
                }
            </strong>

            <strong>
                ${total}
                ${
                    currentLanguage === "ar"
                        ? "جنيه"
                        : "EGP"
                }
            </strong>

        </div>

    `;


    orderSummary.innerHTML =
        summaryHTML;

}


/* =========================================================
   OPEN ORDER MODAL
========================================================= */

function openOrderModal() {

    loadCart();


    if (cart.length === 0) {

        alert(
            currentLanguage === "ar"
                ? "السلة فارغة"
                : "Cart is empty"
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


            updateProduct();


            openOrderModal();

        }
    );

}


/* =========================================================
   BACK FROM ORDER
========================================================= */

if (backBtn) {

    backBtn.addEventListener(
        "click",
        function () {

            if (orderModal) {

                orderModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   CONFIRM ORDER
========================================================= */

if (confirmOrderBtn) {

    confirmOrderBtn.addEventListener(
        "click",
        function () {

            const fullName =
                document.getElementById(
                    "fullName"
                );

            const phone =
                document.getElementById(
                    "phone"
                );

            const governorate =
                document.getElementById(
                    "governorate"
                );

            const address =
                document.getElementById(
                    "address"
                );

            const notes =
                document.getElementById(
                    "notes"
                );


            if (
                !fullName ||
                !phone ||
                !governorate ||
                !address
            ) {

                return;

            }


            if (
                !fullName.value.trim() ||
                !phone.value.trim() ||
                !governorate.value.trim() ||
                !address.value.trim()
            ) {

                alert(
                    currentLanguage === "ar"
                        ? "من فضلك اكملي البيانات المطلوبة"
                        : "Please complete the required information"
                );

                return;

            }


            loadCart();


            if (cart.length === 0) {

                alert(
                    currentLanguage === "ar"
                        ? "السلة فارغة"
                        : "Cart is empty"
                );

                return;

            }


            const orderData = {

                customer: {

                    name:
                        fullName.value.trim(),

                    phone:
                        phone.value.trim(),

                    governorate:
                        governorate.value.trim(),

                    address:
                        address.value.trim(),

                    notes:
                        notes
                            ? notes.value.trim()
                            : ""

                },


                products:
                    JSON.parse(
                        JSON.stringify(cart)
                    ),


                createdAt:
                    new Date().toISOString()

            };


            /* =================================================
               SAVE ORDER LOCALLY
            ================================================= */

            let orders = [];


            try {

                const savedOrders =
                    localStorage.getItem(
                        "oliveOilOrders"
                    );


                orders =
                    savedOrders
                        ? JSON.parse(savedOrders)
                        : [];


                if (!Array.isArray(orders)) {

                    orders = [];

                }

            } catch (error) {

                orders = [];

            }


            orders.push(
                orderData
            );


            localStorage.setItem(
                "oliveOilOrders",
                JSON.stringify(orders)
            );


            /* =================================================
               SUCCESS
            ================================================= */

            alert(
                currentLanguage === "ar"
                    ? "تم إرسال طلبك بنجاح ❤️"
                    : "Your order has been submitted ❤️"
            );


            /* =================================================
               CLEAR SHARED CART
            ================================================= */

            cart = [];

            saveCart();

            updateCart();


            /* =================================================
               CLOSE MODAL
            ================================================= */

            if (orderModal) {

                orderModal.classList.remove(
                    "active"
                );

            }


            /* =================================================
               CLEAR FORM
            ================================================= */

            fullName.value = "";

            phone.value = "";

            governorate.value = "";

            address.value = "";


            if (notes) {

                notes.value = "";

            }

        }
    );

}


/* =========================================================
   PAGE BACK BUTTON
========================================================= */

const pageBackBtn =
    document.getElementById(
        "pageBackBtn"
    );


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
   LANGUAGE - APPLY CURRENT LANGUAGE
========================================================= */

function applyLanguage() {

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


    if (productName) {

        productName.textContent =
            currentLanguage === "ar"
                ? "زيت الزيتون بالبصل"
                : "Olive Oil with Onion";

    }


    if (productType) {

        productType.textContent =
            currentLanguage === "ar"
                ? "زيت الزيتون بالبصل"
                : "Olive Oil with Onion";

    }


    if (sizesTitle) {

        sizesTitle.textContent =
            currentLanguage === "ar"
                ? "اختر الحجم"
                : "Choose Size";

    }


    if (addCartBtn) {

        addCartBtn.innerHTML =
            currentLanguage === "ar"
                ? '<i class="fa-solid fa-cart-plus"></i> أضف إلى السلة'
                : '<i class="fa-solid fa-cart-plus"></i> Add to Cart';

    }


    if (buyNowBtn) {

        buyNowBtn.innerHTML =
            currentLanguage === "ar"
                ? '<i class="fa-solid fa-bag-shopping"></i> اشتري الآن'
                : '<i class="fa-solid fa-bag-shopping"></i> Buy Now';

    }


    /* =====================================================
       SIZE BUTTONS
    ===================================================== */

    sizeButtons.forEach(button => {

        const size =
            button.dataset.size;


        if (
            size &&
            productData[size]
        ) {

            button.textContent =
                getSizeName(size);

        }

    });


    /* =====================================================
       ABOUT
    ===================================================== */

    const aboutTitle =
        document.getElementById(
            "aboutTitle"
        );

    const aboutSubtitle =
        document.getElementById(
            "aboutSubtitle"
        );


    if (aboutTitle) {

        aboutTitle.textContent =
            currentLanguage === "ar"
                ? "من نحن"
                : "About Us";

    }


    if (aboutSubtitle) {

        aboutSubtitle.textContent =
            currentLanguage === "ar"
                ? "رحلة زيت زيتون دكتور ابو النصر"
                : "The Journey of Dr. Abu El Nasr Olive Oil";

    }


    /* =====================================================
       UPDATE CART
    ===================================================== */

    updateCart();


    updateOrderSummary();


    updateProduct();

}


/* =========================================================
   LANGUAGE BUTTON
========================================================= */

function changeLanguage() {

    currentLanguage =
        currentLanguage === "ar"
            ? "en"
            : "ar";


    localStorage.setItem(
        "siteLanguage",
        currentLanguage
    );


    applyLanguage();

}


if (languageBtn) {

    languageBtn.addEventListener(
        "click",
        changeLanguage
    );

}


/* =========================================================
   SYNC CART + LANGUAGE BETWEEN ALL PAGES
========================================================= */

window.addEventListener(
    "storage",
    function (event) {

        /* ================================================
           CART CHANGED FROM ANOTHER PAGE
        ================================================ */

        if (event.key === CART_KEY) {

            loadCart();

            updateCart();

            updateOrderSummary();

        }


        /* ================================================
           LANGUAGE CHANGED FROM ANOTHER PAGE
        ================================================ */

        if (event.key === "siteLanguage") {

            const newLanguage =
                event.newValue || "ar";


            /*
               مهم جدًا:
               هنا ممنوع نستعمل changeLanguage()
               لأنها بتقلب اللغة مرة تانية.
            */

            if (
                newLanguage === "ar" ||
                newLanguage === "en"
            ) {

                currentLanguage =
                    newLanguage;

                applyLanguage();

            }

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        closeCartPanel();

        closeLoginPanel();


        if (orderModal) {

            orderModal.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================================
   FAQ
========================================================= */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach(question => {

    question.addEventListener(
        "click",
        function () {

            const answer =
                this.nextElementSibling;


            this.classList.toggle(
                "active"
            );


            if (answer) {

                answer.classList.toggle(
                    "active"
                );

            }

        }
    );

});


/* =========================================================
   VIDEO
========================================================= */

const productVideo =
    document.getElementById(
        "productVideo"
    );


if (productVideo) {

    /*
       يفضل autoplay + muted + loop
       ولو المستخدم ضغط على الفيديو
       نسمح له بالتشغيل / الإيقاف.
    */

    productVideo.addEventListener(
        "click",
        function () {

            if (this.paused) {

                this.play().catch(
                    () => {}
                );

            } else {

                this.pause();

            }

        }
    );

}


/* =========================================================
   DASHBOARD BUTTON
========================================================= */

const dashboardBtn =
    document.getElementById(
        "dashboardBtn"
    );


if (dashboardBtn) {

    dashboardBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "dashboard.html";

        }
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

loadCart();


/*
   ضبط اللغة الحالية
   بدون تبديلها
*/

applyLanguage();


/*
   تحديد المقاس الافتراضي
*/

sizeButtons.forEach(button => {

    if (
        button.dataset.size ===
        selectedSize
    ) {

        button.classList.add(
            "active"
        );

    }

});


updateProduct();

updateCart();
