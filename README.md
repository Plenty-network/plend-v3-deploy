# Aave V3 Deployments

[![npm (scoped)](https://img.shields.io/npm/v/@aave/deploy-v3)](https://www.npmjs.com/package/@aave/deploy-v3)

This Node.js repository contains the configuration and deployment scripts for the Aave V3 protocol core and periphery contracts. The repository makes use of `hardhat` and `hardhat-deploy` tools to facilitate the deployment of Aave V3 protocol.

## Requirements

- Node.js >= 16

## Getting Started

1. Install Node.JS dependencies:

   ```
   npm i
   ```

2. Compile contracts before running any other command, to generate Typechain TS typings:

   ```
   npm run compile
   ```

## How to deploy Aave V3 in Etherlink network

To deploy Aave V3 in Etherlink network, copy the `.env.example` into a `.env` file, and fill the environment variable `MARKET_NAME`

```
cp .env.example .env
```

Edit the `.env` file to fill the environment variables `MNEMONIC`, `PRIVATE_KEY` and `MARKET_NAME`. You can check all possible pool configurations in this [file](https://github.com/aave/aave-v3-deploy/blob/09e91b80aff219da80f35a9fc55dafc5d698b574/helpers/market-config-helpers.ts#L95).

Run the deployments scripts and specify which network & aave market configs you wish to deploy.

```
HARDHAT_NETWORK=etherlinkTest npx hardhat deploy
```


## How to add new market


### 1. Adding market constants
In the *helpers/constants.ts* file, import the created marketplace and add the wrapped native token:
```
export const WRAPPED_NATIVE_TOKEN_PER_NETWORK: { [network: string]: string } = {
  ...
  [eEtherlinkNetwork.etherlinkTest]: "0x340Fa96ACF0b8D36828e1D8963CdF3E95c58ed06",
  ...
};

```

Redstone Aggregator: - USD price provider for native token
```
export const chainlinkAggregatorProxy: Record<string, string> = {
  [eEtherlinkNetwork.etherlinkTest]: "0xE06FE39f066562DBfE390167AE49D8Cb66e1F887",
};


export const chainlinkEthUsdAggregatorProxy: Record<string, string> = {
  [eEtherlinkNetwork.etherlinkTest]: "0xE06FE39f066562DBfE390167AE49D8Cb66e1F887",
};
```

Add info about assets in *markets/etherlink/index.ts* :

```
  ReserveAssets: {                                          // assets used in the market.
    [eEtherlinkNetwork.etherlinkTest]: {
      EUSD: "0x1A71f491fb0Ef77F13F8f6d2a927dd4C969ECe4f",   // address of underlying ERC20 token.
    },
  },
  ChainlinkAggregator: {
    [eEtherlinkNetwork.etherlinkTest]: {
      EUSD: "0x0000000000000000000000000000000000000000",   //  USD price provider. If not set fallback oracle will be used.
    },
  },
  ReservesConfig: {
    EUSD: strategyEUSD,     // strategy that describes rules and restrictions for borrowing, credit and asset management
  },
```


### 2. Adding new token to the deployed market
To add new token, go to the market configuration (*markets/etherlink/index.ts*). Import the token from *reservesConfigs.ts* (adding it beforehand if it was not previously in the list of assets).
Add token information to ReserveAssets, ChainlinkAggregator and ReservesConfig.

Run script again:

```
HARDHAT_NETWORK=etherlinkTest npx hardhat deploy
```


### 3. Setting prices in Fallback Oracle
In the Deployments list, find the FallbackOracle-Etherlink address and open it in Etherlink BlockExplorer (https://testnet-explorer.etherlink.com).

Go to Contract -> Write Contract and select the "authorizeSybil" method. Insert the wallet address and make the transaction.

FallbackOracle returns the price in dollars($).
Select the "submitPrices" method and set the price where 1 USD = 100,000,000. Complete the transaction.


## Project Structure

| Path                  | Description                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| deploy/               | Main deployment scripts dir location                                                                                            |
| ├─ 00-core/           | Core deployment, only needed to run once per network.                                                                           |
| ├─ 01-periphery_pre/  | Periphery contracts deployment, only need to run once per network.                                                              |
| ├─ 02-market/         | Market deployment scripts, depends of Core and Periphery deployment.                                                            |
| ├─ 03-periphery_post/ | Periphery contracts deployment after market is deployed.                                                                        |
| deployments/          | Artifacts location of the deployments, contains the addresses, the abi, solidity input metadata and the constructor parameters. |
| markets/              | Directory to configure Aave markets                                                                                             |
| tasks/                | Hardhat tasks to setup and review market configs                                                                                |
| helpers/              | Utility helpers to manage configs and deployments                                                                               |

## License

Please be aware that [Aave V3](https://github.com/aave/aave-v3-core) is under [BSUL](https://github.com/aave/aave-v3-core/blob/master/LICENSE.md) license as of 27 January 2023 or date specified at v3-license-date.aave.eth. The Licensor hereby grants you the right to copy, modify, create derivative works, redistribute, and make non-production use of the Licensed Work. Any exceptions to this license may be specified by Aave governance. This repository containing the deployment scripts for the Aave V3 smart contracts can only be used for local or testing purposes. If you wish to deploy to a production environment you can reach out to Aave Governance [here](https://governance.aave.com/).
