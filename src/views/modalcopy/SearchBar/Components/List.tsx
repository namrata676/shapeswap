import React, { useState, useEffect } from 'react'
import "../SearchBar.css"
import axios from 'axios'
import { ApolloClient, InMemoryCache, gql, Cache } from "@apollo/client";


function List(props) {


    const { ListData, input, tokenName, setInitToken, initToken, tokenRefresh, setChain } = props

    const [tokenList, setTokenList] = useState([])
    const [listUpdate, setListUpdate] = useState(false)

    let filteredData
    let GRAPHAPIURL
    if(setChain === "avax"){
      GRAPHAPIURL = "https://api.thegraph.com/subgraphs/name/harry1121-s/dex-aggregator-avax"
    } else if (setChain === "bnb"){
      GRAPHAPIURL = "https://api.thegraph.com/subgraphs/name/harry1121-s/dex-aggregator-bsc"

    } else if (setChain === "poly"){
      GRAPHAPIURL = "https://api.thegraph.com/subgraphs/name/harry1121-s/dex-aggregator-polygon"
    }
   
    const searchToken = async (input1) => {
     let projectDataGQL = null;
     const client = new ApolloClient({
       uri: GRAPHAPIURL,
       cache: new InMemoryCache(),
     });
     console.log("entersearch",input)
     const inputLc = input1.toLowerCase();
     console.log("inputLC", inputLc)
     const projectOwnerDataQuery = `query {
        tokens(where:{id: "${inputLc}"}) {
            id
            name
            symbol
            decimal
        }
    }`;
     try {
       projectDataGQL = await client.query({
         query: gql(projectOwnerDataQuery),
         fetchPolicy: "network-only",
       });
         const arr = [];
         console.log("project111111!!!!",projectDataGQL)
          projectDataGQL.data.tokens.map((token) => {
           arr.push({
               "id": token?.id,
               "text": token?.id === "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7" ? 'avax' : token?.name,
               "icon": "/images/coins/avax.png",
               "address": (token?.id).toLowerCase(),
               "decimal" : token?.decimal,
               "symbol" : token?.id === "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7" ? 'avax' : token?.symbol,
               "saveStatus": "save",
               "chain": setChain
           });
          
           return arr; 
         });
         if(arr.length > 0){
         
         setTokenList(arr)
         } else {
        
           setTokenList([])
         }
         return arr;
     } catch (e) {
       console.log(e);
     }
 
     return []
   
   };


   useEffect(() =>{
   
    console.log("checklistdata",ListData)
   
    const filteredList = ListData.filter((el) => {
      console.log("enterfiltereddata")
      // if no input the return the original
      if (input === '') {
          return el;
      }
      
      // return the item which contains the user input
     const { text, address } = el
     console.log("addresstest", text?.toLowerCase().includes(input))

     return (text?.toLowerCase().includes(input) || address?.toLowerCase().includes(input))
  
  })
  if(filteredList.length !== 0){
    setTokenList(filteredList)
  }
  else  {
    searchToken(input)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
     },[input,ListData, listUpdate])


    // create a new array by filtering the original array
    const onSelect = (token2) => {
       const { tokenFunc2, onDismiss } = props 
          tokenFunc2(token2,tokenName) 
          onDismiss()
    }
      
    const onSave = async (token2) => {
      console.log("token222222",initToken)
       
      if(token2?.saveStatus === 'unsave' ){
        const storedArray = localStorage.getItem("tokenArray");
        const ourArray = JSON.parse(storedArray);
        if (token2 !== undefined) {
          /* eslint-disable no-param-reassign */
          token2.saveStatus = "save"
        }
        const obj =  ourArray.findIndex(v => v.address === token2?.address);
        await ourArray.splice(obj,1)
        localStorage.setItem("tokenArray",JSON.stringify(ourArray));
        tokenRefresh()
        setListUpdate(!listUpdate)

        
      }
      else {

       /* eslint-disable no-lonely-if */
      if (localStorage.getItem('tokenArray') !== null) {
        
        const storedArray = localStorage.getItem("tokenArray");
        const ourArray = JSON.parse(storedArray);
        if (token2 !== undefined) {
          token2.saveStatus = "unsave"
        }
        await ourArray.push(token2)
        localStorage.setItem("tokenArray",JSON.stringify(ourArray));
        tokenRefresh()
        setListUpdate(!listUpdate)
    }  else {
       const ourArray = []
       await ourArray.push(token2)
       localStorage.setItem("tokenArray",JSON.stringify(ourArray));
       tokenRefresh()
       setListUpdate(!listUpdate)
    }
  }
 
   }
    
    return (
        <ul className="listCoin">
            {tokenList.map((item) => (
                <li key={item?.id}><div className='d-flex flex-row align-items-start justify-content-start' style={{ gap: '6px', marginTop: '12%', color: '#faa21a'  }} >
                <img src={item?.icon} width='30px' alt='weth' />
                <button type="button"  onClick={()=> { onSelect(item) }} style={{ marginTop: '6%', marginLeft: '7%', backgroundColor:"#2b2b2b", border: 'none', color: 'white' }}>{item?.symbol}</button>
                {item?.saveStatus && (
                <button type="button"  onClick={()=> { onSave(item) }} style={{ marginTop: '6%', marginLeft: '7%', backgroundColor:"rgb(250, 162, 26)", color: 'black', borderRadius: "8px",padding: "5px", fontSize: "12px" }}>{item?.saveStatus}</button>)}
              </div></li>
            ))}
        </ul>
       
    )
}

export default List