const states = require("./handson/states");
const { log } = require("./logger.js");

const orderPackedStateDraft = {
  key: "aa-order-packed",
  type: "OrderState",
  name: {
    "de": "AA Order Packed ",
    "en": "AA Order Packed ",
  },
  initial: true,
};

const orderCompletedStateDraft = {
  key: "aa-order-completed",
  type: "OrderState",
  name: {
    "de": "AA Order Completed ",
    "en": "AA Order Completed ",
  },
  initial: false,
};

const createStatesWithTransitions = async () => {
  let orderPackedState = await states.createNewState(orderPackedStateDraft)
  let orderCompletedState = await states.createNewState(orderCompletedStateDraft)

  orderPackedState = states.addTransition(orderPackedState.body.id, [orderCompletedState.body.id])

  orderCompletedState = states.addTransition(orderCompletedState.body.id, [])

  return orderPackedState;
};

// createStatesWithTransitions().then(log).catch(log)

states.getStateByKey(orderPackedStateDraft.key).then(log).catch(log)
