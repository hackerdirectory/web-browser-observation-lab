# WEB-LAB-04 — Browser observation workbook

This manual workbook accompanies WEB-10.01, WEB-10.02 and WEB-10.03. Predict first, inspect native browser results, create a local evidence record, and explain the boundaries. There is no connection to another system or execution of learner code.


## From lessons to this workbook

| Lesson | Boundary observed in the lab | Evidence to keep |
|---|---|---|
| WEB-10.01 | A fragment change need not create a new Document | Retained Document identity without inferring process isolation |
| WEB-10.02 | Source, DOM and CSS boxes are different observations | Implied TBODY, decoded text, display:none/visibility:hidden measurements and textContent revision |
| WEB-10.03 | Synchronous calls, microtasks and timer tasks have separate ordering | Executor/nested-microtask, call-stack and await-continuation logs without elapsed-time claims |

The site's lab page provides this workbook, hints and solution together. Use **Download source package**, extract the ZIP and open `index.html`; no GitHub account or repository clone is required. Write predictions using the workbook, then lock them and observe on the browser page. The Node server below is an optional second route.

## Start

Open `index.html` in a browser. Local CSS/JS need no dependency or CDN. Alternatively, start the loopback static server from the extracted package's `web-browser` directory:

```sh
node server.mjs
```

Visit `http://127.0.0.1:4194/`. Only lab files are served, using GET/HEAD. Ctrl+C closes the server. Node.js 20+ is sufficient; no package installation is required. The equivalent command from the repository root is `node labs/web/browser/server.mjs`.

## Predict first

1. Open the source/CSS/script panel. Separate literal input HTML from the resulting DOM. Predict which section the table parser inserts.
2. Fill 18 fields: one Document identity field, 14 DOM/CSS fields, and 3 call/task logs. Numbers are CSS px. Separate log labels with commas, whitespace or new lines; do not use arrow characters.
3. Order `script:start`, `executor`, `script:end`, `promise`, `microtask`, `nested`, `timer`. Also predict `A:start`, `B`, `A:end`, and `before-await`, `after-call`, `after-await`. A 0ms timer argument does not guarantee an exact execution time.
4. Click “Lock predictions and observe”. Earlier predictions appear beside observations. A match applies only to this fixed fixture; it is not a formal assessment.

## Observation → record → explanation

DOMParser creates decoded text and an implied TBODY. Fixed note/hidden/reserved nodes are imported into the live document, where getBoundingClientRect/getComputedStyle supply measurements. A fixed textContent assignment then revises the DOM. The immutable source string is not rewritten; this comparison is not View Source or response capture.

The hash changes to `#summary` while the same Document object remains. This does not measure a new-page commit, process allocation or browser/renderer security isolation. No network/GPU/paint capture occurs. Distinguish a hidden DOM node from the absence of a layout box.

Logs are produced by actual Promise executor/then, queueMicrotask and setTimeout operations. Unrelated jobs do not append to this fixture array. Explain where the nested microtask joins and why the await continuation follows the caller. Elapsed timer duration and timer-versus-paint order are not measured.

Download creates your own `browser-observation.json`; keep it outside the source package and repository. There is no automatic storage or telemetry. Reset clears predictions, feedback, fixture nodes and the local record, returning the hash to `#lab-browser`. A pending observation cannot repopulate the reset result.

Write three short evidence explanations: what differed between source and DOM; which measurements distinguish display:none from visibility:hidden; and which ordering rule explains nested microtasks and await. Keep the original mistaken prediction together with the reason for your correction.

## Finish on your own — change a layout measurement

Complete one baseline observation, then use DevTools Elements/Inspector to select the live `#note` inside `.fixture`. The fixture is off-screen; select it in the DOM tree. Before editing, predict the effect of changing only its width to a positive CSS px value different from 120. Add an inline width declaration in DevTools and inspect the resulting box-model width.

Select `#reserved`. Predict the difference between its existing `visibility:hidden` and adding `display:none` in DevTools. Compare computed styles and the box model; check whether the node still exists in the DOM. Do not infer paint, GPU, or process behavior from these measurements.

Keep a separate local record under `.local-results/`: changed property, previous value, prediction, measured result, and explanation. The app's downloaded JSON describes the earlier baseline observation; it does not automatically record your later DevTools edits. Its source/CSS panel also describes the original fixture. Use your separate record for the edited state.

Acceptance: explain a width change, distinguish a hidden box from no box, and show that the node remains in the DOM. Reset and observe again to restore the original fixture; inline edits disappear when it is recreated. Do not save changes to shared source files.

## Help and scope

- [HINTS](HINTS.en.md): clues before the answer sheet.
- [SOLUTION](SOLUTION.en.md): expected observations and explanations after your run.
- Türkçe workbook: [README.md](README.md).

Beyond making a correct prediction, explain the reason in your own words. The match indicator does not replace that explanation.
