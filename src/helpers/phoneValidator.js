export const phoneValidator = (phone) => {
  const phoneRegex = /^[0-9]{10}$/; // Regular expression for a 10-digit phone number
  if (!phone) {
    return "Phone number is required";
  }
  if (!phoneRegex.test(phone)) {
    return "Invalid phone number. Please enter a 10-digit number.";
  }
  return "";
};
