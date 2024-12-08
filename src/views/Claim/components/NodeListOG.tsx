import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import {BrowserView, MobileView} from 'react-device-detect'
import TableContainer from '@material-ui/core/TableContainer';
import Web3 from "web3";
import { contractABI, contractAddress } from '../../../Abi/NftAbi/NftConfig'
import "./NodeList.css"

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

const NodesListOG = ({account, nodeContract, refetch, refetchCompound, compoundContract, nftContractOg }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [displayArray, setDisplayArray] = useState([])
  const [nodeCreate, setNodeCreate] = useState([])
  const [nftNumber, setNftNumber] = useState([])
  const [tokenArray, setTokenArray]  = useState([])
  const [imageArray, setImageArray] = useState([])

  const web3 = new Web3(window.ethereum as any)
  const contract = new web3.eth.Contract(contractABI as any, contractAddress);

  const readTable = async() => {
   
    const { ethereum } = window;
     
    if (ethereum) {
    
    const displayTable = []
    if(account !== undefined){
    await nodeContract.methods.getNodesCreationTime(account).call().then( async function( info ) {
       const ar = info.split('#')
       await compoundContract.methods.getAllNodesRewards(account).call().then( async function( info1 ) {

        await nodeContract.methods.getNodeNumberOf(account).call().then( async function( nodeNumbers ) {
  
  
       for (let i = 0; i < ar.length; i++) {
          
         
            const date = new Date(ar[i]*1000) 
  
           
         const nodeDate =  `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            
             displayTable.push({
               date : nodeDate,
               nodes: `Node ${i}`,
               reward: ((info1/(10**18))/nodeNumbers).toFixed(4),
               imgSrc: "images/home/placeholder.mp4"
             })    
      }
    })
     
    })
          
     
       } )
      }
      setDisplayArray(displayTable)
    }
  
  
  }
  
const fetchBalance = async() => {
    const arrNft = []
    if (account !== undefined){

        for (let i = 0; i < 8; i++) {
         contract.methods.balanceOf(account,i).call().then( function(info) {        
            arrNft.push(info)
           })
         } 
         setNftNumber(arrNft)
}}


useEffect(()=>{
  fetchBalance()
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[account])

 
useEffect(()=>{
  readTable()
 // eslint-disable-next-line react-hooks/exhaustive-deps
},[refetch,account])


  

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // const classes = useStyles();

  const showMintedNft = async() => {
    const tokenIndex = []
  
   await nftContractOg.methods.balanceOf(account).call().then( async function( balance ) {
    
      
  for(let i=0; i<balance; i+=1) {
      console.log("enter")
    try{
      /* eslint-disable no-await-in-loop */
       const claimReward=  await  nftContractOg.methods.tokenOfOwnerByIndex(account,i).call().then( async function( info ) {
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

  
const showIpfsNft = async() => {
  const imageArray1 = []
    for(let i=0; i<=tokenArray.length; i+=1) {
  
      try{
         /* eslint-disable no-await-in-loop */
          const claimReward1 =  await  nftContractOg.methods.tokenURI(tokenArray[i]).call().then( async function( info ) {
                  
         const str = info.substring(6);
             
          const response = await fetch(info);
                 
           const json = await response.json();

               imageArray1.push({
                  id: i,
                  name: json.name,
                  description: json.description,
                  imgSrc: json.image
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
      
  return (
    <>
    <BrowserView>
      <Paper style={{ width: '100%', overflow: 'auto', background: '#191b1f', boxShadow: 'none' }} >
          <TableContainer >
            <div className="collection">
            {imageArray.map(({imgSrc,nodes, reward}) => {
              return(
                <div className="card">
                  <img alt="OGs" src={imgSrc} />                  
              </div>
              )
              })}
              </div>
              </TableContainer>
      </Paper >
    </BrowserView>
    <MobileView>
        <TableContainer >
          <div className="collection">
           {imageArray.map(({imgSrc,nodes, reward}) => {
             return(
              <div className="cardMobile">
                <img alt="OGs" src={imgSrc} />                  
            </div>
             )
            })}
             </div>
             </TableContainer>
 
    </MobileView>
    </>
  )
     
}

export default NodesListOG;