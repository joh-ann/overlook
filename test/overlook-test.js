import chai from 'chai';
const expect = chai.expect;

import {
  checkUsername, 
  getCustomerID,
  getCustomerBookings,
  getTotalSpent,
  getAvailableRooms,
  filterRoomsByType,
} from "../src/functions.js";

import {
  bookings,
  rooms,
  customers,
} from "../src/data/sample-test-data.js";

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});

describe('Check Username', function() {
  it('should return true if username is valid', function() {
    const usernameInput = 'customer1';
    const username = checkUsername(usernameInput);
    expect(username).to.equal(true);
  });
  it('should return false if username is invalid', function() {
    const usernameInput = 'customer51';
    const username = checkUsername(usernameInput);
    expect(username).to.equal(false);
  });
});

describe('Get Customer ID', function() {
  it('should return an id', function() {
    const usernameInput = 'customer50';
    const username = getCustomerID(usernameInput);
    expect(username).to.equal(50);
  });
  it('should return NaN if there is no; number', function() {
    const usernameInput = 'customer'
    const username = getCustomerID(usernameInput);
    expect(username).to.deep.equal(NaN);
  });
});

describe('Get Customer Bookings', function() {
  it('should return an object with past bookings and upcoming bookings', function() {
    const bookingsList = getCustomerBookings(9, bookings.bookings);
    expect(bookingsList).to.deep.equal({ 
      "pastBookings": [
        {
          date: "2022/04/22",
          id: "5fwrgu4i7k55hl6sz",
          roomNumber: 1,
          userID: 9
        }], 
    "upcomingBookings": [] });
  });
  it('should return an object with past bookings and upcoming bookings for another user', function() {
    const bookingsList = getCustomerBookings(43, bookings.bookings);
    expect(bookingsList).to.deep.equal({ 
      "pastBookings": [
        {
          date: "2022/01/24",
          id: "5fwrgu4i7k55hl6t5",
          roomNumber: 2,
          userID: 43
        }], 
    "upcomingBookings": [] });
  });
  it('should return undefined if customer id is invalid', function() {
    const bookingsList = getCustomerBookings('', bookings.bookings);
    expect(bookingsList).to.be.undefined;
  });
});

describe('Get Total Spent', function() {
  it('calculate the total spent of a booking', function() {
    const bookingsList = getCustomerBookings(9, bookings.bookings);
    const totalSpent = getTotalSpent(bookingsList, rooms.rooms);
    expect(totalSpent).to.equal(358.4);
  });
  it('add up to the total spent of multiple bookings', function() {
    const bookingsList = getCustomerBookings(20, bookings.bookings);
    const totalSpent = getTotalSpent(bookingsList, rooms.rooms);
    expect(totalSpent).to.equal(920.5799999999999);
  });
  it('should return 0 for no bookings', function() {
    const bookingsList = getCustomerBookings(21, bookings.bookings);
    const totalSpent = getTotalSpent(bookingsList, rooms.rooms);
    expect(totalSpent).to.equal(0);
  });
});

describe('Get Available Rooms', function() {
  it('should return available rooms for a given date', function() {
    const selectedDate = "2022/04/23"
    const availableRooms = getAvailableRooms(selectedDate, bookings.bookings, rooms.rooms);
    expect(availableRooms.length).to.equal(4);
  });
  it('should filter out rooms that are not available', function() {
    const selectedDate = "2022/04/22"
    const availableRooms = getAvailableRooms(selectedDate, bookings.bookings, rooms.rooms);
    expect(availableRooms.length).to.equal(3);
  });
  it('should return 0 if there are no rooms available', function() {
    const selectedDate = "2022/09/09"
    const availableRooms = getAvailableRooms(selectedDate, bookings.bookings, rooms.rooms);
    expect(availableRooms.length).to.equal(0);
  });
});

describe('Filter Room by Type', function() {
  it('should return all rooms', function() {
    const type = 'all';
    const filteredRooms = filterRoomsByType(type, rooms.rooms);
    expect(filteredRooms.length).to.equal(4);
  });
  it('should return filtered rooms', function() {
    const type = 'single room';
    const filteredRooms = filterRoomsByType(type, rooms.rooms);
    expect(filteredRooms.length).to.equal(2);
  });
  it('should return filtered rooms for another type', function() {
    const type = 'residential suite';
    const filteredRooms = filterRoomsByType(type, rooms.rooms);
    expect(filteredRooms.length).to.equal(1);
  });
  it('should return no rooms for no type', function() {
    const type = 'double';
    const filteredRooms = filterRoomsByType(type, rooms.rooms);
    expect(filteredRooms.length).to.equal(0);
  });
});