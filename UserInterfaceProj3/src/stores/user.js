import { writable } from 'svelte/store';

export const user = writable({
  name: "Keanu Reeves",
  email: "keanureeves@mail.uc.edu",
  phone: "+1 (513) 123-4567",
  photo: null,
  ebillingEnabled: true,
  autopayEnabled: false,
  cardNumber: "0123 4567 8901 2345",
  cardLast4: "2345",
  cardHolder: "Keanu Reeves",
  cardExpiry: "08/27",
  cardCvv: "123",
  nextPaymentDate: "Nov 26, 2025"
});