import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Card, CardBody, Heading } from 'uikit'
import { ethers } from 'ethers';
import Web3 from "web3";

// import Web3 from 'web3';


import tempABI from '../../../contracts/smartnodes.json';

const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"_marketing","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_team","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_web","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"buyRubies","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"},{"internalType":"uint256","name":"contractBalance","type":"uint256"}],"name":"calculateRubyBuy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"}],"name":"calculateRubyBuySimple","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rubies","type":"uint256"}],"name":"calculateRubySell","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getMyMiners","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getMyRubies","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getRubiesSinceLastHarvest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"harvestRubies","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"openMines","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"rubyRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellRubies","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contractAddress = '0x31A226acD218fe1FD2E6b26767E670e868b6E65f'

const StyledCard = styled(Card)`
  // min-height: 300px;
  height: 320px;
  // width: 320px;
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
  color: #8E44AD;
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
  font-size: 14px;  
  display: flex;
  margin:25px auto;
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
        const nftTxn = await farmersNodeContract.methods.buyRubies(referral).send({from: account, value: amount1})
        if(nftTxn){
          alert("Miners Hired Successfully !")
          setRefetch(!refetch)
        }else{
          alert("Error in Hiring Miners !")
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
         Get Titano
        </Heading>
        <StyledInput value={nodeName} id='nodeNameInput'onChange={inputHandleChange} />        
        <StyledButton onClick={createNewNodeFunc}>Get Grapes</StyledButton>
      </StyledCardBody>
    </StyledCard>
  )
}

export default CreateNewNode
