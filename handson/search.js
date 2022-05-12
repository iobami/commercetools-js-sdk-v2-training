const { apiRoot, projectKey } = require("./client.js");

module.exports.getAllProducts = () => {
    return apiRoot.productProjections().get({
        queryArgs: {
            staged: true,
        }
    }).execute()
}

// filter query recalculates everything
// filter facet recalculates others only
module.exports.simulateSearch = () => {
    return apiRoot.productProjections().search().get({
        queryArgs: {
            'text.en': 'tulip',
            filter: 'variants.attributes.size:\"package\"',
            facet: ['variants.attributes.size', 'variants.attributes.weight_in_kg'],
            markMatchingVariants: true,
        }
    }).execute()
}

module.exports.simulatePagination = async (perPage, where) => {
    return apiRoot.products().get({
        queryArgs: {
            where,
            limit: perPage,
            sort: 'id asc',
            withTotal: false
        }
    }).execute()
}
