import { eEtherlinkNetwork, IAaveConfiguration } from "../../helpers/types";
import { AaveMarket } from "../aave/index";
import {
  strategyWBTC,
  strategyEUSD,
  strategyUSDT,
  strategySTXTZ,
  strategyWETH,
} from "./reserveConfigs";
// ----------------
// POOL--SPECIFIC PARAMS
// ----------------
export const EtherlinkV3Market: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 30,
  WrappedNativeTokenSymbol: "WXTZ",
  MarketId: "Plend Etherlink Market",
  ATokenNamePrefix: "Etherlink",
  StableDebtTokenNamePrefix: "Etherlink",
  VariableDebtTokenNamePrefix: "Etherlink",
  SymbolPrefix: "Xtz",
  ReserveAssets: {
    [eEtherlinkNetwork.etherlinkTestnet]: {
      WSTXTZ: "0x883C14A8Cb1252Fe732D4BDcae5A8c6Ca92628Ef",
      STXTZ: "0xaf1C7a33eb3994337bF71edF7d2C362b686E4ECD",
      // WXTZ: "0xC2ef9495272B43F5257b35A1b6ddA78932839871",
    },
  },
  ChainlinkAggregator: {
    [eEtherlinkNetwork.etherlinkTestnet]: {
      WSTXTZ: "0xf5F4e3c425257134B8f9Cf061bD3411155A35440", // oracle
      STXTZ: "0x3A2bf7f2E1B41c3CF2Fb22975C737bEBE13226d1", // oracle
      // WXTZ: "0x3A2bf7f2E1B41c3CF2Fb22975C737bEBE13226d1",
    },
  },
  L2PoolEnabled: {
    [eEtherlinkNetwork.etherlinkTestnet]: false,
  },
  ReservesConfig: {
    WSTXTZ: strategySTXTZ, // replace this with new strategy
    STXTZ: strategySTXTZ, // replace this with new strategy
    // WXTZ: strategyWETH,
  },
  EModes: {},
  ReserveFactorTreasuryAddress: {},
};
export default EtherlinkV3Market;
