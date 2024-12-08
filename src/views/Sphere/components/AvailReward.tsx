import React, { useState, useEffect } from 'react'
import { BasicCountdown } from "react-fancy-countdown";
import 'react-fancy-countdown/dist/countdown.css';
import styled from 'styled-components'
import dayjs from 'dayjs'
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
   height: 270px;
  // max-height: 210px;
  // width: 250px
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
  margin-top: 24px;
  align-items: left;
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

const AvailReward = ({account,setRewards,setReward,setTax,token, farmersNodeContract}) => {

  const [availReward, setRewardAvailable] = useState(0); 
  const [nextRebase, setNextRebase] = useState('0')
  // const referral = "0xB6d6bc0311290201FD07b0149771f92a876d0730"  

  const getRewards = () => {  
   const { ethereum } = window;
   
         if (ethereum) {
           if(account !== undefined){
          
            const expo = 10**15
             
             farmersNodeContract.methods.getRewardYield().call().then( function( info ) {
              console.log(info[1],"testing")
              console.log(info[0], "tetsing1")
              // const date = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(info)
              setRewardAvailable(info[0]/expo);
            //     setRewards((info/expo).toFixed(4))
                // })
               })
              }
              }
            }
 // useInterval(getRewards, 20000);
 useEffect(()=>{
   getRewards()
   if(account !== undefined){       
    farmersNodeContract.methods.nextRebase().call().then( function( info ) {
     const convert = dayjs(info * 1000).format('MM/DD/YYYY HH:mm:ss')
     console.log("convert",convert)
      setNextRebase(convert);    
       })
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
 },[account])

  return (
    <StyledCard>
      <StyledCardBody>
        <Heading scale="sm">
          rebases every 30 minutes 
        </Heading>
        <Label labelSize='20px' className="d-flex justify-content-between" style={{width:'220px', marginLeft: '40px'}}>
        {nextRebase !== '0' && (<BasicCountdown
      deadline={nextRebase}
      format="HH[hrs] mm[mins] ss[secs]" /> )}  
        </Label>
        {/* <StyledButton onClick={claimReward}>Claim Rewards</StyledButton>            */}
      </StyledCardBody>
    </StyledCard>
  )
}

export default AvailReward
