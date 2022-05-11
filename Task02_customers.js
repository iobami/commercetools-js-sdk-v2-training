const {
  createCustomer,
  getCustomerById,
  getCustomerByKey,
  createCustomerToken,
  confirmCustomerEmail,
  assignCustomerToCustomerGroup,
} = require("./handson/customer");
const { log } = require("./logger.js");

const customerDraftData = {
  firstName: "Ayobami",
  lastName: "John",
  email: "bam@test.com",
  password: "password",
  key: "ayobami",
  countryCode: "DE",
};

//  createCustomer(customerDraftData).then(log).catch(log);

// getCustomerByKey('ayobami').then(log).catch(log);

// getCustomerById('eb263cc1-7229-42dd-b863-8c4b8a46b2c9').then(log).catch(log);

// getCustomerByKey('ayobami')
//   .then(createCustomerToken)
//   .then(confirmCustomerEmail)
//   .then(log)
//   .catch(log);

assignCustomerToCustomerGroup('ayobami','indoor-customers').then(log).catch(log);
