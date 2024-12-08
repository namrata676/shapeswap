import React, {useState, useEffect} from "react";
import Button from "../../../components/Button/Button";
import { useWalletModal } from "../../WalletModal";
import { Login } from "../../WalletModal/types";

interface Props {
  account?: string;
  login: Login;
  logout: () => void;
}

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {

//   useEffect(() => {
//  console.log("blocklistenter")
//   const account1 = localStorage.getItem("account")
//   console.log("blocklist1",account1)
//   if(account1 !== undefined){
//    setAccount(account1)
//    console.log("blocklist2",account1)
//   } else {
//     localStorage.setItem("account",accountFinal)
//     setAccount(accountFinal)
//     console.log("blocklist3",accountFinal)
//   }
  

//   },[accountFinal])

console.log("account%%%",account)

  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;

  return (
    <div>
      {account ? (
        <Button
          scale="sm"
          variant="tertiary"
          onClick={() => {
            onPresentAccountModal();
          }}
        >
          {accountEllipsis}
        </Button>
      ) : (
        <Button
          scale="sm"
          onClick={() => {
            onPresentConnectModal();
          }}
        >
          Connect
        </Button>
      )}
    </div>
  );
};

export default React.memo(
  UserBlock,
  (prevProps, nextProps) =>
    prevProps.account === nextProps.account &&
    prevProps.login === nextProps.login &&
    prevProps.logout === nextProps.logout
);
