<script lang="ts">
	import { enhance } from '$app/forms';

	let { form }: { form: { success?: boolean; email?: string; error?: string } | null } = $props();
	let submitting = $state(false);
	let email = $state('');
</script>

<section class="newsletter-section" aria-labelledby="newsletter-title">
	<div class="container">
		<div class="newsletter-card">
			<div class="newsletter-copy">
				<div class="section-divider"></div>
				<p class="eyebrow">Occasional notes, thoughtfully sent</p>
				<h2 id="newsletter-title">Ideas worth <span class="gradient-text">your inbox.</span></h2>
				<p class="description">A considered newsletter on backend engineering, systems, and the lessons learned building them. No noise, just useful ideas.</p>
				<ul class="newsletter-promises">
					<li><span aria-hidden="true">✓</span> Practical engineering notes</li>
					<li><span aria-hidden="true">✓</span> Sent only when there’s something useful to share</li>
				</ul>
			</div>

			<div class="signup-panel">
				{#if form?.success}
					<div class="success-state" role="status" aria-live="polite">
						<div class="success-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
								<path d="m5 12 4 4L19 6" />
							</svg>
						</div>
						<h3>One last step</h3>
						<p>
							We sent a confirmation link to
							<strong class="submitted-email">{form.email ?? 'your email address'}</strong>.
							You’ll be subscribed once you confirm.
						</p>
						<span class="spam-note">Can’t find it? Check spam or promotions.</span>
					</div>
				{/if}
				{#if !form?.success}<p class="panel-label">Join the newsletter</p>{/if}
				<form
					method="POST"
					action="?/subscribe"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							try {
								// SvelteKit resets successful forms by default; retain the typed address.
								await update({ reset: false });
							} finally {
								submitting = false;
							}
						};
					}}
				>
					<label class="email-label" for="newsletter-email">Email address</label>
					<div class="email-row">
						<input id="newsletter-email" name="email" type="email" bind:value={email} placeholder="you@example.com" autocomplete="email" required maxlength="254" />
						<button class="btn btn-primary" type="submit" disabled={submitting} aria-live="polite">
							{#if submitting}
								<span class="button-spinner" aria-hidden="true"></span> Subscribing…
							{:else}
								Subscribe <span class="subscribe-arrow" aria-hidden="true">→</span>
							{/if}
						</button>
					</div>
					<div class="honeypot" aria-hidden="true">
						<label for="newsletter-website">Leave this field empty</label>
						<input id="newsletter-website" name="website" type="text" tabindex="-1" autocomplete="off" />
					</div>
					{#if form?.error}
						<p class="form-error" role="alert">{form.error}</p>
					{/if}
					<p class="privacy-note">By subscribing, you agree to receive occasional emails. Unsubscribe anytime.</p>
				</form>
			</div>
		</div>
	</div>
</section>

<style>
	.newsletter-section { padding: var(--spacing-4xl) 0; }
	.newsletter-card {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(320px, 0.9fr);
		align-items: center;
		gap: clamp(36px, 7vw, 84px);
		overflow: hidden;
		padding: clamp(28px, 6vw, 64px);
		background: radial-gradient(ellipse at 8% 0%, rgba(194, 151, 103, 0.1), transparent 48%), var(--color-bg-secondary);
		border: 1px solid var(--card-border);
		border-radius: var(--radius-2xl);
		box-shadow: var(--shadow-lg);
	}
	.newsletter-copy .section-divider { margin-bottom: var(--spacing-lg); }
	.eyebrow, .panel-label {
		margin: 0 0 var(--spacing-sm);
		color: var(--color-accent-2);
		font-size: var(--font-size-xs);
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	h2 { margin-bottom: var(--spacing-md); font-size: clamp(2.1rem, 4.5vw, 3.5rem); letter-spacing: -0.035em; }
	.description { max-width: 480px; margin: 0; font-size: var(--font-size-base); }
	.newsletter-promises { display: grid; gap: 10px; margin: var(--spacing-lg) 0 0; padding: 0; list-style: none; }
	.newsletter-promises li { display: flex; align-items: baseline; gap: 10px; color: var(--color-text-secondary); font-size: var(--font-size-sm); }
	.newsletter-promises span { color: var(--color-accent-1); font-weight: 700; }
	.signup-panel { padding: clamp(22px, 4vw, 34px); background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius-xl); }
	.panel-label { color: var(--color-text-primary); font-size: var(--font-size-sm); letter-spacing: 0; text-transform: none; }
	.email-label { display: block; margin-bottom: 7px; color: var(--color-text-muted); font-size: var(--font-size-xs); font-weight: 600; }
	.email-row { display: flex; gap: 10px; }
	.email-row input {
		min-width: 0;
		flex: 1;
		padding: 0.8rem 0.9rem;
		color: var(--color-text-primary);
		color-scheme: dark;
		font: inherit;
		font-size: var(--font-size-sm);
		background: var(--color-bg-primary);
		border: 1px solid var(--card-border);
		border-radius: var(--radius-md);
		transition: border-color var(--duration-base), box-shadow var(--duration-base);
	}
	.email-row input:focus { outline: none; border-color: var(--color-accent-1); box-shadow: 0 0 0 3px rgba(194, 151, 103, 0.13); }
	:global([data-theme="light"]) .email-row input { color-scheme: light; }
	.email-row input:-webkit-autofill,
	.email-row input:-webkit-autofill:hover,
	.email-row input:-webkit-autofill:focus {
		-webkit-text-fill-color: var(--color-text-primary);
		box-shadow: 0 0 0 1000px var(--color-bg-primary) inset, 0 0 0 3px rgba(194, 151, 103, 0.13);
		transition: background-color 9999s ease-out;
	}
	.email-row .btn { flex: 0 0 auto; padding-inline: 18px; white-space: nowrap; }
	.email-row .btn:disabled { opacity: 0.82; cursor: wait; transform: none; }
	.button-spinner { width: 14px; height: 14px; border: 2px solid rgba(255, 255, 255, 0.4); border-top-color: currentColor; border-radius: 50%; animation: subscribe-spin 700ms linear infinite; }
	@keyframes subscribe-spin { to { transform: rotate(360deg); } }
	.email-row .subscribe-arrow { display: inline-block; padding-left: 4px; transition: transform 180ms var(--ease-out); }
	.email-row button:hover .subscribe-arrow { transform: translateX(3px); }
	.email-row button:active .subscribe-arrow { transform: translateX(1px); }
	.privacy-note { margin: 12px 0 0; color: var(--color-text-muted); font-size: 0.7rem; line-height: 1.6; }
	.form-error { margin: 12px 0 0; color: #e99b8f; font-size: var(--font-size-sm); }
	.honeypot { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
	.success-state { text-align: center; }
	.success-icon { display: grid; place-items: center; width: 48px; height: 48px; margin: 0 auto 14px; color: var(--color-accent-2); background: rgba(194, 151, 103, 0.12); border: 1px solid rgba(194, 151, 103, 0.24); border-radius: 50%; }
	.success-icon svg { width: 24px; height: 24px; }
	.success-state h3 { margin-bottom: 7px; font-size: var(--font-size-xl); }
	.success-state p { margin: 0 auto 8px; font-size: var(--font-size-sm); }
	.submitted-email { color: var(--color-text-primary); font-weight: 600; overflow-wrap: anywhere; }
	.spam-note { color: var(--color-text-muted); font-size: var(--font-size-xs); }
	@media (max-width: 800px) {
		.newsletter-card { grid-template-columns: 1fr; gap: var(--spacing-xl); }
	}
	@media (max-width: 520px) {
		.newsletter-section { padding: var(--spacing-3xl) 0; }
		.newsletter-card { padding: 26px 20px; }
		.signup-panel { padding: 20px; }
		.email-row { flex-direction: column; }
		.email-row .btn { width: 100%; }
	}
</style>
