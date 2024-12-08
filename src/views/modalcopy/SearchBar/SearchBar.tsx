import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  withStyles,
} from '@material-ui/core/styles';
import List from './Components/List'
import "./SearchBar.css";

const CssTextField = withStyles({
  root: {    
    '& label.Mui-focused': {
      color: '#eee !important',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgb(250, 162, 26)',            
      color: '#eee !important',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgb(250, 162, 26)',         
        color: '#eee !important',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(250, 162, 26)',         
        color: '#eee !important',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(250, 162, 26)',         
        color: '#eee !important',
      },
    },
  },
})(TextField);

const SearchBar = ({onDismiss, tokenFunc2, ListData, tokenName, setInitToken, initToken, tokenRefresh, setChain}) => {
  const [inputText, setInputText] = useState("");
  const inputHandler = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="main">      
      <div className="search" >
      <CssTextField     
       id="outlined-basic"
       onChange={inputHandler}
       variant="outlined"
       fullWidth
       label="Search Contract Address"
className="username"
margin="normal"
inputProps={{ style: {color: '#faa21a !important'}}}

/>
      </div>
      <List input={inputText} onDismiss={onDismiss} tokenFunc2={tokenFunc2} ListData={ListData} tokenName={tokenName} setInitToken={setInitToken} initToken={initToken}  tokenRefresh={tokenRefresh} setChain={setChain}/>
    </div>
  );
}

export default SearchBar;