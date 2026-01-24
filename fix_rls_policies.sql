-- 1. Enable RLS on the stats tables (in case it's not fully enabled yet)
ALTER TABLE IF EXISTS site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS product_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS products ENABLE ROW LEVEL SECURITY;

-- 2. Create Policies to allow "Public Read" (SELECT)
-- This fixes the issue where stats are invisible in the dashboard.
-- Everyone (including your internal admin dashboard) connects as 'anon' by default in this app structure.

-- For Site Stats
DROP POLICY IF EXISTS "Enable read access for all users" ON site_stats;
CREATE POLICY "Enable read access for all users" ON site_stats FOR SELECT USING (true);

-- For Product Stats
DROP POLICY IF EXISTS "Enable read access for all users" ON product_stats;
CREATE POLICY "Enable read access for all users" ON product_stats FOR SELECT USING (true);

-- For Products (Catalog)
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
CREATE POLICY "Enable read access for all users" ON products FOR SELECT USING (true);


-- 3. (Optional) policies for WRITING data (Add/Edit/Delete/Update Stats)
-- NOTE: Since your app's "Admin Login" is simulated on the frontend and doesn't actually log into Supabase Auth,
-- we must allow "Public" write access for these features to work from the browser. 
-- In a production app with real users, you would restrict this to authenticated users only.

-- Allow updating Site Stats (for page visits)
DROP POLICY IF EXISTS "Enable insert/update for all users" ON site_stats;
CREATE POLICY "Enable insert/update for all users" ON site_stats FOR ALL USING (true) WITH CHECK (true);

-- Allow updating Product Stats (for views/wishlists)
DROP POLICY IF EXISTS "Enable insert/update for all users" ON product_stats;
CREATE POLICY "Enable insert/update for all users" ON product_stats FOR ALL USING (true) WITH CHECK (true);

-- Allow Admin actions on Products (Add/Edit/Delete)
DROP POLICY IF EXISTS "Enable full access for all users" ON products;
CREATE POLICY "Enable full access for all users" ON products FOR ALL USING (true) WITH CHECK (true);
