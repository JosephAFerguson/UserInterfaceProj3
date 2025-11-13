<script>

</script>

<div class="navbar-content">
    <div class="navbar-home">  
        <a href="#/">
            <img src="logo.png" alt="Logo" width="30" height="30"/>
            <p>Home</p>
        </a>
    </div>
    <div class="navbar-inbox">  
        <a href="#/">
            <img src="logo.png" alt="Logo" width="30" height="30"/>
            <p>Inbox</p>
        </a>
    </div>
    <div class="navbar-bill">  
        <a href="#/">
            <img src="logo.png" alt="Logo" width="30" height="30"/>
            <p>Billing</p>
        </a>
    </div>
    <div class="navbar-settings"> 
        <a href="#/"> 
            <img src="logo.png" alt="Logo" width="30" height="30"/>
            <p>Settings</p>
        </a>
    </div>
</div>

<style>
    .navbar-content {
        display: flex;
        grid-area: navbar-content;
        background: var(--color-lm-primary);
        align-items: center;         
        justify-content: center;      
        overflow: hidden;
        gap: 12%;                 
    }

    .navbar-inbox, 
    .navbar-home, 
    .navbar-bill, 
    .navbar-settings {
        display: grid;
        grid-template-rows: auto auto;
        justify-content: center;     
    }

    .navbar-content a {
        align-items: center;         
        text-decoration: none;
        color: var(--color-lm-on-primary);
        font-size: 0.9rem;
        font-weight: bold;
    }
</style>