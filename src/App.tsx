import React, { lazy, useContext, useState, useRef } from 'react'

import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from 'toolkit/uikit'
import ReactGA from 'react-ga'
import ProjectX from 'views/ProjectX'
import avaxFarmers from 'views/avaxFarmers'
import Info from 'views/Info'
import HomePage from './views/HomePage'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import PageLoader from './components/Loader/PageLoader'
import history from './routerHistory'
// import Swap from './views/Swap'
import Mint from './views/Mint'
import Stars from './views/Stars'
// import NotFound from './views/NotFound'
import ExchangeAvax from './views/ExchangeAvax'
import ExchangeTrade from 'views/ExchangeAvaxTrade'
import ComingSoon from './views/ComingSoon'
import Treasury from './views/Treasury'
import SmartDash from './views/SmartDash'
import Claim from './views/Claim'
import Integrate from './views/Integrate'
import ExchangePolygon from './views/ExchangePolygon'
import ExchangeCronos from './views/ExchangeCronos'
import ExchangeBinance from './views/ExchangeBinance'
import ExchangeEthereum from './views/ExchangeEthereum'
import ExchangeFantom from './views/ExchangeFantom'
import Maintenance from './views/Maintenance'
import Leviathan from './views/Leviathan'
import { ThingsProvider } from './swapContext'
import ScrollReveal from './HomePageFinal/utils/ScrollReveal';
import Home from './HomePageFinal/views/Home';
import AppRoute from './HomePageFinal/utils/AppRoute';
import LayoutDefault from './HomePageFinal/layouts/LayoutDefault';

// ReactGA.initialize('G-VL9SDV6RWB'); 
// ReactGA.pageview(window.location.pathname + window.location.search);

// const Home = lazy(() => import('./views/Home'))
const Home1 = lazy(() => import('./views/Home'))
const App: React.FC = () => {

  const TRACKING_ID = "G-1JT64FDXB9"; // OUR_TRACKING_ID
  ReactGA.initialize(TRACKING_ID);

  const { ethereum  } = window;
  // if(ethereum) {
  //   const outerHtmlElement: any = ethereum;
  //   outerHtmlElement.on("chainChanged", (_chainId) => window.location.reload());
  //  }

   const [swapHeader, setSwapHeader] = useState(false)
   const [account, setAccount] = useState('')

   const childRef = useRef();
  
   const commonThings = {swapHeader, setSwapHeader, account, setAccount}
  return (
    <ThingsProvider value={commonThings}>
    <Router history={history}>
      <Route>
      <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
           </Switch>
      </Route>
      <ResetCSS />
      <GlobalStyle  />
     <Menu>
      <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route exact path="/hello" >
              <HomePage {...homeData} />
            </Route> 
            <Route exact strict path="/Dashboard" component={Home1} />            
            <Route exact strict path="/mint" component={Mint} />
            <Route exact strict path="/swap" component={ExchangeAvax} />     
            <Route exact strict path="/trade" component={ExchangeTrade} />            
            <Route exact strict path="/integrate" component={Integrate} /> 
            <Route exact strict path="/claim" component={Claim} />  
            <Route exact strict path="/maintenance" component={Maintenance} /> 
            <Route exact strict path="/swapAvax" component={ExchangeAvax} />                                                          
            <Route exact path="/swapPolygon" component={ExchangePolygon} />
            <Route exact path="/exchangeCronos" component={ExchangeCronos} />
            <Route exact path="/swapBinance" component={ExchangeBinance} />
            <Route exact path="/exchangeEthereum" component={ExchangeEthereum} />
            <Route exact path="/exchangeFantom" component={ExchangeFantom} />
            { /* <Route exact path="/Leviathan" component={Leviathan} />  */ }  
            <Route exact strict path="/treasury" component={Treasury} />
            <Route exact strict path="/whitepaper" component={ComingSoon} />
            <Route exact strict path="/tokenomics" component={ComingSoon} />
            { /* <Route exact path="/SmartDash" component={SmartDash} /> */ }
            {/* <Route>
              <Redirect to="/swap" />
            </Route> */}
          </Switch>
        </SuspenseWithChunkError>
    </Menu>
    </Router>
    </ThingsProvider>
  )
} 

export default React.memo(App)

const lines1Data = {
  src: "/img/lines-1@1x.svg",
};

const heroData = {
  lines1Props: lines1Data,
};

const frame258022Data = {
  className: "frame-25803",
};

const frame258023Data = {
  className: "frame-25803",
};

const frame258024Data = {
  className: "frame-25803",
};

const frame258025Data = {
  className: "frame-25803",
};

const frame25801Data = {
  frame258021Props2: frame258022Data,
  frame258022Props: frame258023Data,
  frame258023Props: frame258024Data,
  frame258024Props: frame258025Data,
};

const uSER1Data = {
  yourFullName: "Your full name",
};

const uSER2Data = {
  yourFullName: "Your email address",
  className: "e-mail",
};

const homeData = {
  navbarLinkSmartSwap: "Smart Swap",
  navbarLinkCollabs: "Collabs",
  navbarLinkFaqs: "FAQs",
  navbarLinkAbout: "About",
  navbarLinkPlace: "Contact",
  loremIpsumDolorSi1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  title: "The Omni Dex",
  theOmnidex: "The OmniDex",
  smartNft1: "Smart NFTs",
  smartNft2: "Smart NFTs",
  loremIpsumDolorSi2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  aboutSmartFinance1: "About Smart Finance",
  aboutSmartFinance2: "About Smart Finance",
  smartNft3: "Smart NFT",
  smartNft4: "Smart NFT",
  smartNft5: "Smart NFT",
  loremIpsumDolorSi3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  inTheMedia1: "In The Media",
  inTheMedia2: "In The Media",
  new_Project_65_31: "/img/new-project-65-3-1@2x.png",
  smartFinance: "Smart Finance",
  place: "Home",
  products: "Products",
  team: "Team",
  aboutUs: "About Us",
  whitepaper: "Whitepaper",
  inTheMedia3: "In the media",
  partners: "Partners",
  contactUs: "Contact Us",
  typeYourMessageHere: "Type your message here...",
  sendMessage: "Send Message",
  heroProps: heroData,
  frame25801Props: frame25801Data,
  uSER1Props: uSER1Data,
  uSER2Props: uSER2Data,
};


