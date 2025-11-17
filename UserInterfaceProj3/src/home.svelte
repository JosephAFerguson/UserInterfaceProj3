<script>
    import { billingHistory } from "./stores/user";
    import whiteAltaLogo from "/public/altafiber_text_logo_white.png";
    import checkMark from "/public/check-mark.png";
    import xMark from "/public/redx.png";

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

    // Static values for example
    let due_date = "11/26/2025";
    let rate = 500;
    let max_rate = 2000; // 2Gbps in Mbps

    let status = "down";
    let status_indicator = status === "up" ? checkMark : xMark;

    // Progress bar logic
    $: progress = (rate / max_rate) * 100;
    $: progressDegrees = (progress / 100) * 360;

    $: connection_status = status === "up" ? "Connected" : "Disconnected";
</script>

<div class="home-content">
    <h1>
        <img src={whiteAltaLogo} alt="Logo" height="50" style="display:block;margin:0 auto;"/>
    </h1>
    <div class="due-info">
        <div class="due-details">
            <p class="amount-due">${amount_due}</p>
            <p class="due-date">Due: {due_date}</p>
        </div>

        <a href="#/Payment" class="pay-now-btn">
            Pay Now
        </a>
    </div>

    <div class="bottom-section">
        <div class="rate">
            <div class="speed-meter">
                <svg width="240" height="240" viewBox="0 0 240 240">
                    <!-- Background circle -->
                    <circle cx="120" cy="120" r="80" 
                            stroke="rgba(255,255,255,0.3)" 
                            stroke-width="12" 
                            fill="none"/>
                    <!-- Progress circle -->
                    <circle cx="120" cy="120" r="80" 
                            stroke="var(--color-border-white)" 
                            stroke-width="12" 
                            fill="none"
                            stroke-dasharray="{2 * Math.PI * 80}"
                            stroke-dashoffset="{2 * Math.PI * 80 * (1 - progress / 100)}"
                            stroke-linecap="round"
                            transform="rotate(-90 120 120)"/>
                </svg>
                <div class="rate-text">
                    <p>{rate}Mbps</p>
                </div>
            </div>
        </div>
        <!-- Maybe add payment upgrade button here -->
        <div class="status">
            <img src={status_indicator} alt="Status Indicator" height="120"/>
            <p>Status: {connection_status}</p>
        </div>
    </div>
</div>

<style>
    .home-content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 7.5vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        color: var(--color-text-primary);
        padding: 1.5rem;
        box-sizing: border-box;
    }

    .due-info {
        margin-top: 1rem;
        background-color: var(--color-background-secondary);
        padding: 1.25rem;
        border-radius: 2.5rem;
        border: 2px solid var(--color-border-white);
        width: 16%;
        overflow: hidden;
        box-sizing: border-box;
    }

    .due-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .amount-due {
        font-size: 2.5rem;
        margin: 0;
        word-wrap: break-word;
        overflow-wrap: break-word;
    }

    .due-date {
        font-size: 1.5rem;
        margin: 0;
        text-align: right;
    }

    .pay-now-btn {
        display: block;
        margin: 1.2rem auto 0 auto;
        text-align: center;
        padding: 0.75rem 1.5rem;
        border: 2px solid var(--color-border-white);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
        border-radius: 1rem;
        font-size: 2rem;
        color: var(--color-text-secondary);
        text-decoration: none;
    }

    
    .bottom-section {
        flex: 1;
        display: flex;
        color: var(--color-text-secondary);
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 90%;
        max-width: 400px;
        margin-top: 20px;
    }
    
    .bottom-section .rate,
    .bottom-section .status {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .speed-meter {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .rate-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    
    .bottom-section .rate p {
        margin: 0;
        font-size: 1.8rem;
        font-weight: bold;
    }

    .max-rate {
        font-size: 1.1rem;
        opacity: 0.7;
        margin-top: 5px;
        display: block;
    }
    
    .bottom-section .status p {
        margin: 10px 0 0 0;
        font-size: 1.5rem;
    }
</style>