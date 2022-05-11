const { apiRoot, projectKey } = require("./client.js");

module.exports.getCustomerById = (ID) => {
  return apiRoot.customers().withId({ ID }).get().execute();
}

module.exports.getCustomerByKey = (key) => {
  return apiRoot.customers().withKey({ key }).get().execute();
}

const createCustomerDraft = ({ countryCode, ...rest}) => {
  const customerDraft = {
    addresses: [{
      country: countryCode,
      key: rest.key + '-address',
      defaultBillingAddress: 0,
      defaultShippingAddress: 0,
    }],
    ...rest,
  };

  return customerDraft;
}

module.exports.createCustomer = (customerData) => {
  return apiRoot.customers().post({
    body: createCustomerDraft(customerData)
  }).execute();
}

module.exports.createCustomerToken = (customer) => {
  return apiRoot.customers().emailToken().post({
    body: {
      id: customer.body.id,
      version: customer.body.version,
      ttlMinutes: 60,
    }
  }).execute();
}

module.exports.confirmCustomerEmail = (token) => {
  return apiRoot.customers().emailConfirm().post({
    body: {
      tokenValue: token.body.value,
    }
  }).execute();
}

module.exports.assignCustomerToCustomerGroup = (
  customerKey,
  customerGroupKey
) => {
  return this.getCustomerByKey(customerKey).then(customer => 
    apiRoot.customers().withKey({ key: customerKey }).post({
      body: {
        version: customer.body.version,
        actions: [{
          action: 'setCustomerGroup',
          customerGroup: {
            typeId: 'customer-group',
            key: customerGroupKey,
          },
        }],
      }
    }).execute())
}
