const { myApiRoot, projectKey } = require("./client.js");

//TODO me endpoint


module.exports.getMe = () => 
    myApiRoot.me().get().execute();

module.exports.getMyOrders = () => 
    myApiRoot.me().orders().get().execute();