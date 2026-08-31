/* =========================
   DASHBOARD PASSWORD
========================= */

const DASHBOARD_PASSWORD = "2026";


function loginDashboard() {

    const password =
        document.getElementById("dashboardPassword").value;

    const error =
        document.getElementById("loginError");

    if (password === DASHBOARD_PASSWORD) {

        document.getElementById("dashboardLogin").style.display = "none";

        document.getElementById("dashboardPage").style.display = "block";

        sessionStorage.setItem("dashboardLoggedIn", "true");

        error.textContent = "";

    } else {

        error.textContent = "كلمة المرور غير صحيحة";

    }

}


/* =========================
   AUTO LOGIN
========================= */

if (sessionStorage.getItem("dashboardLoggedIn") === "true") {

    document.getElementById("dashboardLogin").style.display = "none";

    document.getElementById("dashboardPage").style.display = "block";

}


/* =========================
   LOGOUT
========================= */

function logoutDashboard() {

    sessionStorage.removeItem("dashboardLoggedIn");

    location.reload();

}

/* =========================
   DASHBOARD TABS
========================= */

function showDashboardSection(sectionId) {

    const tabs =
        document.querySelectorAll(".dashboard-tab");

    const sections =
        document.querySelectorAll(".dashboard-section");


    /* إزالة Active من كل الأزرار */

    tabs.forEach(tab => {
        tab.classList.remove("active");
    });


    /* إخفاء كل الأقسام */

    sections.forEach(section => {

        section.style.display = "none";

        section.classList.remove("active-section");

    });


    /* فتح القسم المطلوب */

    const section =
        document.getElementById(sectionId);


    if (section) {

        section.style.display = "block";

        section.classList.add("active-section");

    }


    /* تحديد الزر النشط */

    tabs.forEach(tab => {

        const onclick =
            tab.getAttribute("onclick");

        if (
            onclick &&
            onclick.includes("'" + sectionId + "'")
        ) {

            tab.classList.add("active");

        }

    });

}


/* =========================
   LOGO UPLOAD
========================= */

const logoInput =
    document.getElementById("logoInput");


if (logoInput) {

    logoInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (event) {

            document.getElementById(
                "dashboardLogoPreview"
            ).src = event.target.result;

        };

        reader.readAsDataURL(file);

    });

}


/* =========================
   SAVE IDENTITY
========================= */

function saveIdentity() {

    const identity = {

        storeName:
            document.getElementById("storeName").value,

        mainTitle:
            document.getElementById("mainTitle").value,

        mainSubtitle:
            document.getElementById("mainSubtitle").value,

        logo:
            document.getElementById("dashboardLogoPreview").src

    };


    localStorage.setItem(
        "oliveOilIdentity",
        JSON.stringify(identity)
    );


    const message =
        document.getElementById("identityMessage");

    message.textContent =
        "تم حفظ بيانات الهوية بنجاح ✓";


    setTimeout(() => {

        message.textContent = "";

    }, 2500);

}


/* =========================
   LOAD IDENTITY
========================= */

function loadIdentity() {

    const saved =
        localStorage.getItem("oliveOilIdentity");

    if (!saved) return;

    const identity =
        JSON.parse(saved);


    if (identity.storeName) {

        document.getElementById("storeName").value =
            identity.storeName;

    }


    if (identity.mainTitle) {

        document.getElementById("mainTitle").value =
            identity.mainTitle;

    }


    if (identity.mainSubtitle) {

        document.getElementById("mainSubtitle").value =
            identity.mainSubtitle;

    }


    if (identity.logo) {

        document.getElementById(
            "dashboardLogoPreview"
        ).src = identity.logo;

    }

}

loadIdentity();


/* =========================
   DELETE CONTENT CARD
========================= */

function deleteContentCard(button) {

    const card =
        button.closest(".content-card");

    if (!card) return;

    card.remove();

}


/* =========================
   ADD NEW CONTENT CARD
========================= */

function addNewContentCard() {

    const section =
        document.getElementById("add-product");

    const addButton =
        section.querySelector(".add-box-btn");


    const card =
        document.createElement("div");

    card.className = "content-card";


    card.innerHTML = `

        <div class="card-header">

            <h3>مربع جديد</h3>

            <button
                class="delete-btn"
                onclick="deleteContentCard(this)">

                حذف

            </button>

        </div>

        <textarea
            class="content-textarea"
            placeholder="اكتب المحتوى هنا...">
        </textarea>

    `;


    section.insertBefore(card, addButton);

}


/* =========================
   SAVE CONTENT CARDS
========================= */

function saveContentCards() {

    const cards =
        document.querySelectorAll(
            "#add-product .content-card"
        );


    const content = [];


    cards.forEach(card => {

        const title =
            card.querySelector("h3");

        const textarea =
            card.querySelector("textarea");


        content.push({

            title:
                title ? title.textContent : "",

            text:
                textarea ? textarea.value : ""

        });

    });


    localStorage.setItem(
        "oliveOilContent",
        JSON.stringify(content)
    );


    const message =
        document.getElementById("contentMessage");


    message.textContent =
        "تم حفظ المربعات بنجاح ✓";


    setTimeout(() => {

        message.textContent = "";

    }, 2500);

}

/* =========================
   SIZES & PRICES
========================= */

const sizeInputs = [1, 2, 3, 4];


sizeInputs.forEach(number => {

    const input =
        document.getElementById(`sizeImage${number}`);

    if (!input) return;


    input.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;


        const reader = new FileReader();


        reader.onload = function (event) {

            const preview =
                document.getElementById(
                    `sizeImagePreview${number}`
                );

            if (preview) {

                preview.src =
                    event.target.result;

            }

        };


        reader.readAsDataURL(file);

    });

});


/* =========================
   SAVE SIZES & PRICES
========================= */

function saveSizesPrices() {

    const sizes = [];


    sizeInputs.forEach(number => {

        const name =
            document.getElementById(
                `sizeName${number}`
            ).value;

        const price =
            document.getElementById(
                `sizePrice${number}`
            ).value;

        const image =
            document.getElementById(
                `sizeImagePreview${number}`
            ).src;


        sizes.push({

            name: name,

            price: price,

            image: image

        });

    });


    localStorage.setItem(
        "oliveOilSizesPrices",
        JSON.stringify(sizes)
    );


    const message =
        document.getElementById(
            "sizesPricesMessage"
        );


    message.textContent =
        "تم حفظ الأحجام والأسعار بنجاح ✓";


    setTimeout(() => {

        message.textContent = "";

    }, 2500);

}


/* =========================
   LOAD SIZES & PRICES
========================= */

function loadSizesPrices() {

    const saved =
        localStorage.getItem(
            "oliveOilSizesPrices"
        );


    if (!saved) return;


    const sizes =
        JSON.parse(saved);


    sizes.forEach((size, index) => {

        const number = index + 1;


        const nameInput =
            document.getElementById(
                `sizeName${number}`
            );

        const priceInput =
            document.getElementById(
                `sizePrice${number}`
            );

        const preview =
            document.getElementById(
                `sizeImagePreview${number}`
            );


        if (nameInput && size.name) {

            nameInput.value =
                size.name;

        }


        if (priceInput && size.price) {

            priceInput.value =
                size.price;

        }


        if (preview && size.image) {

            preview.src =
                size.image;

        }

    });

}


loadSizesPrices();

/* =========================
ABOUT US
========================= */

const DEFAULT_ABOUT_TITLE = "من نحن";

const DEFAULT_ABOUT_TEXT = `رحلة زيت زيتون دكتور ابو النصر

إحنا مش مجرد علامة تجارية بتبيع زيت، إحنا كيان بدأ من إيمان حقيقي إن "صحتك وصحة عيلتك تستاهل أنقى حاجة في الطبيعة". رحلتنا بدأت لما قررنا ندمج بين خير الأرض والأصول الزراعية، وبين أدق المعايير العلمية، عشان نوصلك "إكسير صحة" متكامل، مش مجرد مكون عادي في مطبخك.

رؤيتنا وفلسفتنا

في "أبو النصر"، هدفنا نكون همزة الوصل الموثوقة بين أجود المزارع وبين سفرتك. إحنا بنشوف زيت الزيتون كاستثمار يومي في صحة القلب، قوة المناعة، ونضارة الجسم. وعشان نحقق ده مبنقبلش بأي تنازلات في الجودة، وبنطبق معايير صارمة من أول قطف الثمرة لحد ما الزيت يوصل لباب بيتك.`;

/* =========================
SAVE ABOUT US
========================= */

function saveAboutUs() {

const title =
    document.getElementById("aboutTitle").value;

const text =
    document.getElementById("aboutText").value;


const aboutData = {

    title: title,

    text: text

};


localStorage.setItem(
    "oliveOilAboutUs",
    JSON.stringify(aboutData)
);


const message =
    document.getElementById("aboutMessage");


message.textContent =
    "تم حفظ التعديلات بنجاح ✓";


setTimeout(() => {

    message.textContent = "";

}, 2500);

}

/* =========================
LOAD ABOUT US
========================= */

function loadAboutUs() {

const saved =
    localStorage.getItem("oliveOilAboutUs");


if (!saved) return;


const aboutData =
    JSON.parse(saved);


const title =
    document.getElementById("aboutTitle");

const text =
    document.getElementById("aboutText");


if (title) {

    title.value =
        aboutData.title ?? DEFAULT_ABOUT_TITLE;

}


if (text) {

    text.value =
        aboutData.text ?? DEFAULT_ABOUT_TEXT;

}

}

/* =========================
DELETE TITLE
========================= */

function deleteAboutTitle() {

const confirmed =
    confirm("هل تريدين حذف العنوان؟");


if (!confirmed) return;


document.getElementById(
    "aboutTitle"
).value = "";

}

/* =========================
DELETE TEXT
========================= */

function deleteAboutText() {

const confirmed =
    confirm("هل تريدين حذف نص الشركة؟");


if (!confirmed) return;


document.getElementById(
    "aboutText"
).value = "";

}

/* =========================
LOAD ABOUT US
========================= */

loadAboutUs();

/* =========================
CUSTOMER REVIEWS
========================= */

/* =========================
SET RATING
========================= */

function setReviewRating(card, rating) {

const ratingInput =
    card.querySelector(".review-rating");

const stars =
    card.querySelectorAll(
        ".rating-stars button"
    );


ratingInput.value = rating;


stars.forEach(star => {

    const starRating =
        Number(star.dataset.rating);


    if (starRating <= rating) {

        star.classList.add("active");

    } else {

        star.classList.remove("active");

    }

});

}

/* =========================
INITIALIZE REVIEW
========================= */

function initializeReview(card) {

const uploadButton =
    card.querySelector(
        ".review-upload-btn"
    );

const imageInput =
    card.querySelector(
        ".review-image-input"
    );

const previewImage =
    card.querySelector(
        ".review-preview-img"
    );

const previewBox =
    card.querySelector(
        ".review-image-preview"
    );

const previewText =
    previewBox.querySelector("span");


/* IMAGE */

uploadButton.addEventListener(
    "click",
    function () {

        imageInput.click();

    }
);


imageInput.addEventListener(
    "change",
    function () {

        const file =
            this.files[0];

        if (!file) return;


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                previewImage.src =
                    event.target.result;

                previewImage.hidden =
                    false;

                previewText.style.display =
                    "none";

            };


        reader.readAsDataURL(file);

    }
);


/* STARS */

const stars =
    card.querySelectorAll(
        ".rating-stars button"
    );


stars.forEach(star => {

    star.addEventListener(
        "click",
        function () {

            const rating =
                Number(
                    this.dataset.rating
                );

            setReviewRating(
                card,
                rating
            );

        }
    );

});


/* DEFAULT 5 STARS */

setReviewRating(card, 5);

}

/* =========================
INITIALIZE EXISTING REVIEWS
========================= */

document
.querySelectorAll(".review-card")
.forEach(card => {

    initializeReview(card);

});

/* =========================
ADD NEW REVIEW
========================= */

function addReview() {

const container =
    document.getElementById(
        "reviewsContainer"
    );


const card =
    document.createElement("div");


card.className =
    "review-card";


card.innerHTML = `

    <div class="review-header">

        <h3>تقييم عميل</h3>

        <button
            type="button"
            class="delete-btn"
            onclick="deleteReview(this)">

            حذف

        </button>

    </div>


    <label>
        صورة تعليق العميل
    </label>


    <div class="review-image-preview">

        <span>
            لم يتم اختيار صورة
        </span>

        <img
            class="review-preview-img"
            alt="صورة تعليق العميل"
            hidden>

    </div>


    <input
        type="file"
        class="review-image-input"
        accept="image/png,image/jpeg,image/webp"
        hidden>


    <button
        type="button"
        class="file-btn review-upload-btn">

        رفع صورة

    </button>


    <label>
        اسم العميل <span>(اختياري)</span>
    </label>


    <input
        type="text"
        class="warm-input review-name"
        placeholder="اكتب اسم العميل">


    <label>
        التقييم
    </label>


    <div class="rating-stars">

        <button type="button" data-rating="1">★</button>
        <button type="button" data-rating="2">★</button>
        <button type="button" data-rating="3">★</button>
        <button type="button" data-rating="4">★</button>
        <button type="button" data-rating="5">★</button>

    </div>


    <input
        type="hidden"
        class="review-rating"
        value="5">


    <label>
        تعليق مختصر <span>(اختياري)</span>
    </label>


    <textarea
        class="content-textarea review-comment"
        rows="5"
        placeholder="اكتب تعليق العميل هنا..."></textarea>

`;


container.appendChild(card);


initializeReview(card);

}

/* =========================
DELETE REVIEW
========================= */

function deleteReview(button) {

const card =
    button.closest(".review-card");


if (!card) return;


const confirmed =
    confirm(
        "هل تريدين حذف هذا التقييم؟"
    );


if (!confirmed) return;


card.remove();

}

/* =========================
SAVE REVIEWS
========================= */

function saveReviews() {

const cards =
    document.querySelectorAll(
        "#reviewsContainer .review-card"
    );


const reviews = [];


cards.forEach(card => {

    const name =
        card.querySelector(
            ".review-name"
        ).value;


    const comment =
        card.querySelector(
            ".review-comment"
        ).value;


    const rating =
        card.querySelector(
            ".review-rating"
        ).value;


    const image =
        card.querySelector(
            ".review-preview-img"
        );


    reviews.push({

        name: name,

        comment: comment,

        rating: Number(rating),

        image:
            image && !image.hidden
                ? image.src
                : ""

    });

});


/*
   مؤقتًا للتجربة المحلية.
   سيتم استبداله بالتخزين الحقيقي
   عند ربط المشروع بقاعدة البيانات.
*/

localStorage.setItem(
    "oliveOilCustomerReviews",
    JSON.stringify(reviews)
);


const message =
    document.getElementById(
        "reviewsMessage"
    );


message.textContent =
    "تم حفظ التقييمات بنجاح ✓";


setTimeout(() => {

    message.textContent = "";

}, 2500);

}

/* =========================
LOAD REVIEWS
========================= */

function loadReviews() {

const saved =
    localStorage.getItem(
        "oliveOilCustomerReviews"
    );


if (!saved) return;


const reviews =
    JSON.parse(saved);


const container =
    document.getElementById(
        "reviewsContainer"
    );


if (!container) return;


container.innerHTML = "";


reviews.forEach(review => {

    addSavedReview(
        container,
        review
    );

});

}

/* =========================
ADD SAVED REVIEW
========================= */

function addSavedReview(
container,
review
) {

const card =
    document.createElement("div");


card.className =
    "review-card";


card.innerHTML = `

    <div class="review-header">

        <h3>تقييم عميل</h3>

        <button
            type="button"
            class="delete-btn"
            onclick="deleteReview(this)">

            حذف

        </button>

    </div>


    <label>
        صورة تعليق العميل
    </label>


    <div class="review-image-preview">

        <span
            style="${review.image ? 'display:none;' : ''}">

            لم يتم اختيار صورة

        </span>


        <img
            class="review-preview-img"
            src="${review.image || ''}"
            alt="صورة تعليق العميل"
            ${review.image ? '' : 'hidden'}>

    </div>


    <input
        type="file"
        class="review-image-input"
        accept="image/png,image/jpeg,image/webp"
        hidden>


    <button
        type="button"
        class="file-btn review-upload-btn">

        رفع صورة

    </button>


    <label>
        اسم العميل <span>(اختياري)</span>
    </label>


    <input
        type="text"
        class="warm-input review-name"
        value="${escapeReviewText(review.name || '')}"
        placeholder="اكتب اسم العميل">


    <label>
        التقييم
    </label>


    <div class="rating-stars">

        <button type="button" data-rating="1">★</button>
        <button type="button" data-rating="2">★</button>
        <button type="button" data-rating="3">★</button>
        <button type="button" data-rating="4">★</button>
        <button type="button" data-rating="5">★</button>

    </div>


    <input
        type="hidden"
        class="review-rating"
        value="${review.rating || 5}">


    <label>
        تعليق مختصر <span>(اختياري)</span>
    </label>


    <textarea
        class="content-textarea review-comment"
        rows="5"
        placeholder="اكتب تعليق العميل هنا...">${escapeReviewText(review.comment || '')}</textarea>

`;


container.appendChild(card);


initializeReview(card);


setReviewRating(
    card,
    Number(review.rating || 5)
);

}

/* =========================
SAFE TEXT
========================= */

function escapeReviewText(text) {

return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}

/* =========================
LOAD SAVED REVIEWS
========================= */

loadReviews();

/* =========================
SOCIAL MEDIA
========================= */

/* =========================
SAVE SOCIAL MEDIA
========================= */

function saveSocialMedia() {

const socialMedia = {

    facebook:
        document.getElementById(
            "facebookLink"
        ).value.trim(),


    instagram:
        document.getElementById(
            "instagramLink"
        ).value.trim(),


    tiktok:
        document.getElementById(
            "tiktokLink"
        ).value.trim(),


    twitter:
        document.getElementById(
            "twitterLink"
        ).value.trim(),


    whatsapp:
        document.getElementById(
            "whatsappLink"
        ).value.trim(),


    youtube:
        document.getElementById(
            "youtubeLink"
        ).value.trim()

};


localStorage.setItem(
    "oliveOilSocialMedia",
    JSON.stringify(socialMedia)
);


const message =
    document.getElementById(
        "socialMessage"
    );


message.textContent =
    "تم حفظ روابط السوشيال ميديا بنجاح ✓";


setTimeout(() => {

    message.textContent = "";

}, 2500);

}

/* =========================
LOAD SOCIAL MEDIA
========================= */

function loadSocialMedia() {

const saved =
    localStorage.getItem(
        "oliveOilSocialMedia"
    );


if (!saved) return;


const socialMedia =
    JSON.parse(saved);


const facebook =
    document.getElementById(
        "facebookLink"
    );

const instagram =
    document.getElementById(
        "instagramLink"
    );

const tiktok =
    document.getElementById(
        "tiktokLink"
    );

const twitter =
    document.getElementById(
        "twitterLink"
    );

const whatsapp =
    document.getElementById(
        "whatsappLink"
    );

const youtube =
    document.getElementById(
        "youtubeLink"
    );


if (facebook && socialMedia.facebook) {

    facebook.value =
        socialMedia.facebook;

}


if (instagram && socialMedia.instagram) {

    instagram.value =
        socialMedia.instagram;

}


if (tiktok && socialMedia.tiktok) {

    tiktok.value =
        socialMedia.tiktok;

}


if (twitter && socialMedia.twitter) {

    twitter.value =
        socialMedia.twitter;

}


if (whatsapp && socialMedia.whatsapp) {

    whatsapp.value =
        socialMedia.whatsapp;

}


if (youtube && socialMedia.youtube) {

    youtube.value =
        socialMedia.youtube;

}

}

/* =========================
RUN
========================= */

loadSocialMedia();

/* =========================
   PAYMENT SETTINGS
========================= */


/* حفظ طرق الدفع */

document
    .getElementById("savePaymentMethods")
    ?.addEventListener("click", function () {

        const cash =
            document.querySelector(
                '[data-payment="cash"]'
            );

        const card =
            document.querySelector(
                '[data-payment="card"]'
            );

        const wallet =
            document.querySelector(
                '[data-payment="wallet"]'
            );


        const paymentMethods = {

            cash: cash ? cash.checked : false,

            card: card ? card.checked : false,

            wallet: wallet ? wallet.checked : false

        };


        localStorage.setItem(
            "paymentMethods",
            JSON.stringify(paymentMethods)
        );


        const message =
            document.getElementById(
                "paymentMethodsSuccess"
            );


        if (message) {

            message.style.display = "block";


            setTimeout(function () {

                message.style.display = "none";

            }, 2500);

        }

    });



/* حفظ إعدادات Kashier */

document
    .getElementById("saveKashier")
    ?.addEventListener("click", function () {

        const merchantInput =
            document.getElementById("merchantId");

        const modeInput =
            document.getElementById("paymentMode");


        const merchantId =
            merchantInput
                ? merchantInput.value.trim()
                : "";


        const paymentMode =
            modeInput
                ? modeInput.value
                : "test";


        localStorage.setItem(
            "kashierMerchantId",
            merchantId
        );


        localStorage.setItem(
            "kashierMode",
            paymentMode
        );


        const message =
            document.getElementById(
                "kashierSuccess"
            );


        if (message) {

            message.style.display = "block";


            setTimeout(function () {

                message.style.display = "none";

            }, 2500);

        }

    });



/* تحميل إعدادات الدفع */

function loadPaymentSettings() {

    const savedMethods =
        localStorage.getItem(
            "paymentMethods"
        );


    if (savedMethods) {

        const methods =
            JSON.parse(savedMethods);


        const cash =
            document.querySelector(
                '[data-payment="cash"]'
            );

        const card =
            document.querySelector(
                '[data-payment="card"]'
            );

        const wallet =
            document.querySelector(
                '[data-payment="wallet"]'
            );


        if (cash) {
            cash.checked =
                methods.cash;
        }


        if (card) {
            card.checked =
                methods.card;
        }


        if (wallet) {
            wallet.checked =
                methods.wallet;
        }

    }


    const merchantId =
        localStorage.getItem(
            "kashierMerchantId"
        );


    const paymentMode =
        localStorage.getItem(
            "kashierMode"
        );


    const merchantInput =
        document.getElementById(
            "merchantId"
        );

    const modeInput =
        document.getElementById(
            "paymentMode"
        );


    if (merchantInput && merchantId) {

        merchantInput.value =
            merchantId;

    }


    if (modeInput && paymentMode) {

        modeInput.value =
            paymentMode;

    }

}


/* تشغيل تحميل إعدادات الدفع */

loadPaymentSettings();



/* =========================
   ORDERS
========================= */


/*
   حاليًا الطلبات فاضية لأننا
   لسه ما ربطناش الموقع بقاعدة البيانات.

   الكود ده يجهز شاشة الطلبات
   ويعرض الطلبات المحفوظة محليًا
   لو موجودة.
*/


function loadDashboardOrders() {

    const container =
        document.getElementById(
            "ordersContainer"
        );

    const count =
        document.getElementById(
            "ordersCount"
        );


    if (!container) return;


    const savedOrders =
        localStorage.getItem(
            "oliveOilOrders"
        );


    const orders =
        savedOrders
            ? JSON.parse(savedOrders)
            : [];


    /* عدد الطلبات */

    if (count) {

        count.textContent =
            orders.length + " طلب";

    }


    /* لا توجد طلبات */

    if (orders.length === 0) {

        container.innerHTML = `
            <div class="no-orders">
                لا توجد طلبات حتى الآن
            </div>
        `;

        return;

    }


    /* عرض الطلبات */

    container.innerHTML = "";


    orders.forEach(function (order, index) {

        const card =
            document.createElement("div");


        card.className =
            "order-card";


        card.innerHTML = `

            <div class="order-card-header">

                <span class="order-number">
                    طلب رقم #${order.id || index + 1}
                </span>

                <span class="order-status">
                    ${order.status || "جديد"}
                </span>

            </div>


            <div class="order-info">

                <div>
                    <strong>اسم العميل:</strong>
                    ${order.name || "غير محدد"}
                </div>

                <div>
                    <strong>رقم الهاتف:</strong>
                    ${order.phone || "غير محدد"}
                </div>

                <div>
                    <strong>العنوان:</strong>
                    ${order.address || "غير محدد"}
                </div>

                <div>
                    <strong>طريقة الدفع:</strong>
                    ${order.paymentMethod || "غير محددة"}
                </div>

            </div>


            <div class="order-total">

    الإجمالي:
    ${order.total || 0} جنيه

</div>

<div class="order-actions">

    ${
        order.status === "ملغي"

        ? `<span class="cancelled-label">ملغي ❌</span>`

        : `
            <button
                type="button"
                class="cancel-order-btn"
                onclick="cancelOrder('${order.id}')">

                إلغاء الطلب

            </button>
        `
    }

</div>

        `;


        container.appendChild(card);

    });

}


/* تشغيل تحميل الطلبات */

loadDashboardOrders();

/* =========================
   REFRESH ORDERS
========================= */

function refreshDashboardOrders() {

    const container =
        document.getElementById("ordersContainer");

    const count =
        document.getElementById("ordersCount");

    if (!container) return;


    const savedOrders =
        localStorage.getItem("oliveOilOrders");

    const orders =
        savedOrders
            ? JSON.parse(savedOrders)
            : [];


    /* عدد الطلبات */

    if (count) {
        count.textContent =
            orders.length + " طلب";
    }


    /* لا توجد طلبات */

    if (orders.length === 0) {

        container.innerHTML = `
            <div class="no-orders">
                لا توجد طلبات حتى الآن
            </div>
        `;

        return;
    }


    /* عرض الطلبات */

    container.innerHTML = "";


    orders.forEach(function (order, index) {

        const card =
            document.createElement("div");

        card.className = "order-card";


        const paymentNames = {

            cash: "💵 الدفع عند الاستلام",

            card: "💳 بطاقة ائتمان / فيزا",

            wallet: "📱 محفظة إلكترونية"

        };


        const payment =
            paymentNames[order.paymentMethod]
            || "غير محددة";


        card.innerHTML = `

            <div class="order-card-header">

                <span class="order-number">
                    طلب رقم #${order.id || index + 1}
                </span>

                <span class="order-status">
                    ${order.status || "جديد"}
                </span>

            </div>


            <div class="order-info">

                <div>
                    <strong>اسم العميل:</strong>
                    ${order.name || "غير محدد"}
                </div>

                <div>
                    <strong>رقم الهاتف:</strong>
                    ${order.phone || "غير محدد"}
                </div>

                <div>
                    <strong>المحافظة:</strong>
                    ${order.governorate || "غير محددة"}
                </div>

                <div>
                    <strong>العنوان:</strong>
                    ${order.address || "غير محدد"}
                </div>

                <div>
                    <strong>طريقة الدفع:</strong>
                    ${payment}
                </div>

                <div>
                    <strong>التاريخ:</strong>
                    ${order.date || "غير محدد"}
                </div>

            </div>


            <div class="order-total">

                الإجمالي:
                ${order.total || 0} جنيه

            </div>

        `;


        container.appendChild(card);

    });

}
  
/* =========================
   CANCEL ORDER
========================= */

function cancelOrder(orderId) {

    const savedOrders =
        localStorage.getItem("oliveOilOrders");

    const orders =
        savedOrders
            ? JSON.parse(savedOrders)
            : [];

    const order =
        orders.find(order => String(order.id) === String(orderId));

    if (!order) return;

    order.status = "ملغي";

    localStorage.setItem(
        "oliveOilOrders",
        JSON.stringify(orders)
    );

    refreshDashboardOrders();

}

/* =========================
   AUTO REFRESH ORDERS
========================= */

refreshDashboardOrders();


setInterval(function () {

    refreshDashboardOrders();

}, 1000);

/* =========================
   VIEW STORE WITH PASSWORD
========================= */

function openStoreWithPassword() {

    const password = prompt("أدخلي كلمة المرور لعرض المتجر:");

    if (password === null) {
        return;
    }

    if (password === DASHBOARD_PASSWORD) {

        window.location.href = "index.html";

    } else {

        alert("كلمة المرور غير صحيحة ❌");

    }

}