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

document.addEventListener('DOMContentLoaded', function() {
  console.log(fetchRooms)
})

