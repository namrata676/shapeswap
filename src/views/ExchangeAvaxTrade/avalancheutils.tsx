import React, { useState, useEffect } from 'react'
import { Heading, Text, BaseLayout, useModal, tokenPairImageVariant } from 'toolkit/uikit'
import styled from 'styled-components'

const Label = styled.div`
font-size: 17px !important;
color: black !important;
font-weight: 100px !important;
`

export const getTokenImage = (token) => {

   const  element = (<div style={{ backgroundColor: '#E6E9EE', borderRadius: '10px', padding: '14px', display: 'inline-flex', marginTop: '3px' }}>
   <div className='d-flex flex-row align-items-center' style={{ gap: '5px' }}>
     {(token?.name !== "Token") && (
       <img 
         src={token?.photoUrl !== null ? token?.photoUrl : "/images/coins/generic.png"} 
         width='19.06px' 
         height="23.18" 
         alt='avax' 
         style={{ marginRight: "2px" }} 
       />
     )}
     {(token?.name === "Token") && (
       <div 
         style={{ 
           marginRight: "2px", 
           backgroundColor: "#DFDFDF", 
           width: "24.06px", 
           height: "24.18px", 
           borderRadius: "10px" 
         }} 
       /> 
     )}
     <Label 
       className="displayIcon" 
       style={{ 
         color: 'black !important', 
         marginRight: "2px"
       }}
     >
       {(token?.symbol)?.toLowerCase() !== ("Token")?.toLowerCase() ? (token?.name)?.toUpperCase() : token?.name}
     </Label>
     <img 
       src="/images/swap/downarrowblack.png" 
       width="10.33px" 
       height="5.67px" 
       alt='avax' 
       style={{ marginBottom: "2px", color: "black" }} 
     />
   </div>
 </div>
 )
        return element
    }


    export const getNetwork = (network) => {

      const  element = (<div className='d-flex flex-row align-items-start' style={{ gap: '5px', marginTop: "19px" }}>
         {(network !== "None") && (
           <img src={`/images/swap/${network}.png`} width='22.91px' height="22.91" alt='btc' style={{marginRight: "2px"}} />)}
            {(network === "None") && (
        <div style={{marginRight: "2px", backgroundColor: "#DFDFDF", width: "22.91px", height: "22.91px", borderRadius: "10px"}} /> ) }
           <div className="displayNetwork" style={{  marginRight:"3px", marginBottom: "1px", color: `${(network)?.toLowerCase() !== ("None")?.toLowerCase() ? "rgba(255, 255, 255, 1)": "#F5F5F5"}` }}>{(network[0]?.toUpperCase() + network?.substring(1))}</div>
           <img src="/images/swap/downarrowblack.png" width="10.33px" height="5.67px" alt='avax' style={{marginBottom:"1px", color:"black"}}/>
         </div>)
           return element
       }
   

