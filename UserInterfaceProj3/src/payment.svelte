<script>
    import { user } from "./stores/user";
    import { billingHistory } from "./stores/user";
    import {previousPage} from "./stores/user";

    $: bills = $billingHistory;

    const monthOrder = [
        "November", "October", "September", "August", "July", "June",
        "May", "April", "March", "February", "January", "December"
    ];

    // Find newest active month
    $: latestMonth = monthOrder.find(m => bills?.[m]);

    // Total amount due across all months
    $: amount_due = bills
        ? Object.values(bills).reduce((sum, month) => sum + (month.amountDue || 0), 0).toFixed(2)
        : "0.00";

    // Auto-set payment box to full amount if it changes
    $: selectedAmount = amount_due;

    // Last 4 digits of card
    $: cardLast4 =
        $user?.cardNumber ? String($user.cardNumber).slice(-4) : "----";

    let due_date = "11/26/2025";
    let resetTimer;
    let successMessage = "";
    let errorMessage = "";

    function submitPayment() {
        const amount = parseFloat(selectedAmount);

        // reset messages first
        successMessage = "";
        errorMessage = "";

        if (amount <= 0) {
            errorMessage = "Please enter a valid payment amount";
            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => errorMessage = "", 3000);
            return;
        }

        billingHistory.update(history => {
            // process payment across months
            const reversedMonths = [...monthOrder].reverse();
            let remaining = amount;

            for (const month of reversedMonths) {
                const m = history[month];
                if (!m || m.amountDue <= 0) continue;

                const due = m.amountDue;

                if (remaining >= due) {
                    history[month] = {
                        ...m,
                        amountDue: 0,
                        amountPaid: parseFloat(m.amountPaid) + due,
                        status: "Paid"
                    };
                    remaining -= due;
                } else {
                    history[month] = {
                        ...m,
                        amountDue: parseFloat((due - remaining).toFixed(2)),
                        amountPaid: parseFloat(m.amountPaid) + remaining,
                        status: due - remaining <= 0 ? "Paid" : "Unpaid"
                    };
                    remaining = 0;
                    break;
                }
            }

            return history;
        });
        
        successMessage = "Payment applied successfully!";
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => successMessage = "", 3000);
    }

    previousPage.set("#/payment"); // set previous page for navigation back from payment details

</script>

{#if successMessage}
  <div class="toast success-toast" role="alert">
    {successMessage}
  </div>
{/if}

{#if errorMessage}
  <div class="toast error-toast" role="alert">
    {errorMessage}
  </div>
{/if}

<div class="payment-content">

    <h1 class="payment-title">Make a Payment</h1>

    <div class="due-details">
        <h3 class="amount-due">Amount Due: ${amount_due}</h3>
        <h3 class="due-date">Due Date: {due_date}</h3>
    </div>

    <div class="amount-select">
        <label for="payment-amount">Payment Amount</label>
        <input 
            id="payment-amount"
            type="number"
            min="0"
            step="0.01"
            bind:value={selectedAmount}
        />

        <button 
            class="full-amount-btn"
            on:click={() => (selectedAmount = amount_due)}
        >
            Pay Full Amount
        </button>
    </div>

    <div class="using-payment">
        <p class="card-label">Card Ending In</p>
        <p class="card-last4">{cardLast4}</p>

        <a href="#/settings/payment-details" class="update-method">
            Change Payment Method
        </a>
    </div>
    
    <button class="pay-btn" on:click={submitPayment}>
        Submit Payment
    </button>

</div>



<style>
.payment-content {
    grid-area: content;
    display: flex;
    flex-direction: column;
    background-color: var(--color-background-primary);
    color: var(--color-text-secondary);
    padding: 1.5rem;
    box-sizing: border-box;
    height: 100%;
}

.payment-title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 2rem;
}

.due-details {
    display: flex;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    color: var(--color-text-primary);
    margin-top: 1rem;
    background-color: var(--color-background-secondary);
    padding: 1.25rem;
    border-radius: 1rem;
    border: 2px solid var(--color-border-white);
}
.toast {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    border-radius: 8px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideDown 0.3s ease-out;
    z-index: 1000;
    max-width: 90%;
  }

.success-toast {
    background-color: #ecfdf5;
    color: #047857;
    border: 1px solid #a7f3d0;
}

.error-toast {
    background-color: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
}

@keyframes slideDown {
    from { 
      opacity: 0; 
      transform: translateX(-50%) translateY(-20px);
    }
    to { 
      opacity: 1; 
      transform: translateX(-50%) translateY(0);
    }
  }

.amount-select {
    margin-top: 2rem;;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.amount-select input {
    padding: 0.75rem;
    border-radius: 1rem;
    border: 2px solid var(--color-border-white);
    background: var(--color-border-primary);
    color: var(--color-text-secondary);
    font-size: 1.2rem;
}

.full-amount-btn {
    padding: 0.75rem;
    border-radius: 1rem;
    border: 2px solid var(--color-border-white);
    background: var(--color-background-secondary);
    color: var(--color-text-primary);
    font-size: 1.1rem;
    cursor: pointer;
}

.using-payment {
    display: grid;
    grid-template-columns: auto 1fr;
    row-gap: 0.2rem;
    margin-bottom: 2rem;
}

.card-label {
    opacity: 0.8;
}

.card-last4 {
    text-align: right;
    font-weight: bold;
    font-size: 1.2rem;
}

.update-method {
    grid-column: 1 / span 2;
    text-align: right;
    font-size: 0.95rem;
    text-decoration: underline;
    color: var(--color-text-secondary);
    margin-top: 0.3rem;
}

.pay-btn {
    margin-top: auto;
    padding: 1rem;
    border-radius: 1rem;
    font-size: 1.3rem;
    color: var(--color-text-primary);
    background: var(--color-background-secondary);
    border: 2px solid var(--color-border-white);

    /* shadow */
    box-shadow: 0 4px 12px rgba(0,0,0,0.28);
    cursor: pointer;

    transition: transform 0.15s ease, box-shadow 0.15s ease;
}

</style>