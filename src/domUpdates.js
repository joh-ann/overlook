const roomsContainer = document.querySelector('.rooms-container');
const customerContainer = document.querySelector('.customer-container')

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
  })
  roomsContainer.innerHTML = roomsHTML;
}

export const displayCustomerInfo = (customer, customerBookings) => {
  let customerHTML = ``;
  customerHTML += 
  `<div class="customer-info" id="${customer.id}">
  ${customer.name}
  </div>`
}