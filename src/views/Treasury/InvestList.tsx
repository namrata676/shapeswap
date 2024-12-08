import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Card, CardBody, Text, Heading } from 'uikit'
import TxList from './TxList'

const StyledCard = styled(Card)`
  min-height: 300px;
  background-color: #1b2028 !important;
`
const Label = styled.div`
  color: white !important;
 
`

const StyledCardBody = styled(CardBody)`
  // height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between
  background-color: #1b2028 !important;
`

const InvestList = () => {
  const currentDate = format(new Date(), 'MMM d, yyyy')

  return (
    <StyledCard>
      <StyledCardBody>
        <div>
          <Heading scale='lg' mb='4px' style={{color: '#93979b !important;'}}>Investment</Heading>
        </div>
        <TxList />
      </StyledCardBody>
    </StyledCard>
  )
}

export default InvestList