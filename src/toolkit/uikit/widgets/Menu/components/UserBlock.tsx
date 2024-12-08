import React, {useState, useEffect, useContext} from 'react'
import block from 'state/block'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import Button from '../../../components/Button/Button'
import { useWalletModal } from '../../WalletModal'
import { Login } from '../../WalletModal/types'
import "./components.css"
import ThingsContext from '../../../../../swapContext'

interface Props {
  account?: string
  login: Login
  logout: () => void
  // custom?: boolean
  bottomBlock? : boolean
}


const Custom = styled.div<{bottomBlock: boolean}>`
  margin-top:  ${({ bottomBlock }) => bottomBlock?"20px":"inherit"};
  button {
    width: ${({ bottomBlock }) => bottomBlock?"100%":"inherit"}
  }
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  padding-bottom: 10px;   
`

const UserBlock: React.FC<Props> = ({ account: accountFinal, login, logout, bottomBlock=false }) => {

  // const [account, setAccount] = useState(accountFinal)
  const commonThings = useContext(ThingsContext);

  const {account, setAccount} = commonThings as any

  useEffect(() => {
 console.log("blocklistenter")
  const account1 = localStorage.getItem("account")
  console.log("blocklist1",account1)
  if(account1 !== null && account1 !== undefined){
   setAccount(account1)
  
   console.log("blocklist2",account1)
  } else {
    if(accountFinal !== undefined){
    localStorage.setItem("account",accountFinal)
    }
    setAccount(accountFinal)
    
    console.log("blocklist3",accountFinal)
  }
  
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[accountFinal])

console.log("blocklistaccount%%%",accountFinal)




  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout,account, setAccount)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null

  return (
    <Custom bottomBlock={bottomBlock}>
      {account ? (
        <div className="d-flex flex-row justify-content-between">      
             <Link to={{ pathname:`/trade`}} style={{color: 'white', fontSize: '15px', marginRight: '10px'}}>
         <Button
          scale="sm"
          variant="text"
          className="buttonStyling"
          style={{padding: "20px", marginTop: "10px", backgroundColor : "#f3e8ff",  color : "#a24fec", fontSize: '15px'}}
        >
        Trade
        </Button>
        </Link>   
        <Link to={{ pathname:`/swap`}} style={{color: 'white', fontSize: '15px', marginRight: '10px'}}>
        <Button
          scale="sm"
          variant="text"
          className="buttonStyling"
          style={{padding: "20px", marginTop: "10px", backgroundColor : "#cbfbf1",  color : "#47b3a7", fontSize: '15px'}}
        >
        Swap
        </Button>
        </Link>    
       {/* <Link to={{ pathname:`/`}} style={{color: 'white', fontSize: '10px'}}> 
        <img  style={{backgroundColor: "transparent", borderRadius: "13px", padding: "2px", paddingTop: "10px", marginRight:"10px", width: "34px"}}
                  src="/images/home/homenew1.png"
                  className="flex items-center justify-center"
                  alt="user"
                />         
        </Link>
        
        <Link to={{ pathname:`/mint`}} style={{color: 'white', fontSize: '10px'}}> 
        <img  style={{backgroundColor: "transparent", borderRadius: "13px", padding: "2px", paddingTop: "10px", marginRight:"10px", width:"32px"}}
                  src="/images/home/nfttokenicon.png"
                  className="flex items-center justify-center"
                  alt="user"
                />         
        </Link>      

         <Link to={{ pathname:`/claim`}} style={{color: 'white', fontSize: '10px'}}> 
        <img  style={{backgroundColor: "transparent", borderRadius: "13px", padding: "0px", paddingTop: "6px", marginRight:"10px", width:"38px"}}
                  src="/images/home/claimicon4.png"
                  className="flex items-center justify-center"
                  alt="user"
                />         
        </Link>   

        <Link to={{ pathname:`/swap`}} style={{color: 'white', fontSize: '10px'}}>
        <img
                  src="/images/home/launchdapp.png"
                  className="launchDapp flex items-center justify-center"
                  alt="user"
                />         
        </Link>    */}
        { /*
          <Link to={{ pathname:`https://discord.gg/smartfinance`}} target="_blank"> 
        <img  style={{backgroundColor: "transparent", borderRadius: "13px", padding: "2px", marginRight:"10px"}}
                  src="images/home/img_user.svg"
                  className="flex items-center justify-center"
                  alt="user"
                />
        </Link>
      */ }
        <Button
          scale="sm"
          variant="text"
          onClick={() => {
            onPresentAccountModal()
          }}
          className="buttonStyling"
          style={{padding: "20px", marginTop: "10px", backgroundColor : "#E6E9EE",  color : "black"}}
        >
          {accountEllipsis}
        </Button>
        </div>
      ) : (
        <div className="d-flex flex-row justify-content-between">        
        {/* <Link to={{ pathname:`/`}} style={{color: 'white', fontSize: '10px'}}> 
         <img  style={{backgroundColor: "transparent", borderRadius: "13px", padding: "2px", paddingTop: "10px", marginRight:"10px", width: "34px"}}
                   src="/images/home/home.png"
                   className="flex items-center justify-center"
                   alt="user"
                 />         
         </Link> */}
          
         {/* <Link to={{ pathname:`/mint`}} style={{color: 'white', fontSize: '10px'}}> 
         <img  style={{backgroundColor: "transparent", borderRadius: "13px", padding: "2px", paddingTop: "10px", marginRight:"10px", width:"32px"}}
                   src="/images/home/nfttokenicon.png"
                   className="flex items-center justify-center"
                   alt="user"
                 />         
         </Link>   */}

         {/* <Link to={{ pathname:`/claim`}} style={{color: 'white', fontSize: '10px'}}> 
        <img  style={{backgroundColor: "transparent", borderRadius: "13px", padding: "0px", paddingTop: "6px", marginRight:"10px", width:"38px"}}
                  src="/images/home/claimicon4.png"
                  className="flex items-center justify-center"
                  alt="user"
                />         
        </Link>    */}

         <Link to={{ pathname:`/trade`}} style={{color: 'white', fontSize: '15px', marginRight: '10px'}}>
         <Button
          scale="sm"
          variant="text"
          className="buttonStyling"
          style={{padding: "20px", marginTop: "10px", backgroundColor : "#f3e8ff",  color : "#a24fec", fontSize: '15px'}}
        >
        Trade
        </Button>
        </Link>   
        <Link to={{ pathname:`/swap`}} style={{color: 'white', fontSize: '15px', marginRight: '10px'}}>
        <Button
          scale="sm"
          variant="text"
          className="buttonStyling"
          style={{padding: "20px", marginTop: "10px", backgroundColor : "#cbfbf1",  color : "#47b3a7", fontSize: '15px'}}
        >
        Swap
        </Button>
        </Link>   
    {/* 
           <Link to={{ pathname:`https://discord.gg/smartfinance`}} target="_blank"> 
         <img  style={{backgroundColor: "transparent", borderRadius: "13px", padding: "2px", marginRight:"10px"}}
                   src="images/home/img_user.svg"
                   className="flex items-center justify-center"
                   alt="user"
                 />
         </Link>
      */}
        <Button
          scale="sm"
          onClick={() => {
            onPresentConnectModal()
          }}
          variant="text"
          className="buttonStyling"
          style={{padding: "20px", marginTop: "10px", backgroundColor : "#E6E9EE",  color : "black"}}
        >
          Connect Wallet 
        </Button>
        </div>
      )}
    </Custom>
  )
}

export default React.memo(
  UserBlock,
  (prevProps, nextProps) =>
    prevProps.account === nextProps.account &&
    prevProps.login === nextProps.login &&
    prevProps.logout === nextProps.logout,
)
