# Delta Fund Airdrops

This is the repository that will host the list of airdrops and their details.

This repository have a GitHub Action that will run every time a Pull Request is merged to the `airdrops` branch. The action will run a script that will send this newly added airdrop to the backend server.

Then the backend server will handle the rest of the process.

## Repository Structure

The repository is structured as follows:

- **.github/workflows**: Contains the GitHub Action that will run the script to send the airdrop to the backend server.

- **airdrops**: Contains the airdrops in the form of JSON files. The name of the file should be the name of the airdrop.

- **.gitignore**: Contains the files that should be ignored by git.

- **package.json**: Contains the dependencies and information about the project.

- **README.md**: This file.

- **updateAirdrops.js**: The script that will run with the GitHub Action to send the airdrops to the backend server.

- **yarn.lock**: Contains exact versions of the dependencies.

## Environment Variables

The `updateAirdrops.js` script uses the following required environment variables:

- **BACKEND_URL**: The URL of the backend server.

- **ADMIN_KEY**: The admin key to authenticate with the backend server.

## How to use

Setup the backend server on a public URL and set the `BACKEND_URL` environment variable to that URL.

Also add the `ADMIN_KEY` environment variable to the GitHub Action.

Then create a new branch from the `airdrops` branch and add a new JSON file with the airdrop details in the `airdrops` folder.

For example, you could create a file named `Ethereum Name Service.json` with the contents:

```json
{
  "name": "Ethereum Name Service",
  "description": "Governance Token for ENSDAO",
  "logoUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/13855.png",
  "claimUrl": "https://claim.ens.domains/",
  "symbol": "ENS",
  "addresses": {
    "0x90d57532b6fb4bc61d1489b6a7a929a29500a5dd": 632,
    "0xf66335cebf0210f7644dc048362e0104b5ff844d": 77,
    "0x3362cdb3f4ae7ecbe5df7173570e7974c99eefa8": 758,
    "0xd526823a33084e67d95ec2709462cd2e1bcd5a86": 488,
    "0x3e0f716a402eb9f98ab7072e0fa116b6bb6beeef": 494,
    "0x166061acf57debea4db908c74906bfac2dbe2e7b": 234,
    "0xa6eb1d2e257072d5e8afb64026a3362c4780087f": 644,
    "0x7fd1747f5e2f05a78287bf2fa88938bcd1777f24": 56,
    "0x1036e384dccbcde7a05f41aab027ae5aa6742227": 278,
    "0x9d8467c977c2129c6f2b18e3725bdd03bf372b8d": 168
  }
}
```

Then create a Pull Request from your branch to the `airdrops` branch.

Once the Pull Request is merged, the GitHub Action will run and send the airdrop to the backend server.
