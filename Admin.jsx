import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import './admin.css';

const ADMIN_ID = '7cec38b5-4892-43e0-b20c-db7cdada1d9f';

const statuses = {
  new: 'Yangi',
  accepted: 'Qabul qilindi',
  preparing: 'Tayyorlanmoqda',
  ready: 'Tayyor',
  delivered: 'Yetkazildi',
  cancelled: 'Bekor qilindi'
};

export default function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('oshernazar@gmail.com');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError('Buyurtmalarni yuklashda xatolik: ' + error.message);
      return;
    }

    setOrders(data || []);
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const current = data.session;

      if (current?.user.id === ADMIN_ID) {
        setSession(current);
        await loadOrders();
      } else if (current) {
        await supabase.auth.signOut();
      }

      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, current) => {
        if (current?.user.id === ADMIN_ID) {
          setSession(current);
        } else {
          setSession(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function login(e) {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setError('Kirish amalga oshmadi: ' + error.message);
      return;
    }

    if (data.user.id !== ADMIN_ID) {
      await supabase.auth.signOut();
      setError('Bu hisob admin uchun ruxsatga ega emas.');
      return;
    }

    setSession(data.session);
    await loadOrders();
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);

    if (error) {
      setError('Holatni o‘zgartirib bo‘lmadi: ' + error.message);
      return;
    }

    await loadOrders();
  }

  async function logout() {
    await supabase.auth.signOut();
    setSession(null);
    setOrders([]);
  }

  if (loading) {
    return <div className="admin-page">Yuklanmoqda...</div>;
  }

  if (!session) {
    return (
      <main className="admin-page">
        <form className="admin-login" onSubmit={login}>
          <h1>TANDIR ADMIN</h1>
          <p>Admin panelga kirish</p>

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Parol"
            required
          />

          <button type="submit">Kirish</button>
          {error && <p className="admin-error">{error}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <h1>TANDIR ADMIN</h1>
        <button onClick={logout}>Chiqish</button>
      </header>

      <h2>Buyurtmalar ({orders.length})</h2>
      <button onClick={loadOrders}>Yangilash</button>

      {error && <p className="admin-error">{error}</p>}

      {orders.length === 0 && <p>Hozircha buyurtmalar yo‘q.</p>}

      <section className="admin-orders">
        {orders.map(order => (
          <article className="admin-order" key={order.id}>
            <h3>{order.customer_name}</h3>
            <p>Telefon: {order.phone}</p>
            <p>Manzil: {order.address || 'Olib ketish'}</p>
            <p>Jami: {Number(order.total).toLocaleString('uz-UZ')} so‘m</p>
            <p>Izoh: {order.note || 'Yo‘q'}</p>
            <p>Sana: {new Date(order.created_at).toLocaleString('uz-UZ')}</p>

            <h4>Mahsulotlar</h4>
            <ul>
              {(Array.isArray(order.products) ? order.products : []).map((item, index) => (
                <li key={index}>
                  {item.name || item.title || item.id} × {item.qty || item.quantity || 1}
                </li>
              ))}
            </ul>

            <label>Buyurtma holati</label>
            <select
              value={order.status}
              onChange={e => updateStatus(order.id, e.target.value)}
            >
              {Object.entries(statuses).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <div className="admin-actions">
              <a href={`tel:${order.phone}`}>Qo‘ng‘iroq</a>
              <a href={`sms:${order.phone}`}>SMS</a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
