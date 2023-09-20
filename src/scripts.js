import "./css/styles.css";

import {
  fetchCustomers,
  fetchRooms,
  fetchBookings,
  addBooking,
  deleteBooking,
  getSingleCustomer
} from "./apiCalls.js";

import { displayRooms, displayCustomerInfo } from "./domUpdates.js";
import { checkUsername } from "./functions.js";

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
  // prevent the form from submitting
  event.preventDefault();
  const usernameInput = document.querySelector("#username-input");
  const passwordInput = document.querySelector("#password-input");

  if (checkUsername(usernameInput.value) && passwordInput.value === 'overlook2021') {
    alert('Success!')
  } else {
    alert('Invalid login information')
  }
})

