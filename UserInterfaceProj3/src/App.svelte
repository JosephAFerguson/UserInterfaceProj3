<script>
  import Router from "svelte-spa-router";

  import Navbar from "./navbar.svelte";
  import Home from './home.svelte';
  import Inbox from "./inbox.svelte";
  import Bill from './bill.svelte';
  import Settings from './settings.svelte';
  import Profile from './settings/profile.svelte';
  import Contact from './settings/contact.svelte';
  import Autopay from './settings/autopay.svelte';
  import PaymentDetails from './settings/payment-details.svelte';
  import Ebilling from './settings/ebilling.svelte';
  import Payment from './payment.svelte';

    //our views here
  const routes = {
    '/': Home,
    '/Payment': Payment,
    '/Inbox': Inbox,
    '/Bill': Bill,
    '/settings': Settings,
    '/settings/profile': Profile,
    '/settings/contact': Contact,
    '/settings/autopay': Autopay,
    '/settings/payment-details': PaymentDetails,
    '/settings/ebilling': Ebilling
  };
</script>



<main class="content">
  <Router {routes}/>
</main>

<Navbar/>

