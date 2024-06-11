import { eEtherlinkNetwork, IAaveConfiguration } from "../../helpers/types";
import { AaveMarket } from "../aave/index";
import { strategyWETH } from "../aave/reservesConfigs";
import {
  strategyWBTC,
  strategyEUSD,
  strategyUSDT,
  strategySTXTZ,
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
      WSTXTZ: "0xAf9d5B2a60F22B85325738669e804B39d3a99583",
      STXTZ: "0xaf1C7a33eb3994337bF71edF7d2C362b686E4ECD",
      WXTZ: "0xC2ef9495272B43F5257b35A1b6ddA78932839871",
    },
  },
  ChainlinkAggregator: {
    [eEtherlinkNetwork.etherlinkTestnet]: {
      WSTXTZ: "0x13fB1F126D71C4717c9f4815f51EfEeC4c037e3C", // oracle
      STXTZ: "0x3A2bf7f2E1B41c3CF2Fb22975C737bEBE13226d1", // oracle
      WXTZ: "0x3A2bf7f2E1B41c3CF2Fb22975C737bEBE13226d1",
    },
  },
  L2PoolEnabled: {
    [eEtherlinkNetwork.etherlinkTestnet]: false,
  },
  ReservesConfig: {
    WSTXTZ: strategySTXTZ, // replace this with new strategy
    STXTZ: strategySTXTZ, // replace this with new strategy
    WXTZ: strategyWETH,
  },
  EModes: {},
  ReserveFactorTreasuryAddress: {},
};
export default EtherlinkV3Market;
