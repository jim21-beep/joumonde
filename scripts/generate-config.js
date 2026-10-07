// Generates public/assets/js/config.js from environment variables at build/deploy time.
// Only the browser-safe publishable/anon key belongs in frontend configuration.
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('[generate-config] SUPABASE_URL / SUPABASE_ANON_KEY not set – frontend Supabase client will be disabled.');
}

const outPath = path.join(__dirname, '..', 'public', 'assets', 'js', 'config.js');
const content = `// AUTO-GENERATED at build time by scripts/generate-config.js – do not edit or commit.
window.__ENV__ = {
    SUPABASE_URL: ${JSON.stringify(SUPABASE_URL)},
    SUPABASE_ANON_KEY: ${JSON.stringify(SUPABASE_ANON_KEY)}
};
`;

fs.writeFileSync(outPath, content);
console.log(`[generate-config] wrote ${outPath}`);
