import React, { useState } from 'react'
import { Button, Text, Message } from 'toolkit/uikit'
import {
  // useAudioModeManager,
  useExpertModeManager,
  useUserTransactionTTL,
  useUserSlippageTolerance,
  // useUserSingleHopOnly,
} from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import {SlippageModal, SlippageModalBody, SlippageInjectedModalProps } from '../../../toolkit/uikit/widgets/SlippageModal'

// import { useSwapActionHandlers } from 'state/swap/hooks'
import { AutoColumn } from '../../Layout/Column'
// import QuestionHelper from '../../QuestionHelper'
// import { RowBetween, RowFixed } from '../../Layout/Row'
import TransactionSettings from './TransactionSettings'
import "./settings.css"

const SettingsModal: React.FC<SlippageInjectedModalProps> = ({ onDismiss, setSlippage }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()
  // const [ttl, setTtl] = useUserTransactionTTL()
  // const [expertMode, toggleExpertMode] = useExpertModeManager()
  // const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  // const [audioPlay, toggleSetAudioMode] = useAudioModeManager()
  // const { onChangeRecipient } = useSwapActionHandlers()

  const { t } = useTranslation()

  if (showConfirmExpertModal) {
    return (
      <SlippageModal
        title={t('Are you sure?')}
        onBack={() => setShowConfirmExpertModal(false)}
        onDismiss={onDismiss}
        style={{ maxWidth: '420px' }}
      >
        <SlippageModalBody>
          <Message variant="warning" mb="24px">
            <Text>
              {t(
                "Expert mode turns off the 'Confirm' transaction prompt, and allows high slippage trades that often result in bad rates and lost funds.",
              )}
            </Text>
          </Message>
          <Text mb="24px">{t('Only use this mode if you know what you’re doing.')}</Text>
          <Button
            variant="danger"
            id="confirm-expert-mode"
            onClick={() => {
              // eslint-disable-next-line no-alert
              if (window.prompt(`Please type the word "confirm" to enable expert mode.`) === 'confirm') {
                // toggleExpertMode()
                setShowConfirmExpertModal(false)
              }
            }}
          >
            {t('Turn On Expert Mode')}
          </Button>
        </SlippageModalBody>
      </SlippageModal>
    )
  }

  return (
    <SlippageModal title="Transaction Settings" headerBackground="headerBG" onDismiss={onDismiss}>
      <SlippageModalBody>
        <AutoColumn gap="md" style={{ padding: '1rem' }}>
          <TransactionSettings
            rawSlippage={userSlippageTolerance}
            setRawSlippage={setUserslippageTolerance}
            setSlippage={setSlippage}
            // deadline={ttl}
            // setDeadline={setTtl}
          />
         
        </AutoColumn>
      </SlippageModalBody>
    </SlippageModal>
  )
}

export default SettingsModal
