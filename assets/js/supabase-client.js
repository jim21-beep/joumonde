// =============================================================
// SUPABASE CLIENT – Joumonde
// =============================================================
const SUPABASE_URL  = 'https://sbxffjszderijikxarho.supabase.co';
const SUPABASE_ANON = 'sb_publishable_-oz4PzN9unCmYbUfMLHczg_AD1DcP8y';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON);
