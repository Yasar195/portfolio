<svelte:head>
	<title>Unsubscribed — Yasar Arafath</title>
	<meta name="description" content="Your newsletter subscription has been cancelled." />
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<main class="confirmation-page">
	<div class="ambient ambient-one" aria-hidden="true"></div>
	<div class="ambient ambient-two" aria-hidden="true"></div>

	<section class="confirmation-card" aria-labelledby="confirmation-title">
		<div class="status-mark" aria-hidden="true">
			<svg viewBox="0 0 48 48" fill="none">
				<path d="M15 15 33 33M33 15 15 33" />
			</svg>
		</div>

		<p class="eyebrow"><span></span> Subscription updated</p>
		<h1 id="confirmation-title">You've been <span class="gradient-text">unsubscribed.</span></h1>
		<p class="intro">You won't receive any more newsletter emails from me. Thanks for being here, and for giving the newsletter a read.</p>

		<div class="next-up">
			<div class="mail-icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
					<path d="M4 7.5 12 13l8-5.5" />
					<path d="M20 12V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6" />
					<circle cx="18" cy="17" r="3" />
					<path d="m16.8 17  .8.8 1.7-1.8" />
				</svg>
			</div>
			<div>
				<h2>Changed your mind?</h2>
				<p>You can subscribe again anytime from the newsletter form on the home page.</p>
			</div>
		</div>

		<div class="actions">
			<a class="btn btn-primary" href="/">Back to home <span aria-hidden="true">↗</span></a>
			<a class="secondary-link" href="/writings">Explore the writings <span aria-hidden="true">→</span></a>
		</div>

		<p class="closing-note">Wishing you all the best. You're always welcome back.</p>
	</section>
</main>

<style>
	.confirmation-page {
		position: relative;
		isolation: isolate;
		display: grid;
		place-items: center;
		min-height: min(850px, 100vh);
		overflow: hidden;
		padding: 150px 24px 100px;
		background:
			radial-gradient(ellipse at 50% 38%, rgba(194, 151, 103, 0.075), transparent 45%),
			var(--color-bg-primary);
	}

	.ambient {
		position: absolute;
		z-index: -1;
		width: 340px;
		aspect-ratio: 1;
		border: 1px solid rgba(194, 151, 103, 0.08);
		border-radius: 50%;
		pointer-events: none;
	}

	.ambient::before,
	.ambient::after {
		position: absolute;
		inset: 24px;
		border: 1px solid rgba(194, 151, 103, 0.055);
		border-radius: inherit;
		content: '';
	}

	.ambient::after { inset: 50px; }
	.ambient-one { top: 8%; left: -230px; }
	.ambient-two { right: -240px; bottom: -210px; width: 440px; }

	.confirmation-card {
		width: min(100%, 660px);
		padding: clamp(32px, 7vw, 64px);
		text-align: center;
		background: linear-gradient(145deg, var(--color-bg-secondary), color-mix(in srgb, var(--color-bg-secondary), transparent 16%));
		border: 1px solid var(--card-border);
		border-radius: 28px;
		box-shadow: var(--shadow-xl), 0 0 80px rgba(194, 151, 103, 0.045);
		animation: arrive 700ms var(--ease-out) both;
	}

	.status-mark {
		display: grid;
		place-items: center;
		width: 76px;
		height: 76px;
		margin: 0 auto 28px;
		color: var(--color-accent-2);
		background: linear-gradient(145deg, rgba(194, 151, 103, 0.2), rgba(194, 151, 103, 0.07));
		border: 1px solid rgba(194, 151, 103, 0.32);
		border-radius: 50%;
		box-shadow: 0 0 38px rgba(194, 151, 103, 0.13), inset 0 1px rgba(255, 255, 255, 0.08);
	}

	.status-mark svg { width: 38px; height: 38px; }
	.status-mark path { stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; }

	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		margin: 0 0 16px;
		color: var(--color-accent-2);
		font-size: var(--font-size-xs);
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	.eyebrow span {
		width: 7px;
		height: 7px;
		background: var(--color-accent-1);
		border-radius: 50%;
		box-shadow: 0 0 12px var(--color-accent-1);
	}

	h1 {
		margin-bottom: 18px;
		font-size: clamp(2.4rem, 7vw, 3.8rem);
		letter-spacing: -0.045em;
		line-height: 1.08;
	}

	.intro {
		max-width: 475px;
		margin: 0 auto;
		color: var(--color-text-secondary);
		font-size: clamp(1rem, 2.5vw, 1.1rem);
		line-height: 1.85;
	}

	.next-up {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		margin: 34px 0 30px;
		padding: 20px;
		text-align: left;
		background: color-mix(in srgb, var(--color-bg-primary), transparent 28%);
		border: 1px solid var(--card-border);
		border-radius: var(--radius-lg);
	}

	.mail-icon {
		display: grid;
		place-items: center;
		flex: 0 0 40px;
		width: 40px;
		height: 40px;
		color: var(--color-accent-2);
		background: rgba(194, 151, 103, 0.1);
		border-radius: 12px;
	}

	.mail-icon svg { width: 21px; height: 21px; }
	.next-up h2 { margin: 1px 0 4px; font-family: var(--font-body); font-size: var(--font-size-sm); font-weight: 700; }
	.next-up p { margin: 0; color: var(--color-text-muted); font-size: var(--font-size-xs); line-height: 1.7; }

	.actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 20px; }
	.actions .btn { min-height: 48px; }
	.actions .btn span { font-size: 1.05em; }
	.secondary-link { color: var(--color-text-secondary); font-size: var(--font-size-sm); font-weight: 600; transition: color var(--duration-base); }
	.secondary-link:hover { color: var(--color-accent-2); }
	.secondary-link span { padding-left: 3px; }
	.closing-note { margin: 30px 0 0; color: var(--color-text-muted); font-size: var(--font-size-xs); }

	@keyframes arrive {
		from { opacity: 0; transform: translateY(18px) scale(0.99); }
		to { opacity: 1; transform: translateY(0) scale(1); }
	}

	@media (max-width: 520px) {
		.confirmation-page { min-height: 75vh; padding: 125px 16px 64px; }
		.confirmation-card { border-radius: 22px; }
		.next-up { padding: 16px; }
		.actions { flex-direction: column; gap: 15px; }
		.actions .btn { width: 100%; }
	}

	@media (prefers-reduced-motion: reduce) {
		.confirmation-card { animation: none; }
	}
</style>
