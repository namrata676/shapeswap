import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Card, CardBody, Heading } from 'uikit'
import { ethers } from 'ethers';
import Web3 from "web3";

// import Web3 from 'web3';


import tempABI from '../../../contracts/smartnodes.json';



const StyledCard = styled(Card)`
  // min-height: 200px;
  height: 173px;
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
  margin-top: 24px;
  padding: 0px;
  border-radius: 12px;
  background: #3a3a3c;
  text-align: center;
  width: 84%;
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

const Label = styled.div<{ labelSize: string }>`
  color: ${({ theme }) => theme.colors.textSubtle};  
  
`

const CreateNewNode = ({account, setRefetch, refetch, gorillaNodeContract, gorillaTokenContract, token}) => {
  

  const [nodePrice, setNodePrice] = useState(0)
  const [nodeName, setNodeName] = useState('');
  const [starDecimals, setStarDecimals] = useState('');

  useEffect(()=>{

  if(token==="gorilla"){
   gorillaTokenContract.methods.decimals().call().then( function( info ) {

      setStarDecimals(info)
      
      });   

    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



  const createNewNodeFunc = async () => {

      const { ethereum } = window;

      if (ethereum) {
        if(token==="gorilla"){
        const amount1 = (10*(10**(parseInt(starDecimals)))).toLocaleString('fullwide', { useGrouping: false });
        const nftTxn = await gorillaTokenContract.methods.createNodeWithTokens(nodeName,amount1).send({from: account});
        if(nftTxn){
          alert("Node Created Successfully !")
          setRefetch(!refetch)
        }else{
          alert("Error in creating smart node !")
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
          Create New Node
        </Heading>       
        <StyledInput placeholder='node name' id='nodeNameInput'onChange={inputHandleChange} />
        <StyledButton onClick={createNewNodeFunc}>Create New Node</StyledButton>
      </StyledCardBody>
    </StyledCard>
  )
}

export default CreateNewNode
