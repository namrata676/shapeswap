import React from "react";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import { connectorLocalStorageKey } from "./config";
import { Login, Config } from "./types";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
  mb: string;
}



const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss, mb }) => {

  const mumbaiPolygon = {
    "chainId": 137,
    "symbol" :"MATIC",
    "rpcUrl" : 'https://rpc-mainnet.matic.network',
    "blockchain": "https://polygonscan.com/",
    "chainName": "Polygon",
    
  }

   const AVALANCHE_MAINNET_PARAMS = {
    chainId: '0xA86A',
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io/']
}
  const { title, icon: Icon } = walletConfig;
  return (
    <Button
      width="100%"
      variant="tertiary"
      onClick={() => {
        console.log("aaaaaaaaaa")
        login(walletConfig.connectorId) ;
        window.localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId);
        onDismiss();
      }}
      style={{ justifyContent: "space-between", backgroundColor:'rgba(218, 241, 254, 0.25)' }}
      mb={mb}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Text bold color="black" mr="16px">
        {title}
      </Text>
      <Icon width="32px" />
    </Button>
  );
};

export default WalletCard;
