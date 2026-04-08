-- P005 Garma AI Database Schema
-- Run this in PostgreSQL

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Users table
CREATE TABLE IF NOT EXISTS p005_users (
    id SERIAL PRIMARY KEY,
    whatsapp_phone VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100),
    rank VARCHAR(20) CHECK (rank IN ('pioneer', 'platinum', 'founders')),
    garma_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversations table
CREATE TABLE IF NOT EXISTS p005_conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES p005_users(id),
    message TEXT NOT NULL,
    response TEXT,
    intent VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS p005_products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    price_hkd DECIMAL(10,2),
    pv INTEGER,
    category VARCHAR(50),
    description TEXT,
    embedding vector(1536),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents table (for RAG)
CREATE TABLE IF NOT EXISTS p005_documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50),
    embedding vector(1536),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS p005_orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES p005_users(id),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    items JSONB,
    total_hkd DECIMAL(10,2),
    total_pv INTEGER,
    status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit logs
CREATE TABLE IF NOT EXISTS p005_audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    action VARCHAR(100),
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO p005_users (whatsapp_phone, name, rank, garma_id) VALUES
('+85212345678', 'Test User', 'pioneer', 'GARMA001'),
('+85298765432', 'VIP User', 'platinum', 'GARMA002'),
('+85255555555', 'Admin User', 'founders', 'GARMA003');

INSERT INTO p005_products (sku, name, price_hkd, pv, category, description) VALUES
('AB-001', 'NutriWise 高級蛋白質粉', 458, 150, '營養保健品', '優質蛋白質補充品'),
('AB-002', 'BodyKey 體重管理套裝', 1288, 420, '體重管理', '全方位體重管理方案'),
('AB-003', 'Glister 口腔護理系列', 328, 100, '個人護理', '專業口腔護理產品'),
('AB-004', 'XS Energy 運動飲品', 45, 12, '營養保健品', '運動能量飲品'),
('AB-005', 'Artistry 護膚套装', 1588, 520, '護膚品', '高端護膚系列');

INSERT INTO p005_documents (title, content, category) VALUES
('獎金制度說明', 'Pioneer: 3% PV, Platinum: 6% PV + 領袖獎金, Founders: 9% PV + 團隊獎金', 'bonus'),
('新直銷商入職指南', '歡迎加入！請先了解產品、獎金制度同市場推廣策略。', 'onboarding'),
('產品退換貨政策', '產品若有品質問題，可於 30 天內憑發票退換。', 'policy'),
('常見問題FAQ', 'Q: 如何訂貨？ A: 透過 WhatsApp 聯繫 AI 助手即可。', 'faq');
