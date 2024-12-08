import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Web3 from "web3";
import { Heading, Text, BaseLayout } from 'toolkit/uikit'
import Page from 'components/Layout/Page'
import { useWeb3React } from '@web3-react/core'
import {BrowserView, MobileView} from 'react-device-detect'
import { setupNetwork2 } from 'utils/wallet';
import AvaxFarmer from './components/AvaxFarmer'
import Emerald from './components/Emerald'
import Gorilla from './components/Gorilla'
import Nebula from './components/Nebula'
import Polar from './components/Polar'
import ProjectX from './components/ProjectX'
import Rebase from './components/Rebase'
import Redlight from './components/Redlight'
import RubyMine from './components/RubyMine'
import Thor from './components/Thor'
import Universal from './components/Universal'
import Zeus from './components/Zeus'
import Smart from './components/Smart'
import DiamondMine from './components/DiamondMine'
import Storm from './components/Storm'
import Lava from './components/Lava'
import CryptoNodes from './components/CryptoNodes'
import DarkForest from './components/DarkForest'
import Leaf from './components/Leaf'
import Star from './components/Star'
import Gem from './components/Gem'
import Contexia from './components/Contexia'
import MultiNode from './components/MultiNode'
import RoastBeefBNB from './components/RoastBeefBNB'
import RoastBeefMatic from './components/RoastBeefMatic'
import FyRise from './components/FyRise'
import ToastedAvax from './components/ToastedAvax'
import BakedPizza from './components/BakedPizza'
import Stakers from './components/Stakers'
import Nodes from './components/Nodes'
import StakersM from './components/StakersM'
import NodesM from './components/NodesM'
import Sphere from './components/Sphere';
import Safuu from './components/Safuu';
import TheFarmHouse from './components/TheFarmHouse';
import Leviathan from './components/Leviathan';
import DarkCrypto from './components/DarkCrypto';
import BakedBeans from './components/BakedBeans';
import Cubo from './components/Cubo';
import Grape from './components/Grape';
import OneHundredDays from './components/OneHundredDays';

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 12px;
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
      grid-column: span 3;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;    

    & > div {
      grid-column: span 3;
      margin-right:35px;
    }
  }
`
const CardsM = styled(BaseLayout)`
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

const CustomCards = styled(Cards)`
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
    & > div {
      grid-column: span 6;
    }
  }
`

const BigCards = styled(Cards)`
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 8;
      margin-left: 335px;
      margin-rigtt: -5px;
    }
  }
`

const BiggerCards = styled(Cards)`
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
    }
  }
`

const Label1 = styled.div<{ labelSize: string }>`
  color: ${({ theme }) => theme.colors.textSubtle};    
  font-size:33px;
  margin-left: 475px;
`
const Label1m = styled.div<{ labelSize: string }>`
  color: ${({ theme }) => theme.colors.textSubtle};    
  font-size:22px;  
  margin-left:115px;
`

const HomePoc: React.FC = () => {
  const { account } = useWeb3React(); 
  const farmersNodeAbi = [{"inputs":[],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountBNB","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AutoLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"ContractSwapEnabledUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sniperAddress","type":"address"}],"name":"SniperCaught","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DEAD","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_hasLiqBeenAdded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_ratios","outputs":[{"internalType":"uint16","name":"rewards","type":"uint16"},{"internalType":"uint16","name":"liquidity","type":"uint16"},{"internalType":"uint16","name":"marketing","type":"uint16"},{"internalType":"uint16","name":"rebaseTreasury","type":"uint16"},{"internalType":"uint16","name":"dev","type":"uint16"},{"internalType":"uint16","name":"total","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_taxRates","outputs":[{"internalType":"uint16","name":"buyFee","type":"uint16"},{"internalType":"uint16","name":"sellFee","type":"uint16"},{"internalType":"uint16","name":"transferFee","type":"uint16"},{"internalType":"uint16","name":"sniperFee","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_taxWallets","outputs":[{"internalType":"address payable","name":"marketing","type":"address"},{"internalType":"address payable","name":"rebaseTreasury","type":"address"},{"internalType":"address payable","name":"dev","type":"address"},{"internalType":"address","name":"liquidity","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokens","type":"address[]"},{"internalType":"address[]","name":"routers","type":"address[]"}],"name":"addMultipleTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"router","type":"address"}],"name":"addTokenToList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"intermediary","type":"address"}],"name":"adjustTokenPath","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"approveContractContingency","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"basicTransfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"boostTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"boostTimeEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"checkToken","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimPendingRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"claimPendingRewardsInSpecificToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"compoundDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractSwapEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractSwapTimer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"dexRouter","outputs":[{"internalType":"contract IRouter02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"timeInSeconds","type":"uint256"}],"name":"extendLPLockBySeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"time","type":"uint256"}],"name":"extendLPLockBySetTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"timeInSeconds","type":"uint256"}],"name":"extendTokenLockBySeconds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"time","type":"uint256"}],"name":"extendTokenLockBySetTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gas","type":"uint256"}],"name":"forceRewardsDistribution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCurrentTokenLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentTokens","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getLockedTokenAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaxTX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaxWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRemainingLPLockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getRemainingTokenLockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalReflected","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"shareholder","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"shareholder","type":"address"}],"name":"getUserRealizedGains","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getUserReflectingToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"shareholder","type":"address"}],"name":"getUserUnpaidEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialLockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromDividends","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromLimits","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"lockAdditionalTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timeInSeconds","type":"uint256"}],"name":"lockInitialTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lpPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manualDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxBuyTaxes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSellTaxes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSniperFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTransferTaxes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"multiSendTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"processReflect","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"removeBlacklisted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"removeSniper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"removeTokenFromList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revertUserReflectingTokenToNative","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"time","type":"uint256"}],"name":"setBoostTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"enabled","type":"bool"}],"name":"setBoostTimeEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"},{"internalType":"bool","name":"processReflectEnabled","type":"bool"}],"name":"setContractSwapSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"bool","name":"enabled","type":"bool"}],"name":"setDividendExcluded","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"enabled","type":"bool"}],"name":"setExcludedFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"enabled","type":"bool"}],"name":"setExcludedFromLimits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"aInitializer","type":"address"},{"internalType":"address","name":"cInitializer","type":"address"},{"internalType":"address","name":"lInitializer","type":"address"}],"name":"setInitializers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"bool","name":"enabled","type":"bool"}],"name":"setLpPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"divisor","type":"uint256"}],"name":"setMaxTxPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"divisor","type":"uint256"}],"name":"setMaxWalletSize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newRouter","type":"address"}],"name":"setNewRouter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_antiSnipe","type":"bool"},{"internalType":"bool","name":"_antiBlock","type":"bool"}],"name":"setProtectionSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"rewards","type":"uint16"},{"internalType":"uint16","name":"liquidity","type":"uint16"},{"internalType":"uint16","name":"marketing","type":"uint16"},{"internalType":"uint16","name":"rebaseTreasury","type":"uint16"},{"internalType":"uint16","name":"dev","type":"uint16"}],"name":"setRatios","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minPeriod","type":"uint256"},{"internalType":"uint256","name":"_minReflection","type":"uint256"},{"internalType":"uint256","name":"minReflectionMultiplier","type":"uint256"}],"name":"setReflectionCriteria","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gas","type":"uint256"}],"name":"setReflectorSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"thresholdPercent","type":"uint256"},{"internalType":"uint256","name":"thresholdDivisor","type":"uint256"},{"internalType":"uint256","name":"amountPercent","type":"uint256"},{"internalType":"uint256","name":"amountDivisor","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"}],"name":"setSwapSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"buyFee","type":"uint16"},{"internalType":"uint16","name":"sellFee","type":"uint16"},{"internalType":"uint16","name":"transferFee","type":"uint16"},{"internalType":"uint16","name":"sniperFee","type":"uint16"}],"name":"setTaxes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"setUserReflectingToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"marketing","type":"address"},{"internalType":"address payable","name":"rebaseTreasury","type":"address"},{"internalType":"address","name":"liquidity","type":"address"},{"internalType":"address payable","name":"dev","type":"address"}],"name":"setWallets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"withdrawForeignToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const farmersnodeNodeHandler = "0xd33df97747dD6bEcAD26B2e61F818c94B7588E69"

  const web3 = new Web3(window.ethereum as any)
  const farmersNodeContract = new web3.eth.Contract(farmersNodeAbi as any, farmersnodeNodeHandler);
  const [rewards, setRewards] = useState(0)
  const [reserves, setReserves] = useState(0)
  const [smnPrice, setSmnPrice] = useState(0)
  const [refetch, setRefetch] = useState(false)
  const [myNode, setMyNode] = useState(false)
  const [refetchLocation, setRefetchLocation] = useState(false)
  const [token, setToken] = useState('React')
  const [reactPrice, setReactPrice] = useState(0)

  // useEffect(() =>{
  //   const hasSetup = setupNetwork2()
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //      },[])
  return (
    <>
    <BrowserView>
      <Page>
      <BigCards>        
          <Smart farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />        
      </BigCards>
      <BiggerCards>
     
        <Stakers farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
      </BiggerCards>
    <Cards>
      <Link to='/AvaxFarmer' style={{ width: '350px' }}>              
        <AvaxFarmer farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />       
      </Link> 
      <Link to='/Rebase' style={{ width: '350px' }}>
        <Rebase farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link>
      <Link to='/RubyMine' style={{ width: '350px' }}>
        <RubyMine farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link>
    </Cards>
    <Cards>
      <Link to='/DiamondMine' style={{ width: '350px' }}>
        <DiamondMine farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link>
      <Link to='/ToastedAvax' style={{ width: '350px' }}>
        <ToastedAvax farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link>
      <Link to='/FyRise' style={{ width: '350px' }}>
        <FyRise farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link>  
    </Cards>
    <Cards>                  
      <Link to='/RoastBeefBNB' style={{ width: '350px' }}>
        <RoastBeefBNB farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link> 
      <Link to='/RoastBeefMatic' style={{ width: '350px' }}>
        <RoastBeefMatic farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link>          
      <Link to='/Sphere' style={{ width: '350px' }}>
        <Sphere farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link>          
    </Cards>
    <Cards>                  
      <Link to='/Safuu' style={{ width: '350px' }}>
        <Safuu farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link> 
      <Link to='/Leviathan' style={{ width: '350px' }}>
        <Leviathan farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link>          
      <Link to='/TheFarmHouse' style={{ width: '350px' }}>
        <TheFarmHouse farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link>          
    </Cards>
    <Cards>                  
      <Link to='/BakedBeans' style={{ width: '350px' }}>
        <BakedBeans farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link> 
      <Link to='/OneHundredDays' style={{ width: '350px' }}>
        <OneHundredDays farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link>
      <Link to='/Grape' style={{ width: '350px' }}>
        <Grape farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
      </Link>
    </Cards>
    <BiggerCards>
    <Nodes farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
      </BiggerCards>
      <Cards>      
         <Link to='/Emerald' style={{ width: '350px' }}>        
            <Emerald farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />            
          </Link>
          <Link to='/CryptoNodes' style={{ width: '350px' }}>
            <CryptoNodes farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          <Link to='/Redlight' style={{ width: '350px' }}>
            <Redlight farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>  
        </Cards>
        <Cards>
          <Link to='/Nebula' style={{ width: '350px' }}>
            <Nebula farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          <Link to='/Polar' style={{ width: '350px' }}>
            <Polar farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          <Link to='/ProjectX' style={{ width: '350px' }}>
            <ProjectX farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
        </Cards>        
        <Cards>
          <Link to='/Thor' style={{ width: '350px' }}>
            <Thor farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          <Link to='/' style={{ width: '350px' }}>
            <Zeus farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          <Link to='/Storm' style={{ width: '350px' }}>
            <Storm farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>         
        </Cards>
        <Cards>
          <Link to='/MultiNode' style={{ width: '350px' }}>
            <MultiNode farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link> 
          <Link to='/' style={{ width: '350px' }}>
            <Lava farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>      
          <Link to='/' style={{ width: '350px' }}>
            <Cubo farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>          
        </Cards> 
      </Page>
      </BrowserView>
      <MobileView>
      <Page>          
        <CardsM>
          <Link to='/' style={{ width: '350px' }}>
            <Smart farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
        </CardsM>
        <BiggerCards>
          <StakersM farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
        </BiggerCards>  
        <CardsM>
          <Link to='/AvaxFarmer' style={{ width: '350px' }}>              
            <AvaxFarmer farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} /> 
          </Link>
        </CardsM>        
        <CardsM>
          <Link to='/Rebase' style={{ width: '350px' }}>
            <Rebase farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          </CardsM>
          <CardsM>
          <Link to='/RubyMine' style={{ width: '350px' }}>
            <RubyMine farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          </CardsM>
          <CardsM>
          <Link to='/DiamondMine' style={{ width: '350px' }}>
             <DiamondMine farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>  
          </CardsM>   
          <CardsM>
          <Link to='/FyRise' style={{ width: '350px' }}>
          <FyRise farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link> 
          </CardsM>
          <CardsM>            
          <Link to='/RoastBeefBNB' style={{ width: '350px' }}>
          <RoastBeefBNB farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link> 
          </CardsM>
          <CardsM>
          <Link to='/RoastBeefMatic' style={{ width: '350px' }}>
          <RoastBeefMatic farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>          
          </CardsM>
          <CardsM>          
          <Link to='/ToastedAvax' style={{ width: '350px' }}>
          <ToastedAvax farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>               
          </CardsM>
          <CardsM>
          <Link to='/Sphere' style={{ width: '350px' }}>
            <Sphere farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          </CardsM>
          <CardsM>
          <Link to='/Safuu' style={{ width: '350px' }}>
             <Safuu farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>  
          </CardsM>   
          <CardsM>
          <Link to='/Leviathan' style={{ width: '350px' }}>
          <Leviathan farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link> 
          </CardsM>
          <CardsM>            
          <Link to='/TheFarmHouse' style={{ width: '350px' }}>
          <TheFarmHouse farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link> 
          </CardsM>
          <CardsM>
          <Link to='/BakedBeans' style={{ width: '350px' }}>
          <BakedBeans farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>          
          </CardsM>
          <CardsM>          
            <Link to='/OneHundredDays' style={{ width: '350px' }}>
             <OneHundredDays farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
            </Link>
          </CardsM>   
          <CardsM>          
            <Link to='/Grape' style={{ width: '350px' }}>
             <Grape farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
            </Link>
          </CardsM>          
      <BiggerCards>
      <NodesM farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
      </BiggerCards>  
        <CardsM>
          <Link to='/Emerald' style={{ width: '350px' }}>        
            <Emerald farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />            
          </Link>
          </CardsM>
          <CardsM>
          <Link to='/CryptoNodes' style={{ width: '350px' }}>
            <CryptoNodes farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>        
          </CardsM>
          <CardsM>
          <Link to='/Nebula' style={{ width: '350px' }}>
            <Nebula farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          </CardsM>
          <CardsM>
          <Link to='/Polar' style={{ width: '350px' }}>
            <Polar farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          </CardsM>
          <CardsM>
          <Link to='/ProjectX' style={{ width: '350px' }}>
            <ProjectX farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          </CardsM>          
          <CardsM>
          <Link to='/Redlight' style={{ width: '350px' }}>
            <Redlight farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          </CardsM>         
          <CardsM>
          <Link to='/Storm' style={{ width: '350px' }}>
             <Storm farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>  
          </CardsM>
          <CardsM>
          <Link to='/Thor' style={{ width: '350px' }}>
            <Thor farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          </CardsM>                           
          <CardsM>
          <Link to='/MultiNode' style={{ width: '350px' }}>
            <MultiNode farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          </CardsM>   
          <CardsM>
          <Link to='/Lava' style={{ width: '350px' }}>
            <Lava farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          </CardsM>
          <CardsM>
          <Link to='/' style={{ width: '350px' }}>
            <Cubo farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          </Link>
          </CardsM>                   
      </Page>
      </MobileView>
    </>
  )
}

export default HomePoc