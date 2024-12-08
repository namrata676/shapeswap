import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {BrowserView, MobileView} from 'react-device-detect'
import useInterval from 'react-useinterval';
import axios from 'axios'
import usePoll from 'react-use-poll';
import { Card, CardBody, Text, Heading } from 'uikit'
import { ethers } from 'ethers';

import tempABI from '../../../contracts/smartnodes.json';



const StyledCard = styled(Card)`
  min-height: 135px !important;  
  border: 1;
  background-color: #1b2028 !important;
  box-shadow: 0px 0px 10px rgba(34, 60, 122, 0.856);
`

const RowBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 8px;
`

const RowBlockBetween = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const StyledImg = styled.img`
  padding: 10px;
  width: 60%;
  border-radius: 10px;  
  margin-top: 10px;  
`
const StyledImg1 = styled.img`
  width: 35% !important;  
  height: 90% !important;
  border-radius: 10px;  
  padding-right: 20px;
  margin-top: 18px;  
`

const Label = styled.div<{ size: string }>`
  color: #93979b;
  font-size: 25px !important;
`
const Label1 = styled.div<{ size: string }>`
  color: #93979b;
  font-size: 20px !important;
  width: 100%;
`
const PlusLabel = styled.div<{ size: string, color: any }>`
  color: ${props => props.color >= 0 ? '#55f6bb' : '#ee4f9f'};
  font-size: ${props => props.size};
`
const Actions = styled.div`
  margin-top: 24px;
`
const StyledCardBody = styled(CardBody)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TotalNodes = ({ title, val1, val2, img, account, nodeContract, refetch, nftContract, nftContractOg }) => {
  const [totalNodes, setTotalNodes] = useState('0');
  const [updateTotal, setUpdateTotal] = useState(0)
  const [updateTotalOg, setUpdateTotalOg] = useState(0)


  const getTotalNodes = () => {
    const { ethereum } = window;

    if (ethereum) {
     
        nodeContract.methods.totalNodesCreated().call().then( function( info ) {
             setTotalNodes(info)
           })

           
         } 
        
  }


  useEffect(()=>{
    getTotalNodes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[refetch])

  
 useInterval(getTotalNodes,10000)


 useEffect(()=>{
     
    
  nftContract.methods.totalSupply().call().then( function( info ) {
  
        setUpdateTotal(info)
     }); 


     nftContractOg.methods.totalSupply().call().then( function( info ) {
  
      setUpdateTotalOg(info)
   }); 
  



    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])


useInterval(()=>{

nftContract.methods.totalSupply().call().then( function( info ) {
  
setUpdateTotal(info)
}); 

nftContractOg.methods.totalSupply().call().then( function( info ) {
  
  setUpdateTotalOg(info)
}); 



}, 20000);


  


  return (
    <>
    <BrowserView>
    <StyledCard>
      <RowBlockBetween>
        <StyledCardBody>
      <RowBlock>
            <Label size='20px' style={{marginLeft: '70px'}}>Total Ogs<Label size='20px' style={{color: '#eee',display: 'block !important', marginLeft: '25%'}}> {updateTotalOg}</Label> </Label>           
            <Label size='20px' style={{marginLeft: '135px'}}>Total Limiteds<Label size='20px' style={{color: '#eee', display: 'block !important', marginLeft:'40%'}}> {updateTotal}</Label></Label> 
        
          </RowBlock>
          </StyledCardBody>
        {/* <StyledCardBody> */}
        {/* <StyledImg src='/images/home/banner.jpeg' alt='status_logo' />  */}
        {/* </StyledCardBody> */}
      </RowBlockBetween>
    </StyledCard>
    </BrowserView>
    <MobileView>
    <StyledCard>
      <RowBlockBetween>       
        <StyledCardBody>
          <RowBlock>
          <Label size='20px'>Total OGs<Label size='20px' style={{color: '#eee'}}> {updateTotalOg}</Label> </Label>           
            <Label size='20px'style={{marginLeft: '70px'}}>Total Limiteds<Label size='20px' style={{color: '#eee', marginLeft: '50px !important'}}> {updateTotal}</Label></Label> 
          </RowBlock>
        </StyledCardBody> 
        {/* <StyledCardBody> */}        
        {/* <StyledImg1 src='/images/home/banner.jpeg' alt='status_logo' /> */}
        {/* </StyledCardBody> */}
      </RowBlockBetween>
    </StyledCard>
    </MobileView>
    </>
  )  
}

export default TotalNodes