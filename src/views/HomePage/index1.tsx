import React, { useState, useEffect, useContext } from 'react'
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "./Exchange.css"
import styled from 'styled-components'
import { Heading, Text, BaseLayout, useModal, tokenPairImageVariant } from 'toolkit/uikit'
import { BnbUsdtPairTokenIcon, CardBody } from 'uikit'
import {
  InterNormalWhite14px,
  InterNormalWhite16px,
  InterMediumWhite16px,
  InterMediumWhite20px,
  InterBoldWhite120px,
  InterSemiBoldWhite16px,
  InterBoldWhite84px,
  InterBoldWhite20px,
  InterNormalWhite16px2,
} from "./styledMixins";
import Frame25801 from "./Frame25801";

const audio = new Audio("/images/sound/swoosh11.mp3")

  const start = () => {
    audio.play()
  }



const StyledCardBody = styled(CardBody)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #E6E9EE; 
  color: white !important;
  border-color: #faa21a;    
`

const StyledButton = styled.button`
  order: 4;
  align-items: center;
  border-radius: 12px;
  border-color: #0095EC;
  padding: 12px;
  margin-top: 20px;
  cursor: pointer;
  display: inline-flex;
  width: 94%;
  font-family: inherit !important;
font-style: normal !important;
font-weight: 500 !important;
font-size: 20px !impotant;
  justify-content: center;
  letter-spacing: 0.03em;
  color: #FFFFFF;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`;


const StyledButton2 = styled.button`
  order:2;
  align-items: center;
  border: 0;
  border-radius: 15px;
  padding: 12px;
  margin-top: 5px;
  display: inline-flex;
  width: 30px;
  height: 30px;
  background-color: #FFFFFF;
  font-family: inherit;
  font-size: 16px;
  justify-content: center;
  letter-spacing: 0.03em;
  color: #faa21a;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`;


const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid;
  border-radius: 10px;
  border-color: rgba(29, 29, 29, 0.05);
  padding: 5px;
  background: #272f37 !important;
  background: linear-gradient(to right,  #272f37 63%, #292929 20%) !important;
  font-size: 10px !important;
  color: white !important;
`

const StyledLoading = styled.div`
  order: 4;
  align-items: center;
  border: 1;
  border-color: #0095EC;
  // box-shadow: 0 0 6px #f8981d;
  border-radius: 12px;
  padding: 12px;
  margin-top: 20px;
  cursor: pointer;
  display: inline-flex;
  width: 94%;
  font-family: inherit;
  font-size: 26px !important;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-image: linear-gradient(90deg, #0095EC 0%, #154DDD 100%);
  color: #faa21a;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`;


const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;
  width: 100%;

  & > div {
    grid-column: span 12;
    background-color: #1B2028 !important; 
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
      background-color: #1B2028 !important;       
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    & > div {
      grid-column: span 6;
      background-color: #1B2028 !important; 
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 3;
    }
  }
`

const BiggerCards = styled(Cards)`
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
      font-size: 0.5em;
      border-radius:20px;    
      max-width: 480px;    
      max-height: 673px;
      background-color: #1B2028 !important;
      border: 1; 
      margin-left: 30%;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.01), 0px 12px 40px rgba(0, 0, 0, 0.02), 0px 8px 24px rgba(0, 0, 0, 0.02);
     
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
      background-color: #1B2028 !important;
    }
  }
`

const Label = styled.div<{ labelSize: string }>`
font-size: 14px;
color: #fff !important;
margin-top:10px 30px;
padding-top:20px;
`
const BalanceBody = styled.div`
font-size: 13px !important;
margin-right: 6px !important;
margin-bottom: 5px !important;
font-weight: 400 !important;
font-style: normal !important;
color: white !important;
font-family: Inter;
`

const NetworkText = styled.div`
font-size: 18px !important;
color: white !important;
font-weight: 700 !important;
margin-bottom: 3px;
margin-top: 0px !important
`

const CollapseText = styled.div`
font-style: normal !important;
font-weight: 400 !important;
font-size: 14px !important;
margin-bottom : 0%;
color: white !important;
font-family: inherit !important;
`
const CollapseTextBold = styled.div`
font-style: normal !important;
font-weight: 5 00 !important;
font-size: 16px !important;
color:  white !important;
`

const MultiChainDecentralizedExchange = styled.img`
  width: 989px;
  height: 185px;
  top: 504px;
  left: 411px;
  margin-left: 5%;
`;

const LoremIpsumDolorSi = styled.p`
 justify-content: center !important;
  width: 634px;
  text-align: center;
  letter-spacing: 0;
  line-height: 24px;
  justify: center !important;
  align-items: center !important;
  color: white !important;
  margin-left: 20% !important;
`;

const LoremIpsumDolorSi5 = styled.p`
 justify-content: center !important;
  width: 634px;
  text-align: center;
  letter-spacing: 0;
  line-height: 24px;
  justify: center !important;
  align-items: center !important;
  color: white !important;
`;


const CTA = styled.button`
  display: flex;
  width: 126px;
  height: 43px;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  top: 769px;
  left: 831px;
  border-radius: 8px;
  border: 1px none;
  justify: center !important;
  text-align: center !important;
  margin-left: 45%;
  margin-top: 2%;
  background: linear-gradient(
    180deg,
    rgb(0, 149.38752472400665, 235.87500303983688) 0%,
    rgb(21.179972290992737, 76.96958184242249, 221.00830078125) 100%
  );

  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`;

const LearnMore = styled.div`
  ${InterMediumWhite16px}
  width: fit-content;
  margin-top: -1px;
  letter-spacing: -0.16px;
  line-height: normal;
  font-size: 15px !important;
  align-items: center;
  justify-content: center !important;
  
`;

const Frame25810 = styled.img`
  width: 1000px;
  height: 423px;
  align-self: center;
  margin-top: 40px;
`;


const OverlapGroup7 = styled.div`
  width: 820px;
  height: 176px;
  top: 943px;
  left: 118px;
  margin-top: 15%;
`;

const TheOmniDex = styled.div`
  ${InterBoldWhite84px}
  position: absolute;
  font-size: 84px !important;
  top: 565px;
 
  letter-spacing: 0;
  line-height: normal;
`;

const Title = styled.h1`
  ${InterBoldWhite120px}
  position: absolute;
  font-size: 120px !important;
 
  -webkit-text-stroke: 2px var(--white);
  opacity: 0.2;
  letter-spacing: 0;
  line-height: normal;
`;

const TheOmniDex1 = styled.div`
  ${InterBoldWhite84px}
  position: absolute;
  font-size: 84px !important;
  top: 60px;
 
  letter-spacing: 0;
  line-height: normal;
`;

const Title1 = styled.h1`
  ${InterBoldWhite120px}
  position: absolute;
  font-size: 120px !important;
 
  -webkit-text-stroke: 2px var(--white);
  opacity: 0.2;
  letter-spacing: 0;
  line-height: normal;
`;



const HomePage = (props) => {

  const {
    navbarLinkSmartSwap,
    navbarLinkCollabs,
    navbarLinkFaqs,
    navbarLinkAbout,
    navbarLinkPlace,
    loremIpsumDolorSi1,
    title,
    theOmnidex,
    smartNft1,
    smartNft2,
    loremIpsumDolorSi2,
    aboutSmartFinance1,
    aboutSmartFinance2,
    smartNft3,
    smartNft4,
    smartNft5,
    loremIpsumDolorSi3,
    inTheMedia1,
    inTheMedia2,
    smartFinance,
    place,
    products,
    team,
    aboutUs,
    whitepaper,
    inTheMedia3,
    partners,
    contactUs,
    typeYourMessageHere,
    sendMessage,
    heroProps,
    frame25801Props,
    uSER1Props,
    uSER2Props,
  } = props;

 
const learnMore = () => {
  console.log("Learn1")
  }
  
  return (
    <>    
    <MultiChainDecentralizedExchange
          src="/img/multi-chain-decentralized-exchange@2x.svg"
          alt="Multi-Chain Decentralized Exchange"
        />
        <LoremIpsumDolorSi>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </LoremIpsumDolorSi>
        <CTA>
          <LearnMore onClick={learnMore}>Learn More</LearnMore>
        </CTA>
        <OverlapGroup7>
            <Title>{title}</Title>
            <TheOmniDex>{theOmnidex}</TheOmniDex>
          </OverlapGroup7>
          <LoremIpsumDolorSi5>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </LoremIpsumDolorSi5>
        <Frame25810 src="/img/frame-25810@1x.svg" alt="Frame 25810" />
        <SmartNftContainer>
          <Title1>{smartNft1}</Title1>
          <TheOmniDex1>{smartNft2}</TheOmniDex1>
        </SmartNftContainer>
        <LoremIpsumDolorSi1>{loremIpsumDolorSi2}</LoremIpsumDolorSi1>
     
          

    </>
  )
}

const OverlapGroup8 = styled.div`
  width: 1787px;
  height: 1199px;
  position: relative;
`;

const OverlapGroup4 = styled.div`

  width: 1787px;
  height: 1172px;
  top: 0;
  left: 0;
`;

const Navbar = styled.div`
  ${InterMediumWhite16px}

  width: 1440px;
  height: 92px;
  top: 0;
  left: 0;
  display: flex;
  padding: 24px 48px;
  align-items: center;
  border: 1px none;
  box-shadow: 0px 2px 32px #0000000a, 0px 2px 16px #00000005;
`;

const NavbarLinkSmartSwap = styled.div`
  margin-left: 657px;
  margin-bottom: 2px;
  min-width: 93px;
  text-align: center;
  letter-spacing: 0;
  line-height: 24px;
  white-space: nowrap;
`;


const NavbarLinkFAQs = styled.div`
  margin-left: 48px;
  margin-bottom: 2px;
  min-width: 40px;
  text-align: center;
  letter-spacing: 0;
  line-height: 24px;
  white-space: nowrap;
`;

const NavbarLinkAbout = styled.div`
  margin-left: 48px;
  margin-bottom: 2px;
  min-width: 47px;
  text-align: center;
  letter-spacing: 0;
  line-height: 24px;
  white-space: nowrap;
`;

const NavbarLinkPlace = styled.div`
  margin-left: 48px;
  margin-bottom: 2px;
  min-width: 62px;
  text-align: center;
  letter-spacing: 0;
  line-height: 24px;
  white-space: nowrap;
`;

const BGBlur = styled.div`
  
  width: 697px;
  height: 697px;
  top: 475px;
  left: 1090px;
  border-radius: 348.5px;
  border: 1px none;
  filter: blur(500px);
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0) 10.346980392932892%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.2250065803527832) 26.006677746772766%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.48623812198638916) 37.135377526283264%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.6513758897781372) 53.901344537734985%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.8119264841079712) 70.33675909042358%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.9004133939743042) 84.29304957389832%,
    rgb(21.000000648200512, 77.00000301003456, 221.00000202655792) 100%
  );
  opacity: 0.4;
`;

const SmartNftContainer = styled.div`
  width: 624px;
  height: 176px;
  position: relative;
  margin-top: 137px;
  
`;

const LoremIpsumDolorSi1 = styled.p`
  ${InterNormalWhite16px2}
  width: 624px;
  margin-top: 8px;
 
  letter-spacing: 0;
  line-height: 24px;
`;

const OverlapGroupContainer = styled.div`
  width: 1786px;
  height: 1258px;
  position: relative;
  margin-top: 7px;
  margin-left: -193px;
`;

const OverlapGroup3 = styled.div`
 
  width: 1633px;
  height: 1139px;
  top: 119px;
  left: 0;
`;

const BGBlur1 = styled.div`
 
  width: 697px;
  height: 697px;
  top: 333px;
  left: 0;
  border-radius: 348.5px;
  border: 1px none;
  filter: blur(500px);
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0) 10.346980392932892%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.2250065803527832) 26.006677746772766%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.48623812198638916) 37.135377526283264%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.6513758897781372) 53.901344537734985%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.8119264841079712) 70.33675909042358%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.9004133939743042) 84.29304957389832%,
    rgb(21.000000648200512, 77.00000301003456, 221.00000202655792) 100%
  );
  opacity: 0.5;
`;

const AboutSmartFinance = styled.div`
  ${InterBoldWhite120px}
 
  top: 963px;
  left: 311px;
  -webkit-text-stroke: 2px var(--white);
  opacity: 0.2;
  letter-spacing: 0;
  line-height: normal;
`;

const AboutSmartFinance1 = styled.div`
  ${InterBoldWhite84px}
 
  top: 1037px;
  left: 314px;
  letter-spacing: 0;
  line-height: normal;
`;

const Rectangle6027 = styled.div`
 
  width: 320px;
  height: 425px;
  top: 60px;
  left: 313px;
  background-color: var(--eerie-black);
  border-radius: 16px;
  border: 2px solid;
  border-color: transparent;
  border-image: linear-gradient(
      to bottom,
      rgb(21.000000648200512, 77.00000301003456, 221.00000202655792),
      rgb(0, 149.00000631809235, 236.00000113248825) 16.146452724933624%,
      rgba(0, 149.00000631809235, 236.00000113248825, 0.5400000214576721) 35.88300943374634%,
      rgba(0, 149.00000631809235, 236.00000113248825, 0.03999999910593033) 60.01765727996826%,
      rgba(0, 149.00000631809235, 236.00000113248825, 0) 100%
    )
    1;
`;

const Rectangle6028 = styled.div`
 
  width: 365px;
  height: 485px;
  top: 0;
  left: 685px;
  background-color: var(--eerie-black);
  border-radius: 16px;
  border: 2px solid;
  border-color: transparent;
  border-image: linear-gradient(
      to bottom,
      rgb(21.000000648200512, 77.00000301003456, 221.00000202655792),
      rgb(0, 149.00000631809235, 236.00000113248825) 16.146452724933624%,
      rgba(0, 149.00000631809235, 236.00000113248825, 0.5400000214576721) 35.88300943374634%,
      rgba(0, 149.00000631809235, 236.00000113248825, 0.03999999910593033) 60.01765727996826%,
      rgba(0, 149.00000631809235, 236.00000113248825, 0) 100%
    )
    1;
`;

const SmartNFT = styled.div`
  ${InterBoldWhite20px}
 
  top: 259px;
  left: 421px;
  letter-spacing: 0;
  line-height: normal;
`;

const SmartNFT1 = styled.div`
  ${InterBoldWhite20px}
 
  top: 229px;
  left: 815px;
  letter-spacing: 0;
  line-height: normal;
`;

const OverlapGroup2 = styled.div`
 
  width: 697px;
  height: 697px;
  top: 0;
  left: 1089px;
  border-radius: 348.5px;
`;

const BGBlur2 = styled.div`
 
  width: 697px;
  height: 697px;
  top: 0;
  left: 0;
  border-radius: 348.5px;
  border: 1px none;
  transform: rotate(-180deg);
  filter: blur(500px);
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0) 10.346980392932892%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.2250065803527832) 26.006677746772766%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.48623812198638916) 37.135377526283264%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.6513758897781372) 53.901344537734985%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.8119264841079712) 70.33675909042358%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.9004133939743042) 84.29304957389832%,
    rgb(21.000000648200512, 77.00000301003456, 221.00000202655792) 100%
  );
  opacity: 0.5;
`;

const Rectangle6029 = styled.div`
 
  width: 410px;
  height: 546px;
  top: 58px;
  left: 14px;
  background-color: var(--eerie-black);
  border-radius: 16px;
  border: 2px solid;
  border-color: transparent;
  border-image: linear-gradient(
      to bottom,
      rgb(21.000000648200512, 77.00000301003456, 221.00000202655792),
      rgb(0, 149.00000631809235, 236.00000113248825) 16.146452724933624%,
      rgba(0, 149.00000631809235, 236.00000113248825, 0.5400000214576721) 35.88300943374634%,
      rgba(0, 149.00000631809235, 236.00000113248825, 0.03999999910593033) 60.01765727996826%,
      rgba(0, 149.00000631809235, 236.00000113248825, 0) 100%
    )
    1;
`;

const SmartNFT2 = styled.div`
  ${InterBoldWhite20px}
 
  top: 318px;
  left: 167px;
  letter-spacing: 0;
  line-height: normal;
`;

const LoremIpsumDolorSi2 = styled.p`
  ${InterNormalWhite16px2}
  width: 790px;
  margin-top: 8px;
  margin-left: 120px;
  letter-spacing: 0;
  line-height: 24px;
`;

const OverlapGroupContainer1 = styled.div`
  width: 1786px;
  height: 1344px;
  position: relative;
  margin-top: 65px;
  margin-left: -193px;
`;

const OverlapGroup1 = styled.div`
 
  width: 1513px;
  height: 732px;
  
  left: 0;
`;

const BGBlur3 = styled.div`
 
  width: 697px;
  height: 697px;
  top: 0;
  left: 0;
  border-radius: 348.5px;
  border: 1px none;
  filter: blur(500px);
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0) 10.346980392932892%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.2250065803527832) 26.006677746772766%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.48623812198638916) 37.135377526283264%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.6513758897781372) 53.901344537734985%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.8119264841079712) 70.33675909042358%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.9004133939743042) 84.29304957389832%,
    rgb(21.000000648200512, 77.00000301003456, 221.00000202655792) 100%
  );
  opacity: 0.5;
`;

const InTheMedia = styled.div`
  ${InterBoldWhite120px}
 
  top: 28px;
  left: 311px;
  -webkit-text-stroke: 2px var(--white);
  opacity: 0.2;
  letter-spacing: 0;
  line-height: normal;
`;

const InTheMedia1 = styled.div`
  ${InterBoldWhite84px}
 
  top: 102px;
  left: 314px;
  letter-spacing: 0;
  line-height: normal;
`;

const Frame25811 = styled.img`
 
  width: 1200px;
  height: 463px;
  top: 269px;
  left: 313px;
`;

const OverlapGroup6 = styled.div`
 
  width: 1473px;
  height: 716px;
  top: 0;
  left: 313px;
`;

const BGBlur4 = styled.div`
 
  width: 697px;
  height: 697px;
  top: 19px;
  left: 776px;
  border-radius: 348.5px;
  border: 1px none;
  transform: rotate(-180deg);
  filter: blur(500px);
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0) 10.346980392932892%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.2250065803527832) 26.006677746772766%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.48623812198638916) 37.135377526283264%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.6513758897781372) 53.901344537734985%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.8119264841079712) 70.33675909042358%,
    rgba(21.000000648200512, 77.00000301003456, 221.00000202655792, 0.9004133939743042) 84.29304957389832%,
    rgb(21.000000648200512, 77.00000301003456, 221.00000202655792) 100%
  );
  opacity: 0.5;
`;

const Frame25807 = styled.img`
 
  width: 1200px;
  height: 463px;
  top: 0;
  left: 0;
`;

const Frame258101 = styled.div`
  width: 1440px;
  height: 554px;
  margin-top: 639px;
  display: flex;
  flex-direction: column;
  padding: 74px 120px;
  align-items: flex-start;
  gap: 39px;
  background-color: #080808;
  border: 1px none;
`;

const FlexRow = styled.div`
  ${InterNormalWhite16px}
  display: flex;
  align-items: flex-start;
  min-width: 1199px;
`;

const FlexCol = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 186px;
`;

const NewProject6531 = styled.img`
  width: 82px;
  height: 101px;
`;

const SmartFinance = styled.div`
  ${InterMediumWhite20px}
  margin-top: 11px;
  letter-spacing: 0;
  line-height: 30px;
  white-space: nowrap;
`;

const FlexRow1 = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  min-width: 220px;
  gap: 20px;
`;

const EntypoSocialtwitterWithCircle = styled.img`
  width: 28px;
  height: 28px;
`;

const Group25787 = styled.div`
  width: 74px;
  margin-left: 314px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 120px;
  gap: 24px;
`;

const Place = styled.div`
  letter-spacing: 0;
  line-height: 24px;
  white-space: nowrap;
`;

const Group25786 = styled.div`
  width: 105px;
  margin-left: 74px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 168px;
  gap: 24px;
`;

const Whitepaper = styled.div`
  margin-left: 3px;
  letter-spacing: 0;
  line-height: 24px;
  white-space: nowrap;
`;

const Frame1116604308 = styled.div`
  width: 340px;
  height: 366px;
  position: relative;
  margin-left: 72px;
  display: flex;
  flex-direction: column;
  padding: 19px 0;
  align-items: center;
  background-color: #161515;
  border-radius: 9px;
  overflow: hidden;
  border: 1px solid;
  border-color: var(--white-4);
`;

const ContactUs = styled.div`
  ${InterSemiBoldWhite16px}
  align-self: flex-start;
  margin-left: 20px;
  letter-spacing: 0;
  line-height: 24px;
  white-space: nowrap;
`;

const OverlapGroup = styled.div`
  width: 300px;
  height: 158px;
  position: relative;
  margin-top: 20px;
  border-radius: 8px;
`;

const MESSAGEBOX = styled.div`
 
  width: 300px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 6px 10px;
  align-items: flex-start;
  min-height: 158px;
  gap: 76px;
  background-color: var(--charade);
  border-radius: 8px;
  border: 1px solid;
  border-color: var(--white-4);
  box-shadow: 0px 2px 20px #00000014;
`;

const TypeYourMessageHere = styled.div`
  ${InterNormalWhite14px}
  letter-spacing: 0;
  line-height: 21px;
  white-space: nowrap;
`;

const SendButton = styled.div`
  width: 276px;
  height: 42px;
  margin-left: 1px;
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    rgb(0, 149.38752472400665, 235.87500303983688) 0%,
    rgb(21.179972290992737, 76.96958184242249, 221.00830078125) 100%
  );
`;

const Group25784 = styled.div`
 
  height: 24px;
  top: 113px;
  left: 93px;
  display: flex;
  align-items: center;
  min-width: 136px;
  gap: 4px;
`;

const Send = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 2px;
`;

const SendMessage = styled.div`
  ${InterSemiBoldWhite16px}
  min-width: 114px;
  letter-spacing: 0;
  line-height: 24px;
  white-space: nowrap;
`;

const Line2 = styled.img`
  width: 1199px;
  height: 1px;
  object-fit: cover;
`;


export default HomePage