import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import usePoll from 'react-use-poll';
import { useSelector } from 'react-redux'
import Web3 from "web3";
import axios from 'axios'
import useInterval from 'react-useinterval';
import { Duration, format, fromUnixTime } from 'date-fns'
import { UnsupportedChainIdError, useWeb3React, Web3ReactProvider } from '@web3-react/core'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Card, CardBody, Text, Heading } from 'uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
// import CardValue from 'components/CardValue'
// import { useFsvBalance, useFsvBNBBalance, useEthBalance, useBNBBalance } from 'state/user/hooks'
// import { useTokenPriceData } from 'hooks/useInfo'
import contracts from 'config/contracts'
// import { formatAmount } from 'utils/formatInforNumbers'
// import CardBusdValue from 'components/CardBusdValue'
import { State } from '../../../state/types'
import MilliTime from './MilliTime'

const StyledCard = styled(Card)`
  // min-height: 200px;
  // height: 210px;
  // max-height: 210px;
`

const RowBlock = styled.div`
  display: flex;
  flex-direction: row;
`

const RowBlockBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Label = styled.div<{ labelSize: string }>`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: ${props => props.labelSize};
  display: flex;
  margin:25px auto;
`
const Label1 = styled.div<{ labelSize: string }>`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;  
`
const Actions = styled.div`
  margin-top: 24px;
`
const StyledCardBody = styled(CardBody)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const StyledButton = styled.button`
  align-items: center;
  border: 0;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  display: inline-flex;
  width: 88% !important;
  font-family: inherit;
  font-size: 14px;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-color: #3a3a3c;
  color: #faa21a;
  // line-height: 1;
  // outline: 0;
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


const AvailReward = ({account,setRewards, token, DarkForestNodeContract, DarkForestTokenContract}) => {



  const [availReward, setRewardAvailable] = useState('0');
  const [PlanetId, setPlanetId] = useState('0')

  const getRewards = async () => {
 
   const expo = 10**18
  
   const { ethereum } = window;
   
         if (ethereum) {
           if(account !== undefined){
             if(token==="DarkForest_nodes")
             await DarkForestNodeContract.methods.getPlanetIdsOf(account).call().then( async function( info ) {
              //  ****@Namrata**** what if it calls 2 planet IDs?
             // ****not sure how to seperate the data for info2 it all runs together then pulling in availbe rewards****
              
              await DarkForestNodeContract.methods.getPlanetsByIds(info).call().then( async function( info2 ) {
                 setRewardAvailable(info2)
                 setRewards(info2) 
                
                // setRewardAvailable((info2).toFixed(2))
                //  setRewards((info2).toFixed(2))
                
                })
              })
            
            }
       }
 
 }

 // useInterval(getRewards, 20000);

 useEffect(()=>{
   getRewards()
   // eslint-disable-next-line react-hooks/exhaustive-deps
 },[account,token])

   const compoundReward = async() => {

   const { ethereum } = window;

  if (ethereum) {
    if(account !== undefined){
      if(token==="DarkForest_nodes"){
      const nftTxn = await DarkForestNodeContract.methods.compoundAll().send({from: account});
      if(nftTxn){
        alert("Rewards Claimed Successfully !")
      }else{
        alert("Error in claiming rewards !")
      }
    }
     
 
}
    

 }
}  
 
    const claimReward = async() => {

    const { ethereum } = window;
  
    if (ethereum) {
      if(account !== undefined){
        if(token==="DarkForest_nodes"){
        const nftTxn = await DarkForestNodeContract.methods.cashoutAll().send({from: account});
        if(nftTxn){
          alert("Rewards Claimed Successfully !")
        }else{
          alert("Error in claiming rewards !")
        }
      }
       
   
  }
      

   }
  }
 

  return (
    <StyledCard>
      <StyledCardBody>
        <Heading scale="sm">
          Available Rewards
        </Heading>
        <div className="d-flex justify-content-between" style={{width:'190px'}}>
          <Label labelSize='20px'>Coming Soon</Label>
          {/* <Label labelSize='20px'>{availReward}$Nart</Label>           */}
        </div>
        <StyledButton onClick={compoundReward}>Compound</StyledButton>
        <StyledButton onClick={claimReward}>Claim Rewards</StyledButton>
      </StyledCardBody>
    </StyledCard>
  )
 }
 

export default AvailReward