<script>
  import Router from "svelte-spa-router";

  import Navbar from "./navbar.svelte";
  import Home from './home.svelte';
  import Inbox from "./inbox.svelte";
  import Bill from './bill.svelte';
  import Settings from './settings.svelte';

    //our views here
  const routes = {
    '/': Home,
    '/Inbox': Inbox,
    '/Bill': Bill,
    '/settings': Settings
  };
</script>



<main class="content">
  <Router {routes}/>
</main>

<Navbar/>

