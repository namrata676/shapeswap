// Set of helper functions to facilitate wallet setup
import { ChainId } from 'toolkit/sdk'
import { BASE_URL, BASE_BSC_SCAN_URLS } from 'config'
import Web3 from "web3";
import { nodes } from './getRpcUrl'

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */


// 0xa86a (hex) = 43114 (dec);
// 0xa869 (hex) = 43113 (dec);
const chainMatic = `0x${(137).toString(16)}`
const chainBinance =  `0x${(56).toString(16)}`
const chainCronos = `0x${(25).toString(16)}`
const chainFantom =  `0x${(250).toString(16)}`
const chainEthereum = `0x${(1).toString(16)}`
const chainAvax = `0x${(43114).toString(16)}`
const chainTestAvax = `0x${(43113).toString(16)}`
const chainArbitrum = `0x${(42161).toString(16)}`
const chainOptimism =  `0x${(10).toString(16)}`

const avalancheParam = [
  {    
    chainId: chainAvax,
    chainName:  'Avalanche Network',
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    // rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    blockExplorerUrls: ['https://snowtrace.io/'],
    // blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
  },
]

const mumbaiParam = [
  {
    chainId:  chainMatic,
    chainName:  'Polygon Mainnet',
    rpcUrls: ['https://polygon-rpc.com/'],
    // rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://polygonscan.com/'],
    // blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
  },
]

const binanceParam = [
  {
    chainId:  chainBinance,
    chainName:  'Smart Chain',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    // rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://bscscan.com'],
    // blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
  },
]


const cronosParam = [
  {
    chainId:  chainCronos,
    chainName:  'Cronos',
    rpcUrls: ['https://evm.cronos.org'],
    // rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'CRO',
      symbol: 'CRO',
      decimals: 18,
    },
    blockExplorerUrls: ['https://cronoscan.com/'],
    // blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
  },
]


const fantomParam = [
  {
    chainId:  chainFantom,
    chainName:  'Fantom Opera',
    rpcUrls: ['https://rpc.ftm.tools'],
    // rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    blockExplorerUrls: ['https://ftmscan.com'],
    // blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
  },
]

const ethereumParam = [
  {
    chainId:  chainEthereum,
    chainName:  'mainnet',
    rpcUrls: ['https://etherscan.io/block/16068872'],
    // rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://etherscan.io'],
    // blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
  },
]

const arbitrumParam = [
  {
    chainId:  chainArbitrum,
    chainName:  'Arbitrum One',
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    // rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'AETH',
      symbol: 'AETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://arbiscan.io'],
    // blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
  },
]

const optimismParam = [
  {
    chainId:  chainOptimism,
    chainName:  'Optimism',
    rpcUrls: ['https://mainnet.optimism.io'],
    // rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'OP',
      symbol: 'OP',
      decimals: 18,
    },
    blockExplorerUrls: ['https://optimistic.ethereum.io'],
    // blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
  },
]

const avalancheTestParam = [
  {
    chainId:  chainTestAvax,
    chainName:  'testnet',
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    // rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'Avax',
      symbol: 'AVAX',
      decimals: 18,
    },
    blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
    // blockExplorerUrls: ['https://cchain.explorer.avax-test.network'],
  },
]

const getNetworkObject = (chainId) => {

let networkParam 
if (chainId === 1){
  networkParam = ethereumParam
} else if (chainId === 137){
   networkParam = mumbaiParam
} else if (chainId === 56){
  networkParam = binanceParam
} else if (chainId === 250){

   networkParam = fantomParam
} else if (chainId === 43114){
  networkParam = avalancheParam
} else if(chainId === 25){
  networkParam = cronosParam
} else if(chainId === 43113){
  networkParam = avalancheTestParam
} 
else if (chainId === 42161) {
  networkParam = arbitrumParam
}
else if (chainId === 10) {
  networkParam = optimismParam
}
  return networkParam
}


export const setupNetwork = async () => {
  

  const web3 = new Web3(window.ethereum as any);
  const chainID =  await web3.eth.net.getId();
  console.log("chainId",chainID)

  console.log("chainId1",chainID === 137)

  console.log("entersetupnetwork")
  const provider = window.ethereum
  if (provider) {
    
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: getNetworkObject(chainID),
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error("Can't setup the Avalanche network on metamask because window.ethereum is undefined")
    return false
  }
}

export const setupNetwork1 = async (chainId) => {

  
  const provider = window.ethereum
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: getNetworkObject(chainId),
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error("Can't setup the Avalanche network on metamask because window.ethereum is undefined")
    return false
  }
}

export const setupNetwork2 = async () => {
  console.log("entersetupnetwork")
  const provider = window.ethereum
  if (provider) {
    const chainId = 137;
    const chainIdHex = `0x${chainId.toString(16)}`;
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: avalancheParam,
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error("Can't setup the Avalanche network on metamask because window.ethereum is undefined")
    return false
  }
}







/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (tokenAddress: string, tokenSymbol: string, tokenDecimals: number) => {
  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: `${BASE_URL}/images/tokens/${tokenAddress}.png`,
      },
    },
  })

  return tokenAdded
}