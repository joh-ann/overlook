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
  customerHTML = `<div class="customer-info" id="${customerID}">`

    const pastBookings = customerBookings.pastBookings || [];
    const upcomingBookings = customerBookings.upcomingBookings || [];
    const totalSpent = getTotalSpent({ pastBookings, upcomingBookings }, roomsData);

    getSingleCustomer(customerID)
    .then((customer) => {
      const customerName = customer;

    customerHTML += `
    <div class="booking-info">
    <p> Welcome, ${customerName}</p>
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