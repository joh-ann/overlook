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

// document.addEventListener('DOMContentLoaded', function() {
//   console.log(fetchRooms)
// })

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

