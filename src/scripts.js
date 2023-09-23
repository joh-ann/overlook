// PACKAGES
import flatpickr from "flatpickr";
import MicroModal from 'micromodal';
MicroModal.init();

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
  displayAboutUs,
  displayAvailableRooms,
  displayNoDateSelected,
  clearRoomSearch,
} from "./domUpdates.js";

import { 
  checkUsername, 
  getCustomerID, 
  getCustomerBookings,
  getAvailableRooms,
} from "./functions.js";

// IMAGES
import "./images/junior suite-1.png";
import "./images/junior suite-2.png";
import "./images/residential suite-1.png";
import "./images/residential suite-2.png";
import "./images/single room-1.png";
import "./images/single room-2.png";
import "./images/suite-1.png";
import "./images/suite-2.png";
import "./images/overlook-dining.png";
import "./images/overlook-downtown.png";
import "./images/overlook-lobby.png";
import "./images/overlook-logo.png";
import "./images/overlook-pond.png";
import "./images/overlook-room.png";
import "./images/overlook-spa.png";

// USER
let currentCustomer = {};

// DATA
let customersData = null;
let roomsData = null;
let bookingsData = null;

// QUERY SELECTORS
// DISPLAYS
const loginForm = document.querySelector("#login-form");
const ourRooms = document.querySelector(".our-rooms");
const homePage = document.querySelector(".home");
const aboutUsPage = document.querySelector(".about-us");

// BUTTONS
const clearDateBtn = document.querySelector(".clear-date-btn");
const reservationBtn = document.querySelector(".reservation-btn");
const openCalBtn = document.querySelector(".open-cal-btn");
const findRoomBtn = document.querySelector(".find-room-btn");

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
  });

  homePage.addEventListener('click', function(event) {
    displayCustomerInfo(currentCustomer.id, currentCustomer.bookings, roomsData);
    displayCustomerRooms(currentCustomer.bookings, roomsData);
  });
})

// MODAL & FLATPICKR
reservationBtn.addEventListener('click', function() {
  const input = document.getElementById('date-input');

  flatpickr(input, {
    dateFormat: "Y/m/d"
  })

  input.addEventListener('change', function(event) {
    const selectedDate = event.target.value;
    console.log('Selected date:', selectedDate);
  })


  openCalBtn.addEventListener('click', function() {
    flatpickr(input).open();
  })

  findRoomBtn.addEventListener('click', function(event) {
    const selectedDate = input.value;

    if (selectedDate.length === 0) {
      displayNoDateSelected();
    } else {
    console.log('Searching for...', selectedDate);
    const availableRooms = getAvailableRooms(selectedDate, bookingsData, roomsData);
    displayAvailableRooms(availableRooms);
    console.log(currentCustomer)
    }
  })

  clearDateBtn.addEventListener('click', function() {
    flatpickr(input).clear();
    clearRoomSearch();
  })

  // // BOOK ROOM BUTTON
  // document.addEventListener('click', function(event) {
  //   if (event.target.classList.contains("book-room-btn")) {
  //     console.log('clicked')
  //     console.log(currentCustomer)
  //     console.log(event.target.id)
  //     console.log(date)
  //     addBooking(currentCustomer.id, input, event.target.id)
  //   }
  // });
});

aboutUsPage.addEventListener('click', function(event) {
  displayAboutUs();
})
