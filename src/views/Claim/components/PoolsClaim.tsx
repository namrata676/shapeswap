import React, { useEffect, useState, useContext } from 'react'
import { isEmpty } from 'lodash';
import { useWeb3React } from '@web3-react/core'
import {  ToastContainer, toast } from 'react-toastify';
// import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {BrowserView, MobileView} from 'react-device-detect'
// import { ethers } from 'ethers';
import Web3 from "web3";
import { Card, CardBody, Heading } from 'uikit'
import useSound from 'use-sound'
import NodesList from './NodesList';
import NodesListOG from './NodeListOG'
import { limitedContractAddress, limitedContractAbi } from '../../../Abi/limitedNft/limitedNft'
import { ogContractAddress, ogContractAbi } from '../../../Abi/ogContract/ogContract'
import "./nfts.css"
import ThingsContext from '../../../swapContext'


const audio = new Audio("/images/sound/swoosh11.mp3")

  const start = () => {
    audio.play()
  }

const RowBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`
const StyledCard = styled(Card)`
  max-height: 100% !important;  
  border: 1;
  background-color: #1b2028 !important;
  box-shadow: 0px 0px 10px rgba(34, 60, 122, 0.856);
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};  
  padding-top: 15px;
  /* margin-left: 35%; */
  margin-left: 35%;
  margin-right: auto;
  display: block;
`
const Labelmoney = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};  
  padding-top: 15px;
  font-size: 20px !important;
  /* margin-left: 35%; */
  margin-left: 42% !important;
  margin-right: auto !important;
  display: block;
`
const LabelmoneyM = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};  
  padding-top: 15px;
  font-size: 16px !important;
  /* margin-left: 35%; */
  margin-left: 20% !important;
  margin-right: auto !important;
  display: block;
`
const Labelmm = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};  
  padding-top: 15px;
  margin-left: 20%;    
`

const Label11 = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  padding-bottom: 10px;  
  margin-left: 45%;  
`

const Label1 = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  padding-bottom: 20px;
  padding-right: 5px;
  font-size:14px !important;
`

const StyledCardBody = styled(CardBody)`
  height: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #1b2028 !important;  
`

const StyledButton = styled.button`
  align-items: center;
  border: 0;
  border-radius: 12px;  
  margin-bottom: 25px;
  padding: 12px;
  cursor: pointer;
  display: inline-flex;
  width: 80%;
  font-family: inherit;
  font-size: 14px;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-color: #272f37;
  color: white;
  // line-height: 1;
  // outline: 0;
  margin-left: 10%;
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

const StyledButton1 = styled.button`
  align-items: center;
  border: 1;
  border-radius: 12px;  
  margin-bottom: 25px;
  border-color: #223c7a;
  box-shadow: 0px 0px 10px rgba(34, 60, 122, 0.856);
  padding: 5px;
  cursor: pointer;
  display: inline-flex;
  width: 35%;
  font-family: inherit;
  font-size: 10px;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-color: #272f37;
  color: white;
  // line-height: 1;
  // outline: 0;
  margin-left: 180px;
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

const NodesListCard = ({nodeContract, refetch, setMyNode, refetchCompound, compoundContract, nftContract, nftContractOg}) => {
  const [nftNum, setNftNum] = useState(0);
  const [nodeNum, setNodeNum] = useState(0);
  const [loadOG, setLoadOG] = useState('OGs ')
  const [loadLimited, setLoadLimited] = useState('Limited')
  const [page, setPage] = useState(1)
  const [limitedRewards, setLimitedRewards] = useState(0)
  const [ogRewards, setOgRewards] = useState(0)

  const { account : accountFinal } = useWeb3React();

  const commonThings = useContext(ThingsContext)
  const { setSwapHeader, account, setAccount} = commonThings as any


  const web3 = new Web3(window.ethereum as any)

  const ogContract = new web3.eth.Contract(ogContractAbi as any, ogContractAddress);

  const limitedContract = new web3.eth.Contract(limitedContractAbi as any, limitedContractAddress);

  console.log("poolaccount",account)

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

  useEffect(() => {
    
    if(account !== undefined && account !== null && !isEmpty(account)){
      console.log('entering this')
   
      nftContractOg.methods.balanceOf(account).call().then( function( info ) {
           setNodeNum(info)
           setMyNode(info)
         })

         nftContract.methods.balanceOf(account).call().then( function( info ) {
          setNftNum(info)
        })
       } 
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account, refetch]);

  useEffect(() => {
    
    if(account !== undefined && account !== null && !isEmpty(account)){
      limitedContract.methods.getClaimableRewardsPerUser(account).call().then( function( info ) {
           setLimitedRewards(info/10**18)
         })

         ogContract.methods.getClaimableRewardsPerUser(account).call().then( function( info ) {
          setOgRewards(info/10**18)
        })
       } 
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account]);

  useEffect(() => {
    
    if(account !== undefined && account !== null && !isEmpty(account)){
   
      nftContractOg.methods.balanceOf(account).call().then( function( info ) {
           setNodeNum(info)
           setMyNode(info)
         })

         nftContract.methods.balanceOf(account).call().then( function( info ) {
          setNftNum(info)
        })
       } 
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account]);

  
   const smartNfts = () => {
        setPage(2)
   }

   const smartNfts1 = () => {
        setPage(1)
  }

  const sentSound = new Audio("/images/sound/swoosh.mp3")


  const errorSound = new Audio("/images/sound/error.mp3")
const notifySuccess = () => {
    
  toast.success('Successfully Claimed Tokens !', {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    });      
    sentSound.play()
};

const notifyError = () => {
  toast.error('Error in Claiming Tokens !', {
    position: "bottom-right",
    closeOnClick: true,
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    errorSound.volume = 0.3
    errorSound.play()

};


  const claimReflection = async () => {

    const { ethereum } = window;

    if (ethereum) {
     
      // const nftTxn = await smnContract.methods.cashoutReflections().send({from: account});
      try{
      const nftTxn = await ogContract.methods.claimReward().send({from: account});
      if(nftTxn){
        
     notifySuccess()
        
      }
    } catch(e) {
       notifyError()
      }
    }
    else {
      alert("Connection Error");
    }
}

const claimReflection1 = async () => {

  const { ethereum } = window;

  if (ethereum) {
   
    // const nftTxn = await smnContract.methods.cashoutReflections().send({from: account});
    try {
    const nftTxn = await limitedContract.methods.claimReward().send({from: account});
    if(nftTxn){
      notifySuccess()
    }
  } catch(e) {
      notifyError()
    }
  }
  else {
    alert("Connection Error");
  }
}


  

  return (
    <>
     <ToastContainer/>
    <BrowserView>
    <StyledCard>
      <StyledCardBody>
        <div>          
          <img alt="Smart Finance" src="/images/home/smartnftsnew.png" style={{width:"40%", marginLeft: "auto", marginRight: "auto", display: "block"}} />
                    
          <div className="row">
            <div style={{float: "left", width: "50%", padding: "10px", height: "300px"}}>
              <StyledButton1 onClick = {()=> claimReflection()}>Claim</StyledButton1>              
              <img alt="ogs pool"  src="/images/home/ogpool.png" className="ogsimg" />
              
              <Label>Rewards Available</Label>
              <Labelmoney>{ogRewards?.toFixed(4)} AVAX</Labelmoney>
            </div>
          <div style={{float: "left", width: "50%", padding: "10px", height: "300px"}}>
            <StyledButton1 onClick = {()=> claimReflection1()}>Claim</StyledButton1>
            <img alt="limited pool" src="/images/home/limitedpool.png" className="limitedimg" />
            <Label>Rewards Available</Label>
            <Labelmoney>{limitedRewards?.toFixed(4)} AVAX</Labelmoney>
          </div>
        </div>
          
        </div>        
      </StyledCardBody>
    </StyledCard>
    </BrowserView>
    <MobileView>
      <StyledCard>
      <StyledCardBody>
        <div>
        <img alt="Smart Finance" src="/images/home/smartnftsnew.png" style={{width:"90%", marginLeft: "auto", marginRight: "auto", display: "block"}} />
                    
                    <div className="row">
                      <div style={{float: "left", width: "50%", padding: "10px", height: "300px"}}>
                      <StyledButton onClick = {()=> claimReflection()}>Claim</StyledButton>              
                      <img alt="ogs pool"  src="/images/home/ogpool.png" className="ogsimgm" />                       
                        <Labelmm>Rewards Available</Labelmm>
                        <LabelmoneyM>{ogRewards?.toFixed(4)} AVAX</LabelmoneyM>
                      </div>
                    <div style={{float: "left", width: "50%", padding: "10px", height: "300px"}}>
                    <StyledButton onClick = {()=> claimReflection1()}>Claim</StyledButton>
                    <img alt="limited pool" src="/images/home/limitedpool.png" className="limitedimgm" />        
                      <Labelmm>Rewards Available</Labelmm>
                      <LabelmoneyM>{limitedRewards?.toFixed(4)} AVAX</LabelmoneyM>
                    </div>
                  </div>
                    
        </div>
          
      </StyledCardBody>
    </StyledCard>
    </MobileView>
    </>
  )
}

export default NodesListCard
