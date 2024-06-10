import { eEtherlinkNetwork, IAaveConfiguration } from "../../helpers/types";
import { AaveMarket } from "../aave/index";
import { strategyWETH } from "../aave/reservesConfigs";
import { strategyWBTC, strategyEUSD, strategyUSDT } from "./reserveConfigs";
// ----------------
// POOL--SPECIFIC PARAMS
// ----------------
export const EtherlinkV3Market: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 30,
  WrappedNativeTokenSymbol: "WXTZ",
  MarketId: "Aave Etherlink Market",
  ATokenNamePrefix: "Etherlink",
  StableDebtTokenNamePrefix: "Etherlink",
  VariableDebtTokenNamePrefix: "Etherlink",
  SymbolPrefix: "Xtz",
  ReserveAssets: {
    [eEtherlinkNetwork.etherlinkTestnet]: {
      WBTC: "0x7Cd53e97DDF8D2B370db53F5C3c753B1939208EC",
      USDT: "0xF0Fab3d8d94B5225ee42CfdcE4c257399135202c",
      EUSDC: "0xA9A5779cA171d0577eBC372bc5aa863E3bF1051d",
      WXTZ: "0xC2ef9495272B43F5257b35A1b6ddA78932839871",
    },
  },
  ChainlinkAggregator: {
    [eEtherlinkNetwork.etherlinkTestnet]: {
      WBTC: "0xfe66A25096128f57D3876D42cD2B4347a77784c2",
      USDT: "0xb87b753324248A737e8Dc69E1ba9F7f54e44aeB2",
      EUSDC: "0xb87b753324248A737e8Dc69E1ba9F7f54e44aeB2",
      WXTZ: "0xb87b753324248A737e8Dc69E1ba9F7f54e44aeB2",
    },
  },
  L2PoolEnabled: {
    [eEtherlinkNetwork.etherlinkTestnet]: false,
  },
  ReservesConfig: {
    WBTC: strategyWBTC,
    USDT: strategyUSDT,
    EUSDC: strategyEUSD,
    WXTZ: strategyWETH,
  },
  EModes: {},
  ReserveFactorTreasuryAddress: {},
};
export default EtherlinkV3Market;
