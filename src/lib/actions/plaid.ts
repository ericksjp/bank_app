import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "Plaid-Client-Id": process.env.PLAID_CLIENT_ID,
      "Plaid-Secret": process.env.PLAID_SECRET,
    },
  },
});

export const plaidCliend = new PlaidApi(configuration);
