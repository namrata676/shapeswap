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
  height: 176px;
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
  margin-right:55px;
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
  width: 140px;
  height: 140px;
  border-radius: 10px;
  margin-bottom: 0px;
  margin-left: 20px;
`
const StyledImgm = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 10px;
  margin-bottom: 0px;
  margin-left: 20px;
`

const IncomeCard = ({ img, rewards, rewards1, GrapeFinanceGrapeContract, GrapeFinanceWineContract, GrapePrice, WinePrice }) => {


 

  const [nodeNum, setNodeNum] = useState(0);
  const [smnNum, setSmnNum] = useState(0);
  const [reserveVal, setReserveVal] = useState(0)

  return (
    <>
    <BrowserView>
    <StyledCard>
      <RowBlockBetween>
        <StyledImg src='./images/titano.png' alt='status_logo' />
        <StyledCardBody>
          <Label1 labelSize='18px'>
          $Titano current value
            </Label1>
          <Label labelSize='38px'> $ {(GrapePrice*rewards).toFixed(2)}</Label> 
          </StyledCardBody>  
          <StyledCardBody>
          <Label1 labelSize='18px'>
          $Titano current value
            </Label1>
          <Label labelSize='38px'> $ {(WinePrice*rewards1).toFixed(2)}</Label>       
        </StyledCardBody>
      </RowBlockBetween>
    </StyledCard>
    </BrowserView>
    <MobileView>
    <StyledCard>
      <RowBlockBetween>
      <StyledImgm src='./images/titano.png' alt='status_logo' />
        <StyledCardBody>
          <Label1 labelSize='12px'>
            $Titano current value
            </Label1>
          <Labelm labelSize='22px'> $ {(GrapePrice*rewards).toFixed(2)}</Labelm>          
        </StyledCardBody>
      </RowBlockBetween>
    </StyledCard>
    </MobileView>
    </>    
  )
}

export default IncomeCard