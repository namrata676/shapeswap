import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text, Heading } from 'uikit'
import usePoll from 'react-use-poll';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Web3 from "web3";
import axios from 'axios'
import useInterval from 'react-useinterval';
import { Duration, format, fromUnixTime } from 'date-fns'
import { UnsupportedChainIdError, useWeb3React, Web3ReactProvider } from '@web3-react/core'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConnectWalletButton from 'components/ConnectWalletButton'
// import CardValue from 'components/CardValue'
// import { useFsvBalance, useFsvBNBBalance, useEthBalance, useBNBBalance } from 'state/user/hooks'
// import { useTokenPriceData } from 'hooks/useInfo'
import contracts from 'config/contracts'
// import { formatAmount } from 'utils/formatInforNumbers'
// import CardBusdValue from 'components/CardBusdValue'
import { State } from '../../../state/types'
import MilliTime from './MilliTime'


const SelectStyle = styled.select`
  color: white;
  background: #3a3a3c;
  border-radius: 10px;
  border: 0;
  outline: 0;
  height: 37px;
  width: 110%;
  margin-top: 10px;
  // with: 50px;
  // width: 80px;
`

const StyledCard = styled(Card)`
  // min-height: 60px;
`

const RowBlockBetween = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const RowBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 8px;
`
const StyledImg = styled.img`  
  height: 15%;
  border-radius: 10px;
  margin-top: 25px;
  margin-left: 25px;
`
const StyledCardBody = styled(CardBody)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ComingSoon = styled.div`
display: flex;
font-size: 24px;
width:250%;
color: #fff;
font-weight: bold;

`
const Label = styled.div<{ size: string }>`
  color: #fff;
  font-size: 24px;
`

const Label1 = styled.div<{ labelSize: string }>`
  color: ${({ theme }) => theme.colors.textSubtle};  
  font-size: 12px;
  margin-top: 108px;
  margin-left: -337px;
  padding-bottom: 10px;
  margin-bottom: 5px;
`

const TotalNodes = ({ title, val1, val2, img, account, refetch, farmersNodeContract }) => {
  const [totalNodes, setTotalNodes] = useState('0');


  useEffect(() => {
    
    if(account !== undefined){

      const expo = 10**18
   
      farmersNodeContract.methods.getBalance().call().then( function( info ) {
          setTotalNodes((info/expo).toFixed(2))
         })
       } 
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account]);

  return (
    <StyledCard>
      <RowBlockBetween>
        <StyledCardBody>
          <Heading scale="sm" mb="8px">
            Contract Balance 
          </Heading>
          <RowBlock> 
            <Label size='18px'>{totalNodes} matic</Label>            
          </RowBlock>
        </StyledCardBody>
      </RowBlockBetween>
    </StyledCard>
  )
}

export default TotalNodes
