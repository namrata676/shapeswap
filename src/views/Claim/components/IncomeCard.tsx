import React, { useState, useEffect } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import styled from 'styled-components'
import Web3 from "web3";
// import { useSelector } from 'react-redux'
// import axios from 'axios'
// import { Duration, format, fromUnixTime } from 'date-fns'
// import { UnsupportedChainIdError, useWeb3React, Web3ReactProvider } from '@web3-react/core'
// import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Card, CardBody, Text, Heading } from 'uikit'
// import ConnectWalletButton from 'components/ConnectWalletButton'
// import CardValue from 'components/CardValue'
// import { useFsvBalance, useFsvBNBBalance, useEthBalance, useBNBBalance } from 'state/user/hooks'
// import { useTokenPriceData } from 'hooks/useInfo'
// import contracts from 'config/contracts'
// import { formatAmount } from 'utils/formatInforNumbers'
// import CardBusdValue from 'components/CardBusdValue'
import { State } from '../../../state/types'

const StyledCard = styled(Card)`
  // height: 200px;
  max-height: 196px;
  box-shadow: 0 0 15px #f8981d;
  border: 1;
`

// const RowBlock = styled.div`
//   display: flex;
//   flex-direction: row;
// `

const RowBlockBetween = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Label = styled.div<{ labelSize: string }>`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: ${(p) => p.labelSize};
  margin-bottom: 24px;
  margin-top: 0px;
`
const Label1 = styled.div<{ labelSize: string }>`
  color: #f9a11a;
  font-size: ${(p) => p.labelSize};
  margin-bottom: 24px;
  margin-top: 12px;
`
const Labelm = styled.div<{ labelSize: string }>`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: ${(p) => p.labelSize};  
  margin-bottom: 24px;
  margin-top: 10px;
`
const StyledCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  justify-content: space-between !important;
  align-items: center;
  height: 100%;
  margin-right:50px;
  padding-bottom:50px;
`
const StyledCardBodym = styled(CardBody)`
  display: flex;
  flex-direction: column;
  justify-content: space-between !important;
  align-items: center;
  margin: 15px;
  height: 100%;
  padding-top:5px;
  padding-bottom:60px;
`
const StyledImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 10px;
  margin-bottom: 0px;
  margin-left: 20px;
`
const StyledImgm = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 10px;
  margin-bottom: 55px;
  margin-left: 20px;
`

const IncomeCard = ({ img, rewards, smnPrice, myNode }) => {


 

  const [nodeNum, setNodeNum] = useState(0);
  const [smnNum, setSmnNum] = useState(0);
  const [reserveVal, setReserveVal] = useState(0)

  return (
    <>
    <BrowserView>
    <StyledCard>
      <RowBlockBetween>
        <StyledImg src={img} alt='status_logo' />
        <StyledCardBody>
          <Label1 labelSize='16px'>
            Estimated Monthly Earnings
            </Label1>
          <Label labelSize='32px'> $ {(smnPrice*myNode*30).toFixed(4)}</Label>
          <Heading scale="sm">
            Based on {myNode} {nodeNum > 1 ? 'nfts' : 'nfts'}
          </Heading>
        </StyledCardBody>
      </RowBlockBetween>
    </StyledCard>
    </BrowserView>
    <MobileView>
    <StyledCard>
      <RowBlockBetween>
        <StyledImgm src={img} alt='status_logo' />
        <StyledCardBodym>
          <Heading scale="sm">
            Estimated Monthly Earnings
          </Heading>
          <Labelm labelSize='13px'>$ {(smnPrice*myNode*30).toFixed(4)}</Labelm>
          <Heading scale="sm">
          Based on {myNode} {nodeNum > 1 ? 'nodes' : 'nodes'}
          </Heading>
        </StyledCardBodym>
      </RowBlockBetween>
    </StyledCard>
    </MobileView>
    </>    
  )
}

export default IncomeCard