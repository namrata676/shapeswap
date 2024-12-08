import React, { useState, useEffect, useContext } from 'react'
import { BrowserView, MobileView } from 'react-device-detect';
import ReactLoading from 'react-loading'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, useModal, tokenPairImageVariant } from 'toolkit/uikit'
import { useWeb3React } from '@web3-react/core'
import { Card, CardBody } from 'uikit'
import { ethers } from 'ethers';
import Web3 from "web3";
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import {  ToastContainer, toast } from 'react-toastify';
import ReactPixel from 'react-facebook-pixel';
import { AppHeader, AppBody } from '../../components/App'
import { setupNetwork1, setupNetwork2 } from '../../utils/wallet'
import Page from '../Page'
import ThingsContext from '../../swapContext'
import MintModal from '../mintModal/mintModal'
import { getTokenImage, getNetwork } from './avalancheutils'
import CoinsModal from '../coinsModal/CoinsModal'
import CoinsSelectModal from '../coinsSelectModal/CoinsSelectModal'


import { contractABI, contractAddress } from '../../Abi/NftAbi/limitedNftConfig'
import { contractABI as contractABIBsc, contractAddress as contractAddressBsc } from '../../Abi/NftAbi/BscNft'
import { contractABI as contractABIAvax, contractAddress as contractAddressAvax } from '../../Abi/NftAbi/avalancheNft'
import { polarcontractAddress, polarABI, joePairPolar} from '../../Abi/avalancheSwap/polarConfig'


const advancedMatching = { em: 'smartfinanceexchange@gmail.com',
                           ct: 'Rockford',
                           st: 'Illinois',
                           country: 'United States',
                           fn: 'Smart',
                           ln: 'Finance',
                           ge: 'm',
                           db: '19840406',
                           zp: '61101',
                           ph: '18156083932'
                          }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
const options = {
  autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
  debug: false, // enable logs
};

ReactPixel.init('659109152243955', advancedMatching, options);
ReactPixel.pageView(); // For tracking page view
// ReactPixel.trackSingle('659109152243955', event, data);


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
      background-color: #1b2028; 
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    & > div {
      grid-column: span 6;
      background-color: #1b2028; 
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
      position: relative;
      margin: 0 auto;     
      background-color: #1b2028;      
      border: 1;     
      box-shadow: 0px 0px 10px rgba(34, 60, 122, 0.856);
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
    }
  }
`

const StyledInput = styled.input`
  color: white !important;
  font-size: 12px !important;
  
  margin-top: 24px;
  padding: 10px;
  border-radius: 12px;
  background-color: #272f37;
  box-shadow: 0px 0px 10px rgba(34, 60, 122, 0.856); 
  text-align: center;
  width: 35%;
  border: 1;
  :focus{
    border: 0;
    outline: 0;
  }
`
const StyledInput1 = styled.input`
  color: white !important;
  font-size: 12px !important;
  
  margin-top: 24px;
  padding: 10px;
  border-radius: 12px;
  background-color: #272f37;
  box-shadow: 0px 0px 10px rgba(34, 60, 122, 0.856);  
  text-align: center;
  width: 75%;
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
  box-shadow: 0px 0px 10px rgba(34, 60, 122, 0.856);
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
  background-color: #1b2028; 
`

const StyledButton = styled.button`
  order: 4;
  align-items: center;
  border: 1;
   
  border-radius: 12px;
  padding: 12px;
  margin-top: 10px;
  cursor: pointer;
  display: inline-flex;
  width: 55%;
  font-family: inherit;
  font-size: 26px !important;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-color: #272f37;
  color: white;
  transition: background-color 0.2s, opacity 0.2s;
  box-shadow: 0px 0px 10px rgba(34, 60, 122, 0.856);
  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`;


const StyledButton1 = styled.button`
  order: 4;
  align-items: center;
  border: 1;
  box-shadow: 0px 0px 10px rgba(34, 60, 122, 0.856);
  border-radius: 12px;
  padding: 12px;
  margin-top: 10px;
  cursor: pointer;
  display: inline-flex;
  width: 75%;
  font-family: inherit;
  font-size: 26px !important;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-color: #272f37;
  color: white;
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
  background: #272f37;
  font-family: inherit;
  font-size: 16px;
  justify-content: center;
  letter-spacing: 0.03em;
  color: white;
  transition: background-color 0.2s, opacity 0.2s;
  box-shadow: 0px 0px 10px rgba(34, 60, 122, 0.856);
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
  box-shadow: 0px 0px 10px rgba(34, 60, 122, 0.856);
  padding: 10px;
  margin-top: 10px;

`


const Label = styled.div<{ labelSize: string }>`
font-size: 14px;
color: #fff;
padding-top:20px;
`
const Labelm = styled.div<{ labelSize: string }>`
font-size: 18px !important;
margin:5px 69px;
padding-top: 5px;
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

const Label1 = styled.div<{ labelSize: string }>`
font-size: 28px !important;
color: #faa21a;
padding: 10px;
`
const BuyNode = () => {
  const [nftAmount, setNftAmount] = useState(1 as any);
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('avax');
  const [rateAvax, setRateAvax] = useState(0);
  const [maxUserNodes, setMaxUserNodes] = useState(0);
  const [userNodes, setUserNodes] = useState(0);
  const [rateToken, setRateToken] = useState(0)
  const [usdtDecimals,setUsdtDecimals] = useState(1)
  const [token1List, setToken1List] = useState([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [approveLoading, setApproveLoading] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
 
  const { account : accountFinal } = useWeb3React();
  const [token1, setToekn1] = useState('');
  const [token1Object, setToken1Object] = useState({
    "name": "Token",
    "exchangeIndex" : 0,
    "icon": "",
    "chain": "avax",
    "tokenAddress" : "",
    "decimals": 0,
    "photoUrl" : null


  })

  const [responseData, setResponseData] = useState({

  } as any)

  const commonThings = useContext(ThingsContext)
  const { setSwapHeader, account, setAccount} = commonThings as any

  console.log( 'account@@',account)

  useEffect(() => {
 
    const account1 = localStorage.getItem("account")
    
    if(account1 !== null && account1 !== undefined){
     setAccount(account1)
    
    } else {
      if(accountFinal !== undefined){
      localStorage.setItem("account",accountFinal)
      }
      setAccount(accountFinal)     
    }
    
   // eslint-disable-next-line react-hooks/exhaustive-deps
    },[accountFinal])



    const confirmCall = () => {
      console.log('token1mint',token1)
      setSwapLoading(true)
      setConfirmLoading(true)
    if(getNetwork1 === "bsc"){
       if(token1 !== "" && token1 !== "None"){
      axios.get(`https://1f8vxhjggh.execute-api.us-east-1.amazonaws.com/getCrossNFTSwap?dest_nft_receiver=${account}&src_sell_token=${token1Object?.name}&nft_amount=${nftAmount}&nft_address=0xfa964bEe00fCaF7d6f0b8C5Bfc4Ad6735E0a3e56`)
   .then(function (response) {
     // handle success
     setResponseData(response?.data)
     console.log("Responsechainmint", response?.data);
     setSwapLoading(false)
     setShowConfirm(false)
     setConfirmLoading(false)
     // approveToken()
    
      // eslint-disable-next-line dot-notation 
    console.log("mintprice1",response["data"]["final_swap_details"]["srcSwapData"]["sellAmount"]/10**(token1Object?.decimals))
     // eslint-disable-next-line dot-notation 
     setMintPrice(parseFloat(((response["data"]["final_swap_details"]["srcSwapData"]["sellAmount"])/10**(token1Object?.decimals))?.toFixed(5))) 
  
 
   })
   .catch(function (error) {
     // handle error
     console.log(error);
     setSwapLoading(false)
    notifyConfirmError()
    setConfirmLoading(false)
   })
      
    }
  } else if (getNetwork1 === "avalanche") {

    if((token1Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){
      setSwapLoading(false)
      setShowConfirm(false)
      setConfirmLoading(false)
      setMintPrice((rateAvax/10**(token1Object?.decimals)))

      return

    }

    if(token1 !== "" && token1 !== "None"){
      axios.get(`https://1f8vxhjggh.execute-api.us-east-1.amazonaws.com/getNFTSwap?dest_nft_receiver=0x92e98B4DaBB28c051394db6B0A438084ebC6199F&src_sell_token=${token1Object?.name}&nft_amount=1&nft_address=0xfa964bEe00fCaF7d6f0b8C5Bfc4Ad6735E0a3e56`)
   .then(function (response) {
     // handle success
     setResponseData(response?.data)
     console.log("Responsechainmint", response?.data);
     setSwapLoading(false)
     setShowConfirm(false)
     setConfirmLoading(false)
     // approveToken()
    
    // eslint-disable-next-line dot-notation 
    // console.log("mintprice1",response["data"]["final_swap_details"]["srcSwapData"]["0xswapData"]["sellAmount"]/10**(token1Object?.decimals))

    // eslint-disable-next-line dot-notation 
     setMintPrice(parseFloat(((response["data"]["local_swap_details"]["sellAmount"])/10**(token1Object?.decimals))?.toFixed(5))) 
  
 
   })
   .catch(function (error) {
     // handle error
     console.log(error);
     setSwapLoading(false)
    notifyConfirmError()
    setConfirmLoading(false)
   })
      
    }

  }
  }
//     useEffect(()=>{
//      console.log('token1mint',token1)
//      setSwapLoading(true)
//       if(token1 !== "" && token1 !== "None"){
//      axios.get(`https://44.211.182.40:8000/getCrossNFTSwap/?dest_nft_receiver=0x92e98B4DaBB28c051394db6B0A438084ebC6199F&src_sell_token=${token1Object?.name}&nft_amount=${nftAmount}`)
//   .then(function (response) {
//     // handle success
//     setResponseData(response?.data)
//     console.log("Responsechainmint", response?.data);
//     setSwapLoading(false)
//    // eslint-disable-next-line dot-notation 
//    console.log("mintprice1",response["data"]["final_swap_details"]["srcSwapData"]["0xswapData"]["sellAmount"]/10**(token1Object?.decimals))
//    // eslint-disable-next-line dot-notation 
//     setMintPrice(parseFloat(((response["data"]["final_swap_details"]["srcSwapData"]["0xswapData"]["sellAmount"])/10**(token1Object?.decimals))?.toFixed(5)))
 

//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//     setSwapLoading(false)
//   })

// }

//  // eslint-disable-next-line react-hooks/exhaustive-deps
//     },[token1Object])


    const tokenFunc1 = async(tokenName,tokenSelected) => {
      setToekn1(tokenSelected?.name);
      setToken1Object(tokenSelected)
  
       
      
     }


    useEffect(()=>{
    
        const initialToken =  token1List.find(p => (p?.tokenAddress) === ("0x0000000000000000000000000000000000000000"))
        console.log("initialtokentokenwe",initialToken)
        if(initialToken !== undefined){
          tokenFunc1("token1",initialToken)
          // setToken1Object(initialToken)
          // setToekn1(initialToken?.name)
        }
      
     
      
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token1List])

    

  const notifySuccess = () => {
    
    toast.success('Successfully Minted NFTs !', {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      });
  
};

const notifyWarning = () => {
    
  toast.warning('Please Connect Wallet!!', {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    });
};


const notifyWarningEmpty = () => {
    
  toast.warning('Please Select Network And Token !!', {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    });
};

const notifyWarningEmpty1 = () => {
    
  toast.warning('Please Confirm Your Selection !!', {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    });
};


const notifyError = () => {
  toast.error('Error Minting NFTs !', {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

};

const notifyMaxError = () => {
 
toast.error('Maximum NFTs Cannot Exceed 25!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

};

const notifyEmptyError = () => {
  
 toast.error('Number Of NFTs Cannot Be Empty!', {
       position: "bottom-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       });
 
 
 };

 const notifyConfirmError = () => {
  
  toast.error('Please Hit Confirm Again!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  
  
  };


    const { ethereum } = window;
    
       const web3 = new Web3(window.ethereum as any)
       const contract = new web3.eth.Contract(contractABI as any, contractAddress);


       const  swapContractBsc = new web3.eth.Contract(contractABIBsc as any, contractAddressBsc);

       const  swapContractAvax = new web3.eth.Contract(contractABIAvax as any, contractAddressAvax);

       

      
       const [tokenBalance, setTokenBalance] = useState('0')



  useEffect(()=>{
    if(ethereum){

    contract.methods.mintPrice().call().then( function( info ) {
    console.log('mintprice', info)
           setRateAvax(info)
       });     
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account])

  const initialBalance = async () => {
    if(token === "avax"){
    const avaxBalanceInitial =  await web3.eth.getBalance(account);
           setTokenBalance((parseInt(avaxBalanceInitial)/(10**18)).toFixed(2));
    } 
  }

  useEffect(() =>{

    const hasSetup = setupNetwork1(43114)
    setSwapHeader(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
       },[])

  const buyNft = async () => {

    if(account === undefined){
      notifyWarning()
      return
    }
   
    if(nftAmount === '' || nftAmount === '0' || nftAmount === 0){
     notifyEmptyError()
     return
    }

    if(getNetwork1 === "Network" || token1 === ""){
      notifyWarningEmpty()
      return
    }

    if(showConfirm === true){
      notifyWarningEmpty1()
      return
    }
 
    if(ethereum){

           if(nftAmount > 1 ){
           notifyMaxError()
            return
           }

           console.log("enterr not order")
          if(getNetwork1 === "bsc"){
           const swapContract = swapContractBsc
           console.log("crossswapNOTORDER", swapContract)
   
            // const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
             const am  = (Math.trunc(parseInt(responseData?.sellAmount) + parseInt((responseData?.LocalProtocolNativeFees)))).toLocaleString('fullwide', { useGrouping: false });
   
             console.log("enter not order am", am)
             console.log("enter not order am1", responseData?.LocalProtocolNativeFees/10**token1Object?.decimals)
   
             const amountFinalWithFees = am
        
               const amountOut = (responseData?.sellAmount)

           if((token1Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){

          
            
            // eslint-disable-next-line dot-notation 
           const am2  = (Math.trunc(parseInt(responseData?.final_swap_details?.cross_chain_gas_estimate) + parseInt((responseData["final_swap_details"]["srcSwapData"]["sellAmount"])))).toLocaleString('fullwide', { useGrouping: false });
           console.log( "entercrossnativetonative",responseData?.final_swap_details?.dest_stargate_chain_id, null, responseData?.final_swap_details?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.final_swap_details?.stargateSwapData?.stargateData)
          
          try{
          const nftTxn = await swapContract.methods.sendCrossSwapNativeForToken(responseData?.final_swap_details?.dest_stargate_chain_id, "0x0000000000000000000000000000000000000000", responseData?.final_swap_details?.srcSwapData?.srcSwapData,responseData?.final_swap_details?.destSwapData?.nftDestSwapData,responseData?.final_swap_details?.stargateSwapData?.stargateData).send({from: account, value: am2});
     
          notifySuccess()
          } catch(e) {
           console.log("errorcross1",e)
           notifyError()
          }
       } else {
        console.log("crosstokentoken",responseData?.dest_stargate_chain_id,responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.nftDestSwapData
        ,responseData?.stargateSwapData?.stargateData)
         try{
         const nftTxn = await swapContract.methods.sendCrossSwapTokenForToken(responseData?.final_swap_details?.dest_stargate_chain_id, "0x0000000000000000000000000000000000000000", responseData?.final_swap_details.srcSwapData?.srcSwapData,responseData?.final_swap_details.destSwapData?.nftDestSwapData
         ,responseData?.final_swap_details?.stargateSwapData?.stargateData).send({from: account, value: responseData?.final_swap_details?.cross_chain_gas_estimate});
       
          notifySuccess()
        
         } catch(e) {
              console.log("error",e)
              notifyError()
         }
        } 
         }
         else if (getNetwork1 === "avalanche") {

          const swapContract = swapContractAvax
          console.log("crossswapNOTORDER", swapContract)
  
           // const amountFinal = ((Math.trunc(amount1*(10**token1Object?.decimals)).toLocaleString('fullwide', { useGrouping: false })));
            const am  = (Math.trunc(parseInt(responseData?.sellAmount) + parseInt((responseData?.LocalProtocolNativeFees)))).toLocaleString('fullwide', { useGrouping: false });
  
            console.log("enter not order am", am)
            console.log("enter not order am1", responseData?.LocalProtocolNativeFees/10**token1Object?.decimals)
  
            const amountFinalWithFees = am
       
              const amountOut = (responseData?.sellAmount)

          if((token1Object?.tokenAddress)?.toLowerCase() === ('0x0000000000000000000000000000000000000000')?.toLowerCase()){

         
            const amount1 = (rateAvax*1).toLocaleString('fullwide', { useGrouping: false });
           try {
           const nftTxn = await contract.methods.mint(nftAmount).send({from: account, value: amount1});
           notifySuccess()
           setNftAmount(0)
           } catch {
            notifyError()
           }
      } else {
       console.log("crosstokentoken",responseData?.dest_stargate_chain_id,responseData?.srcSwapData?.srcSwapData,responseData?.destSwapData?.destSwapData,responseData?.stargateSwapData?.stargateData)
        try{
        const nftTxn = await swapContract.methods.buyNFTByToken(responseData?.local_swap_details?.sellTokenAddress, responseData?.local_swap_details?.sellAmount, account, "0xdef1c0ded9bec7f1a1670819833240f027b25eff" , account,responseData?.local_swap_details?.data, "0x7B141bB117dc3D2E23A74C59BFeEfd7470bEdEd0", 1).send({from: account});
      
         notifySuccess()
       
        } catch(e) {
             console.log("error",e)
             notifyError()
        }
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

   const [onPresentNetworkModal] =  useModal(<MintModal /> )

   const [currentChain, setCurrentChain] = useState(0)

   const [chainChanged, setChainChanged] = useState(false)
 
   const [getNetwork1, setGetNetwork1] = useState("Network")
 
   const [initToken, setInitToken] = useState(false)

   const [tokenBal, setTokenBal] = useState([])
   const [usdtToken, setUsdtToken] = useState({} as any)
   const [usdcToken, setUsdcToken] = useState({} as any)

   const [loading, setLoading] = useState(false)
   const [swapLoading, setSwapLoading] = useState(false)
   const [mintPrice, setMintPrice] = useState(0)


   useEffect (()=> {




    const object1 = {
      "name": "Token",
      "exchangeIndex" : 0,
      "icon": "",
      "chain": "avax",
      "tokenAddress" : "",
      "decimals" : 0,
      "photoUrl" : null
   }
  
    setToken1Object(object1)
    setToekn1("")
  
    axios.get('https://1f8vxhjggh.execute-api.us-east-1.amazonaws.com/tokenList',{
      params: {
        chain_name: getNetwork1
      }
    })
    .then(function (response) {
      // handle success
      console.log("Responsetoken", response);
      
      if(response?.data?.token_list_data){
           const res = response?.data?.token_list_data
           const ethArray = res
          //  const network = getCurrentNetwork(getNetwork1)
          //  if(network === currentChain){
          //   initialBal(res)
          //  }
           if(getNetwork1 === "ethereum"){
              const ethToken = res.find((token7) => token7?.tokenAddress === "0x0000000000000000000000000000000000000000")
              ethArray[0] = ethToken
              const usdcToken1 = res.find((token7) => (token7?.name)?.toLowerCase() === "usdc")
            const usdtToken1 = res.find((token7) => (token7?.name)?.toLowerCase() === "usdt")
            if(usdcToken1 !== undefined){
             setUsdcToken(usdcToken1)
            }
            else{
              setUsdcToken({})
            }
            if(usdtToken1 !== undefined){
             setUsdtToken(usdtToken1)
            } else {
              setUsdtToken({})
            }
  
          
         
              setToken1List(ethArray)
          
           } else {
            const usdcToken1 = res.find((token7) => (token7?.name)?.toLowerCase() === "usdc")
            const usdtToken1 = res.find((token7) => (token7?.name)?.toLowerCase() === "usdt")
            // const ethToken = res.find((token) => token?.tokenAddress === "0x0000000000000000000000000000000000000000")
           // ethArray[0] = ethToken
            if(usdcToken1 !== undefined) {
              setUsdcToken(usdcToken1)
            }
            else{
              setUsdcToken({})
            }
            if(usdtToken1 !== undefined){
              setUsdtToken(usdtToken1)
            }
            else {
              setUsdtToken({})
            }
              setToken1List(res)
          }
     
      } else {
        setToken1List([])
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[getNetwork1])

  useEffect(()=>{
    if(token1 !== ""){
setShowConfirm(true)
    }
    setMintPrice(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token1Object])
 
   const [networkListCross, setGetNetworkListCross] = useState([
     {
         "id": 1,
         "name": "bsc",
         "stargatechainid": 102,
         "isCrossSwapEnabled": true,
         "isChainActive": true,
         "disabled": false,
         "color": "white",
     },
     {
         "id": 4,
         "name": "avalanche",
         "stargatechainid": 106,
         "isCrossSwapEnabled": true,
         "isChainActive": true,
         "disabled": false,
         "color": "white",
     },
     {
      "id": 10,
      "name": "ethereum",
      "stargatechainid": 101,
      "isCrossSwapEnabled": true,
      "isChainActive": true,
      "disabled": true,
      "color": "grey",
  },
     {
         "id": 6,
         "name": "polygon",
         "stargatechainid": 109,
         "isCrossSwapEnabled": true,
         "isChainActive": true,
         "disabled": true,
         "color": "grey",
     }
   ] )
 
 
   if(ethereum) {
     const outerHtmlElement: any = ethereum;
     outerHtmlElement.on("chainChanged", async (_chainId) => {
      setChainChanged(!chainChanged)
      const chain = await web3.eth.getChainId()
      setCurrentChain(chain)
    
    });
    }
 
   
 
   
   
 
   // const [deadlineInput, setDeadlineInput] = useState('')
 
 
  // const { account } = useWeb3React()
   const [showBalance, setShowBalance] = useState(false)
   const [fees, setFees] = useState(0)
 
 
   const notifyEth = () => {
     
     toast.warning('Please connect to ethereum network !', {
       position: "bottom-right",
       autoClose: 5000,
       closeOnClick: true,
       });      
      // errorSound.play()
   };
   
 
   const networkSelect1 = async (tokenName,selectNetwork) =>{
 
 
 
 
   
       setGetNetwork1(selectNetwork?.name)
    
   
  
       if(selectNetwork?.name === "bsc"){
          setupNetwork1(56)
       } else if (selectNetwork?.name === "avalanche"){
         setupNetwork2()
       } else if (selectNetwork?.name === "polygon"){
         setupNetwork1(137)
       }
       else if (selectNetwork?.name === "ethereum"){
         console.log('currentchain',currentChain)
         if(currentChain !== 1){
         notifyEth()
         }
         setupNetwork1(1)
       }
       else if (selectNetwork?.name === "fantom"){
         setupNetwork1(250)
       } else if (selectNetwork?.name === "optimism"){
         setupNetwork1(10)
       } else if (selectNetwork?.name === "arbitrum"){
         setupNetwork1(42161)
       }
       
     
   
   
   
   }
 
   const tokenRefresh = () => {
     console.log("hello")
       }
       const [tokenApproval, setTokenApproval] = useState(false)


      const  approveToken = async () => {
        if(account === undefined){
          
          return
        }
             if(token1 !== ""){
             
              if(getNetwork1 === "bsc"){
              const swapContractAddress =  contractAddressBsc
              console.log("enterapprove")
              if((token1Object?.tokenAddress).toLowerCase() === ("0x0000000000000000000000000000000000000000").toLowerCase()){
    
                setTokenApproval(true)
                
              } else {

                console.log("enterapprove1111")
    
                let amountFinal = ""
    
                const currentContract = new web3.eth.Contract(polarABI as any, token1Object?.tokenAddress);
              
              
                // eslint-disable-next-line dot-notation 
                 amountFinal = Math.trunc((responseData["final_swap_details"]["srcSwapData"]["sellAmount"])).toLocaleString('fullwide', { useGrouping: false });
               
                console.log("approveaccount11",account, token1Object?.tokenAddress)
              try{
               await currentContract.methods.allowance(account, swapContractAddress).call().then( async function( info ) {
    
                console.log('approve2222',info, amountFinal, parseInt(info) <= parseInt(amountFinal))
                
                if(parseInt(info) <= parseInt(amountFinal)){
                  console.log('approve3333')
                  setTokenApproval(false)
                }
                else {
                  console.log('approve44444')
                  setTokenApproval(true)
                  // approveSound.play()
                }
                
                 
              })
            } 
            catch(e){
              console.log("approveerror",e)
            }
           }
          } else if(getNetwork1 === "avalanche") {
            const swapContractAddress =  contractAddressAvax
            console.log("enterapproveavax")
            if((token1Object?.tokenAddress).toLowerCase() === ("0x0000000000000000000000000000000000000000").toLowerCase()){
  
              setTokenApproval(true)
              
            } else {

              console.log("enterapprove1111")
  
              let amountFinal = ""
  
              const currentContract = new web3.eth.Contract(polarABI as any, token1Object?.tokenAddress);
            
            
              // eslint-disable-next-line dot-notation 
               amountFinal = Math.trunc((responseData["local_swap_details"]["sellAmount"])).toLocaleString('fullwide', { useGrouping: false });
             
              console.log("approveaccount",account, token1Object?.tokenAddress)
            try{
             await currentContract.methods.allowance(account, swapContractAddress).call().then( async function( info ) {
  
              console.log('approve2222',info, amountFinal, parseInt(info) <= parseInt(amountFinal))
              
              if(parseInt(info) <= parseInt(amountFinal)){
                setTokenApproval(false)
              }
              else {
                setTokenApproval(true)
                // approveSound.play()
              }
              
               
            })
          } 
          catch(e){
            console.log("approveerror",e)
          }
         }
          }
        }
         
          }
    
    
          const  getTokenApproved = async () => {
      
            if(account === undefined){
              notifyWarning()
              return
            }

            if(getNetwork1 === "Network" || token1 === ""){
              notifyWarningEmpty()
              return
            }
             
            if(showConfirm === true){
              notifyWarningEmpty1()
              return
            }
         
               if(getNetwork1 === "bsc"){
                  const swapContractAddress = contractAddressBsc
                  console.log("swapcontractaddress",swapContractAddress)
        
                    let amountFinal = ""
                    let nftTxn = ""
        
                    const currentContract = new web3.eth.Contract(polarABI as any, token1Object?.tokenAddress);
    
                    const gasprice1 = await web3.eth.getGasPrice();
                    const gasprice = Math.round(parseFloat(gasprice1) * 1.2); // to speed up 1.2 times..
                 
                   // const buyItem = currentContract.methods.approve(swapContractAddress, approvalAmount)
                 
                
                  
                 const amountBool =  await currentContract.methods.decimals().call().then( function( info1 ) {
                // eslint-disable-next-line dot-notation 
                     amountFinal = Math.trunc((responseData["final_swap_details"]["srcSwapData"]["sellAmount"])).toLocaleString('fullwide', { useGrouping: false });
                     console.log('amountfinal#',amountFinal, parseFloat(amountFinal), parseFloat(amountFinal) <= 0)
                     if(parseFloat(amountFinal) <= 0){
                      
                      return false
                     } 
                     // eslint-disable-next-line no-else-return
                     else {
                      return true 
                     }
                  
                     }); 
                     const buyItem = currentContract.methods.approve(swapContractAddress, amountFinal)
                     let gasEstimate = await buyItem.estimateGas({ from: account })
                     gasEstimate = Math.round(gasEstimate * 1.2); 
                   
                     console.log('amountbool',amountBool, amountFinal)
                     if(amountBool === false){
                      alert('Please enter an amount for approval !')
                      return
                     }
        
                   await currentContract.methods.allowance(account, swapContractAddress).call().then( async function( info ) {
                
                    if(parseInt(info) <= parseInt(amountFinal)){
                      setLoading(true)
                      try{
                        // nftTxn = await currentContract.methods.approve(swapContractAddress, approvalAmount).send({from: account});
                       nftTxn = await buyItem
                        .send({
                          from: account,
                          gas: web3.utils.toHex(gasEstimate), 
                          gasPrice:  web3.utils.toHex(gasprice),
                        })
                        setLoading(false)
                      }
                      catch(e){
                      alert("Error in getting approval,please try again")
                      setLoading(false)
                      }
                      if(nftTxn){
                        setTokenApproval(true)
                        // approveSound.volume = 0.3
                        // approveSound.play()
                       }
                  }
                })
              } else if(getNetwork1 === "avalanche"){
                const swapContractAddress = contractAddressAvax
                console.log("swapcontractaddress",swapContractAddress)
      
                  let amountFinal = ""
                  let nftTxn = ""
      
                  const currentContract = new web3.eth.Contract(polarABI as any, token1Object?.tokenAddress);
  
                  const gasprice1 = await web3.eth.getGasPrice();
                  const gasprice = Math.round(parseFloat(gasprice1) * 1.2); // to speed up 1.2 times..
               
                 // const buyItem = currentContract.methods.approve(swapContractAddress, approvalAmount)
               
              
                
               const amountBool =  await currentContract.methods.decimals().call().then( function( info1 ) {
              // eslint-disable-next-line dot-notation 
                   amountFinal = Math.trunc((responseData["local_swap_details"]["sellAmount"])).toLocaleString('fullwide', { useGrouping: false });
                   console.log('amountfinal#',amountFinal, parseFloat(amountFinal), parseFloat(amountFinal) <= 0)
                   if(parseFloat(amountFinal) <= 0){
                    
                    return false
                   } 
                   // eslint-disable-next-line no-else-return
                   else {
                    return true 
                   }
                
                   }); 
                   const buyItem = currentContract.methods.approve(swapContractAddress, amountFinal)
                   let gasEstimate = await buyItem.estimateGas({ from: account })
                   gasEstimate = Math.round(gasEstimate * 1.2); 
                 
                   console.log('amountbool',amountBool, amountFinal)
                   if(amountBool === false){
                    alert('Please enter an amount for approval !')
                    return
                   }
      
                 await currentContract.methods.allowance(account, swapContractAddress).call().then( async function( info ) {
              
                  if(parseInt(info) <= parseInt(amountFinal)){
                    setLoading(true)
                    try{
                      // nftTxn = await currentContract.methods.approve(swapContractAddress, approvalAmount).send({from: account});
                     nftTxn = await buyItem
                      .send({
                        from: account,
                        gas: web3.utils.toHex(gasEstimate), 
                        gasPrice:  web3.utils.toHex(gasprice),
                      })
                      setLoading(false)
                    }
                    catch(e){
                    alert("Error in getting approval,please try again")
                    setLoading(false)
                    }
                    if(nftTxn){
                      setTokenApproval(true)
                      // approveSound.volume = 0.3
                      // approveSound.play()
                     }
                }
              })

              }
              
               }
              


      useEffect(() =>{
        approveToken()
          // eslint-disable-next-line react-hooks/exhaustive-deps
          },[responseData, token1Object])
           
    
          
          const StyledLoading = styled.div`
          order: 4;
          align-items: center;
          border: 1;
          border-color: #0095EC;
          // box-shadow: 0 0 6px #f8981d;
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
          background-image: grey;
          color: #faa21a;
          transition: background-color 0.2s, opacity 0.2s;
          disabled !important;
        
          &:hover {
            opacity: 0.65;
          }
        
          &:active {
            opacity: 0.85;
            transform: translateY(1px);
            box-shadow: none;
          }
        `;
        
   
 
   const order = false
   const [onPresentNetworkModal3] =  useModal(<CoinsModal tokenFunc2={networkSelect1} ListData={networkListCross} tokenName="token1" setInitToken={setInitToken} initToken={initToken} tokenRefresh={tokenRefresh} setChain="avax" /> )
 
   const [onPresentSettingsModal1] = useModal(<CoinsSelectModal ListData={(token1List)?.slice(0,7)} tokenName="token1" tokenFunc2={tokenFunc1} setChain={getNetwork1} setChain2={getNetwork1} account={account} balList={tokenBal} order={order} usdcToken={usdcToken} usdtToken={usdtToken}/>)
 
   console.log('mintprice',mintPrice)

  return (
    <>
    <Helmet>
      <title>Smart Finance - Limited NFT Mint</title>
      <link rel="canonical" href="https://dapp.smartfinance.exchange/mint/" />
    </Helmet>
    <BrowserView>
    <ToastContainer />
      <Page>
        <BiggerCards>
        <AppBody>                          
          <StyledCardBody>          
           <img src='/images/home/sfcover_1.png' alt='avax' style={{width: '80%', borderRadius: '20px'}}/>                             
            <StyledInput placeholder='Enter # of NFTs' id='nameToBuyNode' value={nftAmount}  /> 
            <Label labelSize='14px'>Smart Finance Limited NFT</Label>          
            <Label labelSize='14px'>Mint Price: {mintPrice} {(token1Object?.name)?.toLowerCase() !== "token" ? token1Object?.name : ""}  {responseData?.dollar_value ? `(${(responseData?.dollar_value/10**6).toFixed(3)} $)` : ''}</Label>
            {getNetwork1 === "bsc" &&  responseData?.final_swap_details?.cross_chain_gas_estimate && (
            <Label labelSize='8px'>Gas Fees: {(responseData?.final_swap_details?.cross_chain_gas_estimate/10**18).toFixed(5) } BNB</Label>)}
            { /* <Label labelSize='14px'>Fee: {(responseData?.final_swap_details?.total_fees)?.toFixed(4)} BNB</Label> */ }
           
            <Label style={{marginBottom: "20px"}} labelSize='10px'>Max 1 NFT Per TX</Label>
            <Label style={{marginBottom: "10px"}} labelSize='10px'>Select Network & Token</Label>
            <div className='d-flex flex-row ' style={{marginBottom: "20px"}}>                        
            
            <div style={{marginRight: "20px"}} onClick={onPresentNetworkModal3}>
              {getNetwork(getNetwork1)}      
              </div>
                <div onClick={onPresentSettingsModal1} >
              {getTokenImage(token1Object)}      
              </div>
              </div>

              {showConfirm &&  <StyledButton  onClick={confirmCall}>{confirmLoading ? <ReactLoading type="spin" color="
#DCEAFF" height={50} width={50} /> : "Confirm"}</StyledButton>}
              {((account !== undefined) && (!tokenApproval) && (!showConfirm)) && (loading=== true ? (<StyledLoading><ReactLoading type="spin" color="
#DCEAFF" height={50} width={50} /></StyledLoading>):
           (<StyledButton onClick={getTokenApproved}>{token1 === "" ? "Mint" : "Approve"}</StyledButton>))
          }   

{((token1 !== "") && (account !== undefined) && (tokenApproval ) && (!showConfirm)) && (swapLoading === true ? (<StyledLoading><ReactLoading type="spin" color="
#DCEAFF" height={50} width={50} /></StyledLoading>):
          (<StyledButton  onClick={buyNft}>Mint</StyledButton>))
          }      
             {/* <StyledButton>Mint NFTs</StyledButton> */}
          </StyledCardBody>
        </AppBody>
        </BiggerCards>
      </Page >
    </BrowserView>
    <MobileView>
    <Page>
      <BiggerCards>
      <AppBody>              
        <StyledCardBody>
            <img src='/images/home/sfcover_1.png' alt='avax' style={{width: '90%', borderRadius: '20px'}}/>                        
            <StyledInput1 placeholder='Enter # of NFTs' id='nameToBuyNode'  />    
            <Labelm labelSize='12px'>Smart Finance Limited NFT</Labelm>     
            { /* <Labelm labelSize='12px'>Mint Price: {mintPrice}</Labelm> */ }
            { /* <Label labelSize='14px'>Fee: {(responseData?.final_swap_details?.total_fees)?.toFixed(4)} BNB</Label>        */}
            <Label labelSize='14px'>Mint Price: {mintPrice} {(token1Object?.name)?.toLowerCase() !== "token" ? token1Object?.name : ""} {responseData?.dollar_value ? `(${(responseData?.dollar_value/10**6).toFixed(3)} $)` : ''}</Label>
            {getNetwork1 === "bsc" && responseData?.final_swap_details?.cross_chain_gas_estimate && (
            <Label labelSize='10px'>Gas Fees: {(responseData?.final_swap_details?.cross_chain_gas_estimate/10**18).toFixed(5) } BNB</Label>)}
            <Labelm labelSize='14px'>Max 1 NFT Per TX</Labelm>
            <Label style={{marginBottom: "10px"}} labelSize='10px'>Select Network & Token</Label>
            <div className='d-flex flex-row ' style={{marginBottom: "20px"}}>
            <div style={{marginRight: "20px"}} onClick={onPresentNetworkModal3}>
              {getNetwork(getNetwork1)}      
              </div>
                <div onClick={onPresentSettingsModal1} >
              {getTokenImage(token1Object)}      
              </div>
              </div>

              {showConfirm &&  <StyledButton  onClick={confirmCall}>{confirmLoading ? <ReactLoading type="spin" color="
#DCEAFF" height={50} width={50} /> : "Confirm"}</StyledButton>}
              {((account !== undefined) && (!tokenApproval)) && (loading=== true ? (<StyledLoading><ReactLoading type="spin" color="
#DCEAFF" height={50} width={50} /></StyledLoading>):
           (<StyledButton  onClick={getTokenApproved}>{token1 === "" ? "Mint" : "Approve"}</StyledButton>))
          }   

{((token1 !== "") && (account !== undefined) && (tokenApproval )) && (swapLoading === true ? (<StyledLoading><ReactLoading type="spin" color="
#DCEAFF" height={50} width={50} /></StyledLoading>):
          (<StyledButton  onClick={buyNft}>Mint</StyledButton>))
          }      
           
          </StyledCardBody>
      </AppBody>
      </BiggerCards>
    </Page >
    </MobileView>
    </>
    
  )
}

export default BuyNode