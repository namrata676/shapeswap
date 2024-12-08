import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text, Heading } from 'uikit'
import ToggleButtonAC from './ToggleButtonAC'

const StyledCard = styled(Card)`
  // min-height: 60px;
  box-shadow: 0 0 15px #f8981d;
  border: 1;
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

const StyledButton = styled.button`
  align-items: center;
  border: 0;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  display: inline-flex;
  width: 115% !important;
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


const ToogleCard = ({ title, status, img1, img2, compoundContract, account, refetchCompound, setRefetchCompound }) => {
  const [isOn, setIsOn] = useState(status)

  const compoundReward = async() => {

    const { ethereum } = window;
 
    if (ethereum) {
      if(account !== undefined){
         
     
        const nftTxn = await  compoundContract.methods.compoundRewardsForNode().send({from: account});
        if(nftTxn){
          alert("Rewards Compounded Successfully !")
          setRefetchCompound(!refetchCompound)
         
        }else{
          alert("Error in compounding rewards !")
         
        } 
  }
      

   }
  }

  return (
    <StyledCard>
      <RowBlockBetween>
        <StyledCardBody>
          <Heading scale="sm" mb="8px">
            Compound Rewards
          </Heading>
          <StyledButton>Compound</StyledButton>
        </StyledCardBody>        
      </RowBlockBetween>
    </StyledCard>
  )
}

export default ToogleCard
