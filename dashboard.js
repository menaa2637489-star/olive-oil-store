/* =========================================================
   DR. ABU EL NASR OLIVE OIL
   DASHBOARD JAVASCRIPT
========================================================= */


/* =========================================================
   DASHBOARD PASSWORD
========================================================= */

const DASHBOARD_PASSWORD = "2026";


/* =========================================================
   DEFAULT PRODUCTS
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


/* =========================================================
   LOAD CUSTOM PRODUCTS
========================================================= */

function getCustomProducts() {

    try {

        return JSON.parse(
            localStorage.getItem("oliveOilCustomProducts") || "{}"
        );

    } catch (error) {

        return {};

    }

}


function getAllDashboardProducts() {

    return {
        ...DASHBOARD_PRODUCTS,
        ...getCustomProducts()
    };

}


/* =========================================================
   CURRENT PRODUCT
========================================================= */

let currentDashboardProduct =
    localStorage.getItem("currentDashboardProduct") || "home";


/* =========================================================
   LOGIN
========================================================= */

function loginDashboard() {

    const passwordInput =
        document.getElementById("dashboardPassword");

    const error =
        document.getElementById("loginError");

    const password =
        passwordInput
            ? passwordInput.value
            : "";


    if (password === DASHBOARD_PASSWORD) {

        const login =
            document.getElementById("dashboardLogin");

        const dashboard =
            document.getElementById("dashboardPage");


        if (login) {
            login.style.display = "none";
        }


        if (dashboard) {
            dashboard.style.display = "block";
        }


        sessionStorage.setItem(
            "dashboardLoggedIn",
            "true"
        );


        if (error) {
            error.textContent = "";
        }


        initializeDashboard();

    } else {

        if (error) {

            error.textContent =
                "كلمة المرور غير صحيحة";

        }

    }

}


/* =========================================================
   ENTER KEY LOGIN
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            document.activeElement?.id === "dashboardPassword"
        ) {

            loginDashboard();

        }

    }
);


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
   AUTO LOGIN
========================================================= */

function checkDashboardLogin() {

    if (
        sessionStorage.getItem(
            "dashboardLoggedIn"
        ) !== "true"
    ) {

        return;

    }


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


    initializeDashboard();

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


    tabs.forEach(
        tab => {

            tab.classList.remove("active");

        }
    );


    sections.forEach(
        section => {

            section.style.display = "none";

            section.classList.remove(
                "active-section"
            );

        }
    );


    const section =
        document.getElementById(sectionId);


    if (section) {

        section.style.display = "block";

        section.classList.add(
            "active-section"
        );

    }


    tabs.forEach(
        tab => {

            const onclick =
                tab.getAttribute("onclick");


            if (
                onclick &&
                onclick.includes(
                    "'" + sectionId + "'"
                )
            ) {

                tab.classList.add("active");

            }

        }
    );

}


/* =========================================================
   PRODUCT SELECTOR
========================================================= */

function selectDashboardProduct(productKey) {

    const products =
        getAllDashboardProducts();


    if (!products[productKey]) {
        return;
    }


    currentDashboardProduct =
        productKey;


    localStorage.setItem(
        "currentDashboardProduct",
        productKey
    );


    updateProductSelector();

    updateSelectedProductTitle();

    loadProductData();

}


/* =========================================================
   UPDATE PRODUCT BUTTONS
========================================================= */

function updateProductSelector() {

    const products =
        getAllDashboardProducts();


    const selector =
        document.querySelector(
            ".product-selector"
        );


    if (!selector) {
        return;
    }


    /*
       الأزرار الأصلية تظل موجودة.
       نضيف المنتجات الجديدة فقط.
    */

    Object.keys(products).forEach(
        key => {

            if (
                document.querySelector(
                    `.product-selector-btn[data-product="${key}"]`
                )
            ) {

                return;

            }


            const button =
                document.createElement("button");


            button.type = "button";

            button.className =
                "product-selector-btn";


            button.dataset.product =
                key;


            button.textContent =
                products[key].name;


            button.onclick =
                function () {

                    selectDashboardProduct(key);

                };


            const addButton =
                document.getElementById(
                    "add-new-product"
                );


            if (addButton) {

                selector.insertBefore(
                    button,
                    addButton
                );

            } else {

                selector.appendChild(
                    button
                );

            }

        }
    );


    const buttons =
        selector.querySelectorAll(
            ".product-selector-btn"
        );


    buttons.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.product ===
                currentDashboardProduct
            );

        }
    );

}


/* =========================================================
   UPDATE SELECTED PRODUCT TITLE
========================================================= */

function updateSelectedProductTitle() {

    const title =
        document.getElementById(
            "selectedProductTitle"
        );


    if (!title) {
        return;
    }


    const products =
        getAllDashboardProducts();


    const product =
        products[currentDashboardProduct];


    if (!product) {
        return;
    }


    title.innerHTML = `

        <h2>
            ${escapeHTML(product.name)}
        </h2>

        <p>
            ${escapeHTML(product.description || "")}
        </p>

    `;

}


/* =========================================================
   STORAGE
========================================================= */

function getProductStorageKey(type) {

    return (
        "oliveOil_" +
        type +
        "_" +
        currentDashboardProduct
    );

}


function saveProductData(
    type,
    data
) {

    localStorage.setItem(
        getProductStorageKey(type),
        JSON.stringify(data)
    );

}


function getProductData(type) {

    try {

        return JSON.parse(
            localStorage.getItem(
                getProductStorageKey(type)
            ) || "null"
        );

    } catch (error) {

        return null;

    }

}


/* =========================================================
   INITIALIZE DASHBOARD
========================================================= */

function initializeDashboard() {

    updateProductSelector();

    updateSelectedProductTitle();

    loadIdentity();

    loadProductContent();

    loadSizesPrices();

    loadAboutUs();

    loadReviews();

    loadSocialMedia();

    loadPaymentSettings();

    loadDashboardOrders();

    initializeExistingImageInputs();

}


/* =========================================================
   LOAD PRODUCT DATA
========================================================= */

function loadProductData() {

    loadProductContent();

    loadSizesPrices();

    loadAboutUs();

}


/* =========================================================
   IDENTITY
========================================================= */

function saveIdentity() {

    const identity = {

        storeNameAr:
            document.getElementById(
                "storeNameAr"
            )?.value.trim() || "",

        mainTitleAr:
            document.getElementById(
                "mainTitleAr"
            )?.value.trim() || "",

        mainSubtitleAr:
            document.getElementById(
                "mainSubtitleAr"
            )?.value.trim() || "",

        storeNameEn:
            document.getElementById(
                "storeNameEn"
            )?.value.trim() || "",

        mainTitleEn:
            document.getElementById(
                "mainTitleEn"
            )?.value.trim() || "",

        mainSubtitleEn:
            document.getElementById(
                "mainSubtitleEn"
            )?.value.trim() || "",

        logo:
            document.getElementById(
                "dashboardLogoPreview"
            )?.src || ""

    };


    localStorage.setItem(
        "oliveOilIdentity",
        JSON.stringify(identity)
    );


    showMessage(
        "identityMessage",
        "تم حفظ بيانات الهوية بنجاح ✓"
    );

}


function loadIdentity() {

    let identity;


    try {

        identity =
            JSON.parse(
                localStorage.getItem(
                    "oliveOilIdentity"
                ) || "null"
            );

    } catch (error) {

        identity = null;

    }


    if (!identity) {
        return;
    }


    setValue(
        "storeNameAr",
        identity.storeNameAr
    );

    setValue(
        "mainTitleAr",
        identity.mainTitleAr
    );

    setValue(
        "mainSubtitleAr",
        identity.mainSubtitleAr
    );

    setValue(
        "storeNameEn",
        identity.storeNameEn
    );

    setValue(
        "mainTitleEn",
        identity.mainTitleEn
    );

    setValue(
        "mainSubtitleEn",
        identity.mainSubtitleEn
    );


    const logo =
        document.getElementById(
            "dashboardLogoPreview"
        );


    if (
        logo &&
        identity.logo
    ) {

        logo.src =
            identity.logo;

    }

}


/* =========================================================
   LOGO PREVIEW
========================================================= */

function initializeLogoInput() {

    const input =
        document.getElementById(
            "logoInput"
        );


    if (!input || input.dataset.initialized) {
        return;
    }


    input.dataset.initialized = "true";


    input.addEventListener(
        "change",
        function () {

            const file =
                this.files?.[0];


            if (!file) {
                return;
            }


            readFileAsDataURL(
                file,
                function (src) {

                    const preview =
                        document.getElementById(
                            "dashboardLogoPreview"
                        );


                    if (preview) {
                        preview.src = src;
                    }

                }
            );

        }
    );

}


/* =========================================================
   PAGE TITLE + MAIN IMAGE
========================================================= */

function initializePageMainImage() {

    const input =
        document.getElementById(
            "pageMainImage"
        );


    if (!input || input.dataset.initialized) {
        return;
    }


    input.dataset.initialized =
        "true";


    input.addEventListener(
        "change",
        function () {

            const file =
                this.files?.[0];


            if (!file) {
                return;
            }


            readFileAsDataURL(
                file,
                function (src) {

                    const preview =
                        document.getElementById(
                            "pageMainImagePreview"
                        );


                    if (preview) {
                        preview.src = src;
                    }

                }
            );

        }
    );

}


/* =========================================================
   SAVE PAGE CONTENT
========================================================= */

function saveContentCards() {

    const data = {

        pageTitleAr:
            document.getElementById(
                "pageTitleAr"
            )?.value.trim() || "",

        pageTitleEn:
            document.getElementById(
                "pageTitleEn"
            )?.value.trim() || "",

        mainImage:
            document.getElementById(
                "pageMainImagePreview"
            )?.src || "",

        cards: []

    };


    const cards =
        document.querySelectorAll(
            "#contentCardsContainer .content-card"
        );


    cards.forEach(
        card => {

            data.cards.push({

                titleAr:
                    card.querySelector(
                        ".content-title-ar"
                    )?.value || "",

                titleEn:
                    card.querySelector(
                        ".content-title-en"
                    )?.value || "",

                textAr:
                    card.querySelector(
                        ".content-text-ar"
                    )?.value || "",

                textEn:
                    card.querySelector(
                        ".content-text-en"
                    )?.value || "",

                image:
                    card.querySelector(
                        ".content-image-preview"
                    )?.src || ""

            });

        }
    );


    saveProductData(
        "content",
        data
    );


    showMessage(
        "contentMessage",
        "تم حفظ محتوى الصفحة بنجاح ✓"
    );

}


/* =========================================================
   LOAD PAGE CONTENT
========================================================= */

function loadProductContent() {

    const container =
        document.getElementById(
            "contentCardsContainer"
        );


    if (!container) {
        return;
    }


    let data =
        getProductData("content");


    /*
       دعم البيانات القديمة.
    */

    if (
        !data &&
        currentDashboardProduct === "home"
    ) {

        const oldContent =
            localStorage.getItem(
                "oliveOilContent"
            );


        if (oldContent) {

            try {

                const old =
                    JSON.parse(oldContent);


                data = {

                    pageTitleAr: "",
                    pageTitleEn: "",
                    mainImage: "",
                    cards: Array.isArray(old)
                        ? old.map(item => ({
                            titleAr:
                                item.title || "",
                            titleEn: "",
                            textAr:
                                item.text || "",
                            textEn: "",
                            image: ""
                        }))
                        : []

                };


                saveProductData(
                    "content",
                    data
                );

            } catch (error) {

                data = null;

            }

        }

    }


    setValue(
        "pageTitleAr",
        data?.pageTitleAr || ""
    );

    setValue(
        "pageTitleEn",
        data?.pageTitleEn || ""
    );


    const mainImagePreview =
        document.getElementById(
            "pageMainImagePreview"
        );


    if (mainImagePreview) {

        mainImagePreview.src =
            data?.mainImage || "";

    }


    container.innerHTML = "";


    if (
        !data ||
        !Array.isArray(data.cards) ||
        data.cards.length === 0
    ) {

        addNewContentCard();

        return;

    }


    data.cards.forEach(
        cardData => {

            createContentCard(
                cardData
            );

        }
    );

}


/* =========================================================
   CREATE CONTENT CARD
========================================================= */

function createContentCard(
    data = {}
) {

    const container =
        document.getElementById(
            "contentCardsContainer"
        );


    if (!container) {
        return;
    }


    const card =
        document.createElement("div");


    card.className =
        "content-card";


    card.innerHTML = `

        <div class="content-card-header">

            <h3>
                قسم الصفحة
            </h3>

            <button
                type="button"
                class="delete-card-btn"
                onclick="deleteContentCard(this)">

                حذف القسم

            </button>

        </div>


        <label>
            عنوان القسم بالعربي
        </label>

        <input
            type="text"
            class="content-title-ar"
            value="${escapeHTML(data.titleAr || "")}"
            placeholder="عنوان القسم بالعربي">


        <label>
            Section Title - English
        </label>

        <input
            type="text"
            class="content-title-en"
            value="${escapeHTML(data.titleEn || "")}"
            placeholder="Section title in English">


        <label>
            محتوى القسم بالعربي
        </label>

        <textarea
            class="content-text-ar"
            rows="5"
            placeholder="اكتبي محتوى القسم بالعربي">${escapeHTML(data.textAr || "")}</textarea>


        <label>
            Section Content - English
        </label>

        <textarea
            class="content-text-en"
            rows="5"
            placeholder="Write section content in English">${escapeHTML(data.textEn || "")}</textarea>


        <label>
            صورة القسم
        </label>

        <input
            type="file"
            class="content-image"
            accept="image/png,image/jpeg,image/webp">


        <img
            class="content-image-preview"
            src="${data.image || ""}"
            alt="صورة القسم"
            ${data.image ? "" : "hidden"}>

    `;


    container.appendChild(card);


    initializeContentImageInput(card);

}


/* =========================================================
   ADD CONTENT CARD
========================================================= */

function addNewContentCard() {

    createContentCard();

}


/* =========================================================
   DELETE CONTENT CARD
========================================================= */

function deleteContentCard(button) {

    const card =
        button.closest(
            ".content-card"
        );


    if (!card) {
        return;
    }


    const confirmed =
        confirm(
            "هل تريدين حذف هذا القسم؟"
        );


    if (!confirmed) {
        return;
    }


    card.remove();

}


/* =========================================================
   CONTENT IMAGE
========================================================= */

function initializeContentImageInput(card) {

    const input =
        card.querySelector(
            ".content-image"
        );


    if (!input || input.dataset.initialized) {
        return;
    }


    input.dataset.initialized =
        "true";


    input.addEventListener(
        "change",
        function () {

            const file =
                this.files?.[0];


            if (!file) {
                return;
            }


            readFileAsDataURL(
                file,
                function (src) {

                    const preview =
                        card.querySelector(
                            ".content-image-preview"
                        );


                    if (preview) {

                        preview.src =
                            src;

                        preview.hidden =
                            false;

                    }

                }
            );

        }
    );

}


/* =========================================================
   SIZES & PRICES
========================================================= */

const SIZE_COUNT = 4;


/* =========================================================
   SIZE IMAGE INPUTS
========================================================= */

function initializeSizeInputs() {

    for (
        let number = 1;
        number <= SIZE_COUNT;
        number++
    ) {

        const input =
            document.getElementById(
                `sizeImage${number}`
            );


        if (
            !input ||
            input.dataset.initialized
        ) {
            continue;
        }


        input.dataset.initialized =
            "true";


        input.addEventListener(
            "change",
            function () {

                const file =
                    this.files?.[0];


                if (!file) {
                    return;
                }


                readFileAsDataURL(
                    file,
                    function (src) {

                        const preview =
                            document.getElementById(
                                `sizeImagePreview${number}`
                            );


                        if (preview) {

                            preview.src =
                                src;

                        }

                    }
                );

            }
        );

    }

}


/* =========================================================
   SAVE SIZES & PRICES
========================================================= */

function saveSizesPrices() {

    const sizes = [];


    for (
        let number = 1;
        number <= SIZE_COUNT;
        number++
    ) {

        const size = {

            nameAr:
                document.getElementById(
                    `sizeNameAr${number}`
                )?.value.trim() || "",

            nameEn:
                document.getElementById(
                    `sizeNameEn${number}`
                )?.value.trim() || "",

            price:
                document.getElementById(
                    `sizePrice${number}`
                )?.value.trim() || "",

            image:
                document.getElementById(
                    `sizeImagePreview${number}`
                )?.src || ""

        };


        /*
           نحفظ الكارت حتى لو بعض الحقول فاضية.
        */

        if (
            size.nameAr ||
            size.nameEn ||
            size.price ||
            size.image
        ) {

            sizes.push(size);

        }

    }


    saveProductData(
        "sizesPrices",
        sizes
    );


    showMessage(
        "sizesPricesMessage",
        "تم حفظ الأحجام والأسعار بنجاح ✓"
    );

}


/* =========================================================
   LOAD SIZES & PRICES
========================================================= */

function loadSizesPrices() {

    initializeSizeInputs();


    const saved =
        getProductData(
            "sizesPrices"
        );


    /*
       تنظيف الحقول.
    */

    for (
        let number = 1;
        number <= SIZE_COUNT;
        number++
    ) {

        setValue(
            `sizeNameAr${number}`,
            ""
        );

        setValue(
            `sizeNameEn${number}`,
            ""
        );

        setValue(
            `sizePrice${number}`,
            ""
        );


        const preview =
            document.getElementById(
                `sizeImagePreview${number}`
            );


        if (preview) {
            preview.src = "";
        }

    }


    if (!saved) {
        return;
    }


    /*
       دعم النظام القديم
       name -> nameAr
    */

    const sizes =
        Array.isArray(saved)
            ? saved
            : [];


    sizes.forEach(
        (size, index) => {

            const number =
                index + 1;


            if (
                number >
                SIZE_COUNT
            ) {
                return;
            }


            setValue(
                `sizeNameAr${number}`,
                size.nameAr ||
                size.name ||
                ""
            );


            setValue(
                `sizeNameEn${number}`,
                size.nameEn ||
                ""
            );


            setValue(
                `sizePrice${number}`,
                size.price ||
                ""
            );


            const preview =
                document.getElementById(
                    `sizeImagePreview${number}`
                );


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

const DEFAULT_ABOUT_TITLE_AR =
    "من نحن";


const DEFAULT_ABOUT_TITLE_EN =
    "About Us";


const DEFAULT_ABOUT_TEXT_AR = `رحلة زيت زيتون دكتور ابو النصر

إحنا مش مجرد علامة تجارية بتبيع زيت، إحنا كيان بدأ من إيمان حقيقي إن صحتك وصحة عيلتك تستاهل أنقى حاجة في الطبيعة.

رحلتنا بدأت لما قررنا ندمج بين خير الأرض والأصول الزراعية، وبين أدق المعايير العلمية، عشان نوصلك زيت زيتون عالي الجودة، مش مجرد مكون عادي في مطبخك.`;


const DEFAULT_ABOUT_TEXT_EN = `The Journey of Dr. Abu El Nasr Olive Oil

We are more than just a brand that sells olive oil. We started with a genuine belief that you and your family's health deserve the best that nature has to offer.

Our journey combines the goodness of the land and agricultural heritage with strict quality standards to bring you high-quality olive oil for your everyday life.`;


/* =========================================================
   SAVE ABOUT US
========================================================= */

function saveAboutUs() {

    const aboutData = {

        titleAr:
            document.getElementById(
                "aboutTitleAr"
            )?.value.trim() || "",

        titleEn:
            document.getElementById(
                "aboutTitleEn"
            )?.value.trim() || "",

        textAr:
            document.getElementById(
                "aboutTextAr"
            )?.value || "",

        textEn:
            document.getElementById(
                "aboutTextEn"
            )?.value || "",

        image:
            document.getElementById(
                "aboutImagePreview"
            )?.src || ""

    };


    saveProductData(
        "aboutUs",
        aboutData
    );


    showMessage(
        "aboutMessage",
        "تم حفظ بيانات من نحن بنجاح ✓"
    );

}


/* =========================================================
   LOAD ABOUT US
========================================================= */

function loadAboutUs() {

    let saved =
        getProductData(
            "aboutUs"
        );


    /*
       دعم البيانات القديمة.
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

            try {

                const old =
                    JSON.parse(oldAbout);


                saved = {

                    titleAr:
                        old.title || "",

                    titleEn:
                        "",

                    textAr:
                        old.text || "",

                    textEn:
                        "",

                    image:
                        ""

                };


                saveProductData(
                    "aboutUs",
                    saved
                );

            } catch (error) {

                saved = null;

            }

        }

    }


    setValue(
        "aboutTitleAr",
        saved?.titleAr ||
        DEFAULT_ABOUT_TITLE_AR
    );


    setValue(
        "aboutTitleEn",
        saved?.titleEn ||
        DEFAULT_ABOUT_TITLE_EN
    );


    setValue(
        "aboutTextAr",
        saved?.textAr ||
        DEFAULT_ABOUT_TEXT_AR
    );


    setValue(
        "aboutTextEn",
        saved?.textEn ||
        DEFAULT_ABOUT_TEXT_EN
    );


    const preview =
        document.getElementById(
            "aboutImagePreview"
        );


    if (preview) {

        preview.src =
            saved?.image || "";

    }

}


/* =========================================================
   ABOUT IMAGE
========================================================= */

function initializeAboutImage() {

    const input =
        document.getElementById(
            "aboutImage"
        );


    if (
        !input ||
        input.dataset.initialized
    ) {
        return;
    }


    input.dataset.initialized =
        "true";


    input.addEventListener(
        "change",
        function () {

            const file =
                this.files?.[0];


            if (!file) {
                return;
            }


            readFileAsDataURL(
                file,
                function (src) {

                    const preview =
                        document.getElementById(
                            "aboutImagePreview"
                        );


                    if (preview) {

                        preview.src =
                            src;

                    }

                }
            );

        }
    );

}


/* =========================================================
   DELETE ABOUT TITLE
========================================================= */

function deleteAboutTitle() {

    if (
        !confirm(
            "هل تريدين حذف العنوان؟"
        )
    ) {
        return;
    }


    setValue(
        "aboutTitleAr",
        ""
    );

    setValue(
        "aboutTitleEn",
        ""
    );

}


/* =========================================================
   DELETE ABOUT TEXT
========================================================= */

function deleteAboutText() {

    if (
        !confirm(
            "هل تريدين حذف نص من نحن؟"
        )
    ) {
        return;
    }


    setValue(
        "aboutTextAr",
        ""
    );

    setValue(
        "aboutTextEn",
        ""
    );

}


/* =========================================================
   REVIEWS
========================================================= */

function createReviewCard(
    review = {}
) {

    const card =
        document.createElement("div");


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
                style="${
                    review.image
                        ? "display:none;"
                        : ""
                }">

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
            اسم العميل بالعربي
        </label>


        <input
            type="text"
            class="review-name-ar"
            value="${escapeHTML(
                review.nameAr || review.name || ""
            )}"
            placeholder="اسم العميل بالعربي">


        <label>
            Customer Name - English
        </label>


        <input
            type="text"
            class="review-name-en"
            value="${escapeHTML(
                review.nameEn || ""
            )}"
            placeholder="Customer name in English">


        <label>
            التقييم
        </label>


        <div class="rating-stars">

            ${[1,2,3,4,5].map(
                rating => `
                    <button
                        type="button"
                        data-rating="${rating}">
                        ★
                    </button>
                `
            ).join("")}

        </div>


        <input
            type="hidden"
            class="review-rating"
            value="${review.rating || 5}">


        <label>
            تعليق العميل بالعربي
        </label>


        <textarea
            class="review-comment-ar"
            rows="5"
            placeholder="اكتب تعليق العميل بالعربي">${escapeHTML(
                review.commentAr ||
                review.comment ||
                ""
            )}</textarea>


        <label>
            Customer Comment - English
        </label>


        <textarea
            class="review-comment-en"
            rows="5"
            placeholder="Write customer comment in English">${escapeHTML(
                review.commentEn ||
                ""
            )}</textarea>

    `;


    initializeReview(card);


    return card;

}


/* =========================================================
   INITIALIZE REVIEW
========================================================= */

function initializeReview(card) {

    if (!card) {
        return;
    }


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
        uploadButton &&
        imageInput
    ) {

        if (
            !uploadButton.dataset.initialized
        ) {

            uploadButton.dataset.initialized =
                "true";


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
                        this.files?.[0];


                    if (!file) {
                        return;
                    }


                    readFileAsDataURL(
                        file,
                        function (src) {

                            if (previewImage) {

                                previewImage.src =
                                    src;

                                previewImage.hidden =
                                    false;

                            }


                            const text =
                                previewBox?.querySelector(
                                    "span"
                                );


                            if (text) {
                                text.style.display =
                                    "none";
                            }

                        }
                    );

                }
            );

        }

    }


    const stars =
        card.querySelectorAll(
            ".rating-stars button"
        );


    stars.forEach(
        star => {

            if (
                star.dataset.initialized
            ) {
                return;
            }


            star.dataset.initialized =
                "true";


            star.addEventListener(
                "click",
                function () {

                    setReviewRating(
                        card,
                        Number(
                            this.dataset.rating
                        )
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
   SET REVIEW RATING
========================================================= */

function setReviewRating(
    card,
    rating
) {

    const input =
        card.querySelector(
            ".review-rating"
        );


    if (input) {
        input.value = rating;
    }


    const stars =
        card.querySelectorAll(
            ".rating-stars button"
        );


    stars.forEach(
        star => {

            const starRating =
                Number(
                    star.dataset.rating
                );


            star.classList.toggle(
                "active",
                starRating <= rating
            );

        }
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


    container.appendChild(
        createReviewCard()
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


    if (
        !confirm(
            "هل تريدين حذف هذا التقييم؟"
        )
    ) {
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

            reviews.push({

                nameAr:
                    card.querySelector(
                        ".review-name-ar"
                    )?.value || "",

                nameEn:
                    card.querySelector(
                        ".review-name-en"
                    )?.value || "",

                rating:
                    Number(
                        card.querySelector(
                            ".review-rating"
                        )?.value || 5
                    ),

                commentAr:
                    card.querySelector(
                        ".review-comment-ar"
                    )?.value || "",

                commentEn:
                    card.querySelector(
                        ".review-comment-en"
                    )?.value || "",

                image:
                    card.querySelector(
                        ".review-preview-img"
                    )?.hidden
                        ? ""
                        : (
                            card.querySelector(
                                ".review-preview-img"
                            )?.src || ""
                        )

            });

        }
    );


    localStorage.setItem(
        "oliveOilCustomerReviews",
        JSON.stringify(reviews)
    );


    showMessage(
        "reviewsMessage",
        "تم حفظ التقييمات بنجاح ✓"
    );

}


/* =========================================================
   LOAD REVIEWS
========================================================= */

function loadReviews() {

    const container =
        document.getElementById(
            "reviewsContainer"
        );


    if (!container) {
        return;
    }


    let reviews;


    try {

        reviews =
            JSON.parse(
                localStorage.getItem(
                    "oliveOilCustomerReviews"
                ) || "[]"
            );

    } catch (error) {

        reviews = [];

    }


    container.innerHTML = "";


    reviews.forEach(
        review => {

            container.appendChild(
                createReviewCard(
                    review
                )
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
            getValue("facebookLink"),

        instagram:
            getValue("instagramLink"),

        tiktok:
            getValue("tiktokLink"),

        twitter:
            getValue("twitterLink"),

        whatsapp:
            getValue("whatsappLink"),

        youtube:
            getValue("youtubeLink")

    };


    localStorage.setItem(
        "oliveOilSocialMedia",
        JSON.stringify(
            socialMedia
        )
    );


    showMessage(
        "socialMessage",
        "تم حفظ روابط السوشيال ميديا بنجاح ✓"
    );

}


/* =========================================================
   LOAD SOCIAL MEDIA
========================================================= */

function loadSocialMedia() {

    let data;


    try {

        data =
            JSON.parse(
                localStorage.getItem(
                    "oliveOilSocialMedia"
                ) || "{}"
            );

    } catch (error) {

        data = {};

    }


    setValue(
        "facebookLink",
        data.facebook || ""
    );

    setValue(
        "instagramLink",
        data.instagram || ""
    );

    setValue(
        "tiktokLink",
        data.tiktok || ""
    );

    setValue(
        "twitterLink",
        data.twitter || ""
    );

    setValue(
        "whatsappLink",
        data.whatsapp || ""
    );

    setValue(
        "youtubeLink",
        data.youtube || ""
    );

}


/* =========================================================
   PAYMENT METHODS
========================================================= */

function savePaymentMethods() {

    const paymentMethods = {

        cash:
            document.querySelector(
                '[data-payment="cash"]'
            )?.checked || false,

        card:
            document.querySelector(
                '[data-payment="card"]'
            )?.checked || false,

        wallet:
            document.querySelector(
                '[data-payment="wallet"]'
            )?.checked || false

    };


    localStorage.setItem(
        "paymentMethods",
        JSON.stringify(
            paymentMethods
        )
    );


    showMessage(
        "paymentMethodsSuccess",
        "تم حفظ طرق الدفع بنجاح ✓"
    );

}


/* =========================================================
   KASHIER
========================================================= */

function saveKashier() {

    localStorage.setItem(
        "kashierMerchantId",
        getValue("merchantId")
    );


    localStorage.setItem(
        "kashierMode",
        getValue("paymentMode") || "test"
    );


    showMessage(
        "kashierSuccess",
        "تم حفظ إعدادات Kashier بنجاح ✓"
    );

}


/* =========================================================
   LOAD PAYMENT SETTINGS
========================================================= */

function loadPaymentSettings() {

    let methods;


    try {

        methods =
            JSON.parse(
                localStorage.getItem(
                    "paymentMethods"
                ) || "{}"
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


    setValue(
        "merchantId",
        localStorage.getItem(
            "kashierMerchantId"
        ) || ""
    );


    setValue(
        "paymentMode",
        localStorage.getItem(
            "kashierMode"
        ) || "test"
    );

}


/* =========================================================
   ADD NEW PRODUCT MODAL
========================================================= */

function openAddProductModal() {

    const modal =
        document.getElementById(
            "addProductModal"
        );


    if (!modal) {
        return;
    }


    modal.style.display =
        "flex";


    document.body.classList.add(
        "modal-open"
    );


    clearNewProductForm();

}


function closeAddProductModal() {

    const modal =
        document.getElementById(
            "addProductModal"
        );


    if (!modal) {
        return;
    }


    modal.style.display =
        "none";


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   CLEAR NEW PRODUCT FORM
========================================================= */

function clearNewProductForm() {

    const ids = [

        "newProductNameAr",
        "newProductNameEn",
        "newProductDescriptionAr",
        "newProductDescriptionEn",
        "newProductPageTitleAr",
        "newProductPageTitleEn",
        "newProductPageContentAr",
        "newProductPageContentEn"

    ];


    ids.forEach(
        id => {

            setValue(
                id,
                ""
            );

        }
    );


    const mainImage =
        document.getElementById(
            "newProductMainImage"
        );


    if (mainImage) {
        mainImage.value = "";
    }


    const gallery =
        document.getElementById(
            "newProductGallery"
        );


    if (gallery) {
        gallery.value = "";
    }


    const mainPreview =
        document.getElementById(
            "newProductMainImagePreview"
        );


    if (mainPreview) {

        mainPreview.src = "";

        mainPreview.hidden = true;

    }


    const galleryPreview =
        document.getElementById(
            "newProductGalleryPreview"
        );


    if (galleryPreview) {
        galleryPreview.innerHTML = "";
    }


    const sizesContainer =
        document.getElementById(
            "newProductSizesContainer"
        );


    if (sizesContainer) {

        sizesContainer.innerHTML = "";

        addNewProductSize();

    }

}


/* =========================================================
   NEW PRODUCT MAIN IMAGE
========================================================= */

function initializeNewProductImages() {

    const mainImage =
        document.getElementById(
            "newProductMainImage"
        );


    if (
        mainImage &&
        !mainImage.dataset.initialized
    ) {

        mainImage.dataset.initialized =
            "true";


        mainImage.addEventListener(
            "change",
            function () {

                const file =
                    this.files?.[0];


                if (!file) {
                    return;
                }


                readFileAsDataURL(
                    file,
                    function (src) {

                        const preview =
                            document.getElementById(
                                "newProductMainImagePreview"
                            );


                        if (preview) {

                            preview.src =
                                src;

                            preview.hidden =
                                false;

                        }

                    }
                );

            }
        );

    }


    const gallery =
        document.getElementById(
            "newProductGallery"
        );


    if (
        gallery &&
        !gallery.dataset.initialized
    ) {

        gallery.dataset.initialized =
            "true";


        gallery.addEventListener(
            "change",
            function () {

                previewGalleryImages(
                    this.files
                );

            }
        );

    }

}


/* =========================================================
   GALLERY PREVIEW
========================================================= */

function previewGalleryImages(files) {

    const container =
        document.getElementById(
            "newProductGalleryPreview"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    Array.from(files || []).forEach(
        file => {

            readFileAsDataURL(
                file,
                function (src) {

                    const image =
                        document.createElement(
                            "img"
                        );


                    image.src =
                        src;


                    image.alt =
                        "صورة المنتج";


                    container.appendChild(
                        image
                    );

                }
            );

        }
    );

}


/* =========================================================
   ADD NEW PRODUCT SIZE
========================================================= */

function addNewProductSize() {

    const container =
        document.getElementById(
            "newProductSizesContainer"
        );


    if (!container) {
        return;
    }


    const cards =
        container.querySelectorAll(
            ".new-product-size-card"
        );


    const number =
        cards.length + 1;


    const card =
        document.createElement("div");


    card.className =
        "new-product-size-card";


    card.innerHTML = `

        <div class="new-product-size-header">

            <h4>
                الحجم ${number}
            </h4>

            <button
                type="button"
                class="delete-btn"
                onclick="removeNewProductSize(this)">

                حذف

            </button>

        </div>


        <label>
            اسم الحجم بالعربي
        </label>

        <input
            type="text"
            class="new-size-name-ar"
            placeholder="مثال: نصف لتر">


        <label>
            Size Name - English
        </label>

        <input
            type="text"
            class="new-size-name-en"
            placeholder="Example: 500 ML">


        <label>
            السعر
        </label>

        <input
            type="number"
            class="new-size-price"
            min="0"
            placeholder="السعر">


        <label>
            صورة الحجم
        </label>

        <input
            type="file"
            class="new-size-image"
            accept="image/png,image/jpeg,image/webp">


        <img
            class="new-size-image-preview"
            alt="صورة الحجم"
            hidden>

    `;


    container.appendChild(
        card
    );


    initializeNewSizeImage(
        card
    );

}


/* =========================================================
   NEW SIZE IMAGE
========================================================= */

function initializeNewSizeImage(card) {

    const input =
        card.querySelector(
            ".new-size-image"
        );


    if (!input) {
        return;
    }


    input.addEventListener(
        "change",
        function () {

            const file =
                this.files?.[0];


            if (!file) {
                return;
            }


            readFileAsDataURL(
                file,
                function (src) {

                    const preview =
                        card.querySelector(
                            ".new-size-image-preview"
                        );


                    if (preview) {

                        preview.src =
                            src;

                        preview.hidden =
                            false;

                    }

                }
            );

        }
    );

}


/* =========================================================
   REMOVE NEW PRODUCT SIZE
========================================================= */

function removeNewProductSize(button) {

    const card =
        button.closest(
            ".new-product-size-card"
        );


    if (!card) {
        return;
    }


    const container =
        document.getElementById(
            "newProductSizesContainer"
        );


    if (
        container &&
        container.querySelectorAll(
            ".new-product-size-card"
        ).length <= 1
    ) {

        alert(
            "يجب أن يحتوي المنتج على حجم واحد على الأقل."
        );

        return;

    }


    card.remove();


    updateNewProductSizeNumbers();

}


/* =========================================================
   UPDATE NEW SIZE NUMBERS
========================================================= */

function updateNewProductSizeNumbers() {

    const cards =
        document.querySelectorAll(
            "#newProductSizesContainer .new-product-size-card"
        );


    cards.forEach(
        (card, index) => {

            const title =
                card.querySelector(
                    "h4"
                );


            if (title) {

                title.textContent =
                    "الحجم " + (index + 1);

            }

        }
    );

}


/* =========================================================
   SAVE NEW PRODUCT
========================================================= */

function saveNewProduct() {

    const nameAr =
        getValue(
            "newProductNameAr"
        );

    const nameEn =
        getValue(
            "newProductNameEn"
        );


    if (!nameAr || !nameEn) {

        alert(
            "من فضلك اكتبي اسم المنتج بالعربي والإنجليزي."
        );

        return;

    }


    const productId =
        createProductId(
            nameEn || nameAr
        );


    const product = {

        id:
            productId,

        nameAr:
            nameAr,

        nameEn:
            nameEn,

        descriptionAr:
            getValue(
                "newProductDescriptionAr"
            ),

        descriptionEn:
            getValue(
                "newProductDescriptionEn"
            ),

        pageTitleAr:
            getValue(
                "newProductPageTitleAr"
            ),

        pageTitleEn:
            getValue(
                "newProductPageTitleEn"
            ),

        pageContentAr:
            getValue(
                "newProductPageContentAr"
            ),

        pageContentEn:
            getValue(
                "newProductPageContentEn"
            ),

        mainImage:
            document.getElementById(
                "newProductMainImagePreview"
            )?.src || "",

        gallery:
            collectGalleryImages(),

        sizes:
            collectNewProductSizes(),

        createdAt:
            new Date().toISOString()

    };


    const products =
        getCustomProducts();


    products[productId] = {

        name:
            nameAr,

        description:
            "تعديل بيانات " + nameAr

    };


    localStorage.setItem(
        "oliveOilCustomProducts",
        JSON.stringify(products)
    );


    localStorage.setItem(
        "oliveOil_newProduct_" + productId,
        JSON.stringify(product)
    );


    /*
       إنشاء بيانات المحتوى
       والأحجام للمنتج الجديد.
    */

    localStorage.setItem(
        "oliveOil_content_" + productId,
        JSON.stringify({

            pageTitleAr:
                product.pageTitleAr,

            pageTitleEn:
                product.pageTitleEn,

            mainImage:
                product.mainImage,

            cards: [

                {

                    titleAr:
                        product.nameAr,

                    titleEn:
                        product.nameEn,

                    textAr:
                        product.pageContentAr,

                    textEn:
                        product.pageContentEn,

                    image:
                        product.mainImage

                }

            ]

        })
    );


    localStorage.setItem(
        "oliveOil_sizesPrices_" + productId,
        JSON.stringify(
            product.sizes
        )
    );


    closeAddProductModal();


    updateProductSelector();


    selectDashboardProduct(
        productId
    );


    alert(
        "تم إضافة المنتج الجديد بنجاح ✓"
    );

}


/* =========================================================
   COLLECT NEW PRODUCT SIZES
========================================================= */

function collectNewProductSizes() {

    const cards =
        document.querySelectorAll(
            "#newProductSizesContainer .new-product-size-card"
        );


    const sizes = [];


    cards.forEach(
        card => {

            sizes.push({

                nameAr:
                    card.querySelector(
                        ".new-size-name-ar"
                    )?.value.trim() || "",

                nameEn:
                    card.querySelector(
                        ".new-size-name-en"
                    )?.value.trim() || "",

                price:
                    card.querySelector(
                        ".new-size-price"
                    )?.value.trim() || "",

                image:
                    card.querySelector(
                        ".new-size-image-preview"
                    )?.src || ""

            });

        }
    );


    return sizes;

}


/* =========================================================
   COLLECT GALLERY IMAGES
========================================================= */

function collectGalleryImages() {

    const preview =
        document.getElementById(
            "newProductGalleryPreview"
        );


    if (!preview) {
        return [];
    }


    return Array.from(
        preview.querySelectorAll("img")
    ).map(
        image => image.src
    );

}


/* =========================================================
   CREATE PRODUCT ID
========================================================= */

function createProductId(name) {

    let id =
        String(name)
            .toLowerCase()
            .trim()
            .replace(
                /[^a-z0-9\u0600-\u06ff]+/gi,
                "-"
            )
            .replace(
                /^-+|-+$/g,
                ""
            );


    if (!id) {

        id =
            "product-" +
            Date.now();

    }


    const products =
        getAllDashboardProducts();


    let finalId =
        id;


    let counter = 2;


    while (products[finalId]) {

        finalId =
            id + "-" + counter;

        counter++;

    }


    return finalId;

}


/* =========================================================
   ORDERS
========================================================= */

function loadDashboardOrders() {

    refreshDashboardOrders();

}


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


        if (count) {

            count.textContent =
                orders.length + " طلب";

        }


        if (orders.length === 0) {

            container.innerHTML = `

                <div class="no-orders">

                    لا توجد طلبات حتى الآن

                </div>

            `;

            return;

        }


        container.innerHTML = "";


        const paymentNames = {

            cash:
                "الدفع عند الاستلام",

            card:
                "بطاقة ائتمان / فيزا",

            wallet:
                "محفظة إلكترونية"

        };


        orders.forEach(
            order => {

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

                            طلب رقم #

                            ${escapeHTML(
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
                                العن
