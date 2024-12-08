import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Card, CardBody, Heading } from 'uikit'
import { ethers } from 'ethers';
import Web3 from "web3";
import useInterval from 'react-useinterval';
import usePoll from 'react-use-poll';

// import Web3 from 'web3';


import tempABI from '../../../contracts/smartnodes.json';

const contractABI = tempABI.abi;
const contractAddress = '0xa5CD786fDA5802BeD0138E3e591eEB52712DD9Ee';

const StyledCard = styled(Card)`
  // min-height: 200px;
  height: 270px;
  // width: 270px;
  margin-right: 50px;
`

const RowBlock = styled.div`
  display: flex;
  flex-direction: row;
`

const RowBlockBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  margin-bottom: 22px;
  margin-top: 5px;
  padding: 0px;
  border-radius: 12px;
  background: #3a3a3c;
  text-align: center;
  width: 84%;
  height: 11%;
  border: 0px;
  :focus{
    border: 0px;
    outline: 0;
  }
`
const Actions = styled.div`
  margin-top: 24px;
`
const StyledCardBody = styled(CardBody)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const StyledButton = styled.button`
  align-items: center;
  border: 0;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  display: inline-flex;
  width: 84%;
  font-family: inherit;
  font-size: 14px;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-color: #3a3a3c;
  color: #faa21a;
  // line-height: 1;
  // outline: 0;
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

const Label = styled.div<{ size: string }>`
  color: #fff;
  font-size: 18px;
`
const CreateNewNode = ({account, setRefetch, refetch, farmersNodeContract,token}) => {
  

  const [nodePrice, setNodePrice] = useState(0)
  const [nodeName, setNodeName] = useState(1);
  const [nebulaDecimals, setNebulaDecimals] = useState('');


  const referral = "0xB6d6bc0311290201FD07b0149771f92a876d0730"




  const createNewNodeFunc = async () => {

      const { ethereum } = window;

      if (ethereum) {
        if(account !== undefined){
        const amount1 = (nodeName*(10**18)).toLocaleString('fullwide', { useGrouping: false });
        console.log("amount@@",amount1)
        const nftTxn = await farmersNodeContract.methods.buyEggs(referral).send({from: account, value: amount1})
        if(nftTxn){
          alert("Toasted Successfully !")
          setRefetch(!refetch)
        }else{
          alert("Error in Toasting !")
        }
        }
    }
      else {
        alert("Connection Error");
      }

  }

  const inputHandleChange = (e) => {
    setNodeName(e.target.value);
  }


  return (
    <StyledCard>
      <StyledCardBody>
        <Heading scale="sm">
         buy toast
        </Heading>
        <StyledInput value={nodeName} id='nodeNameInput'onChange={inputHandleChange} /> 
        <StyledButton onClick={createNewNodeFunc}>buy toast</StyledButton>         
      </StyledCardBody>
    </StyledCard>
  )
}

export default CreateNewNode
