
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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Faqat POST so‘rovi qabul qilinadi' });
  }

  const {
    name,
    phone,
    items,
    type,
    address,
    note
  } = req.body || {};

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    name.trim().length > 60
  ) {
    return res.status(400).json({ error: 'Ism noto‘g‘ri' });
  }

  if (
    typeof phone !== 'string' ||
    !/^\+?[0-9 ()-]{7,20}$/.test(phone.trim())
  ) {
    return res.status(400).json({ error: 'Telefon raqami noto‘g‘ri' });
  }

  if (!Array.isArray(items) || !items.length || items.length > 30) {
    return res.status(400).json({ error: 'Buyurtma tarkibi noto‘g‘ri' });
  }

  if (!['delivery', 'pickup'].includes(type)) {
    return res.status(400).json({ error: 'Buyurtma turi noto‘g‘ri' });
  }

  if (
    type === 'delivery' &&
    (typeof address !== 'string' || !address.trim() || address.trim().length > 200)
  ) {
    return res.status(400).json({ error: 'Manzilni kiriting' });
  }

  if (note != null && (typeof note !== 'string' || note.length > 500)) {
    return res.status(400).json({ error: 'Izoh juda uzun' });
  }

  let total = 0;
  const verifiedItems = [];

  for (const item of items) {
    const product = item && CATALOG[item.id];

    if (
      !product ||
      !Number.isInteger(item.qty) ||
      item.qty < 1 ||
      item.qty > 99
    ) {
      return res.status(400).json({
        error: 'Mahsulot yoki miqdor noto‘g‘ri'
      });
    }

    total += product.price * item.qty;

    verifiedItems.push({
      id: item.id,
      name: product.name,
      price: product.price,
      qty: item.qty
    });
  }

  if (!Number.isSafeInteger(total) || total <= 0) {
    return res.status(400).json({ error: 'Buyurtma summasi noto‘g‘ri' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase environment variables are missing');
    return res.status(500).json({
      error: 'Server sozlamalari to‘liq emas'
    });
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/orders`,
      {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify({
          customer_name: name.trim(),
          phone: phone.trim(),
          address: type === 'delivery' ? address.trim() : null,
          order_type: type,
          products: verifiedItems,
          total,
          note: note?.trim() || '',
          status: 'new'
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase error:', errorText);

      return res.status(502).json({
        error: 'Buyurtmani bazaga saqlashda xatolik yuz berdi'
      });
    }

    const savedOrder = await response.json();

    return res.status(200).json({
      ok: true,
      order: savedOrder[0],
      total
    });

  } catch (error) {
    console.error('Order error:', error);

    return res.status(500).json({
      error: 'Serverda xatolik yuz berdi'
    });
  }
}
