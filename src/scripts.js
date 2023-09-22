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
  displayAllRooms,
} from "./domUpdates.js";

import { 
  checkUsername, 
  getCustomerID, 
  getCustomerBookings,
} from "./functions.js";

import flatpickr from "flatpickr";

// USER
let currentCustomer = {};

// DATA
let customersData = null;
let roomsData = null;
let bookingsData = null;


// QUERY SELECTORS
const loginForm = document.querySelector("#login-form");
const bookingContainer = document.querySelector(".booking-container");
const datePicker = document.querySelector("#datepicker");
const ourRooms = document.querySelector(".our-rooms");

const fp = flatpickr(datePicker, {
  dateFormat: "Y-m-d",
  enableTime: false,
});

Promise.all([fetchCustomers, fetchRooms, fetchBookings])
.then(([customersDataValue, roomsDataValue, bookingsDataValue]) => {
  customersData = customersDataValue.customers;
  roomsData = roomsDataValue.rooms;
  bookingsData = bookingsDataValue.bookings;

  ourRooms.addEventListener('click', function() {
    console.log('u clicked me?')
    console.log(roomsData)
    console.log(customersData)
    console.log(bookingsData)
    displayAllRooms(roomsData)
  });

  loginForm.addEventListener('submit', function(event) {
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
  .catch((error) => {
    console.error("Error fetching data:", error);
  })
})