<script>
  import Icon from '@iconify/svelte';
  import { user } from '../stores/user.js';
  
  $: autopayEnabled = $user.autopayEnabled ?? false;
  $: hasPaymentMethod = $user.cardLast4 && $user.cardLast4.length > 0;
  
  let successMessage = "";
  let messageType = "on";
  let resetTimer;

  function toggleAutopay(event) {
    const newValue = event.target.checked;
    
    if (newValue && !hasPaymentMethod) {
      successMessage = "Please add a payment method first";
      messageType = "off";
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => successMessage = "", 3000);
      event.target.checked = false; 
      return;
    }
    
    user.update(u => ({ ...u, autopayEnabled: newValue }));
    
    messageType = newValue ? "on" : "off";
    successMessage = newValue
      ? "Autopay has been turned ON"
      : "Autopay has been turned OFF";

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => successMessage = "", 3000);
  }
</script>

<div class="autopay-page">
  <div class="header">
    <a href="#/settings" class="back-button">
      <Icon icon="mdi:chevron-left" width="24" height="24" />
      Back
    </a>
    <h2>Autopay</h2>
    <p class="subtext">
      Automatically pay your bill each month using your saved payment method.
    </p>
  </div>

  <div class="autopay-section">
    <div class="toggle-row">
      <span class="label">Enable Autopay</span>
      <label class="switch">
        <input 
          type="checkbox" 
          checked={autopayEnabled} 
          on:change={toggleAutopay}
          disabled={!hasPaymentMethod}
        />
        <span class="slider" class:disabled={!hasPaymentMethod}></span>
      </label>
    </div>

    {#if successMessage}
      <p class="success {messageType}">{successMessage}</p>
    {/if}
  </div>
  
  {#if autopayEnabled && hasPaymentMethod}
    <p class="schedule-preview">
      Your next payment is scheduled for <strong>{$user.nextPaymentDate || "TBD"}</strong>.
    </p>
  {/if}
  
  {#if hasPaymentMethod}
    <p class="payment-note">
      Payments will be charged to your saved card ending in <strong>{$user.cardLast4}</strong>.
      <a href="#/settings/payment-details" class="change-link">Update</a>
    </p>
  {:else}
    <p class="payment-note warning">
      <Icon icon="mdi:alert-circle" width="16" height="16" />
      No payment method on file.
      <a href="#/settings/payment-details" class="change-link">Add one</a>
    </p>
  {/if}
</div>

<style>
  .autopay-page {
    padding: 1.5rem;
    grid-area: content;
    background-color: #fff;
    color: #222;
  }

  .header {
    margin-bottom: 2rem;
  }

  .back-button {
    text-decoration: none;
    color: #2563eb;
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
    color: #555;
    margin-top: 0.25rem;
    line-height: 1.6;
  }

  .autopay-section {
    background: #f9f9f9;
    border-radius: 12px;
    padding: 1.5rem;
    max-width: 480px;
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
    background-color: #2563eb;
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

  .payment-note {
    font-size: 0.9rem;
    color: #555;
    margin-top: 1rem;
  }

  .change-link {
    margin-left: 0.5rem;
    color: #2563eb;
    text-decoration: underline;
    font-weight: 500;
  }

  .schedule-preview {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.25rem;
    line-height: 1.4;
  }

  .slider.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .payment-note.warning {
    color: #dc2626;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
</style>
