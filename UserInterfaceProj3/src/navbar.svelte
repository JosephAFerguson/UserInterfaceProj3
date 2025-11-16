<script>
    import Icon from '@iconify/svelte';
</script>

<div class="navbar-content">
    <div class="nav-item">  
        <a href="#/">
            <Icon icon="lucide:home" width="30" height="30"/>
            <p>Home</p>
        </a>
    </div>
    <div class="nav-item">  
        <a href="#/inbox">
            <Icon icon="lucide:inbox" width="30" height="30"/>
            <p>Inbox</p>
        </a>
    </div>
    <div class="nav-item">  
        <a href="#/bill">
            <Icon icon="lucide:receipt" width="30" height="30"/>
            <p>Billing</p>
        </a>
    </div>
    <div class="nav-item"> 
        <a href="#/settings"> 
            <Icon icon="lucide:settings" width="30" height="30"/>
            <p>Settings</p>
        </a>
    </div>
</div>

<style>
    .navbar-content {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background: var(--color-background-secondary);
    }

    .nav-item {
        display: grid;
        justify-content: center;
        text-align: center;
    }

    .navbar-content a {
        text-decoration: none;
        color: var(--color-text-primary);
        font-size: 0.9rem;
        font-weight: bold;
    }

    p{
        margin: 0;
    }
</style>
