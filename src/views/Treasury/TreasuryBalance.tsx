import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
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
// import { State } from '../../../state/types'

const StyledCard = styled(Card)`
  // height: 200px;
  max-height: 182px;
  background-color: #1b2028 !important;
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
  color: white !important;
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
  padding-bottom:34px;
  background-color: #1b2028 !important;
`
const StyledImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 10px;
  // margin-top: 20px;
  margin: 10px;
  margin-left: 20px;
`

const TreasuryBalance = ({ img }) => {
  const [nodeNum, setNodeNum] = useState(0);
  const [smnNum, setSmnNum] = useState(0);
  const [smnPrice, setSmnPrice] = useState(0);

  return (
    <StyledCard>
      <RowBlockBetween>
        <StyledImg src={img} alt='status_logo' />
        <StyledCardBody>
          <Heading scale="sm">
            Treasury Balance
          </Heading>
          <Label labelSize='33px'>
            $200M
          </Label>
          {/* <Heading scale="sm">
            Based on {nodeNum} {nodeNum > 1 ? 'nodes' : 'node'} & {smnNum} SMN
          </Heading> */}
        </StyledCardBody>
      </RowBlockBetween>
    </StyledCard>
  )
}

export default TreasuryBalance