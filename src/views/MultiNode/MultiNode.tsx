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
  


  const MnodeNodeAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[],"name":"AwardNodeFunctionDisabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[],"name":"CannotWithdrawYet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"by","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"InterestWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"},{"components":[{"internalType":"uint256","name":"stableCoinPrice","type":"uint256"},{"internalType":"uint256","name":"multinodePrice","type":"uint256"}],"indexed":true,"internalType":"struct IMultinodeProtocol.NodePrice","name":"nodePrice","type":"tuple"},{"indexed":true,"internalType":"IMultinodeProtocol.ReturnRate","name":"returnRate","type":"uint256"}],"name":"NodeAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"}],"name":"NodeMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"},{"components":[{"internalType":"uint256","name":"stableCoinPrice","type":"uint256"},{"internalType":"uint256","name":"multinodePrice","type":"uint256"}],"indexed":true,"internalType":"struct IMultinodeProtocol.NodePrice","name":"nodePrice","type":"tuple"}],"name":"NodePriceSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"}],"name":"NodeRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"},{"indexed":true,"internalType":"IMultinodeProtocol.ReturnRate","name":"returnRate","type":"uint256"}],"name":"NodeReturnRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"StablecoinsWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"withdrawalPeriod","type":"uint256"}],"name":"WithdrawalPeriodSet","type":"event"},{"inputs":[{"internalType":"contract IMultinodeToken","name":"multinodeToken_","type":"address"},{"internalType":"contract IERC20Upgradeable","name":"stableCoin_","type":"address"},{"internalType":"contract IACL","name":"acl_","type":"address"}],"name":"__initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"acl","outputs":[{"internalType":"contract IACL","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"}],"name":"awardNode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deploymentBlock","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"disableAwardNodeFunction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentInterest","outputs":[{"internalType":"uint256","name":"accumulatedInterest","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMultinodeToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNodeMetaData","outputs":[{"components":[{"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"},{"components":[{"internalType":"uint256","name":"stableCoinPrice","type":"uint256"},{"internalType":"uint256","name":"multinodePrice","type":"uint256"}],"internalType":"struct IMultinodeProtocol.NodePrice","name":"price","type":"tuple"},{"internalType":"IMultinodeProtocol.ReturnRate","name":"returnRate","type":"uint256"}],"internalType":"struct IMultinodeProtocol.NodeMetadata[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"}],"name":"getNodePrice","outputs":[{"components":[{"internalType":"uint256","name":"stableCoinPrice","type":"uint256"},{"internalType":"uint256","name":"multinodePrice","type":"uint256"}],"internalType":"struct IMultinodeProtocol.NodePrice","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"}],"name":"getNodeReturnRate","outputs":[{"internalType":"IMultinodeProtocol.ReturnRate","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStableCoin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getTotalClaimedInterest","outputs":[{"internalType":"uint256","name":"totalClaimedInterest","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalNodes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getUserNodeCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getUserNodes","outputs":[{"components":[{"components":[{"internalType":"uint256","name":"count","type":"uint256"}],"internalType":"struct IMultinodeProtocol.OwnedNode","name":"ownedNode","type":"tuple"},{"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"}],"internalType":"struct IMultinodeProtocol.OwnedNodeMetadata[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWithdrawalPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isNodeAwardingEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"},{"internalType":"uint256","name":"mnodePrice","type":"uint256"},{"internalType":"uint256","name":"stablecoinPrice","type":"uint256"}],"name":"mintNode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"multinodeToken","outputs":[{"internalType":"contract IMultinodeToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"},{"components":[{"internalType":"uint256","name":"stableCoinPrice","type":"uint256"},{"internalType":"uint256","name":"multinodePrice","type":"uint256"}],"internalType":"struct IMultinodeProtocol.NodePrice","name":"nodePrice","type":"tuple"},{"internalType":"IMultinodeProtocol.ReturnRate","name":"returnRate","type":"uint256"}],"name":"registerNewNode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"}],"name":"removeNode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"},{"components":[{"internalType":"uint256","name":"stableCoinPrice","type":"uint256"},{"internalType":"uint256","name":"multinodePrice","type":"uint256"}],"internalType":"struct IMultinodeProtocol.NodePrice","name":"nodePrice","type":"tuple"}],"name":"setNodePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"IMultinodeProtocol.NodeType","name":"nodeType","type":"bytes32"},{"internalType":"IMultinodeProtocol.ReturnRate","name":"returnRate","type":"uint256"}],"name":"setNodeReturnRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"withdrawalPeriod","type":"uint256"}],"name":"setWithdrawalPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stableCoin","outputs":[{"internalType":"contract IERC20Upgradeable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdrawInterest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"withdrawalTimePassed","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

  const MnodeTokenAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[],"name":"MAX_TAX","outputs":[{"internalType":"IMultinodeToken.TaxBracket","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_TAX","outputs":[{"internalType":"IMultinodeToken.TaxBracket","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TAX_AGGREGATE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TAX_BASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TAX_TIME_DURATION","outputs":[{"internalType":"IMultinodeToken.Timestamp","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"mintTo","type":"address"},{"internalType":"uint256","name":"initMint","type":"uint256"},{"internalType":"address","name":"acl_","type":"address"}],"name":"__initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"acl","outputs":[{"internalType":"contract IACL","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addTaxExemptAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addTaxTaggingAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountToSpend","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"components":[{"internalType":"IMultinodeToken.Timestamp","name":"received","type":"uint128"},{"internalType":"IMultinodeToken.TokenCount","name":"amount","type":"uint128"}],"internalType":"struct IMultinodeToken.TaxSafe[]","name":"taxData","type":"tuple[]"},{"internalType":"IMultinodeToken.TaxBracket","name":"minTax","type":"uint256"},{"internalType":"IMultinodeToken.TaxBracket","name":"maxTax","type":"uint256"},{"internalType":"IMultinodeToken.Timestamp","name":"taxTimeDuration","type":"uint128"}],"name":"calculateAmountToBurn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"disableGlobalTax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"disableSalesMode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enableGlobalTax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTaxExemptAddresses","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"taxed","type":"address"}],"name":"getTaxInfo","outputs":[{"components":[{"internalType":"IMultinodeToken.Timestamp","name":"received","type":"uint128"},{"internalType":"IMultinodeToken.TokenCount","name":"amount","type":"uint128"}],"internalType":"struct IMultinodeToken.TaxSafe[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTaxTaggingAddresses","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isTaxEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocol","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"removeTaxExemptAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"removeTaxTaggingAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"IMultinodeToken.TaxBracket","name":"maxTax","type":"uint256"}],"name":"setMaxTaxBracket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"IMultinodeToken.TaxBracket","name":"minTax","type":"uint256"}],"name":"setMinTaxBracket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"protocol_","type":"address"}],"name":"setProtocolContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"IMultinodeToken.Timestamp","name":"duration","type":"uint128"}],"name":"setTaxCountdownDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenSale_","type":"address"}],"name":"setTokenSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenSale","outputs":[{"internalType":"contract TokenSale","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenSaleEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}]

const MnodeTokenAddress = "0xc468f872961200ecaB30Cff4E618e7dEA8aeDD4D"

const MnodeNodeHandler = "0x9aF4b1e0d979190211347AeE3dE4C8F8EeDa0EA0"



  const web3 = new Web3(window.ethereum as any)

  const MnodeTokenContract = new web3.eth.Contract(MnodeTokenAbi as any, MnodeTokenAddress);

  const MnodeNodeContract = new web3.eth.Contract(MnodeNodeAbi as any, MnodeNodeHandler);

  const [rewards, setRewards] = useState(0)
  const [reserves, setReserves] = useState(0)
  const [smnPrice, setSmnPrice] = useState(0)
  const [refetch, setRefetch] = useState(false)
  const [myNode, setMyNode] = useState(false)
  const [refetchLocation, setRefetchLocation] = useState(false)
  const [token, setToken] = useState('Mnode_nodes')
  const [MnodePrice, setMnodePrice] = useState(0)

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
          <Info MnodeNodeContract={MnodeNodeContract} title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
          <SMNprice  title="$SMRT" val1="$0" val2={0} account={account} setMnodePrice={setMnodePrice} img='images/status1.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} />
          <TotalNodes title="Total Nodes" val1="6500" val2={-5} account={account}  refetch={refetch} token={token} img='images/status2.jpg' MnodeTokenContract={MnodeTokenContract} MnodeNodeContract={MnodeNodeContract}/>          
        </Cards>
        <BigCards>
          <IncomeCard img='images/earn.gif' rewards={rewards}  smnPrice={smnPrice} myNode={myNode} MnodeTokenContract={MnodeTokenContract} MnodeNodeContract={MnodeNodeContract} MnodePrice={MnodePrice}/>
            <CustomCards>
              <AvailReward account={account}  setRewards={setRewards} token={token} MnodeTokenContract={MnodeTokenContract} MnodeNodeContract={MnodeNodeContract}/>          
              <CreateNewNode account={account} setRefetch={setRefetch}  refetch={refetch}  MnodeTokenContract={MnodeTokenContract} MnodeNodeContract={MnodeNodeContract} token={token}/>
            </CustomCards>
        </BigCards>       
      </Page>
      </BrowserView>
      <MobileView>
      <Page>
        <Cards>
        <AutoCompound title="Auto Compound" status={false} img1='images/status4.jpg' img2='images/status42.jpg' setToken={setToken}/>
          <Info MnodeNodeContract={MnodeNodeContract} title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
          <SMNprice  title="$SMRT" setMnodePrice={setMnodePrice} val1="$0" val2={0} account={account} img='images/status1.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} />
          <TotalNodes title="Total Nodes" val1="6500" val2={-5} account={account} token={token}MnodeTokenContract={MnodeTokenContract} MnodeNodeContract={MnodeNodeContract} refetch={refetch} img='images/status2.jpg' />          
        </Cards>
        <BigCards> 
          <IncomeCard img='images/earn.gif' rewards={rewards}  smnPrice={smnPrice} myNode={myNode} MnodeTokenContract={MnodeTokenContract} MnodeNodeContract={MnodeNodeContract} MnodePrice={MnodePrice} />
            <CustomCards>
              <AvailReward account={account} MnodeTokenContract={MnodeTokenContract} MnodeNodeContract={MnodeNodeContract} setRewards={setRewards} token={token} />          
              {/* <CreateNewNode account={account} setRefetch={setRefetch} MnodeTokenContract={MnodeTokenContract} MnodeNodeContract={MnodeNodeContract} token={token} refetch={refetch}/> */}
            </CustomCards>
        </BigCards>       
      </Page>
      </MobileView>
    </>
  )
}

export default HomePoc