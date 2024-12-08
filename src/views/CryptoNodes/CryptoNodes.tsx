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
  


  const cryptonodehandlerAbi = [{"inputs":[{"internalType":"contract AI","name":"_tokenContract1","type":"address"},{"internalType":"contract IERC20","name":"_tokenContract2","type":"address"},{"internalType":"contract IERC721","name":"_nftContract","type":"address"},{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"blacklisted","type":"address"},{"indexed":true,"internalType":"bool","name":"added","type":"bool"}],"name":"Blacklist","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"who","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NodesCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"who","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"uint8","name":"lvl","type":"uint8"}],"name":"NodesUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"},{"indexed":true,"internalType":"bool","name":"added","type":"bool"}],"name":"Ownership","type":"event"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"addBlacklistMember","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC721","name":"_contract","type":"address"}],"name":"changeNFTContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"checkBlacklistMember","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"checkNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"checkNodesLvl1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"checkNodesLvl2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"checkNodesMoney","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"claimNodesMoney","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"createNodes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"removeBlacklistMember","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_status","type":"bool"}],"name":"stopNodes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalNodesLvl1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalNodesLvl2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"transferOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"upgradeToLvl2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const cryptonodetokenAbi = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"blacklisted","type":"address"},{"indexed":true,"internalType":"bool","name":"added","type":"bool"}],"name":"Blacklist","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"},{"indexed":true,"internalType":"bool","name":"added","type":"bool"}],"name":"Ownership","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"InvestorWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MarketingWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PresaleWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RewardPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"TaxDistribution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TeamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TransitWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TreasuryWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"addBlacklistMember","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_contract","type":"address"}],"name":"addGameContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"addNoTaxMember","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_contract","type":"address"}],"name":"addPresaleContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"addTraderJoe","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"changeLiquidityPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_tax","type":"uint8"}],"name":"changeTax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"checkBlacklistMember","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"checkNoTaxMember","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"removeBlacklistMember","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"removeNoTaxMember","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"transferOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
        

const cryptonodeTokenAddress = "0x2EfB4FEc95DeAAb8c199CA5089E0cFD52373f92D"

const cryptonodeNodeHandler = "0x03EeE389D3BA394d944CBCDCB8F6a6B34d9982b7"



  const web3 = new Web3(window.ethereum as any)

  const cryptoTokenContract = new web3.eth.Contract(cryptonodetokenAbi as any, cryptonodeTokenAddress);

  const cryptoNodeContract = new web3.eth.Contract(cryptonodehandlerAbi as any, cryptonodeNodeHandler);

  const [rewards, setRewards] = useState(0)
  const [reserves, setReserves] = useState(0)
  const [smnPrice, setSmnPrice] = useState(0)
  const [refetch, setRefetch] = useState(false)
  const [myNode, setMyNode] = useState(false)
  const [refetchLocation, setRefetchLocation] = useState(false)
  const [token, setToken] = useState('crypto_nodes')
  const [CRNDPrice, setCRNDPrice] = useState(0)

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
          <Info cryptoNodeContract={cryptoNodeContract} title="Info" val1="6500" val2={-5} account={account}  refetch={refetch} img='images/status2.jpg' />
          <SMNprice  title="$SMRT" val1="$0" val2={0} account={account} setCRNDPrice={setCRNDPrice} img='images/status1.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} />
          <TotalNodes title="Total Small Nodes" val1="6500" val2={-5} account={account} token={token}cryptoTokenContract={cryptoTokenContract} cryptoNodeContract={cryptoNodeContract} refetch={refetch} img='images/status2.jpg' />          
        </Cards>
        <BigCards>
          <IncomeCard img='images/earn.gif' rewards={rewards}  smnPrice={smnPrice} myNode={myNode} cryptoTokenContract={cryptoTokenContract} cryptoNodeContract={cryptoNodeContract} CRNDPrice={CRNDPrice}/>
            <CustomCards>
              <AvailReward account={account}  setRewards={setRewards} token={token} cryptoTokenContract={cryptoTokenContract} cryptoNodeContract={cryptoNodeContract}/>          
             <CreateNewNode account={account} setRefetch={setRefetch}  refetch={refetch}  cryptoTokenContract={cryptoTokenContract} cryptoNodeContract={cryptoNodeContract} token={token}/>)
            </CustomCards>
        </BigCards>      
      </Page>
      </BrowserView>
      <MobileView>
      <Page>
        <Cards>
        <AutoCompound title="Auto Compound" status={false} img1='images/status4.jpg' img2='images/status42.jpg' setToken={setToken}/>
          <Info title="Info" val1="6500" val2={-5} account={account} cryptoNodeContract={cryptoNodeContract} refetch={refetch} img='images/status2.jpg' />
          <SMNprice  title="$SMRT" setCRNDPrice={setCRNDPrice} val1="$0" val2={0} account={account} img='images/status1.jpg' setSmnPrice={setSmnPrice} refetchLocation={refetchLocation} />
          <TotalNodes title="Total Nodes" val1="6500" val2={-5} account={account} token={token}cryptoTokenContract={cryptoTokenContract} cryptoNodeContract={cryptoNodeContract} refetch={refetch} img='images/status2.jpg' />          
        </Cards>
        <BigCards>
          <IncomeCard img='images/earn.gif' rewards={rewards}  smnPrice={smnPrice} myNode={myNode} cryptoTokenContract={cryptoTokenContract} cryptoNodeContract={cryptoNodeContract} CRNDPrice={CRNDPrice} />
            <CustomCards>
              <AvailReward account={account} cryptoTokenContract={cryptoTokenContract} cryptoNodeContract={cryptoNodeContract} setRewards={setRewards} token={token} />          
              <CreateNewNode account={account} setRefetch={setRefetch} cryptoTokenContract={cryptoTokenContract} cryptoNodeContract={cryptoNodeContract} token={token} refetch={refetch}/>
            </CustomCards>
        </BigCards>      
      </Page>
      </MobileView>
    </>
  )
}

export default HomePoc