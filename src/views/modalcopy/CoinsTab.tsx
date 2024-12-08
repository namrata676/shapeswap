import React from 'react'
import { Button, TuneIcon, NotificationDot, useModal } from 'toolkit/uikit'
import { useExpertModeManager } from 'state/user/hooks'
import CoinsModal from './CoinsModal'




export default function CoinsTab({setSlippage}) {
  const [expertMode] = useExpertModeManager()

  return (
    
      
        <TuneIcon color="text" width="24px" />
 

  )
}
