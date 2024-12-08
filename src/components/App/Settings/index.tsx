import React from 'react'
import { Button, TuneIcon, NotificationDot, useModal } from 'toolkit/uikit'
import { useExpertModeManager } from 'state/user/hooks'
import SettingsModal from './SettingsModal'




export default function SettingsTab({setSlippage}) {
  const [onPresentSettingsModal] = useModal(<SettingsModal setSlippage={setSlippage}/>)
  const [expertMode] = useExpertModeManager()

  return (
    <NotificationDot show={expertMode}>
      <Button variant="text" p={0}  onClick={onPresentSettingsModal} id="open-settings-dialog-button" >
      <img
              src="images/home/icons8-settings-50.png"
              className="common-pointer settings"
              alt="settings"
              width = "23.33px"
              height = "21.2px"
              color = "blue"
              // style={{marginBottom: "8px"}}
            />
      </Button>
    </NotificationDot>
  )
}
