const MAX_NAME = 60;
const MAX_TEXT = 600;
const TABLE = 'customer_reviews';

function config(res) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    res.status(503).json({
      code: 'SUPABASE_ENV_MISSING',
      error: 'Fikrlar bazasi ulanmagan: Vercel sozlamalarida SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY kiritilmagan.'
    });
    return null;
  }
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url.trim())) {
    res.status(503).json({ code: 'SUPABASE_URL_INVALID', error: 'SUPABASE_URL noto‘g‘ri. Supabase Project URL manzilini tekshiring.' });
    return null;
  }
  return { url: url.trim().replace(/\/$/, ''), key: key.trim() };
}

async function supabaseRequest(cfg, path, options = {}) {
  return fetch(`${cfg.url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: cfg.key,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
}

export default async function handler(req, res) {
  const cfg = config(res);
  if (!cfg) return;

  if (req.method === 'GET') {
    try {
      const response = await supabaseRequest(cfg, `${TABLE}?select=id,name,text,rating,created_at&order=created_at.desc&limit=50`);
      if (!response.ok) {
        const detail = await response.text();
        console.error('Supabase reviews GET:', response.status, detail);
        if (response.status === 404 || /customer_reviews|PGRST205|42P01/i.test(detail)) {
          return res.status(503).json({ code: 'REVIEWS_TABLE_MISSING', error: 'Supabase bazasida customer_reviews jadvali topilmadi. supabase/reviews.sql faylini SQL Editor orqali ishga tushiring.' });
        }
        if (response.status === 401 || response.status === 403) {
          return res.status(503).json({ code: 'SUPABASE_KEY_INVALID', error: 'Supabase kaliti noto‘g‘ri yoki ruxsat yetarli emas. Vercel Environment Variables sozlamalarini tekshiring.' });
        }
        throw new Error(`Supabase HTTP ${response.status}`);
      }
      const reviews = await response.json();
      return res.status(200).json({ reviews });
    } catch (error) {
      console.error('Reviews read failed:', error.message);
      return res.status(502).json({ code: 'REVIEWS_READ_FAILED', error: 'Fikrlarni yuklab bo‘lmadi. Vercel Function Logs orqali sababini tekshiring.' });
    }
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const text = typeof body.text === 'string' ? body.text.trim() : '';
    const rating = Number(body.rating);
    if (!name || name.length > MAX_NAME) return res.status(400).json({ error: 'Ism 1–60 belgi bo‘lishi kerak.' });
    if (!text || text.length > MAX_TEXT) return res.status(400).json({ error: 'Fikr 1–600 belgi bo‘lishi kerak.' });
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return res.status(400).json({ error: 'Baho 1 dan 5 gacha bo‘lishi kerak.' });

    try {
      const response = await supabaseRequest(cfg, `${TABLE}?select=id,name,text,rating,created_at`, {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify({ name, text, rating })
      });
      if (!response.ok) {
        const detail = await response.text();
        console.error('Supabase reviews POST:', response.status, detail);
        if (response.status === 404 || /customer_reviews|PGRST205|42P01/i.test(detail)) {
          return res.status(503).json({ code: 'REVIEWS_TABLE_MISSING', error: 'Supabase bazasida customer_reviews jadvali topilmadi. supabase/reviews.sql faylini SQL Editor orqali ishga tushiring.' });
        }
        if (response.status === 401 || response.status === 403) {
          return res.status(503).json({ code: 'SUPABASE_KEY_INVALID', error: 'Supabase kaliti noto‘g‘ri yoki ruxsat yetarli emas. Vercel Environment Variables sozlamalarini tekshiring.' });
        }
        throw new Error(`Supabase HTTP ${response.status}`);
      }
      const rows = await response.json();
      return res.status(201).json({ review: rows[0] });
    } catch (error) {
      console.error('Review save failed:', error.message);
      return res.status(502).json({ code: 'REVIEW_SAVE_FAILED', error: 'Fikrni bazaga yozib bo‘lmadi. Vercel Function Logs orqali Supabase xatosini tekshiring.' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}
