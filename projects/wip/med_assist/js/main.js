/**
  Author Name: Noah Hamblen
  File Name: main.js
**/

"use strict";

// Check if ticket data exists
const getTickets = () => {
  return JSON.parse(localStorage.getItem("tickets")) || [];
};

const saveTickets = (tickets) => {
  localStorage.setItem("tickets", JSON.stringify(tickets));
};

// Add a new ticket
const addTicket = (subject, description) => {
  const tickets = getTickets();
  const newTicket = {
    id: Date.now(),
    subject,
    description,
    status: "Open",
    created: new Date().toLocaleDateString(),
  };
  tickets.push(newTicket);
  saveTickets(tickets);
};

// Render ticket list (on tickets.html)
const renderTickets = () => {
  const ticketList = document.getElementById("ticket_list");
  if (!ticketList) return;

  const tickets = getTickets();

  if (tickets.length === 0) {
    ticketList.innerHTML = "<p>No tickets submitted yet.</p>";
    return;
  }

  ticketList.innerHTML = tickets
    .map(
      (ticket) => `
    <div class="ticket_card">
      <h3>${ticket.subject}</h3>
      <p><strong>Date:</strong> ${ticket.created}</p>
      <p><strong>Status:</strong> <span class="status ${ticket.status.toLowerCase()}">${
        ticket.status
      }</span></p>
      <p>${ticket.description}</p>
      <button onclick="deleteTicket(${ticket.id})">Delete</button>
    </div>
  `
    )
    .join("");
};

// Delete a ticket
const deleteTicket = (id) => {
  const tickets = getTickets().filter((ticket) => ticket.id !== id);
  saveTickets(tickets);
  renderTickets();
};

// Submit form handler (on new_ticket.html)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ticket_form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const subject = document.getElementById("subject").value;
      const description = document.getElementById("description").value;
      addTicket(subject, description);
      alert("Ticket submitted successfully!");
      form.reset();
    });
  }

  // Render tickets if on tickets.html
  renderTickets();
});
