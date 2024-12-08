import React, { useState, useEffect } from 'react'
import usePoll from 'react-use-poll';
import useInterval from 'react-useinterval';
import {BrowserView, MobileView} from 'react-device-detect'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import "./NodeList.css"



// import { withStyles } from "@mui/styles";
// import styled from 'styled-components'

interface Column {
  id: 'date' | 'nodes' | 'reward';
  label: string;
  minWidth?: number;
  align?: 'center';
  font?: 'Osiris !important';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [ 
  { id: 'date', label: 'Creation Date', minWidth: 178},
  { id: 'nodes', label: 'Node Name', minWidth: 200 },
  { id: 'reward', label: 'Rewards', minWidth: 80, align: 'center' },
];

interface Data {
  date: string;
  nodes: string;  
  reward: string;
}

function createData(
  date: string,
  nodes: string,  
  reward: string,
): Data {
  return { date, nodes, reward };
}

const NodesList = ({account, nodeContract, refetch, refetchCompound, compoundContract, nftContract }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [displayArray, setDisplayArray] = useState([])
  const [nodeCreate, setNodeCreate] = useState([])
  const [tokenArray, setTokenArray]  = useState([])
    const [imageArray, setImageArray] = useState([])

    const [updateTotal, setUpdateTotal] = useState(0)


  
    
const showMintedNft = async() => {
  const tokenIndex = []

 await nftContract.methods.balanceOf(account).call().then( async function( balance ) {
  
    
for(let i=0; i<balance; i+=1) {
    console.log("enter")
  try{
    /* eslint-disable no-await-in-loop */
     const claimReward=  await  nftContract.methods.tokenOfOwnerByIndex(account,i).call().then( async function( info ) {
          tokenIndex.push(info);
          console.log(tokenIndex,"token")
         
          console.log("infocheck",info)
           });
     }catch(e){
       break;
     }
  
     console.log("tokenIndex",tokenIndex)
    

}
setTokenArray(tokenIndex)

 })

}

const getChar = (imageUrl) => {
  console.log("imageUrl",typeof(imageUrl))
  console.log("imageUrl1",imageUrl.toLowerCase())
  const str1 = imageUrl.toLowerCase()
 
  let str = ""
  if((imageUrl?.toLowerCase()).includes("stark")){
    str = "/images/n/stark.mp4"
  }  
  else if ((imageUrl?.toLowerCase()).includes("elon")){
    str = "/images/n/elon.mp4"
  } else if ((imageUrl?.toLowerCase()).includes("einstein")){
    str = "/images/n/einstein.mp4"
  } else if ((imageUrl?.toLowerCase()).includes("mcgregor")){
    str = "/images/n/mcgregor.mp4"
  } else if ((imageUrl?.toLowerCase()).includes("tesla")){
     str ="/images/n/tesla.mp4"
  }
  return str
}

const showIpfsNft = async() => {
  const imageArray1 = []
    for(let i=0; i<=tokenArray.length; i+=1) {
  
      try{
         /* eslint-disable no-await-in-loop */
          const claimReward1 =  await  nftContract.methods.tokenURI(tokenArray[i]).call().then( async function( info ) {
                  
         const str = info.substring(6);
             
          const response = await fetch(info);
                 
           const json = await response.json();

               const strImage1 = getChar(json.image)

              
               imageArray1.push({
                  id: i,
                  name: json.name,
                  description: json.description,
                  imgSrc: strImage1
               })
               console.log(imageArray1,"imageArray")
              
            
              })
      
      
         }catch(e){
           break;
         } 
       }
       setImageArray(imageArray1)

      }
      
     

  


useEffect(() => {

  async function fetchData() {
    // You can await here
    if(account){
      await showMintedNft()
      showIpfsNft()
      
      }
    // ...
  }
  fetchData();

 
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[account])


 useEffect(() => {

  showIpfsNft()
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
   },[tokenArray])



  const rows = displayArray;

  console.log("imagearray",imageArray)
  
 

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log("ImageArray",imageArray)
  // const classes = useStyles();
  return (
    <>
    <BrowserView>
    <Paper style={{ width: '100%', overflow: 'auto', background: '#191b1f', boxShadow: 'none' }} >
        <TableContainer style={{ height: 540 }} >
          <div className="collectionLimited">
           {imageArray.map(({imgSrc,nodes, reward}) => {
             return(
              <div className="cardLimited">
                
                  <video  width="270px" autoPlay loop muted>
                    <source src={imgSrc} type="video/mp4"/>
                   </video>
            </div>
             )
            })}
             </div>
             </TableContainer>
  </Paper >
  </BrowserView>
  <MobileView>
  <Paper >
        <TableContainer>
          <div className="collectionLimited">
           {imageArray.map(({imgSrc,nodes, reward}) => {
             return(
              <div className="cardLimited">
                
                  <video  width="170px" autoPlay loop muted>
                    <source src={imgSrc} type="video/mp4"/>
                   </video>
            </div>
             )
            })}
             </div>
             </TableContainer>
  </Paper >
  </MobileView>
  </>
  )
     
}

export default NodesList;