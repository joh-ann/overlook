export const checkUsername = (username) => {
  const startsWithCustomer = username.startsWith('customer');
  const numericPart = username.replace('customer', '');
  const numericValue = parseInt(numericPart, 10);

  const hasValidNumber = !isNaN(numericValue) && numericValue >= 1 && numericValue <= 50;
  const isValidUsername = startsWithCustomer && hasValidNumber;
  return isValidUsername;
}

export const getCustomerID = (username) => {
  const numberOnly = username.replace('customer', '');
  return parseInt(numberOnly);
}

export const getCustomerBookings = (customerID, bookings) => {
  const currentDate = new Date();
  const pastBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return booking.userID === customerID && bookingDate < currentDate;
  });

  const upcomingBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return booking.userID === customerID && bookingDate >= currentDate;
  });

  return { pastBookings, upcomingBookings };
}

export const getTotalSpent = (allBookings, rooms) => {
  const combinedBookings = [].concat(...Object.values(allBookings));
  
  const totalCost = combinedBookings.reduce((total, booking) => {
    const room = rooms.rooms.find(room => room.number === booking.roomNumber);
    return total + (room ? room.costPerNight : 0);
  }, 0);

  return totalCost;
}