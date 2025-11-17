<script>
    import { billingHistory } from "./stores/user";
    import { get } from "svelte/store";
    import {previousPage} from "./stores/user";

    previousPage.set("#/bill");

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
            amountTotal: bills[m].amountPaid + bills[m].amountDue,
            amountDue: bills[m].amountDue,
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
                    <span class="amount">${month.amountTotal}</span>
                </div>
                

                {#if openMonth === index}
                    <div class="bill-details">
                        <p><strong>Monthly Bill:</strong> ${month.amountTotal}</p>
                        <p>Status: {month.status}</p>
                        {#if month.status !== "Paid"}
                            <p>Amount Left: ${month.amountDue.toFixed(2)}</p>
                        {/if}
                        <p class="download">Download Invoice (PDF)</p>
                    </div>
                {/if}
            </div>
        {/each}
    </div>

    <a class="bill-help-button" href="#/settings/contact">?</a>
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
        color: var(--color-text-secondary);
    }

    .bill-list {
        display: grid;
        gap: 0.75rem;
    }

    .bill-item {
        border: 1px solid var(--color-border-white);
        border-radius: 10px;
        overflow: hidden;
        color: var(--color-text-primary);
        background: var(--color-background-secondary);
    }

    .bill-header {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        cursor: pointer;
        font-weight: bold;
        transition: background 0.2s ease;
    }

    .bill-header:hover {
        background: var(--color-border-white);
    }

    .bill-details {
        padding: 1rem;
        background: var(--color-lm-bg2);
        border-top: 1px solid #ddd;
        font-size: 0.95rem;
    }

    .download {
        color: var(--color-text-secondary);
        cursor: pointer;
        margin-top: 0.5rem;
    }

    .amount {
        color: var(--color-lm-primary);
    }

    .bill-help-button {
        z-index: 999;
        position: absolute;
        border-radius: max(3rem);
        background: var(--color-background-secondary);
        border: 2px solid var(--color-border-white);
        margin-top: 82.5vh;
        margin-left: 31vh;
        height: 4vh;
        width: 4vh;
        justify-self: center;
        align-content: center;
        text-align: center;
        color: var(--color-text-primary);
        text-decoration: none;
        font-size: 2rem;
        line-height: 3vh;
    }

    .bill-help-button:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
</style>
