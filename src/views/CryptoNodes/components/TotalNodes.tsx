import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useInterval from 'react-useinterval';
import axios from 'axios'
import usePoll from 'react-use-poll';
import { Card, CardBody, Text, Heading } from 'uikit'
import { ethers } from 'ethers';

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
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-top: 20px;
  margin-right: 20px;
`
const Label = styled.div<{ size: string }>`
  color: ${({ theme }) => theme.colors.textSubtle};  
  font-size: 26px;
`
const Label1 = styled.div<{ size: string }>`
  color: #faa21a;  
  font-size: 16px;
  padding-top:10px;
  padding-bottom:10px;
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

const TotalNodes = ({ title, val1, val2, img, account, refetch, cryptoTokenContract, cryptoNodeContract,token }) => {
  const [totalNodes, setTotalNodes] = useState('0');
  const [totalNodesLvl2, setTotalNodesLvl2] = useState('0');


  const getTotalNodes = () => {
    const { ethereum } = window;

    if (ethereum) {

     if(token==="crypto_nodes"){
        cryptoNodeContract.methods.totalNodesLvl1().call().then( function( info ) {
             setTotalNodes(info)
           })
         } 
         if(token==="crypto_nodes"){
          cryptoNodeContract.methods.totalNodesLvl2().call().then( function( info2 ) {
               setTotalNodesLvl2(info2)
             })
           }
        }
        
  }


  useEffect(()=>{
    getTotalNodes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])

  
  useInterval(getTotalNodes,10000)
  


  return (
    <StyledCard>
      <RowBlockBetween>
        <StyledCardBody>          
        <Heading scale="sm" mb="10px">
            Total Big
          </Heading>          
          <RowBlock>
            <Label size='10px'>{totalNodesLvl2}</Label>            
          </RowBlock>
          <Label1 size='8px'>Total Small</Label1>          
          <RowBlock>
            <Label size='10px'>{totalNodes}</Label>            
          </RowBlock>
        </StyledCardBody>
        {/* <StyledCardBody> */}
        <StyledImg src={img} alt='status_logo' />
        {/* </StyledCardBody> */}
      </RowBlockBetween>
    </StyledCard>
  )
}

export default TotalNodes