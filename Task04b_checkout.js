const checkout = require("./handson/order");
const { log } = require("./logger.js");

const customerKey = "ayobami";
const cartId = "8058b2b0-8856-4ff3-bf30-1ffef0bffa7f";
const orderId = "77b4f2fb-661f-49cd-9351-8d98fcd2ec88";

const paymentDraft = {
  key:"payment" + Math.random().toString(36).substring(2, 5),
  amountPlanned:{
    currencyCode: 'EUR',
    centAmount: 5000
  }
}

// create a cart and update the catId variable
//  checkout.createCart(customerKey).then(log).catch(log);

// checkout.addLineItemsToCart(cartId,['tulip-seed-box','tulip-seed-sack']).then(log).catch(log);

// checkout.addDiscountCodeToCart(cartId, "SUMMER").then(log).catch(log);
// checkout.getCartById(cartId).then(log).catch(log);

// create order from cart and update the orderId
// checkout.createOrderFromCart(cartId).then(log).catch(log);

// checkout.getOrderById(orderId).then(log).catch(log);

// set order state to confirmed and custom workflow state to order packed
// checkout.setOrderState(orderId, 'Confirmed').then(log).catch(log);
checkout.updateOrderCustomState(orderId,"aa-order-packed").then(log).catch(log);

const checkoutProcess = async () => {
  let emptyCart = await checkout.createCart(customerKey);

  let filledCart = await checkout.addLineItemsToCart(
    emptyCart.body.id,['tulip-seed-box','tulip-seed-sack']
  );
  filledCart = await checkout.addDiscountCodeToCart(
    emptyCart.body.id, 'SUMMER'
  );

  let order = await checkout.createOrderFromCart(filledCart.body.id);
  const payment = await checkout.createPayment(paymentDraft);
  order = await checkout.addPaymentToOrder(order.body.id, payment.body.id);
  order = await checkout.setOrderState(order.body.id, 'Confirmed');
  order = await checkout.updateOrderCustomState(order.body.id,'aa-order-packed');
  if (order) {
    return {
      status: 201,
      message: "order created: " + order.body.id,
    };
  }
};

// checkoutProcess().then(log).catch(log);
