export const fetchCustomers = fetch("http://localhost:3001/api/v1/customers")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch failed with status code: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    console.error("Error fetching customers:", error);
    throw error;
  });

export const fetchRooms = fetch("http://localhost:3001/api/v1/rooms")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch failed with status code: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    console.error("Error fetching rooms:", error);
    throw error;
  });

export const fetchBookings = fetch("http://localhost:3001/api/v1/bookings")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch failed with status code: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    console.error("Error fetching bookings:", error);
    throw error;
  });

export const addBooking = (user, date, room) => {
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: 'POST',
    body: JSON.stringify({
      userID: user.id,
      date: date,
      roomNumber: room.number
    }),
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw newError(`Response failed with status code: ${response.status}`);
    }
    return response.json()
  })
  .then(json => console.log(json))
  .catch((error) => {
    console.error("Error sending POST request:", error);
    throw error;
  });
}

export const deleteBooking = (bookingID) => {
  return fetch(`http://localhost:3001/api/v1/bookings/${bookingID}`, {
    method: 'DELETE',
    headers: {
       'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Request failed with status code: ${response.status}`);
    }
    return response.json();
  })
  .then(json => console.log(json))
  .catch((error) => {
    console.error("Error sending DELETE request:", error);
    throw error;
  });
}

export const getSingleCustomer = (customerID) => {
  return fetch(`http://localhost:3001/api/v1/customers/${customerID}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fetch failed with status code: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching customer:", error);
      throw error;
    });
  }