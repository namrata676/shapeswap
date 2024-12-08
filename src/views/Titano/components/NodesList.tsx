import React, { useState, useEffect } from 'react'
import usePoll from 'react-use-poll';
import useInterval from 'react-useinterval';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

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
  { id: 'nodes', label: 'Node Name', minWidth: 200, align: 'center' },
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

const NodesList = ({account, nodeContract, refetch }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [displayArray, setDisplayArray] = useState([])
  const [nodeCreate, setNodeCreate] = useState([])

const readTable = async() => {
   
  const { ethereum } = window;
   
  if (ethereum) {
  

  const displayTable = []
  if(account !== undefined){
  await nodeContract.methods.getNodesCreationTime(account).call().then( async function( info ) {
     const ar = info.split('#')
    

     for (let i = 0; i < ar.length; i++) {
        

        // eslint-disable-next-line
       await nodeContract.methods.getNodeReward(account, ar[i]).call().then( async function( info1 ) {
       
       await nodeContract.methods.getNodesNames(account).call().then( async function( info2 ) {
          const nodeName = info2.split('#')
         
          const date = new Date(ar[i]*1000) 

         
       const nodeDate =  `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
          
           displayTable.push({
             date : nodeDate,
             nodes: nodeName[i],
             reward: (info1/(10**18)).toFixed(4)
           })

          
          
        })
    
      })
       
    }
   
   
        
   
     } )
    }
    setDisplayArray(displayTable)
  }


}

useInterval(readTable, 30000);
 
useEffect(()=>{

readTable()

 // eslint-disable-next-line react-hooks/exhaustive-deps
},[refetch,account])


  const rows = displayArray;
  
 

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // const classes = useStyles();
  return (
    <Paper style={{ width: '100%', overflow: 'hidden', background: '#eeeeee', boxShadow: 'none' }} >
      <TableContainer style={{ height: 440 }} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow style={{ background: '#eeeeee' }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth, background: '#eeeeee', color: '#8E44AD',
                    fontSize: '14px', paddingBottom: '0px', fontFamily: 'Osiris'
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayArray
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.date} style={{ color: 'white' }}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{ color: 'white' }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: '#8E44AD', display: rows.length > rowsPerPage ? 'block' : 'none' }}
      />
    </Paper >
  );
}

export default NodesList;