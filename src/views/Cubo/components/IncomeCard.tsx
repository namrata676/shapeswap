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
  max-height: 173px;
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
const Label1m = styled.div<{ labelSize: string }>`
  color: #f9a11a;
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
  width:auto;
  margin-right:auto;
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
  margin-bottom: 18px;
  margin-left: 20px;
`
const StyledImgm = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 10px;
  margin-bottom: 55px;
  margin-left: 20px;
`

const IncomeCard = ({ img, rewards, smnPrice, myNode, projectxNodeContract, projectxTokenContract, ptx2Price }) => {


 

  const [nodeNum, setNodeNum] = useState(0);
  const [smnNum, setSmnNum] = useState(0);
  const [reserveVal, setReserveVal] = useState(0)

  return (
    <>
    <BrowserView>
    <StyledCard>
      <RowBlockBetween>
        <StyledImg src='./images/cubo-tt.png' alt='status_logo' />
        <StyledCardBody>
          <Label1 labelSize='18px'>
          Current $CUBO Value
            </Label1>
          <Label labelSize='38px'> $ {(ptx2Price*rewards).toFixed(4)}</Label>         
        </StyledCardBody>
      </RowBlockBetween>
    </StyledCard>
    </BrowserView>
    <MobileView>
    <StyledCard>
      <RowBlockBetween>
      <StyledImgm src='./images/cubo-tt.png' alt='status_logo' />
        <StyledCardBody>
          <Label1 labelSize='12px'>
            Current $CUBO Value
            </Label1>
          <Labelm labelSize='22px'> $ {(ptx2Price*rewards).toFixed(4)}</Labelm>          
        </StyledCardBody>
      </RowBlockBetween>
    </StyledCard>
    </MobileView>
    </>    
  )
}

export default IncomeCard