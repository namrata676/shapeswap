import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useInterval from 'react-useinterval';
import { Link } from 'react-router-dom'
import { Card, CardBody, Text, Heading } from 'uikit'
import ToggleButtonAC from './ToggleButtonAC'

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
const StyledCardBody = styled(CardBody)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Label = styled.div<{ labelSize: string }>`
  color: ${({ theme }) => theme.colors.textSubtle};  
  font-size: 12px;
`
const PlusLabel = styled.div<{ size: string, color: any }>`
  color: ${props => props.color >= 0 ? '#55f6bb' : '#ee4f9f'};
  font-size: ${props => props.size};
`

const ComingSoon = styled.div`
display: flex;
font-size: 24px;
width:250%;
color: #fff;
font-weight: bold;

`



const ToogleCard = ({ title, status, img1, img2, setToken}) => {
  const [isOn, setIsOn] = useState(status)

  const tokenChange = async (e) => {
    console.log(e.target.value);
    setToken(e.target.value);
   
  }


  return (
    <StyledCard>
      <RowBlockBetween>
        <StyledCardBody>
          <Heading scale="sm" mb="8px">
           Crypto Nodes
          </Heading> 
          <Link to={{ pathname: "https://app.cryptonodes.finance/#dashboard" }} target="_blank">
            <Label labelSize="8px"> Crypto Nodes Dapp </Label>
          </Link>       
        </StyledCardBody>
        <StyledImg src={isOn ? img1 : img2} alt='status_logo' />
      </RowBlockBetween>
    </StyledCard>
  )
}

export default ToogleCard
