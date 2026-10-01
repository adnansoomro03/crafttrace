-- CRAFTTRACE: Digital Provenance & Authentication Platform
-- Supabase PostgreSQL Database Schema
-- Production Ready with Row Level Security (RLS)

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE craft_type AS ENUM ('Ajrak', 'Ralli', 'Sindhi Embroidery', 'Block Printing', 'Other');
CREATE TYPE verification_status AS ENUM ('verified', 'unverified', 'suspicious');

-- 3. ARTISANS TABLE
CREATE TABLE IF NOT EXISTS public.artisans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    village VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    province VARCHAR(100) DEFAULT 'Sindh',
    craft_type craft_type NOT NULL,
    experience_years INT DEFAULT 5,
    cooperative VARCHAR(255),
    verified BOOLEAN DEFAULT false,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. PRODUCTS TABLE (Digital Identity Registry)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. AJ-2026-00125
    artisan_id UUID REFERENCES public.artisans(id) ON DELETE SET NULL,
    craft_type craft_type NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    technique VARCHAR(255) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    production_date VARCHAR(50),
    production_time VARCHAR(100),
    price_estimate VARCHAR(50),
    status verification_status DEFAULT 'unverified',
    description TEXT,
    craft_story TEXT,
    image_url TEXT,
    process_images TEXT[], -- array of photographic proof URLs
    materials TEXT,
    dimensions VARCHAR(100),
    batch_number VARCHAR(100),
    export_grade VARCHAR(100),
    verified_by VARCHAR(255),
    suspicious_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. SCANS TABLE (Anti-fraud and Provenance Tracking)
CREATE TABLE IF NOT EXISTS public.scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) REFERENCES public.products(product_id) ON DELETE CASCADE,
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    location_name VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Pakistan',
    device_type VARCHAR(100),
    ip_hash VARCHAR(64), -- Hashed for privacy
    result verification_status NOT NULL,
    is_anomalous BOOLEAN DEFAULT false
);

-- 6. MIDDLEMEN TABLE (Transparent Supply Chain Participants)
CREATE TABLE IF NOT EXISTS public.middlemen (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    hub_location VARCHAR(255) NOT NULL,
    artisans_supported INT DEFAULT 0,
    advance_payments_issued VARCHAR(100),
    verified BOOLEAN DEFAULT true,
    role_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. EXPORTERS TABLE
CREATE TABLE IF NOT EXISTS public.exporters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    headquarters VARCHAR(255),
    verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. PRODUCT VERIFICATION LOGS
CREATE TABLE IF NOT EXISTS public.verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(50) REFERENCES public.products(product_id) ON DELETE CASCADE,
    verified_by VARCHAR(255) NOT NULL,
    verification_type VARCHAR(100), -- Guild Inspection, Physical Sample Audit, Exporter Review
    previous_status verification_status,
    new_status verification_status NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. INDEXES FOR PERFORMANCE & SCAN LOOKUPS
CREATE INDEX IF NOT EXISTS idx_products_product_id ON public.products(product_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_scans_product_id ON public.scans(product_id);
CREATE INDEX IF NOT EXISTS idx_scans_timestamp ON public.scans(scanned_at);

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

-- Anyone can read products for public verification (zero barrier for buyers)
CREATE POLICY "Public products verification read" 
ON public.products FOR SELECT 
USING (true);

-- Anyone can insert a public scan log (buyer verification scan)
CREATE POLICY "Public scan logging" 
ON public.scans FOR INSERT 
WITH CHECK (true);
