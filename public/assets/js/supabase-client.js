// =============================================================
// SUPABASE CLIENT – Joumonde
// =============================================================
// URL/key come from window.__ENV__ (assets/js/config.js), generated at build time – never hardcoded here.
const SUPABASE_URL  = window.__ENV__?.SUPABASE_URL;
const SUPABASE_ANON = window.__ENV__?.SUPABASE_ANON_KEY;

const { createClient } = supabase;
const supabaseClient = (SUPABASE_URL && SUPABASE_ANON) ? createClient(SUPABASE_URL, SUPABASE_ANON) : null;
window.supabaseClient = supabaseClient;
