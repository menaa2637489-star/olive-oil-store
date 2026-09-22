/* =========================================================
   DASHBOARD PASSWORD
========================================================= */

const DASHBOARD_PASSWORD = "2026";


/* =========================================================
   PRODUCTS / PAGES
========================================================= */

const DASHBOARD_PRODUCTS = {

    home: {
        name: "الرئيسية",
        description: "تعديل بيانات الصفحة الرئيسية"
    },

    virgin: {
        name: "زيت الزيتون البكر",
        description: "تعديل بيانات زيت الزيتون البكر"
    },

    garlic: {
        name: "زيت الزيتون بالثوم",
        description: "تعديل بيانات زيت الزيتون بالثوم"
    },

    onion: {
        name: "زيت الزيتون بالبصل",
        description: "تعديل بيانات زيت الزيتون بالبصل"
    },

    vitamin: {
        name: "زيت الزيتون بفيتامين D و E",
        description: "تعديل بيانات زيت الزيتون بفيتامين D و E"
    },

    rosemary: {
        name: "زيت الزيتون بالروزماري",
        description: "تعديل بيانات زيت الزيتون بالروزماري"
    },

    frying: {
        name: "زيت الزيتون للقلي",
        description: "تعديل بيانات زيت الزيتون للقلي"
    }

};


/* المنتج المختار حاليًا */

let currentDashboardProduct =
    localStorage.getItem("currentDashboardProduct") || "home";


/* =========================================================
   LOGIN
========================================================= */

function loginDashboard() {

    const password =
        document.getElementById("dashboardPassword").value;

    const error =
        document.getElementById("loginError");


    if (password === DASHBOARD_PASSWORD) {

        document.getElementById(
            "dashboardLogin"
        ).style.display = "none";


        document.getElementById(
            "dashboardPage"
        ).style.display = "block";


        sessionStorage.setItem(
            "dashboardLoggedIn",
            "true"
        );


        error.textContent = "";


        initializeDashboard();

    } else {

        error.textContent =
            "كلمة المرور غير صحيحة";

    }

}


/* =========================================================
   AUTO LOGIN
========================================================= */

if (
    sessionStorage.getItem(
        "dashboardLoggedIn"
    ) === "true"
) {

    const login =
        document.getElementById(
            "dashboardLogin"
        );

    const dashboard =
        document.getElementById(
            "dashboardPage"
        );


    if (login) {
        login.style.display = "none";
    }


    if (dashboard) {
        dashboard.style.display = "block";
    }

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutDashboard() {

    sessionStorage.removeItem(
        "dashboardLoggedIn"
    );

    location.reload();

}


/* =========================================================
   DASHBOARD TABS
========================================================= */

function showDashboardSection(sectionId) {

    const tabs =
        document.querySelectorAll(
            ".dashboard-tab"
        );


    const sections =
        document.querySelectorAll(
            ".dashboard-section"
        );


    tabs.forEach(tab => {

        tab.classList.remove(
            "active"
        );

    });


    sections.forEach(section => {

        section.style.display =
            "none";

        section.classList.remove(
            "active-section"
        );

    });


    const section =
        document.getElementById(
            sectionId
        );


    if (section) {

        section.style.display =
            "block";

        section.classList.add(
            "active-section"
        );

    }


    tabs.forEach(tab => {

        const onclick =
            tab.getAttribute(
                "onclick"
            );


        if (
            onclick &&
            onclick.includes(
                "'" + sectionId + "'"
            )
        ) {

            tab.classList.add(
                "active"
            );

        }

    });

}


/* =========================================================
   PRODUCT SELECTOR
========================================================= */

function selectDashboardProduct(productKey) {

    if (
        !DASHBOARD_PRODUCTS[productKey]
    ) {
        return;
    }


    currentDashboardProduct =
        productKey;


    localStorage.setItem(
        "currentDashboardProduct",
        productKey
    );


    /* تحديث أزرار المنتجات */

    const buttons =
        document.querySelectorAll(
            ".product-selector-btn"
        );


    buttons.forEach(button => {

        button.classList.remove(
            "active"
        );


        if (
            button.dataset.product ===
            productKey
        ) {

            button.classList.add(
                "active"
            );

        }

    });


    /* تحديث العنوان */

    const title =
        document.getElementById(
            "selectedProductTitle"
        );


    if (title) {

        title.innerHTML = `

            <h2>
                ${DASHBOARD_PRODUCTS[productKey].name}
            </h2>

            <p>
                ${DASHBOARD_PRODUCTS[productKey].description}
            </p>

        `;

    }


    /* تحميل بيانات الصفحة */

    loadProductContent();

    loadSizesPrices();

    loadAboutUs();

}


/* =========================================================
   PRODUCT STORAGE KEY
========================================================= */

function getProductStorageKey(type) {

    return (
        "oliveOil_" +
        type +
        "_" +
        currentDashboardProduct
    );

}


/* =========================================================
   INITIALIZE DASHBOARD
========================================================= */

function initializeDashboard() {

    selectDashboardProduct(
        currentDashboardProduct
    );

    loadIdentity();

    loadReviews();

    loadSocialMedia();

    loadPaymentSettings();

    loadDashboardOrders();

}


/* =========================================================
   LOGO UPLOAD
========================================================= */

const logoInput =
    document.getElementById(
        "logoInput"
    );


if (logoInput) {

    logoInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {
                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    const preview =
                        document.getElementById(
                            "dashboardLogoPreview"
                        );


                    if (preview) {

                        preview.src =
                            event.target.result;

                    }

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   SAVE IDENTITY
========================================================= */

function saveIdentity() {

    const identity = {

        storeName:
            document.getElementById(
                "storeName"
            ).value,

        mainTitle:
            document.getElementById(
                "mainTitle"
            ).value,

        mainSubtitle:
            document.getElementById(
                "mainSubtitle"
            ).value,

        logo:
            document.getElementById(
                "dashboardLogoPreview"
            ).src

    };


    localStorage.setItem(
        "oliveOilIdentity",
        JSON.stringify(identity)
    );


    const message =
        document.getElementById(
            "identityMessage"
        );


    if (message) {

        message.textContent =
            "تم حفظ بيانات الهوية بنجاح ✓";


        setTimeout(() => {

            message.textContent = "";

        }, 2500);

    }

}


/* =========================================================
   LOAD IDENTITY
========================================================= */

function loadIdentity() {

    const saved =
        localStorage.getItem(
            "oliveOilIdentity"
        );


    if (!saved) {
        return;
    }


    let identity;


    try {

        identity =
            JSON.parse(saved);

    } catch (error) {

        return;

    }


    const storeName =
        document.getElementById(
            "storeName"
        );


    const mainTitle =
        document.getElementById(
            "mainTitle"
        );


    const mainSubtitle =
        document.getElementById(
            "mainSubtitle"
        );


    const logo =
        document.getElementById(
            "dashboardLogoPreview"
        );


    if (
        storeName &&
        identity.storeName
    ) {

        storeName.value =
            identity.storeName;

    }


    if (
        mainTitle &&
        identity.mainTitle
    ) {

        mainTitle.value =
            identity.mainTitle;

    }


    if (
        mainSubtitle &&
        identity.mainSubtitle
    ) {

        mainSubtitle.value =
            identity.mainSubtitle;

    }


    if (
        logo &&
        identity.logo
    ) {

        logo.src =
            identity.logo;

    }

}


/* =========================================================
   CONTENT CARDS
========================================================= */

function deleteContentCard(button) {

    const card =
        button.closest(
            ".content-card"
        );


    if (!card) {
        return;
    }


    card.remove();

}


/* =========================================================
   ADD CONTENT CARD
========================================================= */

function addNewContentCard() {

    const container =
        document.getElementById(
            "contentCardsContainer"
        );


    if (!container) {
        return;
    }


    const cards =
        container.querySelectorAll(
            ".content-card"
        );


    const number =
        cards.length + 1;


    const card =
        document.createElement(
            "div"
        );


    card.className =
        "content-card";


    card.innerHTML = `

        <label>
            عنوان القسم
        </label>

        <input
            type="text"
            class="content-title"
            data-content="${number}"
            placeholder="عنوان القسم">


        <label>
            محتوى القسم
        </label>

        <textarea
            class="content-text"
            data-content="${number}"
            rows="5"
            placeholder="اكتبي محتوى القسم هنا"></textarea>


        <button
            type="button"
            class="delete-card-btn"
            onclick="deleteContentCard(this)">

            حذف القسم

        </button>

    `;


    container.appendChild(
        card
    );

}


/* =========================================================
   SAVE PRODUCT CONTENT
========================================================= */

function saveContentCards() {

    const cards =
        document.querySelectorAll(
            "#contentCardsContainer .content-card"
        );


    const content = [];


    cards.forEach(card => {

        const title =
            card.querySelector(
                ".content-title"
            );


        const textarea =
            card.querySelector(
                ".content-text"
            );


        content.push({

            title:
                title
                    ? title.value
                    : "",

            text:
                textarea
                    ? textarea.value
                    : ""

        });

    });


    localStorage.setItem(
        getProductStorageKey(
            "content"
        ),
        JSON.stringify(content)
    );


    const message =
        document.getElementById(
            "contentMessage"
        );


    if (message) {

        message.textContent =
            "تم حفظ محتوى الصفحة بنجاح ✓";


        setTimeout(() => {

            message.textContent = "";

        }, 2500);

    }

}


/* =========================================================
   LOAD PRODUCT CONTENT
========================================================= */

function loadProductContent() {

    const container =
        document.getElementById(
            "contentCardsContainer"
        );


    if (!container) {
        return;
    }


    let saved =
        localStorage.getItem(
            getProductStorageKey(
                "content"
            )
        );


    /*
       نقل البيانات القديمة مرة واحدة
       إلى الصفحة الرئيسية.
    */

    if (
        !saved &&
        currentDashboardProduct === "home"
    ) {

        const oldContent =
            localStorage.getItem(
                "oliveOilContent"
            );


        if (oldContent) {

            saved =
                oldContent;


            localStorage.setItem(
                getProductStorageKey(
                    "content"
                ),
                oldContent
            );

        }

    }


    container.innerHTML = "";


    if (!saved) {

        addNewContentCard();

        addNewContentCard();

        return;

    }


    let content;


    try {

        content =
            JSON.parse(saved);

    } catch (error) {

        addNewContentCard();

        addNewContentCard();

        return;

    }


    if (
        !Array.isArray(content) ||
        content.length === 0
    ) {

        addNewContentCard();

        addNewContentCard();

        return;

    }


    content.forEach(
        (item, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "content-card";


            card.innerHTML = `

                <label>
                    عنوان القسم
                </label>

                <input
                    type="text"
                    class="content-title"
                    data-content="${index + 1}"
                    value="${escapeHTML(item.title || "")}"
                    placeholder="عنوان القسم">


                <label>
                    محتوى القسم
                </label>

                <textarea
                    class="content-text"
                    data-content="${index + 1}"
                    rows="5"
                    placeholder="اكتبي محتوى القسم هنا">${escapeHTML(item.text || "")}</textarea>


                <button
                    type="button"
                    class="delete-card-btn"
                    onclick="deleteContentCard(this)">

                    حذف القسم

                </button>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   SIZES & PRICES
========================================================= */

const sizeInputs = [
    1,
    2,
    3,
    4
];


sizeInputs.forEach(
    number => {

        const input =
            document.getElementById(
                `sizeImage${number}`
            );


        if (!input) {
            return;
        }


        input.addEventListener(
            "change",
            function () {

                const file =
                    this.files[0];


                if (!file) {
                    return;
                }


                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        const preview =
                            document.getElementById(
                                `sizeImagePreview${number}`
                            );


                        if (preview) {

                            preview.src =
                                event.target.result;

                        }

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );

    }
);


/* =========================================================
   SAVE SIZES & PRICES
========================================================= */

function saveSizesPrices() {

    const sizes = [];


    sizeInputs.forEach(
        number => {

            const nameInput =
                document.getElementById(
                    `sizeName${number}`
                );


            const priceInput =
                document.getElementById(
                    `sizePrice${number}`
                );


            const imagePreview =
                document.getElementById(
                    `sizeImagePreview${number}`
                );


            sizes.push({

                name:
                    nameInput
                        ? nameInput.value
                        : "",

                price:
                    priceInput
                        ? priceInput.value
                        : "",

                image:
                    imagePreview
                        ? imagePreview.src
                        : ""

            });

        }
    );


    localStorage.setItem(
        getProductStorageKey(
            "sizesPrices"
        ),
        JSON.stringify(sizes)
    );


    const message =
        document.getElementById(
            "sizesPricesMessage"
        );


    if (message) {

        message.textContent =
            "تم حفظ الأحجام والأسعار بنجاح ✓";


        setTimeout(() => {

            message.textContent = "";

        }, 2500);

    }

}


/* =========================================================
   LOAD SIZES & PRICES
========================================================= */

function loadSizesPrices() {

    let saved =
        localStorage.getItem(
            getProductStorageKey(
                "sizesPrices"
            )
        );


    /*
       نقل بيانات الأسعار القديمة
       إلى زيت الزيتون البكر.
    */

    if (
        !saved &&
        currentDashboardProduct === "virgin"
    ) {

        const oldSizes =
            localStorage.getItem(
                "oliveOilSizesPrices"
            );


        if (oldSizes) {

            saved =
                oldSizes;


            localStorage.setItem(
                getProductStorageKey(
                    "sizesPrices"
                ),
                oldSizes
            );

        }

    }


    /*
       تنظيف الحقول قبل التحميل.
    */

    sizeInputs.forEach(
        number => {

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


            if (nameInput) {
                nameInput.value = "";
            }


            if (priceInput) {
                priceInput.value = "";
            }


            if (preview) {
                preview.src = "";
            }

        }
    );


    if (!saved) {
        return;
    }


    let sizes;


    try {

        sizes =
            JSON.parse(saved);

    } catch (error) {

        return;

    }


    if (!Array.isArray(sizes)) {
        return;
    }


    sizes.forEach(
        (size, index) => {

            const number =
                index + 1;


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


            if (
                nameInput &&
                size.name
            ) {

                nameInput.value =
                    size.name;

            }


            if (
                priceInput &&
                size.price !== undefined
            ) {

                priceInput.value =
                    size.price;

            }


            if (
                preview &&
                size.image
            ) {

                preview.src =
                    size.image;

            }

        }
    );

}


/* =========================================================
   ABOUT US
========================================================= */

const DEFAULT_ABOUT_TITLE =
    "من نحن";


const DEFAULT_ABOUT_TEXT = `رحلة زيت زيتون دكتور ابو النصر

إحنا مش مجرد علامة تجارية بتبيع زيت، إحنا كيان بدأ من إيمان حقيقي إن "صحتك وصحة عيلتك تستاهل أنقى حاجة في الطبيعة". رحلتنا بدأت لما قررنا ندمج بين خير الأرض والأصول الزراعية، وبين أدق المعايير العلمية، عشان نوصلك "إكسير صحة" متكامل، مش مجرد مكون عادي في مطبخك.

رؤيتنا وفلسفتنا

في "أبو النصر"، هدفنا نكون همزة الوصل الموثوقة بين أجود المزارع وبين سفرتك. إحنا بنشوف زيت الزيتون كاستثمار يومي في صحة القلب، قوة المناعة، ونضارة الجسم. وعشان نحقق ده مبنقبلش بأي تنازلات في الجودة، وبنطبق معايير صارمة من أول قطف الثمرة لحد ما الزيت يوصل لباب بيتك.`;


/* =========================================================
   SAVE ABOUT US
========================================================= */

function saveAboutUs() {

    const title =
        document.getElementById(
            "aboutTitle"
        );


    const text =
        document.getElementById(
            "aboutText"
        );


    const aboutData = {

        title:
            title
                ? title.value
                : "",

        text:
            text
                ? text.value
                : ""

    };


    localStorage.setItem(
        getProductStorageKey(
            "aboutUs"
        ),
        JSON.stringify(
            aboutData
        )
    );


    const message =
        document.getElementById(
            "aboutMessage"
        );


    if (message) {

        message.textContent =
            "تم حفظ التعديلات بنجاح ✓";


        setTimeout(() => {

            message.textContent = "";

        }, 2500);

    }

}


/* =========================================================
   LOAD ABOUT US
========================================================= */

function loadAboutUs() {

    const title =
        document.getElementById(
            "aboutTitle"
        );


    const text =
        document.getElementById(
            "aboutText"
        );


    if (!title || !text) {
        return;
    }


    let saved =
        localStorage.getItem(
            getProductStorageKey(
                "aboutUs"
            )
        );


    /*
       نقل البيانات القديمة
       إلى الصفحة الرئيسية.
    */

    if (
        !saved &&
        currentDashboardProduct === "home"
    ) {

        const oldAbout =
            localStorage.getItem(
                "oliveOilAboutUs"
            );


        if (oldAbout) {

            saved =
                oldAbout;


            localStorage.setItem(
                getProductStorageKey(
                    "aboutUs"
                ),
                oldAbout
            );

        }

    }


    if (!saved) {

        title.value =
            DEFAULT_ABOUT_TITLE;


        text.value =
            DEFAULT_ABOUT_TEXT;


        return;

    }


    let aboutData;


    try {

        aboutData =
            JSON.parse(saved);

    } catch (error) {

        title.value =
            DEFAULT_ABOUT_TITLE;


        text.value =
            DEFAULT_ABOUT_TEXT;


        return;

    }


    title.value =
        aboutData.title ??
        DEFAULT_ABOUT_TITLE;


    text.value =
        aboutData.text ??
        DEFAULT_ABOUT_TEXT;

}


/* =========================================================
   DELETE ABOUT TITLE
========================================================= */

function deleteAboutTitle() {

    const confirmed =
        confirm(
            "هل تريدين حذف العنوان؟"
        );


    if (!confirmed) {
        return;
    }


    const title =
        document.getElementById(
            "aboutTitle"
        );


    if (title) {
        title.value = "";
    }

}


/* =========================================================
   DELETE ABOUT TEXT
========================================================= */

function deleteAboutText() {

    const confirmed =
        confirm(
            "هل تريدين حذف نص الشركة؟"
        );


    if (!confirmed) {
        return;
    }


    const text =
        document.getElementById(
            "aboutText"
        );


    if (text) {
        text.value = "";
    }

}


/* =========================================================
   CUSTOMER REVIEWS
========================================================= */

function setReviewRating(
    card,
    rating
) {

    const ratingInput =
        card.querySelector(
            ".review-rating"
        );


    const stars =
        card.querySelectorAll(
            ".rating-stars button"
        );


    if (ratingInput) {

        ratingInput.value =
            rating;

    }


    stars.forEach(
        star => {

            const starRating =
                Number(
                    star.dataset.rating
                );


            if (
                starRating <=
                rating
            ) {

                star.classList.add(
                    "active"
                );

            } else {

                star.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   INITIALIZE REVIEW
========================================================= */

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


    if (
        !uploadButton ||
        !imageInput ||
        !previewImage ||
        !previewBox
    ) {

        return;

    }


    const previewText =
        previewBox.querySelector(
            "span"
        );


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


            if (!file) {
                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    previewImage.src =
                        event.target.result;


                    previewImage.hidden =
                        false;


                    if (previewText) {

                        previewText.style.display =
                            "none";

                    }

                };


            reader.readAsDataURL(
                file
            );

        }
    );


    const stars =
        card.querySelectorAll(
            ".rating-stars button"
        );


    stars.forEach(
        star => {

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

        }
    );


    setReviewRating(
        card,
        Number(
            card.querySelector(
                ".review-rating"
            )?.value || 5
        )
    );

}


/* =========================================================
   ADD REVIEW
========================================================= */

function addReview() {

    const container =
        document.getElementById(
            "reviewsContainer"
        );


    if (!container) {
        return;
    }


    const card =
        document.createElement(
            "div"
        );


    card.className =
        "review-card";


    card.innerHTML = `

        <div class="review-header">

            <h3>
                تقييم عميل
            </h3>

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
            اسم العميل
        </label>


        <input
            type="text"
            class="warm-input review-name"
            placeholder="اكتب اسم العميل">


        <label>
            التقييم
        </label>


        <div class="rating-stars">

            <button
                type="button"
                data-rating="1">
                ★
            </button>

            <button
                type="button"
                data-rating="2">
                ★
            </button>

            <button
                type="button"
                data-rating="3">
                ★
            </button>

            <button
                type="button"
                data-rating="4">
                ★
            </button>

            <button
                type="button"
                data-rating="5">
                ★
            </button>

        </div>


        <input
            type="hidden"
            class="review-rating"
            value="5">


        <label>
            تعليق مختصر
        </label>


        <textarea
            class="content-textarea review-comment"
            rows="5"
            placeholder="اكتب تعليق العميل هنا..."></textarea>

    `;


    container.appendChild(
        card
    );


    initializeReview(
        card
    );

}


/* =========================================================
   DELETE REVIEW
========================================================= */

function deleteReview(button) {

    const card =
        button.closest(
            ".review-card"
        );


    if (!card) {
        return;
    }


    const confirmed =
        confirm(
            "هل تريدين حذف هذا التقييم؟"
        );


    if (!confirmed) {
        return;
    }


    card.remove();

}


/* =========================================================
   SAVE REVIEWS
========================================================= */

function saveReviews() {

    const cards =
        document.querySelectorAll(
            "#reviewsContainer .review-card"
        );


    const reviews = [];


    cards.forEach(
        card => {

            const name =
                card.querySelector(
                    ".review-name"
                );


            const comment =
                card.querySelector(
                    ".review-comment"
                );


            const rating =
                card.querySelector(
                    ".review-rating"
                );


            const image =
                card.querySelector(
                    ".review-preview-img"
                );


            reviews.push({

                name:
                    name
                        ? name.value
                        : "",

                comment:
                    comment
                        ? comment.value
                        : "",

                rating:
                    rating
                        ? Number(
                            rating.value
                        )
                        : 5,

                image:
                    image &&
                    !image.hidden
                        ? image.src
                        : ""

            });

        }
    );


    localStorage.setItem(
        "oliveOilCustomerReviews",
        JSON.stringify(
            reviews
        )
    );


    const message =
        document.getElementById(
            "reviewsMessage"
        );


    if (message) {

        message.textContent =
            "تم حفظ التقييمات بنجاح ✓";


        setTimeout(() => {

            message.textContent = "";

        }, 2500);

    }

}


/* =========================================================
   ADD SAVED REVIEW
========================================================= */

function addSavedReview(
    container,
    review
) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "review-card";


    card.innerHTML = `

        <div class="review-header">

            <h3>
                تقييم عميل
            </h3>

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
                style="${review.image ? "display:none;" : ""}">

                لم يتم اختيار صورة

            </span>


            <img
                class="review-preview-img"
                src="${review.image || ""}"
                alt="صورة تعليق العميل"
                ${review.image ? "" : "hidden"}>

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
            اسم العميل
        </label>


        <input
            type="text"
            class="warm-input review-name"
            value="${escapeHTML(review.name || "")}"
            placeholder="اكتب اسم العميل">


        <label>
            التقييم
        </label>


        <div class="rating-stars">

            <button
                type="button"
                data-rating="1">
                ★
            </button>

            <button
                type="button"
                data-rating="2">
                ★
            </button>

            <button
                type="button"
                data-rating="3">
                ★
            </button>

            <button
                type="button"
                data-rating="4">
                ★
            </button>

            <button
                type="button"
                data-rating="5">
                ★
            </button>

        </div>


        <input
            type="hidden"
            class="review-rating"
            value="${review.rating || 5}">


        <label>
            تعليق مختصر
        </label>


        <textarea
            class="content-textarea review-comment"
            rows="5"
            placeholder="اكتب تعليق العميل هنا...">${escapeHTML(review.comment || "")}</textarea>

    `;


    container.appendChild(
        card
    );


    initializeReview(
        card
    );


    setReviewRating(
        card,
        Number(
            review.rating || 5
        )
    );

}


/* =========================================================
   LOAD REVIEWS
========================================================= */

function loadReviews() {

    const saved =
        localStorage.getItem(
            "oliveOilCustomerReviews"
        );


    if (!saved) {
        return;
    }


    let reviews;


    try {

        reviews =
            JSON.parse(saved);

    } catch (error) {

        return;

    }


    const container =
        document.getElementById(
            "reviewsContainer"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    reviews.forEach(
        review => {

            addSavedReview(
                container,
                review
            );

        }
    );

}


/* =========================================================
   SOCIAL MEDIA
========================================================= */

function saveSocialMedia() {

    const socialMedia = {

        facebook:
            document.getElementById(
                "facebookLink"
            )?.value.trim() || "",

        instagram:
            document.getElementById(
                "instagramLink"
            )?.value.trim() || "",

        tiktok:
            document.getElementById(
                "tiktokLink"
            )?.value.trim() || "",

        twitter:
            document.getElementById(
                "twitterLink"
            )?.value.trim() || "",

        whatsapp:
            document.getElementById(
                "whatsappLink"
            )?.value.trim() || "",

        youtube:
            document.getElementById(
                "youtubeLink"
            )?.value.trim() || ""

    };


    localStorage.setItem(
        "oliveOilSocialMedia",
        JSON.stringify(
            socialMedia
        )
    );


    const message =
        document.getElementById(
            "socialMessage"
        );


    if (message) {

        message.textContent =
            "تم حفظ روابط السوشيال ميديا بنجاح ✓";


        setTimeout(() => {

            message.textContent = "";

        }, 2500);

    }

}


/* =========================================================
   LOAD SOCIAL MEDIA
========================================================= */

function loadSocialMedia() {

    const saved =
        localStorage.getItem(
            "oliveOilSocialMedia"
        );


    if (!saved) {
        return;
    }


    let socialMedia;


    try {

        socialMedia =
            JSON.parse(saved);

    } catch (error) {

        return;

    }


    const fields = {

        facebook:
            "facebookLink",

        instagram:
            "instagramLink",

        tiktok:
            "tiktokLink",

        twitter:
            "twitterLink",

        whatsapp:
            "whatsappLink",

        youtube:
            "youtubeLink"

    };


    Object.keys(fields).forEach(
        key => {

            const input =
                document.getElementById(
                    fields[key]
                );


            if (
                input &&
                socialMedia[key]
            ) {

                input.value =
                    socialMedia[key];

            }

        }
    );

}


/* =========================================================
   PAYMENT
========================================================= */

function savePaymentMethods() {

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

        cash:
            cash
                ? cash.checked
                : false,

        card:
            card
                ? card.checked
                : false,

        wallet:
            wallet
                ? wallet.checked
                : false

    };


    localStorage.setItem(
        "paymentMethods",
        JSON.stringify(
            paymentMethods
        )
    );


    const message =
        document.getElementById(
            "paymentMethodsSuccess"
        ) ||
        document.getElementById(
            "socialMessage"
        );


    if (message) {

        message.textContent =
            "تم حفظ طرق الدفع بنجاح ✓";


        setTimeout(() => {

            message.textContent = "";

        }, 2500);

    }

}


/* =========================================================
   KASHIER
========================================================= */

function saveKashier() {

    const merchantInput =
        document.getElementById(
            "merchantId"
        );


    const modeInput =
        document.getElementById(
            "paymentMode"
        );


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
        ) ||
        document.getElementById(
            "socialMessage"
        );


    if (message) {

        message.textContent =
            "تم حفظ إعدادات Kashier بنجاح ✓";


        setTimeout(() => {

            message.textContent = "";

        }, 2500);

    }

}


/* =========================================================
   LOAD PAYMENT SETTINGS
========================================================= */

function loadPaymentSettings() {

    const savedMethods =
        localStorage.getItem(
            "paymentMethods"
        );


    if (savedMethods) {

        let methods;


        try {

            methods =
                JSON.parse(
                    savedMethods
                );

        } catch (error) {

            methods = {};

        }


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
                !!methods.cash;
        }


        if (card) {
            card.checked =
                !!methods.card;
        }


        if (wallet) {
            wallet.checked =
                !!methods.wallet;
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


    if (
        merchantInput &&
        merchantId
    ) {

        merchantInput.value =
            merchantId;

    }


    if (
        modeInput &&
        paymentMode
    ) {

        modeInput.value =
            paymentMode;

    }

}


/* =========================================================
   ORDERS
========================================================= */

function loadDashboardOrders() {

    refreshDashboardOrders();

}


/* =========================================================
   REFRESH ORDERS FROM MYSQL API
========================================================= */

async function refreshDashboardOrders() {

    const container =
        document.getElementById(
            "ordersContainer"
        );


    const count =
        document.getElementById(
            "ordersCount"
        );


    if (!container) {
        return;
    }


    try {

        const response =
            await fetch(
                "api/orders.php"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load orders"
            );

        }


        const data =
            await response.json();


        if (
            !data.success ||
            !Array.isArray(data.orders)
        ) {

            throw new Error(
                "Invalid orders response"
            );

        }


        const orders =
            data.orders;


        /* =========================
           ORDERS COUNT
        ========================= */

        if (count) {

            count.textContent =
                orders.length + " طلب";

        }


        /* =========================
           NO ORDERS
        ========================= */

        if (
            orders.length === 0
        ) {

            container.innerHTML = `

                <div class="no-orders">

                    لا توجد طلبات حتى الآن

                </div>

            `;

            return;

        }


        /* =========================
           CLEAR CONTAINER
        ========================= */

        container.innerHTML = "";


        /* =========================
           PAYMENT NAMES
        ========================= */

        const paymentNames = {

            cash:
                "💵 الدفع عند الاستلام",

            card:
                "💳 بطاقة ائتمان / فيزا",

            wallet:
                "📱 محفظة إلكترونية"

        };


        /* =========================
           DISPLAY ORDERS
        ========================= */

        orders.forEach(
            function (order) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "order-card";


                const payment =
                    paymentNames[
                        order.payment_method
                    ] ||
                    order.payment_method ||
                    "غير محددة";


                const status =
                    order.status ||
                    "جديد";


                card.innerHTML = `

                    <div class="order-card-header">

                        <span class="order-number">

                            طلب رقم #${escapeHTML(
                                order.order_code ||
                                order.id ||
                                ""
                            )}

                        </span>


                        <span class="order-status">

                            ${escapeHTML(
                                status
                            )}

                        </span>

                    </div>


                    <div class="order-info">

                        <div>

                            <strong>
                                اسم العميل:
                            </strong>

                            ${escapeHTML(
                                order.customer_name ||
                                "غير محدد"
                            )}

                        </div>


                        <div>

                            <strong>
                                رقم الهاتف:
                            </strong>

                            ${escapeHTML(
                                order.phone ||
                                "غير محدد"
                            )}

                        </div>


                        <div>

                            <strong>
                                المحافظة:
                            </strong>

                            ${escapeHTML(
                                order.governorate ||
                                "غير محددة"
                            )}

                        </div>


                        <div>

                            <strong>
                                العنوان:
                            </strong>

                            ${escapeHTML(
                                order.address ||
                                "غير محدد"
                            )}

                        </div>


                        <div>

                            <strong>
                                طريقة الدفع:
                            </strong>

                            ${escapeHTML(
                                payment
                            )}

                        </div>


                        <div>

                            <strong>
                                التاريخ:
                            </strong>

                            ${escapeHTML(
                                order.created_at ||
                                "غير محدد"
                            )}

                        </div>


                        ${
                            order.notes

                            ?

                            `
                            <div>

                                <strong>
                                    ملاحظات:
                                </strong>

                                ${escapeHTML(
                                    order.notes
                                )}

                            </div>
                            `

                            :

                            ""
                        }

                    </div>


                    <div class="order-total">

                        الإجمالي:

                        ${escapeHTML(
                            order.total || 0
                        )}

                        جنيه

                    </div>


                    <div class="order-items">

                        <strong>
                            المنتجات:
                        </strong>

                        ${
                            Array.isArray(order.items) &&
                            order.items.length > 0

                            ?

                            order.items.map(
                                item => `

                                    <div class="order-item">

                                        ${escapeHTML(
                                            item.product_name_ar ||
                                            item.product_name_en ||
                                            "منتج"
                                        )}

                                        -

                                        ${escapeHTML(
                                            item.size_ar ||
                                            item.size_en ||
                                            ""
                                        )}

                                        ×

                                        ${escapeHTML(
                                            item.quantity ||
                                            1
                                        )}

                                    </div>

                                `
                            ).join("")

                            :

                            "<div>لا توجد منتجات</div>"
                        }

                    </div>

                `;


                container.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Orders API Error:",
            error
        );


        container.innerHTML = `

            <div class="no-orders">

                حدث خطأ أثناء تحميل الطلبات

            </div>

        `;

    }

}

/* =========================================================
   CANCEL ORDER
========================================================= */

function cancelOrder(
    orderId
) {

    const savedOrders =
        localStorage.getItem(
            "oliveOilOrders"
        );


    const orders =
        savedOrders
            ? JSON.parse(
                savedOrders
            )
            : [];


    const order =
        orders.find(
            order =>
                String(order.id) ===
                String(orderId)
        );


    if (!order) {
        return;
    }


    order.status =
        "ملغي";


    localStorage.setItem(
        "oliveOilOrders",
        JSON.stringify(
            orders
        )
    );


    refreshDashboardOrders();

}


/* =========================================================
   AUTO REFRESH ORDERS
========================================================= */

setInterval(
    function () {

        refreshDashboardOrders();

    },
    1000
);


/* =========================================================
   VIEW STORE
========================================================= */

function openStoreWithPassword() {

    const password =
        prompt(
            "أدخلي كلمة المرور لعرض المتجر:"
        );


    if (password === null) {
        return;
    }


    if (
        password ===
        DASHBOARD_PASSWORD
    ) {

        window.location.href =
            "index.html";

    } else {

        alert(
            "كلمة المرور غير صحيحة ❌"
        );

    }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

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
   INITIALIZE EXISTING REVIEWS
========================================================= */

document
    .querySelectorAll(
        ".review-card"
    )
    .forEach(
        card => {

            initializeReview(
                card
            );

        }
    );


/* =========================================================
   START DASHBOARD
========================================================= */

if (
    sessionStorage.getItem(
        "dashboardLoggedIn"
    ) === "true"
) {

    setTimeout(
        function () {

            initializeDashboard();

        },
        0
    );

}
