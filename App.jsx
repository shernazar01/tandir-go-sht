
import { useEffect, useState } from 'react';
import './App.css';

const translations = {
  uz: {
    home:'Bosh sahifa', about:'Biz haqimizda', menu:'Menyu', gallery:'Galereya', contact:'Aloqa',
    order:'Buyurtma berish', hero:'Jarqo‘rg‘on Tandir Go‘shti',
    tagline:'Surxondaryoning haqiqiy milliy ta’mi. An’anaviy tandirda mehr bilan tayyorlangan mazali taomlar.',
    aboutTitle:'Haqiqiy Jarqo‘rg‘on tandir ta’mi',
    aboutText:'Milliy taomlarimiz an’anaviy usulda, sifatli masalliqlar va mehr bilan tayyorlanadi. Sizni oilaviy dasturxon va unutilmas ta’m kutadi.',
    menuTitle:'Mazali taomlarimiz', menuSub:'Menyudan tanlang va buyurtma bering',
    add:'Savatga qo‘shish', galleryTitle:'Taomlarimizga bir nazar', contactTitle:'Buyurtma va aloqa',
    name:'Ismingiz', phone:'Telefon raqamingiz', address:'Yetkazib berish manzili',
    note:'Izoh (ixtiyoriy)', send:'Buyurtmani yuborish', cart:'Sizning savatingiz',
    total:'Jami', empty:'Savatingiz hozircha bo‘sh.', delivery:'Yetkazib berish',
    pickup:'Olib ketish', choose:'Buyurtma turini tanlang', map:'Bizni xaritadan toping',
    hours:'Har kuni 09:00–23:00', sent:'Buyurtma qabul qilindi! Tez orada siz bilan bog‘lanamiz.',
    quantity:'Soni', close:'Yopish', foodCategory:'Taomlar', saladCategory:'Salatlar',
    drinkCategory:'Ichimliklar', heroEyebrow:'SURXONDARYONING MILLIY TA’MI',
    tagTandir:'Tandir', tagShashlik:'Shashlik', tagNational:'Milliy ta’m',
    aboutEyebrow:'BIZ HAQIMIZDA', aboutAlt:'Tandir go‘shti va grilda pishgan go‘sht',
    quality:'Sifat', nationalTaste:'Milliy ta’m', workTime:'Ish vaqti',
    menuEyebrow:'MENYU', menuCategories:'Menyu kategoriyalari',
    galleryEyebrow:'GALEREYA', contactEyebrow:'ALOQA',
    addressTitle:'Manzil',
    addressText:'Jarqo‘rg‘on tumani, Surxondaryo viloyati, O‘zbekiston',
    phoneTitle:'Telefon', hoursTitle:'Ish vaqti', mapTitle:'Jarqo‘rg‘on xaritasi',
    sending:'Yuborilmoqda…', phoneError:'Telefon raqamini to‘g‘ri kiriting.',
    waReady:'', noServer:'Buyurtma yuborilmadi. Iltimos, qayta urinib ko‘ring.',
    smallNote:'Buyurtmangiz restoran buyurtmalar tizimiga yuboriladi.',
    footerTagline:'Surxondaryoning haqiqiy milliy ta’mi.',
    pages:'Sahifalar', contactShort:'Aloqa', social:'Ijtimoiy tarmoqlar',
    socialNote:'Haqiqiy restoran sahifalari havolasini shu joyga kiriting.',
    clearAll:'🗑 Barchasini', clearCart:'Savatni tozalash',
    removeItem:'Mahsulotni o‘chirish', currency:'so‘m'
  },
  ru: {
    home:'Главная', about:'О нас', menu:'Меню', gallery:'Галерея', contact:'Контакты',
    order:'Заказать', hero:'Жаркурганский тандырный гушт',
    tagline:'Настоящий вкус Сурхандарьи. Вкусные блюда, приготовленные с заботой в традиционном тандыре.',
    aboutTitle:'Настоящий вкус тандыра Жаркургана',
    aboutText:'Наши национальные блюда готовятся традиционным способом из качественных продуктов. Вас ждут семейная атмосфера и незабываемый вкус.',
    menuTitle:'Наше меню', menuSub:'Выберите блюдо и оформите заказ',
    add:'В корзину', galleryTitle:'Наши блюда', contactTitle:'Заказ и контакты',
    name:'Ваше имя', phone:'Ваш телефон', address:'Адрес доставки',
    note:'Комментарий (необязательно)', send:'Отправить заказ',
    cart:'Ваша корзина', total:'Итого', empty:'Корзина пока пуста.',
    delivery:'Доставка', pickup:'Самовывоз', choose:'Выберите способ получения',
    map:'Найдите нас на карте', hours:'Ежедневно 09:00–23:00',
    sent:'Заказ принят! Скоро мы с вами свяжемся.',
    quantity:'Количество', close:'Закрыть', foodCategory:'Блюда',
    saladCategory:'Салаты', drinkCategory:'Напитки',
    heroEyebrow:'НАЦИОНАЛЬНЫЙ ВКУС СУРХАНДАРЬИ',
    tagTandir:'Тандыр', tagShashlik:'Шашлык', tagNational:'Национальный вкус',
    aboutEyebrow:'О НАС', aboutAlt:'Тандырное мясо и мясо на гриле',
    quality:'Качество', nationalTaste:'Национальный вкус',
    workTime:'Время работы', menuEyebrow:'МЕНЮ',
    menuCategories:'Категории меню', galleryEyebrow:'ГАЛЕРЕЯ',
    contactEyebrow:'КОНТАКТЫ', addressTitle:'Адрес',
    addressText:'Жаркурганский район, Сурхандарьинская область, Узбекистан',
    phoneTitle:'Телефон', hoursTitle:'Время работы',
    mapTitle:'Карта Жаркургана', sending:'Отправляется…',
    phoneError:'Введите номер телефона правильно.',
    waReady:'', noServer:'Не удалось отправить заказ. Попробуйте ещё раз.',
    smallNote:'Ваш заказ отправляется в систему заказов ресторана.',
    footerTagline:'Настоящий национальный вкус Сурхандарьи.',
    pages:'Страницы', contactShort:'Контакты', social:'Социальные сети',
    socialNote:'Вставьте сюда ссылки на настоящие страницы ресторана.',
    clearAll:'🗑 Очистить', clearCart:'Очистить корзину',
    removeItem:'Удалить товар', currency:'сум'
  },
  en: {
    home:'Home', about:'About', menu:'Menu', gallery:'Gallery', contact:'Contact',
    order:'Order now', hero:'Jarqo‘rg‘on Tandir Go‘shti',
    tagline:'The authentic taste of Surkhandarya. Delicious dishes lovingly prepared in a traditional clay oven.',
    aboutTitle:'Authentic Jarqo‘rg‘on tandir taste',
    aboutText:'Our traditional dishes are prepared with quality ingredients and care. Enjoy a warm family atmosphere and unforgettable flavour.',
    menuTitle:'Our delicious menu', menuSub:'Choose a dish and place your order',
    add:'Add to cart', galleryTitle:'A taste of our kitchen',
    contactTitle:'Order and contact', name:'Your name', phone:'Phone number',
    address:'Delivery address', note:'Note (optional)', send:'Place order',
    cart:'Your cart', total:'Total', empty:'Your cart is empty for now.',
    delivery:'Delivery', pickup:'Pickup', choose:'Choose order method',
    map:'Find us on the map', hours:'Daily 09:00–23:00',
    sent:'Order received! We will contact you soon.',
    quantity:'Quantity', close:'Close', foodCategory:'Dishes',
    saladCategory:'Salads', drinkCategory:'Drinks',
    heroEyebrow:'THE NATIONAL TASTE OF SURKHANDARYA',
    tagTandir:'Tandir', tagShashlik:'Shashlik', tagNational:'National flavour',
    aboutEyebrow:'ABOUT US', aboutAlt:'Tandir meat and grilled meat',
    quality:'Quality', nationalTaste:'National flavour',
    workTime:'Opening hours', menuEyebrow:'MENU',
    menuCategories:'Menu categories', galleryEyebrow:'GALLERY',
    contactEyebrow:'CONTACT', addressTitle:'Address',
    addressText:'Jarqo‘rg‘on district, Surkhandarya region, Uzbekistan',
    phoneTitle:'Phone', hoursTitle:'Opening hours',
    mapTitle:'Jarqo‘rg‘on map', sending:'Sending…',
    phoneError:'Please enter a valid phone number.',
    waReady:'', noServer:'Could not send the order. Please try again.',
    smallNote:'Your order is sent to the restaurant order system.',
    footerTagline:'The authentic national taste of Surkhandarya.',
    pages:'Pages', contactShort:'Contact', social:'Social media',
    socialNote:'Insert the links to the real restaurant pages here.',
    clearAll:'🗑 Clear all', clearCart:'Clear cart',
    removeItem:'Remove item', currency:'UZS'
  }
};

const foods = [
  { id:'tandir', category:'taomlar', name:'Tandir go‘shti', ru:'Тандырное мясо', en:'Tandir meat', desc:'An’anaviy tandirda pishgan yumshoq va shirali go‘sht', descRu:'Нежное и сочное мясо из традиционного тандыра', descEn:'Tender, juicy meat cooked in a traditional tandir oven', price:120000, img:'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=90' },
  { id:'shashlik', category:'taomlar', name:'Shashlik', ru:'Шашлык', en:'Shashlik kebab', desc:'Ko‘mirda pishirilgan, xushbo‘y va shirali kabob', descRu:'Ароматный и сочный шашлык на углях', descEn:'Aromatic, juicy kebab grilled over charcoal', price:80000, img:'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1400&q=90' },
  { id:'osh', category:'taomlar', name:'Surxon oshi', ru:'Сурхандарьинский плов', en:'Surkhandarya pilaf', desc:'Milliy usulda tayyorlangan mazali palov', descRu:'Вкусный плов, приготовленный традиционным способом', descEn:'Tasty pilaf prepared in the traditional style', price:50000, img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1400&q=90' },
  { id:'qiyma', category:'taomlar', name:'Qiyma kabob', ru:'Люля-кебаб', en:'Minced meat kebab', desc:'Ziravorlar bilan tayyorlangan qiyma kabob', descRu:'Люля-кебаб с ароматными специями', descEn:'Minced meat kebab seasoned with spices', price:65000, img:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=90' },
  { id:'grill', category:'taomlar', name:'Gril go‘sht', ru:'Мясо на гриле', en:'Grilled meat', desc:'Olovda qovurilgan go‘sht va ko‘katlar', descRu:'Мясо на гриле с зеленью', descEn:'Grilled meat served with fresh herbs', price:95000, img:'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1400&q=90' },
  { id:'salat', category:'salatlar', name:'Yangi salat', ru:'Свежий салат', en:'Fresh salad', desc:'Yangi sabzavotlardan yengil salat', descRu:'Лёгкий салат из свежих овощей', descEn:'A light salad made with fresh vegetables', price:25000, img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=90' },
  { id:'achichuk', category:'salatlar', name:'Achchiq-chuchuk', ru:'Ачичук', en:'Achichuk salad', desc:'Pomidor, piyoz va ko‘katlardan tayyorlangan salat', descRu:'Салат из помидоров, лука и зелени', descEn:'Tomato, onion and herb salad', price:18000, img:'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=90' },
  { id:'shakarob', category:'salatlar', name:'Shakarob salati', ru:'Салат шакароб', en:'Shakarob salad', desc:'Yangi pomidor va piyozli milliy salat', descRu:'Национальный салат из свежих помидоров и лука', descEn:'Traditional salad with fresh tomatoes and onions', price:20000, img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=90' },
  { id:'cola', category:'ichimliklar', name:'Coca-Cola', ru:'Кока-Кола', en:'Coca-Cola', desc:'Sovuq gazlangan ichimlik, 1 litr', descRu:'Охлаждённый газированный напиток, 1 л', descEn:'Chilled soft drink, 1 litre', price:15000, img:'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=1400&q=90' },
  { id:'fanta', category:'ichimliklar', name:'Fanta', ru:'Фанта', en:'Fanta', desc:'Apelsin ta’mli gazlangan ichimlik, 1 litr', descRu:'Газированный напиток со вкусом апельсина, 1 л', descEn:'Orange-flavoured soft drink, 1 litre', price:15000, img:'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=1400&q=90' },
  { id:'suv', category:'ichimliklar', name:'Mineral suv', ru:'Минеральная вода', en:'Mineral water', desc:'Toza ichimlik suvi, 1 litr', descRu:'Питьевая вода, 1 л', descEn:'Drinking water, 1 litre', price:7000, img:'https://images.unsplash.com/photo-1559839914-17ebe0f7b2c8?auto=format&fit=crop&w=1400&q=90' },
  { id:'choy', category:'ichimliklar', name:'Ko‘k choy', ru:'Зелёный чай', en:'Green tea', desc:'Issiq ko‘k choy, choynak', descRu:'Горячий зелёный чай, чайник', descEn:'Hot green tea, teapot', price:12000, img:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1400&q=90' }
];

const formatPrice = (n, currency = 'so‘m') =>
  new Intl.NumberFormat('uz-UZ').format(n) + ' ' + currency;

const safeRead = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

function App() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('tg-lang');
    return ['uz','ru','en'].includes(saved) ? saved : 'uz';
  });

  const [cart, setCart] = useState(() => {
    const saved = safeRead('tg-cart', []);
    return Array.isArray(saved)
      ? saved.filter(x => x && typeof x.id === 'string' && Number.isFinite(x.qty) && x.qty > 0 && Number.isFinite(x.price))
      : [];
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [flyingItem, setFlyingItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState('taomlar');
  const [orderType, setOrderType] = useState('delivery');
  const [form, setForm] = useState({ name:'', phone:'', address:'', note:'' });
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const t = translations[lang];
  const money = n => formatPrice(n, t.currency);
  const count = cart.reduce((s, item) => s + item.qty, 0);
  const total = cart.reduce((s, item) => s + item.price * item.qty, 0);

  useEffect(() => {
    localStorage.setItem('tg-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tg-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const addToCart = (food, button) => {
    setCart(prev =>
      prev.some(x => x.id === food.id)
        ? prev.map(x => x.id === food.id ? {...x, qty:x.qty+1} : x)
        : [...prev, {...food, qty:1}]
    );

    setStatus('');

    if (button) {
      const rect = button.getBoundingClientRect();
      const animationKey = Date.now();

      setFlyingItem({
        id: food.id,
        img: food.img,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        key: animationKey
      });

      window.setTimeout(() => {
        setFlyingItem(current =>
          current?.key === animationKey ? null : current
        );
      }, 850);
    }
  };

  const changeQty = (id, delta) =>
    setCart(prev =>
      prev.map(x => x.id === id ? {...x, qty:x.qty+delta} : x)
        .filter(x => x.qty > 0)
    );

  const removeFromCart = id =>
    setCart(prev => prev.filter(item => item.id !== id));

  const clearCart = () => setCart([]);

  // Buyurtmani Supabase bazasiga yuborish
  const submitOrder = async e => {
    e.preventDefault();

    if (busy) return;

    if (!cart.length) {
      setStatus(t.empty);
      return;
    }

    if (!form.name.trim()) {
      setStatus(t.noServer);
      return;
    }

    if (!/^\+?[0-9 ()-]{7,20}$/.test(form.phone.trim())) {
      setStatus(t.phoneError);
      return;
    }

    if (orderType === 'delivery' && !form.address.trim()) {
      setStatus(t.noServer);
      return;
    }

    setBusy(true);
    setStatus('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          items: cart.map(item => ({
            id: item.id,
            qty: item.qty
          })),
          type: orderType,
          address: orderType === 'delivery' ? form.address.trim() : '',
          note: form.note.trim()
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || t.noServer);
      }

      setCart([]);
      setForm({
        name: '',
        phone: '',
        address: '',
        note: ''
      });
      setStatus(t.sent);

    } catch (error) {
      console.error('Order submission error:', error);
      setStatus(error.message || t.noServer);
    } finally {
      setBusy(false);
    }
  };

  const navItems = [
    [t.home,'#home'],
    [t.about,'#about'],
    [t.menu,'#menu'],
    [t.gallery,'#gallery'],
    [t.contact,'#contact']
  ];

  const nameFor = food =>
    lang === 'ru' ? food.ru : lang === 'en' ? food.en : food.name;

  const descFor = food =>
    lang === 'ru' ? (food.descRu || food.desc)
      : lang === 'en' ? (food.descEn || food.desc)
      : food.desc;

  const gallery = [foods[0],foods[4],foods[1],foods[3],foods[2],foods[5]];

  return <>
    <header className="navbar">
      <div className="container nav-container">
        <a className="logo" href="#home">🍖 Jarqo‘rg‘on Tandir</a>

        <nav>
          {navItems.map(([label,href]) =>
            <a key={href} href={href}>{label}</a>
          )}
        </nav>

        <div className="nav-actions">
          <select aria-label="Language" value={lang} onChange={e=>setLang(e.target.value)}>
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>

          <button
            type="button"
            className={`cart-top ${flyingItem ? 'cart-bump' : ''}`}
            aria-label={t.cart}
            onClick={()=>setCartOpen(true)}
          >
            🛒 <span>{count}</span>
          </button>
        </div>
      </div>
    </header>

    <section className="hero" id="home">
      <div className="hero-overlay"/>
      <div className="container hero-content">
        <span className="eyebrow">{t.heroEyebrow}</span>
        <h1>{t.hero}</h1>
        <p>{t.tagline}</p>
        <a className="hero-cta" href="#menu">{t.order}</a>
        <div className="hero-tags">
          <span>🔥 {t.tagTandir}</span>
          <span>🥩 {t.tagShashlik}</span>
          <span>⭐ {t.tagNational}</span>
        </div>
      </div>
    </section>

    <section className="about" id="about">
      <div className="container about-container">
        <div className="about-image">
          <img loading="lazy" src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1500&q=90" alt={t.aboutAlt}/>
        </div>
        <div className="about-text">
          <span>{t.aboutEyebrow}</span>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
          <div className="stats">
            <div><h3>100%</h3><p>{t.quality}</p></div>
            <div><h3>🔥</h3><p>{t.nationalTaste}</p></div>
            <div><h3>09–23</h3><p>{t.workTime}</p></div>
          </div>
        </div>
      </div>
    </section>

    <section className="menu" id="menu">
      <div className="container">
        <div className="section-title">
          <span>{t.menuEyebrow}</span>
          <h2>{t.menuTitle}</h2>
          <p>{t.menuSub}</p>
        </div>

        <div className="menu-categories" role="tablist" aria-label={t.menuCategories}>
          {[
            ['taomlar','🍖 '+t.foodCategory],
            ['salatlar','🥗 '+t.saladCategory],
            ['ichimliklar','🥤 '+t.drinkCategory]
          ].map(([id,label]) =>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory===id}
              className={activeCategory===id?'menu-category active':'menu-category'}
              key={id}
              onClick={()=>setActiveCategory(id)}
            >
              {label}
              <span>{foods.filter(food=>food.category===id).length}</span>
            </button>
          )}
        </div>

        <div className="menu-grid">
          {foods.filter(food=>food.category===activeCategory).map(food =>
            <article className="menu-card" key={food.id}>
              <button
                className="food-image-button"
                onClick={e=>addToCart(food,e.currentTarget)}
                aria-label={t.add+' '+nameFor(food)}
              >
                <img loading="lazy" src={food.img} alt={nameFor(food)}/>
                <span>+ {t.add}</span>
              </button>

              <div className="menu-info">
                <h3>{nameFor(food)}</h3>
                <p>{descFor(food)}</p>
                <strong>{money(food.price)}</strong>
                <button onClick={e=>addToCart(food,e.currentTarget)}>{t.add}</button>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>

    <section className="gallery" id="gallery">
      <div className="container">
        <div className="section-title">
          <span>{t.galleryEyebrow}</span>
          <h2>{t.galleryTitle}</h2>
        </div>

        <div className="gallery-grid">
          {gallery.map((food,i) =>
            <div className={`gallery-item gallery-item-${i+1}`} key={food.id}>
              <img loading="lazy" src={food.img} alt={nameFor(food)}/>
              <div className="gallery-overlay">{nameFor(food)}</div>
            </div>
          )}
        </div>
      </div>
    </section>

    <section className="contact" id="contact">
      <div className="container">
        <div className="section-title">
          <span>{t.contactEyebrow}</span>
          <h2>{t.contactTitle}</h2>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="contact-box">
              <h3>📍 {t.addressTitle}</h3>
              <p>{t.addressText}</p>
            </div>

            <div className="contact-box">
              <h3>📞 {t.phoneTitle}</h3>
              <p><a href="tel:+998500083810">+998 50 008 38 10</a></p>
            </div>

            <div className="contact-box">
              <h3>🕒 {t.hoursTitle}</h3>
              <p>{t.hours}</p>
            </div>

            <div className="map-frame">
              <iframe
                title={t.mapTitle}
                src="https://maps.google.com/maps?q=GCMC%2B8G%2C%20Karakursak%2C%20Surxondaryo%20Region%2C%20Uzbekistan&t=&z=17&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=GCMC%2B8G%2C+Karakursak%2C+Surxondaryo+Region%2C+Uzbekistan"
                target="_blank"
                rel="noreferrer"
              >
                {t.map} ↗
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={submitOrder}>
            <h3>{t.order}</h3>
            <label>{t.choose}</label>

            <div className="order-types">
              <button
                type="button"
                className={orderType==='delivery'?'selected':''}
                onClick={()=>setOrderType('delivery')}
              >
                🚚 {t.delivery}
              </button>

              <button
                type="button"
                className={orderType==='pickup'?'selected':''}
                onClick={()=>setOrderType('pickup')}
              >
                🏪 {t.pickup}
              </button>
            </div>

            <input
              required
              autoComplete="name"
              maxLength={60}
              value={form.name}
              onChange={e=>setForm({...form,name:e.target.value})}
              placeholder={t.name}
            />

            <input
              required
              type="tel"
              autoComplete="tel"
              maxLength={20}
              value={form.phone}
              onChange={e=>setForm({...form,phone:e.target.value})}
              placeholder={t.phone}
            />

            {orderType==='delivery' &&
              <input
                required
                autoComplete="street-address"
                maxLength={200}
                value={form.address}
                onChange={e=>setForm({...form,address:e.target.value})}
                placeholder={t.address}
              />
            }

            <textarea
              maxLength={500}
              value={form.note}
              onChange={e=>setForm({...form,note:e.target.value})}
              placeholder={t.note}
            />

            <div className="order-summary">
              <span>{t.cart}: {count} {t.quantity.toLowerCase()}</span>
              <strong>{money(total)}</strong>
            </div>

            <button type="submit" disabled={busy || count === 0}>
              {busy ? t.sending : t.send}
            </button>

            {status && <p className="status-message" role="status">{status}</p>}
            <p className="small-note">{t.smallNote}</p>
          </form>
        </div>
      </div>
    </section>

    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2>🍖 Jarqo‘rg‘on Tandir Go‘shti</h2>
          <p>{t.footerTagline}</p>
        </div>

        <div>
          <h3>{t.pages}</h3>
          {navItems.slice(0,4).map(([label,href]) =>
            <a href={href} key={href}>{label}</a>
          )}
        </div>

        <div>
          <h3>{t.contactShort}</h3>
          <p>📍 {t.addressText.split(',').slice(0,2).join(',')}</p>
          <p>🕒 09:00–23:00</p>
        </div>

        <div className="social-links">
          <h3>{t.social}</h3>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">◎ Instagram</a>
          <a href="https://t.me/" target="_blank" rel="noreferrer">➤ Telegram</a>
          <p className="social-note">{t.socialNote}</p>
        </div>
      </div>

      <div className="copyright">© 2026 Jarqo‘rg‘on Tandir Go‘shti</div>
    </footer>

    {flyingItem &&
      <div
        key={flyingItem.key}
        className="flying-cart-item"
        style={{left:`${flyingItem.x}px`,top:`${flyingItem.y}px`}}
      >
        <img src={flyingItem.img} alt=""/>
      </div>
    }

    {cartOpen &&
      <div
        className="drawer-backdrop"
        onMouseDown={e=>{
          if(e.target===e.currentTarget) setCartOpen(false);
        }}
      >
        <aside className="cart-drawer">
          <div className="drawer-head">
            <h2>{t.cart}</h2>

            <div className="drawer-head-actions">
              {cart.length>0 &&
                <button
                  className="clear-cart"
                  onClick={clearCart}
                  title={t.clearCart}
                  aria-label={t.clearCart}
                >
                  {t.clearAll}
                </button>
              }

              <button onClick={()=>setCartOpen(false)} aria-label={t.close}>✕</button>
            </div>
          </div>

          {cart.length===0
            ? <p className="empty-cart">{t.empty}</p>
            : <div className="cart-lines">
                {cart.map(item =>
                  <div className="cart-line" key={item.id}>
                    <img src={item.img} alt=""/>

                    <div className="cart-line-info">
                      <strong>{nameFor(item)}</strong>
                      <small>{money(item.price)}</small>

                      <div className="qty-control">
                        <button onClick={()=>changeQty(item.id,-1)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={()=>changeQty(item.id,1)}>+</button>
                      </div>
                    </div>

                    <b>{money(item.price*item.qty)}</b>

                    <button
                      className="remove-cart-item"
                      onClick={()=>removeFromCart(item.id)}
                      title={t.removeItem}
                      aria-label={`${t.removeItem}: ${nameFor(item)}`}
                    >
                      🗑
                    </button>
                  </div>
                )}
              </div>
          }

          <div className="drawer-total">
            <span>{t.total}</span>
            <strong>{money(total)}</strong>
          </div>

          <button
            className="drawer-checkout"
            onClick={()=>{
              setCartOpen(false);
              document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'});
            }}
          >
            {t.order}
          </button>
        </aside>
      </div>
    }
  </>;
}

export default App;
