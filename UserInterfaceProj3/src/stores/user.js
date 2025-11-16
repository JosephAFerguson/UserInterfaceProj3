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
  November: {amountDue: 93.56, amountPaid: 0.00, status: "Unpaid" },
  October: {amountDue: 16.98, amountPaid: 76.55, status: "Unpaid" },
  September: {amountDue: 0.00,amountPaid: 53.12, status: "Paid" },
  August: {amountDue: 0.00, amountPaid: 89.97, status: "Paid" },
  July: {amountDue: 0.00, amountPaid: 84.33, status: "Paid" },
  June: {amountDue: 0.00, amountPaid: 69.67, status: "Paid" },
  May: {amountDue: 0.00, amountPaid: 64.28, status: "Paid" },
  April: {amountDue: 0.00, amountPaid: 54.25, status: "Paid" },
  March: {amountDue: 0.00, amountPaid: 67.67, status: "Paid"  },
  February: {amountDue: 0.00, amountPaid: 78.01, status: "Paid" },
  January: {amountDue: 0.00, amountPaid: 92.72, status: "Paid" },
  December: {amountDue: 0.00, amountPaid: 88.52, status: "Paid" }
});
