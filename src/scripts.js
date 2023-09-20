import "./css/styles.css";

import {
  fetchCustomers,
  fetchRooms,
  fetchBookings,
  addBooking,
  deleteBooking,
  getSingleCustomer
} from "./apiCalls.js";

import { displayRooms, displayCustomerInfo, displayLoginErrorMsg } from "./domUpdates.js";
import { checkUsername, getCustomerID } from "./functions.js";

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
    console.log(getCustomerID(usernameInput.value));
  } else {
    displayLoginErrorMsg();
  }
})

