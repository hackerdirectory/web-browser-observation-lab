# Browser observation — Beklenen açıklama

Fixed fixture sonuçları:

| Field | Beklenen observation |
| --- | --- |
| retainedDocument | true |
| parsedNoteText | Atlas & Web |
| impliedTableChild | TBODY |
| hiddenNodePresent | true |
| noteWidth / noteHeight |120 /24 CSS px |
| hiddenWidth / hiddenHeight |0 /0 CSS px |
| reservedWidth / reservedHeight |80 /12 CSS px |
| reservedVisibility | hidden |
| noteColor | rgb(15, 118, 110) |
| revisedNoteText | Atlas — revised |
| sourceChanged | false |
| domContainsRevision | true |

```text
eventLog: script:start, executor, script:end, promise, microtask, nested, timer
callTrace: A:start, B, A:end
awaitTrace: before-await, after-call, after-await
```

Hash navigation aynı Document object’i korur. Bu, yeni sayfa commit’inin veya process isolation’ın testi değildir. Parser text’teki ampersand’ı decode eder ve table altında implied TBODY oluşturur. display:none box üretmez; visibility:hidden box yerini korur. Her iki node DOM’da kalır. Ölçüler CSS px ve computed style’dır; paint/GPU/display-pixel sonucu değildir.

Fixed textContent assignment yaşayan DOM’u değiştirir. Immutable fixture source string’i bu assignment’tan etkilenmez. outerHTML current DOM serialization olduğundan revision’ı içerir. Bu observation View Source ya da bir response capture değildir.

Promise executor senkron olarak script:end’den önce çalışır. then job, queueMicrotask job’dan önce kuyruğa girer. Microtask işi çalışırken eklenen nested iş, bu checkpoint boşalmadan tamamlanır; timer sonra gelir.0ms elapsed garantisi ve paint sırası çıkarılamaz. Senkron B, A:end’den önce döner. Await continuation, resolved Promise için de microtask olarak sürer; caller’ın after-call satırı önce kayda girer.

Gelecek script’lerin veya farklı queue schedule’larının tüm sırasını bu küçük logdan genelleme. Eşleşen18 alan, öğrencinin browser process architecture veya execution contexts konusunu bağımsız açıklayabildiğini belgelemez.
