<script>
    import { billingHistory } from "./stores/user";
    import { get } from "svelte/store";

    // Get store data
    let bills = get(billingHistory);

    // Month order (newest → oldest)
    const monthOrder = [
        "November", "October", "September", "August", "July", "June",
        "May", "April", "March", "February", "January", "December"
    ];

    // Convert store object into sorted array
    let months = monthOrder
        .filter(m => bills[m]) // ensure month exists
        .map(m => ({
            name: m,
            amount: bills[m].amount,
            status: bills[m].status
        }));

    // Latest month open
    let openMonth = 0;

    function toggle(index) {
        openMonth = openMonth === index ? null : index;
    }
</script>

<div class="bill-content">
    <h2>Bill Summary</h2>

    <div class="bill-list">
        {#each months as month, index}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="bill-item">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <div class="bill-header" on:click={() => toggle(index)}>
                    <span>{month.name}</span>
                    <span class="amount">${month.amount}</span>
                </div>

                {#if openMonth === index}
                    <div class="bill-details">
                        <p><strong>Monthly Bill:</strong> ${month.amount}</p>
                        <p>Status: {month.status}</p>
                        <p class="download">Download Invoice (PDF)</p>
                    </div>
                {/if}
            </div>
        {/each}
    </div>

    <div class="bill-help-button">
        <a href="#/settings/contact">?</a>
    </div>
</div>

<style>
    .bill-content {
        grid-area: content;
        padding: 1.5rem;
        display: grid;
        gap: 1rem;
    }

    .bill-content h2{
        text-align: center;
        margin-bottom: 1rem;
        color: var(--color-text-primary);
    }

    .bill-list {
        display: grid;
        gap: 0.75rem;
    }

    .bill-item {
        border: 1px solid var(--color-lm-secondary);
        border-radius: 10px;
        overflow: hidden;
        background: var(--color-lm-bg2);
    }

    .bill-header {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        cursor: pointer;
        background: var(--color-lm-bg2);
        font-weight: bold;
        transition: background 0.2s ease;
    }

    .bill-header:hover {
        background: var(--color-lm-bg2);
    }

    .bill-details {
        padding: 1rem;
        background: var(--color-lm-bg2);
        border-top: 1px solid #ddd;
        font-size: 0.95rem;
    }

    .download {
        color: var(--color-lm-primary);
        cursor: pointer;
        margin-top: 0.5rem;
    }

    .amount {
        color: #333;
    }

    .bill-help-button {
        z-index: 999;
        position: absolute;
        border-radius: max(3rem);
        border: 2px solid var(--color-lm-primary);
        margin-top: 82.5vh;
        margin-left: 31vh;
        height: 4vh;
        width: 4vh;
        justify-self: center;
        align-content: center;
        text-align: center;
    }

    .bill-help-button:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
    .bill-help-button a {
        text-decoration: none;
        color: var(--color-lm-primary);
        font-size: 2rem;
        line-height: 3vh;
    }
</style>
