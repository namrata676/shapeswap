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
      grid-column: span 6;
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
  

const goldensocietytokenAbi = [{"inputs":[{"internalType":"address","name":"_manager","type":"address"},{"internalType":"address","name":"_goldToken","type":"address"},{"internalType":"address","name":"_router","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountAVAX","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AutoLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"Received","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"DEAD","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_claimRatios","outputs":[{"internalType":"uint16","name":"vaultFee","type":"uint16"},{"internalType":"uint16","name":"marketingFee","type":"uint16"},{"internalType":"uint16","name":"total","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_nodeRatios","outputs":[{"internalType":"uint16","name":"poolFee","type":"uint16"},{"internalType":"uint16","name":"liquidityFee","type":"uint16"},{"internalType":"uint16","name":"vaultFee","type":"uint16"},{"internalType":"uint16","name":"marketingFee","type":"uint16"},{"internalType":"uint16","name":"total","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approveTokenOnRouter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"blacklist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"onlyTokens","type":"bool"}],"name":"canCreateNode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"createNodeWithRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"createNodeWithTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentRouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"getClaimFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"goldToken","outputs":[{"internalType":"contract IGoldToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"contract NodeManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxNodes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPool","outputs":[{"internalType":"contract Pool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"contract IJoeRouter02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bool","name":"_val","type":"bool"}],"name":"setBlacklisted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_vaultFee","type":"uint16"},{"internalType":"uint16","name":"_marketingFee","type":"uint16"}],"name":"setClaimRatios","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_teamWallet","type":"address"}],"name":"setMarketing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_dexRouter","type":"address"}],"name":"setNewRouter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_poolFee","type":"uint16"},{"internalType":"uint16","name":"_liquidityFee","type":"uint16"},{"internalType":"uint16","name":"_vaultFee","type":"uint16"},{"internalType":"uint16","name":"_marketingFee","type":"uint16"}],"name":"setNodeRatios","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasuryWallet","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamWallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasuryWallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_claimFee","type":"uint256"}],"name":"updateClaimFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract NodeManager","name":"_newManager","type":"address"}],"name":"updateManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxWallet","type":"uint256"}],"name":"updateMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardPool","type":"address"}],"name":"updatePoolAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]


const goldensocietynodeAbi = [{"inputs":[{"internalType":"address","name":"_goldToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"address","name":"nodeOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"ownedNodes","type":"uint256"}],"name":"NodeCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address[]","name":"_nodeOwners","type":"address[]"},{"internalType":"uint256[]","name":"_nodeCounts","type":"uint256[]"},{"internalType":"bool","name":"onlyTokens","type":"bool"},{"internalType":"bool","name":"_resetCreatedAt","type":"bool"}],"name":"airdropNodes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"availableRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"availableRewardsFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"capIncreasePer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"capSetAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cappedNodeCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"claim","outputs":[{"internalType":"uint256","name":"claimable","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimableUnit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimableUnitDivisor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"bool","name":"onlyTokens","type":"bool"}],"name":"createNode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dailyNodeLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dailyNodesCreated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"dailyNodesCreatedFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_size","type":"uint256"}],"name":"exportNodes","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"nodeCount","type":"uint256"}],"internalType":"struct NodeManager._nodeStat[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDailyNodeCap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNodeCap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastCapIncreaseAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"limitDailyNodes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nodeBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"nodeBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nodeCapSettings","outputs":[{"internalType":"uint256","name":"nodeCapDivisor","type":"uint256"},{"internalType":"uint256","name":"minNodeCapIncrease","type":"uint256"},{"internalType":"uint256","name":"capIncreasePer","type":"uint256"},{"internalType":"uint256","name":"capSetAt","type":"uint256"},{"internalType":"uint256","name":"nodeCap","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nodeOwnerSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nodePrice","outputs":[{"internalType":"uint256","name":"_nodePrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"nodePriceFor","outputs":[{"internalType":"uint256","name":"_nodePrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nodeReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_nodeOwner","type":"address"}],"name":"resetNodesFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_contractAddr","type":"address"},{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setAuthorizedContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalNodeCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_limitDailyNodes","type":"bool"},{"internalType":"uint256","name":"_dailyNodeLimit","type":"uint256"}],"name":"updateDailyNodeLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nodeCapDivisor","type":"uint256"},{"internalType":"uint256","name":"_minNodeCapIncrease","type":"uint256"},{"internalType":"uint256","name":"_nodeCap","type":"uint256"},{"internalType":"uint256","name":"_capIncreasePer","type":"uint256"}],"name":"updateNodeCap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price1","type":"uint256"},{"internalType":"uint256","name":"_price2","type":"uint256"},{"internalType":"uint256","name":"_price3","type":"uint256"},{"internalType":"uint256","name":"_price4","type":"uint256"},{"internalType":"uint256","name":"_price5","type":"uint256"}],"name":"updateNodePrices","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_reward","type":"uint256"},{"internalType":"uint256","name":"_claimableUnit","type":"uint256"}],"name":"updateReward","outputs":[],"stateMutability":"nonpayable","type":"function"}]
        

const goldensocietyTokenAddress = "0x596f2F716727bC8404bf21280B40092E6874dA1d"

const goldensocietyNodeHandler = "0x4a3AfC7969fAa8CA59295C3D2A311a78B4111691"



  const web3 = new Web3(window.ethereum as any)

  const goldenNodeContract = new web3.eth.Contract(goldensocietynodeAbi as any, goldensocietyNodeHandler);

  const goldenTokenContract = new web3.eth.Contract(goldensocietytokenAbi as any, goldensocietyTokenAddress);

  const [rewards, setRewards] = useState(0)
  const [reserves, setReserves] = useState(0)
  const [smnPrice, setSmnPrice] = useState(0)
  const [refetch, setRefetch] = useState(false)
  const [myNode, setMyNode] = useState(false)
  const [refetchLocation, setRefetchLocation] = useState(false)
  const [token, setToken] = useState('golden_society')
  const [goldenPrice, setGoldenPrice] = useState(0)

  useEffect(() =>{

    const hasSetup = setupNetwork2()
        // eslint-disable-next-line react-hooks/exhaustive-deps
       },[])

  return (
    <>
    <BrowserView>
      <Page>
        <Cards>
          <AutoCompound title="Auto Compound" status={false} img1='images/status4.jpg' img2='images/status42.jpg' setToken={setToken}/>
          <Info title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />          
          <SMNprice  title="$SMRT" val1="$0" val2={0} account={account} setGoldenPrice={setGoldenPrice} img='images/status1.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} />
          <TotalNodes title="Total Nodes" val1="6500" val2={-5} account={account}  refetch={refetch} token={goldenTokenContract} goldenTokenContract={goldenTokenContract} goldenNodeContract={goldenNodeContract} img='images/status2.jpg' />          
        </Cards>
        <BigCards>
          <IncomeCard img='./images/golden.png' rewards={rewards}  smnPrice={smnPrice} myNode={myNode}  goldenPrice={goldenPrice}/>
            <CustomCards>
              <AvailReward account={account}  setRewards={setRewards} token={token} goldenTokenContract={goldenTokenContract} goldenNodeContract={goldenNodeContract}/>       
              <CreateNewNode account={account} setRefetch={setRefetch}  refetch={refetch} goldenTokenContract={goldenTokenContract} goldenNodeContract={goldenNodeContract} token={token}/>       
            </CustomCards>
        </BigCards>
        <BiggerCards>          
          <NodesListCard account={account}  />
        </BiggerCards>
      </Page>
      </BrowserView>
      <MobileView>
      <Page>
        <Cards>
        <AutoCompound title="Auto Compound" status={false} img1='images/status4.jpg' img2='images/status42.jpg' setToken={setToken}/>
          <Info title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
          <SMNprice  title="$SMRT" setGoldenPrice={setGoldenPrice} val1="$0" val2={0} account={account} img='images/status1.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} />
          
        </Cards>
        <BigCards>
          <IncomeCard img='images/earn.gif' rewards={rewards}  smnPrice={smnPrice} myNode={myNode} goldenPrice={goldenPrice} />
            <CustomCards>
              <AvailReward account={account} goldenTokenContract={goldenTokenContract} goldenNodeContract={goldenNodeContract} setRewards={setRewards} token={token} />          
              <CreateNewNode account={account} setRefetch={setRefetch}  refetch={refetch}  goldenTokenContract={goldenTokenContract} goldenNodeContract={goldenNodeContract} token={token}/>
             
            </CustomCards>
        </BigCards>
        <BiggerCards>          
          <NodesListCard account={account}  />
        </BiggerCards>
      </Page>
      </MobileView>
    </>
  )
}

export default HomePoc