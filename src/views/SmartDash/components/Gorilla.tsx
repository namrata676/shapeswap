import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from "axios";
import usePoll from 'react-use-poll';
import useInterval from 'react-useinterval';
import Web3 from "web3";
import { Card, CardBody, Text, Heading } from 'uikit'


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


const Emerald = ({ title, val1, val2, img, account, setSmnPrice, refetchLocation, setReactPrice, farmersNodeContract }) => {

        
  const TOKEN = '0xeacD4F4d93527CB5d0cDFE5930D612CCfD5Af436'
  const API = `https://api.dexscreener.io/latest/dex/tokens/${TOKEN}`

  const [smnBalance, setSmnbalance] = useState(0)
  const [usdtPrice, setUsdtPrice] = useState(0)
  const [reserveValue, setReserveValue] = useState(0)

  const [apiData, setApiData] = useState('')
  
  useEffect(() => {
    fetch(API)
        .then(res => res.json())
        .then(data => {setApiData(data.pairs[0]?.priceUsd)
        setReactPrice(data.pairs[0]?.priceUsd)}
         )

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


  

  return (
    <StyledCard>
      <RowBlockBetween>
        <StyledCardBody>
          <Heading scale="sm" mb="5px">
            {/* title */}
            Gorilla Nodes 
          </Heading>  
          <RowBlock>
            <Label size='13px'>$ {apiData}</Label>
            {/* <Label size='20px'>{val1}</Label>
            {val2 != null ?
              <PlusLabel color={val2} size='16px'>{val2 >= 0 ? `+${val2}` : val2}%</PlusLabel> : '' 
            } */}
          </RowBlock>
        </StyledCardBody>
        {/* <StyledCardBody> */}
        <StyledImg src='./images/gorillalogo.png' alt='status_logo' />
        {/* </StyledCardBody> */}
      </RowBlockBetween>
    </StyledCard>
  )
}

export default Emerald