import React, { useState, useEffect, useContext } from 'react'
import { BrowserView, MobileView } from 'react-device-detect';
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
  background-color: #1B2028; 
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
    background-color: #E6E9EE !important; 
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
      background-color: #E6E9EE !important;       
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    & > div {
      grid-column: span 6;
      background-color: #E6E9EE !important; 
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
      background-color: #E6E9EE  !important;
      border: 1; 
      margin-left: 30%;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.01), 0px 12px 40px rgba(0, 0, 0, 0.02), 0px 8px 24px rgba(0, 0, 0, 0.02);
     
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
      background-color: #E6E9EE !important;
    }
  }
`

const Label = styled.div<{ labelSize: string }>`
font-size: 14px;
color: #fff !important;
margin-top:10px 30px;
padding-top:20px;
`
const Labelh = styled.div<{ labelSize: string }>`
font-size: 48px !important;
color: #0e65e1 !important;
text-align: center !important;
width: 100% !important;

}
`
const Labelh1 = styled.div<{ labelSize: string }>`
font-size: 38px !important;
color: white !important;
text-align: center !important;
width: 100% !important;
}
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
  justify:  center !important ;
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;

`;

const Slogan = styled.p`
 justify-content: center !important;
 position: relative;
 margin: 0 auto;
  text-align: center;
  letter-spacing: 0;
  line-height: 24px;
  justify: center !important;
  align-items: center !important;
  color: white !important;
  
`;

const Sloganm = styled.p`
 padding: 5px;
  font-size: 22px !important;
  text-align: center;    
  justify: center !important;
  justify-content: center !important;  
  align-items: center !important;
  color: white !important;  
  position: relative;
  margin: 0 auto;
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
  margin-top: 5%;
`;

const LoremIpsumDolorSim = styled.p`
 justify-content: center !important;
  width: 100%;
  text-align: center;
  letter-spacing: 0;
  line-height: 24px;
  justify: center !important;
  align-items: center !important;
  color: white !important;  
  margin-top: 5%;
`;


const LoremIpsumDolorSi5 = styled.p`
 justify-content: center !important;
 margin-top: 25px;  
  text-align: center;
  letter-spacing: 0;
  line-height: 24px;
  justify: center !important;
  align-items: center !important;
{ /* margin-left: 28% !important; */ }
  color: white !important;
`;


const CTA = styled.button`
  display: flex;
  width: 115px;
  height: 43px;  
  gap: 10px;
  padding: 12px 20px;
  top: 769px;
  left: 631px;
  border-radius: 8px;
  border: 1px none;
  justify: center !important;
  text-align: center !important;
  margin-left: 46%;
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
  font-size: 15px !important;
  align-items: center !important;
  justify-content: center !important;
  
`;

const Frame25810 = styled.img`
  width: 75% !important;
  height: auto !important;
  align-self: center;
  margin-top: 40px;
  border-radius: 18px !important;
  {/*  margin-left: 8% !important; */}
  
`;


const OverlapGroup7 = styled.div`
margin-top: 10%;
width: 820px;
height: 150px;
left: 118px;

`;

const TheOmniDex = styled.div`
  ${InterBoldWhite84px}
  position: absolute;
  font-size: 84px !important;
  margin-top: 5%;
  letter-spacing: 0;
  line-height: normal;
`;

const Title = styled.h1`
  ${InterBoldWhite120px}  
  margin-top: 10% !important;
  font-size: 120px !important; 
  
  color: white;
  letter-spacing: 0;
  line-height: normal;
`;

const Titlem = styled.h1`
  ${InterBoldWhite120px}    
  font-size: 60px !important; 
  -webkit-text-stroke: 2px var(--white);
  opacity: 0.8;
  letter-spacing: 0;
  line-height: normal;
`;

const TheOmniDex1 = styled.div`
  ${InterBoldWhite84px}
 
  font-size: 120px !important;
  top: 0px;

  letter-spacing: 0;
  line-height: normal;
`;

const TheOmniDex1m = styled.div`
  ${InterBoldWhite84px}
 
  font-size: 60px !important;
  top: 0px;

  letter-spacing: 0;
  line-height: normal;
`;

const Title1 = styled.h1`
  
   position: absolute;
  font-size: 120px !important;
 
  -webkit-text-stroke: 2px var(--white);
  opacity: 0.8;
  letter-spacing: 0;
  line-height: normal;
`;


const Title2 = styled.h1`
  ${InterBoldWhite120px}
   position: absolute;
  font-size: 70px !important;
 
  -webkit-text-stroke: 2px var(--white);
  opacity: 0.2;
  letter-spacing: 0;
  line-height: normal;
`;
const TheOmniDex2 = styled.div`
  ${InterBoldWhite84px}
  width: auto !important;
  position: absolute;
  font-size: 120px !important;
  top: -72px;
 margin-left: 0%;
  letter-spacing: 0;
  line-height: normal;
`;

const TheOmniDex2m = styled.div`
  ${InterBoldWhite84px}
  width: auto !important;
  position: absolute;
  font-size: 40px !important;
  top: 0px;
 margin-left: 40px !important;
  letter-spacing: 0;
  line-height: normal;
`;


const Title3 = styled.h1`
  ${InterBoldWhite120px}
   position: absolute;
  font-size: 100px !important;
 
  -webkit-text-stroke: 2px var(--white);
  opacity: 0.2;
  letter-spacing: 0;
  line-height: normal;
`;

const TheOmniDex3 = styled.div`
  ${InterBoldWhite84px}
  position: absolute;
  font-size: 64px !important;
  top: 60px;
 
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
  console.log("Learn")
  }
  
  return (
    <>  
    <BrowserView>
      <div className="container">
      { /* <Labelh labelSize='38px'>Multi-Chain</Labelh>
      <Labelh1 labelSize='14px'>Decentralized Exchange</Labelh1> */}
        <img src="/img/multi-chain-decentralized-exchange@2x.svg" alt="multichain" className="mainImg"/>
        <Slogan >
        Smart Finance is bringing capital efficiency into the fragmented blockchain ecosystem. <br/><br/> With the launch of our Omni-Dex, we lay the foundation of complete blockchain interoperability. <br/> <br/> Our product line enables lowest slippage, smallest price impact and lightening speed transaction finality from point A to B.  Interact with all your favorite blockchains from an ALL IN ONE, user friendly UI/UX with no central point of failure! FULL ON-Chain Solution!.
        </Slogan>
        <img src="/img/logosf.png" alt="logo" className="logoImg" />      
        </div>

{ /*
        <div style={{marginTop: "0% !important"}}>
        <Title>The Omni Dex</Title>          
          <LoremIpsumDolorSi5>
          The “Smart OmniDex” is the marriage of two Smart Finance products, Smart Swap Dex for Local Swaps and our New Cross Chain Smart Bridge Technology. This integration grants our Swap users the capability to either Swap/Trade tokens internally on a local network or bridge any tokens between different networks. Boasting the industry’s fastest time to finality, lowest slippage and smallest price impact. Any Coin on Any Network to Any Coin on Any Network! One Click! Smart Finance is proud to bring you streamlined interoperability through the Smart OmniDex!          
        </LoremIpsumDolorSi5>
        <Frame25810 src="/img/stock1.png" alt="omni dex" style={{marginLeft: "13%"}} />
        </div>  

          <TheOmniDex1>{smartNft2}</TheOmniDex1>
        
        <LoremIpsumDolorSi5>
        With static tracking, holders will have the ability to watch their fee share grow based off the amount of NFTs you hold and the ability to claim the daily yield from your NFT’s directly from our Dapp.
        Future development to come such as Smart Bridge, LPs, Farming, Staking, Etc.
        Have a look at our documentation https://docs.smartfinance.exchange or join us on our 24/7 Voice Chat in Discord
        </LoremIpsumDolorSi5>
        
        <OverlapGroupContainer>
        <OverlapGroup3 className="d-flex row" style={{marginLeft: "30px"}}>
            <img src="/img/ogcollection.png" alt="ognfts" className="ogImg" style={{borderRadius: "13px", width: "75%"}} /> 
            <img src="/img/ognft2.png" alt="ognfts" style={{borderRadius: "16px", width: "10%"}} /> 
           <Rectangle6029> <img src="/img/ognft2.png" alt="ognfts" style={{borderRadius: "16px",width: "5% !important"}} /> </Rectangle6029>
          </OverlapGroup3>
        
        
          <SmartNftContainer1 style={{marginTop: "5%", width: "auto !important"}}>
          <TheOmniDex2>{aboutSmartFinance2}</TheOmniDex2>
        </SmartNftContainer1>
        
        <LoremIpsumDolorSi122>        
          Smart Finance is an Interoperable Multi-Chain Omni DEX that splits transaction fees with our Smart NFT Holders! Inspired by the leading DEX’S, with focus on current pain points and barriers for the everyday swap users. We strive for keeping their needs and wants in the forefront. Streamlining ease of access to DeFi usage, we are continuing to build out the most Interoperable DeFi ecosystem!
        </LoremIpsumDolorSi122>
        <div className="videos">
          <iframe src='https://www.youtube.com/embed/cHfvswGf1q8' width="560" height="315" style={{display: "flex", margin: "15px", borderRadius: "16px"}} title='smart finance' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' />
          <iframe src="https://www.youtube.com/embed/2GdFYN65GbM" width="560" height="315" style={{display: "flex", margin: "15px", borderRadius: "16px"}} title="smart finance" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
          <iframe src="https://www.youtube.com/embed/dRt3xz69Ds4" width="560" height="315" style={{display: "flex", margin: "15px", borderRadius: "16px"}} title="smart finance" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />                    
        </div>
        <img src="/img/webbanner.png" alt="webbanner" width="50%" style={{marginLeft: "22%", borderRadius: "16px"}} />
        
        <SmartNftContainer1 style={{marginTop: "5%"}}>          
          <TheOmniDex2>{inTheMedia1}</TheOmniDex2>
        </SmartNftContainer1>                
        
        <div className="inMedia" >                 
          <a href="https://nftmags.com/smartswap/" target="_blank" rel="noreferrer" style={{width: "80%"}} ><img src="/img/nftmags.png" alt="nftmags" style={{width: "80%"}} /> </a>
          <a href="https://issuu.com/cryptoweekly/docs/crypto_weekly_magazine_v44_29-10/38" target="_blank" rel="noreferrer" style={{width: "50%"}} ><img src="/img/crypomag.jpeg" alt="cryptomag" style={{width: "70%"}} /> </a>
          <a href="https://www.marketwatch.com/press-release/smart-finance-omni-dex-2022-10-04?mod=search_headline" target="_blank" rel="noreferrer"><img src="/img/marketw.jpeg" alt="marketwatch" style={{width: "88%"}} /> </a>
        </div>
        
        </OverlapGroupContainer>
      */}
        </BrowserView>
        <MobileView>
        <div className="containerm">
      <Labelh labelSize='14px'>Multi-Chain</Labelh>
      <Labelh1 labelSize='14px'>Decentralized Exchange</Labelh1> 
       { /* <img src="/img/multi-chain-decentralized-exchange@2x.svg" alt="multichain" className="mainImg"/> */}
        <Sloganm >
        Smart Finance is bringing capital efficiency into the fragmented blockchain ecosystem. <br/><br/> With the launch of our Omni-Dex, we lay the foundation of complete blockchain interoperability. <br/> <br/> Our product line enables lowest slippage, smallest price impact and lightening speed transaction finality from point A to B.  Interact with all your favorite blockchains from an ALL IN ONE, user friendly UI/UX with no central point of failure! FULL ON-Chain Solution!.
        </Sloganm>
        <img src="/img/logosf.png" alt="logo" className="logoImgm" />      
        </div>
{ /*
        <div style={{marginTop: "0% !important"}}>
        <Title>The Omni Dex</Title>          
          <LoremIpsumDolorSi5>
          The “Smart OmniDex” is the marriage of two Smart Finance products, Smart Swap Dex for Local Swaps and our New Cross Chain Smart Bridge Technology. This integration grants our Swap users the capability to either Swap/Trade tokens internally on a local network or bridge any tokens between different networks. Boasting the industry’s fastest time to finality, lowest slippage and smallest price impact. Any Coin on Any Network to Any Coin on Any Network! One Click! Smart Finance is proud to bring you streamlined interoperability through the Smart OmniDex!          
        </LoremIpsumDolorSi5>
        <Frame25810 src="/img/stock1.png" alt="omni dex" style={{marginLeft: "13%"}} />
        </div>  

          <TheOmniDex1>{smartNft2}</TheOmniDex1>
        
        <LoremIpsumDolorSi5>
        With static tracking, holders will have the ability to watch their fee share grow based off the amount of NFTs you hold and the ability to claim the daily yield from your NFT’s directly from our Dapp.
        Future development to come such as Smart Bridge, LPs, Farming, Staking, Etc.
        Have a look at our documentation https://docs.smartfinance.exchange or join us on our 24/7 Voice Chat in Discord
        </LoremIpsumDolorSi5>
        
        <OverlapGroupContainer>
        <OverlapGroup3 className="d-flex row" style={{marginLeft: "30px"}}>
            <img src="/img/ogcollection.png" alt="ognfts" className="ogImg" style={{borderRadius: "13px", width: "75%"}} /> 
            <img src="/img/ognft2.png" alt="ognfts" style={{borderRadius: "16px", width: "10%"}} /> 
           <Rectangle6029> <img src="/img/ognft2.png" alt="ognfts" style={{borderRadius: "16px",width: "5% !important"}} /> </Rectangle6029>
          </OverlapGroup3>
        
        
          <SmartNftContainer1 style={{marginTop: "5%", width: "auto !important"}}>
          <TheOmniDex2>{aboutSmartFinance2}</TheOmniDex2>
        </SmartNftContainer1>
        
        <LoremIpsumDolorSi122>        
          Smart Finance is an Interoperable Multi-Chain Omni DEX that splits transaction fees with our Smart NFT Holders! Inspired by the leading DEX’S, with focus on current pain points and barriers for the everyday swap users. We strive for keeping their needs and wants in the forefront. Streamlining ease of access to DeFi usage, we are continuing to build out the most Interoperable DeFi ecosystem!
        </LoremIpsumDolorSi122>
        <div className="videos">
          <iframe src='https://www.youtube.com/embed/cHfvswGf1q8' width="560" height="315" style={{display: "flex", margin: "15px", borderRadius: "16px"}} title='smart finance' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' />
          <iframe src="https://www.youtube.com/embed/2GdFYN65GbM" width="560" height="315" style={{display: "flex", margin: "15px", borderRadius: "16px"}} title="smart finance" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
          <iframe src="https://www.youtube.com/embed/dRt3xz69Ds4" width="560" height="315" style={{display: "flex", margin: "15px", borderRadius: "16px"}} title="smart finance" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />                    
        </div>
        <img src="/img/webbanner.png" alt="webbanner" width="50%" style={{marginLeft: "22%", borderRadius: "16px"}} />
        
        <SmartNftContainer1 style={{marginTop: "5%"}}>          
          <TheOmniDex2>{inTheMedia1}</TheOmniDex2>
        </SmartNftContainer1>                
        
        <div className="inMedia" >                 
          <a href="https://nftmags.com/smartswap/" target="_blank" rel="noreferrer" style={{width: "80%"}} ><img src="/img/nftmags.png" alt="nftmags" style={{width: "80%"}} /> </a>
          <a href="https://issuu.com/cryptoweekly/docs/crypto_weekly_magazine_v44_29-10/38" target="_blank" rel="noreferrer" style={{width: "50%"}} ><img src="/img/crypomag.jpeg" alt="cryptomag" style={{width: "70%"}} /> </a>
          <a href="https://www.marketwatch.com/press-release/smart-finance-omni-dex-2022-10-04?mod=search_headline" target="_blank" rel="noreferrer"><img src="/img/marketw.jpeg" alt="marketwatch" style={{width: "88%"}} /> </a>
        </div>
        
        </OverlapGroupContainer>
      */}
        </MobileView>
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

const NavbarLinkCollabs = styled.div`
  margin-left: 48px;
  margin-bottom: 2px;
  min-width: 58px;
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
  width: auto !important;
  height: 150px;
 
  margin-top: 20px;
  
  
`;

const LoremIpsumDolorSi1 = styled.p`
  ${InterNormalWhite16px2}
  width: 624px;
  margin-left: 28% !important; 
  letter-spacing: 0;
  line-height: 24px;
`;

const LoremIpsumDolorSi12 = styled.p`
  ${InterNormalWhite16px2}
  color: white;  
  letter-spacing: 0;
  line-height: 24px;  
`;

const LoremIpsumDolorSi122 = styled.p`
  ${InterNormalWhite16px2}  
  margin-left: 0% !important; 
  letter-spacing: 0;
  line-height: 24px;
  padding-bottom: 20px;
  color: white;
`;

const SmartNftContainer1 = styled.div`
  width: auto !important;
  height: 76px;
  position: relative;
  margin-top: 13px;
  margin-left: 0%;
  
`;
const SmartNftContainer11 = styled.div`
  width: auto !important;
  height: 176px;
  position: relative;
  margin-top: 13px;
  margin-left: 8%;
  
`;
const LoremIpsumDolorSi11= styled.p`
  ${InterNormalWhite16px2}
  width: 624px; 
  letter-spacing: 0;
  line-height: 24px;
  margin-left: 28% !important;
`;

const OverlapGroupContainer = styled.div`
  width: 1786px;
  height: 1258px;
  position: relative;
  margin-top: 7px;  
  margin-left: -20px;  
`;

const OverlapGroupContainer2 = styled.div`
  width: 1786px;
  height: 1258px;
  position: relative;
  margin-top: 7px;
  margin-left: -193px;
  margin-left: 0%;
`;

const OverlapGroup3 = styled.div`
  top: 119px;
  left: 0;
  margin-left: 0%;
  margin-top: 1%;
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
  left: 313px;
  margin-right: 2%;
  margin-top: 4%;
  background-color: var(--eerie-black);
  border-radius: 16px;  
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
  margin-top: 4%;  
  margin-right: 2%;  
  left: 685px;
  background-color: var(--eerie-black);
  border-radius: 16px;
  
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
const Rectangle6029 = styled.div`
  margin-top: 4%;
  left: 14px;
  background-color: var(--eerie-black);
  border-radius: 16px;  
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
  top: 612px;
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
  positiion: absolute;
  font-size: 120px !important
  top: 28px;
  left: 311px;
  -webkit-text-stroke: 2px var(--white);
  opacity: 0.2;
  letter-spacing: 0;
  line-height: normal;
`;

const InTheMedia1 = styled.div`
  ${InterBoldWhite84px}
  positiion: absolute;
  font-size: 84px !important
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
  margin-left: 6%;
  margin-top: 3%;
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
  width: auto !important;
  height: auto !important;
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