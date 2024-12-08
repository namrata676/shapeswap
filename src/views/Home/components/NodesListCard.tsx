import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {BrowserView, MobileView} from 'react-device-detect'
// import { ethers } from 'ethers';
import { Card, CardBody, Heading } from 'uikit'
import NodesList from './NodesList';
import NodesListOG from './NodeListOG'


const RowBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`
const StyledCard = styled(Card)`
  max-height: 100% !important;
  box-shadow: 0 0 15px #f8981d;
  border: 1;
  background-color: #191b1f !important;
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  padding-bottom: 20px;  
  margin-left: 2%;  
`

const Label1 = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  padding-bottom: 20px;
  padding-right: 5px;
  font-size:14px !important;
`

const StyledCardBody = styled(CardBody)`
  height: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledButton = styled.button`
  align-items: center;
  border: 0;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(224, 167, 60, 0.856);
  margin-bottom: 25px;
  padding: 12px;
  cursor: pointer;
  display: inline-flex;
  width: 18%;
  font-family: inherit;
  font-size: 14px;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-color: #212429;
  color: #faa21a;
  // line-height: 1;
  // outline: 0;
  margin-left: 10px;
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

const StyledButton1 = styled.button`
  align-items: center;
  border: 0;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(224, 167, 60, 0.856);
  margin-bottom: 25px;
  padding: 5px;
  cursor: pointer;
  display: inline-flex;
  width: 55%;
  font-family: inherit;
  font-size: 10px;
  // font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  background-color: #3a3a3c;
  color: #faa21a;
  // line-height: 1;
  // outline: 0;
  margin-left: 10px;
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

const NodesListCard = ({account, nodeContract, refetch, setMyNode, refetchCompound, compoundContract, nftContract, nftContractOg}) => {
  const [nftNum, setNftNum] = useState(0);
  const [nodeNum, setNodeNum] = useState(0);
  const [loadOG, setLoadOG] = useState('OGs ')
  const [loadLimited, setLoadLimited] = useState('Limited')
  const [page, setPage] = useState(1)

  useEffect(() => {
    
    if(account !== undefined){
   
      nftContractOg.methods.balanceOf(account).call().then( function( info ) {
           setNodeNum(info)
           setMyNode(info)
         })

         nftContract.methods.balanceOf(account).call().then( function( info ) {
          setNftNum(info)
        })
       } 
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[account, refetch]);
  
   const smartNfts = () => {
        setPage(2)
   }

   const smartNfts1 = () => {
        setPage(1)
  }

  return (
    <>
    <BrowserView>
    <StyledCard>
      <StyledCardBody>
        <div>
          <Heading scale="lg" mb="4px">
          <img alt="Smart Finance" src="/images/home/smartnfts.png" style={{width:"30%", marginLeft:"-28px"}} />
          {page === 2 ? (
          <Label>You Own {nodeNum} OG NFTs</Label> ) :
          <Label>You Own {nftNum} Limited NFTs</Label>}  
          </Heading>
          <div className="d-flex flex-row align-items-center">
          <StyledButton onClick={() => smartNfts()}>{loadOG}</StyledButton>
          <StyledButton onClick={() => smartNfts1()}>{loadLimited}</StyledButton>
          </div>
        </div>
        <div>
          {page === 1 ? (
          <NodesList account={account} nodeContract={nodeContract} refetch={refetch} refetchCompound={refetchCompound}  compoundContract={compoundContract} nftContract={nftContract}/>) : (
          <NodesListOG account={account} nodeContract={nodeContract} refetch={refetch} refetchCompound={refetchCompound}  compoundContract={compoundContract} nftContractOg={nftContractOg}/> )}
        </div>
      </StyledCardBody>
    </StyledCard>
    </BrowserView>
    <MobileView>
      <StyledCard>
      <StyledCardBody>
        <div>
          <Heading scale="lg" mb="4px">
          <img alt="Smart Finance" src="/images/home/smartnfts.png" style={{width:"60%", marginLeft:"-28px"}} />
          {page === 2 ? (
          <Label>You Own {nodeNum} OG NFTs</Label> ) :
          <Label>You Own {nftNum} Limited NFTs</Label>}  
          </Heading>
          <div className="d-flex flex-row align-items-center">          
          <StyledButton1 onClick={() => smartNfts()}>{loadOG}</StyledButton1>
          <StyledButton1 onClick={() => smartNfts1()}>{loadLimited}</StyledButton1>
          </div>
        </div>
        <div>
          {page === 1 ? (
          <NodesList account={account} nodeContract={nodeContract} refetch={refetch} refetchCompound={refetchCompound}  compoundContract={compoundContract} nftContract={nftContract}/>) : (
          <NodesListOG account={account} nodeContract={nodeContract} refetch={refetch} refetchCompound={refetchCompound}  compoundContract={compoundContract} nftContractOg={nftContractOg} /> )}
        </div>
      </StyledCardBody>
    </StyledCard>
    </MobileView>
    </>
  )
}

export default NodesListCard
