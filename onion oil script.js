
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
   نفس السلة المستخدمة في كل صفحات المنتجات
========================================================= */

const CART_KEY = "oliveOilCart";

let cart = [];

try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
} catch (error) {
    cart = [];
}


/* =========================================================
   PRODUCT ID
   مهم جدًا: البصل له ID مستقل
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
   SELECTED SIZE
========================================================= */

let selectedSize = "half";

let quantity = 1;


/* =========================================================
   SHARED CART FUNCTIONS
========================================================= */

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


    productPrice.textContent =
        `${data.price} ${currentLanguage === "ar" ? "جنيه" : "EGP"}`;


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

    button.addEventListener("click", function () {

        sizeButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        this.classList.add("active");


        selectedSize =
            this.dataset.size;


        quantity = 1;


        updateProduct();

    });

});


/* =========================================================
   QUANTITY - MINUS
========================================================= */

if (minusOneBtn) {

    minusOneBtn.addEventListener("click", function () {

        if (quantity > 1) {

            quantity--;

        }

        updateProduct();

    });

}


/* =========================================================
   ADD PRODUCT TO SHARED CART
========================================================= */

function addSelectedProductToCart(amount) {

    if (!productData[selectedSize]) {
        return;
    }


    const productInfo =
        productData[selectedSize];


    /*
       لو فيه منتج بصل مضاف بالفعل
       بنفس المقاس نزود الكمية
    */

    const existingItem =
        cart.find(item =>

            item.productId === PRODUCT_ID &&
            item.size === selectedSize

        );


    if (existingItem) {

        existingItem.quantity =
            (Number(existingItem.quantity) || 0) +
            amount;

    } else {

        /*
           إضافة منتج جديد للسلة المشتركة
        */

        cart.push({

            productId: PRODUCT_ID,

            nameAr: "زيت الزيتون بالبصل",

            nameEn: "Olive Oil with Onion",

            name:
                currentLanguage === "ar"
                    ? "زيت الزيتون بالبصل"
                    : "Olive Oil with Onion",

            size: selectedSize,

            sizeName:
                getSizeName(selectedSize),

            price: productInfo.price,

            image: productInfo.image,

            quantity: amount

        });

    }


    saveCart();

    updateCart();

}


/* =========================================================
   PLUS BUTTON
   + يضيف مباشرة للسلة المشتركة
========================================================= */

if (plusOneBtn) {

    plusOneBtn.addEventListener("click", function () {

        addSelectedProductToCart(1);

        quantity = 1;

        updateProduct();

    });

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
   UPDATE SHARED CART UI
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
            item.name ||
            item.nameAr ||
            item.nameEn ||
            "منتج";


        const itemSize =
            item.sizeName ||
            (
                item.size
                    ? getSizeName(item.size)
                    : ""
            );


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
                    ${currentLanguage === "ar" ? "جنيه" : "EGP"}
                </p>

                <p>
                    ${currentLanguage === "ar" ? "الكمية" : "Quantity"}:
                    ${itemQuantity}
                </p>

            </div>


            <button
                class="remove-cart-item"
                onclick="removeFromCart(${index})"
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
            `${totalPrice} ${currentLanguage === "ar" ? "جنيه" : "EGP"}`;

    }

}


/* =========================================================
   REMOVE FROM SHARED CART
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

    cartBtn.addEventListener("click", function () {

        updateCart();


        if (cartPanel) {

            cartPanel.classList.add("active");

        }


        if (cartOverlay) {

            cartOverlay.classList.add("active");

        }

    });

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCartPanel() {

    if (cartPanel) {

        cartPanel.classList.remove("active");

    }


    if (cartOverlay) {

        cartOverlay.classList.remove("active");

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

    addCartBtn.addEventListener("click", function () {

        addSelectedProductToCart(
            quantity
        );


        quantity = 1;

        updateProduct();


        if (cartPanel) {

            cartPanel.classList.add("active");

        }


        if (cartOverlay) {

            cartOverlay.classList.add("active");

        }

    });

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

    loginBtn.addEventListener("click", function () {

        if (loginPanel) {

            loginPanel.classList.add("active");

        }


        if (loginOverlay) {

            loginOverlay.classList.add("active");

        }

    });

}


function closeLoginPanel() {

    if (loginPanel) {

        loginPanel.classList.remove("active");

    }


    if (loginOverlay) {

        loginOverlay.classList.remove("active");

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


        total += itemTotal;


        const itemName =
            item.name ||
            item.nameAr ||
            item.nameEn ||
            "Product";


        const itemSize =
            item.sizeName ||
            (
                item.size
                    ? getSizeName(item.size)
                    : ""
            );


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
                    ${itemQuantity} × ${itemPrice}
                    ${currentLanguage === "ar" ? "جنيه" : "EGP"}
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
                ${currentLanguage === "ar" ? "جنيه" : "EGP"}
            </strong>

        </div>

    `;


    orderSummary.innerHTML =
        summaryHTML;

}


/* =========================================================
   CHECKOUT
========================================================= */

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function () {

            loadCart();


            if (cart.length === 0) {

                alert(
                    currentLanguage === "ar"
                        ? "السلة فارغة"
                        : "Cart is empty"
                );

                return;

            }


            closeCartPanel();

            updateOrderSummary();


            if (orderModal) {

                orderModal.classList.add("active");

            }

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


            updateOrderSummary();


            if (orderModal) {

                orderModal.classList.add("active");

            }

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
                document.getElementById("fullName");

            const phone =
                document.getElementById("phone");

            const governorate =
                document.getElementById("governorate");

            const address =
                document.getElementById("address");

            const notes =
                document.getElementById("notes");


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

                products: cart,

                createdAt:
                    new Date().toISOString()

            };


            /*
               حفظ الطلب محليًا
               لحد ربطه بالـ PHP / MySQL
            */

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


            orders.push(orderData);


            localStorage.setItem(
                "oliveOilOrders",
                JSON.stringify(orders)
            );


            alert(
                currentLanguage === "ar"
                    ? "تم إرسال طلبك بنجاح ❤️"
                    : "Your order has been submitted ❤️"
            );


            /*
               تفريغ السلة المشتركة
               يعني السلة هتفضى في كل الصفحات
            */

            cart = [];

            saveCart();

            updateCart();


            if (orderModal) {

                orderModal.classList.remove(
                    "active"
                );

            }


            if (fullName) {
                fullName.value = "";
            }

            if (phone) {
                phone.value = "";
            }

            if (governorate) {
                governorate.value = "";
            }

            if (address) {
                address.value = "";
            }

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
    document.getElementById("pageBackBtn");


if (pageBackBtn) {

    pageBackBtn.addEventListener(
        "click",
        function () {

            /*
               لو فيه صفحة قبلها يرجع لها.
               لو الصفحة مفتوحة مباشرة يروح للرئيسية.
            */

            if (window.history.length > 1) {

                window.history.back();

            } else {

                window.location.href =
                    "index.html";

            }

        }
    );

}


/* =========================================================
   LANGUAGE
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


    /*
       تحديث أسماء المقاسات
    */

    sizeButtons.forEach(button => {

        const size =
            button.dataset.size;


        if (
            productData[size]
        ) {

            button.textContent =
                getSizeName(size);

        }

    });


    /*
       تحديث السلة المشتركة
    */

    updateCart();


    updateProduct();

}


/* =========================================================
   LANGUAGE BUTTON
========================================================= */

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

        /*
           لو السلة اتغيرت من صفحة تانية
        */

        if (event.key === CART_KEY) {

            loadCart();

            updateCart();

        }


        /*
           لو اللغة اتغيرت من صفحة تانية
        */

        if (event.key === "siteLanguage") {

            currentLanguage =
                event.newValue || "ar";


            /*
               تحديث الصفحة بدون إعادة تحميل
            */

            changeLanguage();

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
    document.querySelectorAll(".faq-question");


faqQuestions.forEach(question => {

    question.addEventListener(
        "click",
        function () {

            const answer =
                this.nextElementSibling;


            this.classList.toggle("active");


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
    document.getElementById("productVideo");


if (productVideo) {

    productVideo.addEventListener(
        "click",
        function () {

            if (this.paused) {

                this.play();

            } else {

                this.pause();

            }

        }
    );

}


/* =========================================================
   ABOUT SECTION
========================================================= */

const aboutTitle =
    document.getElementById("aboutTitle");

const aboutSubtitle =
    document.getElementById("aboutSubtitle");


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


/* =========================================================
   DASHBOARD BUTTON
========================================================= */

const dashboardBtn =
    document.getElementById("dashboardBtn");


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


/*
   تحديد المقاس الافتراضي
*/

sizeButtons.forEach(button => {

    if (
        button.dataset.size ===
        selectedSize
    ) {

        button.classList.add("active");

    }

});


updateProduct();

updateCart();
