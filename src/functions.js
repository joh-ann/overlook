export const checkUsername = (username) => {
  const startsWithCustomer = username.startsWith('customer');
  const numericPart = username.replace('customer', '');
  const numericValue = parseInt(numericPart, 10);

  const hasValidNumber = !isNaN(numericValue) && numericValue >= 1 && numericValue <= 50;
  const isValidUsername = startsWithCustomer && hasValidNumber;
  return isValidUsername;
}

