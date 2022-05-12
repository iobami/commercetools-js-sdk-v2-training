const { apiRoot, storeApiRoot, projectKey } = require("./client.js");

//TODO store and productProjection endpoint

module.exports.getStoreByKey = (key) =>
  apiRoot
    .stores()
    .withKey({key})
    .get()
    .execute()


module.exports.getCustomersInStore = (storeKey) => 
  storeApiRoot.inStoreKeyWithStoreKeyValue({ storeKey })
    .customers()
    .get()
    .execute()

module.exports.addProductSelectionToStore = async (storeKey, productSelectionKey) => 
  this.getStoreByKey(storeKey).then(store => {
    return apiRoot
      .stores()
      .withKey({ key: storeKey })
      .post({
        body: {
          version: store.body.version,
          actions: [{
            action: 'addProductSelection',
            active: true,
            productSelection: {
              typeId: 'product-selection',
              key: productSelectionKey
            }
          }]
        }
      })
      .execute()
  })

module.exports.getProductsInStore = (storeKey) => 
  storeApiRoot.inStoreKeyWithStoreKeyValue({ storeKey })
    .productSelectionAssignments()
    .get({
      queryArgs: {
        expand: ['product', 'productSelection']
      }
    })
    .execute()

module.exports.createInStoreCart = (storeKey, customer) => 
  storeApiRoot.inStoreKeyWithStoreKeyValue({ storeKey })
    .carts()
    .post({
      body: {
        currency: 'EUR',
        country: 'DE',
        customerId: customer.body.id,
        customerEmail: customer.body.email,
      }
    })
    .execute()