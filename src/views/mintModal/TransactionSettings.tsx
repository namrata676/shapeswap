import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import usePoll from 'react-use-poll';
import Web3 from "web3";
import axios from 'axios';
import { isEmpty } from 'lodash';
import {  ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'contexts/Localization'
import { Text, Button, Input, Flex, Grid, useModal } from 'toolkit/uikit'
import styled from 'styled-components'
import {TokenInjectedModalProps } from '../../toolkit/uikit/widgets/TokenModal'
import CoinsModal from '../coinsModal/CoinsModal'
import CoinsSelectModal from '../coinsSelectModal/CoinsSelectModal'


import QuestionHelper from '../../components/QuestionHelper'
import { AutoColumn } from '../../components/Layout/Column'
import { RowBetween, RowFixed } from '../../components/Layout/Row'
import { polarcontractAddress, polarABI, joePairPolar} from '../../Abi/avalancheSwap/polarConfig'
import { getTokenImage, getNetwork } from './avalancheutils'
import { setupNetwork2, setupNetwork1 } from '../../utils/wallet'

enum SlippageError {
  InvalidInput = 'InvalidInput',
  RiskyLow = 'RiskyLow',
  RiskyHigh = 'RiskyHigh',
}

// enum DeadlineError {
//   InvalidInput = 'InvalidInput',
// }

const StyledButton = styled(Button)`
 
  width: 85px !important;
  height: 32px !important;
  border-radius: 8px !important;
  margin-right: 10px !important;
`
interface simpleInt {
  id: number;
  text: string;
  icon: string;
  tokenAddress: string;
  name: string;
  balance: string;
  photoUrl: string;
}

interface simp {
  tokenAddress: string,
  balance : string
}



type simpleType = simpleInt[];
type simpType = simp[];
export interface SlippageTabsProps extends TokenInjectedModalProps {
  rawSlippage: number
  setRawSlippage: (rawSlippage: number) => void
  setSlippage?: (value: number | ((prevVar: number) => number)) => void;
  tokenFunc2?: CallableFunction;
  ListData?: simpleType;
  tokenName?: string;
  setChain?: string;
  account?: string;
  balList?: simpType;
  setChain2?: string;
  order?: boolean;
  usdtToken?: simpleInt ;
  usdcToken?: simpleInt ;

}

export default function SlippageTabs() {
  const [slippageInput, setSlippageInput] = useState('')

  const [selectButton, setSelectButton] = useState('None')

  const [currentChain, setCurrentChain] = useState(0)

  const [chainChanged, setChainChanged] = useState(false)

  const [getNetwork1, setGetNetwork1] = useState("None")

  const [initToken, setInitToken] = useState(false)

  const [networkListCross, setGetNetworkListCross] = useState([
    {
        "id": 1,
        "name": "bsc",
        "stargatechainid": 102,
        "isCrossSwapEnabled": true,
        "isChainActive": true
    }
    // {
    //     "id": 10,
    //     "name": "ethereum",
    //     "stargatechainid": 101,
    //     "isCrossSwapEnabled": true,
    //     "isChainActive": true
    // },
    // {
    //     "id": 4,
    //     "name": "avalanche",
    //     "stargatechainid": 106,
    //     "isCrossSwapEnabled": true,
    //     "isChainActive": true
    // },
    // {
    //     "id": 6,
    //     "name": "polygon",
    //     "stargatechainid": 109,
    //     "isCrossSwapEnabled": true,
    //     "isChainActive": true
    // }
  ] )


  const { ethereum  } = window;
  if(ethereum) {
    const outerHtmlElement: any = ethereum;
    outerHtmlElement.on("chainChanged", async (_chainId) => {
     setChainChanged(!chainChanged)
     const chain = await web3.eth.getChainId()
     setCurrentChain(chain)
   
   });
   }

  

  
  

  // const [deadlineInput, setDeadlineInput] = useState('')

  const { t } = useTranslation()
 // const { account } = useWeb3React()
  const web3 = new Web3(window.ethereum as any)
  const [showBalance, setShowBalance] = useState(false)


  const notifyEth = () => {
    
    toast.warning('Please connect to ethereum network !', {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      });      
     // errorSound.play()
  };
  

  const networkSelect1 = async (tokenName,selectNetwork) =>{




  
      setGetNetwork1(selectNetwork?.name)
   
  
 
      if(selectNetwork?.name === "bsc"){
         setupNetwork1(56)
      } else if (selectNetwork?.name === "avalanche"){
        setupNetwork2()
      } else if (selectNetwork?.name === "polygon"){
        setupNetwork1(137)
      }
      else if (selectNetwork?.name === "ethereum"){
        console.log('currentchain',currentChain)
        if(currentChain !== 1){
        notifyEth()
        }
        setupNetwork1(1)
      }
      else if (selectNetwork?.name === "fantom"){
        setupNetwork1(250)
      } else if (selectNetwork?.name === "optimism"){
        setupNetwork1(10)
      } else if (selectNetwork?.name === "arbitrum"){
        setupNetwork1(42161)
      }
      
    
  
  
  
  }

  const tokenRefresh = () => {
    console.log("hello")
      }
    
  


  const [onPresentNetworkModal] =  useModal(<CoinsModal tokenFunc2={networkSelect1} ListData={networkListCross} tokenName="token1" setInitToken={setInitToken} initToken={initToken} tokenRefresh={tokenRefresh} setChain="avax" /> )

 // const [onPresentSettingsModal1] = useModal(<CoinsSelectModal ListData={(token1List)?.slice(0,7)} tokenName="token1" tokenFunc2={tokenFunc1} setChain={getNetwork1} setChain2={getNetwork2} account={account} balList={tokenBal} order={order} usdcToken={usdcToken} usdtToken={usdtToken}/>)
  return (
    
    <AutoColumn gap="md">
      <AutoColumn gap="sm">
      <ToastContainer/>
         
            <div className="d-flex flex-row justify-content-between" >
              
            <div style={{backgroundColor:"#292929"}} onClick={onPresentNetworkModal}>
              {getNetwork(getNetwork1)}      
              </div>
        

          {/* <div onClick={onPresentSettingsModal1} >
              {getTokenImage(token2Object)}      
              </div> */}
            
            </div>
            <StyledButton
              onClick={() => {
                // tokenFunc2(tokenName, ListData[0])
                // onDismiss()
                // setSelectButton((ListData[0]?.name)?.toUpperCase())
              }}
              
            >
              Mint
            </StyledButton>

            
           
    
   
       
      </AutoColumn>

  
    </AutoColumn>
  )
}
