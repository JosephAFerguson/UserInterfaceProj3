<script>
  import Icon from '@iconify/svelte';
  import { user } from '../stores/user.js';
  
  $: ebillingEnabled = $user.ebillingEnabled ?? true;
  let successMessage = "";
  let messageType = "on";
  let resetTimer;
  
  function toggleEbilling(event) {
    const newValue = event.target.checked;
    
    if (!$user.email) {
      successMessage = "Please add an email address first";
      messageType = "off";
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => successMessage = "", 3000);
      event.target.checked = ebillingEnabled;
      return;
    }
    
    user.update(u => ({ ...u, ebillingEnabled: newValue }));
    
    messageType = newValue ? "on" : "off";
    successMessage = newValue
      ? "eBilling has been turned ON"
      : "eBilling has been turned OFF";
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => successMessage = "", 3000);
  }
</script>

<div class="ebilling-page">
  <div class="header">
    <a href="#/settings" class="back-button">
      <Icon icon="mdi:chevron-left" width="24" height="24" />
      Back
    </a>
    <h2>eBilling Preferences</h2>
    <p class="subtext">
      Go paperless and receive your monthly statements directly via email.
    </p>
  </div>

  <div class="ebilling-section">
    <div class="toggle-row">
      <span class="label">Enable eBilling</span>
      <label class="switch">
        <input type="checkbox" checked={ebillingEnabled} on:change={toggleEbilling} />
        <span class="slider"></span>
      </label>
    </div>

    {#if successMessage}
      <p class="success {messageType}">{successMessage}</p>
    {/if}
  </div>

  <p class="email-note">
    Statements will be sent to <strong>{$user.email}</strong>.
    <a href="#/settings/profile" class="change-link">Update</a>
  </p>
</div>

<style>
  .ebilling-page {
    padding: 1.5rem;
    grid-area: content;
  }

  .header {
    color: var(--color-text-secondary);
    margin-bottom: 2rem;
  }

  .back-button {
    text-decoration: none;
    color: var(--color-background-secondary);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .subtext {
    font-size: 1rem;
    color: var(--color-text-subtext);
    margin-top: 0.25rem;
    line-height: 1.6;
  }

  .ebilling-section {
    border-radius: 12px;
    padding: 1.5rem;
    max-width: 480px;
    background: var(--color-border-white);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }

  .toggle-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .label {
    font-weight: 500;
    font-size: 1.1rem;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 26px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: #ccc;
    transition: 0.3s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  .switch input:checked + .slider {
    background-color: var(--color-background-secondary);
  }

  .switch input:checked + .slider:before {
    transform: translateX(22px);
  }

  .success {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    border-radius: 8px;
    margin-top: 1rem;
    font-weight: 500;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
    animation: fadeIn 0.3s ease-out;
  }

  .success.on {
    background-color: #ecfdf5;
    color: #047857;
    border: 1px solid #a7f3d0;
  }

  .success.off {
    background-color: #fef2f2;
    color: #b91c1c;
    border: 1px solid #fecaca;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .email-note {
    font-size: 0.9rem;
    color: var(--color-text-subtext);
    margin-top: 1rem;
  }

  .change-link {
    margin-left: 0.5rem;
    color: var(--color-background-secondary);
    text-decoration: underline;
    font-weight: 500;
  }
</style>
