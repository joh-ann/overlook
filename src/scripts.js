import "./css/styles.css";

import {
  fetchCustomers,
  fetchRooms,
  fetchBookings,
  addBooking,
  deleteBooking,
  getSingleCustomer,
  fetchCustomerBookings,
} from "./apiCalls.js";

import { 
  displayRooms,
  displayCustomerInfo, 
  displayLoginErrorMsg,
  displayCustomerRooms,
} from "./domUpdates.js";

import { 
  checkUsername, 
  getCustomerID, 
  getCustomerBookings,
} from "./functions.js";

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

  // QUERY SELECTORS
  const loginForm = document.querySelector("#login-form");
  // EVENT LISTENERS
  loginForm.addEventListener('submit', function(event) {
    // prevent the form from submitting
    event.preventDefault();
    const usernameInput = document.querySelector("#username-input");
    const passwordInput = document.querySelector("#password-input");
    
    if (checkUsername(usernameInput.value) && passwordInput.value === 'overlook2021') {
      const customerID = getCustomerID(usernameInput.value);
      fetchCustomerBookings(customerID).then((bookings) => {
        const customerBookings = bookings;
        console.log(customerBookings)
        displayCustomerInfo(customerID, customerBookings, roomsData)
        displayCustomerRooms(customerBookings)
      })

      .catch((error) => {
        console.error("Error fetching customer bookings:", error);
      });
    } else {
      displayLoginErrorMsg();
    }
  })
})