# Browser observation — Hints

## Document

A fragment change alone does not load a new document. Comparing object identity is different from comparing process identity.

## DOM and CSS

The parser decodes character references. Table parsing rules can insert a section omitted from source. Answer “present in DOM” separately from “has box geometry” for display:none and visibility:hidden. This fixed style has no border/padding, making CSS width and the bounding rectangle comparable here.

After textContent assignment, compare current DOM serialization with the retained source string. Do not infer a change to the source string from a change to the DOM.

## Order

The Promise executor and then callback run at different stages. Do not move the timer log ahead of already queued microtasks. A nested microtask is a newly enqueued job. For await, consider the async function’s initial part, the caller’s continuation, and the resumed continuation separately.

Rather than merely reading the observation, explain in one sentence which two concepts your prediction confused.
