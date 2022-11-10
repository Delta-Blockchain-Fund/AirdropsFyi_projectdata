const fs = require('fs');
const axios = require('axios');
const core = require('@actions/core');

require('dotenv').config();
const BACKEND_URL = process.env.BACKEND_URL;
const ADMIN_KEY = process.env.ADMIN_KEY;

function checkEnv(variable, name) {
  if (!variable) {
    core.setFailed(`Missing ${name} environment variable`);
  }
}
checkEnv(BACKEND_URL, 'BACKEND_URL');
checkEnv(ADMIN_KEY, 'ADMIN_KEY');

async function main() {
  // read all airdrops files from airdrops folder
  const airdrops = [];
  fs.readdirSync('./airdrops').forEach((file) => {
    const content = require(`./airdrops/${file}`);
    const airdrop = {
      name: file.replace('.json', ''),
      description: content.description,
      logoUrl: content.logoUrl,
      claimUrl: content.claimUrl,
      symbol: content.symbol,
      addresses: content.addresses,
    };

    airdrops.push(airdrop);
  });

  // check which airdrops are already saved in the backend
  console.log(`${BACKEND_URL}check-new-tokens`);
  const response = await axios
    .post(
      `${BACKEND_URL}/check-new-tokens`,
      {
        tokensNames: airdrops.map((airdrop) => airdrop.name),
      },
      {
        headers: {
          'x-admin-key': ADMIN_KEY,
          'Content-Type': 'application/json',
        },
      }
    )
    .catch((err) => {
      core.setFailed(err.message);
    });

  const unsavedAirdrops = response.data.newTokensNames;
  console.log(`Found ${unsavedAirdrops.length} new airdrops`);
  console.log(unsavedAirdrops);

  // save the new airdrops
  for (const airdropName of unsavedAirdrops) {
    const airdrop = airdrops.find((airdrop) => airdrop.name === airdropName);
    console.log(`Saving ${airdrop.name}`);
    const response = await axios
      .post(`${BACKEND_URL}/add-new-token`, airdrop, {
        headers: {
          'x-admin-key': ADMIN_KEY,
        },
      })
      .catch((err) => {
        core.setFailed(err.message);
        console.log(err);
      });
    console.log(`Saved ${airdrop.name}`);
  }
}
main().catch((err) => {
  console.log(err);
  core.setFailed(err.message);
});
