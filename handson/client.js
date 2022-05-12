const {
  createClient,
  createHttpClient,
  createAuthForClientCredentialsFlow,
  createAuthForPasswordFlow
} = require ('@commercetools/sdk-client-v2')
const { createApiBuilderFromCtpClient } = require('@commercetools/platform-sdk')

const {
  createApiBuilderFromCtpClient: createApiBuilderFromCtpClientOnlyForImports,
} = require("@commercetools/importapi-sdk");
require("dotenv").config();

const fetch = require("node-fetch");

const projectKey = process.env.CTP_PROJECT_KEY;

//use .env for credentials process.env.adminClientId 

const getClient = () => {

  const projectKey = process.env.CTP_PROJECT_KEY;
  const clientSecret = process.env.CTP_CLIENT_SECRET;
  const clientId = process.env.CTP_CLIENT_ID;
  const oauthHost = process.env.CTP_AUTH_URL;
  const host = process.env.CTP_API_URL;

  const authMiddleWare = createAuthForClientCredentialsFlow({
    host: oauthHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret
    },
    fetch
  });

  const httpMiddleWare = createHttpClient({
    host,
    fetch
  });

  const ctpClient = createClient({
    middlewares: [authMiddleWare, httpMiddleWare]
  });

  return ctpClient;

};

const getImportClient = () => {
  const projectKey = process.env.IMPORT_PROJECT_KEY;
  const clientSecret = process.env.IMPORT_CLIENT_SECRET;
  const clientId = process.env.IMPORT_CLIENT_ID;
  const oauthHost = process.env.IMPORT_AUTH_URL;
  const host = process.env.IMPORT_API_URL;

  const authMiddleWare = createAuthForClientCredentialsFlow({
    host: oauthHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret
    },
    fetch
  });

  const httpMiddleWare = createHttpClient({
    host,
    fetch
  });

  const ctpClient = createClient({
    middlewares: [authMiddleWare, httpMiddleWare]
  });

  return ctpClient;
};

const getStoreClient = () => {
  const projectKey = process.env.BERLIN_PROJECT_KEY;
  const clientSecret = process.env.BERLIN_CLIENT_SECRET;
  const clientId = process.env.BERLIN_CLIENT_ID;
  const oauthHost = process.env.BERLIN_AUTH_URL;
  const host = process.env.BERLIN_API_URL;

  const authMiddleWare = createAuthForClientCredentialsFlow({
    host: oauthHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret
    },
    fetch
  });

  const httpMiddleWare = createHttpClient({
    host,
    fetch
  });

  const ctpClient = createClient({
    middlewares: [authMiddleWare, httpMiddleWare]
  });

  return ctpClient;
};

const getMLClient = () => {};

const getMyAPIClient = () => {
  const projectKey = process.env.ME_PROJECT_KEY;
  const clientSecret = process.env.ME_CLIENT_SECRET;
  const clientId = process.env.ME_CLIENT_ID;
  const oauthHost = process.env.ME_AUTH_URL;
  const host = process.env.ME_API_URL;
  const username = 'bam@test.com';
  const password = 'password';

  const authMiddleWare = createAuthForPasswordFlow({
    host: oauthHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username,
        password
      }
    },
    fetch
  });

  const httpMiddleWare = createHttpClient({
    host,
    fetch
  });

  const ctpClient = createClient({
    middlewares: [authMiddleWare, httpMiddleWare]
  });

  return ctpClient;
};

module.exports.apiRoot = createApiBuilderFromCtpClient(getClient())
  .withProjectKey({ projectKey });

module.exports.importApiRoot = createApiBuilderFromCtpClientOnlyForImports(
  getImportClient()
).withProjectKeyValue({ projectKey });

module.exports.storeApiRoot = createApiBuilderFromCtpClient(
  getStoreClient()
).withProjectKey({ projectKey });

module.exports.myApiRoot = createApiBuilderFromCtpClient(
  getMyAPIClient()
).withProjectKey({ projectKey });
module.exports.projectKey = projectKey;