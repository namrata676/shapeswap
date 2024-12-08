import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
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



const ToogleCard = ({ title, status, img1, img2, setToken }) => {
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
           Aztec Nodes
          </Heading>          
        </StyledCardBody>
        <StyledImg src={isOn ? img1 : img2} alt='status_logo' />
      </RowBlockBetween>
    </StyledCard>
  )
}

export default ToogleCard
