# Aave V3 Deployments

[![npm (scoped)](https://img.shields.io/npm/v/@aave/deploy-v3)](https://www.npmjs.com/package/@aave/deploy-v3)

This Node.js repository contains the configuration and deployment scripts for the Aave V3 protocol core and periphery contracts. The repository makes use of `hardhat` and `hardhat-deploy` tools to facilitate the deployment of Aave V3 protocol.

## Requirements

- Node.js >= 16
- Alchemy key
  - If you use a custom RPC node, you can change the default RPC provider URL at [./helpers/hardhat-config-helpers.ts:25](./helpers/hardhat-config-helpers.ts).
- Etherscan API key _(Optional)_

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

Edit the `.env` file to fill the environment variables `MNEMONIC`, `ALCHEMY_KEY` and `MARKET_NAME`. You can check all possible pool configurations in this [file](https://github.com/RSerhii/aave-v3-deploy/blob/main/helpers/market-config-helpers.ts#L100).

Run the deployments scripts and specify which network & aave market configs you wish to deploy.

```
HARDHAT_NETWORK=<your network> npx hardhat deploy
```


## How to add new market

### 1. Adding a market configuration
In the *markets* folder create a new folder with your market. The *index.ts* file will define market configurations: assets, their addresses, wrapped native token etc.

In *market-config-helpers.ts* add a case that will retrieve the configuration of the added market.
```
export const loadPoolConfig = (configName: ConfigNames): PoolConfiguration => {
  switch (configName) {
    case ConfigNames.Etherlink:
      return EtherlinkV3Config;
  ...
}
```

If your market's network is LIVE, it should be added to helpers/hardhat-config-helpers.ts:
```
export const LIVE_NETWORKS: iParamsPerNetwork<boolean> = {
  [eEtherlinkNetwork.etherlinkTest]: true,
};
```

Add your market to the eNetworks and initialize your market's list of networks in *helpers/types.ts* :

```
export type eNetwork =
  | eEthereumNetwork
  | eEtherlinkNetwork
  ...

...

export enum eEtherlinkNetwork {
  etherlinkTest = "etherlinkTest"
}

...

export interface iEtherlinkParamsPernetwork<T> {
  [eEtherlinkNetwork.etherlinkTest]: T;
}
```

### 2. Adding market constants
In the *helpers/constants.ts* file, import the created marketplace and add the wrapped native token:
```
export const WRAPPED_NATIVE_TOKEN_PER_NETWORK: { [network: string]: string } = {
  ...
  [eEtherlinkNetwork.etherlinkTest]: "0x340Fa96ACF0b8D36828e1D8963CdF3E95c58ed06",
  ...
};

```

Chainlink Aggregators:
```
export const chainlinkAggregatorProxy: Record<string, string> = {
  [eEtherlinkNetwork.etherlinkTest]: "0x0000000000000000000000000000000000000000",
};


export const chainlinkEthUsdAggregatorProxy: Record<string, string> = {
  [eEtherlinkNetwork.etherlinkTest]: "0x0000000000000000000000000000000000000000",
};
```
ReserveAssets:
```
  ReserveAssets: {
    [eEtherlinkNetwork.etherlinkTest]: {
      USDT: "0xD21B917D2f4a4a8E3D12892160BFFd8f4cd72d4F",
    },
  },
  ReservesConfig: {
    USDT: strategyUSDT,
  },
```

### 3. Integration with Aave
In the Aave market configuration file (*markets/aave/index.ts*), add the addresses of your market's network reserve assets:
```
ReserveAssets: {
...
    [eEtherlinkNetwork.etherlinkTest]: {
      USDT: "0xD21B917D2f4a4a8E3D12892160BFFd8f4cd72d4F",
    },
...
};
```

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
