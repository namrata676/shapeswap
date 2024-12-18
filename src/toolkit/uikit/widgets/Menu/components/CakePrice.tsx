import React from 'react'
import styled from 'styled-components'
import { PancakeRoundIcon } from '../../../components/Svg'
import Text from '../../../components/Text/Text'
import Skeleton from '../../../components/Skeleton/Skeleton'


interface Props {
  cakePriceUsd?: string,
  link?: string
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-left: 16px;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`

const PriceLink1 = styled.a`
  display: flex;
  align-items: center;
  margin: auto;
  padding-left: 16px;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`

const PriceWrapper = styled.div`
  display: flex;
  border-radius: 15px;
  background-image: linear-gradient(#525252 80%,#323232 100%);,
  height: 40px;
  width: 90%;
  margin: auto;
  box-shadow: 0px 0px 3px black;
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: left;
`
const Wrapper1 = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  bottom:50px;
`

const CakePrice: React.FC<Props> = ({ cakePriceUsd, link }) => {
  const href = link;
  return (
    <PriceWrapper>
      {/* <img src={sidebarBalanceLeft} alt="balance left" /> */}
      <Wrapper>
        <PriceLink
          href={href}
          target="_blank"
        >
          <img src={cakePriceUsd === 'Discord'?'/images/discord.png':'/images/twitter.png'} alt="" width="32px" />
          <Text color="text" bold ml="10px">{cakePriceUsd}</Text>
        </PriceLink>
        </Wrapper>
      <img src='/images/dots.png' alt="balance dots" style={{ marginTop: "5px" }} />
    </PriceWrapper>
  )
}

export default React.memo(CakePrice)
