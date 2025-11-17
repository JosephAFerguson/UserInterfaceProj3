<script>
    import { billingHistory } from "./stores/user";

    // Properly pull data from the store using $ shorthand
    $: bills = $billingHistory;

    // Ordered months (newest first)
    const monthOrder = [
        "November", "October", "September", "August", "July", "June",
        "May", "April", "March", "February", "January", "December"
    ];

    // Determine latest available month
    $: latestMonth = monthOrder.find(m => bills[m]); 

    // Read amount from store
    $: amount_due = bills[latestMonth]?.amount || "0.00";

    // Static values for example
    let due_date = "11/26/2025";
    let rate = 500;
    let max_rate = 2000; // 2Gbps in Mbps

    let status = "up";
    $: status_indicator = status === "up"
        ? "./public/check-mark.png"
        : "./public/x-mark.png";

    // Progress bar logic
    $: progress = (rate / max_rate) * 100;
    $: progressDegrees = (progress / 100) * 360;
</script>

<div class="home-content">
    <h1>
        <img src="./public/altafiber_text_logo_white.png" alt="Logo" height="50" style="display:block;margin:0 auto;"/>
    </h1>
    <div class="due-info">
        <p class="pay-now">Pay Now</p>
        <p class="amount-due">
            ${amount_due}
        </p>
        <p class = "due-date">
            Due: {due_date}
        </p>
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
                            stroke="var(--color-lm-bg2)" 
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
        <div class="status">
            <img src={status_indicator} alt="Status Indicator" height="120"/>
            <p>Status</p>
        </div>
    </div>
</div>

<style>
    .home-content {
        display: flex;
        flex-direction: column;
        grid-area: content;
        background-color: var(--color-lm-secondary);
        height: 100%;
        color: var(--color-lm-bg2);
        padding: 20px;
        box-sizing: border-box;
    }
    .due-info {
        margin-top: 1rem;
        background-color: var(--color-lm-primary);
        padding: 1.25rem;
        border-radius: 2.5rem;
    }
    .pay-now {
        font-size: 2rem;
        text-align: center;
        margin: 0;
    }
    .amount-due {
        font-size: 4.5rem;
        text-align: center;
        margin: 0;
    }
    .due-date {
        font-size: 1.5rem;
        text-align: center;
        margin: 0;
    }
    
    .bottom-section {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 66.67%;
        margin: 0 auto;
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