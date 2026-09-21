CREATE DATABASE IF NOT EXISTS olive_oil_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE olive_oil_db;


/* =========================
   ADMINS
========================= */

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/* =========================
   PRODUCTS
========================= */

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,

    slug VARCHAR(100) NOT NULL UNIQUE,

    name_ar VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,

    type_ar VARCHAR(255),
    type_en VARCHAR(255),

    hero_title_ar VARCHAR(255),
    hero_title_en VARCHAR(255),

    season_ar VARCHAR(255),
    season_en VARCHAR(255),

    main_image VARCHAR(500),

    active TINYINT(1) DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


/* =========================
   PRODUCT SIZES
========================= */

CREATE TABLE product_sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,

    product_id INT NOT NULL,

    size_key VARCHAR(50) NOT NULL,

    size_ar VARCHAR(100) NOT NULL,
    size_en VARCHAR(100) NOT NULL,

    price DECIMAL(10,2) DEFAULT 0,

    image VARCHAR(500),

    active TINYINT(1) DEFAULT 1,

    sort_order INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);


/* =========================
   SITE SETTINGS
========================= */

CREATE TABLE site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,

    setting_key VARCHAR(100) NOT NULL UNIQUE,

    value_ar TEXT,
    value_en TEXT,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


/* =========================
   ABOUT US
========================= */

CREATE TABLE about_us (
    id INT AUTO_INCREMENT PRIMARY KEY,

    title_ar VARCHAR(255),
    title_en VARCHAR(255),

    subtitle_ar VARCHAR(255),
    subtitle_en VARCHAR(255),

    content_ar TEXT,
    content_en TEXT,

    image VARCHAR(500),

    active TINYINT(1) DEFAULT 1,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


/* =========================
   FAQ
========================= */

CREATE TABLE faq (
    id INT AUTO_INCREMENT PRIMARY KEY,

    product_id INT NULL,

    question_ar VARCHAR(500) NOT NULL,
    question_en VARCHAR(500) NOT NULL,

    answer_ar TEXT NOT NULL,
    answer_en TEXT NOT NULL,

    sort_order INT DEFAULT 0,

    active TINYINT(1) DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);


/* =========================
   QUALITY CARDS
========================= */

CREATE TABLE quality_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,

    product_id INT NULL,

    icon VARCHAR(255),

    title_ar VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,

    text_ar TEXT,
    text_en TEXT,

    sort_order INT DEFAULT 0,

    active TINYINT(1) DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);


/* =========================
   CUSTOMER REVIEWS
========================= */

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,

    customer_name VARCHAR(255) NOT NULL,

    review_ar TEXT NOT NULL,
    review_en TEXT,

    rating TINYINT DEFAULT 5,

    approved TINYINT(1) DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/* =========================
   SOCIAL MEDIA
========================= */

CREATE TABLE social_media (
    id INT AUTO_INCREMENT PRIMARY KEY,

    platform VARCHAR(100) NOT NULL UNIQUE,

    url VARCHAR(1000),

    active TINYINT(1) DEFAULT 1,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


/* =========================
   PAYMENT METHODS
========================= */

CREATE TABLE payment_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,

    method_key VARCHAR(100) NOT NULL UNIQUE,

    name_ar VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,

    active TINYINT(1) DEFAULT 1,

    config_json JSON NULL,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


/* =========================
   ORDERS
========================= */

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,

    order_code VARCHAR(100) NOT NULL UNIQUE,

    customer_name VARCHAR(255) NOT NULL,

    phone VARCHAR(50) NOT NULL,

    governorate VARCHAR(255) NOT NULL,

    address TEXT NOT NULL,

    notes TEXT,

    payment_method VARCHAR(100) NOT NULL,

    total DECIMAL(10,2) NOT NULL DEFAULT 0,

    status VARCHAR(100) NOT NULL DEFAULT 'جديد',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


/* =========================
   ORDER ITEMS
========================= */

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL,

    product_id INT NULL,

    size_id INT NULL,

    product_name_ar VARCHAR(255) NOT NULL,
    product_name_en VARCHAR(255),

    size_ar VARCHAR(100),
    size_en VARCHAR(100),

    price DECIMAL(10,2) NOT NULL DEFAULT 0,

    quantity INT NOT NULL DEFAULT 1,

    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,

    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE SET NULL,

    FOREIGN KEY (size_id)
        REFERENCES product_sizes(id)
        ON DELETE SET NULL
);
