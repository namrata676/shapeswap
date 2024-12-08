import React, { useState, useEffect } from 'react'

export const getTokenImage = (token) => {

   const  element = (<div className='d-flex flex-row align-items-center' style={{ gap: '4px' }}>
        <img src={token?.icon} width='25px' alt='avax' />
        <div style={{ color: 'white' }}>{token?.symbol}</div>
      </div>)
        return element
    }
