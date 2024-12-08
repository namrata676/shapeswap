import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import {useHistory, Link} from "react-router-dom"
import Web3 from "web3";
import ReactLoading from 'react-loading'
import ReactTooltip from 'react-tooltip';
import useInterval from 'react-useinterval';
import "./ExchangePolygon.css"
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import {  ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components'
import { Heading, Text, BaseLayout,  useModal } from 'toolkit/uikit'
import { CardBody } from 'uikit'
import { ApolloClient, InMemoryCache, gql, Cache } from "@apollo/client";
import useAnalyticsEventTracker from '../../components/useAnalyticsEventTracker';
import { AppHeader, AppBody } from '../../components/App'
import { setupNetwork1 } from '../../utils/wallet'
import { getTokenImage } from './polygonutils'
import ToggleButtonAC from '../Home/components/ToggleButtonAC'
import CoinsModal from '../coinsModal/CoinsModal'
import {polygonList} from './ListPolygonData'
import { wethcontractAddress, wethABI, joePairWeth} from '../../Abi/polygonSwap/wethConfig'
import { usdccontractAddress, usdcABI, joePairUsdc} from '../../Abi/polygonSwap/usdcConfig'
import {swapContractAddress, swapContractAbi } from '../../Abi/polygonSwap/swapTokenContractPolygon'


const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  padding: 8px;
  flex: 1;
  border-radius: 10px 0 0 10px;
  background: #3a3a3c;
  width: 94%;
  border: 0px;
  :focus{
    border: 0px;
    outline: 0;
  }
`

const StyledInput1 = styled.input`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  padding: 8px;
  flex: 1;
  border-radius: 10px 0 0 10px;
  background: #3a3a3c;
  width: 94%;
  border: 0px;
  :focus{
    border: 0px;
    outline: 0;
  }
`

const StyledLoading = styled.div`
  order: 4;
  align-items: center;
  border: 1;
  border-color: #faa21a;
  box-shadow: 0 0 6px #f8981d;
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
  background-color: #3a3a3c;
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

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;
  width: 100%;  

  & > div {
    grid-column: span 12;
    background-color: #191b1f; 
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
      background-color: #191b1f; 
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    & > div {
      grid-column: span 6;
      background-color: #191b1f; 
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



const StyledInput2 = styled(StyledInput)`
  border-radius: 10px;
`

const SelectStyle = styled.select`
  color: #f9a11a;
  background: #3a3a3c;
  border-radius: 0 10px 10px 0;
  border: 0;
  outline: 0;
  height: 33px;
  width: 100px;
`

const SelectStyle1 = styled.select`
  color: #f9a11a;
  background: #3a3a3c;
  border-radius: 0 10px 10px 0;
  border: 0;
  outline: 0;
  height: 33px;
  width: 100px;
`

const StyledCardBody = styled(CardBody)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid;
  border-color: #faa21a;  
  background-color: #191b1f !important;
`

const StyledButton4 = styled.button`
order:2;
align-items: center;
border: 0;
border-radius: 35px;
padding: 12px;
margin-top: 15px;
margin-left: 68px;
display: inline-flex;
width: 200px;
height: 90px;
color: #eee;
background: rgb(0 0 0 / 8%);
font-family: inherit;
font-size: 14px;
justify-content: center;
letter-spacing: 0.03em;  
transition: background-color 0.5s, opacity 0.5s;

&:hover {
  opacity: 0.99;
  background: #fba321;
}

&:active {
  opacity: 0.99;
  transform: translateY(1px);
  box-shadow: none;
}
`;

const StyledButton = styled.button`
  order: 4;
  align-items: center;
  border: 1;
  border-color: #faa21a;
  box-shadow: 0 0 6px #f8981d;
  border-radius: 12px;
  padding: 12px;
  margin-top: 20px;
  cursor: pointer;
  display: inline-flex;
  width: 94%;
  font-family: inherit;
  font-size: 18px;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-color: #212429;
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

const StyledButton3 = styled.button`
  order: 4;
  align-items: center;
  border: 0;
  border-radius: 5px;
  padding: 4px;
  margin-top: 5px;
  cursor: pointer;
  display: inline-flex;
  width: 14%;
  font-family: inherit;
  font-size: 13px;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-color: #212429;
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


const StyledButton2 = styled.button`
  order:2;
  align-items: center;
  border: 0;
  border-radius: 15px;
  padding: 12px;
  margin-top: 10px;
  display: inline-flex;
  width: 30px;
  height: 30px;
  background: #2b2b2b;
  font-family: inherit;
  font-size: 16px;
  justify-content: center;
  letter-spacing: 0.03em;
  background-color: #212429;
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
  width: 94%;
  border: 1px solid;
  border-radius: 10px;  
  padding: 10px;
  margin-top: 10px;
  border-color: #faa21a;
  box-shadow: 0 0 6px #faa21a;  
  background-color: #212429;
`

const BiggerCards = styled(Cards)`
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
      font-size: 1.5em;
      border-radius:80px;
      position: relative;
      margin: 0 auto;     
      box-shadow: 0 0 15px #faa21a;
      border: 1; 
      background-color: #191b1f !important;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
      background-color: #191b1f !important;
    }
  }
`

const StyledImage = styled.img`  
  width: 30%;
`



const ExchangePolygon = () => {
  const { account } = useWeb3React()
  const [token1, setToekn1] = useState('matic');
  const [token2, setToekn2] = useState('usdc');
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [balance1, setBalance1] = useState('0')
  const [balance2, setBalance2] = useState('0')
  const [order, setOrder] = useState(false);
  const [slippage, setSlippage] = useState(1)
  const [swapAmountWithSlippage1, setSwapAmountWithSlippage1] = useState(0)
   const [swapAmountWithSlippage2, setSwapAmountWithSlippage2] = useState(0)
   const [currentCA, setCurrentCA] = useState({})
   const [maxSold, setMaxSold] = useState(5)
   const [minSold, setMinSold] = useState(5)
   const [reservevalueusdc, setReserveValueUsdc] = useState(0)
   const [reservevalueusdc2, setReserveValueUsdc2] = useState(0)
   const [reservevalueweth, setReserveValueWeth] = useState(0)
   const [reservevalueweth2, setReserveValueWeth2] = useState(0)
   const [decimals, setDecimals]  = useState(0)
   const [slippage1, setSlippage1] = useState(1)
   const [isOn, setIsOn] = useState(false)
   const [finalReservePair1, setFinalReservePair1] = useState(0)
   const [finalReservePair2, setFinalReservePair2] = useState(0)
   const [token1PairList, setToken1PairList] = useState([])
   const [token2PairList, setToken2PairList] = useState([])
 
   const [checkPair, setCheckPair] = useState({} as any)
   const [tokenApproval, setTokenApproval] = useState(false)
   const [swapMessage, setSwapMessage] = useState("Swap")

   
   const [pathObject, setPathObject] = useState([])

   const [tokenIndex, setTokenIndex] = useState(0)
   const [ hideApprove, setHideApprove] = useState(true)
   const [checkCommonPair, setCheckCommonPair] = useState({})
   const [boolCommon, setBoolCommon] = useState(false)
   const [refreshPrice, setRefreshPrice] = useState(0)
   const [loading, setLoading] = useState(false)


   const gaEventTracker = useAnalyticsEventTracker('swap');
   
 

    const contractAbi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
  

    const contractAddress = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"
    const maticContractAddress = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"

  
    const web3 = new Web3(window.ethereum as any)
  
    const swapContract = new web3.eth.Contract(contractAbi as any, contractAddress);
    const wethContract = new web3.eth.Contract(wethABI as any, wethcontractAddress);
    const usdcContract = new web3.eth.Contract(usdcABI as any, usdccontractAddress);

    const  swapContractPolygon = new web3.eth.Contract(swapContractAbi as any, swapContractAddress);

    const approvalAmount = (100000*(10**18)).toLocaleString('fullwide', { useGrouping: false })


   const navigate = useHistory();

   const [token1List, setToken1List] = useState([])


  const polyAddress = ("0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270").toLowerCase()
  const [token1Object, setToken1Object] = useState({
    "id": polyAddress,
    "address": polyAddress,
    "decimal" : 18,
    "symbol": "matic",
    "exchangeIndex" : 0,
    "icon": "/images/coins/binanceCoins/matic.png",
    "chain": "poly"


  })  
  const usdcAddress = ("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174").toLowerCase()
  const [token2Object, setToken2Object] = useState({
    "id": usdcAddress,
    "address": usdcAddress,
    "decimal" : 6,
    "symbol": "usdc",
    "exchangeIndex" : 0,
    "icon": "/images/coins/usdc.png",
    "chain": "poly"

  })
  const [initToken, setInitToken] = useState(false)



   const GRAPHAPIURL = "https://api.thegraph.com/subgraphs/name/harry1121-s/dex-aggregator-polygon"

   const notifySuccess = () => {
    
    toast.success('Successfully Swapped Tokens !', {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      });
  
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


};

const notifyWarning = () => {
    
  toast.warning('Please Connect Wallet !', {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    });

};

   const fetchToken1List = async () => {
    const projectDataGQL = null;
    const client = new ApolloClient({
      uri: GRAPHAPIURL,
      cache: new InMemoryCache(),
    });
    const projectOwnerDataQuery = `query {
      tokens(first: 25) {
        id
        name
        symbol
        decimal
      }
    }`;
    const arr:any = [{
      "id": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      "text": "weth",
      "icon": "/images/coins/binanceCoins/weth.png",
      "address": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      "decimal" : 18,
      "symbol": "weth",
      "chain": "poly"
    
  },
  {
    "id": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    "text": "usdt",
    "icon": "/images/coins/usdt.png",
    "address": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    "decimal" : 6,
    "symbol": "usdt",
    "chain": "poly"
  },  

{
  "id": "0x170A18B9190669Cda08965562745A323C907E5Ec",
  "text": "pusdt",
  "icon": "/images/coins/usdt.png",
  "address": "0x170A18B9190669Cda08965562745A323C907E5Ec",
  "decimal" : 6,
  "symbol": "pusdt", 
  "chain": "poly"
},

{
  "id": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  "text": "usdc",
  "icon": "/images/coins/usdc.png",
  "address": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  "decimal" : 6,
  "symbol": "usdc", 
  "chain": "poly"
},

{
"id": "0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3",
"text": "bnb",
"icon": "/images/coins/binanceCoins/wbnb.png",
 "address": "0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3",
 "decimal" : 18,
 "symbol": "bnb",
 "chain": "poly"

},

{
  "id": "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
  "text": "busd",
  "icon": "/images/coins/busd.png",
  "address": "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
  "decimal" : 18,
  "symbol": "busd",
  "chain": "poly"
 
},
{
  "id": "0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b",
  "text": "avax",
  "icon": "/images/home/avax.png",
  "address": "0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b",
  "decimal" : 18,
  "symbol": "avax", 
  "chain": "poly"
},
{
  "id": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  "text": "dai",
  "icon": "/images/coins/dai.png",
  "address": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  "decimal" : 18,
  "symbol": "dai", 
  "chain": "poly"
},
{
  "id": "0x0000000000000000000000000000000000001010",
  "text": "matic",
  "icon": "/images/coins/binanceCoins/matic.png",
  "address": "0x0000000000000000000000000000000000001010",
  "decimal" : 18,
  "symbol": "matic",   
  "chain": "poly"
},
{
  "id": "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
  "text": "wbtc",
  "icon": "/images/coins/wbtc.png",
  "address": "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
  "decimal" : 8,
  "symbol": "wbtc", 
  "chain": "poly"  
},

];
    let ourArray = []
    if (localStorage.getItem('tokenArray') !== null) {
      const storedArray = localStorage.getItem("tokenArray");
       ourArray = JSON.parse(storedArray);    
  } 
    

        for (let i= 0; i< ourArray.length ; i++){
        
          const obj = arr.findIndex(v => (v.address).toLowerCase() === (ourArray[i].address).toLowerCase());
          if(obj !== -1){    
        
            const obj1 = arr[obj]
            if (arr[obj] !== undefined) {
              arr[obj].saveStatus = "unsave"
            }
            arr.splice(obj, 1); 
            arr.unshift(obj1)
              
          } else {
             /* eslint-disable no-lonely-if */
            if((ourArray[i]?.chain) === ("poly")){
            arr.unshift(ourArray[i])
            }
          }

        }

        setTimeout(()=>{
          setToken1List(arr)
        },100)
      
        return arr;
    }

    const findReserves = async (tokenPair1, tokenPair2, testAddress) => {

      console.log("findcommonfindenter@@",tokenPair1, tokenPair2)
  
      setPathObject([token1Object?.address,testAddress, token2Object?.address])
      setSwapMessage("Swap")
      setTokenIndex(tokenPair1?.exchangeIndex)
      setHideApprove(false)
      setBoolCommon(true)
  
          let myTokenDecimal1 = 0
          let pairTokenDecimal1 = 0
  
          let token1Reserve = 0
          let token2Reserve = 0
  
          const joeContract1 = new web3.eth.Contract(joePairWeth as any, tokenPair1?.pairAddress)
  
          const myTokenContract1 = new web3.eth.Contract(usdcABI as any, tokenPair1?.myToken);
          const myPairContract1 = new web3.eth.Contract(usdcABI as any, tokenPair1?.pairToken);
            
  
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
  
        const joeContract2 = new web3.eth.Contract(joePairWeth as any, tokenPair2?.pairAddress)
        const myTokenContract2 = new web3.eth.Contract(usdcABI as any, tokenPair2?.myToken);
        const myPairContract2 = new web3.eth.Contract(usdcABI as any, tokenPair2?.pairToken);
      
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
              "exchangeIndex" : 0,
              "chain": "poly"
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
                "exchangeIndex" : 0,
                "chain": "poly"
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
                "exchangeIndex" : 0,
                "chain": "poly"

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
                  "exchangeIndex" : 0,
                  "chain": "poly"
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
   
  
    const fetchPair = async (token, tokenName) => {
      let projectDataGQL = null;
      let projectDataGQL1 = null;
      const client = new ApolloClient({
        uri: GRAPHAPIURL,
        cache: new InMemoryCache(),
      });
      const projectOwnerDataQuery = `query {
        pairs (where:{tokenA:"${token.toLowerCase()}"}){
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
          pairs (where:{tokenB:"${token.toLowerCase()}"}){
            id
            tokenA
            tokenAEntity {
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
        projectDataGQL = await client.query({
          query: gql(projectOwnerDataQuery),
          fetchPolicy: "network-only",
        });
        projectDataGQL1 = await client.query({
          query: gql(projectOwnerDataQuery1),
          fetchPolicy: "network-only",
        });
          const arr = [];
          const arr1 = [];
          console.log("query1 output",projectDataGQL)
          projectDataGQL.data.pairs.map((tokenA) => {
            if((tokenA?.tokenB).toLowerCase() === ("0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270").toLowerCase()){
              console.log("FETCHPAIR !!!",tokenA)
            }
            arr.push({
                "text": tokenA?.tokenBEntity?.name,
                "icon": "/images/coins/generic.png",
                "pairTokenDecimal" : tokenA?.tokenBEntity?.decimal,
                "pairTokenSymbol" : tokenA?.tokenBEntity?.symbol,
                "pairAddress": tokenA?.id,
                "myToken": tokenA?.tokenA,
                "pairToken": tokenA?.tokenB,
                "exchangeIndex" : 0,
                "chain": "poly"
            });
           
            return arr;
          }); 
  
          console.log("query2 output",projectDataGQL1)
  
          projectDataGQL1.data.pairs.map((tokenB) => {
            arr1.push({
              
              "text": tokenB?.tokenAEntity?.name,
              "icon": "/images/coins/generic.png",
              "pairTokenDecimal" : tokenB?.tokenAEntity?.decimal,
              "pairTokenSymbol" : tokenB?.tokenAEntity?.symbol,
              "pairAddress": tokenB?.id,
              "myToken": tokenB?.tokenB,
              "pairToken": tokenB?.tokenA,
              "exchangeIndex" : 0,
              "chain": "bnb"
  
            });
           
            return arr;
          }); 
          const arr3 = [...arr, ...arr1];
          if((tokenName).toLowerCase() === ("token1").toLowerCase()){
            setToken1PairList(arr3)
          } else {
            setToken2PairList(arr3)
          }
          return arr;
      } catch (e) {
        console.log(e);
      }
  
      return []
    
    };
  
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

  // eslint-disable-next-line consistent-return
 const zeroLevelCheck = async (tokenAaddress, tokenBaddress) => {
  let projectDataGQL3 = null;
  const client = new ApolloClient({
    uri: GRAPHAPIURL,
    cache: new InMemoryCache(),
  });
  const projectOwnerDataQuery = `query {
    pairs (where:{tokenA:"${tokenAaddress.toLowerCase()}",tokenB:"${tokenBaddress.toLowerCase()}"}){
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
    pairs (where:{tokenA:"${tokenBaddress.toLowerCase()}",tokenB:"${tokenAaddress.toLowerCase()}"}){
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
      console.log("query1 output @@@@@@!!!", tokenAaddress, tokenBaddress)
      console.log("query1 output @@@@@@",projectDataGQL3)


      if(projectDataGQL3?.data?.pairs?.length === 0){

       
        try {
         const projectDataGQL4 = await client.query({
            query: gql(projectOwnerDataQuery1),
            fetchPolicy: "network-only",
          });

          console.log("query2 output @@@@@@!!!", projectDataGQL4)

          

           if(projectDataGQL4?.data?.pairs?.length === 0 ){
                  
               setCheckPair(undefined)

           } else {
                 
            if(projectDataGQL4?.data?.pairs.length === 1){

      // eslint-disable-next-line array-callback-return
      projectDataGQL4?.data?.pairs?.map((tokenA) => {
        setCheckPair({
            "pairAddress": tokenA?.id,
            "myToken": tokenA?.tokenB,
            "pairToken": tokenA?.tokenA,
            "exchangeIndex" : 0,
            "chain": "poly"
        });
      })
       
           return arr;
           } 
          // eslint-disable-next-line no-else-return
           else {

              projectDataGQL4?.data?.pairs?.map((tokenA) => {
                if((tokenA?.exchange).toLowerCase() === ("Joe Exchange").toLowerCase()){
                  setCheckPair({
                      "pairAddress": tokenA?.id,
                      "myToken": tokenA?.tokenB,
                      "pairToken": tokenA?.tokenA,
                      "exchangeIndex" : 0,
                      "chain": "poly"
                  });
                }
                 
                  return arr;
                })
              
            }

             

           }
          }
           catch (e) {
            console.log(e);
          }  }

      else {
      if(projectDataGQL3?.data?.pairs?.length > 1){
      projectDataGQL3.data.pairs.map((tokenA) => {
      if((tokenA?.exchange).toLowerCase() === ("Joe Exchange").toLowerCase()){
        setCheckPair({
            "pairAddress": tokenA?.id,
            "myToken": tokenA?.tokenA,
            "pairToken": tokenA?.tokenB,
            "exchangeIndex" : 0,
            "chain": "poly"
        });
      }
       
        return arr;
      })
    } else {
      
      // eslint-disable-next-line array-callback-return
      projectDataGQL3.data.pairs.map((tokenA) => {
          setCheckPair({
              "pairAddress": tokenA?.id,
              "myToken": tokenA?.tokenA,
              "pairToken": tokenA?.tokenB,
              "exchangeIndex" : 0,
              "chain": "poly"
          });
        })
         
          return arr;
        }
  }
    
  }
    catch (e) {
      console.log(e);
    }

}

console.log("CHECK PAIR",checkPair)

const  approveToken = async () => {
  if(account === undefined){
    
    return
  }
       if(!order){

        if((token1Object?.address).toLowerCase() === ("0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270").toLowerCase()){

          setTokenApproval(true)
        } else {

          let amountFinal = ""

          const currentContract = new web3.eth.Contract(usdcABI as any, token1Object?.address);
        
         await currentContract.methods.decimals().call().then( function( info1 ) {
      
           amountFinal = Math.trunc(swapAmountWithSlippage1*(10**info1)).toLocaleString('fullwide', { useGrouping: false });
         
           }); 

         await currentContract.methods.allowance(account, swapContractAddress).call().then( async function( info ) {
          
          if(parseInt(info) <= parseInt(amountFinal)){
            setTokenApproval(false)
          }
          else {
            setTokenApproval(true)
          }
           
        })
     }
    }
     else if(order){

      if((token2Object?.address).toLowerCase() === ("0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270").toLowerCase()){

        setTokenApproval(true)
      } else {

        let amountFinal = ""

        const currentContract = new web3.eth.Contract(usdcABI as any, token2Object?.address);
      
        await currentContract.methods.decimals().call().then( function( info1 ) {
    
         amountFinal = Math.trunc(swapAmountWithSlippage2*(10**info1)).toLocaleString('fullwide', { useGrouping: false });
         }); 

       await currentContract.methods.allowance(account, swapContractAddress).call().then( async function( info ) {
     
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

    
  const findPair = async () => {

    console.log("Enter find Pair")

    const tokenList1 = []
    const tokenList2 = []

    let token1Reserve = 0
    let token2Reserve = 0

    let myTokenDecimal = 0
    let pairTokenDecimal = 0
    // let tokenPair 
    const checkToken = false
      console.log("findpair2",token2PairList, token1Object?.address)
      console.log("findpair1",token1PairList)
     
      // await zeroLevelCheck(token1Object?.address, token2Object?.address)


        console.log("findcheckpair",checkPair)


      const tokenPair = checkPair

      console.log("findpair",tokenPair)
      console.log("findpair1",token1Object?.address)
      if(tokenPair !== undefined){
        setTokenIndex(tokenPair?.exchangeIndex)
        setSwapMessage("Swap")
        setHideApprove(false)


        const joeContract = new web3.eth.Contract(joePairWeth as any, tokenPair?.pairAddress)
        const myTokenContract = new web3.eth.Contract(usdcABI as any, tokenPair?.myToken);
        const myPairContract = new web3.eth.Contract(usdcABI as any, tokenPair?.pairToken);

            
        await myPairContract.methods.decimals().call().then( async function( pairDecimal ) {
            
          await myTokenContract.methods.decimals().call().then( function( mytokendecimal ) {
              myTokenDecimal = mytokendecimal
                  })
            pairTokenDecimal = pairDecimal
           await joeContract.methods.getReserves().call().then(async function( info1 ) {
  
              await joeContract.methods.token0().call().then( function( info2 ) {
           
               if(info2.toLowerCase() === tokenPair?.myToken.toLowerCase()){
                console.log("FINDENTER1")
                
                 token1Reserve = parseInt((info1[1]*(10**myTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[0]*(10**pairTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))
                 token2Reserve = parseInt((info1[0]*(10**pairTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[1]*(10**myTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))
              
               
               } else {
                console.log("FINDENTER2")
               
                 token1Reserve = parseInt((info1[0]*(10**myTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[1]*(10**pairTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))
                 token2Reserve = parseInt((info1[1]*(10**pairTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[0]*(10**myTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))
               
               }
            })

            setTimeout(() =>{
              setRefreshPrice(1)
              console.log("enter find test reserve")

              setFinalReservePair1(token1Reserve)
              setFinalReservePair2(token2Reserve)
            
              setPathObject([token1Object?.address, token2Object?.address])

              }, 100);

           

            })
          })
          
        
       } else {


     let checkReserves = false
     
     if(!checkReserves){ 
     console.log("enter")
     checkReserves = await getCommonPair((token1Object?.address).toLowerCase(),(token2Object?.address).toLowerCase(), ("0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270").toLowerCase())
     console.log("findcommonfindenter00", checkReserves)
      
      if(checkReserves === false){
        console.log("findcommonfindenter", checkReserves)
       checkReserves = await getCommonPair((token1Object?.address).toLowerCase(),(token2Object?.address)?.toLowerCase(), ("0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619").toLowerCase())
    

          if(checkReserves === false){
            console.log("findcommonfindenter1", checkReserves)
          checkReserves =  await getCommonPair((token1Object?.address).toLowerCase(), (token2Object?.address)?.toLowerCase(), ("0xc2132D05D31c914a87C6611C10748AEb04B58e8F")?.toLowerCase())

              if(checkReserves === false){
                console.log("findcommonfindenter3", checkReserves)
                checkReserves = await getCommonPair((token1Object?.address).toLowerCase(),(token2Object?.address)?.toLowerCase(), ("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174").toLowerCase())
               

                  if(checkReserves === false){
                    console.log("findcommonfindenter4", boolCommon)
                
                   checkReserves = await getCommonPair((token1Object?.address).toLowerCase(),(token2Object?.address)?.toLowerCase(), ("0x170A18B9190669Cda08965562745A323C907E5Ec").toLowerCase())
                   
                  

                      if(checkReserves === false){
                        setRefreshPrice(3)
                        setSwapMessage("Insufficient Liquidity")
                        setHideApprove(true)
                  
                      } 
        
                
                   }
               
             }
            }  }
  }  }
  } 



  const tokenFunc1 = async(tokenSelected, tokenName) => {
   
   setToekn1(tokenSelected?.symbol);
   setToken1Object(tokenSelected)

   fetchPair(tokenSelected?.address, tokenName)
   zeroLevelCheck(tokenSelected?.address, token2Object?.address)
   setCheckPair({})
 
   setAmount1(0)
   setAmount2(0)

   if(account !== undefined){
 
     if((tokenSelected?.address).toLowerCase() === ('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270').toLowerCase()) {
 
   const maticBalance = await web3.eth.getBalance(account);
    setBalance1((parseInt(maticBalance)/(10**18)).toFixed(5));
  
  } else {
    
    const currentContract = new web3.eth.Contract(usdcABI as any, tokenSelected?.address);
    currentContract.methods.decimals().call().then( function( info1 ) {
 
     currentContract.methods.balanceOf((account)).call().then( function( info ) {
       setBalance1(((info/(10**info1)).toFixed(5)));
       setAmount1(0)
       });
    
      }); 
     } 
}
  }


  const tokenFunc2 = async (tokenSelected, tokenName) => {
    
     setAmount1(0)
     setAmount2(0)
    setToekn2(tokenSelected?.symbol);
    setToken2Object(tokenSelected)
    fetchPair(tokenSelected?.address,tokenName)
    zeroLevelCheck(token1Object?.address, tokenSelected?.address)
    setCheckPair({})
    if(account !== undefined){

      if((tokenSelected?.address).toLowerCase() === ('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270').toLowerCase()) {
     
    const bnbBalance = await web3.eth.getBalance(account);
     setBalance2((parseInt(bnbBalance)/(10**18)).toFixed(5));
     setAmount2(0)
     
   } 
     else {
      
      const currentContract = new web3.eth.Contract(usdcABI as any, tokenSelected?.address);
      currentContract.methods.decimals().call().then( function( info1 ) {
   
       currentContract.methods.balanceOf((account)).call().then( function( info ) {
         setBalance2(((info/(10**info1)).toFixed(5)));
         setAmount2(0)
         });
      
        }); 
      }
       }
 
}

const refreshPair = async () => {

  console.log("Enter find Pair refresh")
             
  const tokenList1 = []
  const tokenList2 = []

  let token1Reserve = 0
  let token2Reserve = 0

  let myTokenDecimal = 0
  let pairTokenDecimal = 0
  // let tokenPair 
  const checkToken = false
    console.log("findpair2",token2PairList, token1Object?.address)
    console.log("findpair1",token1PairList)
   
    // await zeroLevelCheck(token1Object?.address, token2Object?.address)


      console.log("findcheckpair",checkPair)


    const tokenPair = checkPair


    console.log("findpair",tokenPair)
    console.log("findpair1",token1Object?.address)
    if(tokenPair !== undefined){
      setTokenIndex(tokenPair?.exchangeIndex)
      setSwapMessage("Swap")
      setHideApprove(false)
    

      const joeContract = new web3.eth.Contract(joePairWeth as any, tokenPair?.pairAddress)
      const myTokenContract = new web3.eth.Contract(usdcABI as any, tokenPair?.myToken);
      const myPairContract = new web3.eth.Contract(usdcABI as any, tokenPair?.pairToken);

          
      await myPairContract.methods.decimals().call().then( async function( pairDecimal ) {
          
        await myTokenContract.methods.decimals().call().then( function( mytokendecimal ) {
            myTokenDecimal = mytokendecimal
           })
          pairTokenDecimal = pairDecimal
         await joeContract.methods.getReserves().call().then(async function( info1 ) {
 
            await joeContract.methods.token0().call().then( function( info2 ) {
           
             if(info2.toLowerCase() === tokenPair?.myToken.toLowerCase()){
              console.log("FINDENTER1")
              
               token1Reserve = parseInt((info1[1]*(10**myTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[0]*(10**pairTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))
               token2Reserve = parseInt((info1[0]*(10**pairTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[1]*(10**myTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))
            
             
 } else {
              console.log("FINDENTER2")
    
               token1Reserve = parseInt((info1[0]*(10**myTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[1]*(10**pairTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))
               token2Reserve = parseInt((info1[1]*(10**pairTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[0]*(10**myTokenDecimal)).toLocaleString('fullwide', { useGrouping: false }))

 }
          })

          setTimeout(() =>{
            console.log("enter find test reserve")

            setFinalReservePair1(token1Reserve)
            setFinalReservePair2(token2Reserve)
          
            setPathObject([token1Object?.address, token2Object?.address])

            }, 100);

         

          })
        })

  }
}




useEffect(()=>{
  setAmount1(0)
  setAmount2(0)
 
    if(isOn === true){
      setSlippage1(49)
    } else {
      setSlippage1(slippage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
   },[slippage, isOn])

  useEffect(()=>{
 if(account !== undefined){
   initialBalance()
   initialBalance2()
 }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account])

  
  useEffect(() =>{

    setupNetwork1(137)
        // eslint-disable-next-line react-hooks/exhaustive-deps
       },[])

       useEffect(()=>{

        setTimeout(() => {
          findPair()
       
              }, 100);
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
     },[checkPair])
    
      useInterval(()=>{
        console.log("refresh price",refreshPrice)
        if(refreshPrice === 1){
           refreshPair()
        } 
      }, 15000);
    
    
      useEffect(() =>{
        fetchToken1List()
         zeroLevelCheck(token1Object?.address, token2Object?.address)
        fetchPair(token1Object?.address, "token1")
        fetchPair(token2Object?.address, "token2")
               // eslint-disable-next-line react-hooks/exhaustive-deps
         },[])


         useEffect(() =>{
          approveToken()
            // eslint-disable-next-line react-hooks/exhaustive-deps
            },[token1Object, token2Object,account, order,amount1, amount2])

            useEffect(() =>{
              setFinalReservePair2(0)
              setFinalReservePair1(0)
              setBoolCommon(false)
              setRefreshPrice(0)
                      // eslint-disable-next-line react-hooks/exhaustive-deps
                },[token1, token2])

                useEffect(() =>{
                  tokenRefresh()
                           // eslint-disable-next-line react-hooks/exhaustive-deps
                     },[initToken])


    
  const initialBalance = async () => {

    if(account !== undefined){

      if((token1Object?.address).toLowerCase() === ('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270').toLowerCase()) {
       
    const maticBalance = await web3.eth.getBalance(account);
     setBalance1((parseInt(maticBalance)/(10**18)).toFixed(5));} 
     else {
      
      const currentContract = new web3.eth.Contract(usdcABI as any, token1Object?.address);
      currentContract.methods.decimals().call().then( function( info1 ) {
   
       currentContract.methods.balanceOf((account)).call().then( function( info ) {
         setBalance1(((info/(10**info1)).toFixed(5)));
       
         });
      
        }); 
      }
       }
  }

  const swapToken = async () => {
    
    gaEventTracker('swap avalanche token')
    if(account === undefined){
      notifyWarning()
      return
    }
         const date = Date.now() + 100
         if(!order){
  
          const currentContract = new web3.eth.Contract(usdcABI as any, token1Object?.address);
          const currentContract2 = new web3.eth.Contract(usdcABI as any, token2Object?.address);

          await currentContract.methods.decimals().call().then(async function( token1Decimal ) {

          await swapContractPolygon.methods.swapFee().call().then(async function( fees ) {
       
            const amountFinal = ((Math.trunc(swapAmountWithSlippage1*(10**token1Decimal)).toLocaleString('fullwide', { useGrouping: false })));
            const am  = swapAmountWithSlippage1 + (fees/10**18)


            const amountFinalWithFees = ((Math.trunc((am)*(10**token1Decimal)).toLocaleString('fullwide', { useGrouping: false })));

           await currentContract2.methods.decimals().call().then(async function( token2Decimal ) {
       
              const amountOut = ((Math.trunc(swapAmountWithSlippage2*(10**token2Decimal)).toLocaleString('fullwide', { useGrouping: false })))
            
          if((token1Object?.address)?.toLowerCase() === ('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270')?.toLowerCase()){

            console.log("findchecknativefortoken",amountFinal, amountOut, token1Object?.address,account, tokenIndex)
           try{
           const nftTxn = await swapContractPolygon.methods.swapNativeForToken(amountOut,['0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',token2Object?.address],account,tokenIndex).send({from: account, value: amountFinalWithFees});
           initialBalance()
           initialBalance2()
           setAmount1(0)
           setAmount2(0)
           notifySuccess()
           } catch {
            notifyError()
           }
        
           }
           else if((token2Object?.address)?.toLowerCase() === ('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270')?.toLowerCase()){
            console.log("findchecktokenfornative",amountFinal, amountOut, token1Object?.address,account, tokenIndex)

            await swapContractPolygon.methods.swapFee().call().then(async function( fees1 ) {
            const feesfinaltokenfornative  = parseInt(Math.trunc(fees1).toLocaleString('fullwide', { useGrouping: false }))
            try{      
            const nftTxn = await swapContractPolygon.methods.swapTokenForNative(amountFinal, amountOut,[token1Object?.address, '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'],account,tokenIndex).send({from: account, value: feesfinaltokenfornative});
            initialBalance()
            initialBalance2()
            notifySuccess()
             setAmount1(0)
           setAmount2(0)
            } catch {
                notifyError()
            }
          }) 
          } 
          else {

            console.log("findchecktokenfortoken",amountFinal, amountOut, pathObject,account, tokenIndex)

            await swapContractPolygon.methods.swapFee().call().then(async function( fees2 ) {
            const feesfinaltokenfortoken  = parseInt(Math.trunc(fees2).toLocaleString('fullwide', { useGrouping: false }))
           try{
           const nftTxn = await swapContractPolygon.methods.swapTokenForToken(amountFinal, amountOut, pathObject,account,tokenIndex).send({from: account, value: feesfinaltokenfortoken});
           initialBalance()
           initialBalance2()
            notifySuccess()
            setAmount1(0)
           setAmount2(0)
           } catch {
                notifyError()
           }
            })
          }

        })
      })
    })
    }  
    else if(order){

       const currentContract = new web3.eth.Contract(usdcABI as any, token1Object?.address);
       const currentContract2 = new web3.eth.Contract(usdcABI as any, token2Object?.address);
       currentContract.methods.decimals().call().then( async function( token1Decimal ) {
       
        const amountOut = ((Math.trunc(swapAmountWithSlippage1*(10**token1Decimal))).toLocaleString('fullwide', { useGrouping: false }));


        await swapContractPolygon.methods.swapFee().call().then(async function( fees ) {
      

        currentContract2.methods.decimals().call().then( async function( token2Decimal ) {
   
         const amountFinal = ((Math.trunc(swapAmountWithSlippage2*(10**token2Decimal))).toLocaleString('fullwide', { useGrouping: false }));


         const am1 = swapAmountWithSlippage2 + (fees/10**18)


         const amountFinalWithFees = ((Math.trunc(am1*(10**token2Decimal))).toLocaleString('fullwide', { useGrouping: false }));

        if((token2Object?.address)?.toLowerCase() === ('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270')?.toLowerCase()){

          console.log("amountswap11111111",amountFinal, amountOut)
          try{
          const nftTxn = await swapContractPolygon.methods.swapNativeForToken(amountOut,['0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',token1Object?.address],account,tokenIndex).send({from: account, value: amountFinalWithFees});
          notifySuccess()
          initialBalance2()
          initialBalance()
          setAmount1(0)
           setAmount2(0)
          } catch {
             notifyError()
          }

       } else if((token1Object?.address)?.toLowerCase() === ('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270')?.toLowerCase()){

        await swapContractPolygon.methods.swapFee().call().then(async function( fees1 ) {

        
          const feesfinal = parseInt(Math.trunc(fees1).toLocaleString('fullwide', { useGrouping: false }))
          console.log("findcheck99999999",amountFinal, amountOut, token2Object?.address,account, tokenIndex)
          try{
        const nftTxn = await swapContractPolygon.methods.swapTokenForNative(amountFinal,amountOut,[token2Object?.address, '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'],account,tokenIndex).send({from: account, value: feesfinal});
        notifySuccess()
         initialBalance2()
         setAmount1(0)
            setAmount2(0)
         initialBalance()
          } catch {

                notifyError()
          }
    })

       } else {

        await swapContractPolygon.methods.swapFee().call().then(async function( fees2 ) {
        const feesfinaltokenfortoken  = parseInt(Math.trunc(fees2).toLocaleString('fullwide', { useGrouping: false }))
        console.log("findchecktokenfortoken2",amountFinal, amountOut, pathObject,account, tokenIndex)

        const clonePathObject = [...pathObject];
      
        clonePathObject[0] = pathObject[pathObject.length-1]
        clonePathObject[pathObject.length - 1] = pathObject[0]
        const finalArray1 = [...clonePathObject]
      
      try{
      const nftTxn = await swapContractPolygon.methods.swapTokenForToken(amountFinal,amountOut,finalArray1, account,tokenIndex).send({from: account, value: feesfinaltokenfortoken});
      notifySuccess()
      initialBalance2()
      initialBalance()
      setAmount1(0)
      setAmount2(0)
      } catch {
         notifyError()
      }
    })}

  })
})
 })
      }
    }
          


  const initialBalance2 = async () => {
            if(account !== undefined){

              if((token2Object?.address).toLowerCase() === ('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270').toLowerCase()) {
          
            const maticBalance = await web3.eth.getBalance(account);
             setBalance2((parseInt(maticBalance)/(10**18)).toFixed(5));} 
             else {
              
              const currentContract = new web3.eth.Contract(usdcABI as any, token2Object?.address);
              currentContract.methods.decimals().call().then( function( info1 ) {
           
               currentContract.methods.balanceOf((account)).call().then( function( info ) {
                 setBalance2(((info/(10**info1)).toFixed(5)));
                
                 });
              
                }); 
              }
               }
  }

  
  const maxBalance2 = async (token, tokenNumber) => {
    
        
    if(tokenNumber === 1){
      const currentContract = new web3.eth.Contract(usdcABI as any, token1Object?.address);
        currentContract.methods.decimals().call().then( function( info1 ) {
     
         currentContract.methods.balanceOf((account)).call().then( function( info ) {
          setAmount1((info/(10**info1)-((0.00001*(info/(10**info1)))/100)));
          maxBalanceSwap1((info/(10**info1)-((0.00001*(info/(10**info1)))/100)))
           });
  
          })
        } else {
          const currentContract1 = new web3.eth.Contract(usdcABI as any, token2Object?.address);
          currentContract1.methods.decimals().call().then( function( info1 ) {
       
           currentContract1.methods.balanceOf((account)).call().then( function( info ) {
            setAmount2((info/(10**info1)-((0.00001*(info/(10**info1)))/100)));
            maxBalanceSwap2((info/(10**info1)-((0.00001*(info/(10**info1)))/100)))
             });
    
            })
  
        }
  }


  const maxBalanceSwap1 = async (amountMax2) => {
  
    const amountMax = parseFloat(amountMax2)

    console.log("Enter find finalreservepair",finalReservePair1)

   if((!order)){
   
     setAmount2(amountMax*finalReservePair1)
     setSwapAmountWithSlippage2((amountMax-((slippage1/100)*amountMax))*finalReservePair1)
     setSwapAmountWithSlippage1(amountMax)
     console.log("!!!!!!!!!!!!!!!!!!!!!!test",typeof(amountMax))
     setMinSold(2)
     setMaxSold(5)
   }  else if(order){
    
     setAmount2(amountMax*finalReservePair1)
     setSwapAmountWithSlippage2(((amountMax) + ((slippage1/100)*amountMax))*finalReservePair1)
     setSwapAmountWithSlippage1(amountMax)
     console.log("!!!!!!!!!!!!!!!!!!!!!!test",typeof(amountMax))
     setMinSold(5)
     setMaxSold(2)
     
   
   }

  }

  const maxBalanceSwap2 = (amountMax) => {

    console.log("Enter Find finalreservepair2",finalReservePair2)

    const amountMax2 = parseFloat(amountMax)
    if(order){
   
    setAmount1((amountMax2)*finalReservePair2)
    setSwapAmountWithSlippage1(((amountMax2-((slippage1/100)*amountMax2))*finalReservePair2))

    setSwapAmountWithSlippage2((amountMax2))
    setMinSold(1)
    setMaxSold(5)
  
  } else if(!order){
    
    setAmount1((amountMax2)*finalReservePair2)
    setSwapAmountWithSlippage1(((amountMax2)+((slippage1/100)*amountMax2))*finalReservePair2)
    console.log("!!!!!!!!!!!!!!!!!!!!!!test",typeof(amountMax2))
    setSwapAmountWithSlippage2((amountMax2))
    setMaxSold(1)
    setMinSold(5)
  
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

    if(token==='matic'){
      if(account!== undefined){
        const maticBalance = await web3.eth.getBalance(account);
        const intBalance = (parseInt(maticBalance)/(10**18))

        if(tokenNumber === 1){
        setAmount1(intBalance-((0.1*(intBalance))/100)) 
        maxBalanceSwap1(intBalance-((0.1*(intBalance))/100))
        }
        else {
          setAmount2(intBalance-((0.1*(intBalance))/100)) 
          maxBalanceSwap2(intBalance-((0.1*(intBalance))/100))
        }
       
        }
    } else {
        maxBalance2(token, tokenNumber)
    }    
  }  



  
  const  getTokenApproved = async () => {
  
    if(account === undefined){
      notifyWarning()
      return
    }
         if(!order){

            let amountFinal = ""
            let nftTxn = ""

            const currentContract = new web3.eth.Contract(usdcABI as any, token1Object?.address);
          
           await currentContract.methods.decimals().call().then( function( info1 ) {
        
             amountFinal = Math.trunc(swapAmountWithSlippage1*(10**info1)).toLocaleString('fullwide', { useGrouping: false });
             }); 

           await currentContract.methods.allowance(account, swapContractAddress).call().then( async function( info ) {
        
            if(parseInt(info) <= parseInt(amountFinal)){
              setLoading(true)
              try{
                nftTxn = await currentContract.methods.approve(swapContractAddress, approvalAmount).send({from: account});
                setLoading(false)
              }
              catch(e){
              alert("Error in getting approval,please try again")
              setLoading(false)
              }
              if(nftTxn){
                setTokenApproval(true)
               }
          }
        })
       }
       else if(order){

          let amountFinal = ""
          let nftTxn = ""

          const currentContract = new web3.eth.Contract(usdcABI as any, token2Object?.address);
        
         await currentContract.methods.decimals().call().then( function( info1 ) {
      
           amountFinal = Math.trunc(swapAmountWithSlippage2*(10**info1)).toLocaleString('fullwide', { useGrouping: false });
           }); 

         await currentContract.methods.allowance(account, swapContractAddress).call().then( async function( info ) {
      
          if(parseInt(info) <= parseInt(amountFinal)){
            setLoading(true)
            try{
            
              nftTxn = await currentContract.methods.approve(swapContractAddress, approvalAmount).send({from: account});
              setLoading(false)
            }
            catch(e){
            alert("Error in getting approval,please try again")
            setLoading(false)
            }
            if(nftTxn){
                   setTokenApproval(true)
          }
           
             
          }
         
        })
}
       }

       const callRefresh = () =>{
        if(refreshPrice ===1 ){
          refreshPair()
        }
      }

  const [onPresentSettingsModal] = useModal(<CoinsModal tokenFunc2={tokenFunc2} ListData={token1List} tokenName="token2" setInitToken={setInitToken} initToken={initToken}  tokenRefresh={tokenRefresh} setChain="poly" />)

  const [onPresentSettingsModal1] = useModal(<CoinsModal tokenFunc2={tokenFunc1} ListData={token1List} tokenName="token1" setInitToken={setInitToken} initToken={initToken} tokenRefresh={tokenRefresh} setChain="poly" />)

    /* useEffect( ()=>{

  const usdcjoeContract = new web3.eth.Contract(joePairUsdc as any, usdcAddress)
  
    usdcjoeContract.methods.slot0().call().then( function( info1 ) {
          const sqrtPriceX96 = info1.sqrtPriceX96
     const var1 = (sqrtPriceX96*sqrtPriceX96*((10**18)/(10**6))/2**192);
     setReserveValueUsdc(var1) 
     setReserveValueUsdc2(1/var1) 
    }) 
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[account]) */

  return (
    <> 
     <Helmet>
      <title>Smart Finance - Smart Swap Polygon</title>
      <link rel="canonical" href="https://dapp.smartfinance.exchange/swapPolygon/" />
    </Helmet>
    <ToastContainer/>
    <div style={{ backgroundColor:"#212429"}}>   
    <h1 className="h1Style">CHOOSE  NETWORK</h1>      
    <div className='d-flex flex-row justify-content-center chains'>      
      <img src="/images/swap/leftt.png" alt='avax' style={{padding: "10px"}} />
      <a href="/swap" style={{height: '100% !important'}}><img src="/images/swap/avaxcoin.png" alt='avax' style={{height:"100%", padding: "10px"}} /></a>
      <a href="/swapBinance" style={{height: '100% !important'}}><img src="/images/swap/bnbcoin.png" alt='bnb' style={{height:"100%", padding: "10px"}} /></a>
      <a href="/swapPolygon" style={{height: '100% !important'}}><img src="/images/swap/polycoin.png"  alt="poly" style={{height:"100%", padding: "10px"}} /></a>
      <a href="/swap" style={{height: '100% !important'}}><img src="/images/swap/ethereum1.png"  alt="eth" style={{height:"100%", padding: "10px"}} /></a>
      <a href="/swap" style={{height: '105% !important'}}><img src="/images/swap/cro.png"  alt="cro" style={{height:"105%", padding: "10px"}} /></a>
      <img src="/images/swap/rightt.png" alt='avax' style={{padding: "10px"}} />   
  
    </div>
    </div>
  <BiggerCards>
    <AppBody>
      <AppHeader title='Polygon' subtitle='Smart Swap' setSlippage={setSlippage} /> 
      <StyledCardBody>          
        {/* -----------------  Input Token Amount & Select Token Type _ Tag1 ---------------------- */}
        <div className='d-flex flex-row justify-content-between ' style={{width: "90%"}}>
        <div className='slippagePercentage'>Slippage - {slippage}%</div>
         <div className='d-flex flex-row justify-content-between'style={{marginRight: "10%"}} >
          <div className='d-flex flex-row justify-content-between' style={{paddingTop: "17%"}}>
          <AiOutlineQuestionCircle data-tip="By selecting Auto Slippage your transactions has a high risk of being front run" data-for='test'/>
          <ReactTooltip className='styleTooltip' multiline id='test'>{}</ReactTooltip>
          <div className='autoSlippage'>Auto Slippage</div>
         </div>
         <div style={{ width: "12px", marginTop: "16px" }}> <ToggleButtonAC onClick={() => setIsOn(!isOn)} /></div>           
         </div>
         </div>
        <InputStyle style={{ order: `${order ? 3 : 1}` }}>
          <div className='d-flex flex-row justify-content-between align-items-center'>
           <Link to={this} onClick={onPresentSettingsModal1}>
            {getTokenImage(token1Object)}      
            </Link>
            <div style={{ color: 'white' }}>Balance: {balance1}</div>            
          </div>
          <div className='d-flex flex-row align-items-center' style={{ gap: '4px', marginTop: '8px' }}>      
            <div className="buttonIn">
      <input className="input1" type="number" id="enter" onChange={amountChange1} value={amount1} placeholder='amount'/>
      {!order && (
      <button className="button1" id="clear" type="button" onClick={() => {getMaxBalance(token1,1)}}>MAX</button>)}
     
     </div>
        <button  id="token1" type="button" style={{backgroundColor: "#3a3a3c", color: "#FAA21A", padding: "2%", border: "none", borderRadius: "5px", paddingLeft: "10%", paddingRight: '10%' }} onClick={onPresentSettingsModal1}>{token1}</button>    
          </div>
        </InputStyle>

        {/* -----------------  Exchange Token1 and Token2 _ Button ---------------------- */}
        <StyledButton2 onClick={() => {
           setOrder(!order)
           setAmount1(0)
           setAmount2(0)
          }  }>
          <img src='/images/switch1.png' width='26px' alt='tokenSwitch' />
        </StyledButton2>

        {/* -----------------  Input Token Amount & Select Token Type _ Tag2 ---------------------- */}
        <InputStyle style={{ order: `${order ? 1 : 3}` }}>
        <div className='d-flex flex-row justify-content-between align-items-center'>
          <Link to={this} onClick={onPresentSettingsModal}>
            {getTokenImage(token2Object)}           
          </Link>
            <div style={{ color: 'white' }}>Balance: {balance2}</div>            
          </div>
          <div className='d-flex flex-row align-items-center' style={{ gap: '4px', marginTop: '8px' }}>
            <div className="buttonIn">
      <input className="input1" type="number" placeholder='amount' id='nameToBuyNode1' value={amount2} onChange={amountChange2}/>
      {order && (
      <button className="button1" id="max2" type="button" onClick={() => {getMaxBalance(token2,2)}}>max</button>)}
     </div>
        <button  id="token2" type="button" style={{backgroundColor: "#3a3a3c", color: "#FAA21A", padding: "2%", border: "none", borderRadius: "5px", paddingLeft: '10%', paddingRight: '10%' }} onClick={onPresentSettingsModal}>{token2}</button>    
          </div>
        </InputStyle>
        {order && (
        <div className='style22' style={{ order: '4' }}>Price:   {finalReservePair1.toFixed(7)} {token2} per {token1}   <BiRefresh className='style23' style={{}} onClick={callRefresh} data-tip="Refresh Price" data-for='refresh'/>
        <ReactTooltip className='style1' multiline id='refresh'>{}</ReactTooltip> </div> )}
         {!order && (            
        <div className='style22' style={{ order: '4' }}>Price:   {finalReservePair2.toFixed(7)} {token1} per {token2}   <BiRefresh className='style23' style={{}}  data-tip="Refresh Price" data-for='refresh'/>
        <ReactTooltip className='style1' multiline id='refresh'>{}</ReactTooltip> </div>)}
       
        {/* <div style={{ color: 'white', fontSize: '12px', marginTop: '20px', order: 4 }}>.01 avax Per TX + Gas</div> */}
        {minSold === 1 &&  (amount2 > 0)  && swapAmountWithSlippage1 && (
        <div style={{ color: 'white', fontSize: '10px', marginTop: '20px', order: 4 }}>Minimum Received: {swapAmountWithSlippage1}</div> )}
         {maxSold === 1 && (amount2 > 0)  && swapAmountWithSlippage1 && (
        <div style={{ color: 'white', fontSize: '10px', marginTop: '20px', order: 4 }}>Maximum Sold: {swapAmountWithSlippage1}</div>)}
         { minSold === 2 &&  (amount1 > 0) &&  swapAmountWithSlippage2  && (
        <div style={{ color: 'white', fontSize: '10px', marginTop: '20px', order: 4 }}>Minimum Received: {swapAmountWithSlippage2}</div> )}
         {maxSold === 2 && (amount1 > 0) && swapAmountWithSlippage2 && (
        <div style={{ color: 'white', fontSize: '10px', marginTop: '20px', order: 4 }}>Maximum Sold: {swapAmountWithSlippage2}</div>)}
        {((!tokenApproval) &&  (!hideApprove)) && (loading=== true ? (<StyledLoading><ReactLoading type="spin" color="rgb(250, 162, 26)" height={50} width={50} /></StyledLoading>):
         (<StyledButton onClick={getTokenApproved}>Approve</StyledButton>))
        }   
        {(tokenApproval || swapMessage.toLowerCase() === ("Insufficient Liquidity").toLowerCase()) && (
        <StyledButton onClick={swapToken}>{swapMessage}</StyledButton>)
        }
        
        <a style={{order: 4}} className="buycryptobutton" href="https://buy.ramp.network/" rel="noreferrer" target="_blank">Buy Crypto</a>                               
      </StyledCardBody>
    </AppBody>
    </BiggerCards>
  </>
  )
}

export default ExchangePolygon