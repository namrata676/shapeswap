import React, { useState } from 'react'
import { Button, Text, Message, Modal, ModalBody, InjectedModalProps } from 'toolkit/uikit'
import {
  // useAudioModeManager,
  useExpertModeManager,
  useUserTransactionTTL,
  useUserSlippageTolerance,
  // useUserSingleHopOnly,
} from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import {BrowserRouter as Router, Link} from 'react-router-dom';
import styled from 'styled-components'
import { AutoColumn } from '../../components/Layout/Column'
import SearchBar from './SearchBar/SearchBar'

const Label = styled.div<{ labelSize: string }>`
font-size: 16px;
color: #eee;
margin:0px 20px;
padding-top:10px;
`

const StyledButton = styled(Button)`
 
  width: 85px !important;
  height: 32px !important;
  border-radius: 8px !important;
  margin-right: 10px !important;
`

interface simpleInt {
  id: number;
  name: string;
  stargatechainid: number;
  isCrossSwapEnabled: boolean;
  isChainActive: boolean
}

type simpleType = simpleInt[];

export interface TabsProps extends InjectedModalProps {
  tokenFunc2?: CallableFunction;
  ListData?: simpleType;
  tokenName?: string;
  setInitToken?: CallableFunction;
  tokenRefresh?: (value: number | ((prevVar: number) => number)) => void;
  initToken?: boolean
  setChain?: string
}

const CoinsModal: React.FC<TabsProps> = ({ onDismiss, tokenFunc2, ListData, tokenName, setInitToken, initToken, tokenRefresh, setChain }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()

  const { t } = useTranslation()

  if (showConfirmExpertModal) {
    return (
      <Modal
        title={t('Are you sure?')}
        onBack={() => setShowConfirmExpertModal(false)}
        onDismiss={onDismiss}
        style={{ maxWidth: '420px' }}
      >
        <ModalBody>
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
        </ModalBody>
      </Modal>
    )
  }

  return (
    <Modal title="Select Network" headerBackground="headerBG" onDismiss={onDismiss} style={{ width: "30%", height: "75%" }}>
      <ModalBody>
        <AutoColumn gap="md" style={{ padding: '1rem' }}>
          <SearchBar onDismiss={onDismiss} tokenFunc2={tokenFunc2} ListData={ListData} tokenName={tokenName} initToken={initToken} setInitToken={setInitToken}  tokenRefresh={tokenRefresh} setChain={setChain}/>
          
        </AutoColumn>
      </ModalBody>
    </Modal>
  )
}

export default CoinsModal
