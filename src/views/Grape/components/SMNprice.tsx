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
  font-size: 18px;
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


const SMNprice = ({ title, val1, val2, img, account, setSmnPrice, refetchlocation, setGrapePrice, setWinePrice }) => {

        
  const TOKEN = '0x5541D83EFaD1f281571B343977648B75d95cdAC2'
  const API = `https://api.dexscreener.io/latest/dex/tokens/${TOKEN}`
  const TOKEN1 = '0xC55036B5348CfB45a932481744645985010d3A44'
  const API1 = `https://api.dexscreener.io/latest/dex/tokens/${TOKEN1}`

  const [smnBalance, setSmnbalance] = useState(0)
  const [usdtPrice, setUsdtPrice] = useState(0)
  const [reserveValue, setReserveValue] = useState(0)

  const [apiData, setApiData] = useState('')
  const [api1Data, setApi1Data] = useState('')
  
  useEffect(() => {
    fetch(API)
        .then(res => res.json())
        .then(data => {setApiData(data.pairs[0]?.priceUsd)
        setGrapePrice(data.pairs[0]?.priceUsd)}
         )
         fetch(API1)
        .then(res => res.json())
        .then(data => {setApi1Data(data.pairs[0]?.priceUsd)
        setWinePrice(data.pairs[0]?.priceUsd)}
         )

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


  

  return (
    <StyledCard>
      <RowBlockBetween>
        <StyledCardBody>
          <Heading scale="sm" mb="5px">
            {/* title */}
            $grape token price   
          </Heading>  
          <RowBlock>
            <Label size='13px'>$ {apiData}</Label>
          </RowBlock>
          <Heading scale="sm" mb="5px">
            {/* title */}
            $wine token price   
          </Heading>  
          <RowBlock>
            <Label size='13px'>$ {api1Data}</Label>
          </RowBlock>
        </StyledCardBody>
        {/* <StyledCardBody> */}
        <StyledImg src={img} alt='status_logo' />
        {/* </StyledCardBody> */}
      </RowBlockBetween>
    </StyledCard>
  )
}

export default SMNprice