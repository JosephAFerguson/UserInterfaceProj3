<script>
	// --- UTIL FUNCTIONS ---
	function daysAgo(date) {
		return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
	}

	function formatShort(date) {
		return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
	}

	function formatFull(date) {
		return date.toLocaleString("en-US", {
			weekday: "long",
			month: "long",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "2-digit"
		});
	}

	// --- MESSAGE GENERATOR ---
	function generateMessage(i) {
		const titles = [
			"Billing Update",
			"Service Maintenance",
			"Payment Confirmation",
			"Device Connected",
			"Security Alert",
			"Usage Notification",
			"Speed Upgrade",
			"Account Update",
			"Router Restarted",
			"Holiday Hours",
			"Promo Offer",
			"System Update",
			"Support Response",
			"Plan Suggestion",
			"App Feature Update"
		];

		const previews = [
			"Your latest bill is ready to view.",
			"We will perform maintenance tonight.",
			"Your recent payment was processed.",
			"A new device joined your network.",
			"We detected a login attempt.",
			"You’re reaching high data usage.",
			"A speed upgrade is available.",
			"Your profile was updated.",
			"Your router restarted for updates.",
			"Our holiday support hours changed.",
			"A discount is now available.",
			"A system update is scheduled.",
			"A support agent responded.",
			"We recommend a faster plan.",
			"A new dashboard is available."
		];

		const title = titles[i % titles.length];
		const preview = previews[i % previews.length];

		return {
			id: i + 1,
			title,
			preview,
			content: `${preview}\n\nThis is the full detailed content for the message titled "${title}". It includes multiple paragraphs to simulate a real email or system message.\n\nThank you for choosing Altafiber.`,
			date: new Date(Date.now() - Math.random() * 12 * 24 * 60 * 60 * 1000),
			unread: Math.random() > 0.5
		};
	}

	let messages = Array.from({ length: 20 }, (_, i) => generateMessage(i));

	let selected = null;

	function openMessage(msg) {
		selected = msg;
		msg.unread = false;
	}

	function deleteMessage(id) {
		messages = messages.filter(m => m.id !== id);
	}

	// --- GROUP MESSAGES ---
	function groupMessages(list) {
		const today = [];
		const yesterday = [];
		const week = [];
		const older = [];

		list.forEach(m => {
			const diff = daysAgo(m.date);

			if (diff < 1) today.push(m);
			else if (diff < 2) yesterday.push(m);
			else if (diff < 7) week.push(m);
			else older.push(m);
		});

		return { today, yesterday, week, older };
	}

	$: grouped = groupMessages(messages);
</script>

<!-- ===================== INBOX PAGE ===================== -->
<div class="inbox">

	<div class="header">Inbox</div>

	<div class="list">

		<!-- TODAY -->
		{#if grouped.today.length}
			<div class="label">Today</div>
			{#each grouped.today as m}
				<div class="row">

					<div class="click" on:click={() => openMessage(m)}>
						{#if m.unread}
							<div class="dot"></div>
						{/if}

						<div class="text">
							<div class="title">{m.title}</div>
							<div class="preview">{m.preview}</div>
						</div>
					</div>

					<div class="right">
						<div class="time">
							{m.date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
						</div>
						<div class="arrow">❯</div>
						<div class="delete" on:click={() => deleteMessage(m.id)}>🗑</div>
					</div>

				</div>
			{/each}
		{/if}

		<!-- YESTERDAY -->
		{#if grouped.yesterday.length}
			<div class="label">Yesterday</div>
			{#each grouped.yesterday as m}
				<div class="row">
					<div class="click" on:click={() => openMessage(m)}>
						{#if m.unread}<div class="dot"></div>{/if}

						<div class="text">
							<div class="title">{m.title}</div>
							<div class="preview">{m.preview}</div>
						</div>
					</div>

					<div class="right">
						<div class="time">Yesterday</div>
						<div class="arrow">❯</div>
						<div class="delete" on:click={() => deleteMessage(m.id)}>🗑</div>
					</div>
				</div>
			{/each}
		{/if}

		<!-- THIS WEEK -->
		{#if grouped.week.length}
			<div class="label">This Week</div>
			{#each grouped.week as m}
				<div class="row">
					<div class="click" on:click={() => openMessage(m)}>
						{#if m.unread}<div class="dot"></div>{/if}

						<div class="text">
							<div class="title">{m.title}</div>
							<div class="preview">{m.preview}</div>
						</div>
					</div>

					<div class="right">
						<div class="time">{m.date.toLocaleDateString("en-US", { weekday: "short" })}</div>
						<div class="arrow">❯</div>
						<div class="delete" on:click={() => deleteMessage(m.id)}>🗑</div>
					</div>
				</div>
			{/each}
		{/if}

		<!-- OLDER -->
		{#if grouped.older.length}
			<div class="label">Older</div>
			{#each grouped.older as m}
				<div class="row">
					<div class="click" on:click={() => openMessage(m)}>
						{#if m.unread}<div class="dot"></div>{/if}

						<div class="text">
							<div class="title">{m.title}</div>
							<div class="preview">{m.preview}</div>
						</div>
					</div>

					<div class="right">
						<div class="time">{formatShort(m.date)}</div>
						<div class="arrow">❯</div>
						<div class="delete" on:click={() => deleteMessage(m.id)}>🗑</div>
					</div>
				</div>
			{/each}
		{/if}

	</div>

</div>

<!-- ===================== FULL MESSAGE VIEW ===================== -->
{#if selected}
	<div class="message-page">

		<div class="topbar">
			<button class="back" on:click={() => (selected = null)}>←</button>
			<div class="top-title">Message</div>
		</div>

		<div class="meta">
			<div class="subject">{selected.title}</div>

			<div class="sender">
				<div class="avatar">{selected.title.slice(0, 1)}</div>
				<div>
					<div class="from">Altafiber System</div>
					<div class="email">noreply@altafiber.com</div>
				</div>
			</div>

			<div class="date-full">
				{formatFull(selected.date)}
			</div>
		</div>

		<div class="divider"></div>

		<div class="body">
			<pre>{selected.content}</pre>
		</div>

	</div>
{/if}

<style>
	/* INBOX PAGE */
	.inbox {
		height: calc(100vh - 70px);
		background: var(--color-lm-primary);
		display: flex;
		flex-direction: column;
	}

	.header {
		font-size: 1.6rem;
		font-weight: 700;
		padding: 1rem;
		color: var(--color-lm-other);
		border-bottom: 1px solid var(--color-lm-accent);
	}

	.list {
		flex: 1;
		overflow-y: auto;
	}

	.label {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-lm-bg3);
		padding: 1rem 1rem 0.3rem;
		text-transform: uppercase;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border-bottom: 1px solid var(--color-lm-accent);
		background: white;
	}

	/* LEFT */
	.click {
		display: flex;
		gap: 0.9rem;
		align-items: flex-start;
		cursor: pointer;
		flex: 1;
	}

	.dot {
		width: 10px;
		height: 10px;
		background: var(--color-lm-secondary);
		border-radius: 50%;
		margin-top: 5px;
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-lm-other);
	}

	.preview {
		font-size: 0.85rem;
		color: rgba(25, 25, 25, 0.65);
		max-width: 210px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* RIGHT */
	.right {
		display: flex;
		align-items: center;
		gap: 0.7rem;
	}

	.time {
		font-size: 0.82rem;
		color: rgba(25,25,25,0.55);
	}

	.arrow {
		font-size: 1.25rem;
		color: var(--color-lm-bg2);
	}

	.delete {
		font-size: 1.1rem;
		color: red;
		cursor: pointer;
	}

	/* FULL MESSAGE */
	.message-page {
		position: fixed;
		inset: 0;
		background: white;
		z-index: 200;
		display: flex;
		flex-direction: column;
	}

	.topbar {
		display: flex;
		align-items: center;
		padding: 1rem;
		border-bottom: 1px solid var(--color-lm-accent);
		gap: 1rem;
	}

	.back {
		background: none;
		border: none;
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--color-lm-bg2);
		cursor: pointer;
	}

	.top-title {
		font-size: 1.25rem;
		font-weight: 600;
	}

	.meta {
		padding: 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.subject {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--color-lm-other);
	}

	.sender {
		display: flex;
		align-items: center;
		gap: 0.7rem;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--color-lm-secondary);
		color: white;
		font-weight: 700;
		font-size: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.from {
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--color-lm-other);
	}

	.email {
		font-size: 0.8rem;
		color: rgba(25, 25, 25, 0.65);
	}

	.date-full {
		font-size: 0.85rem;
		color: rgba(25, 25, 25, 0.6);
	}

	.divider {
		height: 1px;
		background: var(--color-lm-accent);
	}

	.body {
		padding: 1rem;
		overflow-y: auto;
		flex: 1;
	}

	.body pre {
		white-space: pre-wrap;
		font-size: 0.95rem;
		line-height: 1.55;
		color: var(--color-lm-other);
	}
</style>
