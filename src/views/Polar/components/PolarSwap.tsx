import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import Web3 from "web3";
import styled from 'styled-components'
import { CardBody } from 'uikit'
import { AppHeader, AppBody } from '../../../components/App'
import Page from '../../Page'
import { polarcontractAddress, polarABI, joePairPolar} from '../../../Abi/avalancheSwap/polarConfig'


const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  padding: 8px;
  flex: 1;
  border-radius: 10px 0 0 10px;
  background: #3a3a3c;
  width: 94%;
  border: 0px;
  :focus{
    border: 0px;
    outline: 0;
  }
`
const StyledInput1 = styled.input`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  padding: 8px;
  flex: 1;
  border-radius: 10px 0 0 10px;
  background: #3a3a3c;
  width: 94%;
  border: 0px;
  :focus{
    border: 0px;
    outline: 0;
  }
`





const StyledInput2 = styled(StyledInput)`
  border-radius: 10px;
`

const SelectStyle = styled.select`
  color: #f9a11a;
  background: #3a3a3c;
  border-radius: 0 10px 10px 0;
  border: 0;
  outline: 0;
  height: 33px;
  width: 100px;
`

const SelectStyle1 = styled.select`
  color: #f9a11a;
  background: #3a3a3c;
  border-radius: 0 10px 10px 0;
  border: 0;
  outline: 0;
  height: 33px;
  width: 100px;
`

const StyledCardBody = styled(CardBody)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid;
  border-color: #7c7c7c;
`

const StyledButton = styled.button`
  order: 4;
  align-items: center;
  border: 0;
  border-radius: 12px;
  padding: 12px;
  margin-top: 20px;
  cursor: pointer;
  display: inline-flex;
  width: 94%;
  font-family: inherit;
  font-size: 16px;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-color: #3a3a3c;
  color: #faa21a;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`;

const StyledButton3 = styled.button`
  order: 4;
  align-items: center;
  border: 0;
  border-radius: 5px;
  padding: 4px;
  margin-top: 5px;
  cursor: pointer;
  display: inline-flex;
  width: 14%;
  font-family: inherit;
  font-size: 13px;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-color: #3a3a3c;
  color: #faa21a;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`;


const StyledButton2 = styled.button`
  order:2;
  align-items: center;
  border: 0;
  border-radius: 15px;
  padding: 12px;
  margin-top: 10px;
  display: inline-flex;
  width: 30px;
  height: 30px;
  background: #2b2b2b;
  font-family: inherit;
  font-size: 16px;
  justify-content: center;
  letter-spacing: 0.03em;
  color: #faa21a;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
`;

const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 94%;
  border: 1px solid;
  border-radius: 10px;
  border-color: #5c5959;
  padding: 10px;
  margin-top: 10px;
`


const PolarSwap = () => {
  const [token1, setToekn1] = useState('avax');
  const [token2, setToekn2] = useState('polar');
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [balance1, setBalance1] = useState('0')
  const [balance2, setBalance2] = useState('0')
  const [order, setOrder] = useState(false);
  const { account } = useWeb3React()
  const [reserveValue, setReserveValue] = useState(0)
  const [reserveValue2, setReserveValue2] = useState(0)
  const [slippage, setSlippage] = useState(1)

  

  const contractAbi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WAVAX","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WAVAX","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAX","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityAVAXSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountAVAXMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountAVAX","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapAVAXForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactAVAXForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForAVAXSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactAVAX","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
  

    const contractAddress = "0x60aE616a2155Ee3d9A68541Ba4544862310933d4"
  
    const web3 = new Web3(window.ethereum as any)
  

    const swapContract = new web3.eth.Contract(contractAbi as any, contractAddress);

    const polarContract = new web3.eth.Contract(polarABI as any, polarcontractAddress);

    
   const [stateCheck, setStateCheck] = useState(false)
   const [reservevaluepolar, setReserveValuePolar] = useState(0)
   const [reservevaluepolar2, setReserveValuePolar2] = useState(0)


  const tokenFunc1 = async(e) => {
    setToekn1(e.target.value);
  
    setAmount1(0)
    setAmount2(0)
      if(e.target.value === 'avax'){
      if(account!== undefined){
    const avaxBalance = await web3.eth.getBalance(account);
     setBalance1((parseInt(avaxBalance)/(10**18)).toFixed(2));}
    
   } 
  
  }

  const tokenFunc2 = async (e) => {
     setAmount1(0)
     setAmount2(0)
    setToekn2(e.target.value);
    
      if(e.target.value === 'avax'){
      if(account !== undefined){
    const avaxBalance = await web3.eth.getBalance(account);
     setBalance2((parseInt(avaxBalance)/(10**18)).toFixed(2));
      }
      
     if(e.target.value === 'avax'){
       setAmount2(0)
     }
   
   
  }else if (e.target.value === 'polar'){
    if(account !== undefined){
     polarContract.methods.decimals().call().then( function( info1 ) {
  
      polarContract.methods.balanceOf((account)).call().then( function( info ) {
        setBalance2(((info/(10**info1)).toFixed(1)));
        });
     
       }); }
       if(e.target.value === 'polar'){
        setAmount2(0)
      
   
   
  }
  }
}

  useEffect(()=>{
 if(account !== undefined){
   initialBalance()
   initialBalance2()
 }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account])


  useEffect(()=>{
    setAmount1(0)
    setAmount2(0)
      // eslint-disable-next-line react-hooks/exhaustive-deps
     },[slippage])


  useEffect(()=>{


 polarContract.methods.uniswapV2Pair().call().then( function( info ) {
            
  const polarjoeContract = new web3.eth.Contract(joePairPolar as any, info)

  polarjoeContract.methods.getReserves().call().then( function( info1 ) {
    setReserveValuePolar(parseInt(info1[0])/parseInt(info1[1])) 
    setReserveValuePolar2(parseInt(info1[1])/parseInt(info1[0])) 
 
 
 })
})




    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const initialBalance = async () => {
    if(token1 === "avax"){
    const avaxBalanceInitial =  await web3.eth.getBalance(account);
           setBalance1((parseInt(avaxBalanceInitial)/(10**18)).toFixed(2));
    } 
  }

  const swapToken = async () => {

    if(account === undefined){
      alert("Please Connect Wallet!!")
      return
    }

      
      if(order && token2 === "polar"){
      const date = Date.now() + 100
  
      const amountFinal = (Math.trunc(amount1*(10**18))).toLocaleString('fullwide', { useGrouping: false });
      const amountOut = (Math.trunc(amount2*(10**18))).toLocaleString('fullwide', { useGrouping: false });
      console.log("amountswap",amountFinal, amountOut)
      const nftTxn = await swapContract.methods.swapExactTokensForAVAXSupportingFeeOnTransferTokens(amountOut, amountFinal,['0x6C1c0319d8dDcb0ffE1a68C5b3829Fd361587DB4','0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'],account,date).send({from: account});
      if(nftTxn){
        alert("Token Swapped Successfully !")
         initialBalance2()
         initialBalance()
      }else{
        alert("Error in swapping tokens !")
      }
    }
      
     else if(!order && token2 === "polar"){
        console.log("enterorderfalsetoken1avaxtoken2polar")
        const date = Date.now() + 100
        console.log('date',date)
      
        const amountFinal = (Math.trunc(amount1*(10**18)).toLocaleString('fullwide', { useGrouping: false }));
        const amountOut = (Math.trunc(amount2*(10**18)).toLocaleString('fullwide', { useGrouping: false }));
        console.log("amountswap",amountFinal, amountOut)
        const nftTxn = await swapContract.methods.swapExactAVAXForTokens(amountOut,['0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7','0x6C1c0319d8dDcb0ffE1a68C5b3829Fd361587DB4'],account,date).send({from: account, value: amountFinal});
        if(nftTxn){
         initialBalance()
         initialBalance2()
          alert("Token Swapped Successfully !")
        }else{
          alert("Error in swapping tokens !")
        }

          
      }
        
          }
          
  



  const initialBalance2 = async () => {
    if(token2 === "avax"){
    const avaxBalanceInitial =  await web3.eth.getBalance(account);
           setBalance1((parseInt(avaxBalanceInitial)/(10**18)).toFixed(2));
    }
     else if(token2 === "polar"){
      polarContract.methods.decimals().call().then( function( info1 ) {
  
        polarContract.methods.balanceOf((account)).call().then( function( info ) {
          setBalance2(((info/(10**info1)).toFixed(1)));
          });
       
         }); 
        }
  }

  
  const maxBalance2 = async () => {
    
        
     if(token2 === "polar"){
      polarContract.methods.decimals().call().then( function( info1 ) {
  
        polarContract.methods.balanceOf((account)).call().then( function( info ) {
         setAmount2((info/(10**info1)-((0.00001*(info/(10**info1)))/100)));
         maxBalanceSwap2((info/(10**info1)-((0.00001*(info/(10**info1)))/100)))
          });
       
         }); 
    }
  }


  const maxBalanceSwap1 = async (amountMax) => {
    
   if(!order && token2=== 'polar'){
      setAmount2(((amountMax-((slippage/100)*amountMax))*reservevaluepolar))
    }
    else if(order && token2=== 'polar'){
      setAmount2((parseFloat(amountMax) + ((slippage/100)*amountMax))*reservevaluepolar)
    }

  }

  const maxBalanceSwap2 = (amountMax2) => {

    
    if (!order && token2 === 'polar'){
      setAmount1((parseFloat(amountMax2)+((slippage/100)*amountMax2))*reservevaluepolar2)
    }else if (order && token2 === 'polar'){
      setAmount1((parseFloat(amountMax2)-((slippage/100)*amountMax2))*reservevaluepolar2)
    }
  }

  
  const amountChange2 = (e) => {
    setAmount2(e.target.value);
    
    maxBalanceSwap2(e.target.value)

    
   
  }

  const amountChange1 = async (e) => {
 
    setAmount1(e.target.value);
    maxBalanceSwap1(e.target.value)

   }

    const approveToken = (e) => {
        console.log("approve")
        setStateCheck(true)
      }

  const getTokenImage = (token) => {
    let element
    switch(token) {
      case "polar":
        element = (<div className='d-flex flex-row align-items-center' style={{ gap: '4px' }}>
                  <img src='images/polarupdate.png' width='25px' alt='polar' />
                  <div style={{ color: 'white' }}>polar</div>
                </div>)
        break;
      default:
        <></>
        // code block
    }
    return element

  }

  const getMaxBalance = async (token) => {

    if(token==='avax'){
      if(account!== undefined){
        const avaxBalance = await web3.eth.getBalance(account);
        const intBalance = (parseInt(avaxBalance)/(10**18))
         setAmount1(intBalance-((0.00001*(intBalance))/100)) 
         maxBalanceSwap1(intBalance-((0.00001*(intBalance))/100))
       
        }
    } else {

        maxBalance2()
      
      
    }
        
  }
  
  return (

      <AppBody>
        <AppHeader title='Swap' subtitle='Smart Finance Smart Swap' setSlippage={setSlippage} />

        <StyledCardBody>
          {/* -----------------  Input Token Amount & Select Token Type _ Tag1 ---------------------- */}
          <InputStyle style={{ order: `${order ? 3 : 1}` }}>
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex flex-row align-items-center' style={{ gap: '4px' }}>
                  <img src='images/home/avax.png' width='25px' alt='avax' />
                  <div style={{ color: 'white' }}>AVAX</div>
                </div> 
               {!order && (
             <StyledButton3 onClick={() => {getMaxBalance(token1)}}>max</StyledButton3>)}
              <div style={{ color: 'white' }}>balance: {balance1}</div>
            </div>

            <div className='d-flex flex-row align-items-center' style={{ gap: '4px', marginTop: '8px' }}>
              <StyledInput placeholder='amount' id='nameToBuyNode' onChange={amountChange1} value={amount1}/>
              <SelectStyle onChange={tokenFunc1} id='select1'>
             
                <option value="avax">AVAX </option>
              
               
              </SelectStyle>
            </div>
          </InputStyle>

          {/* -----------------  Exchange Token1 and Token2 _ Button ---------------------- */}
          <StyledButton2 onClick={() => {
             setOrder(!order)
             setAmount1(0)
             setAmount2(0)
            }  }>
            <img src='images/switch.png' width='18px' alt='tokenSwitch' />
          </StyledButton2>

          {/* -----------------  Input Token Amount & Select Token Type _ Tag2 ---------------------- */}
          <InputStyle style={{ order: `${order ? 1 : 3}` }}>
          <div className='d-flex flex-row justify-content-between align-items-center'>
             {getTokenImage(token2)}
            {order && (
             <StyledButton3 onClick={() => {getMaxBalance(token2)}}>max</StyledButton3>)}
              <div style={{ color: 'white' }}>balance: {balance2}</div>
            
            </div>

            <div className='d-flex flex-row align-items-center' style={{ gap: '4px', marginTop: '8px' }}>
              <StyledInput1 placeholder='amount' id='nameToBuyNode1' value={amount2} onChange={amountChange2}/>
              <SelectStyle1 onChange={tokenFunc2} id='select2'>
             
              <option value="polar">POLAR</option>
             
              </SelectStyle1>
            </div>
          </InputStyle>
          {/* <div style={{ color: 'white', fontSize: '18px', marginTop: '20px', order: 4 }}>.005 AVAX Per TX + Gas</div> */}
          <StyledButton onClick={swapToken}>SWAP</StyledButton>
          {((token2 !== 'smrt' && token1 === 'avax') && (<div style={{ color: 'white' }}>Slippage Percentage - {slippage}%</div>))}
        </StyledCardBody>

      </AppBody>
     

  )
}

export default PolarSwap