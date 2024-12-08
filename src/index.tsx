import React, { useMemo, ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import useActiveWeb3React from './hooks/useActiveWeb3React'
import { BLOCKED_ADDRESSES } from './config/constants'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import App from './App'
import Providers from './Providers'
import './HomePageFinal/assets/scss/style.scss'

function Updaters() {
  return (
    <>
      <ListsUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

function Blocklist({ children }: { children: ReactNode }) {
  const { account } = useActiveWeb3React()
 // const [account, setAccount] = useState("")

  console.log("blocklist@@@",account)


//   useEffect(() => {
//  console.log("blocklistenter")
//   const account1 = localStorage.getItem("account")
//   console.log("blocklist1",account1)
//   if(account1 !== undefined){
//    setAccount(account1)
//    console.log("blocklist2",account1)
//   } else {
//     localStorage.setItem("account",accountFinal)
//     setAccount(accountFinal)
//     console.log("blocklist3",accountFinal)
//   }
  

//   },[accountFinal])

  

  const blocked: boolean = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
  if (blocked) {
    return <div>Blocked address</div>
  }
  return <>{children}</>
}

ReactDOM.render(
  <React.StrictMode>
    <Blocklist>
      <Providers>
        <Updaters />
        <App />
      </Providers>
    </Blocklist>
  </React.StrictMode>,
  document.getElementById('root'),
)
