import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import usePoll from 'react-use-poll';
import Web3 from "web3";
import axios from 'axios';
import { isEmpty } from 'lodash';
import { useTranslation } from 'contexts/Localization'
import { Text, Button, Input, Flex, Grid } from 'toolkit/uikit'
import styled from 'styled-components'
import {TokenInjectedModalProps } from '../../toolkit/uikit/widgets/TokenModal'

import QuestionHelper from '../../components/QuestionHelper'
import { AutoColumn } from '../../components/Layout/Column'
import { RowBetween, RowFixed } from '../../components/Layout/Row'
import { polarcontractAddress, polarABI, joePairPolar} from '../../Abi/avalancheSwap/polarConfig'

enum SlippageError {
  InvalidInput = 'InvalidInput',
  RiskyLow = 'RiskyLow',
  RiskyHigh = 'RiskyHigh',
}

// enum DeadlineError {
//   InvalidInput = 'InvalidInput',
// }

const StyledButton = styled(Button)`
 
  width: 85px !important;
  height: 32px !important;
  border-radius: 8px !important;
  margin-right: 10px !important;
`
interface simpleInt {
  id: number;
  text: string;
  icon: string;
  tokenAddress: string;
  name: string;
  balance: string;
  photoUrl: string;
}

interface simp {
  tokenAddress: string,
  balance : string
}



type simpleType = simpleInt[];
type simpType = simp[];
export interface SlippageTabsProps extends TokenInjectedModalProps {
  rawSlippage: number
  setRawSlippage: (rawSlippage: number) => void
  setSlippage?: (value: number | ((prevVar: number) => number)) => void;
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

}

export default function SlippageTabs({ rawSlippage, setRawSlippage, setSlippage, onDismiss, ListData, tokenFunc2, tokenName, setChain, account, balList, setChain2, order, usdcToken, usdtToken}: SlippageTabsProps) {
  const [slippageInput, setSlippageInput] = useState('')

  const [selectButton, setSelectButton] = useState('None')
  
  console.log("test length",setRawSlippage, setSlippage)

  // const [deadlineInput, setDeadlineInput] = useState('')

  const { t } = useTranslation()
 // const { account } = useWeb3React()
  const web3 = new Web3(window.ethereum as any)
  const [tokenList, setTokenList] = useState(ListData)
  const [showBalance, setShowBalance] = useState(false)

  const searchToken = async (input1) => {
   
    console.log("entersearch",input1)
    const inputLc = input1.toLowerCase();
    console.log("inputLC", inputLc)
    
   
      axios.get('https://1f8vxhjggh.execute-api.us-east-1.amazonaws.com/tokenList',{
        params: {
          chain_name: setChain,
          token_name: slippageInput
        }
      })
      .then(function (response) {
        // handle success
        console.log("Responsetokensearch",response);
       
        if(response?.data?.token_list_data){
        setTokenList(response?.data?.token_list_data)
        } else {
          setTokenList([])
        }
  
      
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      return []
      
    } 

   

  function parseCustomSlippage(value: string) {
    setSlippageInput(value)
  }

 

  useEffect(() =>{
   
    
   
    const filteredList = ListData.filter((el) => {
      console.log("enterfiltereddata")
      // if no input the return the original
      if (slippageInput === '') {
          return el;
      }
      
      // return the item which contains the user input
     const { name, tokenAddress} = el
     console.log("addresstest", name?.toLowerCase().includes(slippageInput))

     return (name?.toLowerCase().includes(slippageInput) || tokenAddress?.toLowerCase().includes(slippageInput))
  
  })
  if(filteredList.length !== 0){
    searchToken(slippageInput)
  }
  else  {
    searchToken(slippageInput)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
     },[slippageInput,ListData])


  console.log("tokenListoutside",tokenList)

  const onSelect = (token2) => {
       tokenFunc2(tokenName, token2) 
       onDismiss()
 }

 useEffect(()=>{
  if(setChain !== setChain2){
   if(order && tokenName === "token1"){
    setShowBalance(false)
   } else if (!order && tokenName === "token2"){
    setShowBalance(false)
   } else {
    setShowBalance(true)
   }
  } else {
    setShowBalance(true)
  }

// eslint-disable-next-line react-hooks/exhaustive-deps
 },[setChain, setChain2, order])



const findBal = (item) => {

  const bal = balList.find((token) =>  token?.tokenAddress === item?.tokenAddress)

  return bal?.balance

}



 
  return (
    <AutoColumn gap="md">
      <AutoColumn gap="sm">
        <RowBetween style={{marginBottom : "10px"}}>
            <Input
              className = "inputStyle"
              style={{backgroundColor: "#303337", color: "white", border: "1px solid rgba(29, 29, 29, 0.02)", borderRadius:"8px", boxShadow: "inset 2px 2px 8px rgba(0, 0, 0, 0.02), inset 2px 2px 10px rgba(0, 0, 0, 0.04)"}}
              scale="lg"
              placeholder="Search Name or Paste Address"
              autoFocus
              value={slippageInput}
              onBlur={(e) => {
                parseCustomSlippage(e.target.value)
              }}
              onChange={(e) => parseCustomSlippage(e.target.value)}
            />
          </RowBetween>

        <Flex flexWrap={['wrap', 'wrap', 'nowrap']} style={{borderBottom: "1px solid rgba(29, 29, 29, 0.1)" }}>
          {ListData.length > 0 && (
          <Grid gridTemplateColumns="1fr 1fr 1fr" gridGap="8px" mb={['8px', '8px', 0]} mr={[0, 0, '8px']} style={{marginBottom: "12px"}}>
            <div className="d-flex flex-row justify-content-between" >
              
            <StyledButton
              onClick={() => {
                tokenFunc2(tokenName, ListData[0])
                onDismiss()
                setSelectButton((ListData[0]?.name)?.toUpperCase())
              }}
              style = {{backgroundImage: `${selectButton === `${(ListData[0]?.name)?.toUpperCase()}` ? "linear-gradient(90deg, #0095EC 0%, #154DDD 100%)" : "linear-gradient(90deg, #272f37 0%, #1b2028 100%)"}`, border: "1px solid #94BFFF"}}
              
            >
               <img style={{marginRight : "4px"}}
                   src={ListData[0]?.photoUrl !== null ? ListData[0]?.photoUrl : "/images/coins/generic.png"}
                   className="cirefresh"
                   alt="cirefresh"
                   width= "18.05px"
                   height= "17.3px"
                 />
             <Text className="textStyle" style={{color: `${rawSlippage === 10 ? "white" : "black"}`}}>{(ListData[0]?.name)?.toUpperCase()}</Text> 
            </StyledButton>
            </div>
            <StyledButton
              onClick={() => {
                if(isEmpty(usdcToken)){
                tokenFunc2(tokenName, ListData[1])
                } else {
                  tokenFunc2(tokenName, usdcToken)
                }
                onDismiss()
              }}
              
              style = {{backgroundImage: `${rawSlippage === 20 ? "linear-gradient(90deg, #0095EC 0%, #154DDD 100%)" : "linear-gradient(90deg, #272f37 0%, #1b2028 100%)"}`, border: "1px solid #94BFFF"}}
              // variant={rawSlippage === 50 ? 'primary' : 'primary'}
            >
              <img style={{marginRight : "4px"}}
                   src={isEmpty(usdcToken) ? (ListData[1]?.photoUrl !== null ? ListData[1]?.photoUrl : "/images/coins/generic.png") : usdcToken?.photoUrl}
                   className="cirefresh"
                   alt="cirefresh"
                   width= "18.05px"
                   height= "17.3px"
                 />
             <Text className="textStyle" style={{color: `${rawSlippage === 20 ? "white" : "black"}`}}>{isEmpty(usdcToken) ? (ListData[1]?.name)?.toUpperCase() : (usdcToken?.name)?.toUpperCase()}</Text> 
            </StyledButton>
            <StyledButton
              onClick={() => {
                if(isEmpty(usdtToken)){
                  tokenFunc2(tokenName, ListData[2])
                }
                else{
                  tokenFunc2(tokenName, usdtToken)
                }
               
                onDismiss()
              }}
              style = {{backgroundImage: `${rawSlippage === 30 ? "linear-gradient(90deg, #0095EC 0%, #154DDD 100%)" : "linear-gradient(90deg, #272f37 0%, #1b2028 100%)"}`, border: "1px solid #94BFFF" }}
            >
              <img style={{marginRight : "4px"}}
                   src={isEmpty(usdtToken) ? (ListData[2]?.photoUrl !== null ? ListData[2]?.photoUrl : "/images/coins/generic.png") : usdtToken?.photoUrl}
                   className="cirefresh"
                   alt="cirefresh"
                   width= "18.05px"
                   height= "17.3px"
                 />
             <Text className="textStyle" style={{color: `${rawSlippage === 30 ? "white" : "black"}`}}>{isEmpty(usdtToken) ? (ListData[2]?.name)?.toUpperCase() : (usdtToken?.name)?.toUpperCase()}</Text> 
              
            </StyledButton>
            <StyledButton
              onClick={() => {
                tokenFunc2(tokenName, ListData[3])
                onDismiss()
              }}
              style = {{backgroundImage: `${rawSlippage === 40 ? "linear-gradient(90deg, #0095EC 0%, #154DDD 100%)" : "linear-gradient(90deg, #272f37 0%, #1b2028 100%)"}`, border: "1px solid #94BFFF" }}
            >
              <img style={{marginRight : "4px"}}
                   src={ListData[3]?.photoUrl !== null ? ListData[3]?.photoUrl : "/images/coins/generic.png"}
                   className="cirefresh"
                   alt="cirefresh"
                   width= "18.05px"
                   height= "17.3px"
                 />
             <Text className="textStyle" style={{color: `${rawSlippage === 40 ? "white" : "black"}`}}>{(ListData[3]?.name)?.toUpperCase()}</Text> 
              
            </StyledButton>
            <StyledButton
              onClick={() => {
                tokenFunc2(tokenName, ListData[4])
                onDismiss()
              }}
              style = {{backgroundImage: `${rawSlippage === 75 ? "linear-gradient(90deg, #0095EC 0%, #154DDD 100%)" : "linear-gradient(90deg, #272f37 0%, #1b2028 100%)"}`, border: "1px solid #94BFFF" }}
            >
              <img style={{marginRight : "4px"}}
                   src={ListData[4]?.photoUrl !== null ? ListData[4]?.photoUrl : "/images/coins/generic.png"}
                   className="cirefresh"
                   alt="cirefresh"
                   width= "18.05px"
                   height= "17.3px"
                 />
             <Text className="textStyle" style={{color: `${rawSlippage === 50 ? "white" : "black"}`}}>{(ListData[4]?.name)?.toUpperCase()}</Text> 
              
            </StyledButton>
          </Grid>)}
        </Flex>
        <div >
        <ul className="listCoin">
        <li key="label">
                  <div className='d-flex flex-row justify-content-between'>
                  <Text className="textStyle2">Token Name</Text>
                  {showBalance && (
              <Text className="textStyle2">Balance</Text>)}
              </div>
              </li>
            {tokenList.map((item, i) => (
                <li key={item?.id}>
                  <div className='d-flex flex-row justify-content-between'>
                  <div className='d-flex flex-row align-items-start justify-content-start' style={{ gap: '6px', marginTop: '5%', color: 'black'  }} >
                  <img src={item?.photoUrl !== null ? item?.photoUrl : "/images/coins/generic.png"} width='21.06px'height="20.18px" alt='coin' />
                <button className="networkButton" type="button" onClick={()=> { onSelect(item) }} style={{   border: 'none', color: 'black', backgroundColor: 'white'}}>{item?.name}</button>
              </div>
              {showBalance && (
              <Text className="textStyle1">{findBal(item)}</Text>)}
              </div>
              </li>
            ))}
        </ul>
        </div>
      </AutoColumn>

  
    </AutoColumn>
  )
}
