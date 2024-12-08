import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useInterval from 'react-useinterval';
import axios from 'axios'
import usePoll from 'react-use-poll';
import { Card, CardBody, Text, Heading } from 'uikit'
import { ethers } from 'ethers';
import Web3 from "web3";

import tempABI from '../../../contracts/smartnodes.json';

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
  font-size: 33px;
  margin-left: 470px;
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
  const [tokenBalance, setTokenBalance] = useState('0');


  /* const getTotalNodes = () => {
    const { ethereum } = window;

    if (ethereum) {
     
        nodeContract.methods.totalNodesCreated().call().then( function( info ) {
             setTotalNodes(info)
           })
         } 
        
  }


  useEffect(()=>{
    getTotalNodes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[refetch])

  
 useInterval(getTotalNodes,10000) */
 const web3 = new Web3(window.ethereum as any)
 const getBalance = async () => {
  const avaxBalance = await web3.eth.getBalance(account);
   setTokenBalance((parseInt(avaxBalance)/(10**18)).toFixed(2));
 }

 useEffect(() => {
    
  if(account !== undefined){
        getBalance()
     } 
  
// eslint-disable-next-line react-hooks/exhaustive-deps
},[account]);
  


  return (
    <StyledCard>
      <RowBlockBetween>
        <StyledCardBody>         
        <Label size='13px'>Nodes </Label>
        </StyledCardBody>
        {/* <StyledCardBody> */}
        
        {/* </StyledCardBody> */}
      </RowBlockBetween>
    </StyledCard>
  )
}

export default TotalNodes