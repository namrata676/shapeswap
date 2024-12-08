import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Card, CardBody, Text, Heading } from 'uikit'
import ApexChart from './ApexChart'

const StyledCard = styled(Card)`
  min-height: 300px;
  background-color: #1b2028 !important;
`
const Label = styled.div`  
  color: white !important;
`

const StyledCardBody = styled(CardBody)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between
  align-items: center;
  background-color: #1b2028 !important;
`
const StyledPie = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`


const SmnPie = () => {
  const currentDate = format(new Date(), 'MMM d, yyyy')

  return (
    <StyledCard>
      <StyledCardBody>
        <Heading scale='lg' mb='4px'style={{color: '#93979b !important;'}}>Asset Allocation</Heading>
        
      </StyledCardBody>
    </StyledCard>
  )
}

export default SmnPie