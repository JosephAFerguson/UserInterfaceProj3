<script>
  import {previousPage} from "../stores/user";
  import Icon from '@iconify/svelte';
  import { user } from '../stores/user.js';

  let cardNumber = $user.cardNumber || "";
  let cardHolder = $user.cardHolder || "";
  let expiry = $user.cardExpiry || "";
  let cvv = $user.cardCvv || "";
  let successMessage = "";
  let errorMessage = "";
  let resetTimer;

  let back = $previousPage || "/settings";

  function formatCardNumber(value) {
    const digits = value.replace(/\D/g, '');
    const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    return formatted.slice(0, 19);
  }

  function formatExpiry(value) {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2, 4);
    }
    return digits;
  }

  function handleCardNumberInput(event) {
    cardNumber = formatCardNumber(event.target.value);
  }

  function handleExpiryInput(event) {
    expiry = formatExpiry(event.target.value);
  }

  function handleCvvInput(event) {
    cvv = event.target.value.replace(/\D/g, '').slice(0, 4);
  }

  function validateCard() {
    const cardDigits = cardNumber.replace(/\D/g, '');
    if (cardDigits.length !== 16) {
      return "Card number must be 16 digits";
    }

    if (!cardHolder || cardHolder.trim().length < 3) {
      return "Please enter a valid cardholder name";
    }

    const expiryDigits = expiry.replace(/\D/g, '');
    if (expiryDigits.length !== 4) {
      return "Please enter expiry date in MM/YY format";
    }

    const month = parseInt(expiryDigits.slice(0, 2));
    const year = parseInt(expiryDigits.slice(2, 4));
    
    if (month < 1 || month > 12) {
      return "Invalid expiry month";
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "Card has expired";
    }

    if (cvv.length < 3 || cvv.length > 4) {
      return "CVV must be 3 or 4 digits";
    }

    return null;
  }

  function saveCard() {
    const error = validateCard();
    
    if (error) {
      errorMessage = error;
      successMessage = "";
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => errorMessage = "", 3000);
      return;
    }

    const cardDigits = cardNumber.replace(/\D/g, '');
    const last4 = cardDigits.slice(-4);
    
    user.update(u => ({
      ...u,
      cardNumber: cardNumber,
      cardLast4: last4,
      cardHolder: cardHolder,
      cardExpiry: expiry,
      cardCvv: cvv
    }));

    successMessage = "Payment details updated successfully!";
    errorMessage = "";
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => successMessage = "", 3000);
  }
</script>

{#if successMessage}
  <div class="toast success-toast" role="alert">
    {successMessage}
  </div>
{/if}

{#if errorMessage}
  <div class="toast error-toast" role="alert">
    {errorMessage}
  </div>
{/if}

<div class="payment-page">
  <div class="header">
    <a href={back} class="back-button">
      <Icon icon="mdi:chevron-left" width="24" height="24" />
      Back
    </a>
    <h2>Payment Details</h2>
    <p class="subtext">Manage the payment method used for one-time payments and autopay.</p>
  </div>

  <form on:submit|preventDefault={saveCard}>
    <label>
      Card Number
      <input 
        type="text" 
        bind:value={cardNumber}
        on:input={handleCardNumberInput}
        placeholder="1234 5678 9012 3456"
        maxlength="19"
      />
    </label>

    <label>
      Card Holder Name
      <input 
        type="text" 
        bind:value={cardHolder}
        placeholder="Name on card"
      />
    </label>

    <label>
      Expiry Date
      <input 
        type="text" 
        bind:value={expiry}
        on:input={handleExpiryInput}
        placeholder="MM/YY"
        maxlength="5"
      />
    </label>

    <label>
      CVV
      <input 
        type="text" 
        bind:value={cvv}
        on:input={handleCvvInput}
        placeholder="123"
        maxlength="4"
      />
    </label>

    <button type="submit">Save Card</button>
  </form>
</div>

<style>
  .toast {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    border-radius: 8px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideDown 0.3s ease-out;
    z-index: 1000;
    max-width: 90%;
  }

  .success-toast {
    background-color: #ecfdf5;
    color: #047857;
    border: 1px solid #a7f3d0;
  }

  .error-toast {
    background-color: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }

  @keyframes slideDown {
    from { 
      opacity: 0; 
      transform: translateX(-50%) translateY(-20px);
    }
    to { 
      opacity: 1; 
      transform: translateX(-50%) translateY(0);
    }
  }

  .payment-page {
    padding: 1.5rem;
    grid-area: content;
    
  }

  .header {
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
    color: var(--color-text-secondary);
    font-size: 1.5rem;
    font-weight: bold;
  }

  .subtext {
    font-size: 1rem;
    color: var(--color-text-subtext);
    margin-top: 0.25rem;
    line-height: 1.6;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    max-width: 480px;
    background: var(--color-border-white);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }

  label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    font-size: 0.95rem;
  }

  input {
    padding: 0.75rem;
    font-size: 1rem;
    color: var(--color-text-primary);
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 0.25rem;
    background-color: #f7f7f7;
    transition: border 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: #2563eb;
  }

  button {
    padding: 0.75rem;
    font-size: 1rem;
    background-color: var(--color-background-secondary);
    color: var(--color-text-primary);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    letter-spacing: 0.3px;
  }

  button:hover {
    background-color: #1e40af;
  }
</style>