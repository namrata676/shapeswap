
import React, { useState } from 'react'
import { Button, Text, Message } from 'toolkit/uikit'
import { useTranslation } from 'contexts/Localization'
import {
  useUserSlippageTolerance,
  // useUserSingleHopOnly,
} from 'state/user/hooks'
import {TokenModal, TokenModalBody, TokenInjectedModalProps } from '../../toolkit/uikit/widgets/TokenModal'


import { AutoColumn } from '../../components/Layout/Column'
import TransactionSettings from './TransactionSettings'
import "./settings.css"

interface simpleInt {
  id: number;
  text: string;
  icon: string;
  tokenAddress: string;
  name: string;
  photoUrl : string, 
  balance : string
}

type simpleType = simpleInt[];

interface simp {
  tokenAddress: string,
  balance : string
}

type simpType = simp[];


export interface TabsProps extends TokenInjectedModalProps {
  tokenFunc2?: CallableFunction;
  ListData?: simpleType;
  tokenName?: string;
  setChain?: string;
  account?: string;  
  balList?: simpType;
  setChain2?: string;
  order?: boolean;
  usdtToken?: simpleInt ;
  usdcToken?: simpleInt ;
 // setInitToken?: CallableFunction;
 // tokenRefresh?: (value: number | ((prevVar: number) => number)) => void;
  // initToken?: boolean
 // setChain?: string
}

const SettingsModal: React.FC<TabsProps> = ({ onDismiss, setSlippage, ListData, tokenName, tokenFunc2, setChain, account, balList, setChain2, order, usdcToken, usdtToken }) => {
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
      <TokenModal
        title={t('Are you sure?')}
        onBack={() => setShowConfirmExpertModal(false)}
        onDismiss={onDismiss}
        style={{ maxWidth: '420px' }}
      >
        <TokenModalBody>
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
        </TokenModalBody>
      </TokenModal>
    )
  }

  return (
    <TokenModal title="Select Token" headerBackground="headerBG" onDismiss={onDismiss} className="setModal" >
      <TokenModalBody>
        <AutoColumn gap="md" style={{ padding: '1rem' }}>
          <TransactionSettings
            rawSlippage={userSlippageTolerance}
            setRawSlippage={setUserslippageTolerance}
            setSlippage={setSlippage}
            onDismiss={onDismiss}
            tokenFunc2={tokenFunc2} ListData={ListData} tokenName={tokenName}
            setChain= {setChain}
            account={account}
            balList={balList}
            setChain2={setChain2}
            order={order}
            usdtToken={usdtToken}
            usdcToken={usdcToken}
            // deadline={ttl}
            // setDeadline={setTtl}
          />
         
        </AutoColumn>
      </TokenModalBody>
    </TokenModal>
  )
}

export default SettingsModal
