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

import "./images/junior suite-1.png";
import "./images/junior suite-2.png";
import "./images/residential suite-1.png";
import "./images/residential suite-2.png";
import "./images/single room-1.png";
import "./images/single room-2.png";
import "./images/suite-1.png"
import "./images/suite-2.png"

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
const homePage = document.querySelector(".home");

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
        currentCustomer.id = customerID;
        currentCustomer.bookings = customerBookings;
        displayCustomerInfo(customerID, customerBookings, roomsData)
        displayCustomerRooms(customerBookings, roomsData)
      })
      .catch((error) => {
        console.error("Error fetching customer bookings:", error);
      });
    } else {
      displayLoginErrorMsg();
    }
  })

  homePage.addEventListener('click', function(event) {
    displayCustomerInfo(currentCustomer.id, currentCustomer.bookings, roomsData);
    displayCustomerRooms(currentCustomer.bookings, roomsData);
  })
})