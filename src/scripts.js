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
  fetchCustomerBookings,
} from "./apiCalls.js";

import { 
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
  getAvailableRooms,
  filterRoomsByType,
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
import "./images/overlook-logo.png";
import "./images/overlook-pond.png";
import "./images/overlook-main.png";

// AMENITIES ICONS
import "./images/overlook-nosmoking-icon.png";
import "./images/overlook-bath-icon.png";
import "./images/overlook-dog-icon.png";
import "./images/overlook-roomservice-icon.png";

// USER
let currentCustomer = {
  id: null,
  bookings: null,
  active: false,
};

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
const modalContainer = document.querySelector("#modal-1");
const customerContainer = document.querySelector(".customer-container");

// BUTTONS
const clearDateBtn = document.querySelector(".clear-date-btn");
const bookBtn = document.querySelector(".book-btn");
const openCalBtn = document.querySelector(".open-cal-btn");
const findRoomBtn = document.querySelector(".find-room-btn");
const logoImg = document.querySelector(".logo");
const selectRooms = document.querySelector("#select-rooms");

Promise.all([fetchCustomers(), fetchRooms(), fetchBookings()])
.then(([customersDataValue, roomsDataValue, bookingsDataValue]) => {
  customersData = customersDataValue.customers;
  roomsData = roomsDataValue.rooms;
  bookingsData = bookingsDataValue.bookings;

  ourRooms.addEventListener('click', function() {
    displayAllRooms(roomsData);
  });

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const usernameInput = document.querySelector("#username-input");
    const passwordInput = document.querySelector("#password-input");
    
    if (checkUsername(usernameInput.value) && passwordInput.value === 'overlook2021') {
      const customerID = getCustomerID(usernameInput.value);
      fetchCustomerBookings(customerID).then((bookings) => {
        const customerBookings = bookings;
        // console.log(customerBookings)
        currentCustomer.id = customerID;
        currentCustomer.bookings = customerBookings;
        currentCustomer.active = true;
        displayCustomerInfo(customerID, customerBookings, roomsData);
        displayCustomerRooms(customerBookings, roomsData);
      })
      .catch((error) => {
        console.error("Error fetching customer bookings:", error);
      });
    } else {
      displayLoginErrorMsg();
    }
  });

  homePage.addEventListener('click', function() {
    displayCustomerInfo(currentCustomer.id, currentCustomer.bookings, roomsData);
    displayCustomerRooms(currentCustomer.bookings, roomsData);
  });
})

// MODAL & FLATPICKR
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('date-input');

  flatpickr(input, {
    dateFormat: "Y/m/d",
    minDate: "today"
  });

  bookBtn.addEventListener('click', function() {
    flatpickr(input, {
      dateFormat: "Y/m/d",
      minDate: "today"
    });
  });

  input.addEventListener('change', function() {
    const selectedDate = input.value;
    console.log('Selected date:', selectedDate);
  });

  openCalBtn.addEventListener('click', function() {
    flatpickr(input, {
      dateFormat: "Y/m/d",
      minDate: "today"
    }).open();
  });

  openCalBtn.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      bookBtn.click();
    }
  });

  findRoomBtn.addEventListener('click', function() {
    const selectedDate = input.value;

    if (selectedDate.length === 0) {
      displayNoDateSelected();
    } else {
    // console.log('Searching for...', selectedDate);
    const availableRooms = getAvailableRooms(selectedDate, bookingsData, roomsData);
    displayAvailableRooms(availableRooms);
    }
  });

  findRoomBtn.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      findRoomBtn.click();
    }
  });

  clearDateBtn.addEventListener('click', function() {
    flatpickr(input, {
      dateFormat: "Y/m/d"
    }).clear();
    clearRoomSearch();
  });

  clearDateBtn.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      clearDateBtn.click();
    }
  });

  selectRooms.addEventListener('change', function(event) {
    let selectedType = event.target.value;
    const selectedDate = input.value;
  
    if (selectedDate.length === 0) {
      displayNoDateSelected();
    } else {
      console.log(selectedType)
      const filteredRooms = filterRoomsByType(selectedType, roomsData);
      console.log(filteredRooms)
      const availableRooms = getAvailableRooms(selectedDate, bookingsData, filteredRooms);
      displayAvailableRooms(availableRooms);
    }
  });

  // BOOK ROOM BUTTON
  modalContainer.addEventListener('click', function(event) {
    // console.log('modal container')
    if (event.target.classList.contains("book-room-btn")) {
      // console.log('book room button')
      if (currentCustomer.active) {
        let selectedDate = input.value;
        let roomNumber = parseInt(event.target.id);
        addBooking(currentCustomer.id, selectedDate, roomNumber)
        .then(() => {
          fetchBookings()
            .then((allBookings) => {
              bookingsData = allBookings.bookings;
            })
              .then(() => {
                const availableRooms = getAvailableRooms(selectedDate, bookingsData, roomsData);
                displayAvailableRooms(availableRooms);
                console.log(currentCustomer);
              })
                .then(() => {
                    fetchCustomerBookings(currentCustomer.id).then((bookings) => {
                      const updatedCustomerBookings = bookings;
                      displayCustomerInfo(currentCustomer.id, updatedCustomerBookings, roomsData);
                      displayCustomerRooms(updatedCustomerBookings, roomsData);
                  })
                })
            })
          .catch((error) => {
            console.error("Error making booking:", error);
          })
        .catch((error) => {
          console.error("Error making booking:", error);
        })
      } else {
        event.target.innerText = `You are not logged in!`;

        setTimeout(function() {
          event.target.innerText = "Book Room";
        }, 4000);
      }
    }
  });
});

aboutUsPage.addEventListener('click', function(event) {
  displayAboutUs();
});

logoImg.addEventListener('click', function(event) {
  location.reload();
});