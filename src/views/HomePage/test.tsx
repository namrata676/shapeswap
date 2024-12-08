import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import {useHistory} from "react-router-dom"
import Web3 from "web3";
import "./Exchange.css"
import axios from 'axios'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, useModal } from 'toolkit/uikit'
import { CardBody } from 'uikit'
import useAnalyticsEventTracker from '../../components/useAnalyticsEventTracker';
import { AppHeader, AppBody } from '../../components/App'
import { setupNetwork2 } from '../../utils/wallet'
import { getTokenImage } from './avalancheutils';
import ToggleButtonAC from '../Home/components/ToggleButtonAC'
import CoinsModal from '../coinsModal/CoinsModal'
import { avalancheList } from './ListAvalancheData'
import { polarcontractAddress, polarABI, joePairPolar} from '../../Abi/avalancheSwap/polarConfig'
import { thorcontractAddress, thorABI, joePairThor} from '../../Abi/avalancheSwap/thorConfig'
import { nebucontractAddress, nebuABI, joePairNebu} from '../../Abi/avalancheSwap/nebulaConfig'
import { gorillacontractAddress, gorillaABI, joePairGorilla} from '../../Abi/avalancheSwap/gorillaConfig'
import { zeuscontractAddress, zeusABI, joePairZeus} from '../../Abi/avalancheSwap/zeusConfig'
import { usdccontractAddress, usdcABI, joePairUsdc} from '../../Abi/avalancheSwap/usdcConfig'
import { smrtcontractAddress, smrtABI, joePairSmrt} from '../../Abi/avalancheSwap/smrtConfig'
import { apecontractAddress, apeABI, joePairApe} from '../../Abi/avalancheSwap/apeConfig'
import { corkcontractAddress, corkABI, joePairCork} from '../../Abi/avalancheSwap/corkConfig'
import { cracontractAddress, craABI, joePairCra} from '../../Abi/avalancheSwap/craConfig'
import { crndcontractAddress, crndABI, joePairCrnd} from '../../Abi/avalancheSwap/crndConfig'
import { emcontractAddress, emABI, joePairEm} from '../../Abi/avalancheSwap/emConfig'
import { firecontractAddress, fireABI, joePairFire} from '../../Abi/avalancheSwap/fireConfig'
import { gdsycontractAddress, gdsyABI, joePairGdsy} from '../../Abi/avalancheSwap/gdsyConfig'
import { joecontractAddress, joeABI, joePairJoe} from '../../Abi/avalancheSwap/joeConfig'
import { playmatescontractAddress, playmatesABI, joePairPlaymates} from '../../Abi/avalancheSwap/playmatesConfig'
import { pxtcontractAddress, pxtABI, joePairPxt} from '../../Abi/avalancheSwap/pxtConfig'
import { reactcontractAddress, reactABI, joePairReact} from '../../Abi/avalancheSwap/reactConfig'
import { rloopcontractAddress, rloopABI, joePairRloop} from '../../Abi/avalancheSwap/rloopConfig'
import { stormzv2contractAddress, stormzv2ABI, joePairStormzv2} from '../../Abi/avalancheSwap/stormzv2Config'
import { timecontractAddress, timeABI, joePairTime} from '../../Abi/avalancheSwap/timeConfig'
import { tuscontractAddress, tusABI, joePairTus} from '../../Abi/avalancheSwap/tusConfig'
import { usdcecontractAddress, usdceABI, joePairUsdce} from '../../Abi/avalancheSwap/usdceConfig'
import { vpndcontractAddress, vpndABI, joePairVpnd} from '../../Abi/avalancheSwap/vpndConfig'
import { wethecontractAddress, wetheABI, joePairWethe} from '../../Abi/avalancheSwap/wetheConfig'
import { bnbcontractAddress, bnbABI, joePairBnb} from '../../Abi/avalancheSwap/bnbConfig'
import { gmxcontractAddress, gmxABI, joePairGmx} from '../../Abi/avalancheSwap/gmxConfig'
import { linkecontractAddress, linkeABI, joePairLinke} from '../../Abi/avalancheSwap/linkeConfig'
import { mnodecontractAddress, mnodeABI, joePairMnode} from '../../Abi/avalancheSwap/mnodeConfig'
import { ptpcontractAddress, ptpABI, joePairPtp} from '../../Abi/avalancheSwap/ptpConfig'
import { vtxcontractAddress, vtxABI, joePairVtx} from '../../Abi/avalancheSwap/vtxConfig'
import { yeticontractAddress, yetiABI, joePairYeti} from '../../Abi/avalancheSwap/yetiConfig'


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
  color: #8E44AD;
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
  color: #8E44AD;
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


const StyledImage = styled.img`  
  width: 30%;
`

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

const BiggerCards = styled(Cards)`
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
      font-size: 1.5em;
      border-radius:80px;
      margin-left: 30%;
      margin-top: 55px;
      max-width: 525px;      
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
    }
  }
`
const Exchange = () => {
  const [token1, setToekn1] = useState('avax');
  const [token2, setToekn2] = useState('usdc');
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [balance1, setBalance1] = useState('0')
  const [balance2, setBalance2] = useState('0')
  const [order, setOrder] = useState(false);
  const { account } = useWeb3React()
  
  const [slippage, setSlippage] = useState(1)
  const [slippage1, setSlippage1] = useState(1)
  const [maxSold, setMaxSold] = useState(5)
  const [minSold, setMinSold] = useState(5)


  const contractAbi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WAVAX","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WAVAX","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAXSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapAVAXForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAXSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
  
    const gaEventTracker = useAnalyticsEventTracker('swap');
    const contractAddress = "0x60aE616a2155Ee3d9A68541Ba4544862310933d4"
  
    const web3 = new Web3(window.ethereum as any)
  
    const smnContract = new web3.eth.Contract(smrtABI as any, smrtcontractAddress);
    const swapContract = new web3.eth.Contract(contractAbi as any, contractAddress);
    const polarContract = new web3.eth.Contract(polarABI as any, polarcontractAddress);
    const apeContract = new web3.eth.Contract(apeABI as any, apecontractAddress);
    const thorContract = new web3.eth.Contract(thorABI as any, thorcontractAddress);
    const nebuContract = new web3.eth.Contract(nebuABI as any, nebucontractAddress);
    const gorillaContract = new web3.eth.Contract(gorillaABI as any, gorillacontractAddress);
    const zeusContract = new web3.eth.Contract(zeusABI as any, zeuscontractAddress);
    const corkContract = new web3.eth.Contract(corkABI as any, corkcontractAddress);
    const craContract = new web3.eth.Contract(craABI as any, cracontractAddress);
    const crndContract = new web3.eth.Contract(crndABI as any, crndcontractAddress);
    const emContract = new web3.eth.Contract(emABI as any, emcontractAddress);
    const fireContract = new web3.eth.Contract(fireABI as any, firecontractAddress);
    const gdsyContract = new web3.eth.Contract(gdsyABI as any, gdsycontractAddress);
    const joeContract = new web3.eth.Contract(joeABI as any, joecontractAddress);
    const playmatesContract = new web3.eth.Contract(playmatesABI as any, playmatescontractAddress);
    const pxtContract = new web3.eth.Contract(pxtABI as any, pxtcontractAddress);
    const reactContract = new web3.eth.Contract(reactABI as any, reactcontractAddress);
    const rloopContract = new web3.eth.Contract(rloopABI as any, rloopcontractAddress);
    const stormzv2Contract = new web3.eth.Contract(stormzv2ABI as any, stormzv2contractAddress);
    const timeContract = new web3.eth.Contract(timeABI as any, timecontractAddress);
    const tusContract = new web3.eth.Contract(tusABI as any, tuscontractAddress);
    const usdceContract = new web3.eth.Contract(usdceABI as any, usdcecontractAddress);
    const wetheContract = new web3.eth.Contract(wetheABI as any, wethecontractAddress);
    const vpndContract = new web3.eth.Contract(vpndABI as any, vpndcontractAddress);
    const usdcContract = new web3.eth.Contract(usdcABI as any, usdccontractAddress);
    const bnbContract = new web3.eth.Contract(bnbABI as any, bnbcontractAddress);
    const gmxContract = new web3.eth.Contract(gmxABI as any, gmxcontractAddress);
    const linkeContract = new web3.eth.Contract(linkeABI as any, linkecontractAddress);
    const mnodeContract = new web3.eth.Contract(mnodeABI as any, mnodecontractAddress);
    const ptpContract = new web3.eth.Contract(ptpABI as any, ptpcontractAddress);
    const vtxContract = new web3.eth.Contract(vtxABI as any, vtxcontractAddress);
    const yetiContract = new web3.eth.Contract(yetiABI as any, yeticontractAddress);

  
   const [reservevaluepolar, setReserveValuePolar] = useState(0)
   const [reservevaluepolar2, setReserveValuePolar2] = useState(0)
   const [reservevaluethor2, setReserveValueThor2] = useState(0)
   const [reservevaluethor, setReserveValueThor] = useState(0)
   const [reservevaluenebu2, setReserveValueNebu2] = useState(0)
   const [reservevaluenebu, setReserveValueNebu] = useState(0)
   const [reservevaluegorilla2, setReserveValueGorilla2] = useState(0)
   const [reservevaluegorilla, setReserveValueGorilla] = useState(0)
   const [reservevalueape2, setReserveValueApe2] = useState(0)
   const [reservevalueape, setReserveValueApe] = useState(0)
   const [reservevaluecork2, setReserveValueCork2] = useState(0)
   const [reservevaluecork, setReserveValueCork] = useState(0)
   const [reservevaluecra2, setReserveValueCra2] = useState(0)
   const [reservevaluecra, setReserveValueCra] = useState(0)
   const [reservevaluecrnd2, setReserveValueCrnd2] = useState(0)
   const [reservevaluecrnd, setReserveValueCrnd] = useState(0)
   const [reservevalueEm2, setReserveValueEm2] = useState(0)
   const [reservevalueEm, setReserveValueEm] = useState(0)
   const [reservevaluefire2, setReserveValueFire2] = useState(0)
   const [reservevaluefire, setReserveValueFire] = useState(0)
   const [reservevaluegdsy2, setReserveValueGdsy2] = useState(0)
   const [reservevaluegdsy, setReserveValueGdsy] = useState(0)
   const [reservevaluejoe2, setReserveValueJoe2] = useState(0)
   const [reservevaluejoe, setReserveValueJoe] = useState(0)
   const [reservevalueplaymates2, setReserveValuePlaymates2] = useState(0)
   const [reservevalueplaymates, setReserveValuePlaymates] = useState(0)
   const [reservevaluepxt2, setReserveValuePxt2] = useState(0)
   const [reservevaluepxt, setReserveValuePxt] = useState(0)
   const [reservevaluereact2, setReserveValueReact2] = useState(0)
   const [reservevaluereact, setReserveValueReact] = useState(0)
   const [reservevaluerloop2, setReserveValueRloop2] = useState(0)
   const [reservevaluerloop, setReserveValueRloop] = useState(0)
   const [reservevaluestormzv22, setReserveValueStormzv22] = useState(0)
   const [reservevaluestormzv2, setReserveValueStormzv2] = useState(0)
   const [reservevaluetime2, setReserveValueTime2] = useState(0)
   const [reservevaluetime, setReserveValueTime] = useState(0)
   const [reservevaluetus2, setReserveValueTus2] = useState(0)
   const [reservevaluetus, setReserveValueTus] = useState(0)
   const [reservevalueusdce2, setReserveValueUsdce2] = useState(0)
   const [reservevalueusdce, setReserveValueUsdce] = useState(0)
   const [reservevaluevpnd2, setReserveValueVpnd2] = useState(0)
   const [reservevaluevpnd, setReserveValueVpnd] = useState(0)
   const [reservevaluewethe2, setReserveValueWethe2] = useState(0)
   const [reservevaluewethe, setReserveValueWethe] = useState(0)
   const [reservevaluezeus2, setReserveValueZeus2] = useState(0)
   const [reservevaluezeus, setReserveValueZeus] = useState(0)
   const [reservevalueusdc2, setReserveValueUsdc2] = useState(0)
   const [reservevalueusdc, setReserveValueUsdc] = useState(0)
   const [reservevaluesmrt, setReserveValueSmrt] = useState(0)
   const [reservevaluesmrt2, setReserveValueSmrt2] = useState(0)
   const [reservevaluebnb2, setReserveValueBnb2] = useState(0)
   const [reservevaluebnb, setReserveValueBnb] = useState(0)
   const [reservevaluegmx2, setReserveValueGmx2] = useState(0)
   const [reservevaluegmx, setReserveValueGmx] = useState(0)
   const [reservevaluelinke2, setReserveValueLinke2] = useState(0)
   const [reservevaluelinke, setReserveValueLinke] = useState(0)
   const [reservevaluemnode2, setReserveValueMnode2] = useState(0)
   const [reservevaluemnode, setReserveValueMnode] = useState(0)
   const [reservevalueptp2, setReserveValuePtp2] = useState(0)
   const [reservevalueptp, setReserveValuePtp] = useState(0)
   const [reservevaluevtx2, setReserveValueVtx2] = useState(0)
   const [reservevaluevtx, setReserveValuevtx] = useState(0)
   const [reservevalueyeti, setReserveValueYeti] = useState(0)
   const [reservevalueyeti2, setReserveValueYeti2] = useState(0)
   const [swapAmountWithSlippage1, setSwapAmountWithSlippage1] = useState(0)
   const [swapAmountWithSlippage2, setSwapAmountWithSlippage2] = useState(0)
   const [isOn, setIsOn] = useState(false)
   const [currentCA1, setCurrentCA1] = useState({})
   const [currentCA2, setCurrentCA2] = useState({})
   const [decimals, setDecimals] = useState(0)
   const [searchedToken, setSearchedToken] = useState('')


   const getContract = (token) =>{
    let element
    switch(token) {
      case "usdc":
        element =  { "currContract" : usdcContract, "currContractAddress": usdccontractAddress }
        break;
      case "polar":
        element = { "currContract" : polarContract, "currContractAddress" : polarcontractAddress }
        break; 
        case "nebu":
          element = { "currContract" : nebuContract, "currContractAddress" : nebucontractAddress }
          break;      
        case "zeus":
          element =  { "currContract" : zeusContract, "currContractAddress" : zeuscontractAddress }
          break; 
        case "smrt":
          element = { "currContract" : smnContract, "currContractAddress" : smrtcontractAddress }
            break;
         case "gorilla":
           element = { "currContract" : gorillaContract, "currContractAddress" : gorillacontractAddress }
             break;  
          case "thor":
              element = { "currContract" : thorContract, "currContractAddress" : thorcontractAddress }
                break;
                case "ape":
              element = { "currContract" : apeContract, "currContractAddress" : apecontractAddress }
                break;
                case "cork":
              element = { "currContract" : corkContract, "currContractAddress" : corkcontractAddress }
                break;
                case "cra":
              element = { "currContract" : craContract, "currContractAddress" : cracontractAddress }
                break;
                case "crnd":
              element = { "currContract" : crndContract, "currContractAddress" : crndcontractAddress }
                break;
                case "em":
              element = { "currContract" : emContract, "currContractAddress" : emcontractAddress }
                break;
                case "fire":
              element = { "currContract" : fireContract, "currContractAddress" : firecontractAddress }
                break;
                case "gdsy":
              element = { "currContract" : gdsyContract, "currContractAddress" : gdsycontractAddress }
                break;
                case "joe":
              element = { "currContract" : joeContract, "currContractAddress" : joecontractAddress }
                break;
                case "playmates":
              element = { "currContract" : playmatesContract, "currContractAddress" : playmatescontractAddress }
                break;
                case "pxt":
              element = { "currContract" : pxtContract, "currContractAddress" : pxtcontractAddress }
                break;
                case "react":
              element = { "currContract" : reactContract, "currContractAddress" : reactcontractAddress }
                break;
                case "rloop":
              element = { "currContract" : rloopContract, "currContractAddress" : rloopcontractAddress }
                break;
                case "stormzv2":
              element = { "currContract" : stormzv2Contract, "currContractAddress" : stormzv2contractAddress }
                break;
                case "time":
              element = { "currContract" : timeContract, "currContractAddress" : timecontractAddress }
                break;
                case "tus":
              element = { "currContract" : tusContract, "currContractAddress" : tuscontractAddress }
                break;
                case "usdce":
              element = { "currContract" : usdceContract, "currContractAddress" : usdcecontractAddress }
                break;
                case "vpnd":
              element = { "currContract" : vpndContract, "currContractAddress" : vpndcontractAddress }
                break;
                case "wethe":
              element = { "currContract" : wetheContract, "currContractAddress" : wethecontractAddress }
                break;
                case "bnb":
              element = { "currContract" : bnbContract, "currContractAddress" : bnbcontractAddress }
                break;
                case "gmx":
              element = { "currContract" : gmxContract, "currContractAddress" : gmxcontractAddress }
                break;
                case "linke":
              element = { "currContract" : linkeContract, "currContractAddress" : linkecontractAddress }
                break;
                case "mnode":
              element = { "currContract" : mnodeContract, "currContractAddress" : mnodecontractAddress }
                break;
                case "ptp":
              element = { "currContract" : ptpContract, "currContractAddress" : ptpcontractAddress }
                break;
                case "vtx":
              element = { "currContract" : vtxContract, "currContractAddress" : vtxcontractAddress }
                break;
                case "yeti":
              element = { "currContract" : yetiContract, "currContractAddress" : yeticontractAddress }
                break;
      default:
        <></>
        // code block
    }
    return element

  } 

  const getReserveValue = (token) =>{
    let element
    switch(token) {
      case "usdc":
        element =  { "reservevalue" : reservevalueusdc, "reservevalue2": reservevalueusdc2 }
        break;
      case "smrt":
        element =  { "reservevalue" : reservevaluesmrt, "reservevalue2": reservevaluesmrt2 }
        break;    
        case "polar":
          element =  { "reservevalue" : reservevaluepolar, "reservevalue2": reservevaluepolar2 }
          break;   
        case "nebu":
            element =  { "reservevalue" : reservevaluenebu, "reservevalue2": reservevaluenebu2 }
            break;
        case "zeus":
          element =  { "reservevalue" : reservevaluezeus, "reservevalue2": reservevaluezeus2 }
          break;
          case "thor":
            element =  { "reservevalue" : reservevaluethor, "reservevalue2": reservevaluethor2 }
            break;
        case "gorilla":
         element =  { "reservevalue" : reservevaluegorilla, "reservevalue2": reservevaluegorilla2 }
          break;
          case "ape":
         element =  { "reservevalue" : reservevalueape, "reservevalue2": reservevalueape2 }
          break;
          case "cork":
         element =  { "reservevalue" : reservevaluecork, "reservevalue2": reservevaluecork2 }
          break;
          case "cra":
         element =  { "reservevalue" : reservevaluecra, "reservevalue2": reservevaluecra2 }
          break;
          case "crnd":
         element =  { "reservevalue" : reservevaluecrnd, "reservevalue2": reservevaluecrnd2 }
          break;
          case "em":
         element =  { "reservevalue" : reservevalueEm, "reservevalue2": reservevalueEm2 }
          break;
          case "fire":
         element =  { "reservevalue" : reservevaluefire, "reservevalue2": reservevaluefire2 }
          break;
          case "gdsy":
         element =  { "reservevalue" : reservevaluegdsy, "reservevalue2": reservevaluegdsy2 }
          break;
          case "joe":
         element =  { "reservevalue" : reservevaluejoe, "reservevalue2": reservevaluejoe2 }
          break;
          case "playmates":
         element =  { "reservevalue" : reservevalueplaymates, "reservevalue2": reservevalueplaymates2 }
          break;
          case "pxt":
         element =  { "reservevalue" : reservevaluepxt, "reservevalue2": reservevaluepxt2 }
          break;
          case "react":
         element =  { "reservevalue" : reservevaluereact, "reservevalue2": reservevaluereact2 }
          break;
          case "rloop":
         element =  { "reservevalue" : reservevaluerloop, "reservevalue2": reservevaluerloop2 }
          break;
          case "stormzv2":
         element =  { "reservevalue" : reservevaluestormzv2, "reservevalue2": reservevaluestormzv22 }
          break;
          case "time":
         element =  { "reservevalue" : reservevaluetime, "reservevalue2": reservevaluetime2 }
          break;
          case "tus":
         element =  { "reservevalue" : reservevaluetus, "reservevalue2": reservevaluetus2 }
          break;
          case "usdce":
         element =  { "reservevalue" : reservevalueusdce, "reservevalue2": reservevalueusdce2 }
          break;
          case "vpnd":
         element =  { "reservevalue" : reservevaluevpnd, "reservevalue2": reservevaluevpnd2 }
          break;
          case "wethe":
         element =  { "reservevalue" : reservevaluewethe, "reservevalue2": reservevaluewethe2 }
          break;
          case "bnb":
         element =  { "reservevalue" : reservevaluebnb, "reservevalue2": reservevaluebnb2 }
          break;
          case "gmx":
         element =  { "reservevalue" : reservevaluegmx, "reservevalue2": reservevaluegmx2 }
          break;
          case "linke":
         element =  { "reservevalue" : reservevaluelinke, "reservevalue2": reservevaluelinke2 }
          break;
          case "mnode":
         element =  { "reservevalue" : reservevaluemnode, "reservevalue2": reservevaluemnode2 }
          break;
          case "ptp":
         element =  { "reservevalue" : reservevalueptp, "reservevalue2": reservevalueptp2 }
          break;
          case "vtx":
         element =  { "reservevalue" : reservevaluevtx, "reservevalue2": reservevaluevtx2 }
          break;
          case "yeti":
         element =  { "reservevalue" : reservevalueyeti, "reservevalue2": reservevalueyeti2 }
          break;
      default:
        <></>
        // code block
    }
    return element

  }


  const headers = {
    cookie: "_ga=GA1.1.779804013.1647288289; amp_fef1e8=a2215a78-c481-4636-9867-d99abd104641R...1g2agao41.1g2agaoiq.1.1.2; ext_name=ojplmecpdpgccookcobabopnaifgidhf; _ga_C1SPFHLNGZ=GS1.1.1654101722.47.1.1654103125.0; __cf_bm=uXuDw7lpjd.5TvlB5LNf8LxPaM8ffam94fHd5mMvoCA-1654105168-0-AQ8n+ASE6mUpGmhiFqQPeY7p6nL2vZgerkkyth/pX2+xXINblYZ1ohhU1O1dAJzDByEat0EGEYAMxVuhFajl57g=; __cflb=0H28vzQ7jjUXq92cxrPT9BmcvbXDKiKMHomNEvT4G5K"
  }
  
  const getdexApi =  () => {
   // var dexscreenerApi = require("dexscreener-api")
   // const searchResponse = await searchPairsMatchingQuery("WBNB USDC");
  
   /* axios.get(`https://api.dexscreener.io/latest/dex/pairs/bsc/0xbA2aE424d960c26247Dd6c32edC70B295c744C43`)
      .then(res => {
      console.log("response",res)
      }) */


      // https://api.dexscreener.com/latest/dex/tokens/0x490bf3ABcAb1fB5c88533d850F2a8d6D38298465

      axios.get(`https://api.dexscreener.com/latest/dex/tokens/${searchedToken}`)
      .then(res => {
      console.log("response",res)
      })

    console.log("searchResponse")
  }

  useEffect(()=>{
    getdexApi()

      // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])


  

   const navigate = useHistory();
 
  const tokenFunc1 = async(tokenSelected) => {

    setToekn1(tokenSelected);
    setAmount1(0)
    setAmount2(0)
    

    if(account !== undefined){
      if(tokenSelected !== "avax"){

    const currContractInfo = getContract(tokenSelected)
   const currentContract = currContractInfo?.currContract
   const currentContractAddress = currContractInfo?.currContractAddress
     currentContract.methods.decimals().call().then( function( info1 ) {
  
      currentContract.methods.balanceOf((account)).call().then( function( info ) {
        setBalance1(((info/(10**info1)).toFixed(1)));
        setAmount1(0)
        setDecimals(info1)
        setCurrentCA1(currentContractAddress)
        });
     
       }); 
      } else {
        const avaxBalance = await web3.eth.getBalance(account);
        setBalance1((parseInt(avaxBalance)/(10**18)).toFixed(2));
        setCurrentCA1("0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7")
      }
    
   }}

  const tokenFunc2 = async (tokenSelected) => {
     setAmount1(0)
     setAmount2(0)
    setToekn2(tokenSelected);
    if(account !== undefined){
    if(tokenSelected !== "avax"){
   const currContractInfo = getContract(tokenSelected)
   const currentContract = currContractInfo?.currContract
   const currentContractAddress = currContractInfo?.currContractAddress

     currentContract.methods.decimals().call().then( function( info1 ) {
  
      currentContract.methods.balanceOf((account)).call().then( function( info ) {
        setBalance2(((info/(10**info1)).toFixed(1)));
        setAmount2(0)
        setDecimals(info1)
        setCurrentCA2(currentContractAddress)
        });
     
       }); 
      }else {
        const avaxBalance = await web3.eth.getBalance(account);
        setBalance2((parseInt(avaxBalance)/(10**18)).toFixed(2));
        setCurrentCA2("0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7")
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
  setupNetwork2()
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
    smnContract.methods.joePair().call().then( function( info ) {
         
      const smnjoeContract = new web3.eth.Contract(joePairSmrt as any, info)
      smnjoeContract.methods.getReserves().call().then( function( info1 ) {
        setReserveValueSmrt(parseInt(info1[0])/parseInt(info1[1])) 
        setReserveValueSmrt2(parseInt(info1[1])/parseInt(info1[0]))     
     })
 })

 polarContract.methods.uniswapV2Pair().call().then( function( info ) {        
  const polarjoeContract = new web3.eth.Contract(joePairPolar as any, info)
  polarjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValuePolar(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValuePolar2(parseInt(info1[1])/parseInt(info1[0])) 
 })
})


thorContract.methods.uniswapV2Pair().call().then( function( info ) {          
  const thorjoeContract = new web3.eth.Contract(joePairThor as any, info)
  thorjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueThor(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueThor2(parseInt(info1[1])/parseInt(info1[0])) 
 })
})

nebuContract.methods.joePair().call().then( function( info ) {         
  const nebujoeContract = new web3.eth.Contract(joePairNebu as any, info)
  nebujoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueNebu(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueNebu2(parseInt(info1[1])/parseInt(info1[0]))  
 })
})

  const bnbjoeContract = new web3.eth.Contract(joePairBnb as any, '0xeb8eB6300c53C3AddBb7382Ff6c6FbC4165B0742')
  bnbjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueNebu(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueNebu2(parseInt(info1[1])/parseInt(info1[0]))  
 
})

  const gmxjoeContract = new web3.eth.Contract(joePairGmx as any, '0x0c91a070f862666bBcce281346BE45766d874D98')
  gmxjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueNebu(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueNebu2(parseInt(info1[1])/parseInt(info1[0]))  
 
})

  const linkejoeContract = new web3.eth.Contract(joePairLinke as any, '0x6F3a0C89f611Ef5dC9d96650324ac633D02265D3')
  linkejoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueNebu(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueNebu2(parseInt(info1[1])/parseInt(info1[0]))  
 
})

  const mnodejoeContract = new web3.eth.Contract(joePairMnode as any, '0x8D289dB84D37E71f3168caC37c171A4564923328')
  mnodejoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueNebu(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueNebu2(parseInt(info1[1])/parseInt(info1[0]))  
 
})

  const ptpjoeContract = new web3.eth.Contract(joePairPtp as any, '0xCDFD91eEa657cc2701117fe9711C9a4F61FEED23')
  ptpjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueNebu(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueNebu2(parseInt(info1[1])/parseInt(info1[0]))  
 
})
        
  const vtxjoeContract = new web3.eth.Contract(joePairVtx as any, '0x9EF0C12b787F90F59cBBE0b611B82D30CAB92929')
  vtxjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueNebu(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueNebu2(parseInt(info1[1])/parseInt(info1[0]))  

})
        
  const yetijoeContract = new web3.eth.Contract(joePairYeti as any, '0xbdc7EF37283BC67D50886c4afb64877E3e83f869')
  yetijoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueNebu(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueNebu2(parseInt(info1[1])/parseInt(info1[0]))  
 
})

  const corkjoeContract = new web3.eth.Contract(joePairCork as any, '0xd998abDE980A54CC594078Fd280e6Ea29059ED73')
  corkjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueCork(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueCork2(parseInt(info1[1])/parseInt(info1[0])) 
 
})
       
  const crajoeContract = new web3.eth.Contract(joePairCra as any, '0x140CAc5f0e05cBEc857e65353839FddD0D8482C1')
  crajoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueCra(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueCra2(parseInt(info1[1])/parseInt(info1[0])) 
 
})
    
  const crndjoeContract = new web3.eth.Contract(joePairCrnd as any, '0x98d0bDF8745e672A6E2120c492b084230e958304')
  crndjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueCrnd(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueCrnd2(parseInt(info1[1])/parseInt(info1[0])) 
 
})
 
  const emjoeContract = new web3.eth.Contract(joePairEm as any, '0x1673B86B6F26a121F47a2ae60ab534af78c26C18')
  emjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueEm(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueEm2(parseInt(info1[1])/parseInt(info1[0])) 
 
})

  const firejoeContract = new web3.eth.Contract(joePairFire as any, '0xc71fA9D143ad905eE73B6EDB4cd44df427df1Fe7')
  firejoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueFire(parseInt(info1[1])/parseInt(info1[0])) 
    setReserveValueFire2(parseInt(info1[0])/parseInt(info1[1])) 
 
})

  const gdsyjoeContract = new web3.eth.Contract(joePairGdsy as any, '0xB5b28965c1b25f75D212E29F5f7d84D1A7caCE59')
  gdsyjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueGdsy(parseInt(info1[1])/parseInt(info1[0])) 
    setReserveValueGdsy2(parseInt(info1[0])/parseInt(info1[1])) 
 
})

  const joejoeContract = new web3.eth.Contract(joePairJoe as any, '0x454E67025631C065d3cFAD6d71E6892f74487a15')
  joejoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueJoe(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueJoe2(parseInt(info1[1])/parseInt(info1[0])) 
 
})

  const playmatesjoeContract = new web3.eth.Contract(joePairPlaymates as any, '0xFd17C7a2E1EEe2EE2a308E43BDFbAC4dF135c5Cd')
  playmatesjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValuePlaymates(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValuePlaymates2(parseInt(info1[1])/parseInt(info1[0])) 
 
})

  const pxtjoeContract = new web3.eth.Contract(joePairPxt as any, '0xf17A02640E399E01Ee4A197ba101e0DF14e60A98')
  pxtjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValuePxt(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValuePxt2(parseInt(info1[1])/parseInt(info1[0])) 

})

  const reactjoeContract = new web3.eth.Contract(joePairReact as any, '0x580436EcABa01815711AA4A191c4405c73DDF829')
  reactjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueReact(parseInt(info1[1])/parseInt(info1[0])) 
    setReserveValueReact2(parseInt(info1[0])/parseInt(info1[1])) 
 
})

  const rloopjoeContract = new web3.eth.Contract(joePairRloop as any, '0x6D4bdefe5b4644AfF3617ed7CE2b7599E56fA135')
  rloopjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueRloop(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueRloop2(parseInt(info1[1])/parseInt(info1[0])) 
 
})

  const stormzv2joeContract = new web3.eth.Contract(joePairStormzv2 as any, '0x568c3e822FB350843eF0970c3a7F2a23a0CBF648')
  stormzv2joeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueStormzv2(parseInt(info1[1])/parseInt(info1[0])) 
    setReserveValueStormzv22(parseInt(info1[0])/parseInt(info1[1])) 
 
})

  const timejoeContract = new web3.eth.Contract(joePairTime as any, '0xf64e1c5B6E17031f5504481Ac8145F4c3eab4917')
  timejoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueTime(parseInt(info1[1])/parseInt(info1[0])) 
    setReserveValueTime2(parseInt(info1[0])/parseInt(info1[1])) 

})

  const tusjoeContract = new web3.eth.Contract(joePairTus as any, '0x565d20BD591b00EAD0C927e4b6D7DD8A33b0B319')
  tusjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueTus(parseInt(info1[1])/parseInt(info1[0])) 
    setReserveValueTus2(parseInt(info1[0])/parseInt(info1[1])) 
 
})

//   const usdcejoeContract = new web3.eth.Contract(joePairUsdce as any, '0x2A8A315e82F85D1f0658C5D66A452Bbdd9356783')
//   usdcejoeContract.methods.getReserves().call().then( function( info1 ) {
//     setReserveValueUsdce(parseInt(info1[1])/parseInt(info1[0])) 
//     setReserveValueUsdce2(parseInt(info1[0])/parseInt(info1[1])) 
 
// })

  const vpndjoeContract = new web3.eth.Contract(joePairVpnd as any, '0x4cd20F3e2894Ed1A0F4668d953a98E689c647bfE')
  vpndjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueVpnd(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueVpnd2(parseInt(info1[1])/parseInt(info1[0])) 

})
   
//   const wethejoeContract = new web3.eth.Contract(joePairWethe as any, '0xFE15c2695F1F920da45C30AAE47d11dE51007AF9')
//   wethejoeContract.methods.getReserves().call().then( function( info1 ) {
//     setReserveValueWethe(parseInt(info1[1])/parseInt(info1[0])) 
//     setReserveValueWethe2(parseInt(info1[0])/parseInt(info1[1])) 
 
// })

  const gorillajoeContract = new web3.eth.Contract(joePairGorilla as any, '0x06878853D7519e8BB0c02F3131330920337Bb30c')
  gorillajoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueGorilla(parseInt(info1[1])/parseInt(info1[0])) 
    setReserveValueGorilla2(parseInt(info1[0])/parseInt(info1[1])) 
 
})


zeusContract.methods.uniswapV2Pair().call().then( function( info ) {         
  const zeusjoeContract = new web3.eth.Contract(joePairZeus as any, info)
  zeusjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueZeus(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueZeus2(parseInt(info1[1])/parseInt(info1[0])) 
 })
})


  const apejoeContract = new web3.eth.Contract(joePairApe as any, "0x11bBfA2Fa3b995ceA99D20DFA618fd32e252d8F2")
  apejoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValueApe(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValueApe2(parseInt(info1[1])/parseInt(info1[0])) 
})

            
  const usdcjoeContract = new web3.eth.Contract(joePairUsdc as any, "0xf4003F4efBE8691B60249E6afbD307aBE7758adb")
  usdcjoeContract.methods.getReserves().call().then( function( info1 ) {

   setReserveValueUsdc(parseInt((info1[1]*(10**18)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[0]*(10**6)).toLocaleString('fullwide', { useGrouping: false }))) 
   setReserveValueUsdc2(parseInt((info1[0]*(10**6)).toLocaleString('fullwide', { useGrouping: false }))/parseInt((info1[1]*(10**18)).toLocaleString('fullwide', { useGrouping: false })))
})

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const initialBalance = async () => {
    if(token1 === "avax"){
    const avaxBalanceInitial =  await web3.eth.getBalance(account);
           setBalance1((parseInt(avaxBalanceInitial)/(10**18)).toFixed(2));
    } else {
      const currContractInfo = getContract(token1)
      const currentContract = currContractInfo?.currContract
      const currentContractAddress = currContractInfo?.currContractAddress
   
       currentContract.methods.decimals().call().then( function( info1 ) {
         currentContract.methods.balanceOf((account)).call().then( function( info ) {
           setBalance1(((info/(10**info1)).toFixed(1)));
           setCurrentCA1(currentContractAddress)
           setDecimals(info1)
           });
        
          }); 
    }
  }

  const swapToken = async () => {
    
    gaEventTracker('swap avalanche token')
    if(account === undefined){
      alert("Please Connect Wallet !!")
      return
    }
         const date = Date.now() + 100
         if(!order){
           const amountFinal = (Math.trunc(swapAmountWithSlippage1*(10**18)).toLocaleString('fullwide', { useGrouping: false }));
           const amountOut = (Math.trunc(swapAmountWithSlippage2*(10**decimals)).toLocaleString('fullwide', { useGrouping: false }));
           console.log("amountswap",amountFinal, amountOut)
           const nftTxn = await swapContract.methods.swapExactAVAXForTokens(amountOut,['0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',currentCA1],account,date).send({from: account, value: amountFinal});
           if(nftTxn){
            initialBalance()
            initialBalance2()
             alert("Token Swapped Successfully !")
           }else{
             alert("Error in swapping tokens !")
           }
 
             
       }
       
    else if(order){
       
        const amountFinal = (Math.trunc(swapAmountWithSlippage1*(10**18))).toLocaleString('fullwide', { useGrouping: false });
        const amountOut = (Math.trunc(swapAmountWithSlippage2*(10**decimals))).toLocaleString('fullwide', { useGrouping: false });
        console.log("amountswap",amountFinal, amountOut)
        const nftTxn = await swapContract.methods.swapExactTokensForAVAXSupportingFeeOnTransferTokens(amountOut, amountFinal,[currentCA1,'0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'],account,date).send({from: account});
        if(nftTxn){
          alert("Token Swapped Successfully !")
           initialBalance2()
           initialBalance()
        }else{
          alert("Error in swapping tokens !")
        }  }
  }

  const initialBalance2 = async () => {

    const currContractInfo = getContract(token2)
    const currentContract = currContractInfo?.currContract
    const currentContractAddress = currContractInfo?.currContractAddress
 
     currentContract.methods.decimals().call().then( function( info1 ) {
       currentContract.methods.balanceOf((account)).call().then( function( info ) {
         setBalance2(((info/(10**info1)).toFixed(1)));
         setCurrentCA2(currentContractAddress)
         setDecimals(info1)
         });
      
        }); 
  } 
 
  const maxBalance2 = async () => {
    
    const currContractInfo = getContract(token2)
    const currentContract = currContractInfo?.currContract
      currentContract.methods.decimals().call().then( function( info1 ) {
  
        currentContract.methods.balanceOf((account)).call().then( function( info ) {
         setAmount2((info/(10**info1)-((0.00001*(info/(10**info1)))/100)));
         maxBalanceSwap2((info/(10**info1)-((0.00001*(info/(10**info1)))/100)))
          });
       
         }); 
    } 
  
  const maxBalanceSwap1 = async (amountMax) => {

    const res = getReserveValue(token2)
     const reservevalue = res?.reservevalue

    if((!order)){
    
      setAmount2(amountMax*reservevalue)
      setSwapAmountWithSlippage2((amountMax-((slippage1/100)*amountMax))*reservevalue)
      setSwapAmountWithSlippage1(amountMax)
      setMinSold(2)
      setMaxSold(5)
    }  else if(order){
     
      setAmount2(amountMax*reservevalue)
      setSwapAmountWithSlippage2((parseFloat(amountMax) + ((slippage1/100)*amountMax))*reservevalue)
      setSwapAmountWithSlippage1(amountMax)
      setMinSold(5)
      setMaxSold(2)
      
    
    } }

  const maxBalanceSwap2 = (amountMax2) => {

    const res = getReserveValue(token2)
    const reservevalue2 = res?.reservevalue2

      if(order){
     
      setAmount1(amountMax2*reservevalue2)
      setSwapAmountWithSlippage1((amountMax2-((slippage1/100)*amountMax2))*reservevalue2)
      setSwapAmountWithSlippage2(amountMax2)
      setMinSold(1)
      setMaxSold(5)
    
    } else if(!order){
      
      setAmount1(parseFloat(amountMax2)*reservevalue2)
      setSwapAmountWithSlippage1((parseFloat(amountMax2)+((slippage1/100)*amountMax2))*reservevalue2)
      setSwapAmountWithSlippage2(amountMax2)
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

  const getMaxBalance = async (token) => {

    if(token==='avax'){
      if(account!== undefined){
        const avaxBalance = await web3.eth.getBalance(account);
        const intBalance = (parseInt(avaxBalance)/(10**18))
        setAmount1(intBalance-((0.1*(intBalance))/100)) 
        maxBalanceSwap1(intBalance-((0.1*(intBalance))/100))
       
        }
    } else {

        maxBalance2()
    }
        
  }

  const [onPresentSettingsModal] = useModal(<CoinsModal tokenFunc2={tokenFunc2} ListData={avalancheList} />)

  const [onPresentSettingsModal1] = useModal(<CoinsModal tokenFunc2={tokenFunc1} ListData={avalancheList} />)
  
  return (
    <>    
    <BiggerCards>
      <AppBody>
        <AppHeader title='Swap' subtitle='Avalanche Smart Swap' setSlippage={setSlippage} /> 
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
             {getTokenImage(token1)}           
              <div style={{ color: 'white' }}>balance: {balance1}</div>            
            </div>
            <div className='d-flex flex-row align-items-center' style={{ gap: '4px', marginTop: '8px' }}>      
              <div className="buttonIn">
        <input className="input1" type="text" id="enter" onChange={amountChange1} value={amount1} placeholder='amount'/>
        {!order && (
        <button className="button1" id="clear" type="button" onClick={() => {getMaxBalance(token1)}}>max</button>)}</div>
         <button  id="token2" type="button" style={{ backgroundColor: "#3a3a3c", color: "#8E44AD", padding: "2%", border: "none", borderRadius: "5px", paddingRight: '10%' }} onClick={onPresentSettingsModal1}>{token1}</button>    
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
          <button  id="token2" type="button" style={{ backgroundColor: "#3a3a3c", color: "#8E44AD", padding: "2%", border: "none", borderRadius: "5px", paddingRight: '10%' }} onClick={onPresentSettingsModal}>{token2}</button>    
            </div>
          </InputStyle>
          {/* <div style={{ color: 'white', fontSize: '12px', marginTop: '20px', order: 4 }}>.01 avax Per TX + Gas</div> */}
          {minSold === 1 &&  (amount2 > 0)  && swapAmountWithSlippage1 && (
          <div style={{ color: 'white', fontSize: '12px', marginTop: '20px', order: 4 }}>Minimum Received: {swapAmountWithSlippage1}</div> )}
           {maxSold === 1 && (amount2 > 0)  && swapAmountWithSlippage1 && (
          <div style={{ color: 'white', fontSize: '12px', marginTop: '20px', order: 4 }}>Maximum Sold: {swapAmountWithSlippage1}</div>)}
           { minSold === 2 &&  (amount1 > 0) &&  swapAmountWithSlippage2  && (
          <div style={{ color: 'white', fontSize: '12px', marginTop: '20px', order: 4 }}>Minimum Received: {swapAmountWithSlippage2}</div> )}
           {maxSold === 2 && (amount1 > 0) && swapAmountWithSlippage2 && (
          <div style={{ color: 'white', fontSize: '12px', marginTop: '20px', order: 4 }}>Maximum Sold: {swapAmountWithSlippage2}</div>)}
        
          <StyledButton onClick={swapToken}>swap</StyledButton>
        </StyledCardBody>

      </AppBody>
      </BiggerCards>
    </>
  )
}

export default Exchange