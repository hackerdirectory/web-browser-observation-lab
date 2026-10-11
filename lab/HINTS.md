# Browser observation — İpuçları

## Document

Fragment değişimi tek başına bir yeni document yüklemek değildir. Nesne identity’sini karşılaştırmak process identity’sini karşılaştırmak değildir.

## DOM ve CSS

Parser character reference’ı decode eder. Table parsing rules, source’ta yazmadığın bir section node’u oluşturabilir. display:none ile visibility:hidden için “DOM’da var” ve “box geometry var” sorularını ayrı cevapla. Fixed style’da border/padding yok; CSS width ve bounding rectangle bu fixture için karşılaştırılabilir.

textContent assignment sonrasında current DOM serialization ile tutulmuş source string’i karşılaştır. Source string’ini değiştirip değiştirmediğini, DOM’un değişip değişmediğinden çıkarma.

## Sıra

Promise executor ile then callback aynı aşama değildir. Kuyruktaki mevcut microtask işleri tamamlanmadan timer’ın logunu öne alma. Nested microtask yeni eklenen bir iştir. Await için önce async function çağrısının ilk kısmını, sonra caller’ın devamını, sonra continuation’ı düşün.

Observation sonucunu görmek yerine hangi iki kavramı karıştırdığını bir cümleyle açıklamayı dene.
