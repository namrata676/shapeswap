import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button, useModal, IconButton, AddIcon, MinusIcon, Skeleton, Text } from 'toolkit/uikit'
import { useLocation } from 'react-router-dom'
import { BigNumber } from 'bignumber.js'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Balance from 'components/Balance'
import { useWeb3React } from '@web3-react/core'
import { useFarmUser, useLpTokenPrice } from 'state/farms/hooks'
import { fetchFarmUserDataAsync } from 'state/farms'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { useAppDispatch } from 'state'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import useUnstakeFarms from '../../../hooks/useUnstakeFarms'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import useStakeFarms from '../../../hooks/useStakeFarms'
import useApproveFarm from '../../../hooks/useApproveFarm'
import { ActionContainer, ActionTitles, ActionContent, Earned } from './styles'

const IconButtonWrapper = styled.div`
  display: flex;
`

interface StackedActionProps extends FarmWithStakedValue {
  userDataReady: boolean
}

const Staked: React.FunctionComponent<StackedActionProps> = ({
  pid,
  lpSymbol,
  lpAddresses,
  quoteToken,
  token,
  userDataReady,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
  const { onStake } = useStakeFarms(pid)
  const { onUnstake } = useUnstakeFarms(pid)
  const location = useLocation()
  const lpPrice = useLpTokenPrice(lpSymbol)

  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpAddress = getAddress(lpAddresses)
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const handleStake = async (amount: string) => {
    await onStake(amount)
    // dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
    // dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
      return getFullDisplayBalance(stakedBalance).toLocaleString()
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={handleStake} tokenName={lpSymbol} addLiquidityUrl={addLiquidityUrl} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={handleUnstake} tokenName={lpSymbol} />,
  )
  const lpContract = useERC20(lpAddress)
  const dispatch = useAppDispatch()
  const { onApprove } = useApproveFarm(lpContract)
 

    return (
      <ActionContainer>
        <ActionTitles>
          <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px" pr="4px">
            {t('Stake').toUpperCase()}
          </Text>
          <Text bold textTransform="uppercase" color="secondary" fontSize="12px">
            {lpSymbol}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Button
            width="100%"
            onClick={onPresentDeposit}
            variant="secondary"
            disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
          >
            {t('Stake LP')}
          </Button>
        </ActionContent>
      </ActionContainer>
    )
  }

export default Staked
