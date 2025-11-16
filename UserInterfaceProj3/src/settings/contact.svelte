<script>
  import Icon from '@iconify/svelte';
  import { user } from '../stores/user.js';

  let name = $user.name || "";
  let email = $user.email || "";
  let message = "";
  let successMessage = "";
  let errorMessage = "";
  let resetTimer;

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function sendMessage() {
    // Validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      errorMessage = "Please complete all fields.";
      successMessage = "";
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => errorMessage = "", 3000);
      return;
    }

    if (!isValidEmail(email)) {
      errorMessage = "Please enter a valid email address.";
      successMessage = "";
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => errorMessage = "", 3000);
      return;
    }

    // Success
    successMessage = "Your message has been sent!";
    errorMessage = "";
    name = $user.name || "";
    email = $user.email || "";
    message = "";
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

<div class="contact-page">
  <div class="header">
    <a href="#/settings" class="back-button">
      <Icon icon="mdi:chevron-left" width="24" height="24" />
      Back
    </a>
    <h2>Contact Us</h2>
    <p class="subtext">
      We're here to help. Send us a message and we'll get back to you shortly.
    </p>
  </div>

  <form on:submit|preventDefault={sendMessage}>
    <label>
      Your Name
      <input 
        type="text" 
        bind:value={name} 
        placeholder="Enter your name"
        aria-label="Your name"
      />
    </label>

    <label>
      Email Address
      <input 
        type="email" 
        bind:value={email} 
        placeholder="your.email@example.com"
        aria-label="Email address"
      />
    </label>

    <label>
      Message
      <textarea 
        rows="5" 
        bind:value={message}
        placeholder="How can we help you?"
        aria-label="Your message"
      ></textarea>
    </label>

    <button type="submit">Send Message</button>
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

  .contact-page {
    padding: 1.5rem;
    padding-bottom: 6rem;
    grid-area: content;
    color: #222;
    overflow-y: auto;
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

  input,
  textarea {
    padding: 0.75rem;
    font-size: 1rem;
    color: var(--color-text-primary);
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 0.25rem;
    background-color: #f7f7f7;
    transition: border 0.2s ease;
    resize: vertical;
    font-family: inherit;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--color-background-secondary);
  }

  input::placeholder,
  textarea::placeholder {
    color: #999;
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

  button:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
</style>