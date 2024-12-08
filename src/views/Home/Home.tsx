import React, {useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Web3 from "web3";
import { Heading, Text, BaseLayout } from 'toolkit/uikit'
import Page from 'components/Layout/Page'
import { useWeb3React } from '@web3-react/core'
import {BrowserView, MobileView} from 'react-device-detect'
import { Helmet } from 'react-helmet-async';
import { setupNetwork1 } from '../../utils/wallet'
import TotalClaimedSMN from './components/TotalClaimedSMN'
import TotalNFTs from './components/TotalNFTs'
import SMNprice from './components/SMNprice'
import AutoCompound from './components/AutoCompound'
import IncomeCard from './components/IncomeCard'
import NodesListCard from './components/NodesListCard'
import PriceChart from './components/PriceChart'
import AvailReward from './components/AvailReward'
import CreateNewNode from './components/CreateNewNode'
import { contractABI, contractAddress } from '../../Abi/NftAbi/limitedNftConfig'
import { contractABI as contractABI1, contractAddress as contractAddress1 } from '../../Abi/NftAbi/ogNftConfig'
import ThingsContext from '../../swapContext'

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

const Home: React.FC = () => {
  const { account } = useWeb3React();
   const nodeAbi = [
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_rewardPerNode",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "_minPrice",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "blockTime",
          "type": "uint256"
        }
      ],
      "name": "NodeCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "airdrop",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "boostEndTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "boostRewardsPerNode",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "cashoutAllNodesRewards",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_creationTime",
          "type": "uint256"
        }
      ],
      "name": "cashoutNodeReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_creationTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "rewardAmount_",
          "type": "uint256"
        }
      ],
      "name": "compoundNodeReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "nodeName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "amount_",
          "type": "uint256"
        }
      ],
      "name": "createNode",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getAllNodes",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "creationTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastClaimTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "internalType": "struct nodeHandler.NodeEntity[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getAllNodesRewards",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getIndexOfKey",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMinPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getNodeNumberOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_creationTime",
          "type": "uint256"
        }
      ],
      "name": "getNodeReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getNodesCreationTime",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getNodesLastClaimTime",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getNodesNames",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalNodes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "isNodeOwner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "nodesPerUser",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "presale",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardPerNode",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalClaimed",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalNodesCreated",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalStaked",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_airDrop",
          "type": "address"
        }
      ],
      "name": "updateAirDrop",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8[]",
          "name": "newVal",
          "type": "uint8[]"
        }
      ],
      "name": "updateBoostMultipliers",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8[]",
          "name": "newVal",
          "type": "uint8[]"
        }
      ],
      "name": "updateBoostRequiredDays",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newVal",
          "type": "uint256"
        }
      ],
      "name": "updateMinPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_presale",
          "type": "address"
        }
      ],
      "name": "updatePresale",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8[]",
          "name": "newVal",
          "type": "uint8[]"
        }
      ],
      "name": "updateReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newToken",
          "type": "address"
        }
      ],
      "name": "updateToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  const compoundAbi = [{"inputs":[{"internalType":"address","name":"_nodeManager","type":"address"},{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_refpool","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"cashoutAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cashoutFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"cmpdUserDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"compoundRewardsForNode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"compoundTax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_value","type":"bool"}],"name":"enableSwapLiquify","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getAllNodesRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"i","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"joeRouter","outputs":[{"internalType":"contract IPangolinRouter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nodeManager","outputs":[{"internalType":"contract INodeManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nodeName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nodeValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refPool","outputs":[{"internalType":"contract reflections","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardsPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsPoolPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapLiquifyEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamPoolPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract smartNodes","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value1","type":"uint256"},{"internalType":"uint256","name":"value2","type":"uint256"}],"name":"updateCashoutDistribution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"updateCashoutFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_compoundTax","type":"uint256"}],"name":"updateCompoundTax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"updateDevPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_joeRouter","type":"address"}],"name":"updateJoeRouter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_nodeManager","type":"address"}],"name":"updateNodeHandler","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nodeValue","type":"uint256"}],"name":"updateNodeValue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_refPool","type":"address"}],"name":"updateReflectionsPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsPool","type":"address"}],"name":"updateRewardsPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_teamPool","type":"address"}],"name":"updateTeamPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"updateToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
 
  const nodeAddress = "0x0ebee3d12792fbbfcb05f50e808e4aa21cfab04c"

  const compoundAddress = "0xc901A4e6d68507b9b36c7A39AA5F1B0a8b1028ae"

  const web3 = new Web3(window.ethereum as any)

  const nodeContract = new web3.eth.Contract(nodeAbi as any, nodeAddress);

  const nftContract = new web3.eth.Contract(contractABI as any, contractAddress);

  const nftContractOg = new web3.eth.Contract(contractABI1 as any, contractAddress1);

  const compoundContract = new web3.eth.Contract(compoundAbi as any, compoundAddress);
  const [rewards, setRewards] = useState(0)
  const [reserves, setReserves] = useState(0)
  const [smnPrice, setSmnPrice] = useState(0)
  const [refetch, setRefetch] = useState(false)
  const [myNode, setMyNode] = useState(false)
  const [refetchLocation, setRefetchLocation] = useState(false)
  const [refetchCompound, setRefetchCompound] = useState(false)

  const commonThings = useContext(ThingsContext)
  const { setSwapHeader } = commonThings as any

  useEffect(() => {
   
    setupNetwork1(43114)

   setSwapHeader(false)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 

  return (
    <>
    <Helmet>
      <title>Smart Finance - Smart NFTs</title>
      <link rel="canonical" href="https://dapp.smartfinance.exchange/dashboard/" />
    </Helmet>
    <BrowserView>
      <Page>
        <img src="/images/home/billboard2.png" alt="Smart Finance" style={{width:"90%", marginLeft:"5%", borderRadius:"30px", paddingBottom:"20px"}}/>        
        <BigCards>
            <TotalNFTs title="Total NFTs" val1="6500" val2={-5} account={account} nodeContract={nodeContract} refetch={refetch} img='images/status2.jpg' nftContract={nftContract} nftContractOg={nftContractOg} />          
            <CreateNewNode account={account} setRefetch={setRefetch}  refetch={refetch} nftContractOg={nftContractOg}/>
        </BigCards>
        <BiggerCards>          
          <NodesListCard nftContract={nftContract} compoundContract={compoundContract} account={account} nodeContract={nodeContract} refetch={refetch} setMyNode={setMyNode} refetchCompound={refetchCompound} nftContractOg={nftContractOg}/>
        </BiggerCards>
      </Page>
      </BrowserView>
      <MobileView>
      <Page>      
          <img src="/images/home/billboard2.png" alt="Smart Finance" style={{width:"90%", marginLeft:"5%", borderRadius:"10px", paddingBottom:"20px"}}/>                
        <BigCards>        
          <CustomCards>
            <CreateNewNode account={account}  setRefetch={setRefetch} refetch={refetch} nftContractOg={nftContractOg}/>            
            <TotalNFTs title="Total NFTs" val1="6500" val2={-5}  account={account} nodeContract={nodeContract}  refetch={refetch} img='images/status2.jpg' nftContract={nftContract} nftContractOg={nftContractOg}/>
          </CustomCards>
        </BigCards>
        <BiggerCards>          
          <NodesListCard nftContract={nftContract} compoundContract={compoundContract} account={account} nodeContract={nodeContract} refetch={refetch} setMyNode={setMyNode} refetchCompound={refetchCompound} nftContractOg={nftContractOg}/>
        </BiggerCards>
      </Page>
      </MobileView>
    </>
  )
}
export default Home