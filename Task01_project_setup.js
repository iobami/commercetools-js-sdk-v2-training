const { apiRoot, projectKey } = require("./handson/client.js");
const { log } = require("./logger.js");

// TODO 1: Complete the functions in
// ./handson/client.js

// TODO : GET project details
// So this code displays the project configuration
// https://docs.commercetools.com/http-api-projects-project.html#get-project

// apiRoot.get().execute().then(log).catch(log);

// TODO : GET ShippingMethod by ID

const shippingMethodId = '2940ca50-4d01-43a5-8b1e-47eca5786e2f';

// apiRoot.shippingMethods().withId(shippingMethodId).get().execute().then(log).catch(log);

// TODO : GET Tax Category by key

const key = 'standard-tax-category';

// apiRoot.taxCategories().withKey({ key}).get().execute().then(log).catch(log);
