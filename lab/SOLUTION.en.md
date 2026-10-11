# Browser observation — Expected explanation

Fixed fixture observations:

| Field | Expected observation |
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

Hash navigation retains the same Document object; it does not test a new-page commit or process isolation. The parser decodes the ampersand and inserts an implied TBODY under table. display:none produces no box; visibility:hidden retains its box space. Both nodes remain in DOM. Measurements describe CSS px and computed style, not paint/GPU/display-pixel results.

The fixed textContent assignment revises live DOM without changing the immutable fixture source string. outerHTML contains the revision because it serializes current DOM. This is not View Source or response capture.

The Promise executor runs synchronously before script:end. The then job is queued before queueMicrotask. The nested job added by the microtask completes before this checkpoint drains; the timer follows. No exact0ms elapsed time or paint order follows. Synchronous B returns before A:end. Even a resolved Promise resumes await through a microtask; the caller’s after-call line is logged first.

Do not generalize every future script or queue schedule from this small trace. Matching18 fields does not certify independent understanding of browser process architecture or execution contexts.
