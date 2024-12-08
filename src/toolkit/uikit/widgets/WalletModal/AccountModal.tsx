import React, {useEffect} from "react";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
// import LinkExternal from "../../components/Link/LinkExternal";
import Flex from "../../components/Box/Flex";
import { Modal } from "../Modal";
import CopyToClipboard from "./CopyToClipboard";
import { connectorLocalStorageKey } from "./config";

interface Props {
  account: string;
  logout: () => void;
  onDismiss?: () => void;
  setAccount?: any
}



const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null, setAccount }) => {
  
  const removeKey = () => {
 
    localStorage.removeItem("account")
    setAccount("")
  }

return(
  <Modal title="Your wallet" onDismiss={onDismiss} style={{padding: "15px"}}>
    <Text
      fontSize="20px !important"
      bold
      style={{ color: 'white', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "8px" }}
    >
      {account}
    </Text>
    <Flex mb="25px" justifyContent="center">
      {/* <LinkExternal small href={`https://bscscan.com/address/${account}`} mr="16px">
        View on BscScan
      </LinkExternal> */}
      <CopyToClipboard toCopy={account}>Copy Address</CopyToClipboard>
    </Flex>
    <Flex justifyContent="center">
      <Button
        scale="sm"
        style={{color: "black", backgroundColor: "#DCEAFF", padding: "10px"}}
        onClick={() => {
          logout();
          removeKey()
          window.localStorage.removeItem(connectorLocalStorageKey);
          onDismiss();
        }}
      >
        Logout
      </Button>
    </Flex>
  </Modal>)
};

export default AccountModal;
