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

export const billingHistory = writable({
  November: {amount: (Math.random() * 150 + 50).toFixed(2), status: "Unpaid" },
  October: {amount: (Math.random() * 150 + 50).toFixed(2), status: "Paid" },
  September: {amount: (Math.random() * 150 + 50).toFixed(2), status: "Paid" },
  August: {amount: (Math.random() * 150 + 50).toFixed(2), status: "Paid" },
  July: {amount: (Math.random() * 150 + 50).toFixed(2), status: "Paid" },
  June: {amount: (Math.random() * 150 + 50).toFixed(2), status: "Paid" },
  May: {amount: (Math.random() * 150 + 50).toFixed(2), status: "Paid" },
  April: {amount: (Math.random() * 150 + 50).toFixed(2), status: "Paid" },
  March: {amount: (Math.random() * 150 + 50).toFixed(2), status: "Paid"  },
  February: {amount: (Math.random() * 150 + 50).toFixed(2), status: "Paid" },
  January: {amount: (Math.random() * 150 + 50).toFixed(2), status: "Paid" },
  December: {amount: (Math.random() * 150 + 50).toFixed(2), status: "Paid" }
});
