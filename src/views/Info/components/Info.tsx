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

const TotalNodes = ({ title, val1, val2, img, account, refetch, gorillaNodeContract }) => {
  const [totalNodes, setTotalNodes] = useState('Nan');


  const getTotalNodes = () => {
    const { ethereum } = window;

    if (ethereum) {
     if(account !== undefined){
        gorillaNodeContract.methods.getNodeNumberOf(account).call().then( function( info ) {
             setTotalNodes(info)
           })
         } 
        }
        
  }   


 useEffect(()=>{
    getTotalNodes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account])

  
 // useInterval(getTotalNodes,10000) 
  


  return (
    <StyledCard>
      <RowBlockBetween>
        <StyledCardBody>
          <Heading scale="sm" mb="8px">
            My Nodes
          </Heading>
          <RowBlock>
            <Label size='18px'>{totalNodes}</Label>            
          </RowBlock>
        </StyledCardBody>
        {/* <StyledCardBody> */}
        <StyledImg src='./images/Logo-02.png' alt='status_logo' />
        {/* </StyledCardBody> */}
      </RowBlockBetween>
    </StyledCard>
  )
}

export default TotalNodes