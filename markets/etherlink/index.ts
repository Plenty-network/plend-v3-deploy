import { eEtherlinkNetwork, IAaveConfiguration } from "../../helpers/types";
import { AaveMarket } from "../aave/index";
import { strategyUSDT } from "../aave/reservesConfigs";

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
    [eEtherlinkNetwork.etherlinkTest]: {
      USDT: "0xD21B917D2f4a4a8E3D12892160BFFd8f4cd72d4F",
    },
  },
  ChainlinkAggregator: {
    [eEtherlinkNetwork.etherlinkTest]: {
      USDT: "0x0000000000000000000000000000000000000000",
    },
  },
  ReservesConfig: {
    USDT: strategyUSDT,
  },
  EModes: {},
  ReserveFactorTreasuryAddress: {},
};

export default EtherlinkV3Market;
