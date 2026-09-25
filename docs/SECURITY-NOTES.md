# Security and data-handling notes

The website is an intake and information interface, not a case-management system. It uses minimal structured fields and no document uploads. Request bodies are bounded to 16 KB, strings and choices are server-validated, unsolicited fields are omitted, and form delivery requires a same-origin JSON request. The honeypot is supplementary, not the sole anti-spam defense.

Production-mode forms require readiness flags, Resend, Turnstile and a shared Upstash rate limiter. Turnstile action and hostname are checked server-side. The Upstash counter uses a salted hash rather than the raw IP and expires after ten minutes. Six requests per counter/window is an initial policy to review for shared connections. Rate-limiter/provider failure rejects the request; it does not silently switch to an unprotected success path.

The code does not intentionally log request contents, store them in the public CMS, or write form drafts to browser localStorage. The optional motion preference is the only explicit application localStorage use. Email delivery and infrastructure providers can still hold request records/logs: configure their permissions and retention, and do not claim end-to-end secrecy or universal zero-retention.

A successful provider response confirms acceptance for sending, not final inbox delivery or a human response. The interface does not claim a service appointment. Email is plain text and uses an idempotency key based on a browser-generated request UUID. Retries of a pending request reuse it. There is no automatic acknowledgement email that could expose sensitive subject matter to an unverified address. The chosen contact method is included prominently in the staff delivery. Operational staff must honor that choice.

CSP allows only listed image, challenge and analytics origins plus same-origin application resources. It permits inline script/style for the static-compatible Next integration and is **not** a strict nonce-based CSP. Adding per-request nonces has caching/rendering implications and should be implemented with actual runtime tests, not claimed here. HTTPS is configured by the deployment host; verify it and response headers on the actual custom domain.

The Sanity dataset is for published public copy. Use least-privilege staff access, read-only website tokens for private datasets, separate preview content, MFA and backups. Never place service requests, private release forms, medical information or legal case records into these public schemas.

A real privacy notice, recipient inbox ownership, safe follow-up procedure, deletion/retention policy, provider agreements and publication permissions are launch prerequisites. The included draft documents implementation behavior but is not an approved organizational policy or legal advice.
