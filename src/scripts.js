import "./css/styles.css";
import "./domUpdates.js";
import "./functions.js";

import {
  fetchCustomers,
  fetchRooms,
  fetchBookings,
  addBooking,
  deleteBooking,
  getSingleCustomer
} from "./apiCalls.js";

import { displayRooms, displayCustomerInfo } from "./domUpdates.js";

// USER
let currentCustomer = {};

// DATA
let customersData = null;
let roomsData = null;
let bookingsData = null;

Promise.all([fetchCustomers, fetchRooms, fetchBookings])
.then(([customersDataValue, roomsDataValue, bookingsDataValue]) => {
  customersData = customersDataValue;
  roomsData = roomsDataValue;
  bookingsData = bookingsDataValue;
})

// QUERY SELECTORS
const loginForm = document.querySelector("#login-form");
// EVENT LISTENERS
loginForm.addEventListener('submit', function(event) {
  const usernameInput = document.querySelector("#username-input");
  const passwordInput = document.querySelector("#password-input");

  if (usernameInput.value.startsWith('customer') && passwordInput.value === 'overlook2021' ) {
    console.log('it worked')
  } else {
    // prevent the form from submitting
    event.preventDefault();
  }
})

