import React, { useState, useEffect } from 'react'

export const getTokenImage = (token) => {

   const  element = (<div className='d-flex flex-row align-items-center' style={{ gap: '5px' }}>
        {(token?.name !== "Token") && (
        <img src={token?.photoUrl !== null ? token?.photoUrl : "/images/coins/generic.png"} width='21.06px' height="20.18" alt='avax' style={{marginRight: "2px"}} /> ) }
        {(token?.name === "Token") && (
        <div style={{marginRight: "2px", backgroundColor: "#DFDFDF", width: "21.06px", height: "20.18px", borderRadius: "10px"}} /> ) }

        <div className="displayIcon" style={{ color: 'black', marginRight:"2px", marginBottom: "3px" }}>{(token?.symbol)?.toLowerCase() !== ("Token")?.toLowerCase() ? (token?.name)?.toUpperCase() : token?.name}</div>
        <img src="/images/swap/downarrow2.png" width="10.33px" height="5.67px" alt='avax' style={{marginBottom:"4px", color: "white"}}/>
      </div>)
        return element
    }


    export const getNetwork = (network) => {

      const  element = (<div className='d-flex flex-row align-items-center' style={{ gap: '5px', marginTop: "19px" }}>
         {(network !== "None") && (
           <img src={`/images/swap/${network}.png`} width='22.91px' height="22.91" alt='btc' style={{marginRight: "2px"}} />)}
            {(network === "None") && (
        <div style={{marginRight: "2px", backgroundColor: "#DFDFDF", width: "22.91px", height: "22.91px", borderRadius: "10px"}} /> ) }
           <div className="displayNetwork" style={{  marginRight:"3px", marginBottom: "1px", color: `${(network)?.toLowerCase() !== ("None")?.toLowerCase() ? "rgba(255, 255, 255, 1)": "#F5F5F5"}` }}>{(network[0]?.toUpperCase() + network?.substring(1))}</div>
           <img src="/images/swap/downarrow2.png" width="10.33px" height="5.67px" alt='avax' style={{marginBottom:"1px", color:"white"}}/>
         </div>)
           return element
       }
   

