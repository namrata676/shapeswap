import React from 'react'
import styled from 'styled-components'
import { Text, Flex, IconButton, ArrowBackIcon, Button } from 'toolkit/uikit'
import { Link } from 'react-router-dom'
import Settings from './Settings'
// import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'
import "./header.css"

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  noConfig?: boolean
  swapType?: number
  setSlippage?: (value: number | ((prevVar: number) => number)) => void;
  setSwapType?: (value: number | ((prevVar: number) => number)) => void;
}

const AppHeaderContainer = styled(Flex)`
  align-items: center; /* Vertically center all content */
  justify-content: space-between; /* Space between elements horizontally */
  padding-left: 23px;
  padding-right: 23px;
  padding-bottom: 0px;
  padding-top: 0px;
  width: 100%;
  color: black;
  background-color: #E6E9EE !important;
  border-radius: 8px; /* Optional: Rounded edges for a modern look */

`;

const AppHeader: React.FC<Props> = ({
  title,
  subtitle,
  helper,
  backTo,
  noConfig = false,
  setSlippage,
  setSwapType,
  swapType,
}) => {
  return (
    <AppHeaderContainer>
      {/* First element */}
      <Text fontFamily="Teko" color="black" fontSize="16px !important">{title}</Text>

      {/* Second element */}
      {!noConfig && (
        <Flex alignItems="start"> {/* Ensure vertical alignment */}
          <Settings setSlippage={setSlippage} />
        </Flex>
      )}
    </AppHeaderContainer>
  );
};


export default AppHeader
