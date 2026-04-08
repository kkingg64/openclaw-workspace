-- P005 AI Butler Database Schema
-- PostgreSQL + pgvector
-- Run this after PostgreSQL is set up

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Users Table
CREATE TABLE IF NOT EXISTS p005_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    whatsapp_phone VARCHAR(20) UNIQUE NOT NULL,
    whatsapp_name VARCHAR(100),
    garma_id VARCHAR(50),
    rank VARCHAR(20) CHECK (rank IN ('pioneer', 'platinum', 'founders')) DEFAULT 'pioneer',
    status VARCHAR(20) DEFAULT 'active',
    referrer_id UUID REFERENCES p005_users(id),
    team_size INTEGER DEFAULT 0,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Conversations Table
CREATE TABLE IF NOT EXISTS p005_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES p005_users(id),
    wa_message_id VARCHAR(100),
    direction VARCHAR(10) CHECK (direction IN ('inbound', 'outbound')),
    message_type VARCHAR(20),
    content TEXT,
    media_url VARCHAR(500),
    ai_response BOOLEAN DEFAULT false,
    rag_source JSONB,
    tokens_used INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Products Table
CREATE TABLE IF NOT EXISTS p005_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(50) UNIQUE NOT NULL,
    name_zh VARCHAR(200),
    name_en VARCHAR(200),
    category VARCHAR(50),
    subcategory VARCHAR(50),
    description TEXT,
    price_hkd DECIMAL(10,2),
    pv DECIMAL(10,2),
    commission_rate DECIMAL(5,2),
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    image_url VARCHAR(500),
    document_urls JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Documents Table (for RAG)
CREATE TABLE IF NOT EXISTS p005_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200),
    doc_type VARCHAR(20),
    file_url VARCHAR(500),
    file_type VARCHAR(20),
    file_size_mb DECIMAL(10,2),
    embedding_status VARCHAR(20) DEFAULT 'pending',
    chunk_count INTEGER DEFAULT 0,
    version VARCHAR(20),
    min_rank_required VARCHAR(20),
    uploaded_by UUID,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Document Embeddings (pgvector)
CREATE TABLE IF NOT EXISTS p005_document_embeddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES p005_documents(id),
    chunk_text TEXT,
    embedding vector(1536),
    page_number INTEGER,
    chunk_index INTEGER
);

-- Create index for vector similarity search
CREATE INDEX IF NOT EXISTS idx_embeddings_cosine 
ON p005_document_embeddings 
USING ivfflat (embedding vector_cosine_ops);

-- Orders Table
CREATE TABLE IF NOT EXISTS p005_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID REFERENCES p005_users(id),
    status VARCHAR(20) DEFAULT 'pending',
    total_pv DECIMAL(10,2),
    total_amount_hkd DECIMAL(10,2),
    shipping_address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE IF NOT EXISTS p005_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    action VARCHAR(50),
    resource_type VARCHAR(50),
    resource_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON p005_users(whatsapp_phone);
CREATE INDEX IF NOT EXISTS idx_users_garma_id ON p005_users(garma_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON p005_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON p005_conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_products_sku ON p005_products(sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON p005_products(category);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON p005_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON p005_orders(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON p005_audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON p005_audit_logs(created_at);

-- Insert sample data for testing
INSERT INTO p005_users (whatsapp_phone, whatsapp_name, garma_id, rank) 
VALUES 
    ('+85212345678', '測試用戶', 'G001', 'pioneer'),
    ('+85298765432', ' Platinum會員', 'G002', 'platinum')
ON CONFLICT (whatsapp_phone) DO NOTHING;

-- Insert sample products
INSERT INTO p005_products (sku, name_zh, name_en, category, price_hkd, pv) VALUES
    ('NRG-001', '紐崔萊®活力能量套裝', 'Nutrilite® Energy Bundle', '營養保健品', 1280.00, 120),
    ('NRG-002', '紐崔萊®維生素C片', 'Nutrilite® Vitamin C', '營養保健品', 328.00, 30),
    ('NRG-003', '紐崔萊®深海魚油丸', 'Nutrilite® Double Omega', '營養保健品', 458.00, 42),
    ('SKN-001', 'ARTISTRY®護膚品套裝', 'ARTISTRY® Skincare Set', '護膚品', 1880.00, 180),
    ('SKN-002', 'ARTISTRY®緊緻精華', 'ARTISTRY® Firming Serum', '護膚品', 890.00, 85)
ON CONFLICT (sku) DO NOTHING;

-- Grant permissions (adjust as needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO garma_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO garma_user;

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_p005_users_updated_at BEFORE UPDATE ON p005_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_p005_orders_updated_at BEFORE UPDATE ON p005_orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

SELECT 'P005 Database Schema initialized successfully!' AS status;
