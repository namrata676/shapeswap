import React, {useState, useEffect } from 'react'
import styled from 'styled-components'
import Web3 from "web3";
import { Heading, Text, BaseLayout } from 'toolkit/uikit'
import Page from 'components/Layout/Page'
import { useWeb3React } from '@web3-react/core'
import {BrowserView, MobileView} from 'react-device-detect'
import { setupNetwork2 } from '../../utils/wallet'
import TotalClaimedSMN from './components/TotalClaimedSMN'
import TotalNodes from './components/TotalNodes'
import SMNprice from './components/SMNprice'
import AutoCompound from './components/AutoCompound'
import ContractBalance from './components/ContractBalance'
import IncomeCard from './components/IncomeCard'
import NodesListCard from './components/NodesListCard'
import PriceChart from './components/PriceChart'
import AvailReward from './components/AvailReward'
import CreateNewNode from './components/CreateNewNode'
import Info from './components/Info'

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
      grid-column: span 4;
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
      margin-left: 20px;
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
  
`
const HomePoc: React.FC = () => {
  const { account } = useWeb3React();
  


  const farmersNodeAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"epoch","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalSupply","type":"uint256"}],"name":"LogRebase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"bool","name":"value","type":"bool"}],"name":"SetAutomatedMarketMakerPair","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"avaxReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"contractTokenBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountToLiquify","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountToRFV","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountToTreasury","type":"uint256"}],"name":"SwapBack","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_allottedSellHistory","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_blacklistedUsers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"interval","type":"uint256"},{"internalType":"uint256","name":"percentage","type":"uint256"}],"name":"adjustAllottedSell","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"airdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"airdropAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"airdropAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allottedSellInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allottedSellPercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner_","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"autoRebase","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"automatedMarketMakerPairs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"burnFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rebaser","type":"address"}],"name":"changeRebaser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"checkFeeExempt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkSwapThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimAllottedSell","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_value","type":"bool"}],"name":"claimableAlloatedSellTrigger","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"}],"name":"clearStuckBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ecosystemFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesOnNormalTransfers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"futureEcosystemReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCirculatingSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"accuracy","type":"uint256"}],"name":"getLiquidityBacking","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"getUSDCFromASTRO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"initialBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialDistributionFinished","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isClaimableAllocatedSell","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"uint256","name":"accuracy","type":"uint256"}],"name":"isOverLiquified","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manualRebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"manualSwapBack","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"manualSync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxSellTransactionAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextRebase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"normalSellLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"operationsFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operationsReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_pause","type":"bool"}],"name":"pauseTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"purchasePeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rebaseFrequency","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"rescueToken","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardYield","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardYieldDenominator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"riskFeeValueFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"riskFreeValueReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_airdropAddress","type":"address[]"}],"name":"setAirdropAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_airdropAmount","type":"uint256[]"}],"name":"setAirdropAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_autoRebase","type":"bool"}],"name":"setAutoRebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"bool","name":"_value","type":"bool"}],"name":"setAutomatedMarketMakerPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"bool","name":"_value","type":"bool"}],"name":"setBlacklisted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"bool","name":"_value","type":"bool"}],"name":"setFeeExempt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_liquidityReceiver","type":"address"},{"internalType":"address","name":"_treasuryReceiver","type":"address"},{"internalType":"address","name":"_riskFreeValueReceiver","type":"address"},{"internalType":"address","name":"_futureEcosystemReceiver","type":"address"},{"internalType":"address","name":"_operationReceiver","type":"address"},{"internalType":"address","name":"_xASTROReceiver","type":"address"},{"internalType":"address","name":"_burnReceiver","type":"address"}],"name":"setFeeReceivers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_feeKind","type":"uint8"},{"internalType":"uint256","name":"_total","type":"uint256"},{"internalType":"uint256","name":"_liquidityFee","type":"uint256"},{"internalType":"uint256","name":"_riskFreeValue","type":"uint256"},{"internalType":"uint256","name":"_treasuryFee","type":"uint256"},{"internalType":"uint256","name":"_feeFee","type":"uint256"},{"internalType":"uint256","name":"_operationFee","type":"uint256"},{"internalType":"uint256","name":"_xAstroFee","type":"uint256"},{"internalType":"uint256","name":"_burnFee","type":"uint256"}],"name":"setFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setFeesOnNormalTransfers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_value","type":"bool"}],"name":"setInitialDistributionFinished","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxTxn","type":"uint256"}],"name":"setMaxSellTransaction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nextRebase","type":"uint256"}],"name":"setNextRebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setNormalSellLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_time","type":"uint256"}],"name":"setPurchasePeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rebaseFrequency","type":"uint256"}],"name":"setRebaseFrequency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardYield","type":"uint256"},{"internalType":"uint256","name":"_rewardYieldDenominator","type":"uint256"}],"name":"setRewardYield","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_router","type":"address"},{"internalType":"address","name":"_pair","type":"address"}],"name":"setRouterAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"},{"internalType":"uint256","name":"_num","type":"uint256"},{"internalType":"uint256","name":"_denom","type":"uint256"}],"name":"setSwapBackSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"uint256","name":"accuracy","type":"uint256"}],"name":"setTargetLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"setWhaleSellLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"treasuryFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updateAllottedSellTimer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whaleSellLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"xASTROFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"xASTROReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]


const farmersnodeNodeHandler = "0x6d2f5dBf3a7396FCe32CfE406Aef7a8AFF812Fbb"

  const web3 = new Web3(window.ethereum as any)

  const farmersNodeContract = new web3.eth.Contract(farmersNodeAbi as any, farmersnodeNodeHandler);

  const [rewards, setRewards] = useState(0)
  const [reward, setReward] = useState(0)
  const [tax, setTax] = useState(0)
  const [reserves, setReserves] = useState(0)
  const [smnPrice, setSmnPrice] = useState(0)
  const [refetch, setRefetch] = useState(false)
  const [myNode, setMyNode] = useState(false)
  const [refetchLocation, setRefetchLocation] = useState(false)
  const [token, setToken] = useState('avax_farmer')
  const [ReactPrice, setReactPrice] = useState(0)

  useEffect(() =>{

    const hasSetup = setupNetwork2()
        // eslint-disable-next-line react-hooks/exhaustive-deps
       },[])

  return (
    <>
    <BrowserView>
      <Page>
        <Cards>
        <AutoCompound farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
        <ContractBalance farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
        <SMNprice  title="Info" val1="6500" val2={-5} account={account} img='images/status2.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} setReactPrice={setReactPrice} />
          <Info farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
        </Cards>
        <BigCards>         
            <CustomCards>             
              {/* <CreateNewNode account={account} setRefetch={setRefetch}  refetch={refetch}   farmersNodeContract={farmersNodeContract} token={token}/>
              <AvailReward account={account}  setRewards={setRewards} setTax={setTax} setReward={setReward} token={token} farmersNodeContract={farmersNodeContract}/>           */}
            </CustomCards>
        </BigCards>       
      </Page>
      </BrowserView>
      <MobileView>
      <Page>
      <Cards>
      <AutoCompound farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
      <ContractBalance farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
          <Info farmersNodeContract={farmersNodeContract} title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
        </Cards>
        <BigCards>         
            <CustomCards>              
              {/* <CreateNewNode account={account} setRefetch={setRefetch}  refetch={refetch}   farmersNodeContract={farmersNodeContract} token={token}/>
              <AvailReward account={account}  setRewards={setRewards} setTax={setTax} setReward={setReward} token={token}  farmersNodeContract={farmersNodeContract}/>           */}
            </CustomCards>
        </BigCards>   
      </Page>
      </MobileView>
    </>
  )
}

export default HomePoc