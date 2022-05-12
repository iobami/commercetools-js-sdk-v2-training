const { apiRoot, projectKey } = require("./client.js");
const { getCustomerByKey } = require( "./customer.js" );

module.exports.createCart = (customerKey) => {
  return getCustomerByKey(customerKey).then(customer => {
    return apiRoot.carts().post({
      body: {
        customerId: customer.body.id,
        customerEmail: customer.body.email,
        currency: 'EUR',
        country: 'DE',
        // shippingAddress: customer.body.addresses.find(
        //   address => address.id === customer.body.shippingAddressId
        // )
        shippingAddress: { country: 'DE' }
      }
    }).execute();
  })
}

module.exports.createAnonymousCart = () =>
  apiRoot
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
      }
    })
    .execute()

module.exports.customerSignIn = (customerDetails) => {
  return apiRoot.login().post({
    body: customerDetails
  }).execute();
}

module.exports.getCartById = (ID) => {
  return apiRoot.carts().withId({ ID }).get().execute();
}

module.exports.addLineItemsToCart = (cartId, arrayOfSKUs) => {
  return this.getCartById(cartId).then(cart => {
    return apiRoot.carts().withId({ ID: cartId }).post({
      body: {
        version: cart.body.version,
        actions: arrayOfSKUs.map(sku => ({
          action: 'addLineItem',
          sku
        })),
      }
    }).execute();
  })
}

module.exports.addDiscountCodeToCart = (cartId, discountCode) => {
  return this.getCartById(cartId).then(cart => {
    return apiRoot.carts().withId({ ID: cartId }).post({
      body: {
        version: cart.body.version,
        actions: [{
          action: 'addDiscountCode',
          code: discountCode,
        }],
      }
    }).execute();
  })
}

module.exports.createOrderFromCart = async (cartId) => {
  return apiRoot.orders().post({
    body: await createOrderFromCartDraft(cartId),
  }).execute();
}

const createOrderFromCartDraft = (cartId) => {
  return this.getCartById(cartId).then((cart) => {
    return {
      id: cart.body.id,
      version: cart.body.version,
    };
  });
};

module.exports.getOrderById = (ID) =>
  apiRoot.orders().withId({ID}).get().execute()

module.exports.updateOrderCustomState = (orderId, customStateKey) =>
  this.getOrderById(orderId).then(order =>
    apiRoot.orders().withId({ID: orderId}).post({
      body: {
        version: order.body.version,
        actions: [
          {
            action: "transitionState",
            state: {
              typeId: "state",
              key: customStateKey
            }
          }
        ]
      }
    }).execute()
  )

module.exports.createPayment = (paymentDraft) => {
  return apiRoot.payments().post({
    body: paymentDraft
  }).execute()
}

module.exports.setOrderState = (orderId, stateName) =>
  this.getOrderById(orderId).then(order =>
    apiRoot.orders().withId({ID: orderId}).post({
      body: {
        version: order.body.version,
        actions: [
          {
            action: "changeOrderState",
            orderState: stateName
          }
        ]
      }
    }).execute()
  )

module.exports.addPaymentToOrder = (orderId, paymentId) => 
  this.getOrderById(orderId).then(order =>
    apiRoot.orders().withId({ID: orderId}).post({
      body: {
        version: order.body.version,
        actions: [
          {
            action: "addPayment",
            payment: {
              typeId: "payment",
              id: paymentId
            }
          }
        ]
      }
    }).execute()
  )
