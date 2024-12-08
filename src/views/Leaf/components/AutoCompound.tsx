import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text, Heading } from 'uikit'
import usePoll from 'react-use-poll';
import { useSelector } from 'react-redux'
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


const StyledCard = styled(Card)`
  // min-height: 60px;

`
const RowBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 8px;
`
const RowBlockBetween = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const StyledImg = styled.img`
  width: auto;
  height: 70px;
  border-radius: 10px;
  margin-top: 22px;
  margin-right: 20px;
`
const Label = styled.div<{ size: string }>`
  color: #fff;
  font-size: 24px;
`
const PlusLabel = styled.div<{ size: string, color: any }>`
  color: ${props => props.color >= 0 ? '#55f6bb' : '#ee4f9f'};
  font-size: ${props => props.size};
`
const Actions = styled.div`
  margin-top: 24px;
`
const StyledCardBody = styled(CardBody)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TotalNodes = ({ title, val1, val2, img, account, refetch, farmersNodeContract }) => {
  const [totalNodes, setTotalNodes] = useState('0');

const expo = 10**18

  useEffect(() => {
    
    if(account !== undefined){
   
      farmersNodeContract.methods.balanceOf(account).call().then( function( info ) {
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
            Token Balance 
          </Heading>
          <RowBlock>
            <Label size='18px'>{totalNodes} Leaf</Label>            
          </RowBlock>
        </StyledCardBody>
        {/* <StyledCardBody> */}
        <StyledImg src='./images/leaf.png' alt='status_logo' />
        {/* </StyledCardBody> */}
      </RowBlockBetween>
    </StyledCard>
  )
}





export default TotalNodes
