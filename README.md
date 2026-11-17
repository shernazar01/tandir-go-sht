# Jarqo‘rg‘on Tandir Go‘shti

React + Vite sayti. Qora-oltin dizayn, mobil moslashuv, UZ/RU/EN interfeys, menyu, savat va buyurtma formasi mavjud.

## Ishga tushirish
```bash
npm install
npm run dev
npm run build
```

## Buyurtmalarni emailga yuborish
Buyurtmalar `oshernazar@gmail.com` manziliga FormSubmit orqali yuboriladi. Gmail paroli, Eskiz SMS hisobi yoki Vercel Environment Variables talab qilinmaydi.

**Birinchi marta:** saytdan sinov buyurtmasi yuboring va `oshernazar@gmail.com` pochta qutisini tekshiring. FormSubmit faollashtirish xati yuborsa, uni ochib tasdiqlang. Shundan keyin buyurtma xatlari kelishi kerak. Spam/Junk papkasini ham tekshiring.

Agar `/api/orders` ishlamasa, sayt buyurtmani brauzerdan to‘g‘ridan-to‘g‘ri shu manzilga yuboradi.

`api/orders.js` serverda mahsulot ID va miqdorlarini tekshiradi, jami summani qayta hisoblaydi va emailga buyurtma tafsilotlarini jo‘natadi. Saytni Vercel'ga qayta deploy qiling.

## Muhim
- Bu loyiha email yuborish uchun tashqi FormSubmit xizmatidan foydalanadi. Xizmatni birinchi marta faollashtirish talab qilinishi mumkin.
- Buyurtma emaili haqiqatan kelganini tasdiqlamaguncha, saytdagi buyurtma oqimini to‘liq ishga tushgan deb hisoblamang.
- Mijoz fikrlari Supabase PostgreSQL bazasiga `/api/reviews` server API orqali yoziladi; brauzer `localStorage` ishlatilmaydi.
- `.env.example` ichiga maxfiy ma'lumot kiritilmagan.

## Mijozlar fikrlarini umumiy saqlash (Supabase)
Fikrlar endi brauzer `localStorage`'ida emas, Supabase ma'lumotlar bazasida saqlanadi. Shu sababli saytga kirgan barcha mijozlar bir xil fikrlarni ko‘radi.

1. Supabase'da loyiha yarating.
2. SQL Editor oynasida `supabase/reviews.sql` faylidagi SQL kodni ishga tushiring.
3. Supabase Project Settings → API bo‘limidan Project URL va `service_role` kalitini oling.
4. Vercel → Project → Settings → Environment Variables bo‘limiga quyidagilarni kiriting:
   - `SUPABASE_URL` = Supabase Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = Supabase `service_role` key
5. O‘zgarishlarni Production, Preview va Development muhitlariga kerak bo‘lsa qo‘shing va saytni qayta deploy qiling.

`SUPABASE_SERVICE_ROLE_KEY` maxfiy kalit. Uni hech qachon `VITE_` bilan boshlanadigan nomda saqlamang, frontend kodiga yozmang yoki ommaviy joyga yubormang. U faqat serverdagi `/api/reviews` funksiyasida ishlatiladi.

Supabase sozlanmaguncha fikrlar API'si 503 javob qaytaradi va forma foydalanuvchiga saqlash amalga oshmaganini ko‘rsatadi. Fikr saqlangani haqida muvaffaqiyat xabari faqat baza yozuvni qabul qilganidan keyin chiqadi.


## So‘nggi savat va aloqa yangilanishlari
- Menyudagi `+` bosilganda mahsulot savatga qo‘shiladi va kichik rasm animatsiya bilan yuqoridagi savat belgisi tomon uchadi. Savat avtomatik ochilmaydi.
- Savatda har bir mahsulotni alohida 🗑 tugmasi bilan o‘chirish yoki `Barchasini` tugmasi bilan savatni tozalash mumkin.
- Xarita manzili: GCMC+8G, Karakursak, Surxondaryo Region, Uzbekistan.
- Telefon: +998 50 008 38 10.


## Fikr saqlanmayotgan bo‘lsa: majburiy bir martalik sozlash

`Fikrni saqlab bo‘lmadi` xabari odatda Supabase kalitlari Vercel'ga kiritilmaganini yoki jadval yaratilmaganini anglatadi. Kodning o‘zi tashqi bazani avtomatik yaratolmaydi.

1. Supabase'da loyiha oching (https://supabase.com).
2. Supabase → SQL Editor → New query bo‘limiga kiring. Ushbu loyihadagi `supabase/reviews.sql` faylini to‘liq joylab, **Run** bosing.
3. Supabase → Project Settings → API bo‘limidan Project URL va `service_role` secret key qiymatini oling. `service_role` kalitini hech kimga yubormang va frontendga yozmang.
4. Vercel → loyiha → Settings → Environment Variables bo‘limida quyidagi ikkita o‘zgaruvchini yarating:
   - `SUPABASE_URL` = Supabase Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = Supabase service_role secret key
5. Ikkalasini Production (kerak bo‘lsa Preview va Development) muhitiga belgilang. Saqlang.
6. Vercel → Deployments → eng oxirgi deployment → Redeploy qiling. Environment Variable o‘zgargach redeploy shart.
7. Saytni ochib test fikr yuboring. Keyin sahifani yangilang: fikr ro‘yxatda qolishi kerak. Supabase → Table Editor → `customer_reviews` jadvalida ham yozuv ko‘rinadi.

Endi API muammoga qarab aniqroq xabar qaytaradi: env yo‘q, URL noto‘g‘ri, kalit/ruxsat xatosi yoki jadval yo‘qligi. Maxfiy `service_role` kalitini ChatGPT'ga, GitHub'ga yoki ommaviy joyga yubormang.
