import { getSingleCustomer } from "./apiCalls";
import { getTotalSpent } from "./functions"
import { roomsData } from "./scripts";

const roomsContainer = document.querySelector('.rooms-container');
const customerContainer = document.querySelector('.customer-container');
const loginErrorMsg = document.querySelector('.login-error-msg');

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
    const matchedRoom = roomsData.find((room) => room.number === upcomingBooking.roomNumber)
    roomsHTML += `
    <div class="room-card">
      <img src="images/${matchedRoom.roomType}-${matchedRoom.numBeds}.png" class="room-icon-img">
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
    roomsHTML += `
    <div class="room-card">
      <img src="images/${matchedRoom.roomType}-${matchedRoom.numBeds}.png" class="room-icon-img">
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
      <img src="images/${room.roomType}-${room.numBeds}.png" class="room-img">
        <div class="room-info">
          <p>Room #: ${room.number}</p>
          <p>Type: ${room.roomType}</p>
          <p>Bed: ${room.bedSize}</p>
          <p># of Beds: ${room.numBeds}</p>
          <p>Cost: $${room.costPerNight}/night</p>
        </div>
    </div>
    `
  })
  roomsHTML += `</div>`
  roomsContainer.innerHTML = roomsHTML;
}

export const displayAboutUs = () => {
  let aboutUsHTML = ``

  aboutUsHTML += `
  <div class="about-us-info">
    <p><strong><em>"Overlook,"</em></strong> our contemporary hotel nestled in Kyoto's temple district, invites you to experience a modern garden sanctuary steeped in history. As you wander along the tall, slender bamboo stems that guide your path, you'll encounter our heart and soul: the 800-year-old <em>Shakusui-en</em>, a pond garden that gracefully connects our hotel with tradition, artistry, and the wonders of nature. Ranked as #100 in the <em>"Travel + Leisure"</em> World's Best Awards for 2023, we are proud to provide you with an intimate escape that blends the old and the new.</p>

    <p>Each morning, you can witness the sun's gentle touch as it bathes the landscape beyond your room's <em>floor-to-ceiling windows</em> in its golden glow. Whether it's cherry blossoms in spring, lush greenery in summer, vivid red foliage in autumn, or snow-dusted mountain peaks in winter, you'll be enchanted by the ever-changing beauty of Kyoto. In this captivating city, secrets are cherished, and we are here to guide you in uncovering its hidden gems.</p>    
  </div>`;

  roomsContainer.innerHTML = aboutUsHTML
}