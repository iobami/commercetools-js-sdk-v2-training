const { apiRoot, projectKey } = require("./client.js");

module.exports.createNewState = (stateDraftData) => {
  return apiRoot.states().post({
    body: createStateDraft(stateDraftData)
  }).execute();
}

const createStateDraft = (stateDraftData) => {
  const { key, type, name, initial } = stateDraftData;
  return {
    key,
    type,
    name,
    initial,
  };
};

module.exports.getStateByKey = (key) => {
  return apiRoot.states().withKey({ key }).get().execute();
}

module.exports.getStateById = (ID) => {
  return apiRoot.states().withId({ ID }).get().execute();
}

module.exports.addTransition = (stateId, transitionStateIds) => {
  return this.getStateById(stateId).then(state => {
    return apiRoot.states().withId({ ID: stateId }).post({
      body: {
        version: state.body.version,
        actions: [{
          action: 'setTransitions',
          transitions: transitionStateIds.map(id => ({
            typeId: 'state',
            id
          })),
        }],
      }
    }).execute();
  })
}
