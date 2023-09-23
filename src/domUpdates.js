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
  console.log(upcomingBookings)

  roomsHTML += `
  <h2>Upcoming Bookings:</h2>
  <div class="upcoming-bookings">`
  upcomingBookings.forEach((upcomingBooking) => {
    const matchedRoom = roomsData.find((room) => room.number === upcomingBooking.roomNumber)
    console.log(matchedRoom)
    roomsHTML += `
    <div class="room-card">
      <img src="src/images/${matchedRoom.roomType}-${matchedRoom.numBeds}.png" class="room-icon-img">
      <div class="room-card-info">
        <p>Room #: ${matchedRoom.number}</p>
        <p>Type: ${matchedRoom.roomType}</p>
        <p>Bed: ${matchedRoom.bedSize}</p>
        <p># of Beds: ${matchedRoom.numBeds}</p>
        <p>Cost: $${matchedRoom.costPerNight}/night</p>
      </div>
    </div>
    `
  })
  roomsHTML += `</div>`
  roomsHTML += `
  <h2>Past Bookings:</h2>
  <div class="past-bookings">`
  pastBookings.forEach((pastBooking) => {
    const matchedRoom = roomsData.find((room) => room.number === pastBooking.roomNumber)
    console.log(matchedRoom)
    roomsHTML += `
    <div class="room-card">
      <img src="src/images/${matchedRoom.roomType}-${matchedRoom.numBeds}.png" class="room-icon-img">
      <div class="room-card-info">
        <p>Room #: ${matchedRoom.number}</p>
        <p>Type: ${matchedRoom.roomType}</p>
        <p>Bed: ${matchedRoom.bedSize}</p>
        <p># of Beds: ${matchedRoom.numBeds}</p>
        <p>Cost: $${matchedRoom.costPerNight}/night</p>
      </div>
    </div>
    `
  })
  roomsHTML += `</div>`
  roomsHTML += `</div>`
  roomsContainer.innerHTML = roomsHTML;
}

export const displayAllRooms = (roomsData) => {
  let roomsHTML = ``

  roomsHTML += `<div class="rooms-list">`
  roomsData.forEach((room) => {
    roomsHTML += `
    <div class="room-wrapper">
      <img src="src/images/${room.roomType}-${room.numBeds}.png" class="room-img">
        <div class="room-info">
          <p>Room #: ${room.number}</p>
          <p>Type: ${room.roomType}</p>
          <p>Bed: ${room.bedSize}</p>
          <p># of Beds: ${room.numBeds}</p>
          <p>Cost: $${room.costPerNight}/night</p>
        </div>
    </div>
    `
    console.log(`${room.roomType}-${room.numBeds}`)
  })
  roomsHTML += `</div>`
  roomsContainer.innerHTML = roomsHTML;
}