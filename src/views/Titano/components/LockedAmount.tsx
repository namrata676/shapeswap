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
  // min-height: 300px;
   height: 319px;
  // max-height: 310px;
  // width: 320px
  margin-right: 50px;
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
const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  margin-bottom: 22px;
  margin-top: 24px;
  padding: 0px;
  border-radius: 12px;
  background: #3a3a3c;
  text-align: center;
  width: 85%;
  height: 84%;
  border: 0px;
  :focus{
    border: 0px;
    outline: 0;
  }
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
  color: #8E44AD;
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


const AvailReward = ({account,setRewards, token, farmersNodeContract}) => {

  const [availReward, setRewardAvailable] = useState('0');
  const [Unlock, setUnlock] = useState('0');
  
  const referral = "0xB6d6bc0311290201FD07b0149771f92a876d0730";  

  const getRewards = () => {
 
   const expo = 1**1
  
   const { ethereum } = window;
   
         if (ethereum) {
           if(account !== undefined){
             
             farmersNodeContract.methods.getLockedTokenAmount(account).call().then( function( info ) {
                 setRewardAvailable((info/expo).toFixed(2))
                 setRewards((info/expo).toFixed(2))
                })
             farmersNodeContract.methods.getRemainingTokenLockTime(account).call().then( function( info ) {  
              setUnlock((info/86400).toFixed(2))

               })
           }
              }
            }
 // useInterval(getRewards, 20000);

 useEffect(()=>{
   getRewards()
   // eslint-disable-next-line react-hooks/exhaustive-deps
 },[account])

   const claimReward = async() => {

    const { ethereum } = window;
  
    if (ethereum) {
      if(account !== undefined){
        const nftTxn = await farmersNodeContract.methods.claimLockedRewards().send({from: account});
        if(nftTxn){
          alert("Rewards Claimed Successfully !")
        }else{
          alert("Error in claiming rewards !")
        }
       
  }
      

   }
  }
 
  return (
    <StyledCard>
      <StyledCardBody>
        <Heading scale="sm">
          Locked Tokens
        </Heading>
        <div className="d-flex justify-content-between" style={{width:'190px'}}>
          <Label labelSize='20px'>{availReward} Avax</Label>          
        </div>
        <StyledButton onClick={claimReward}>Claim Locked Tokens</StyledButton> 
        <Label labelSize='16px'>Unlocked In</Label> 
        <Label labelSize='16px'>{Unlock} Days</Label>          
      </StyledCardBody>
    </StyledCard>
  )
}

export default AvailReward
