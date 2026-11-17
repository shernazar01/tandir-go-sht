const CATALOG = {
  tandir: { name: 'Tandir go‘shti', price: 120000 },
  shashlik: { name: 'Shashlik', price: 80000 },
  osh: { name: 'Surxon oshi', price: 50000 },
  qiyma: { name: 'Qiyma kabob', price: 65000 },
  grill: { name: 'Gril go‘sht', price: 95000 },
  salat: { name: 'Yangi salat', price: 25000 },
  achichuk: { name: 'Achchiq-chuchuk', price: 18000 },
  shakarob: { name: 'Shakarob salati', price: 20000 },
  cola: { name: 'Coca-Cola', price: 15000 },
  fanta: { name: 'Fanta', price: 15000 },
  suv: { name: 'Mineral suv', price: 7000 },
  choy: { name: 'Ko‘k choy', price: 12000 }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Faqat POST so‘rovi qabul qilinadi' });

  const { name, phone, items, type, address, note } = req.body || {};
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 60) return res.status(400).json({ error: 'Ism noto‘g‘ri' });
  if (typeof phone !== 'string' || !/^\+?[0-9 ()-]{7,20}$/.test(phone.trim())) return res.status(400).json({ error: 'Telefon raqami noto‘g‘ri' });
  if (!Array.isArray(items) || !items.length || items.length > 30) return res.status(400).json({ error: 'Buyurtma tarkibi noto‘g‘ri' });
  if (!['delivery', 'pickup'].includes(type)) return res.status(400).json({ error: 'Buyurtma turi noto‘g‘ri' });
  if (type === 'delivery' && (typeof address !== 'string' || !address.trim() || address.trim().length > 200)) return res.status(400).json({ error: 'Yetkazib berish manzili kerak' });
  if (note != null && (typeof note !== 'string' || note.length > 500)) return res.status(400).json({ error: 'Izoh juda uzun' });

  let total = 0;
  const verifiedItems = [];
  for (const item of items) {
    const product = item && CATALOG[item.id];
    if (!product || !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 99) {
      return res.status(400).json({ error: 'Buyurtma tarkibida noto‘g‘ri mahsulot yoki miqdor bor' });
    }
    total += product.price * item.qty;
    verifiedItems.push({ ...product, id: item.id, qty: item.qty });
  }
  if (!Number.isSafeInteger(total) || total <= 0) return res.status(400).json({ error: 'Buyurtma summasi noto‘g‘ri' });

  const recipient = 'oshernazar@gmail.com';
  const money = new Intl.NumberFormat('uz-UZ').format(total);
  const products = verifiedItems.map(x => `${x.name} x ${x.qty} — ${new Intl.NumberFormat('uz-UZ').format(x.price * x.qty)} so‘m`).join('\n');
  const message = [
    'YANGI BUYURTMA — JARQO‘RG‘ON TANDIR GO‘SHTI',
    '',
    `Buyurtmachi: ${name.trim()}`,
    `Telefon: ${phone.trim()}`,
    `Buyurtma turi: ${type === 'delivery' ? 'Yetkazib berish' : 'Olib ketish'}`,
    `Manzil: ${type === 'delivery' ? address.trim() : 'Olib ketish'}`,
    '',
    'Mahsulotlar:',
    products,
    '',
    `JAMI: ${money} so‘m`,
    `Izoh: ${note?.trim() || '-'}`,
    `Vaqt: ${new Date().toISOString()}`
  ].join('\n');

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `Yangi buyurtma: ${name.trim()} — ${money} so‘m`,
        _template: 'table',
        _captcha: 'false',
        Buyurtmachi: name.trim(),
        Telefon: phone.trim(),
        'Buyurtma tafsilotlari': message
      })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === 'false' || result.success === false) {
      console.error('Email delivery failed:', response.status, result);
      return res.status(502).json({ error: 'Email yuborilmadi. Email xizmatini faollashtirishni tekshiring.' });
    }
    return res.status(200).json({ ok: true, total });
  } catch (error) {
    console.error('Order email error:', error.message);
    return res.status(502).json({ error: 'Email xizmatiga ulanib bo‘lmadi.' });
  }
}
