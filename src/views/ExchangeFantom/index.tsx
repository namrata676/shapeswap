import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import {useHistory} from "react-router-dom"
import Web3 from "web3";
import "./ExchangePolygon.css"
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from 'toolkit/uikit'
import { CardBody } from 'uikit'
import useAnalyticsEventTracker from '../../components/useAnalyticsEventTracker';
import { AppHeader, AppBody } from '../../components/App'
import { setupNetwork1 } from '../../utils/wallet'
import ToggleButtonAC from '../Home/components/ToggleButtonAC'

import { tsharecontractAddress, tshareABI, joePairTshare} from '../../Abi/fantomSwap/tshareConfig'
import { usdccontractAddress, usdcABI, joePairUsdc} from '../../Abi/fantomSwap/usdcConfig'


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

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;
  width: 100%;

  & > div {
    grid-column: span 12;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    & > div {
      grid-column: span 6;
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
  border-color: #7c7c7c;
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
  border: 0;
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
  border-color: #5c5959;
  padding: 10px;
  margin-top: 10px;
`

const BiggerCards = styled(Cards)`
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      font-size: 1.5em;
      border-radius:80px;
      position: relative;
      margin: 0 auto;  

    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
    }
  }
`

const StyledImage = styled.img`  
  width: 30%;
`



const ExchangeBinance = () => {
  const [token1, setToekn1] = useState('ftm');
  const [token2, setToekn2] = useState('usdc');
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [balance1, setBalance1] = useState('0')
  const [balance2, setBalance2] = useState('0')
  const [order, setOrder] = useState(false);
  const { account } = useWeb3React()
  const [reserveValue, setReserveValue] = useState(0)
  const [reserveValue2, setReserveValue2] = useState(0)
  const [slippage, setSlippage] = useState(1)
  const [swapAmountWithSlippage1, setSwapAmountWithSlippage1] = useState(0)
   const [swapAmountWithSlippage2, setSwapAmountWithSlippage2] = useState(0)

   const [maxSold, setMaxSold] = useState(5)
   const [minSold, setMinSold] = useState(5)

   const gaEventTracker = useAnalyticsEventTracker('swap');
 
  const contractAbi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

    const contractAddress = "0xF491e7B69E4244ad4002BC14e878a34207E38c29"
  
    const web3 = new Web3(window.ethereum as any)
  

    const swapContract = new web3.eth.Contract(contractAbi as any, contractAddress);

    const tshareContract = new web3.eth.Contract(tshareABI as any, tsharecontractAddress);

    const usdcContract = new web3.eth.Contract(usdcABI as any, usdccontractAddress);

    
   const [stateCheck, setStateCheck] = useState(false)
   const [reservevaluetshare, setReserveValueTshare] = useState(0)
   const [reservevaluetshare2, setReserveValueTshare2] = useState(0)
   const [reservevalueusdc, setReserveValueUsdc] = useState(0)
   const [reservevalueusdc2, setReserveValueUsdc2] = useState(0)
   const [slippage1, setSlippage1] = useState(1)
   const [isOn, setIsOn] = useState(false)

   const navigate = useHistory();

  const tokenFunc1 = async(e) => {
    setToekn1(e.target.value);
  
    setAmount1(0)
    setAmount2(0)
      if(e.target.value === 'ftm'){
      if(account!== undefined){
    const ftmBalance = await web3.eth.getBalance(account);
     setBalance1((parseInt(ftmBalance)/(10**18)).toFixed(2));}
    
   } 
  
  }


  const tokenFunc2 = async (e) => {
     setAmount1(0)
     setAmount2(0)
    setToekn2(e.target.value);
    
      if(e.target.value === 'ftm'){
      if(account !== undefined){
    const ftmBalance = await web3.eth.getBalance(account);
     setBalance2((parseInt(ftmBalance)/(10**18)).toFixed(2));
      }
      
     if(e.target.value === 'ftm'){
       setAmount2(0)
     }
   
   
  }else if (e.target.value === 'tshare'){
    if(account !== undefined){
     tshareContract.methods.decimals().call().then( function( info1 ) {
  
      tshareContract.methods.balanceOf((account)).call().then( function( info ) {
        setBalance2(((info/(10**info1)).toFixed(1)));
        });
     
       }); }
       if(e.target.value === 'tshare'){
        setAmount2(0)
      
   
   
  }
  }else if (e.target.value === 'usdc'){
    if(account !== undefined){
     usdcContract.methods.decimals().call().then( function( info1 ) {
  
      usdcContract.methods.balanceOf((account)).call().then( function( info ) {
        setBalance2(((info/(10**info1)).toFixed(1)));
        });
     
       }); }
       if(e.target.value === 'usdc'){
        setAmount2(0)
      
   
   
  }
  }
}

  useEffect(()=>{
 if(account !== undefined){
   initialBalance()
   initialBalance2()
 }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account])

  
  useEffect(() =>{

    const hasSetup = setupNetwork1(250)
        // eslint-disable-next-line react-hooks/exhaustive-deps
       },[])


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

    const tshareAddress = "0x4733bc45eF91cF7CcEcaeeDb794727075fB209F2"
    const usdcAddress = "0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c"

  const tsharejoeContract = new web3.eth.Contract(joePairTshare as any, tshareAddress)

  tsharejoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueTshare(parseInt(info1[1])/parseInt(info1[0])) 
    setReserveValueTshare2(parseInt(info1[0])/parseInt(info1[1])) 
 

}) 

const usdcjoeContract = new web3.eth.Contract(joePairUsdc as any, usdcAddress)
 usdcjoeContract.methods.getReserves().call().then( function( info1 ) {
  setReserveValueUsdc(parseInt((info1[0]*(10**18)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[1]*(10**6)).toLocaleString('fullwide', { useGrouping: false }))) 
   setReserveValueUsdc2(parseInt((info1[1]*(10**6)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[0]*(10**18)).toLocaleString('fullwide', { useGrouping: false })))
 
}) 


    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const initialBalance = async () => {
    if(token1 === "ftm"){
    const ftmBalanceInitial =  await web3.eth.getBalance(account);
           setBalance1((parseInt(ftmBalanceInitial)/(10**18)).toFixed(2));
    } 
  }

  const swapToken = async () => {

    gaEventTracker('swap fantom token')

    if(account === undefined){
      alert("Please Connect Wallet !!")
      return
    }

      
      if(order && token2 === "tshare"){
      const date = Date.now() + 100
  
      const amountFinal = (Math.trunc(swapAmountWithSlippage1*(10**18))).toLocaleString('fullwide', { useGrouping: false });
      const amountOut = (Math.trunc(swapAmountWithSlippage2*(10**18))).toLocaleString('fullwide', { useGrouping: false });
      console.log("amountswap",amountFinal, amountOut)
      const nftTxn = await swapContract.methods.swapExactTokensForETHSupportingFeeOnTransferTokens(amountOut, amountFinal,['0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37','0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83'],account,date).send({from: account});
      if(nftTxn){
        alert("Token Swapped Successfully !")
         initialBalance2()
         initialBalance()
      }else{
        alert("Error in swapping tokens !")
      }
    }
      
     else if(!order && token2 === "tshare"){
        console.log("enterorderfalsetoken1avaxtoken2polar")
        const date = Date.now() + 100
        console.log('date',date)
      
        const amountFinal = (Math.trunc(swapAmountWithSlippage1*(10**18)).toLocaleString('fullwide', { useGrouping: false }));
        const amountOut = (Math.trunc(swapAmountWithSlippage2*(10**18)).toLocaleString('fullwide', { useGrouping: false }));
        console.log("amountswap",amountFinal, amountOut)
        const nftTxn = await swapContract.methods.swapExactETHForTokens(amountOut,['0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83','0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37'],account,date).send({from: account, value: amountFinal});
        if(nftTxn){
         initialBalance()
         initialBalance2()
          alert("Token Swapped Successfully !")
        }else{
          alert("Error in swapping tokens !")
        }

          
      }

      else if(order && token2 === "usdc"){
        const date = Date.now() + 100
    
        const amountFinal = (Math.trunc(swapAmountWithSlippage1*(10**18))).toLocaleString('fullwide', { useGrouping: false });
        const amountOut = (Math.trunc(swapAmountWithSlippage2*(10**6))).toLocaleString('fullwide', { useGrouping: false });
        console.log("amountswap",amountFinal, amountOut)
        const nftTxn = await swapContract.methods.swapExactTokensForETHSupportingFeeOnTransferTokens(amountOut, amountFinal,['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75','0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83'],account,date).send({from: account});
        if(nftTxn){
          alert("Token Swapped Successfully !")
           initialBalance2()
           initialBalance()
        }else{
          alert("Error in swapping tokens !")
        }
      }
        
       else if(!order && token2 === "usdc"){
          console.log("enterorderfalsetoken1avaxtoken2polar")
          const date = Date.now() + 100
          console.log('date',date)
        
          const amountFinal = (Math.trunc(swapAmountWithSlippage1*(10**18)).toLocaleString('fullwide', { useGrouping: false }));
          const amountOut = (Math.trunc(swapAmountWithSlippage2*(10**6)).toLocaleString('fullwide', { useGrouping: false }));
          console.log("amountswap",amountFinal, amountOut)
          const nftTxn = await swapContract.methods.swapExactETHForTokens(amountOut,['0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83','0x04068DA6C83AFCFA0e13ba15A6696662335D5B75'],account,date).send({from: account, value: amountFinal});
          if(nftTxn){
           initialBalance()
           initialBalance2()
            alert("Token Swapped Successfully !")
          }else{
            alert("Error in swapping tokens !")
          }
  
            
        }
          




        
          }
          


  const initialBalance2 = async () => {
    if(token2 === "ftm"){
    const ftmBalanceInitial =  await web3.eth.getBalance(account);
           setBalance1((parseInt(ftmBalanceInitial)/(10**18)).toFixed(2));
    }
     else if(token2 === "tshare"){
      tshareContract.methods.decimals().call().then( function( info1 ) {
  
        tshareContract.methods.balanceOf((account)).call().then( function( info ) {
          setBalance2(((info/(10**info1)).toFixed(1)));
          });
       
         }); 
        } else if(token2 === "usdc"){
          usdcContract.methods.decimals().call().then( function( info1 ) {
      
            usdcContract.methods.balanceOf((account)).call().then( function( info ) {
              setBalance2(((info/(10**info1)).toFixed(1)));
              });
           
             }); 
            }
  }

  
  const maxBalance2 = async () => {
    
        
     if(token2 === "tshare"){
      tshareContract.methods.decimals().call().then( function( info1 ) {
  
        tshareContract.methods.balanceOf((account)).call().then( function( info ) {
         setAmount2((info/(10**info1)-((0.00001*(info/(10**info1)))/100)));
         maxBalanceSwap2((info/(10**info1)-((0.00001*(info/(10**info1)))/100)))
          });
       
         }); 
    } else if(token2 === "usdc"){
      usdcContract.methods.decimals().call().then( function( info1 ) {
  
        usdcContract.methods.balanceOf((account)).call().then( function( info ) {
         setAmount2((info/(10**info1)-((0.00001*(info/(10**info1)))/100)));
         maxBalanceSwap2((info/(10**info1)-((0.00001*(info/(10**info1)))/100)))
          });
       
         }); 
    }
  }


  const maxBalanceSwap1 = async (amountMax) => {
    
   if(!order && token2=== 'tshare'){
      setAmount2((amountMax*reservevaluetshare))
      setSwapAmountWithSlippage2((amountMax-((slippage1/100)*amountMax))*reservevaluetshare)
      setSwapAmountWithSlippage1(amountMax)
      setMinSold(2)
      setMaxSold(5)
    }
    else if(order && token2=== 'tshare'){
      setAmount2((parseFloat(amountMax)*reservevaluetshare))
      setSwapAmountWithSlippage2((parseFloat(amountMax) + ((slippage1/100)*amountMax))*reservevaluetshare)
      setSwapAmountWithSlippage1(amountMax)
      setMinSold(5)
      setMaxSold(2)
    } if(!order && token2=== 'usdc'){
      setAmount2((amountMax*reservevalueusdc))
      setSwapAmountWithSlippage2((amountMax-((slippage1/100)*amountMax))*reservevalueusdc)
      setSwapAmountWithSlippage1(amountMax)
      setMinSold(2)
      setMaxSold(5)
    }
    else if(order && token2=== 'usdc'){
      setAmount2((parseFloat(amountMax)*reservevalueusdc))
      setSwapAmountWithSlippage2((parseFloat(amountMax) + ((slippage1/100)*amountMax))*reservevalueusdc)
      setSwapAmountWithSlippage1(amountMax)
      setMinSold(5)
      setMaxSold(2)
    }

  }

  const maxBalanceSwap2 = (amountMax2) => {

    
    if (!order && token2 === 'tshare'){
      setAmount1((parseFloat(amountMax2)*reservevaluetshare2))
      setSwapAmountWithSlippage1((parseFloat(amountMax2)+((slippage1/100)*amountMax2))*reservevaluetshare2)
      setSwapAmountWithSlippage2(amountMax2)
      setMaxSold(1)
      setMinSold(5)
    }else if (order && token2 === 'tshare'){
      setAmount1((parseFloat(amountMax2)*reservevaluetshare2))
      setSwapAmountWithSlippage1((parseFloat(amountMax2)-((slippage1/100)*amountMax2))*reservevaluetshare2)
      setSwapAmountWithSlippage2(amountMax2)
      setMinSold(1)
      setMaxSold(5)
    } else if (!order && token2 === 'usdc'){
      setAmount1((parseFloat(amountMax2)*reservevalueusdc2))
      setSwapAmountWithSlippage1((parseFloat(amountMax2)+((slippage1/100)*amountMax2))*reservevalueusdc2)
      setSwapAmountWithSlippage2(amountMax2)
      setMaxSold(1)
      setMinSold(5)
    }else if (order && token2 === 'usdc'){
      setAmount1((parseFloat(amountMax2)*reservevalueusdc2))
      setSwapAmountWithSlippage1((parseFloat(amountMax2)-((slippage1/100)*amountMax2))*reservevalueusdc2)
      setSwapAmountWithSlippage2(amountMax2)
      setMinSold(1)
      setMaxSold(5)
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

    const approveToken = (e) => {
        console.log("approve")
        setStateCheck(true)
      }

  const getTokenImage = (token) => {
    let element
    switch(token) {
      
      case "tshare":
        element = (<div className='d-flex flex-row align-items-center' style={{ gap: '4px' }}>
                  <img src='images/home/tshare-t.png' width='25px' alt='tshare' />
                  <div style={{ color: 'white' }}>tshare</div>
                </div>)
        break;
        case "usdc":
          element = (<div className='d-flex flex-row align-items-center' style={{ gap: '4px' }}>
                    <img src='images/home/usdc-logo.png' width='25px' alt='tshare' />
                    <div style={{ color: 'white' }}>usdc</div>
                  </div>)
          break;
      default:
        <></>
        // code block
    }
    return element

  }

  const getMaxBalance = async (token) => {

    if(token==='ftm'){
      if(account!== undefined){
        const avaxBalance = await web3.eth.getBalance(account);
        const intBalance = (parseInt(avaxBalance)/(10**18))
         setAmount1(intBalance) 
         maxBalanceSwap1(intBalance)
       
        }
    } else {

        maxBalance2()
      
      
    }        
  }  
  return (
    <>    
<BiggerCards>
      <AppBody>
        <AppHeader title='Swap' subtitle='Fantom Smart Swap' setSlippage={setSlippage} />
        <StyledCardBody>
          {/* -----------------  Input Token Amount & Select Token Type _ Tag1 ---------------------- */}
          
          <div className='d-flex flex-row justify-content-between ' style={{width: "90%"}}>
           <div style={{ color: 'white', fontSize: '14px', marginLeft: '1px !important', textAlign: 'left', paddingTop: "2.8%" }}>Slippage percentage - {slippage}%</div>
           <div className='d-flex flex-row justify-content-between'style={{marginRight: "10%"}} >
           <div style={{ color: 'white', fontSize: '11px', paddingTop: "15%"}}>auto Slippage</div>
           <div style={{ width: "5px", marginTop: "0px" }}> <ToggleButtonAC onClick={() => setIsOn(!isOn)} /></div>           
           </div>
           </div>
           <InputStyle style={{ order: `${order ? 3 : 1}` }}>
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex flex-row align-items-center' style={{ gap: '4px' }}>
                  <img src='images/home/ftm-logo-t.png' width='25px' alt='avax' />
                  <div style={{ color: 'white' }}>ftm</div>
                </div> 
              
              <div style={{ color: 'white' }}>balance: {balance1}</div>
            </div>

            <div className='d-flex flex-row align-items-center' style={{ gap: '4px', marginTop: '8px' }}>
             
            <div className="buttonIn">
        <input className="input1" type="text" id="enter" onChange={amountChange1} value={amount1} placeholder='amount'/>
        {!order && (
        <button className="button1" id="clear" type="button" onClick={() => {getMaxBalance(token1)}}>max</button>)}
    </div>
              <SelectStyle onChange={tokenFunc1} id='select1'>
               
                <option value="ftm">ftm</option>
              
               
              </SelectStyle>
            </div>
          </InputStyle>

          {/* -----------------  Exchange Token1 and Token2 _ Button ---------------------- */}
          <StyledButton2 onClick={() => {
             setOrder(!order)
             setAmount1(0)
             setAmount2(0)
            }  }>
            <img src='images/switch.png' width='18px' alt='tokenSwitch' />
          </StyledButton2>

          {/* -----------------  Input Token Amount & Select Token Type _ Tag2 ---------------------- */}
          <InputStyle style={{ order: `${order ? 1 : 3}` }}>
          <div className='d-flex flex-row justify-content-between align-items-center'>
             {getTokenImage(token2)}
           
              <div style={{ color: 'white' }}>balance: {balance2}</div>
            
            </div>

            <div className='d-flex flex-row align-items-center' style={{ gap: '4px', marginTop: '8px' }}>
            <div className="buttonIn">
        <input className="input1" type="text" placeholder='amount' id='nameToBuyNode1' value={amount2} onChange={amountChange2}/>
        {order && (
        <button className="button1" id="max2" type="button" onClick={() => {getMaxBalance(token2)}}>max</button>)}</div>
              <SelectStyle1 onChange={tokenFunc2} id='select2'>
              <option value="usdc">USDC</option>
              <option value="tshare">TSHARE</option>
             
              </SelectStyle1>
            </div>
          </InputStyle>
          {/* <div style={{ color: 'white', fontSize: '18px', marginTop: '20px', order: 4 }}>.005 AVAX Per TX + Gas</div> */}
          {minSold === 1 && (amount2 >0) && swapAmountWithSlippage1 && (
          <div style={{ color: 'white', fontSize: '12px', marginTop: '20px', order: 4 }}>Minimum Received: {swapAmountWithSlippage1}</div> )}
           {maxSold === 1 && (amount2 >0) && swapAmountWithSlippage1 && (
          <div style={{ color: 'white', fontSize: '12px', marginTop: '20px', order: 4 }}>Maximum Sold: {swapAmountWithSlippage1}</div>)}
           { minSold === 2 &&  (amount1>0) &&  swapAmountWithSlippage2  && (
          <div style={{ color: 'white', fontSize: '12px', marginTop: '20px', order: 4 }}>Minimum Received: {swapAmountWithSlippage2}</div> )}
           {maxSold === 2 && (amount1 >0) && swapAmountWithSlippage2 && (
          <div style={{ color: 'white', fontSize: '12px', marginTop: '20px', order: 4 }}>Maximum Sold: {swapAmountWithSlippage2}</div>)}
        
          <StyledButton onClick={swapToken}>SWAP</StyledButton>
        </StyledCardBody>

      </AppBody>

      </BiggerCards>
    </>
  )
}

export default ExchangeBinance