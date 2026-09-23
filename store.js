/* =========================================================
   DR. ABU EL NASR OLIVE OIL
   SHARED PRODUCT PAGES SCRIPT
   ONE LANGUAGE + ONE CART FOR ALL PRODUCTS
========================================================= */


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage =
    localStorage.getItem("siteLanguage") || "ar";


/* =========================================================
   CART
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
   GET CURRENT PRODUCT
========================================================= */

function getCurrentProduct() {

    const file =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    if (file.includes("virgin")) {

        return {
            id: "virgin",
            nameAr: "زيت زيتون بكر ممتاز",
            nameEn: "Extra Virgin Olive Oil"
        };

    }


    if (file.includes("garlic")) {

        return {
            id: "garlic",
            nameAr: "زيت زيتون بالثوم",
            nameEn: "Garlic Infused Olive Oil"
        };

    }


    if (file.includes("onion")) {

        return {
            id: "onion",
            nameAr: "زيت زيتون بالبصل",
            nameEn: "Onion Infused Olive Oil"
        };

    }


    if (file.includes("vitamin")) {

        return {
            id: "vitamin",
            nameAr: "زيت زيتون بفيتامين D و E",
            nameEn: "Olive Oil with Vitamin D & E"
        };

    }


    if (file.includes("rosemary")) {

        return {
            id: "rosemary",
            nameAr: "زيت زيتون بالروزماري",
            nameEn: "Rosemary Infused Olive Oil"
        };

    }


    if (file.includes("frying")) {

        return {
            id: "frying",
            nameAr: "زيت زيتون للقلي (منقى من الألياف)",
            nameEn: "Olive Oil for Frying (Fiber Purified)"
        };

    }


    return {

        id: "unknown",

        nameAr: "منتج زيت زيتون",

        nameEn: "Olive Oil Product"

    };

}


/* =========================================================
   PRODUCT PRICES
========================================================= */

const productPrices = {

    half: {
        price: 320,
        sizeAr: "نصف لتر",
        sizeEn: "Half Liter"
    },

    one: {
        price: 580,
        sizeAr: "1 لتر",
        sizeEn: "1 Liter"
    },

    two: {
        price: 1080,
        sizeAr: "2 لتر",
        sizeEn: "2 Liters"
    },

    five: {
        price: 2600,
        sizeAr: "5 لتر",
        sizeEn: "5 Liters"
    }

};


/* =========================================================
   CURRENT SELECTED SIZE
========================================================= */

let selectedSize =
    "half";


let selectedQuantity =
    1;


/* =========================================================
   DOM
========================================================= */

const languageBtn =
    document.getElementById(
        "languageBtn"
    );


const languageText =
    document.getElementById(
        "languageText"
    );


const cartBtn =
    document.getElementById(
        "cartBtn"
    );


const cartPanel =
    document.getElementById(
        "cartPanel"
    );


const cartOverlay =
    document.getElementById(
        "cartOverlay"
    );


const cartItems =
    document.getElementById(
        "cartItems"
    );


const cartTotal =
    document.getElementById(
        "cartTotal"
    );


const cartCount =
    document.getElementById(
        "cartCount"
    );


const productPrice =
    document.getElementById(
        "productPrice"
    );


const quantityValue =
    document.getElementById(
        "quantityValue"
    );


const addCartBtn =
    document.getElementById(
        "addCartBtn"
    );


const buyNowBtn =
    document.getElementById(
        "buyNowBtn"
    );


/* =========================================================
   UPDATE CART COUNT
========================================================= */

function updateCartCount() {

    if (!cartCount) return;


    let totalQuantity = 0;


    cart.forEach(
        function (item) {

            totalQuantity +=
                Number(item.quantity) || 0;

        }
    );


    cartCount.textContent =
        totalQuantity;

}


/* =========================================================
   UPDATE PRODUCT PRICE
========================================================= */

function updateProductPrice() {

    const data =
        productPrices[selectedSize];


    if (!data || !productPrice) return;


    productPrice.textContent =
        data.price + " ج.م";

}


/* =========================================================
   QUANTITY
========================================================= */

function updateQuantityDisplay() {

    if (quantityValue) {

        quantityValue.textContent =
            selectedQuantity;

    }

}


/* =========================================================
   PLUS
========================================================= */

const plusOneBtn =
    document.getElementById(
        "plusOneBtn"
    );


if (plusOneBtn) {

    plusOneBtn.addEventListener(
        "click",
        function () {

            selectedQuantity++;

            updateQuantityDisplay();

        }
    );

}


/* =========================================================
   MINUS
========================================================= */

const minusOneBtn =
    document.getElementById(
        "minusOneBtn"
    );


if (minusOneBtn) {

    minusOneBtn.addEventListener(
        "click",
        function () {

            if (
                selectedQuantity > 1
            ) {

                selectedQuantity--;

            }

            updateQuantityDisplay();

        }
    );

}


/* =========================================================
   SIZE BUTTONS
========================================================= */

const sizeButtons =
    document.querySelectorAll(
        ".size-btn"
    );


sizeButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

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


                selectedSize =
                    button.getAttribute(
                        "data-size"
                    ) || "half";


                updateProductPrice();

            }
        );

    }
);


/* =========================================================
   ADD CURRENT PRODUCT
========================================================= */

function addCurrentProductToCart(
    openCartAfter = true
) {

    const product =
        getCurrentProduct();


    const sizeData =
        productPrices[selectedSize];


    if (!sizeData) return;


    /*
       Important:
       Same product + same size
       = same cart item.
    */

    const existing =
        cart.find(
            function (item) {

                return (

                    item.productId ===
                    product.id

                    &&

                    item.size ===
                    selectedSize

                );

            }
        );


    if (existing) {

        existing.quantity +=
            selectedQuantity;

    } else {

        cart.push({

            cartItemId:
                Date.now().toString() +
                Math.random()
                    .toString(36)
                    .substring(2, 8),

            productId:
                product.id,

            nameAr:
                product.nameAr,

            nameEn:
                product.nameEn,

            size:
                selectedSize,

            sizeAr:
                sizeData.sizeAr,

            sizeEn:
                sizeData.sizeEn,

            price:
                sizeData.price,

            quantity:
                selectedQuantity

        });

    }


    saveCart();

    updateCartCount();


    if (openCartAfter) {

        openCart();

    }

}


/* =========================================================
   ADD TO CART
========================================================= */

if (addCartBtn) {

    addCartBtn.addEventListener(
        "click",
        function () {

            addCurrentProductToCart(
                true
            );

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

            addCurrentProductToCart(
                true
            );

        }
    );

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

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


    renderCart();

}


if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        openCart
    );

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

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


const closeCartBtn =
    document.getElementById(
        "closeCart"
    );


if (closeCartBtn) {

    closeCartBtn.addEventListener(
        "click",
        closeCart
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCart
    );

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    if (!cartItems) {

        updateCartCount();

        return;

    }


    updateCartCount();


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


    let total =
        0;


    cart.forEach(
        function (item) {

            const quantity =
                Number(item.quantity) || 0;


            const price =
                Number(item.price) || 0;


            total +=
                quantity * price;


            const name =
                currentLanguage === "en"
                ? item.nameEn
                : item.nameAr;


            const size =
                currentLanguage === "en"
                ? item.sizeEn
                : item.sizeAr;


            const itemElement =
                document.createElement(
                    "div"
                );


            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

                <div class="cart-item-info">

                    <strong>
                        ${escapeHTML(name)}
                    </strong>

                    <span>
                        ${
                            currentLanguage === "en"
                            ? "Size: "
                            : "الحجم: "
                        }

                        ${escapeHTML(size)}
                    </span>

                    <span>
                        ${price} ج.م
                    </span>

                </div>


                <div class="cart-item-controls">

                    <button
                        type="button"
                        onclick="changeCartQuantity(
                            '${item.cartItemId}',
                            -1
                        )">

                        −

                    </button>


                    <span>
                        ${quantity}
                    </span>


                    <button
                        type="button"
                        onclick="changeCartQuantity(
                            '${item.cartItemId}',
                            1
                        )">

                        +

                    </button>

                </div>


                <button
                    type="button"
                    class="remove-cart-item"
                    onclick="removeCartItem(
                        '${item.cartItemId}'
                    )">

                    ${
                        currentLanguage === "en"
                        ? "Remove"
                        : "حذف"
                    }

                </button>

            `;


            cartItems.appendChild(
                itemElement
            );

        }
    );


    if (cartTotal) {

        cartTotal.textContent =
            total + " ج.م";

    }

}


/* =========================================================
   CHANGE CART QUANTITY
========================================================= */

function changeCartQuantity(
    cartItemId,
    amount
) {

    const item =
        cart.find(
            function (product) {

                return (
                    product.cartItemId ===
                    cartItemId
                );

            }
        );


    if (!item) return;


    item.quantity +=
        amount;


    if (
        item.quantity <= 0
    ) {

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

    renderCart();

}


window.changeCartQuantity =
    changeCartQuantity;


/* =========================================================
   REMOVE CART ITEM
========================================================= */

function removeCartItem(
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

    renderCart();

}


window.removeCartItem =
    removeCartItem;


/* =========================================================
   LANGUAGE
========================================================= */

function updateLanguage() {

    const elements =
        document.querySelectorAll(
            "[data-ar][data-en]"
        );


    elements.forEach(
        function (element) {

            const ar =
                element.getAttribute(
                    "data-ar"
                );


            const en =
                element.getAttribute(
                    "data-en"
                );


            element.textContent =
                currentLanguage === "en"
                ? en
                : ar;

        }
    );


    /*
       HTML direction
    */

    document.documentElement.lang =
        currentLanguage === "en"
        ? "en"
        : "ar";


    document.documentElement.dir =
        currentLanguage === "en"
        ? "ltr"
        : "rtl";


    /*
       Language button
    */

    if (languageText) {

        languageText.textContent =
            currentLanguage === "en"
            ? "العربية"
            : "English";

    }


    /*
       Cart language
    */

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
   INITIALIZE
========================================================= */

updateProductPrice();

updateQuantityDisplay();

updateCartCount();

updateLanguage();

renderCart();
