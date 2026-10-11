# WEB-LAB-04 — Browser observation workbook

Bu manual çalışma WEB-10.01, WEB-10.02 ve WEB-10.03’ü birleştirir. Önce browser’ın ne üreteceğini tahmin edersin; ardından aynı browser’ın native API sonuçlarını okur, yerel evidence kaydını oluşturur ve sınırları açıklarsın. Başka bir sisteme bağlantı veya öğrenci kodu çalıştırma yoktur.


## Derslerden bu çalışmaya

| Ders | Labda izlediğin sınır | Kaydında göstereceğin kanıt |
|---|---|---|
| WEB-10.01 | Fragment değişimi yeni Document üretmek zorunda değildir | Aynı Document identity’sinin korunması; process isolation sonucu çıkarmadan |
| WEB-10.02 | Source, DOM ve CSS box farklı gözlemlerdir | Implied TBODY, decoded text, display:none/visibility:hidden ölçümleri ve textContent revision |
| WEB-10.03 | Synchronous call, microtask ve timer task ayrı sıralanır | Executor/nested microtask, call stack ve await continuation logları; elapsed-time iddiası olmadan |

Sitedeki lab sayfası bu workbook, ipuçları ve çözümü bir arada tutar. **Kaynak paketi indir** ile ZIP’i çıkarıp `index.html` dosyasını aç; GitHub hesabı veya repository clone gerekmez. Önce tahminlerini workbook’e göre yaz, sonra browser sayfasında sabitle ve gözlemle. Node server aşağıdaki isteğe bağlı ikinci yoldur.

## Başlat

`index.html` dosyasını browser’da aç. Local CSS/JS dışında dependency veya CDN yoktur. İstersen indirdiğin paketin `web-browser` klasöründe loopback static server’ı başlat:

```sh
node server.mjs
```

Sonra `http://127.0.0.1:4194/` adresini aç. Server yalnız lab dosyalarını GET/HEAD ile sunar. Ctrl+C ile kapanır. Paket kurulumu gerekmiyor. Node.js 20+ yeterlidir. Repository kökünden eşdeğer komut `node labs/web/browser/server.mjs` olur.

## Önce prediction

1. Source/CSS/script panelini aç. Parser’a giren literal HTML ile oluşacak DOM’u ayrı düşün. Table fixture’ında omitted section’ın nereye geleceğini tahmin et.
2. 18 alanı kendi prediction’larınla doldur. İlk alan Document identity; 14 alan DOM/CSS; son 3 alan call/task sırasıdır. Sayılarda CSS px kullan. Log alanlarında comma, boşluk veya yeni satır ayracı kullan; ok işareti yazma.
3. `script:start`, `executor`, `script:end`, `promise`, `microtask`, `nested`, `timer` etiketlerinin sırasını yaz. Ayrıca `A:start`, `B`, `A:end` ve `before-await`, `after-call`, `after-await` loglarını tahmin et. Burada 0ms timer, belli bir saatte çalışacak garantisi değildir.
4. “Tahminleri sabitle ve gözlemle” düğmesine bas. İlk prediction’ın ve observation’ın yan yana görünür. Eşleşme yalnız bu fixed fixture’a aittir; formal assessment değildir.

## Observation → record → explanation

DOMParser decoded text’i ve implied TBODY’yi üretir. Canlı document’a import edilen fixed note/hidden/reserved node’larının getBoundingClientRect/getComputedStyle sonuçları okunur. Ardından fixed textContent assignment ile DOM revision gösterilir. Immutable source string’i yeniden yazılmaz; source comparison, View Source veya response capture değildir.

Hash `#summary` olur; aynı Document nesnesi korunur. Bu observation yeni sayfa commit’ini, process allocation’ı veya browser/renderer güvenlik sınırını ölçmez. Network/GPU/paint capture üretilmez. Hidden node ve hidden box aynı kavram değildir; ikisini kaydında açıkça ayır.

Loglar gerçekten Promise executor, then callback, queueMicrotask ve setTimeout ile üretilir. Başka işlerin logları bu fixed array’e eklenmez. Nested microtask’ın nereye katıldığını ve await continuation’ın caller’dan neden sonra geldiğini açıkla. Timer’ın elapsed süresi veya paint ile sırası ölçülmez.

Kaydı indirirsen `browser-observation.json` oluşur. Bu kendi prediction/observation dosyandır; kaynak paketine veya repo’ya ekleme. Otomatik storage/telemetry yoktur. “Labı sıfırla” tahminleri, feedback’i, fixture node’larını ve yerel kaydı temizler; hash’i `#lab-browser` yapar. Sıfırlanan pending observation sonucu geri gelmez.

Yazılı evidence’inde üç kısa cevap bulunsun: source–DOM farkı neydi; display:none ile visibility:hidden hangi ölçümlerde ayrıldı; nested microtask ve await sonuçlarını hangi sıra kuralıyla açıklıyorsun? Yanlış prediction’ı silmek yerine ilk düşünceni ve düzeltmenin nedenini tut.

## Son görev — Bir layout ölçümünü değiştir

Önce bir baseline observation tamamla. DevTools Elements/Inspector'da `.fixture` içindeki canlı `#note` node'unu seç. Fixture ekran dışındadır; DOM ağacından seçebilirsin. Değiştirmeden önce yalnız width'i 120'den farklı pozitif bir CSS px değerine getirmenin etkisini tahmin et. DevTools'ta inline width ekle ve box model'deki width sonucunu incele.

`#reserved` node'unu seç. Mevcut `visibility:hidden` ile DevTools'ta `display:none` eklemek arasındaki farkı önce tahmin et. Computed style ve box model'i karşılaştır; node'un DOM'da durup durmadığını kontrol et. Bu ölçümlerden paint, GPU veya process davranışı sonucu çıkarma.

`.local-results/` altında ayrı bir yerel kayıt tut: değişen property, önceki değer, tahmin, ölçülen sonuç ve açıklama. Uygulamadan indirilen JSON önceki baseline observation'ı anlatır; sonradan yaptığın DevTools değişikliklerini otomatik kaydetmez. Source/CSS paneli de özgün fixture'ı gösterir. Değiştirdiğin durumu ayrı kaydında göster.

Tamamlama ölçütü: width değişimini açıkla; görünmeyen box ile box yokluğunu ayır; node'un DOM'da kaldığını göster. Sıfırla ve yeniden gözlemle: fixture yeniden oluşunca inline değişiklikler kaybolur. Ortak kaynak dosyalarına değişiklik kaydetme.

## Yardım ve scope

- [HINTS](HINTS.md): önce ipucu; tam sonuç listesi değil.
- [SOLUTION](SOLUTION.md): observation’dan sonra beklenen değerler ve açıklama.
- English workbook: [README.en.md](README.en.md).

Doğru prediction’a ek olarak nedenini kendi cümlelerinle açıklamak bu çalışmanın hedefidir. Eşleşme göstergesi bu açıklamanın yerini tutmaz.
