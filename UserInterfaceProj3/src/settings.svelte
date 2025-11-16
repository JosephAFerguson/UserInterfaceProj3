<script>
  import Icon from '@iconify/svelte';

  const settingsOptions = [
    { title: "Profile", icon: "mdi:account", route: "#/settings/profile" },
    { title: "Contact Us", icon: "mdi:phone", route: "#/settings/contact" },
    { title: "Autopay", icon: "mdi:repeat", route: "#/settings/autopay" },
    { title: "Payment Details", icon: "mdi:credit-card", route: "#/settings/payment-details" },
    { title: "eBilling Preferences", icon: "mdi:email-outline", route: "#/settings/ebilling" }
  ];
</script>

<div class="settings-page">
  <h2 class="section-header">Settings</h2>

  <div class="settings-list">
    {#each settingsOptions as item}
      <a href={item.route} class="settings-item" class:item-disabled={item.disabled}>
        <div class="left">
          <Icon icon={item.icon} width="24" height="24" class="icon"/>
          <span class="label">{item.title}</span>
        </div>
        <Icon icon="mdi:chevron-right" width="24" height="24" class="arrow"/>
      </a>
    {/each}
  </div>
</div>

<style>
  .settings-page {
    padding: 1.5rem;
    grid-area: content;
  }

  .section-header {
    color: var(--color-text-secondary);
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .settings-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .settings-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: #222;
    padding: 1rem;
    border: 1px solid var(--color-border-white);
    border-radius: 10px;
    background: var(--color-background-secondary);
    transition: background 0.2s ease;
  }

  .settings-item:hover {
    background: var(--color-border-white);
  }

  .left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .label {
    font-weight: 500;
  }

  .arrow {
    color: #007bff;
  }

  .item-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
