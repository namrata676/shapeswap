import { MenuEntry } from 'toolkit/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [ 
 // {
 //   label: t('smart dash'),
 //   icon: '/images/home/dashboardnew.png',
 //   href: '/SmartDash',
 // },
 // {
 // label: t('Home'),
 // icon: '/images/home/home.png',
 // href: '/info',
// },
 {
  label: t('Smart Swap'),
  icon: '/images/home/swapn.png',
  href: '/swap',
},
  {
    label: t('Smart NFTs'),
    icon: '/images/home/nodes.png',
    href: '/dashboard',
  },   
  {
    label: t('Mint Limited'),
    icon: '/images/home/nfttokenicon.png',
    href: '/mint',
  },
  // {
  //   label: t('Buy Crypto'),
  //   icon: '/images/home/ramplogo.png',
  //   href: 'https://buy.ramp.network/',
  // },
 // {
 //   label: t('NFTartpeida'),
 //   icon: '/images/home/nftartpedia1.png',
 //   href: 'https://nftartpedia.com/collections/smart-swap-limited-nfts',
 // },
  // {
 // label: t('DexScreener'),
 // icon: '/images/home/dexscreener.png',
 // href: 'https://dexscreener.com/avalanche/0x712b05710bcFe9C9B1DF08D0f846f42c3D457F3E',
 // }, 
 // {
 //   label: t('Presale'),
 //   icon: '/images/home/presale.png',
 //   href: '/buy',
 // },
 // {
 //   label: t('Test'),
 //   icon: '/images/home/swap.png',
 //   href: '/test',
 // },
 // {
 // label: t('Treasury'),
 // icon: '/images/home/treasury.png',
 // href: '/treasury',
 // },
 // 
  // {
  //  label: t('TraderJoe'),
  //  icon: '/images/home/farm.png',
  //  href: 'https://traderjoexyz.com/trade?outputCurrency=0x712b05710bcFe9C9B1DF08D0f846f42c3D457F3E#/',
  // },
 // {
 //   label: t('Whitepaper'),
 //   icon: '/images/home/whitepaper.png',
 //   href: 'https://docs.smartnodes.finance/',
 // },
 // {
 //   label: t('Tokenomics'),
 //   icon: '/images/home/tokenomics.png',
 //   href: 'https://docs.smartnodes.finance/smartnodes-token/tokenomics',
 // },
/*  {
  label: t('Project X'),
  icon: '/images/home/projx.png',
  href: '/projectx',
},
{
  label: t('Golden Society'),
  icon: '/images/home/golden1.png',
  href: '/golden',
},  
  {
    label: t('Nebula Nodes'),
    icon: '/images/home/nebu.png',
    href: '/nebula',
  },  
  {
    label: t('Emerald Nodes'),
    icon: '/images/home/Emerald.png',
    href: '/emerald',
  },   */
  // {
  //  label: t('Gorilla Nodes'),
  //  icon: '/images/home/gorilla.png',
  //  href: '/gorilla',
  // },
]

export default config