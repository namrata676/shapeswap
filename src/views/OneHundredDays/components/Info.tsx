import React, { useState, useEffect } from 'react'
import { BasicCountdown } from "react-fancy-countdown";
import 'react-fancy-countdown/dist/countdown.css';
import styled from 'styled-components'
import dayjs from 'dayjs';
import useInterval from 'react-useinterval';
import axios from 'axios'
import usePoll from 'react-use-poll';
import { Card, CardBody, Text, Heading } from 'uikit'
import { ethers } from 'ethers';
import Web3 from "web3";
import tempABI from '../../../contracts/smartnodes.json';

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
const StyledImg = styled.img`  
  height: 15%;
  border-radius: 10px;
  margin-top: 25px;
  margin-left: 25px;
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

const TotalNodes = ({ title, val1, val2, img, account, refetch, farmersNodeContract }) => {
  const [nextRebase, setNextRebase] = useState('0');


  useEffect(()=>{
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
      <RowBlockBetween>
        <StyledCardBody>
          <Heading scale="sm" mb="8px">
            rebases every 30 minutes 
          </Heading>
          <RowBlock>
          <Label labelSize='20px' className="d-flex justify-content-between" style={{width:'220px', marginLeft: '40px'}}>
        {nextRebase !== '0' && (<BasicCountdown
      deadline={nextRebase}
      format="HH[hrs] mm[mins] ss[secs]" /> )}  
        </Label>            
          </RowBlock>
        </StyledCardBody>
      </RowBlockBetween>
    </StyledCard>
  )
}

export default TotalNodes