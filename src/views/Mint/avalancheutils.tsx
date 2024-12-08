import React, { useState, useEffect } from 'react'
import { Heading, Text, BaseLayout, useModal, tokenPairImageVariant } from 'toolkit/uikit'
import styled from 'styled-components'

const Label = styled.div`
font-size: 17px !important;
color: #fff !important;
`

export const getTokenImage = (token) => {

   const  element = (<div className='d-flex flex-row align-items-center' style={{ gap: '5px' }}>
        {(token?.name !== "Token") && (
        <img src={token?.photoUrl !== null ? token?.photoUrl : "/images/coins/generic.png"} width='20.06px' height="24.18" alt='avax' style={{marginRight: "2px"}} /> ) }
        {(token?.name === "Token") && (
        <div style={{marginRight: "2px", backgroundColor: "#DFDFDF", width: "24.06px", height: "24.18px", borderRadius: "10px"}} /> ) }
       <Label className="displayIcon" style={{ color: 'red', marginRight:"2px", marginBottom: "3px" }}>{(token?.symbol)?.toLowerCase() !== ("Token")?.toLowerCase() ? (token?.name)?.toUpperCase() : token?.name}</Label>
        <img src="/images/swap/downarrow2.png" width="10.33px" height="5.67px" alt='avax' style={{marginBottom:"4px", color: "white"}}/>
      </div>)
        return element
    }


    export const getNetwork = (network) => {

      const  element = (<div className='d-flex flex-row align-items-center' style={{ gap: '5px' }}>
         {(network !== "Network") && (
           <img src={`/images/swap/${network}.png`} width='22.91px' height="22.91" alt='btc' style={{marginRight: "2px"}} />)}
            {(network === "Network") && (
        <div style={{marginRight: "2px", backgroundColor: "#DFDFDF", width: "22.91px", height: "22.91px", borderRadius: "10px"}} /> ) }
           <div className="displayNetwork" style={{  marginRight:"3px", marginBottom: "1px", color: `${(network)?.toLowerCase() !== ("Network")?.toLowerCase() ? "rgba(255, 255, 255, 1)": "#F5F5F5"}` }}>{(network[0]?.toUpperCase() + network?.substring(1))}</div>
           <img src="/images/swap/downarrow2.png" width="10.33px" height="5.67px" alt='avax' style={{marginBottom:"1px", color:"white"}}/>
         </div>)
           return element
       }
   
