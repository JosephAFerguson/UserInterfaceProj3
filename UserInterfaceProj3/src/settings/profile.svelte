<script>
  import Icon from '@iconify/svelte';
  import { user } from '../stores/user.js';

  let profile = { ...$user };
  
  $: if ($user) {
    profile = { ...$user };
  }

  let successMessage = "";
  let errorMessage = "";
  let resetTimer;
  let fileInput;

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    if (!phone) return true;
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  }

  function saveProfile() {
    if (!profile.name || !profile.name.trim()) {
      showError("Please enter your name");
      return;
    }

    if (!profile.email || !isValidEmail(profile.email)) {
      showError("Please enter a valid email address");
      return;
    }

    if (profile.phone && !isValidPhone(profile.phone)) {
      showError("Please enter a valid phone number");
      return;
    }

    user.set(profile); 
    showSuccess("Profile saved successfully!");
  }

  function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showError("Please upload an image file");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showError("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      profile.photo = e.target.result;
      user.set(profile);
      showSuccess("Photo uploaded successfully!");
    };
    reader.onerror = () => {
      showError("Failed to upload photo");
    };
    reader.readAsDataURL(file);
  }

  function triggerFileInput() {
    fileInput.click();
  }

  function removePhoto() {
    profile.photo = null;
    user.set(profile);
    if (fileInput) {
      fileInput.value = '';
    }
    showSuccess("Photo removed");
  }

  function showSuccess(message) {
    errorMessage = "";
    successMessage = message;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => successMessage = "", 3000);
  }

  function showError(message) {
    successMessage = "";
    errorMessage = message;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => errorMessage = "", 3000);
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

<div class="profile-page">
  <div class="header">
    <a href="#/settings" class="back-button">
      <Icon icon="mdi:chevron-left" width="24" height="24" />
      Back
    </a>
    <h2>Profile</h2>
  </div>

  <div class="photo-section">
    <div class="photo-container">
      <div class="photo-preview">
        {#if profile.photo}
          <img src={profile.photo} alt="Profile" />
        {:else}
          <div class="photo-placeholder">
            <Icon icon="mdi:account" width="64" height="64" />
          </div>
        {/if}
      </div>
      {#if profile.photo}
        <button type="button" class="remove-icon" on:click={removePhoto} aria-label="Remove photo">
          <Icon icon="mdi:close" width="20" height="20" />
        </button>
      {/if}
    </div>
    <input
      type="file"
      accept="image/*"
      bind:this={fileInput}
      on:change={handlePhotoUpload}
      style="display: none;"
      aria-label="Upload profile photo"
    />
    <button type="button" class="photo-btn" on:click={triggerFileInput}>
      <Icon icon="mdi:camera" width="18" height="18" />
      {profile.photo ? 'Change Photo' : 'Upload Photo'}
    </button>
  </div>

  <form on:submit|preventDefault={saveProfile}>
    <label>
      Name
      <input 
        type="text" 
        bind:value={profile.name}
        placeholder="Enter your name"
      />
    </label>

    <label>
      Email
      <input 
        type="email" 
        bind:value={profile.email}
        placeholder="your.email@example.com"
      />
    </label>

    <label>
      Phone
      <input 
        type="tel" 
        bind:value={profile.phone}
        placeholder="+1 (555) 123-4567"
      />
    </label>

    <button type="submit">Save Changes</button>
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

  .profile-page {
    padding: 1.5rem;
    padding-bottom: 6rem;
    grid-area: content;
    background-color: #fff;
    color: #222;
    overflow-y: auto;
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
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .photo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .photo-container {
    position: relative;
    width: 120px;
    height: 120px;
  }

  .photo-preview {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background-color: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .photo-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .photo-placeholder {
    color: #9ca3af;
  }

  .remove-icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #ef4444;
    color: white;
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease;
    padding: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .remove-icon:hover {
    background-color: #dc2626;
  }

  .photo-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #2563eb;
    color: white;
  }

  .photo-btn:hover {
    background-color: #1d4ed8;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
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
    color: #555;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 0.25rem;
    background-color: #f7f7f7;
    transition: border 0.2s ease;
    font-family: inherit;
  }

  input:focus {
    outline: none;
    border-color: #2563eb;
  }

  input::placeholder {
    color: #999;
  }

  button[type="submit"] {
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #1d4ed8;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    letter-spacing: 0.3px;
  }

  button[type="submit"]:hover {
    background-color: #1e40af;
  }
</style>