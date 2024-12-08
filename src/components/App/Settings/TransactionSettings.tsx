import React, { useState } from 'react'
import { Text, Button, Input, Flex, Grid } from 'toolkit/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import QuestionHelper from '../../QuestionHelper'
import { AutoColumn } from '../../Layout/Column'
import { RowBetween, RowFixed } from '../../Layout/Row'

enum SlippageError {
  InvalidInput = 'InvalidInput',
  RiskyLow = 'RiskyLow',
  RiskyHigh = 'RiskyHigh',
}

// enum DeadlineError {
//   InvalidInput = 'InvalidInput',
// }

const StyledButton = styled(Button)`
 
  background-color: black;   
`

export interface SlippageTabsProps {
  rawSlippage: number
  setRawSlippage: (rawSlippage: number) => void
  setSlippage?: (value: number | ((prevVar: number) => number)) => void;
}

export default function SlippageTabs({ rawSlippage, setRawSlippage, setSlippage}: SlippageTabsProps) {
  const [slippageInput, setSlippageInput] = useState('')
  // const [deadlineInput, setDeadlineInput] = useState('')

  const { t } = useTranslation()

  const slippageInputIsValid =
    slippageInput === '' || (rawSlippage / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2)
  // const deadlineInputIsValid = deadlineInput === '' || (deadline / 60).toString() === deadlineInput

  let slippageError: SlippageError | undefined
  if (slippageInput !== '' && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput
  } else if (slippageInputIsValid && rawSlippage < 50) {
    slippageError = SlippageError.RiskyLow
  } else if (slippageInputIsValid && rawSlippage > 500) {
    slippageError = SlippageError.RiskyHigh
  } else {
    slippageError = undefined
  }

  // let deadlineError: DeadlineError | undefined
  // if (deadlineInput !== '' && !deadlineInputIsValid) {
  //   deadlineError = DeadlineError.InvalidInput
  // } else {
  //   deadlineError = undefined
  // }

  function parseCustomSlippage(value: string) {
    setSlippageInput(value)

    try {
      const valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString())
      if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 10000) {
        setRawSlippage(valueAsIntFromRoundedFloat)
        setSlippage(valueAsIntFromRoundedFloat/100)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // function parseCustomDeadline(value: string) {
  //   setDeadlineInput(value)

  //   try {
  //     const valueAsInt: number = Number.parseInt(value) * 60
  //     if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
  //       setDeadline(valueAsInt)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <AutoColumn gap="md">
      <AutoColumn gap="sm">
        <RowFixed>
          <Text style={{color: "white !important"}} className="slippageTolerance">{t('Slippage Tolerance')}</Text>
          <QuestionHelper
            text={t('Your transaction will revert if the price changes unfavorably by more than this percentage.')}
            ml="4px"
          />
        </RowFixed>
        <Flex flexWrap={['wrap', 'wrap', 'nowrap']}>
          <Grid gridTemplateColumns="1fr 1fr 1fr" gridGap="8px" mb={['8px', '8px', 0]} mr={[0, 0, '8px']}>
            <Button
              onClick={() => {
                setSlippageInput('')
                setRawSlippage(10)
                setSlippage(0.1)
              }}
              style = {{backgroundImage: `${rawSlippage === 10 ? "linear-gradient(90deg, #0095EC 0%, #154DDD 100%)" : "linear-gradient(90deg, #272f37 0%, #1d1e1f 100%)"}`, color: "white"}}
              
            >
              0.1%
            </Button>
            <StyledButton
              onClick={() => {
                setSlippageInput('')
                setRawSlippage(50)
                setSlippage(0.5)
              }}
              
              style = {{backgroundImage: `${rawSlippage === 50 ? "linear-gradient(90deg, #0095EC 0%, #154DDD 100%)" : "linear-gradient(90deg, #272f37 0%, #1d1e1f 100%)"}`,color : "white"}}
              // variant={rawSlippage === 50 ? 'primary' : 'primary'}
            >
              0.5%
            </StyledButton>
            <Button
              onClick={() => {
                setSlippageInput('')
                setRawSlippage(100)
                setSlippage(1)
              }}
              style = {{backgroundImage: `${rawSlippage === 100 ? "linear-gradient(90deg, #0095EC 0%, #154DDD 100%)" : "linear-gradient(90deg, #272f37 0%, #1d1e1f 100%)"}`, color : "white" }}
            >
              1%
            </Button>
          </Grid>
        </Flex>
        <RowBetween>
            <Input
              style={{backgroundColor: "#272f37", color: "white !important", border: "1px solid rgba(29, 29, 29, 0.02)", borderRadius:"8px", boxShadow: "inset 2px 2px 8px rgba(0, 0, 0, 0.02), inset 2px 2px 10px rgba(0, 0, 0, 0.04)"}}
              scale="lg"
              placeholder={(rawSlippage / 100).toFixed(2)}
              value={slippageInput}
              onBlur={() => {
                parseCustomSlippage((rawSlippage / 100).toFixed(2))
              }}
              type="number"
              step="1" 
              pattern="^[0-9]"
              onChange={(e) => parseCustomSlippage(e.target.value)}
              isWarning={!slippageInputIsValid}
              isSuccess={![10, 50, 100].includes(rawSlippage)}
            />
            <Text color="rgba(29, 29, 29, 0.4)" bold ml="8px">
              %
            </Text>
          </RowBetween>
        {!!slippageError && (
          <RowBetween
            className="slippageText"
            style={{
              fontSize: '14px',
              paddingTop: '7px',
              color: slippageError === SlippageError.InvalidInput || SlippageError.RiskyLow ? 'red' : 'green',
            }}
          >
            {slippageError === SlippageError.InvalidInput
              ? t('Enter a valid slippage percentage')
              : slippageError === SlippageError.RiskyLow
              ? t('Your transaction may fail')
              : t('Your transaction may be frontrun')}
          </RowBetween>
        )}
      </AutoColumn>

  
    </AutoColumn>
  )
}
