// CraftTrace Supabase Integration Guide & Optional Client
// In MVP mode, storageService.js provides instant local persistence without setup blockers.
// To connect to a live Supabase project in production, configure your .env variables:
// VITE_SUPABASE_URL=https://your-project.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-key

/* 
How to activate Supabase:
1. Run: npm install @supabase/supabase-js
2. Uncomment the initialization code below
3. Run the SQL schema found in /supabase/schema.sql in your Supabase SQL editor!
*/

export const isSupabaseConfigured = () => {
  return Boolean(
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_ANON_KEY &&
    !import.meta.env.VITE_SUPABASE_URL.includes("your-project")
  );
};

export const getSupabaseConfigStatus = () => {
  return {
    configured: isSupabaseConfigured(),
    mode: isSupabaseConfigured() ? "Cloud Supabase DB" : "Fast Local Provenance Store (Zero Config)",
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || "Not set (Using LocalStorage mock)",
  };
};
