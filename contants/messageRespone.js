const message = {
  success: {
    status: "SUCCESS",
    create: "Record created successfully.",
    update: "Record updated successfully.",
    delete: "Record deleted successfully.",
    login: "Login successful. Welcome!",
    refreshToken: "Token refresh successful.",
    getData: "Data retrieved successfully.",
  },
  error: {
    status: "FAILED",
    create: "Error occurred while creating record.",
    update: "Error occurred while updating record.",
    delete: "Error occurred while deleting record.",
    notFound: "Record not found.",
    incorrectCredentials: "Incorrect email or password. Please try again.",
    incorrectPassword: "Incorrect password. Please try again.",
    accountNotFound:
      "Account not found. Please register or try again with a different email.",
    serverError: "An unexpected error occurred. Please try again later.",
    emailTaken:
      "The email address is already registered. Please try another one.",
    unauthorized: "You are not authorized to access this resource",
    forbidden: "You do not have permission to access this resource.",
  },
};

module.exports = message;
