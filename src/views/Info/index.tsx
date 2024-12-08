import React, { useState, useEffect, useContext } from 'react'
import { BrowserView, MobileView } from 'react-device-detect';
import styled from 'styled-components'
import { Heading, Text, BaseLayout, useModal, tokenPairImageVariant } from 'toolkit/uikit'
import { useWeb3React } from '@web3-react/core'
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { Card, CardBody } from 'uikit'
import { ethers } from 'ethers';
import Web3 from "web3";
import { Label } from 'reactstrap';
import { AppHeader, AppBody } from '../../components/App'
import { setupNetwork2 } from '../../utils/wallet'
import Page from '../Page'
import { contractABI, contractAddress } from '../../Abi/NftAbi/NftConfig'
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

const BiggerCards = styled(Cards)`
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 18;
      font-size: 1.5em;      
      margin-left: 100px;      
      border-radius:80px;      
      max-width: 1400px; 
      box-shadow: 0 0 15px #f8981d;
      border: 1;     
      height: 96% !important;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 18;
    }
  }
`
const BiggerCards1 = styled(Cards)`
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 18;
      font-size: 1.5em;      
      margin-left: 400px;      
      border-radius:80px;      
      max-width: 800px;      
      box-shadow: 0 0 15px #f8981d;
      border: 1;     
      height: 96% !important;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 18;
    }
  }
`
const BiggerCards2 = styled(Cards)`
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 18;
      font-size: 1.5em;      
      margin-left: 400px;      
      border-radius:80px;      
      max-width: 100%;      
      box-shadow: 0 0 15px #f8981d;
      border: 1;     
      height: 96% !important;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 18;
    }
  }
`

const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  margin-bottom: 22px;
  margin-top: 24px;
  padding: 8px;
  border-radius: 12px;
  background: #3a3a3c;
  border-color: #faa21a;  
  box-shadow: 0 0 8px #f8981d;  
  text-align: center;
  width: 54%;
  border: 1;
  :focus{
    border: 0;
    outline: 0;
  }
`
const StyledInput2 = styled.input`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;  
  padding: 8px;
  width:100%;
  flex: 1;
  border-radius: 10px 0px 0px 10px;  
  background: #3a3a3c;
  border: 0px;
  outline: 0;
`

const SelectStyle = styled.select`
  color: #f7941d;
  background: #3a3a3c;
  border-radius: 10px;
  border: 0;
  outline: 0;
  height: 33px;
  width: 100%;
  margin-top: 10px;
  // with: 50px;
  // width: 80px;
`

const Actions = styled.div`
  margin-top: 24px;
`
const StyledCardBody = styled(CardBody)`
  height: 100%;
  display: flex;
  flex-direction: column; 
  align-items: center;  
  border-top: 1px solid;
  border-color: #faa21a; 
`
const StyledCardBody1 = styled(CardBody)`
  height: 100%;
  display: flex;
  max-width: 55%
  flex-direction: column; 
  align-items: center;    
`
const StyledCardBody2 = styled(CardBody)`
  height: 100%;
  display: flex;
  flex-direction: column; 
  align-items: center;    
`

const StyledButton = styled.button`  
  align-items: center;
  border: 1;
  border-color: #faa21a;
  box-shadow: 0 0 6px #f8981d;
  border-radius: 12px;
  padding: 15px;  
  margin-left: 680%;
  cursor: pointer;
  display: inline-flex;
  width: 100%;
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
  width: 70%;
  border: 1px solid;
  border-radius: 10px;
  border-color: #faa21a;
  box-shadow: 0 0 6px #faa21a;  
  padding: 10px;
  margin-top: 10px;

`


const Label11 = styled.div<{ labelSize: string }>`
font-size: 14px;
width: 70%;
color: #fff;
margin:0px 30px;
padding-top:20px;
`
const Labelm = styled.div<{ labelSize: string }>`
font-size: ${props => props.labelSize};
margin:0px 69px;
`
const Label1m = styled.div<{ labelSize: string }>`
font-size: ${props => props.labelSize};
margin:0px 105px;
`
const Label11m = styled.div<{ labelSize: string }>`
font-size: 14px;
width: 75%;
color: #fff;
margin:0px 30px;
padding-top:20px;
`

const BuyNode = () => {
  const [nftAmount, setNftAmount] = useState(1);
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('avax');
  const [rateAvax, setRateAvax] = useState(0);
  const [maxUserNodes, setMaxUserNodes] = useState(0);
  const [userNodes, setUserNodes] = useState(0);
  const [rateToken, setRateToken] = useState(0)
  const [usdtDecimals,setUsdtDecimals] = useState(1)

  const commonThings = useContext(ThingsContext)

  const { setSwapHeader} = commonThings as any
 
  const { account } = useWeb3React()


  const avaxToken = "0x0000000000000000000000000000000000000000"

  const usdtToken = "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664"


  const tokenAbi =  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
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
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
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
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
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
      "name": "balanceOf",
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
      "name": "decimals",
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
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
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
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
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
      "name": "totalSupply",
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
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
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
    }
  ]

 
 

    const { ethereum } = window;

    
       const web3 = new Web3(window.ethereum as any)
       const contract = new web3.eth.Contract(contractABI as any, contractAddress);

       const usdtContract = new web3.eth.Contract(tokenAbi as any, usdtToken);

      
       const [tokenBalance, setTokenBalance] = useState('0')

      

  useEffect(()=>{
    if(ethereum){

    contract.methods.mintPrice().call().then( function( info ) {
    
           setRateAvax(info)
       }); 
      
       usdtContract.methods.decimals().call().then( function( info ) {

             setUsdtDecimals(info)
         }); 
        

       
     if(account !== undefined){
         initialBalance()
        } 
      }


      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account])

  useEffect(()=>{
    setSwapHeader(false)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const initialBalance = async () => {
    if(token === "avax"){
    const avaxBalanceInitial =  await web3.eth.getBalance(account);
           setTokenBalance((parseInt(avaxBalanceInitial)/(10**18)).toFixed(2));
    } 
  }



  const buyNode = async () => {

    if(account === undefined){
      alert("Please Connect Wallet !!")
      return
    }
 
    if(ethereum){

         
         if(token === "avax"){
           const amount1 = (rateAvax*nftAmount).toLocaleString('fullwide', { useGrouping: false });
           const nftTxn = await contract.methods.mint(nftAmount).send({from: account, value: amount1});
           if(nftTxn){
             alert("Node Created Successfully !")
           }else{
             alert("Error in buying smart node !")
           }
 
             
       }
 
       } 
 
   }


  const inputHandleChange = (e) => {
    setNftAmount(e.target.value);
  }
  const inputHandleChange2 = (e) => {
    setAmount(e.target.value);
  }
  const tokenChange = async (e) => {
    console.log(e.target.value);
    setToken(e.target.value);
    if(e.target.value === "avax"){
      const avaxBalance =  await web3.eth.getBalance(account);
     setTokenBalance((parseInt(avaxBalance)/(10**18)).toFixed(2));
    }
   
  }

  return (
    <>    
    <BrowserView>
      <Page>
        <BiggerCards>
        <AppBody>        
          <AppHeader title='Smart Finance' subtitle='Revolutionizing DeFi' noConfig />              
          <StyledCardBody>            
            <Link to="/mint">
              <img alt="Smart Finance" src="/images/home/coverimgmint.png"/>                        
            </Link>
          </StyledCardBody>                    
        </AppBody>
        </BiggerCards>
        <BiggerCards1>            
        <StyledCardBody1>           
          <img alt="Smart Finance" src="images/home/banner11.gif" style={{borderRadius: '50px'}}/>
          </StyledCardBody1>          
        </BiggerCards1>
      </Page >
      </BrowserView>
      <MobileView>
      <Page>
        <BiggerCards>
        <AppBody>        
          <AppHeader title='Smart Finance' subtitle='Revolutionizing DeFi' noConfig />              
          <StyledCardBody>   
            <Link to="/mint">         
              <img alt="Smart Finance" src="/images/home/coverimgmint.png" style={{width: '100%', borderRadius: '30px'}} />   
            </Link>
          </StyledCardBody>                    
        </AppBody>
        </BiggerCards>
        <BiggerCards2>
        <StyledCardBody2>          
          <img alt="Smart Finance" src="images/home/banner11.gif" style={{width: '100%', borderRadius: '30px'}}/>
          </StyledCardBody2>          
        </BiggerCards2>
      </Page >
      </MobileView> 
    </>
    
  )
}

export default BuyNode
