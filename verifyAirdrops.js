const fs = require("fs");
const core = require("@actions/core");

async function main() {
  // read all airdrops files from airdrops folder
  // and check if all of them follow the correct format below:
  //
  // {
  //   "name": "Test Water Bottle",
  //   "description": "Life Control Might Treated Getting Cook Library Thy Carbon Cap Thee Fact Has More",
  //   "logoUrl": "https://if.com/knowledge/thick",
  //   "claimUrl": "https://respect.com/start",
  //   "symbol": "TWB",
  //   "addresses": {
  //     "0x906defb2e28463506fabe6c8169691cc93801044": 894,
  //     "0x1e3bdfc99eedbfe22813f4cd4e19f9afcd801764": 152,
  //     "0x80a57514a96fc4ff6450ac8fe0b076be0b78d836": 296,
  //     "0x66022f79acff3704c2cb00c35a4b5a8e321129f7": 468,
  //     "0x2c3e4ba18cc6960c136b7ae90dc676583835a515": 610,
  //     "0x8cb131627a6c529e1c6516ba673f1b35097d9980": 21,
  //     "0x018ccd718927dff7d0c0490b540391b8a1c78552": 823,
  //     "0x8bd2d07596694f35d02279e1a5d09e96eeea294f": 53,
  //     "0xa53c9FE377c3A4aF6C8659114612dF452F9C168F": 45,
  //     "0xd4f745e7fe370cd890f6f20581da555464a4c9e8": 917
  //   }
  // }
  //
  // make sure the file does not contain the token name inside the file

  const airdrops = [];
  fs.readdirSync("./airdrops").forEach((file) => {
    const content = require(`./airdrops/${file}`);
    const airdrop = {
      name: file.replace(".json", ""),
      innerName: content.name,
      description: content.description,
      logoUrl: content.logoUrl,
      claimUrl: content.claimUrl,
      symbol: content.symbol,
      addresses: content.addresses,
    };

    airdrops.push(airdrop);
  });

  for (const airdrop of airdrops) {
    if (!airdrop.name) {
      core.setFailed(`Airdrop ${airdrop.name} is missing a name`);
    }
    if (airdrop.innerName) {
      core.setFailed(
        `Airdrop ${airdrop.name} contains the token name inside the file`
      );
    }
    if (!airdrop.description) {
      core.setFailed(`Airdrop ${airdrop.name} is missing a description`);
    }
    if (!airdrop.logoUrl) {
      core.setFailed(`Airdrop ${airdrop.name} is missing a logoUrl`);
    }
    if (!airdrop.claimUrl) {
      core.setFailed(`Airdrop ${airdrop.name} is missing a claimUrl`);
    }
    if (!airdrop.symbol) {
      core.setFailed(`Airdrop ${airdrop.name} is missing a symbol`);
    }
    if (!airdrop.addresses) {
      core.setFailed(`Airdrop ${airdrop.name} is missing addresses`);
    }

    // check the types

    if (typeof airdrop.name !== "string") {
      core.setFailed(`Airdrop ${airdrop.name} name is not a string`);
    }
    if (typeof airdrop.description !== "string") {
      core.setFailed(`Airdrop ${airdrop.name} description is not a string`);
    }
    if (typeof airdrop.logoUrl !== "string") {
      core.setFailed(`Airdrop ${airdrop.name} logoUrl is not a string`);
    }
    if (typeof airdrop.claimUrl !== "string") {
      core.setFailed(`Airdrop ${airdrop.name} claimUrl is not a string`);
    }
    if (typeof airdrop.symbol !== "string") {
      core.setFailed(`Airdrop ${airdrop.name} symbol is not a string`);
    }
    if (typeof airdrop.addresses !== "object") {
      core.setFailed(`Airdrop ${airdrop.name} addresses is not an object`);
    }

    console.log(`Airdrop ${airdrop.name} is valid`);
  }

  console.log("All airdrops are valid");
}
main().catch((err) => {
  core.setFailed(err.message);
});
