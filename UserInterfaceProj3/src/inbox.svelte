<script>
    
    const messageTemplates = [
        { title: "Your Bill is Ready", preview: "Your monthly bill for November 2024 is now available...", full: "Your monthly bill for November 2024 is now available.\n\nAccount Number: 847-29384-001\nBilling Period: Nov 1 - Nov 30, 2024\nAmount Due: $89.99\nDue Date: December 5, 2024\n\nServices:\n- High-Speed Internet 500 Mbps\n- Equipment Rental: $15\n- Taxes & Fees: $5\n\nYou can view and pay your bill through our mobile app.\n\nThank you for choosing AltaFibr!" },
        { title: "Scheduled Maintenance", preview: "We will be performing network maintenance in your area...", full: "We will be performing scheduled maintenance in your area.\n\nDate: November 20, 2024\nTime: 2:00 AM – 5:00 AM EST\nImpact: Possible brief interruptions.\n\nThis upgrade improves reliability.\n\nThank you for your patience!" },
        { title: "Payment Confirmation", preview: "Your recent payment has been processed successfully...", full: "Your payment of $89.99 has been successfully processed.\n\nConfirmation: AF-2024-893847\nMethod: Visa ending in 4242\nDate: November 16, 2024\n\nThank you for your prompt payment!" },
        { title: "Service Upgrade Available", preview: "Great news! Faster internet speeds are now available...", full: "Great news! Faster speeds are now available in your area.\n\nNew Plans Available:\n- 1 Gig\n- 2 Gig\n- 5 Gig\n\nUpgrade today and enjoy lightning-fast internet." }
    ];

    function getRandomMessage(i) {
        const t = messageTemplates[i % messageTemplates.length];
        return { title: t.title, preview: t.preview, full: t.full };
    }

   
    function smartDate(dateStr) {
        const now = new Date();
        const msg = new Date(dateStr);
        const d = 86400000;

        const diff = now.getTime() - msg.getTime();

        if (msg.toDateString() === now.toDateString()) {
            return msg.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
        }

        const yesterday = new Date(now.getTime() - d);
        if (msg.toDateString() === yesterday.toDateString()) return "Yesterday";

        if (diff < 7 * d) {
            return msg.toLocaleDateString([], { weekday: "long" });
        }

        return msg.toLocaleDateString([], { month: "short", day: "numeric" });
    }

    /* GENERATE 20 MESSAGES */

    let messages = Array.from({ length: 20 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const content = getRandomMessage(i);

        return {
            id: i + 1,
            title: content.title,
            preview: content.preview,
            full: content.full,
            date: d.toISOString(),
            unread: Math.random() > 0.5,
            selected: false
        };
    });

    let selectedMessage = null;
    let search = "";

    /* -------------------------------
        SELECTION MODE
    --------------------------------*/
    let massSelect = false;

    function enterSelectMode() {
        massSelect = true;
    }

    function cancelSelection() {
        massSelect = false;
        messages.forEach(m => (m.selected = false));
        messages = messages;
    }

    function toggleSelectAll() {
        const allSelected = filtered.every(m => m.selected);
        filtered.forEach(m => (m.selected = !allSelected));
        messages = messages;
    }

    $: selectedCount = messages.filter(m => m.selected).length;
    $: allSelected = filtered.length > 0 && filtered.every(m => m.selected);

   
    function openMsg(m) {
        if (massSelect) {
            m.selected = !m.selected;
            messages = messages;
        } else {
            m.unread = false;
            selectedMessage = m;
        }
    }

    let pendingDelete = null;
    let showConfirm = false;

    function askDelete(id) {
        pendingDelete = id;
        showConfirm = true;
    }

    function cancelDeletePopup() {
        pendingDelete = null;
        showConfirm = false;
    }

    function deleteNow() {
        messages = messages.filter(m => m.id !== pendingDelete);
        if (selectedMessage && selectedMessage.id === pendingDelete) selectedMessage = null;

        pendingDelete = null;
        showConfirm = false;
    }

    function deleteSelected() {
        messages = messages.filter(m => !m.selected);
        cancelSelection();
    }

    $: filtered = messages.filter(m =>
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.preview.toLowerCase().includes(search.toLowerCase())
    );
</script>
<div class="page">

    <!-- LIST VIEW -->
    {#if !selectedMessage}

        <div class="sticky-header">
            <h2 class="title">Inbox</h2>

            <!-- SEARCH BAR -->
            <div class="search-box">
                <input 
                    type="text" 
                    bind:value={search} 
                    placeholder="Search messages…" 
                />
            </div>

            {#if !massSelect}
                <div class="massbar">
                    <div class="mass-left" on:click={enterSelectMode}>
                        <span>Select</span>
                    </div>
                </div>

            {:else}
               
                <div class="select-header">
                    <div class="left-side">
                        <div class="sel-button" on:click={toggleSelectAll}>
                            <span>{allSelected ? 'Unselect All' : 'Select All'}</span>
                        </div>
                    </div>

                    <div class="sel-cancel" on:click={cancelSelection}>
                        Cancel
                    </div>
                </div>
            {/if}
        </div>

       
        <div class="list">
            {#each filtered as m}
                <div class="row">

                    <!-- Checkbox in select mode -->
                    {#if massSelect}
                        <input 
                            class="selbox" 
                            type="checkbox" 
                            bind:checked={m.selected}
                            on:change={() => (messages = messages)} 
                        />
                    {/if}

                    <!-- Message body -->
                    <div class="left" on:click={() => openMsg(m)}>
                        <div class="topline">
                            {#if m.unread}
                                <span class="dot"></span>
                            {:else}
                                <span class="dot-placeholder"></span>
                            {/if}
                            <div class="tt">{m.title}</div>
                        </div>

                        <div class="pp">{m.preview}</div>
                    </div>

                    {#if !massSelect}
                        <div class="right">
                            <div class="date">{smartDate(m.date)}</div>

                            <div 
                                class="del" 
                                on:click|stopPropagation={() => askDelete(m.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" style="fill:#FA5252;">
                                    <path d="M10.8 2C10.28 2 9.84 2.37 9.75 2.88L9.36 5H4C3.45 5 3 5.45 
                                    3 6C3 6.55 3.45 7 4 7H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 
                                    19 19V7H20C20.55 7 21 6.55 21 6C21 5.45 20.55 5 20 5H14.64L14.25 
                                    2.88C14.16 2.37 13.72 2 13.2 2H10.8Z"/>
                                </svg>
                            </div>
                        </div>
                    {/if}

                </div>
                <div class="separator"></div>
            {/each}
        </div>

        {#if massSelect && selectedCount > 0}
            <div class="sticky-delete-container">
                <button class="del-sel" on:click={deleteSelected}>
                    Delete Selected ({selectedCount})
                </button>
            </div>
        {/if}

    {/if}

    {#if selectedMessage}
        <div class="full">

            <div class="msg-header">
                <div class="back" on:click={() => (selectedMessage = null)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" 
                        fill="none" stroke="white" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </div>

                <div class="msg-header-content">
                    <div class="msg-title">{selectedMessage.title}</div>
                    <div class="msg-date-time">
                        {smartDate(selectedMessage.date)}
                    </div>
                </div>
            </div>

            <div class="msg-body">
                <div class="msg-content">
                    {selectedMessage.full}
                </div>
            </div>

            <div class="msg-actions">

                <button class="action-btn reply-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 17l-5-5 5-5M4 12h12a4 4 0 014 4v1"/>
                    </svg>
                    Reply
                </button>

                <button class="action-btn forward-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 17l5-5-5-5M20 12H8a4 4 0 01-4-4V7"/>
                    </svg>
                    Forward
                </button>

                <button 
                    class="action-btn delete-btn"
                    on:click={() => askDelete(selectedMessage.id)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6
                                 m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                    Delete
                </button>

            </div>
        </div>
    {/if}

    {#if showConfirm}
        <div class="overlay">
            <div class="popup">
                <p>Delete this message?</p>

                <div class="pop-btns">
                    <button class="cancel" on:click={cancelDeletePopup}>
                        Cancel
                    </button>
                    <button class="yes" on:click={deleteNow}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    {/if}


</div>


<style>


.page, .page * {
    max-width: 100% !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
}

.page {
    width: 100%;
    height: 100%;
    background: #012538; 
    color: white;
    position: relative;
}


.sticky-header {
    position: sticky;
    top: 0;
    background: #012538;
    z-index: 100;
    padding-bottom: 0.5rem;
}

.title {
    text-align: center;
    padding: 1rem 0 0.5rem;
    font-size: 1.5rem;
    margin: 0;
}


.search-box {
    padding: 0.5rem 0.9rem;
}

.search-box input {
    width: 100%;
    padding: 0.7rem 1rem;
    border-radius: 1rem;
    border: none;
    font-size: 1rem;
}

.massbar {
    padding: 0.6rem 0.9rem;
}

.mass-left {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 1rem;
}

.select-header {
    padding: 0.8rem 1rem;
    background: #012538;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left-side {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.sel-button {
    cursor: pointer;
    font-size: 1rem;
    color: #ffffff;
}

.sel-cancel {
    color: #4CA3FF;
    cursor: pointer;
    font-size: 1rem;
}


.sticky-delete-container {
    position: sticky;   
    bottom: 0;
    left: 0;
    right: 0;
	top: 0;
    padding: 1rem;
    background: rgba(1, 37, 56, 0.95);
    display: flex;
    justify-content: center;
    z-index: 50;  
}

.sticky-delete-container .del-sel {
    background: #FA5252;
    color: white;
    border: none;
    padding: 10px 12px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    width: 100%;
    box-shadow: 0 4px 15px rgba(250, 82, 82, 0.3);
}



.row {
    display: flex;
    padding: 1rem;
    background: white;
    color: black;
    width: 100%;
}

.separator {
    height: 1px;
    width: 100%;
    background: rgba(0,0,0,0.12);
}

.selbox {
    margin-right: 0.7rem;
}

.left {
    flex: 1;
    cursor: pointer;
}

.topline {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 1.2rem;
}

.dot {
    width: 8px;
    height: 8px;
    background: #6b9bd1;
    border-radius: 50%;
}

.dot-placeholder {
    width: 8px;
    height: 8px;
}

.tt {
    font-weight: bold;
    font-size: 1rem;
    flex: 1;
}

.pp {
    font-size: 0.85rem;
    opacity: 0.7;
    margin-left: 1.2rem;
    margin-top: 0.15rem;
}

.right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.4rem;
}

.date {
    font-size: 0.85rem;
    opacity: 0.7;
}

.del {
    cursor: pointer;
}


.full {
    background: #f8f9fa;
    color: black;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.msg-header {
    padding: 1.2rem 1rem;
    background: #012538;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.back {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    width: fit-content;
    padding: 0.3rem 0;
}

.back:hover {
    opacity: 0.85;
}

.msg-header-content {
    display: flex;
    flex-direction: column;
}

.msg-title {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.25rem;
}

.msg-date-time {
    font-size: 0.9rem;
    opacity: 0.85;
}

.msg-body {
    flex: 1;
    overflow-y: auto;
    background: white;
}

.msg-content {
    padding: 1.5rem;
    line-height: 1.7;
    white-space: pre-wrap;
    font-size: 0.95rem;
    max-width: 100%;
    color: #212121;
}


.msg-actions {
    display: flex;
    gap: 0.75rem;
    padding: 1rem;
    background: white;
    border-top: 1px solid #e6e6e6;
}

.action-btn {
    flex: 1;
    padding: 0.85rem 0.5rem;
    border-radius: 0.6rem;
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.45rem;
    cursor: pointer;
    background: white;
    border: 1.5px solid #ddd;
    transition: all 0.2s ease;
}

.action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.reply-btn {
    border-color: #012538;
    color: #012538;
}

.reply-btn:hover {
    background: #012538;
    color: white;
}

.forward-btn {
    border-color: #999;
    color: #555;
}

.forward-btn:hover {
    background: #f5f5f5;
}

.delete-btn {
    border-color: #dc3545;
    color: #dc3545;
}

.delete-btn:hover {
    background: #dc3545;
    color: white;
}
.overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
}

.popup {
    background: white;
    color: black;
    padding: 1rem;
    width: 70%;
    max-width: 240px;
    border-radius: 0.5rem;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.25);
}

.pop-btns {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

.cancel,
.yes {
    padding: 0.45rem 0.75rem;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    font-size: 0.9rem;
}

.cancel {
    background: #ccc;
}

.yes {
    background: #FA5252;
    color: white;
}
</style>