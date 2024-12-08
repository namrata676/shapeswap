import React, { useState, useEffect, useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import ReactLoading from 'react-loading'
import ReactTooltip from 'react-tooltip';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import useInterval from 'react-useinterval';
import Web3 from "web3";
import useAuth from 'hooks/useAuth'
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "./Exchange.css"
import styled from 'styled-components'
import { Heading, Text, BaseLayout, useModal, tokenPairImageVariant } from 'toolkit/uikit'
import { BnbUsdtPairTokenIcon, CardBody } from 'uikit'
import { ApolloClient, InMemoryCache, gql, Cache } from "@apollo/client";
import { parseInt } from 'lodash';
import useAnalyticsEventTracker from '../../components/useAnalyticsEventTracker';
import { AppHeader, AppBody } from '../../components/App'
import { setupNetwork2, setupNetwork1 } from '../../utils/wallet'
import { getTokenImage, getNetwork } from './avalancheutils'
import ToggleButtonAC from '../Home/components/ToggleButtonAC'
import CoinsModal from '../coinsModal/CoinsModal'
import CoinsSelectModal from '../coinsSelectModal/CoinsSelectModal'
import { polarcontractAddress, polarABI, joePairPolar} from '../../Abi/avalancheSwap/polarConfig'
import { nebucontractAddress, nebuABI, joePairNebu} from '../../Abi/avalancheSwap/nebulaConfig'
import {swapContractAddress as swapContractAddressBsc, swapContractAbi as swapContractAbiBsc} from '../../Abi/binanceSwap/swapTokenContractBinance'
import {swapContractAddress as swapContractAddressAvax, swapContractAbi as swapContractAbiAvax} from '../../Abi/avalancheSwap/swapTokenContractAvalanche'
import {swapContractAddress as swapContractAddressPoly, swapContractAbi as swapContractAbiPoly} from '../../Abi/polygonSwap/swapTokenContractPolygon'
import {swapContractAddress as swapContractAddressFantom, swapContractAbi as swapContractAbiFantom} from '../../Abi/fantomSwap/swapTokenContractFantom'
import {swapContractAddress as swapContractAddressArbitrum, swapContractAbi as swapContractAbiArbitrum} from '../../Abi/arbitrumSwap/swapTokenContractArbitrum'
import {swapContractAddress as swapContractAddressOptimism, swapContractAbi as swapContractAbiOptimism} from '../../Abi/optimismSwap/swapTokenContractOptimism'
import {swapContractAddress as swapContractAddressEth, swapContractAbi as swapContractAbiEth} from '../../Abi/ethereumSwap/swapTokenContractEthereum'
import ThingsContext from '../../swapContext'
import { Login } from "../../toolkit/uikit/widgets/WalletModal/types";
import { useWalletModal } from '../../toolkit/uikit/widgets/WalletModal'


const sentSound = new Audio("/images/sound/swoosh.mp3")

  const sentSound1 = () => {
    sentSound.play()
  }

  const errorSound = new Audio("/images/sound/error.mp3")

  const errorSound1 = () => {
    errorSound.play()
  }

  const approveSound = new Audio("/images/sound/accept.mp3")

  const approveSound1 = () => {        
    approveSound.play()    
  }



const StyledCardBody = styled(CardBody)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #E6E9EE; 
  color: white !important;
  border-color: #faa21a;   
  padding-top: 0px !important; 
`

const StyledButton = styled.button`
  order: 4;
  align-items: center;
  border-radius: 12px;
  border-color: #01b39e;
  padding: 12px;
  margin-top: 20px;
  cursor: pointer;
  display: inline-flex;
  width: 100%;
  font-family: inherit !important;
font-style: normal !important;
font-weight: 500 !important;
font-size: 20px !impotant;
  justify-content: center;
  letter-spacing: 0.03em;
  color: #FFFFFF;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`;


const StyledButton2 = styled.button`
  order:2;
  align-items: center;
  border: 0;
  border-radius: 15px;
  padding: 10px;
  margin-top: 5px;
  display: inline-flex;
  width: 30px;
  height: 30px;
  background-color: black;
  font-family: inherit;
  font-size: 25px;
  justify-content: center;
  letter-spacing: 0.03em;
  color: #faa21a;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`;


const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid;
  border-radius: 10px;
  border-color: rgba(29, 29, 29, 0.05);
  padding: 17px;
  background: #272f37 !important;
  background: white !important;
  font-size: 10px !important;
  color: white !important;
`

const StyledLoading = styled.div`
  order: 4;
  align-items: center;
  border: 1;
  border-color: #0095EC;
  // box-shadow: 0 0 6px #f8981d;
  border-radius: 12px;
  padding: 12px;
  margin-top: 20px;
  cursor: pointer;
  display: inline-flex;
  width: 94%;
  font-family: inherit;
  font-size: 26px !important;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-image: grey;
  color: #faa21a;
  transition: background-color 0.2s, opacity 0.2s;
  disabled !important;

  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`;


const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;
  width: 100%;

  & > div {
    grid-column: span 12;
    background-color: #E6E9EE !important; 
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
      background-color: #E6E9EE !important;       
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    & > div {
      grid-column: span 6;
      background-color: #E6E9EE !important; 
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 3;
    }
  }
`

const BiggerCards = styled(Cards)`
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
      font-size: 0.5em;
      border-radius:20px;          
      background-color: ##E6E9EE !important;
      border: 1; 
      
      position: relative;
      margin: 0 auto;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.01), 0px 12px 40px rgba(0, 0, 0, 0.02), 0px 8px 24px rgba(0, 0, 0, 0.02);
     
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
      background-color: #E6E9EE !important;
    }
  }
`

const Label = styled.div<{ labelSize: string }>`
font-size: 14px;
color: #fff !important;
margin-top:10px 30px;
padding-top:20px;
`

const Labelo = styled.div<{ labelSize: string }>`
font-size: 40px !important;
color: #fff !important;
display: block;
    text-align: center;
    line-height: 150%;
    padding-top: 20px;    
`
const BalanceBody = styled.div`
font-size: 13px !important;
margin-right: 2px !important;
margin-bottom: 5px !important;
font-weight: 400 !important;
font-style: normal !important;
color: black !important;
font-family: Inter;
`

const NetworkText = styled.div`
font-size: 18px !important;
color: white !important;
font-weight: 700 !important;
margin-bottom: 3px;
margin-top: 0px !important
`

const CollapseText = styled.div`
font-style: normal !important;
font-weight: 400 !important;
font-size: 14px !important;
margin-bottom : 0%;
color: white !important;
font-family: inherit !important;
`
const CollapseTextBold = styled.div`
font-style: normal !important;
font-weight: 5 00 !important;
font-size: 16px !important;
color:  white !important;
`


const StyledButton6 = styled.button`
  order: 4;
  align-items: center;
  boder-radius: 0;
  border: 0;
  border-color: #1B2028;
  cursor: pointer;
  
  width: 90%;
  font-family: inherit !important;
font-style: normal !important;
font-weight: 500 !important;
font-size: 25px !impotant;
  
  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`;




const Exchange = () => {
  const [token1, setToekn1] = useState('');
  const [token2, setToekn2] = useState('');
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [balance1, setBalance1] = useState('0')
  const [balance2, setBalance2] = useState('0')
  const [order, setOrder] = useState(false);
  const { account : accountFinal } = useWeb3React()
  const [slippage, setSlippage] = useState(0)
  const [srcSlippage, setSrcSlippage] = useState(0.005)
  const [dstSlippage, setDstSlippage] = useState(0.01)
  const [loading, setLoading] = useState(false)
  const [swapLoading, setSwapLoading] = useState(false)
  const [swapType, setSwapType] = useState(2)
  const [tokenBal, setTokenBal] = useState([])
  const [usdtToken, setUsdtToken] = useState({} as any)
  const [usdcToken, setUsdcToken] = useState({} as any)
  const [usdt1Token, setUsdt1Token] = useState({} as any) 
  const [usdc1Token, setUsdc1Token] = useState({} as any)
  const commonThings = useContext(ThingsContext)

  const {setSwapHeader, account, setAccount} = commonThings as any
  const {login, logout} = useAuth()

  const fantomAbi = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint8","name":"_decimals","type":"uint8"},{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"},{"indexed":true,"internalType":"uint256","name":"effectiveTime","type":"uint256"}],"name":"LogChangeDCRMOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"txhash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogSwapin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"bindaddr","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogSwapout","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"txhash","type":"bytes32"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Swapin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"bindaddr","type":"address"}],"name":"Swapout","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TRANSFER_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"changeDCRMOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"transferAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"transferWithPermit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]


  // const [account, setAccount] = useState(accountFinal)
  const [showPrice, setShowPrice] = useState(0)

  useEffect(() => {
 
  const account1 = localStorage.getItem("account")
  
  if(account1 !== null && account1 !== undefined){
   setAccount(account1)
  
  } else {
    if(accountFinal !== undefined){
    localStorage.setItem("account",accountFinal)
    }
    setAccount(accountFinal)
   
  }
  
 // eslint-disable-next-line react-hooks/exhaustive-deps
  },[accountFinal])

  const [token1Object, setToken1Object] = useState({
    "name": "Token",
    "exchangeIndex" : 0,
    "icon": "",
    "chain": "avax",
    "tokenAddress" : "",
    "decimals": 0,
    "photoUrl" : null


  })
  const usdcAddress = ("0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E").toLowerCase()
  const [token2Object, setToken2Object] = useState({

    "name": "Token",
    "exchangeIndex" : 0,
    "icon": "",
    "chain": "avax",
    "tokenAddress": '',
    "decimals": 0,
    "photoUrl" : null,
    

  })
  const [initToken, setInitToken] = useState(false)

  const approvalAmount = (100000*(10**18)).toLocaleString('fullwide', { useGrouping: false })

    const gaEventTracker = useAnalyticsEventTracker('swap');
   
  
    const web3 = new Web3(window.ethereum as any)
    const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout,account, setAccount)

    const queryParams = new URLSearchParams(window.location.search)
    const referral = queryParams.get("refID")

    console.log('referral',referral)
 
   const [swapAmountWithSlippage1, setSwapAmountWithSlippage1] = useState(0)
   const [swapAmountWithSlippage2, setSwapAmountWithSlippage2] = useState(0)
   const [isOn, setIsOn] = useState(false)
   const [currentCA, setCurrentCA] = useState({})
   const [decimals, setDecimals] = useState(0)
   const [token1List, setToken1List] = useState([])
   const [token2List, setToken2List] = useState([])
   
   const [finalReservePair1, setFinalReservePair1] = useState(0)
   const [finalReservePair2, setFinalReservePair2] = useState(0)
   const [swapMessage, setSwapMessage] = useState("Swap")
   const [checkPair, setCheckPair] = useState({} as any)

   const [responseData, setResponseData] = useState({

   } as any)


   const [tokenApproval, setTokenApproval] = useState(false)

   const [pathObject, setPathObject] = useState([])

   const [tokenIndex, setTokenIndex] = useState(0)
   const [ hideApprove, setHideApprove] = useState(false)
   const [checkCommonPair, setCheckCommonPair] = useState({})
   const [boolCommon, setBoolCommon] = useState(false)
   const [refreshPrice, setRefreshPrice] = useState(0)

   const [showCollapse, setShowCollapse] = useState(true)

   const [getNetwork1, setGetNetwork1] = useState("None")
    const [getNetwork2, setGetNetwork2] = useState("None")

    const [networkList, setGetNetworkList] = useState([
      {
          "id": 1,
          "name": "bsc",
          "stargatechainid": 102,
          "isCrossSwapEnabled": true,
          "isChainActive": true,
          "color": "white",
      },
      {
          "id": 10,
          "name": "ethereum",
          "stargatechainid": 101,
          "isCrossSwapEnabled": true,
          "isChainActive": true,
          "color": "white"
      },
      {
          "id": 4,
          "name": "avalanche",
          "stargatechainid": 106,
          "isCrossSwapEnabled": true,
          "isChainActive": true,
          "color": "white"
      },
      {
          "id": 6,
          "name": "polygon",
          "stargatechainid": 109,
          "isCrossSwapEnabled": true,
          "isChainActive": true,
          "color": "white"
      },
      {
          "id": 9,
          "name": "optimism",
          "stargatechainid": -1,
          "isCrossSwapEnabled": false,
          "isChainActive": true,
          "color": "white"
      },
      {
          "id": 7,
          "name": "arbitrum",
          "stargatechainid": -1,
          "isCrossSwapEnabled": false,
          "isChainActive": true,
          "color": "white"
      },
      {
          "id": 8,
          "name": "fantom",
          "stargatechainid": -1,
          "isCrossSwapEnabled": false,
          "isChainActive": true,
          "color": "white"
      }
  ])
    const [networkListCross, setGetNetworkListCross] = useState([
      {
          "id": 1,
          "name": "bsc",
          "stargatechainid": 102,
          "isCrossSwapEnabled": true,
          "isChainActive": true
      },
      {
          "id": 10,
          "name": "ethereum",
          "stargatechainid": 101,
          "isCrossSwapEnabled": true,
          "isChainActive": true
      },
      {
          "id": 4,
          "name": "avalanche",
          "stargatechainid": 106,
          "isCrossSwapEnabled": true,
          "isChainActive": true
      },
      {
          "id": 6,
          "name": "polygon",
          "stargatechainid": 109,
          "isCrossSwapEnabled": true,
          "isChainActive": true
      }] )
    const [chainChanged, setChainChanged] = useState(false)
    const [currentChain, setCurrentChain] = useState(0)
    const [selectedNetwork, setSelectedNetwork] = useState(0)
    const [disableSwap, setDisableSwap] = useState(false)


   const  swapContractAvalanche = new web3.eth.Contract(swapContractAbiAvax as any, swapContractAddressAvax);
   const  swapContractBinance = new web3.eth.Contract(swapContractAbiBsc as any, swapContractAddressBsc);
   const  swapContractPolygon = new web3.eth.Contract(swapContractAbiPoly as any, swapContractAddressPoly);
   const  swapContractFantom = new web3.eth.Contract(swapContractAbiFantom as any, swapContractAddressFantom);
   const  swapContractArbitrum = new web3.eth.Contract(swapContractAbiArbitrum as any, swapContractAddressArbitrum);
   const  swapContractOptimism = new web3.eth.Contract(swapContractAbiOptimism as any, swapContractAddressOptimism);
   const  swapContractEth = new web3.eth.Contract(swapContractAbiEth as any, swapContractAddressEth);

   const { ethereum  } = window;
   if(ethereum) {
     const outerHtmlElement: any = ethereum;
     outerHtmlElement.on("chainChanged", async (_chainId) => {
      setChainChanged(!chainChanged)
      const chain = await web3.eth.getChainId()
      setCurrentChain(chain)
    
    });
    }


    useEffect(()=>{


  axios.get('https://1f8vxhjggh.execute-api.us-east-1.amazonaws.com/supportChainList')
  .then(function (response) {
    // handle success
    console.log("Responsechain", response?.data?.chain_data);
   const crossArray = []
   const localArray = []
    response?.data?.chain_data?.forEach((chain)=>{
      if(chain?.isCrossSwapEnabled){
        if(chain?.name === "bsc"){
          crossArray[0] = chain
          // eslint-disable-next-line dot-notation 
          crossArray[0]['color'] = 'white'
        } else if (chain?.name === "ethereum"){
          crossArray[1] = chain
           // eslint-disable-next-line dot-notation 
          crossArray[1]['color'] = 'white'
        } else if (chain?.name === "avalanche"){
          crossArray[2] = chain
             // eslint-disable-next-line dot-notation 
          crossArray[2]['color'] = 'white'
        }
        else {
          crossArray[3] = chain
             // eslint-disable-next-line dot-notation 
          crossArray[3]['color'] = 'white'
        }

      }

    })
    setTimeout(()=>{
      setGetNetworkListCross(crossArray)
    },300)

    response?.data?.chain_data?.forEach((chain)=>{
     
        if(chain?.name === "bsc"){
          localArray[0] = chain
          
        } else if (chain?.name === "ethereum"){
          localArray[1] = chain
     
        } else if (chain?.name === "avalanche"){
          localArray[2] = chain
        
        }
        else if (chain?.name === "polygon") {
          localArray[3] = chain
         
        }
        else if (chain?.name === "optimism") {
          localArray[4] = chain
         
        }
        else if (chain?.name === "arbitrum") {
          localArray[5] = chain
        
        }
        else if (chain?.name === "fantom") {
          localArray[6] = chain
         
        }

      

    })

    })
  .catch(function (error) {
    // handle error
    console.log(error);
  })


    }, [])

 

// useEffect (()=> {
//   axios.get('http://44.211.182.40:8000/getCrossNFTSwap/?dest_nft_receiver=0x92e98B4DaBB28c051394db6B0A438084ebC6199F&src_sell_token=USDT&nft_amount=1"')
//   .then(function (response) {
//     // handle success
//     console.log("Responsechainmint", response?.data);
 

//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })



// },[])

const getChain = async() => {
  const chain = await web3.eth.getChainId()
  setCurrentChain(chain)
}

useEffect( ()=>{
getChain()


  // eslint-disable-next-line react-hooks/exhaustive-deps
},[])

useEffect(() => {

  const object1 = {
    "name": "Token",
    "exchangeIndex" : 0,
    "icon": "",
    "chain": "avax",
    "tokenAddress" : "",
    "decimals" : 0,
    "photoUrl" : null
 }

  setToken1Object(object1)
  setToekn1("")
  setBalance1('0')

  const object2 = {
    "name": "Token",
    "exchangeIndex" : 0,
    "icon": "",
    "chain": "avax",
    "tokenAddress" : "",
    "decimals" : 0,
    "photoUrl" : null


  }
   
  setToken2Object(object2)
  setToekn2("")
  setBalance2('0')

  setGetNetwork1("None")
  setGetNetwork2("None")
  setAmount1(0)
  setAmount2(0)

  if(swapType === 1){
    setSlippage(1)
  } else {
    setSrcSlippage(0.005)
    setDstSlippage(0.01)
    setSlippage(0.5)
  }

   // eslint-disable-next-line react-hooks/exhaustive-deps
},[swapType])

console.log('srcslippage', srcSlippage, dstSlippage)

const getCurrentNetwork = (selectNetwork) =>{
  if(selectNetwork === "bsc"){
    setSelectedNetwork(56)
    return 56
  
     
  } 
  // eslint-disable-next-line no-else-return
  else if (selectNetwork === "avalanche"){
    setSelectedNetwork(43114)
    return 43114
     
  } else if (selectNetwork === "polygon"){
    setSelectedNetwork(137)
    return 137
     
  }
  else if (selectNetwork === "ethereum"){
    setSelectedNetwork(1)
    return 1
     
  }
  else if (selectNetwork === "fantom"){
    setSelectedNetwork(250)
    return 250
     
  }
  else if (selectNetwork === "arbitrum"){
 
    setSelectedNetwork(42161)
    return 42161
     
  }
  else if (selectNetwork === "optimism"){
  
    setSelectedNetwork(10)
    return 10
     
  } else {
    return ''
  }
  
}

useEffect(()=>{


 if(swapType === 2){
  
     setGetNetwork2(getNetwork1) 
     networkSelect2(getNetwork1)
  
 }

const network = getCurrentNetwork(getNetwork1)
if(network === currentChain){
  initialBal(token1List)
}



  // eslint-disable-next-line react-hooks/exhaustive-deps
},[getNetwork1])

useEffect(()=>{

  if(!order){
    console.log("tokenwe",token1List)
    const initialToken =  token1List.find(p => (p?.tokenAddress) === ("0x0000000000000000000000000000000000000000"))
    console.log("initialtokentokenwe",initialToken)
    if(initialToken !== undefined){
      tokenFunc1("token1",initialToken)
      // setToken1Object(initialToken)
      // setToekn1(initialToken?.name)
    }
  }

  if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

  initialBalance()
  }
  if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){

    initialBalance2()
    }
  
 
  

// eslint-disable-next-line react-hooks/exhaustive-deps
},[token1List])

useEffect(()=>{



  if(swapType === 2){
   
      setGetNetwork1(getNetwork2) 
      networkSelect2(getNetwork2)
   
  }


  
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[getNetwork2])

 useEffect(()=>{

  if(order){
    const initialToken =  token2List.find(p => (p?.tokenAddress) === ("0x0000000000000000000000000000000000000000"))
    if(initialToken !== undefined){
      tokenFunc2("token2",initialToken)
    // setToken2Object(initialToken)
    // setToekn2(initialToken?.name)
    }
  }

 
  if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

    initialBalance()
    }
    if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
  
      initialBalance2()
      }
    
   
  
 
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[token2List])

 useEffect(()=>{


  if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "") ){

    initialBalance()
    }
    if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
  
      initialBalance2()
      }
    
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[chainChanged])


useEffect (()=> {

  const object1 = {
    "name": "Token",
    "exchangeIndex" : 0,
    "icon": "",
    "chain": "avax",
    "tokenAddress" : "",
    "decimals" : 0,
    "photoUrl" : null
 }

  setToken1Object(object1)
  setToekn1("")
  setBalance1('0')


  axios.get('https://1f8vxhjggh.execute-api.us-east-1.amazonaws.com/tokenList',{
    params: {
      chain_name: getNetwork1
    }
  })
  .then(function (response) {
    // handle success
    console.log("Responsetoken", response);
    
    if(response?.data?.token_list_data){
         const res = response?.data?.token_list_data
         const ethArray = res
         const network = getCurrentNetwork(getNetwork1)
         if(network === currentChain){
          initialBal(res)
         }
         if(getNetwork1 === "ethereum"){
            const ethToken = res.find((token) => token?.tokenAddress === "0x0000000000000000000000000000000000000000")
            ethArray[0] = ethToken
            const usdcToken1 = res.find((token) => (token?.name)?.toLowerCase() === "usdc")
          const usdtToken1 = res.find((token) => (token?.name)?.toLowerCase() === "usdt")
          if(usdcToken1 !== undefined){
           setUsdcToken(usdcToken1)
          }
          else{
            setUsdcToken({})
          }
          if(usdtToken1 !== undefined){
           setUsdtToken(usdtToken1)
          } else {
            setUsdtToken({})
          }

        
       
            setToken1List(ethArray)
        
         } else {
          const usdcToken1 = res.find((token) => (token?.name)?.toLowerCase() === "usdc")
          const usdtToken1 = res.find((token) => (token?.name)?.toLowerCase() === "usdt")
          // const ethToken = res.find((token) => token?.tokenAddress === "0x0000000000000000000000000000000000000000")
         // ethArray[0] = ethToken
          if(usdcToken1 !== undefined) {
            setUsdcToken(usdcToken1)
          }
          else{
            setUsdcToken({})
          }
          if(usdtToken1 !== undefined){
            setUsdtToken(usdtToken1)
          }
          else {
            setUsdtToken({})
          }
            setToken1List(res)
       
         }
         
         

   
    } else {
      setToken1List([])
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

 // eslint-disable-next-line react-hooks/exhaustive-deps
},[getNetwork1])

useEffect(()=>{

if(order){
  if(getNetwork2 !== 'None'){
    setTimeout(()=>{
      initialBal(token2List)
    },300)
 
  }
}

if(!order){
  if(getNetwork1 !== 'None'){

    setTimeout(()=>{
      initialBal(token1List)
    },300)
 
  }
}

 // eslint-disable-next-line react-hooks/exhaustive-deps
},[chainChanged])


useEffect(()=>{
if(slippage !== 0){  

console.log("slippage##",slippage/100)
setSrcSlippage(slippage/100)
// setDstSlippage(slippage/100)
}
},[slippage])

useEffect (()=> {

  const object2 = {
    "name": "Token",
    "exchangeIndex" : 0,
    "icon": "",
    "chain": "avax",
    "tokenAddress" : "",
    "decimals" : 0,
    "photoUrl" : null


  }
   
  setToken2Object(object2)
  setToekn2("")
  setBalance2('0')


  axios.get('https://1f8vxhjggh.execute-api.us-east-1.amazonaws.com/tokenList',{
    params: {
      chain_name: getNetwork2
    }
  })
  .then(function (response) {
    // handle success
    console.log("Responsetoken",response);
    if(response?.data?.token_list_data){
     
      const res = response?.data?.token_list_data
      const ethArray = res
      if(getNetwork2 === "ethereum"){
        const ethToken = res.find((token) => token?.tokenAddress === "0x0000000000000000000000000000000000000000")
        ethArray[0] = ethToken
        const usdcToken2 = res.find((token) => (token?.name)?.toLowerCase() === "usdc")
        const usdtToken2 = res.find((token) => (token?.name)?.toLowerCase() === "usdt")
        // const ethToken = res.find((token) => token?.tokenAddress === "0x0000000000000000000000000000000000000000")
       // ethArray[0] = ethToken
        if(usdcToken2 !== undefined) {
          setUsdc1Token(usdcToken2)
        }
        else{
          setUsdc1Token({})
        }
        if(usdtToken2 !== undefined){
          setUsdt1Token(usdtToken2)
        }
        else {
          setUsdt1Token({})
        }
        setToken2List(ethArray)
     } else {
      const usdcToken2 = res.find((token) => (token?.name)?.toLowerCase() === "usdc")
      const usdtToken2 = res.find((token) => (token?.name)?.toLowerCase() === "usdt")
      // const ethToken = res.find((token) => token?.tokenAddress === "0x0000000000000000000000000000000000000000")
     // ethArray[0] = ethToken
      if(usdcToken2 !== undefined) {
        setUsdc1Token(usdcToken2)
      }
      else{
        setUsdc1Token({})
      }
      if(usdtToken2 !== undefined){
        setUsdt1Token(usdtToken2)
      }
      else {
        setUsdt1Token({})
      }
     setToken2List(res)
     }
  
    } else {
      setToken2List([])
    }

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })



 // eslint-disable-next-line react-hooks/exhaustive-deps
},[getNetwork2])

 
   const GRAPHAPIURL = "https://api.thegraph.com/subgraphs/name/harry1121-s/dex-aggregator-avax"

    
  const notifySuccess = () => {
    
    toast.success('Successfully Swapped Tokens !', {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      });      
      sentSound.play()
};


const notifyEth = () => {
    
  toast.warning('Please connect to ethereum network !', {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    });      
    errorSound.play()
};

    
const notifyApprove= () => {
    
  toast.success('Successfully Approved Tokens !', {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    });
    approveSound.volume = 0.3
    approveSound.play()
};


const notifyError = () => {
  toast.error('Error in Swapping Tokens !', {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    errorSound.volume = 0.3
    errorSound.play()

};





  const findReserves = async (tokenPair1, tokenPair2, testAddress) => {

    console.log("findcommonfindenter@@",tokenPair1, tokenPair2)

    setPathObject([token1Object?.tokenAddress,testAddress, token2Object?.tokenAddress])
    setSwapMessage("Swap")
    setTokenIndex(tokenPair1?.exchangeIndex)
    setHideApprove(false)
    setBoolCommon(true)

        let myTokenDecimal1 = 0
        let pairTokenDecimal1 = 0

        let token1Reserve = 0
        let token2Reserve = 0

        const joeContract1 = new web3.eth.Contract(joePairNebu as any, tokenPair1?.pairAddress)

        const myTokenContract1 = new web3.eth.Contract(polarABI as any, tokenPair1?.myToken);
        const myPairContract1 = new web3.eth.Contract(polarABI as any, tokenPair1?.pairToken);
          

        myPairContract1.methods.decimals().call().then( async function( mypairdec ) {
          
        await myTokenContract1.methods.decimals().call().then( function( mytokendec) {
          myTokenDecimal1 = mytokendec
                })
          pairTokenDecimal1 = mypairdec
          joeContract1.methods.getReserves().call().then(async function( infoReserve1 ) {

            

            await joeContract1.methods.token0().call().then( function( info2 ) {

            
             if(info2.toLowerCase() === tokenPair1?.myToken.toLowerCase()){

              
            let addZero1 = ""
            let addZero2 = ""
           for(let i=0; i<pairTokenDecimal1; i++){
                   
             addZero1 += "0"

           }
           for(let i=0; i<myTokenDecimal1; i++){

            addZero2 += "0"

          }
            
           const token1BigInt = String(infoReserve1[0]) + addZero1
           
          console.log("findcommonfindtoken1@@@",token1BigInt)
         
           console.log("findcommonfind@",token1BigInt)
           const token2BigInt = String(infoReserve1[1]) + addZero2
           console.log("findcommonfindtoken1!!!!",token2BigInt)

           const token3BigInt = Number(BigInt(token1BigInt) * BigInt("1000000")/ BigInt(token2BigInt))/1000000
         
           token1Reserve = token3BigInt
              
              // token1Reserve = parseInt((info1[0]*(10**pairTokenDecimal1)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[1]*(10**myTokenDecimal1)).toLocaleString('fullwide', { useGrouping: false }))
               console.log("findcommonfindtoken1reserve",token1Reserve)
              
     
             
             } else {
              let addZero1 = ""
              let addZero2 = ""
             for(let i=0; i<pairTokenDecimal1; i++){
                     
               addZero1 += "0"
  
             }
             for(let i=0; i<myTokenDecimal1; i++){
  
              addZero2 += "0"
  
            }
              
             const token1BigInt = String(infoReserve1[1]) + addZero1
             
             console.log("findcommonfind@",token1BigInt)
             const token2BigInt = String(infoReserve1[0]) + addZero2
  
             const token3BigInt = Number(BigInt(token1BigInt) * BigInt("1000000")/ BigInt(token2BigInt))/1000000
           
             token1Reserve = token3BigInt
                
              
             
              // token1Reserve = parseInt((info1[1]*(10**myTokenDecimal1)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[0]*(10**pairTokenDecimal1)).toLocaleString('fullwide', { useGrouping: false }))
               console.log("findcommonfindtoken1reserve@",token1Reserve)
             }
          })
   
         })
        })
     
      let myTokenDecimal2 = 0
      let pairTokenDecimal2 = 0 

      const joeContract2 = new web3.eth.Contract(joePairNebu as any, tokenPair2?.pairAddress)
      const myTokenContract2 = new web3.eth.Contract(polarABI as any, tokenPair2?.myToken);
      const myPairContract2 = new web3.eth.Contract(polarABI as any, tokenPair2?.pairToken);
    
      myPairContract2.methods.decimals().call().then(async function( pairdecimal2 ) {
        pairTokenDecimal2 = pairdecimal2
       await myTokenContract2.methods.decimals().call().then( function( mytokendecimal2 ) {
          myTokenDecimal2 = mytokendecimal2
           })

        await joeContract2.methods.getReserves().call().then(async function( infoReserve ) {

          await joeContract2.methods.token0().call().then( function( info2 ) {
         
           if(info2.toLowerCase() === tokenPair2?.myToken?.toLowerCase()){

            let addZero1 = ""
              let addZero2 = ""
             for(let i=0; i<pairTokenDecimal2; i++){
                     
               addZero1 += "0"

             }
             for(let i=0; i<myTokenDecimal2; i++){
  
              addZero2 += "0"

            }
              
             const token1BigInt = String(infoReserve[0]) + addZero1
             
             console.log("findcommonfind@",token1BigInt)
             const token2BigInt = String(infoReserve[1]) + addZero2

             const token3BigInt = Number(BigInt(token1BigInt) * BigInt("1000000")/ BigInt(token2BigInt))/1000000
           
             token2Reserve = token3BigInt
             console.log("findcommonfindtoken2reserve@",token2Reserve)

            
            
          
            //  token2Reserve = parseInt((infoReserve[0]*(10**pairTokenDecimal2)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((infoReserve[1]*(10**myTokenDecimal2)).toLocaleString('fullwide', { useGrouping: false }))
             console.log("findcommonfindtoken2reserve",token2Reserve)
             setTimeout(() =>{
              setRefreshPrice(2)
               setFinalReservePair1(token1Reserve/token2Reserve)
               console.log("findcommonreserveeeeeeeeee",token1Reserve/token2Reserve)
               console.log("findcommonreserveeeeeeeeee11",token2Reserve/token1Reserve)
               setFinalReservePair2(token2Reserve/token1Reserve)
  
                    }, 200);
           
           } else {
              let addZero1 = ""
              let addZero2 = ""
             for(let i=0; i<pairTokenDecimal2; i++){
                     
               addZero1 += "0"

             }
             for(let i=0; i<myTokenDecimal2; i++){
  
              addZero2 += "0"

            }
              
             const token1BigInt = String(infoReserve[1]) + addZero1
             
             console.log("findcommonfind@",token1BigInt)
             const token2BigInt = String(infoReserve[0]) + addZero2

             const token3BigInt = Number(BigInt(token1BigInt) * BigInt("1000000")/ BigInt(token2BigInt))/1000000
           
             token2Reserve = token3BigInt
             console.log("findcommonfindtoken2reserve@",token2Reserve)
    
             setTimeout(() =>{
              setRefreshPrice(2)
         setFinalReservePair1(token2Reserve/token1Reserve)
         console.log("findcommonreserveeeeeeeeee",token1Reserve/token2Reserve)
         setFinalReservePair2(token1Reserve/token2Reserve)
         console.log("findcommonreserveeeeeeeeee111",token2Reserve/token1Reserve)
             
             }, 200);
     }
        })
      })
 })
  } 


  const getCommonPair = async (tokenAaddress, tokenBaddress, testAddress) => {
    let checkBool = false

    if(tokenAaddress !== testAddress && tokenBaddress !== testAddress){

    console.log("findcommonpair",tokenAaddress, tokenBaddress, testAddress)

    const findPairForTokenA = []
    const findPairForTokenB = []

    let projectDataGQL3 = null;
    let projectDataGQL4 = null;
   

    let projectDataGQL5 = null;
    let projectDataGQL6 = null;
    const client = new ApolloClient({
      uri: GRAPHAPIURL,
      cache: new InMemoryCache(),
    });
    const projectOwnerDataQuery = `query {
      pairs (where:{tokenA:"${tokenAaddress.toLowerCase()}",tokenB:"${testAddress.toLowerCase()}"}){
        id
        tokenA
        tokenBEntity {
          id
          name
          symbol
          decimal
        }
        tokenB
        tokenBEntity {
          id
          name
          symbol
          decimal
        }
        exchange
        router
      }
    }`;
    
    const projectOwnerDataQuery1 = `query {
      pairs (where:{tokenA:"${testAddress.toLowerCase()}",tokenB:"${tokenAaddress.toLowerCase()}"}){
        id
        tokenA
        tokenBEntity {
          id
          name
          symbol
          decimal
        }
        tokenB
        tokenBEntity {
          id
          name
          symbol
          decimal
        }
        exchange
        router
      }
    }`;

    const projectOwnerDataQuery2 = `query {
      pairs (where:{tokenA:"${tokenBaddress.toLowerCase()}",tokenB:"${testAddress.toLowerCase()}"}){
        id
        tokenA
        tokenBEntity {
          id
          name
          symbol
          decimal
        }
        tokenB
        tokenBEntity {
          id
          name
          symbol
          decimal
        }
        exchange
        router
      }
    }`;
    
    const projectOwnerDataQuery3 = `query {
      pairs (where:{tokenA:"${testAddress.toLowerCase()}",tokenB:"${tokenBaddress.toLowerCase()}"}){
        id
        tokenA
        tokenBEntity {
          id
          name
          symbol
          decimal
        }
        tokenB
        tokenBEntity {
          id
          name
          symbol
          decimal
        }
        exchange
        router
      }
    }`;

    try {
      projectDataGQL3 = await client.query({
        query: gql(projectOwnerDataQuery),
        fetchPolicy: "network-only",
      });
        const arr = [];

        if(projectDataGQL3?.data?.pairs?.length === 0){

          try {
            projectDataGQL4 = await client.query({
              query: gql(projectOwnerDataQuery1),
              fetchPolicy: "network-only",
            });

             if(projectDataGQL4?.data?.pairs?.length === 0 ){
                    
                 setCheckCommonPair({})

             } 
        else { 
           /* eslint-disable no-lonely-if */
           if(projectDataGQL4?.data?.pairs.length >= 1){

          projectDataGQL4?.data?.pairs?.map((tokenA) => (

          findPairForTokenA.push({
            "pairAddress": tokenA?.id,
            "myToken": tokenA?.tokenB,
            "pairToken": tokenA?.tokenA,
            "exchangeIndex" : (tokenA?.exchange).toLowerCase() === ("Pangolin Exchange").toLowerCase() ? 1 : 0,
            "chain": "avax"
        })

        
          ))
         
              }}
            }
             catch (e) {
              console.log(e);
            }}

        else {
        if(projectDataGQL3?.data?.pairs?.length >= 1){
        projectDataGQL3.data.pairs.map((tokenA) => (
       
          findPairForTokenA.push({
              "pairAddress": tokenA?.id,
              "myToken": tokenA?.tokenA,
              "pairToken": tokenA?.tokenB,
              "exchangeIndex" : (tokenA?.exchange).toLowerCase() === ("Pangolin Exchange").toLowerCase() ? 1 : 0,
              "chain": "avax"
          })
        
        ))
      }
    }
      
    }
      catch (e) {
        console.log(e);
      }

    try {
        projectDataGQL5 = await client.query({
          query: gql(projectOwnerDataQuery2),
          fetchPolicy: "network-only",
        });
          const arr = [];
  
          if(projectDataGQL5?.data?.pairs?.length === 0){
  
            try {
               projectDataGQL6 = await client.query({
                query: gql(projectOwnerDataQuery3),
                fetchPolicy: "network-only",
              });
  
               if(projectDataGQL6?.data?.pairs?.length === 0 ){
                      
                   setCheckCommonPair({})
  
               } 
          else {
                     
            if(projectDataGQL6?.data?.pairs.length >= 1){
  
            projectDataGQL6?.data?.pairs?.map((tokenA) => (
  
            findPairForTokenB.push({
              "pairAddress": tokenA?.id,
              "myToken": tokenA?.tokenB,
              "pairToken": tokenA?.tokenA,
              "exchangeIndex" : (tokenA?.exchange).toLowerCase() === ("Pangolin Exchange").toLowerCase() ? 1 : 0,
              "chain": "avax"
          })
  
          
            ))
           
                }}
              }
               catch (e) {
                console.log(e);
              }}
  
          else {
          if(projectDataGQL5?.data?.pairs?.length >= 1){
          projectDataGQL5.data.pairs.map((tokenA) => (
        
            findPairForTokenB.push({
                "pairAddress": tokenA?.id,
                "myToken": tokenA?.tokenA,
                "pairToken": tokenA?.tokenB,
                "exchangeIndex" : (tokenA?.exchange).toLowerCase() === ("Pangolin Exchange").toLowerCase() ? 1 : 0,
                "chain": "avax"
            })
          
          ))
        }
      }
     
       if(findPairForTokenA.length !== 0 && findPairForTokenB.length !== 0) {
          

        if(findPairForTokenA.length === 1 && findPairForTokenB.length === 1){


          findReserves(findPairForTokenA[0],findPairForTokenB[0], testAddress)
          checkBool = true

        } else {

          if(findPairForTokenA.length === 1 && findPairForTokenB.length === 2){

          const  tokenPair = findPairForTokenB.find(p => (p?.exchangeIndex) === (findPairForTokenA[0]?.exchangeIndex))
          if(tokenPair !== undefined){

            findReserves(findPairForTokenA[0],tokenPair, testAddress)
            checkBool = true
          }

          } else if(findPairForTokenA.length === 2 && findPairForTokenB.length === 1){

            const  tokenPair = findPairForTokenA.find(p => (p?.exchangeIndex) === (findPairForTokenB[0]?.exchangeIndex))
            if(tokenPair !== undefined){
  
              findReserves(tokenPair,findPairForTokenB[0], testAddress)
              checkBool = true
            }
  
            } else if (findPairForTokenA.length === 2 && findPairForTokenB.length === 2){


              const  tokenPair = findPairForTokenA.find(p => (p?.exchangeIndex) === 0)
              const  tokenPair1 = findPairForTokenB.find(p => (p?.exchangeIndex) === 0)


              findReserves(tokenPair,tokenPair1, testAddress)    
              checkBool = true

            }
          }

        }
        

       }
        catch (e) {
          console.log(e);
        }

      }

      return checkBool

 } 
 

const refreshCost = () =>{

  console.log("Amount1", amount1, amount2)
  if(!order){
  maxBalanceSwap1(amount1)
  } 
  if(order){
    maxBalanceSwap2(amount2)
  }
}

const tokenRefresh = () => {
const arr = [];
let ourArray = []
if (localStorage.getItem('tokenArray') !== null) {
  const storedArray = localStorage.getItem("tokenArray");
   ourArray = JSON.parse(storedArray);

} 

const tokenListCopy = token1List
    for (let i= 0; i< ourArray.length ; i++){
     
      const obj = tokenListCopy.findIndex(v => v.address === ourArray[i].address);
      if(obj !== -1){    
       
        const obj1 = tokenListCopy[obj]
        if (tokenListCopy[obj] !== undefined) {
          tokenListCopy[obj].saveStatus = "unsave"
        }
        tokenListCopy.splice(obj, 1); 
        tokenListCopy.unshift(obj1)
          
      } else {
         tokenListCopy.unshift(ourArray[i])
      }

    }
    setToken1List(tokenListCopy)
  }

 
  const tokenFunc1 = async(tokenName,tokenSelected) => {
    setToekn1(tokenSelected?.name);
    setToken1Object(tokenSelected)

    
  
    setAmount1(0)
    setAmount2(0)

    if(account !== undefined){
  
      if((tokenSelected?.tokenAddress).toLowerCase() === ('0x0000000000000000000000000000000000000000').toLowerCase()) {
  
    const avaxBalance = await web3.eth.getBalance(account);
     setBalance1((parseInt(avaxBalance)/(10**18)).toFixed(5));
    
    } 
      
      else {
    
      const currentContract = new web3.eth.Contract(polarABI as any, tokenSelected?.tokenAddress);
      currentContract.methods.decimals().call().then( function( info1 ) {
   
       currentContract.methods.balanceOf((account)).call().then( function( info ) {

        console.log("balance info", info)
         setBalance1(((info/(10**info1)).toFixed(5)));
         setAmount1(0)
         setDecimals(info1)
         setCurrentCA(tokenSelected?.tokenAddress)
         });
      
        }); 
       } 
      }
     
    
   }

  const tokenFunc2 = async (tokenName,tokenSelected) => {
     setAmount1(0)
     setAmount2(0)
    setToekn2(tokenSelected?.name);
    setToken2Object(tokenSelected)   
   
    if(account !== undefined){

      if((tokenSelected?.tokenAddress).toLowerCase() === ('0x0000000000000000000000000000000000000000').toLowerCase()) {
     
    const avaxBalance = await web3.eth.getBalance(account);
     setBalance2((parseInt(avaxBalance)/(10**18)).toFixed(5));
     setAmount2(0)
     setCurrentCA(tokenSelected?.tokenAddress)
   
    } 
     else {
      
      const currentContract = new web3.eth.Contract(polarABI as any, tokenSelected?.tokenAddress);
      currentContract.methods.decimals().call().then( function( info1 ) {
   
       currentContract.methods.balanceOf((account)).call().then( function( info ) {
         setBalance2(((info/(10**info1)).toFixed(5)));
         setAmount2(0)
         setDecimals(info1)
         setCurrentCA(tokenSelected?.tokenAddress)
         });
      
        }); 
      }
       }
    }

  useEffect(()=>{
 if(account !== undefined){
  if(token1 !== "" && (token1.toLowerCase() !== "token")){
   initialBalance()
  }
  if(token2 !== "" && (token2.toLowerCase() !== "token")){
   initialBalance2()
  }
 }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account])

  useEffect(() =>{
  setSwapHeader(true)

   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  useEffect(() =>{
  approveToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token1Object, token2Object,account, order,amount1, amount2])


    useEffect(() =>{
     if(getNetwork1 !== getNetwork2){
           if(!order){
                 networkSelect3("token1",getNetwork1)
                setBalance1('0')
           }
           else if (order){

            networkSelect3("token2",getNetwork2)
          setBalance2('0')

           }
     }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[order])
    


  const initialBalance = async () => {
    if(account !== undefined){
   console.log("balance1", token1Object?.tokenAddress)
      if((token1Object?.tokenAddress).toLowerCase() === ('0x0000000000000000000000000000000000000000').toLowerCase()) {
       
    const avaxBalance = await web3.eth.getBalance(account);
    console.log("balance2",avaxBalance)
     setBalance1((parseInt(avaxBalance)/(10**18)).toFixed(5));} 
     else {
      
      const currentContract = new web3.eth.Contract(polarABI as any, token1Object?.tokenAddress);
      currentContract.methods.decimals().call().then( function( info1 ) {
   
       currentContract.methods.balanceOf((account)).call().then( function( info ) {
        console.log("balance3",info)
         setBalance1(((info/(10**info1)).toFixed(5)));
         setCurrentCA(token1Object?.tokenAddress)
         });
      
        }); 
      }
       }
    
    
    }


    const initialBal = async (res) => {

      const initArray = []

      const resArray = res.slice(0,10)

      resArray.forEach(async (tokenObject) => {

      if(account !== undefined){
    
        if((tokenObject?.tokenAddress).toLowerCase() === ('0x0000000000000000000000000000000000000000').toLowerCase()) {
         
      const avaxBalance = await web3.eth.getBalance(account);
      const Ad = tokenObject?.tokenAddress
      const bal = parseFloat(avaxBalance)/(10**18)
      initArray.push({tokenAddress: Ad, balance: bal})
    //  token1Object["balancFloate"] =  (((avaxBalance/(10**18)).toFixed(5)));
    } 
       else {
        
        const currentContract = new web3.eth.Contract(polarABI as any, tokenObject?.tokenAddress);
        currentContract.methods.decimals().call().then( function( info1 ) {
     
         currentContract.methods.balanceOf((account)).call().then( function( info ) {
         
           const Ad = tokenObject?.tokenAddress
           const bal = (((info/(10**info1)).toFixed(5)));
           initArray.push({tokenAddress: Ad, balance: bal})
         
           });
        
          }); 
        }
      }
      setTokenBal(initArray)
      })
    }

    const notifyWarning = () => {
    
      toast.warning('Please Connect Wallet !', {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        });
    
    };

  const swapToken = async () => {
    
    gaEventTracker('swap avalanche token')
    if(account === undefined){
      notifyWarning()
      return
    }
      if(getNetwork1?.toLowerCase() === getNetwork2?.toLowerCase()){
         if(!order){

          if(getNetwork1 === "avalanche" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7") || (token1Object?.tokenAddress === "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
              console.log('enterswap2')

              if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7") {
              const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
            const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
            const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
            try{
              const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
             setTimeout(()=>{
               initialBalance()
              initialBalance2()
             },1000)
             
              setAmount1(0)
              setAmount2(0)
              notifySuccess()
              } catch(e) {
                console.log("erre",e)
               notifyError()
              }
            } else if (token1Object?.tokenAddress === "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
                  const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
            const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
            const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
            try{
              const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
             setTimeout(()=>{
               initialBalance()
              initialBalance2()
             },1000)
             
              setAmount1(0)
              setAmount2(0)
              notifySuccess()
              } catch(e) {
                console.log("erre",e)
               notifyError()
              }
            }
           

          }  else if(getNetwork1 === "bsc" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c") || (token1Object?.tokenAddress === "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
            console.log('enterswap2')

            if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c") {
            const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
          const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
          const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
          try{
            const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
           setTimeout(()=>{
             initialBalance()
            initialBalance2()
           },1000)
           
            setAmount1(0)
            setAmount2(0)
            notifySuccess()
            } catch(e) {
              console.log("erre",e)
             notifyError()
            }
          } else if (token1Object?.tokenAddress === "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
                const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
          const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
          const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
          try{
            const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
           setTimeout(()=>{
             initialBalance()
            initialBalance2()
           },1000)
           
            setAmount1(0)
            setAmount2(0)
            notifySuccess()
            } catch(e) {
              console.log("erre",e)
             notifyError()
            }
          }
         

        }
        else if(getNetwork1 === "polygon" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270") || (token1Object?.tokenAddress === "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
          console.log('enterswap2')

          if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270") {
          const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
        const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
        const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
        try{
          const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
         setTimeout(()=>{
           initialBalance()
          initialBalance2()
         },1000)
         
          setAmount1(0)
          setAmount2(0)
          notifySuccess()
          } catch(e) {
            console.log("erre",e)
           notifyError()
          }
        } else if (token1Object?.tokenAddress === "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
              const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
        const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
        const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
        try{
          const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
         setTimeout(()=>{
           initialBalance()
          initialBalance2()
         },1000)
         
          setAmount1(0)
          setAmount2(0)
          notifySuccess()
          } catch(e) {
            console.log("erre",e)
           notifyError()
          }
        }
       

      }
      else if(getNetwork1 === "ethereum" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") || (token1Object?.tokenAddress === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
        console.log('enterswap2')

        if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") {
        const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
      const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
      const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
      try{
        const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
       setTimeout(()=>{
         initialBalance()
        initialBalance2()
       },1000)
       
        setAmount1(0)
        setAmount2(0)
        notifySuccess()
        } catch(e) {
          console.log("erre",e)
         notifyError()
        }
      } else if (token1Object?.tokenAddress === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
            const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
      const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
      const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
      try{
        const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
       setTimeout(()=>{
         initialBalance()
        initialBalance2()
       },1000)
       
        setAmount1(0)
        setAmount2(0)
        notifySuccess()
        } catch(e) {
          console.log("erre",e)
         notifyError()
        }
      }
     

    }
    else if(getNetwork1 === "optimism" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x4200000000000000000000000000000000000006") || (token1Object?.tokenAddress === "0x4200000000000000000000000000000000000006" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
      console.log('enterswap2')

      if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x4200000000000000000000000000000000000006") {
      const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
    const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
    try{
      const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
     setTimeout(()=>{
       initialBalance()
      initialBalance2()
     },1000)
     
      setAmount1(0)
      setAmount2(0)
      notifySuccess()
      } catch(e) {
        console.log("erre",e)
       notifyError()
      }
    } else if (token1Object?.tokenAddress === "0x4200000000000000000000000000000000000006" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
          const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
    const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
    try{
      const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
     setTimeout(()=>{
       initialBalance()
      initialBalance2()
     },1000)
     
      setAmount1(0)
      setAmount2(0)
      notifySuccess()
      } catch(e) {
        console.log("erre",e)
       notifyError()
      }
    }
   

  }
  else if(getNetwork1 === "arbitrum" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x82af49447d8a07e3bd95bd0d56f35241523fbab1") || (token1Object?.tokenAddress === "0x82af49447d8a07e3bd95bd0d56f35241523fbab1" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
    console.log('enterswap2')

    if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x82af49447d8a07e3bd95bd0d56f35241523fbab1") {
    const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
  const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
  const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
  try{
    const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
   setTimeout(()=>{
     initialBalance()
    initialBalance2()
   },1000)
   
    setAmount1(0)
    setAmount2(0)
    notifySuccess()
    } catch(e) {
      console.log("erre",e)
     notifyError()
    }
  } else if (token1Object?.tokenAddress === "0x82af49447d8a07e3bd95bd0d56f35241523fbab1" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
        const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
  const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
  const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
  try{
    const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
   setTimeout(()=>{
     initialBalance()
    initialBalance2()
   },1000)
   
    setAmount1(0)
    setAmount2(0)
    notifySuccess()
    } catch(e) {
      console.log("erre",e)
     notifyError()
    }
  }
 

}
else if(getNetwork1 === "fantom" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83") || (token1Object?.tokenAddress === "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
  console.log('enterswap2')

  if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83") {
  const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
try{
  const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
 setTimeout(()=>{
   initialBalance()
  initialBalance2()
 },1000)
 
  setAmount1(0)
  setAmount2(0)
  notifySuccess()
  } catch(e) {
    console.log("erre",e)
   notifyError()
  }
} else if (token1Object?.tokenAddress === "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
      const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
try{
  const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
 setTimeout(()=>{
   initialBalance()
  initialBalance2()
 },1000)
 
  setAmount1(0)
  setAmount2(0)
  notifySuccess()
  } catch(e) {
    console.log("erre",e)
   notifyError()
  }
}


}

else {

          const swapContract = getContract1(getNetwork1)
        
            const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
            const am  = (Math.trunc(parseInt(responseData?.sellAmount) + parseInt((responseData?.LocalProtocolNativeFees)))).toLocaleString('fullwide', { useGrouping: false });

            console.log("enter not order am", am)
            console.log("enter not order am1", responseData?.LocalProtocolNativeFees/10**token1Object?.decimals)

            const amountFinalWithFees = am
       
              const amountOut = (responseData?.sellAmount)

             
          if((token1Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){

            console.log("enter not order findchecknativefortoken",amountFinalWithFees, responseData?.buyTokenAddress,amountOut,responseData?.TokenReceiver,responseData?.to,responseData?.data)
           try{
           const nftTxn = await swapContract.methods.swapNativeForTokens(responseData?.buyTokenAddress,amountOut,responseData?.TokenReceiver,responseData?.to,responseData?.data).send({from: account, value: amountFinalWithFees});
          setTimeout(()=>{
            initialBalance()
           initialBalance2()
          },1000)
          
           setAmount1(0)
           setAmount2(0)
           notifySuccess()
           } catch {
            notifyError()
           }
        
           }
           else if((token2Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){
            console.log("findchecktokenfornative", responseData?.sellTokenAddress,responseData?.sellAmount,responseData?.TokenReceiver,responseData?.to, responseData?.allowanceTarget, responseData?.data)
          
            try{      
            const nftTxn = await swapContract.methods.swapTokenForNative(responseData?.sellTokenAddress,responseData?.sellAmount,responseData?.allowanceTarget,responseData?.to, responseData?.TokenReceiver, responseData?.data).send({from: account, value: responseData?.LocalProtocolNativeFees});
            setTimeout(()=>{
              initialBalance()
             initialBalance2()
            },1000)
            
            notifySuccess()
             setAmount1(0)
           setAmount2(0)
            } catch {
                notifyError()
            }
        
          } 
          else {

            console.log("findchecktokenfortoken",responseData?.sellTokenAddress,  responseData?.buyTokenAddress, responseData?.sellAmount, responseData?.TokenReceiver, responseData?.to, responseData?.allowanceTarget,responseData?.data)

           
          
           try{
           const nftTxn = await swapContract.methods.swapTokenForToken(responseData?.buyTokenAddress, responseData?.sellTokenAddress, responseData?.sellAmount, responseData?.allowanceTarget, responseData?.to, responseData?.TokenReceiver, responseData?.data).send({from: account, value: responseData?.LocalProtocolNativeFees});
           setTimeout(()=>{
            initialBalance()
           initialBalance2()
          },1000)
          
            notifySuccess()
            setAmount1(0)
           setAmount2(0)
           } catch {
                notifyError()
           }
          
          }
        }
    
    }  
    else if(order){

      if(getNetwork1 === "avalanche" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7") || (token1Object?.tokenAddress === "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
        console.log('enterswap2')

        if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7") {
        const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
      const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
      const amountFinal = ((Math.trunc(amount2*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
      try{
        const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
       setTimeout(()=>{
         initialBalance()
        initialBalance2()
       },1000)
       
        setAmount1(0)
        setAmount2(0)
        notifySuccess()
        } catch(e) {
          console.log("erre",e)
         notifyError()
        }
      } else if (token1Object?.tokenAddress === "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
            const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
      const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
      const amountFinal = ((Math.trunc(amount2*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
      try{
        const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
       setTimeout(()=>{
         initialBalance()
        initialBalance2()
       },1000)
       
        setAmount1(0)
        setAmount2(0)
        notifySuccess()
        } catch(e) {
          console.log("erre",e)
         notifyError()
        }
      }
     

    }  else if(getNetwork1 === "bsc" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c") || (token1Object?.tokenAddress === "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
      console.log('enterswap2')

      if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c") {
      const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
    const amountFinal = ((Math.trunc(amount2*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
    try{
      const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
     setTimeout(()=>{
       initialBalance()
      initialBalance2()
     },1000)
     
      setAmount1(0)
      setAmount2(0)
      notifySuccess()
      } catch(e) {
        console.log("erre",e)
       notifyError()
      }
    } else if (token1Object?.tokenAddress === "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
          const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
    const amountFinal = ((Math.trunc(amount2*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
    try{
      const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
     setTimeout(()=>{
       initialBalance()
      initialBalance2()
     },1000)
     
      setAmount1(0)
      setAmount2(0)
      notifySuccess()
      } catch(e) {
        console.log("erre",e)
       notifyError()
      }
    }
   

  }
  else if(getNetwork1 === "polygon" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270") || (token1Object?.tokenAddress === "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
    console.log('enterswap2')

    if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270") {
    const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
  const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
  const amountFinal = ((Math.trunc(amount2*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
  try{
    const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
   setTimeout(()=>{
     initialBalance()
    initialBalance2()
   },1000)
   
    setAmount1(0)
    setAmount2(0)
    notifySuccess()
    } catch(e) {
      console.log("erre",e)
     notifyError()
    }
  } else if (token1Object?.tokenAddress === "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
        const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
  const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
  const amountFinal = ((Math.trunc(amount2*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
  try{
    const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
   setTimeout(()=>{
     initialBalance()
    initialBalance2()
   },1000)
   
    setAmount1(0)
    setAmount2(0)
    notifySuccess()
    } catch(e) {
      console.log("erre",e)
     notifyError()
    }
  }
 

}
else if(getNetwork1 === "ethereum" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") || (token1Object?.tokenAddress === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
  console.log('enterswap2')

  if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") {
  const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
const amountFinal = ((Math.trunc(amount2*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
try{
  const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
 setTimeout(()=>{
   initialBalance()
  initialBalance2()
 },1000)
 
  setAmount1(0)
  setAmount2(0)
  notifySuccess()
  } catch(e) {
    console.log("erre",e)
   notifyError()
  }
} else if (token1Object?.tokenAddress === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
      const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
const amountFinal = ((Math.trunc(amount2*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
try{
  const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
 setTimeout(()=>{
   initialBalance()
  initialBalance2()
 },1000)
 
  setAmount1(0)
  setAmount2(0)
  notifySuccess()
  } catch(e) {
    console.log("erre",e)
   notifyError()
  }
}


}
else if(getNetwork1 === "optimism" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x4200000000000000000000000000000000000006") || (token1Object?.tokenAddress === "0x4200000000000000000000000000000000000006" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
console.log('enterswap2')

if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x4200000000000000000000000000000000000006") {
const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
const amountFinal = ((Math.trunc(amount2*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
try{
const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
setTimeout(()=>{
 initialBalance()
initialBalance2()
},1000)

setAmount1(0)
setAmount2(0)
notifySuccess()
} catch(e) {
  console.log("erre",e)
 notifyError()
}
} else if (token1Object?.tokenAddress === "0x4200000000000000000000000000000000000006" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
    const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
const amountFinal = ((Math.trunc(amount2*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
try{
const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
setTimeout(()=>{
 initialBalance()
initialBalance2()
},1000)

setAmount1(0)
setAmount2(0)
notifySuccess()
} catch(e) {
  console.log("erre",e)
 notifyError()
}
}


}
else if(getNetwork1 === "arbitrum" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x82af49447d8a07e3bd95bd0d56f35241523fbab1") || (token1Object?.tokenAddress === "0x82af49447d8a07e3bd95bd0d56f35241523fbab1" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
console.log('enterswap2')

if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x82af49447d8a07e3bd95bd0d56f35241523fbab1") {
const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
const amountFinal = ((Math.trunc(amount2*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
try{
const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
setTimeout(()=>{
initialBalance()
initialBalance2()
},1000)

setAmount1(0)
setAmount2(0)
notifySuccess()
} catch(e) {
console.log("erre",e)
notifyError()
}
} else if (token1Object?.tokenAddress === "0x82af49447d8a07e3bd95bd0d56f35241523fbab1" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
  const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
try{
const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
setTimeout(()=>{
initialBalance()
initialBalance2()
},1000)

setAmount1(0)
setAmount2(0)
notifySuccess()
} catch(e) {
console.log("erre",e)
notifyError()
}
}


}
else if(getNetwork1 === "fantom" && ((token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83") || (token1Object?.tokenAddress === "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"))){
console.log('enterswap2')

if(token1Object?.tokenAddress === "0x0000000000000000000000000000000000000000" && token2Object?.tokenAddress === "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83") {
const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token2Object?.tokenAddress);
const amountFinal = ((Math.trunc(amount2*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
try{
const nftTxn = await wavaxContract.methods.withdraw(amountFinal).send({from: account});
setTimeout(()=>{
initialBalance()
initialBalance2()
},1000)

setAmount1(0)
setAmount2(0)
notifySuccess()
} catch(e) {
console.log("erre",e)
notifyError()
}
} else if (token1Object?.tokenAddress === "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83" && token2Object?.tokenAddress === "0x0000000000000000000000000000000000000000"){
const wavaxAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const  wavaxContract = new web3.eth.Contract(wavaxAbi as any, token1Object?.tokenAddress);
const amountFinal = ((Math.trunc(amount2*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
try{
const nftTxn = await wavaxContract.methods.deposit().send({from: account, value: amountFinal});
setTimeout(()=>{
initialBalance()
initialBalance2()
},1000)

setAmount1(0)
setAmount2(0)
notifySuccess()
} catch(e) {
console.log("erre",e)
notifyError()
}
}
}
else {
      
     
      const swapContract = getContract1(getNetwork2)
      console.log("localswapORDER", swapContract)

         const am1  = (Math.trunc(parseInt(responseData?.sellAmount) + parseInt((responseData?.LocalProtocolNativeFees)))).toLocaleString('fullwide', { useGrouping: false });


         const amountFinalWithFees = am1

        if((token2Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){
          console.log("enter nativefortoken1",responseData?.buyTokenAddress,responseData?.sellAmount,responseData?.TokenReceiver,responseData?.to,responseData?.data)

          try{
          const nftTxn = await swapContract.methods.swapNativeForTokens(responseData?.buyTokenAddress,responseData?.sellAmount,responseData?.TokenReceiver,responseData?.to,responseData?.data).send({from: account, value: amountFinalWithFees});
          notifySuccess()
          setTimeout(()=>{
            initialBalance()
           initialBalance2()
          },1000)
          
          setAmount1(0)
           setAmount2(0)
          } catch {
             notifyError()
          }

       } else if((token1Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){

          try{
        const nftTxn = await swapContract.methods.swapTokenForNative(responseData?.sellTokenAddress,responseData?.sellAmount,responseData?.allowanceTarget,responseData?.to, responseData?.TokenReceiver, responseData?.data).send({from: account, value: responseData?.LocalProtocolNativeFees});
        notifySuccess()
        
         setAmount1(0)
            setAmount2(0)
            setTimeout(()=>{
              initialBalance()
             initialBalance2()
            },1000)
            
          } catch {

                notifyError()
          }
    

       } else {

    
      try{
      const nftTxn = await swapContract.methods.swapTokenForToken(responseData?.buyTokenAddress, responseData?.sellTokenAddress, responseData?.sellAmount, responseData?.allowanceTarget, responseData?.to, responseData?.TokenReceiver, responseData?.data).send({from: account, value: responseData?.LocalProtocolNativeFees});
      notifySuccess()
      setTimeout(()=>{
        initialBalance()
       initialBalance2()
      },1000)
      
      setAmount1(0)
      setAmount2(0)
      } catch {
         notifyError()
      }
    }}
    }
      
    } else {


      if(!order){

        console.log("enterr not order")

        const swapContract = getContract1(getNetwork1)
        console.log("crossswapNOTORDER", swapContract)

          const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
          const am  = (Math.trunc(parseInt(responseData?.sellAmount) + parseInt((responseData?.LocalProtocolNativeFees)))).toLocaleString('fullwide', { useGrouping: false });

          console.log("enter not order am", am)
          console.log("enter not order am1", responseData?.LocalProtocolNativeFees/10**token1Object?.decimals)

          const amountFinalWithFees = am
     
            const amountOut = (responseData?.sellAmount)

        if(getNetwork1 === "avalanche" || getNetwork1 === "polygon" || getNetwork1 === "bsc" || getNetwork1 === "ethereum") {
         console.log("enterref")
          if((token1Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase() && (token2Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){

          
            
            // eslint-disable-next-line dot-notation 
           const am2  = (Math.trunc(parseInt(responseData?.cross_chain_gas_estimate) + parseInt((responseData["srcSwapData"]["0xswapData"]["sellAmount"])))).toLocaleString('fullwide', { useGrouping: false });
           console.log( "entercrossnativetonative",responseData?.dest_stargate_chain_id,(responseData?.srcSwapData?.srcSwapData),(responseData?.destSwapData?.destSwapData),responseData?.stargateSwapData?.stargateData, am2,responseData?.cross_chain_gas_estimate)
           const referral1 = referral === null ? "0x0000000000000000000000000000000000000000" : referral
           console.log("enterref", referral)
          try{
          const nftTxn = await swapContract.methods.sendCrossSwapNativeForToken(responseData?.dest_stargate_chain_id, referral1, responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData).send({from: account, value: am2});
          setTimeout(()=>{
           initialBalance()
          initialBalance2()
         },1000)
         
          setAmount1(0)
          setAmount2(0)
          notifySuccess()
          } catch(e) {
           console.log("errorcross1",e)
           notifyError()
          }
       
          }
          else if((token1Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){
            // eslint-disable-next-line dot-notation 
           const am2  = (Math.trunc(parseInt(responseData?.cross_chain_gas_estimate) + parseInt((responseData["srcSwapData"]["0xswapData"]["sellAmount"])))).toLocaleString('fullwide', { useGrouping: false });
           const referral1 = referral === null ? "0x0000000000000000000000000000000000000000" : referral
           try{      
           const nftTxn = await swapContract.methods.sendCrossSwapNativeForToken(responseData?.dest_stargate_chain_id,referral1, responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData).send({from: account, value: am2});
           setTimeout(()=>{
             initialBalance()
            initialBalance2()
           },1000)
           
           notifySuccess()
            setAmount1(0)
          setAmount2(0)
           } catch {
               notifyError()
           }
       
         } 
         else {
         console.log("crosstokentoken",responseData?.dest_stargate_chain_id,responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData)
         const referral1 = referral === null ? "0x0000000000000000000000000000000000000000" : referral
          try{
          const nftTxn = await swapContract.methods.sendCrossSwapTokenForToken(responseData?.dest_stargate_chain_id,referral1, responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData).send({from: account, value: responseData?.cross_chain_gas_estimate});
          setTimeout(()=>{
           initialBalance()
          initialBalance2()
         },1000)
         
           notifySuccess()
           setAmount1(0)
          setAmount2(0)
          } catch(e) {
               console.log("error",e)
               notifyError()
          }
         
         }
        }

        else {

           
        if((token1Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase() && (token2Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){

          
            
           // eslint-disable-next-line dot-notation 
          const am2  = (Math.trunc(parseInt(responseData?.cross_chain_gas_estimate) + parseInt((responseData["srcSwapData"]["0xswapData"]["sellAmount"])))).toLocaleString('fullwide', { useGrouping: false });
          console.log( "entercrossnativetonative",responseData?.dest_stargate_chain_id,(responseData?.srcSwapData?.srcSwapData),(responseData?.destSwapData?.destSwapData),responseData?.stargateSwapData?.stargateData, am2,responseData?.cross_chain_gas_estimate)
      
         try{
         const nftTxn = await swapContract.methods.sendCrossSwapNativeForToken(responseData?.dest_stargate_chain_id, responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData).send({from: account, value: am2});
         setTimeout(()=>{
          initialBalance()
         initialBalance2()
        },1000)
        
         setAmount1(0)
         setAmount2(0)
         notifySuccess()
         } catch(e) {
          console.log("errorcross",e)
          notifyError()
         }
      
         }
         else if((token1Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){
           // eslint-disable-next-line dot-notation 
          const am2  = (Math.trunc(parseInt(responseData?.cross_chain_gas_estimate) + parseInt((responseData["srcSwapData"]["0xswapData"]["sellAmount"])))).toLocaleString('fullwide', { useGrouping: false });
          const referral1 = referral === null ? 0 : referral
          try{      
          const nftTxn = await swapContract.methods.sendCrossSwapNativeForToken(responseData?.dest_stargate_chain_id, responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData).send({from: account, value: am2});
          setTimeout(()=>{
            initialBalance()
           initialBalance2()
          },1000)
          
          notifySuccess()
           setAmount1(0)
         setAmount2(0)
          } catch {
              notifyError()
          }
      
        } 
        else {
        console.log("crosstokentoken",responseData?.dest_stargate_chain_id,responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData)
        const referral1 = referral === null ? 0 : referral
        try{
         const nftTxn = await swapContract.methods.sendCrossSwapTokenForToken(responseData?.dest_stargate_chain_id, responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData).send({from: account, value: responseData?.cross_chain_gas_estimate});
         setTimeout(()=>{
          initialBalance()
         initialBalance2()
        },1000)
        
          notifySuccess()
          setAmount1(0)
         setAmount2(0)
         } catch(e) {
              console.log("error",e)
              notifyError()
         }
        
        }
      }
  
  }  
  else if(order){

   
    const swapContract = getContract1(getNetwork2)
    console.log("crossswapORDER", swapContract)

       const am1  = (Math.trunc(parseInt(responseData?.sellAmount) + parseInt((responseData?.LocalProtocolNativeFees)))).toLocaleString('fullwide', { useGrouping: false });


       const amountFinalWithFees = am1

       if(getNetwork2 === "avalanche" || getNetwork2 === "polygon" || getNetwork2 === "bsc" || getNetwork2 === "ethereum"){
        console.log("enterreforder")
        if((token2Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase() && (token1Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){
          // eslint-disable-next-line dot-notation 
         const am2  = (Math.trunc(parseInt(responseData?.cross_chain_gas_estimate) + parseInt((responseData["srcSwapData"]["0xswapData"]["sellAmount"])))).toLocaleString('fullwide', { useGrouping: false });
         console.log( "entercrossnativetonative",responseData?.dest_stargate_chain_id,(responseData?.srcSwapData?.srcSwapData),(responseData?.destSwapData?.destSwapData),responseData?.stargateSwapData?.stargateData, am2,responseData?.cross_chain_gas_estimate)
         const referral1 = referral === null ? "0x0000000000000000000000000000000000000000" : referral
        try{
        const nftTxn = await swapContract.methods.sendCrossSwapNativeForToken(responseData?.dest_stargate_chain_id,referral1, responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData).send({from: account, value: am2});
        setTimeout(()=>{
         initialBalance()
        initialBalance2()
       },1000)
       
        setAmount1(0)
        setAmount2(0)
        notifySuccess()
        } catch(e) {
         console.log("errorcross",e)
         notifyError()
        }
      } else if((token2Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){
 
        // eslint-disable-next-line dot-notation 
       const am2  = (Math.trunc(parseInt(responseData?.cross_chain_gas_estimate) + parseInt((responseData["srcSwapData"]["0xswapData"]["sellAmount"])))).toLocaleString('fullwide', { useGrouping: false });
       const referral1 = referral === null ? "0x0000000000000000000000000000000000000000" : referral
       try{      
       const nftTxn = await swapContract.methods.sendCrossSwapNativeForToken(responseData?.dest_stargate_chain_id,referral1, responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData).send({from: account, value: am2});
       setTimeout(()=>{
         initialBalance()
        initialBalance2()
       },1000)
       
       notifySuccess()
        setAmount1(0)
      setAmount2(0)
       } catch {
           notifyError()
       }
   
 
      } else {
        const referral1 = referral === null ? "0x0000000000000000000000000000000000000000" : referral
       try{
         const nftTxn = await swapContract.methods.sendCrossSwapTokenForToken(responseData?.dest_stargate_chain_id,referral1, responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData).send({from: account, value: responseData?.cross_chain_gas_estimate});
         setTimeout(()=>{
           initialBalance()
          initialBalance2()
         },1000)
         
          notifySuccess()
          setAmount1(0)
         setAmount2(0)
         } catch {
              notifyError()
         }
   }


       }
       else {

      if((token2Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase() && (token1Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){
         // eslint-disable-next-line dot-notation 
        const am2  = (Math.trunc(parseInt(responseData?.cross_chain_gas_estimate) + parseInt((responseData["srcSwapData"]["0xswapData"]["sellAmount"])))).toLocaleString('fullwide', { useGrouping: false });
        console.log( "entercrossnativetonative",responseData?.dest_stargate_chain_id,(responseData?.srcSwapData?.srcSwapData),(responseData?.destSwapData?.destSwapData),responseData?.stargateSwapData?.stargateData, am2,responseData?.cross_chain_gas_estimate)

       try{
       const nftTxn = await swapContract.methods.sendCrossSwapNativeForToken(responseData?.dest_stargate_chain_id,responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData).send({from: account, value: am2});
       setTimeout(()=>{
        initialBalance()
       initialBalance2()
      },1000)
      
       setAmount1(0)
       setAmount2(0)
       notifySuccess()
       } catch(e) {
        console.log("errorcross",e)
        notifyError()
       }
     } else if((token2Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){

       // eslint-disable-next-line dot-notation 
      const am2  = (Math.trunc(parseInt(responseData?.cross_chain_gas_estimate) + parseInt((responseData["srcSwapData"]["0xswapData"]["sellAmount"])))).toLocaleString('fullwide', { useGrouping: false });
        
      try{      
      const nftTxn = await swapContract.methods.sendCrossSwapNativeForToken(responseData?.dest_stargate_chain_id,responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData).send({from: account, value: am2});
      setTimeout(()=>{
        initialBalance()
       initialBalance2()
      },1000)
      
      notifySuccess()
       setAmount1(0)
     setAmount2(0)
      } catch {
          notifyError()
      }
  

     } else {

      try{
        const nftTxn = await swapContract.methods.sendCrossSwapTokenForToken(responseData?.dest_stargate_chain_id,responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData).send({from: account, value: responseData?.cross_chain_gas_estimate});
        setTimeout(()=>{
          initialBalance()
         initialBalance2()
        },1000)
        
         notifySuccess()
         setAmount1(0)
        setAmount2(0)
        } catch {
             notifyError()
        }
  } }
    }
  }
  }

    const  getContract =  (network) => {

      console.log("network",network)

        if(network?.toLowerCase() === "bsc"){
          return swapContractAddressBsc
        } 
         // eslint-disable-next-line
        else if (network?.toLowerCase() === "avalanche"){
          return swapContractAddressAvax
        } 
        else if (network?.toLowerCase() === "polygon"){
          return swapContractAddressPoly
        }
        else if (network?.toLowerCase() === "fantom"){
          return swapContractAddressFantom
        }
        else if (network?.toLowerCase() === "arbitrum"){
          return swapContractAddressArbitrum
        }
        else if (network?.toLowerCase() === "arbitrum"){
          return swapContractAddressOptimism
        }
        else if (network?.toLowerCase() === "ethereum"){
          return swapContractAddressEth
        }
        return ''
    }


    const  getContract1 =  (network) => {


      if(network?.toLowerCase() === "bsc"){
        return swapContractBinance
      } 
       // eslint-disable-next-line no-else-return
      else if (network?.toLowerCase() === "avalanche"){
        return swapContractAvalanche
      }
      else if (network?.toLowerCase() === "polygon"){
        return swapContractPolygon
      }
      else if (network?.toLowerCase() === "fantom"){
        return swapContractFantom
      }
      else if (network?.toLowerCase() === "arbitrum"){
        return swapContractArbitrum
      }
      else if (network?.toLowerCase() === "optimism"){
        return swapContractOptimism
      } else if(network?.toLowerCase() === "ethereum"){
      return swapContractEth
      }

      return swapContractAvalanche
  }

  const  approveToken = async () => {
    if(account === undefined){
      
      return
    }
         if(!order && token1 !== ""){

          const swapContractAddress = getContract(getNetwork1)

          if((token1Object?.tokenAddress).toLowerCase() === ("0x0000000000000000000000000000000000000000").toLowerCase()){

            setTokenApproval(true)
            
          } else {

            let amountFinal = ""

            const currentContract = new web3.eth.Contract(polarABI as any, token1Object?.tokenAddress);
          
           await currentContract.methods.decimals().call().then( function( info1 ) {
            
             amountFinal = Math.trunc(amount1*(10**info1)).toLocaleString('fullwide', { useGrouping: false });
           
             }); 

           await currentContract.methods.allowance(account, swapContractAddress).call().then( async function( info ) {

            console.log('currentcontract!order',info, amountFinal)
            
            if(parseInt(info) <= parseInt(amountFinal)){
              setTokenApproval(false)
            }
            else {
              setTokenApproval(true)
              // approveSound.play()
            }
             
          })
       }
      }
       else if(order && token2 !== ""){

        const swapContractAddress = getContract(getNetwork2)


        if((token2Object?.tokenAddress).toLowerCase() === ("0x0000000000000000000000000000000000000000").toLowerCase()){

          setTokenApproval(true)
        } else {

          let amountFinal = ""

          const currentContract = new web3.eth.Contract(polarABI as any, token2Object?.tokenAddress);
        
          await currentContract.methods.decimals().call().then( function( info1 ) {
      
           amountFinal = Math.trunc(amount2*(10**info1)).toLocaleString('fullwide', { useGrouping: false });
           }); 

         await currentContract.methods.allowance(account, swapContractAddress).call().then( async function( info ) {

          console.log('currentcontractorder',info,amount2)
       
          if(parseInt(info) <= parseInt(amountFinal)){
            setTokenApproval(false)
          }
          else {
            setTokenApproval(true)
          }
        })
}
       }
      }


      const  getTokenApproved = async () => {
  
        if(account === undefined){
          notifyWarning()
          return
        }
             if(!order){
              const swapContractAddress = getContract(getNetwork1)
              console.log("swapcontractaddress",swapContractAddress)
    
                let amountFinal = ""
                let nftTxn = ""
    
                const currentContract = new web3.eth.Contract(fantomAbi as any, token1Object?.tokenAddress);

                const gasprice1 = await web3.eth.getGasPrice();
                const gasprice = Math.round(parseFloat(gasprice1) * 1.2); // to speed up 1.2 times..
             
               // const buyItem = currentContract.methods.approve(swapContractAddress, approvalAmount)
             
            
              
             const amountBool =  await currentContract.methods.decimals().call().then( function( info1 ) {
            
                 amountFinal = Math.trunc(amount1*(10**info1)).toLocaleString('fullwide', { useGrouping: false });
                 console.log('amountfinal#',amountFinal, parseFloat(amountFinal), parseFloat(amountFinal) <= 0)
                 if(parseFloat(amountFinal) <= 0){
                  
                  return false
                 } 
                 // eslint-disable-next-line no-else-return
                 else {
                  return true 
                 }
              
                 }); 
                 const buyItem = currentContract.methods.approve(swapContractAddress, amountFinal)
                 let gasEstimate = await buyItem.estimateGas({ from: account })
                 gasEstimate = Math.round(gasEstimate * 1.2); 
               
                 console.log('amountbool',amountBool, amountFinal)
                 if(amountBool === false){
                  alert('Please enter an amount for approval !')
                  return
                 }
    
               await currentContract.methods.allowance(account, swapContractAddress).call().then( async function( info ) {
            
                if(parseInt(info) <= parseInt(amountFinal)){
                  setLoading(true)
                  try{
                    // nftTxn = await currentContract.methods.approve(swapContractAddress, approvalAmount).send({from: account});
                   nftTxn = await buyItem
                    .send({
                      from: account,
                      gas: web3.utils.toHex(gasEstimate), 
                      gasPrice:  web3.utils.toHex(gasprice),
                    })
                    setLoading(false)
                  }
                  catch(e){
                  alert("Error in getting approval,please try again")
                  setLoading(false)
                  }
                  if(nftTxn){
                    setTokenApproval(true)
                    approveSound.volume = 0.3
                    approveSound.play()
                   }
              }
            })
           }
           else if(order){
            const swapContractAddress = getContract(getNetwork2)

              let amountFinal = ""
              let nftTxn = ""
    
              const currentContract = new web3.eth.Contract(polarABI as any, token2Object?.tokenAddress);

              const gasprice1 = await web3.eth.getGasPrice();
              const gasprice = Math.round(parseFloat(gasprice1) * 1.2); // to speed up 1.2 times..
            
            const amountBool1 = await currentContract.methods.decimals().call().then( function( info1 ) {
          
               amountFinal = Math.trunc(amount2*(10**info1)).toLocaleString('fullwide', { useGrouping: false });
               if(parseFloat(amountFinal) <= 0){
                  
                return false
               } 
               // eslint-disable-next-line no-else-return
               else {
                return true 
               }
               }); 

               const buyItem = currentContract.methods.approve(swapContractAddress, amountFinal)
               let gasEstimate = await buyItem.estimateGas({ from: account })
               gasEstimate = Math.round(gasEstimate * 1.2); 
             
               if(amountBool1 === false){
                alert('Please enter an amount for approval !')
                return
               }
    
             await currentContract.methods.allowance(account, swapContractAddress).call().then( async function( info ) {
          
              if(parseInt(info) <= parseInt(amountFinal)){
                setLoading(true)
                try{
                
                  // nftTxn = await currentContract.methods.approve(swapContractAddress, approvalAmount).send({from: account});
                  nftTxn = await buyItem
                  .send({
                    from: account,
                    gas: web3.utils.toHex(gasEstimate), 
                    gasPrice:  web3.utils.toHex(gasprice),
                  })
                  setLoading(false)
                }
                catch(e){
                alert("Error in getting approval,please try again")
                setLoading(false)
                }
                if(nftTxn){
                       setTokenApproval(true)
                       approveSound.volume = 0.3
                       approveSound.play()
                       // notifyApprove()
              }
               
                 
              }
             
            })
    }
           }
          

  const initialBalance2 = async () => {
    if(account !== undefined){
      console.log("balance4", token2Object?.tokenAddress)
      if((token2Object?.tokenAddress).toLowerCase() === ('0x0000000000000000000000000000000000000000').toLowerCase()) {
  
    const avaxBalance = await web3.eth.getBalance(account);
    console.log("balance5", avaxBalance)
     setBalance2((parseInt(avaxBalance)/(10**18)).toFixed(5));} 
     else {
      
      const currentContract = new web3.eth.Contract(polarABI as any, token2Object?.tokenAddress);
      currentContract.methods.decimals().call().then( function( info1 ) {
   
       currentContract.methods.balanceOf((account)).call().then( function( info ) {
        console.log("balance6", info)
         setBalance2(((info/(10**info1)).toFixed(5)));
         setCurrentCA(token2Object?.tokenAddress)
         });
      
        }); 
      }
       }
  } 
 
  const maxBalance2 = async (token, tokenNumber) => {

    if(tokenNumber === 1){
    const currentContract = new web3.eth.Contract(polarABI as any, token1Object?.tokenAddress);
      currentContract.methods.decimals().call().then( function( info1 ) {
   
       currentContract.methods.balanceOf((account)).call().then( function( info ) {
        setAmount1(parseFloat((info/(10**info1)-((0.00001*(info/(10**info1)))/100)).toFixed(4)) );
        maxBalanceSwap1((info/(10**info1)-((0.00001*(info/(10**info1)))/100)))
         });

        })
      } else {
        const currentContract1 = new web3.eth.Contract(polarABI as any, token2Object?.tokenAddress);
        currentContract1.methods.decimals().call().then( function( info1 ) {
     
         currentContract1.methods.balanceOf((account)).call().then( function( info ) {
          setAmount2(parseFloat((info/(10**info1)-((0.00001*(info/(10**info1)))/100)).toFixed(4)));
          maxBalanceSwap2((info/(10**info1)-((0.00001*(info/(10**info1)))/100)))
           });
  
          })

      }
     
    } 


  
  let timeout = null
  const maxBalanceSwap1 = async (amountMax2) => {

    console.log("checkamount11",amountMax2)
    clearTimeout(timeout);

    // Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(async function () {
       // console.log('Input Value:', textInput.value);
      
   

    const amountMax = parseFloat(amountMax2)
  
    // eslint-disable-next-line use-isnan
   if(!order && amountMax > 0){
    setSwapLoading(true)

    await axios.get('https://1f8vxhjggh.execute-api.us-east-1.amazonaws.com/getSwapQuote',{
      params: {
      src_chain_name: getNetwork1,
      dest_chain_name: getNetwork2,
      src_sell_token: (token1Object?.name).toUpperCase(),
      dest_buy_token: (token2Object?.name).toUpperCase(),
      src_sell_amount:  parseInt(((amountMax)*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })),
      token_receiver: account, 
      src_slippage: srcSlippage,
      dest_slippage: dstSlippage
      
      }
      } ).then(function (response) {
      // handle success
      console.log("Response", response?.data?.swap_data);
     
    setSwapLoading(false)
      if(getNetwork1?.toLowerCase() === getNetwork2?.toLowerCase()){
        const responseObject = response?.data?.swap_data
        setAmount2(parseFloat(((responseObject?.buyAmount)/10**(token2Object?.decimals))?.toFixed(5)))
        setResponseData(response?.data?.swap_data)

      } else {
        const responseObject = response?.data
        if(((token2Object?.tokenAddress).toLowerCase() === ('0x0000000000000000000000000000000000000000').toLowerCase()) && (token1Object?.tokenAddress).toLowerCase() === ('0x0000000000000000000000000000000000000000').toLowerCase()){

         // eslint-disable-next-line dot-notation 
        setAmount2(parseFloat(((responseObject["destSwapData"]["0xDestswapData"]["buyAmount"])/10**(token2Object?.decimals)).toFixed(5)))
        } else {
           // eslint-disable-next-line dot-notation 
          setAmount2(parseFloat(((responseObject["destSwapData"]["0xDestswapData"]["buyAmount"])/10**(token2Object?.decimals)).toFixed(5)))
        }
        setResponseData(response?.data)
      }
        
     
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return ''
    })
  }
}, 1000);
  

  }

  const maxBalanceSwap2 = async (amountMax) => {
  
      const amountMax2 = parseFloat(amountMax)

       // eslint-disable-next-line use-isnan
   if(order && amountMax2 > 0){
    setSwapLoading(true)
    await axios.get('https://1f8vxhjggh.execute-api.us-east-1.amazonaws.com/getSwapQuote',{
      params: {
      src_chain_name: getNetwork2,
      dest_chain_name: getNetwork1,
      src_sell_token: (token2Object?.name).toUpperCase(),
      dest_buy_token: (token1Object?.name).toUpperCase(),
      src_sell_amount:  parseInt(((amountMax2)*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })),
      token_receiver: account, 
      src_slippage: srcSlippage,
      dest_slippage: dstSlippage
      
      }
      } ).then(function (response) {
      // handle success
      setSwapLoading(false)
      const responseObject = response?.data?.swap_data
      
      if(getNetwork1?.toLowerCase() === getNetwork2?.toLowerCase()){
        setAmount1(parseFloat(((responseObject?.buyAmount)/10**(token1Object?.decimals))?.toFixed(5)))
        setResponseData(response?.data?.swap_data)
      } else {
        
        const responseObject1 = response?.data
        if(((token2Object?.tokenAddress).toLowerCase() === ('0x0000000000000000000000000000000000000000').toLowerCase()) && (token1Object?.tokenAddress).toLowerCase() === ('0x0000000000000000000000000000000000000000').toLowerCase()){
         // eslint-disable-next-line dot-notation 
        setAmount1(parseFloat(((responseObject1["destSwapData"]["0xDestswapData"]["buyAmount"])/10**(token1Object?.decimals)).toFixed(5)))
        } else {
           // eslint-disable-next-line dot-notation 
          setAmount1(parseFloat(((responseObject1["destSwapData"]["0xDestswapData"]["buyAmount"])/10**(token1Object?.decimals)).toFixed(5)))
        }
        setResponseData(response?.data)
      }
       
      
       
     
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return ''
    })
  }
  
  }

  
  const amountChange2 = (e) => {
    setAmount2(e.target.value);
    maxBalanceSwap2(e.target.value)
  }

  const amountChange1 = async (e) => {

    
    setAmount1(e.target.value);
    maxBalanceSwap1(e.target.value)

   }

  const getMaxBalance = async (token, tokenNumber) => {

    if(token==='0x0000000000000000000000000000000000000000'){
      if(account!== undefined){
        const avaxBalance = await web3.eth.getBalance(account);
        const intBalance = (parseInt(avaxBalance)/(10**18))

        if(tokenNumber === 1){
        setAmount1(Math.floor((intBalance-((0.1*(intBalance))/100))*10000)/10000)
        maxBalanceSwap1(Math.floor((intBalance-((0.1*(intBalance))/100))*10000)/10000)
        }
        else {
          setAmount2(Math.floor((intBalance-((0.1*(intBalance))/100))*10000)/10000) 
          maxBalanceSwap2(Math.floor((intBalance-((0.1*(intBalance))/100))*10000)/10000)
        }
       
        }
    } else {
        maxBalance2(token, tokenNumber)
    }
        
  }

const networkSelect1 = async (tokenName,selectNetwork) =>{

  if(tokenName === "token1"){
    setGetNetwork1(selectNetwork?.name)
  } else if (tokenName==="token2") {
    setGetNetwork2(selectNetwork?.name)
  }

  if((order && tokenName === "token2") || (!order && tokenName === "token1")){
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



}

console.log('currentchain1',currentChain)


const networkSelect3 = async (tokenName,selectNetwork) =>{
 
 
  if((order && tokenName === "token2") || (!order && tokenName === "token1")){
    if(selectNetwork === "bsc"){
      await setupNetwork1(56)
      if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

        initialBalance()
        }
        if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
      
          initialBalance2()
          }
        
       
    } else if (selectNetwork === "avalanche"){
      await setupNetwork2()
      if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

        initialBalance()
        }
        if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
      
          initialBalance2()
          }
        
       
    } else if (selectNetwork === "polygon"){
      await setupNetwork1(137)
      if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

        initialBalance()
        }
        if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
      
          initialBalance2()
          }
        
       
    }
    else if (selectNetwork === "ethereum"){
      await setupNetwork1(1)
      if(currentChain !== 1){
      notifyEth()
      }
      if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

        initialBalance()
        }
        if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
      
          initialBalance2()
          }
        
       
    }
    else if (selectNetwork === "fantom"){
      await setupNetwork1(250)
      if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

        initialBalance()
        }
        if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
      
          initialBalance2()
          }
        
       
    }
    else if (selectNetwork === "arbitrum"){
      await setupNetwork1(42161)
      if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

        initialBalance()
        }
        if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
      
          initialBalance2()
          }
        
       
    }
    else if (selectNetwork === "optimism"){
      await setupNetwork1(10)
      if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

        initialBalance()
        }
        if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
      
          initialBalance2()
          }
        
       
    }
    
  }



}

const networkSelect2 = async (selectNetwork) => {
    
   
    
      if(selectNetwork === "bsc"){
        await setupNetwork1(56)
        if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

          initialBalance()
          }
          if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
        
            initialBalance2()
            }
          
         
      } else if (selectNetwork === "avalanche"){
        await setupNetwork2()
        if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

          initialBalance()
          }
          if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
        
            initialBalance2()
            }
          
         
      } else if (selectNetwork === "polygon"){
        await setupNetwork1(137)
        if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

          initialBalance()
          }
          if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
        
            initialBalance2()
            }
          
         
      }
      else if (selectNetwork === "ethereum"){
        await setupNetwork1(1)
        if(currentChain !== 1){
       notifyEth()
        }
        if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

          initialBalance()
          }
          if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
        
            initialBalance2()
            }
          
         
      }
      else if (selectNetwork === "fantom"){
        await setupNetwork1(250)
        if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

          initialBalance()
          }
          if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
        
            initialBalance2()
            }
          
         
      }
      else if (selectNetwork === "arbitrum"){
        await setupNetwork1(42161)
        if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

          initialBalance()
          }
          if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
        
            initialBalance2()
            }
          
         
      }
      else if (selectNetwork === "optimism"){
        await setupNetwork1(10)
        if(token1.toLowerCase() !== ("Token").toLowerCase() && (token1 !== "")){

          initialBalance()
          }
          if(token2.toLowerCase() !== ("Token").toLowerCase() && (token2 !== "")){
        
            initialBalance2()
            }
          
         
      }}


const calculateP = async () => {




  if(!order){

    await axios.get('https://1f8vxhjggh.execute-api.us-east-1.amazonaws.com/getSwapQuote',{
      params: {
      src_chain_name: getNetwork1,
      dest_chain_name: getNetwork2,
      src_sell_token: (token1Object?.name).toUpperCase(),
      dest_buy_token: (token2Object?.name).toUpperCase(),
      src_sell_amount:  ((1)*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false }),
      token_receiver: account, 
      src_slippage: srcSlippage,
      dest_slippage: dstSlippage
      
      }
      } ).then(function (response) {
      // handle success
      console.log("Response", response?.data?.swap_data);
     
    
      if(getNetwork1?.toLowerCase() === getNetwork2?.toLowerCase()){
        const responseObject = response?.data?.swap_data
        setShowPrice((responseObject?.buyAmount)/10**(token2Object?.decimals))
       // setResponseData(response?.data?.swap_data)

      } else {
        const responseObject = response?.data
        if(((token2Object?.tokenAddress).toLowerCase() === ('0x0000000000000000000000000000000000000000').toLowerCase()) && (token1Object?.tokenAddress).toLowerCase() === ('0x0000000000000000000000000000000000000000').toLowerCase()){

         // eslint-disable-next-line dot-notation 
        setShowPrice((responseObject["destSwapData"]["0xDestswapData"]["buyAmount"])/10**(token2Object?.decimals))
        } else {
           // eslint-disable-next-line dot-notation 
          setShowPrice((responseObject["destSwapData"]["0xDestswapData"]["buyAmount"])/10**(token2Object?.decimals))
        }
       // setResponseData(response?.data)
      }
        
     
       
     
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return ''
    })
  }
  if(order){
    await axios.get('https://1f8vxhjggh.execute-api.us-east-1.amazonaws.com/getSwapQuote',{
      params: {
      src_chain_name: getNetwork2,
      dest_chain_name: getNetwork1,
      src_sell_token: (token2Object?.name).toUpperCase(),
      dest_buy_token: (token1Object?.name).toUpperCase(),
      src_sell_amount:  ((1)*(10**token2Object?.decimals)).toLocaleString('fullwide', { useGrouping: false }),
      token_receiver: account, 
      src_slippage: srcSlippage,
      dest_slippage: dstSlippage
      
      }
      } ).then(function (response) {
      // handle success
      const responseObject = response?.data?.swap_data
      
      if(getNetwork1?.toLowerCase() === getNetwork2?.toLowerCase()){
        setShowPrice((responseObject?.buyAmount)/10**(token1Object?.decimals))
       // setResponseData(response?.data?.swap_data)
      } else {
        
        const responseObject1 = response?.data
        if(((token2Object?.tokenAddress).toLowerCase() === ('0x0000000000000000000000000000000000000000').toLowerCase()) && (token1Object?.tokenAddress).toLowerCase() === ('0x0000000000000000000000000000000000000000').toLowerCase()){
         // eslint-disable-next-line dot-notation 
        setShowPrice((responseObject1["destSwapData"]["0xDestswapData"]["buyAmount"])/10**(token1Object?.decimals))
        } else {
           // eslint-disable-next-line dot-notation 
          setShowPrice((responseObject1["destSwapData"]["0xDestswapData"]["buyAmount"])/10**(token1Object?.decimals))
        }
       // setResponseData(response?.data)
      }
       
      
       
     
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return ''
    })
  }
  


}

useEffect(()=>{

  if(token1 !== "" && token2!== ""){

     calculateP()

  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
},[token1,token2, order])

const [onPresentNetworkModal] =  useModal(<CoinsModal tokenFunc2={networkSelect1} ListData={swapType === 2 ? networkList : networkListCross} tokenName="token1" setInitToken={setInitToken} initToken={initToken} tokenRefresh={tokenRefresh} setChain="avax" /> )
const [onPresentNetworkModal1] = useModal(<CoinsModal tokenFunc2={networkSelect1} ListData={swapType === 2 ? networkList : networkListCross} tokenName="token2" setInitToken={setInitToken} initToken={initToken} tokenRefresh={tokenRefresh} setChain="avax" />)

  
  const [onPresentSettingsModal1] = useModal(<CoinsSelectModal ListData={(token1List)?.slice(0,7)} tokenName="token1" tokenFunc2={tokenFunc1} setChain={getNetwork1} setChain2={getNetwork2} account={account} balList={tokenBal} order={order} usdcToken={usdcToken} usdtToken={usdtToken}/>)
  const [onPresentSettingsModal2] = useModal(<CoinsSelectModal  ListData={(token2List)?.slice(0,7)} tokenName="token2"  tokenFunc2={tokenFunc2} setChain={getNetwork2} setChain2={getNetwork1} account={account} balList={tokenBal} order={order} usdcToken={usdc1Token} usdtToken={usdt1Token}/>)


  return (
    <>    
    <ToastContainer/>
    <BiggerCards>
      <AppBody>
      {/* <Labelo labelSize="14px">Omni DEX </Labelo> */}
        <AppHeader title='Pool' subtitle="" setSwapType={setSwapType} setSlippage={setSlippage} swapType={swapType} />                 
        <StyledCardBody>          
          {/* -----------------  Input Token Amount & Select Token Type _ Tag1 ---------------------- */}
          <InputStyle style={{ order: `${order ? 3 : 1}` }} className="input33">
          <div  className='d-flex flex-row justify-content-start'>
          <div className="inputStyle" >
          <div className='d-flex flex-row justify-content-between align-items-center'>
          <BalanceBody>Token 1</BalanceBody>  
            </div>
            <div className='d-flex flex-row justify-content-between align-items-center'>
            <div className="buttonIn">
            <input style={{backgroundColor:"#E6E9EE", color: "black"}} placeholder="0" className="input1" type="number" id="enter" onChange={amountChange1} value={amount1}/>
           {!order && (
          <button className="button1" id="clear" type="button" onClick={() => {getMaxBalance(token1Object?.tokenAddress,1)}}>MAX</button>)}
       
       </div>           
            </div>
          </div>
          <div style={{textAlign: "right", justifyItems: "right", alignSelf:"right", position: "relative",marginLeft: "10px", overflow:"hidden"}}>
          {((getNetwork1 === getNetwork2)|| ((getNetwork1 !== getNetwork2) && !order)) && (
              <BalanceBody>Bal: {balance1}</BalanceBody>  
              )}      
           <div onClick={onPresentSettingsModal1}>
              {getTokenImage(token1Object)}      
              </div>    
          </div>
            </div>
          
          </InputStyle>


          {/* -----------------  Exchange Token1 and Token2 _ Button ---------------------- */}
          <StyledButton2 onClick={() => {
             setOrder(!order)
             setAmount1(0)
             setAmount2(0)
            }  } style ={{marginBottom: "5px"}}>
            <img src='/images/home/img_plus.svg' width='40px' alt='tokenSwitch' />
          </StyledButton2>

          {/* -----------------  Input Token Amount & Select Token Type _ Tag2 ---------------------- */}
          <InputStyle style={{ order: `${order ? 1 : 3}` }} className="input33">
          <div  className='d-flex flex-row justify-content-start' >
          <div className="inputStyle">
          <div className='d-flex flex-row justify-content-between align-items-center'>
          <BalanceBody>Token 2</BalanceBody>  
            </div>
            <div className='d-flex flex-row justify-content-between align-items-center'>
            <div className="buttonIn">
            <input style={{backgroundColor:"#E6E9EE", color: "black"}} placeholder="0" className="input1" type="number" id="enter2" onChange={amountChange2} value={amount2} />
            {order && (
          <button className="button1" id="clear" type="button" onClick={() => {getMaxBalance(token2Object?.tokenAddress,2)}}>MAX</button>)}
         
       </div>           
            </div>
          </div>
          <div style={{textAlign: "right", justifyItems: "right", alignSelf:"right", position: "relative",marginLeft: "10px", overflow: "hidden"}}>
          {((getNetwork1 === getNetwork2)|| ((getNetwork1 !== getNetwork2) && !order)) && (
              <BalanceBody>Bal: {balance1}</BalanceBody>  
              )}           
            <div onClick={onPresentSettingsModal2} >
              {getTokenImage(token2Object)}      
              </div>    
          </div>
            </div>
          </InputStyle>
          
          {order && (
             <div className='d-flex flex-row justify-content-between' style={{ order: '4', width: "100%"}}>
              {(token1 !== "" && token2 !== "") && (getNetwork1 === getNetwork2) && (
             <div className='style22' >1 {token2?.toUpperCase()} = {showPrice?.toFixed(4)} {token1?.toUpperCase()} 
             </div>)}
             { (token1 !== "" && token2 !== "" ) && (responseData?.srcSwapData !== undefined) && (getNetwork1 !== getNetwork2) && (
              // eslint-disable-next-line dot-notation 
             <div className='style22' >1 {token2?.toUpperCase()} = {showPrice?.toFixed(4)} {token1?.toUpperCase()} 
             </div>) }
             {(token1 !== "" && token2 !== "" && (getNetwork1 === getNetwork2)) && (
          <div className='d-flex flex-row' style={{marginTop : "1px"}}>
        <StyledButton6 className='styleRefresh' onClick={() => {refreshCost()}}>
        <div className='d-flex flex-row' style={{marginTop : "8px"}}>
        <img style={{marginLeft : "4px"}}
                src="images/home/img_cirefresh.png"
                className="cirefresh"
                alt="cirefresh"
                width= "16.02px"
                height= "16px"
              />
          <Text className="refreshButton">Refresh</Text></div>
          </StyledButton6>
        </div>)}
        {(token1 !== "" && token2 !== "" && (getNetwork1 !== getNetwork2) && (responseData?.srcSwapData !== undefined)) && (
          <div className='d-flex flex-row' style={{marginTop : "1px"}}>
        <StyledButton6 className='styleRefresh' onClick={() => {refreshCost()}}> 
        <div className='d-flex flex-row' style={{marginTop : "8px"}}>
               <img style={{marginLeft : "4px"}}
                src="images/home/img_cirefresh.png"
                className="cirefresh"
                alt="cirefresh"
                width= "16.02px"
                height= "16px"
              />
              
              <Text className="refreshButton">Refresh</Text></div></StyledButton6>
        </div>)}
        
             </div>
         )}
           {!order && (          
              <div className='d-flex flex-row justify-content-between' style={{ order: '4', width: "100%"}}>
              {(token1 !== "" && token2 !== "") && (getNetwork1 === getNetwork2) && (
          <div className='style22' >1 {token1?.toUpperCase()} = {showPrice?.toFixed(4)} {token2?.toUpperCase()} 
          </div> )}
          { (token1 !== "" && token2 !== "") && (responseData?.srcSwapData !== undefined) && (getNetwork1 !== getNetwork2) && (
              // eslint-disable-next-line dot-notation 
          <div className='style22' >1 {token1?.toUpperCase()} = {showPrice?.toFixed(4)} {token2?.toUpperCase()} 

          </div> 
          
          ) }
          {(token1 !== "" && token2 !== "" && (getNetwork1 === getNetwork2)) && (
          <div className='d-flex flex-row' style={{marginTop : "1px"}}>
        <StyledButton6 className='styleRefresh' onClick={() => {refreshCost()}}> 
        <div className='d-flex flex-row' style={{marginTop : "8px"}}>
        <img style={{marginLeft : "4px"}}
                src="images/home/img_cirefresh.png"
                className="cirefresh"
                alt="cirefresh"
                width= "16.02px"
                height= "16px"
              /><Text className="refreshButton">Refresh</Text></div></StyledButton6>
        </div>)}
        {(token1 !== "" && token2 !== "" && (getNetwork1 !== getNetwork2) && (responseData?.srcSwapData !== undefined)) && (
        
        <div className='d-flex flex-row' style={{marginTop : "1px"}}>
        <StyledButton6 className='styleRefresh' onClick={() => {refreshCost()}}> 
        <div className='d-flex flex-row' style={{marginTop : "8px"}}>
        <img style={{marginLeft : "4px"}}
                src="images/home/img_cirefresh.png"
                className="cirefresh"
                alt="cirefresh"
                width= "16.02px"
                height= "16px"
              /><Text className="refreshButton">Refresh</Text></div></StyledButton6>
       </div> )}
          </div>
          )}
         
     
         
          {((account !== undefined) && (!tokenApproval)) && (loading=== true ? (<StyledLoading><ReactLoading type="spin" color="
#DCEAFF" height={50} width={50} /></StyledLoading>):
           (<StyledButton style={{backgroundColor: "#01b39e"}} onClick={getTokenApproved}>Approve</StyledButton>))
          }   
          {((token1 !== "" && token2 !=="") && (account !== undefined) && (tokenApproval || swapMessage.toLowerCase() === ("Insufficient Liquidity").toLowerCase())) && (swapLoading === true ? (<StyledLoading><ReactLoading type="spin" color="
#DCEAFF" height={50} width={50} /></StyledLoading>):
          (<StyledButton style={{backgroundColor: "#01b39e"}} onClick={swapToken}>{swapMessage}</StyledButton>))
          }      
            {(account === undefined) && (
              
          <StyledButton style={{backgroundColor: "#01b39e"}} onClick={() => {
            onPresentConnectModal()
          }}>
          <img style={{marginRight : "4px"}}
                src="/images/home/connect1.png"
                className="cirefresh"
                alt="cirefresh"
                width= "20.02px"
                height= "19px"
              />

            Connect Wallet</StyledButton>)
          
          }    
            { /* <a style={{order: 4}} className="buycryptobutton" href="https://buy.ramp.network/" rel="noreferrer" target="_blank">Buy Crypto</a>  */ }                          
        </StyledCardBody> 
     
      </AppBody>
      </BiggerCards>
    </>
  )
}

export default Exchange