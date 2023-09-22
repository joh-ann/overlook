import { getSingleCustomer } from "./apiCalls";
import { getTotalSpent } from "./functions"
import { roomsData } from "./scripts";

const roomsContainer = document.querySelector('.rooms-container');
const customerContainer = document.querySelector('.customer-container');
const loginErrorMsg = document.querySelector('.login-error-msg');

// I should see a dashboard page that shows me:
// Any room bookings I have made (past or upcoming)
// The total amount I have spent on rooms

export const displayRooms = (rooms) => {
  let roomsHTML = ``;
  rooms.forEach((room) => {
    roomsHTML += 
    `<div class="room" id="${room.number}">
    ${room.roomType}
    ${room.costPerNight}
    </div>`
  });
  roomsContainer.innerHTML = roomsHTML;
}

export const displayCustomerInfo = (customerID, customerBookings, roomsData) => {
  let customerHTML = ``;

    const pastBookings = customerBookings.pastBookings || [];
    const upcomingBookings = customerBookings.upcomingBookings || [];
    const totalSpent = getTotalSpent({ pastBookings, upcomingBookings }, roomsData);

    getSingleCustomer(customerID)
    .then((customer) => {
      const customerName = customer;

    customerHTML += `
    <div class="customer-info" id="${customerID}">
    <p>Welcome, ${customerName}</p>
    <p>Past Bookings: ${pastBookings.length}</p>
    <p>Upcoming Bookings: ${upcomingBookings.length}</p>
    <p>Total Spent: $${totalSpent}</p>
    </div>
    `;

    customerContainer.innerHTML = customerHTML;
  });
}

export const displayLoginErrorMsg = () => {
  loginErrorMsg.classList.remove('hidden');

  setTimeout(() => {
    loginErrorMsg.classList.add('hidden');
  }, 2000);
}

export const displayCustomerRooms = (customerBookings, roomsData) => {
  let roomsHTML = ``
  roomsHTML = `<div class="rooms-info">`
  const upcomingBookings = customerBookings.upcomingBookings || [];
  const pastBookings = customerBookings.pastBookings || [];

  roomsHTML += `
  <h2>Upcoming Bookings:</h2>
  <div class="upcoming-bookings">`
  upcomingBookings.forEach((upcomingBooking) => {
    roomsHTML += `
    <div class="room-card">${upcomingBooking.roomNumber}</div>
    `
  })
  roomsHTML += `</div>`
  roomsHTML += `
  <h2>Past Bookings:</h2>
  <div class="past-bookings">`
  pastBookings.forEach((pastBooking) => {
    roomsHTML += `
    <div class="room-card">${pastBooking.roomNumber}</div>
    `
  })
  roomsHTML += `</div>`
  roomsHTML += `</div>`
  roomsContainer.innerHTML = roomsHTML;
}

export const displayAllRooms = (roomsData) => {
  let roomsHTML = ``

  roomsData.forEach((room) => {
    roomsHTML += `
    <div class="room-info">
    Room Number: ${room.number}
    Room Type: ${room.roomType}
    Bed Size: ${room.bedSize}
    Number of Beds: ${room.numBeds}
    Cost: ${room.costPerNight}
    </div>
    `
  })
  roomsContainer.innerHTML = roomsHTML;
}