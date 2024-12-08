import React, {useContext} from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
// import { LogoIcon } from '../../../components/Svg'
import {BrowserView, MobileView} from 'react-device-detect'
import Flex from '../../../components/Box/Flex'
import { HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText } from '../icons'
import MenuButton from './MenuButton'
import ThingsContext from '../../../../../swapContext'

interface Props {
  isPushed: boolean
  // isDark: boolean
  togglePush: () => void
  href: string
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); } 
  50% { transform:  scaleY(0.1); } 
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  background-color: transparent;
  border-radius: 10px;
  margin-left: 0px;
  padding: 5px;

  .mobile-icon {
    //width: 80px;
    height: 60px;
    // min-width: 85px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    //width: 250px;
    height: 50px;
    width: 45px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: flex;
    }
  }
  .right-eye {
    animation-delay: 20ms;
  }
  &:hover {
    .left-eye,
    .right-eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
`

const Label = styled.div<{ labelSize: string }>`
  display: flex;
  font-size:14px;
  // margin:0px 370px;
  color: white;
`
const Label1 = styled.div<{ labelSize: string }>`  
  display: flex;
  font-size:12px;  
  color: white;
`
const BalanceBody = styled.div`
font-size: 20px !important;
margin-right: 2px !important;
margin-bottom: 5px !important;
font-weight: 400 !important;
font-style: normal !important;
color: white !important;
font-family: Inter;
`

const Logo: React.FC<Props> = ({ isPushed, togglePush,  href }) => {
  const isAbsoluteUrl = href.startsWith('http')
  const innerLogo = (
    <>      
      <BalanceBody>ShapeSwap</BalanceBody>      
    </>
  )

  const label = (
    <>
    
    </>
  )

  const commonThings = useContext(ThingsContext)

  const { swapHeader } = commonThings as any

    return (
      <>
      <BrowserView>
        <Flex>
          {isAbsoluteUrl ? (
            // <StyledLink as="a" href={href} aria-label="Pancake home page">
            <StyledLink to={"/swap"} aria-label="Smart Finance Omni Dex" style={{color: 'white'}}>
              {innerLogo}          
              {label}
            </StyledLink>
          ) : (        
              <StyledLink to={"/swap"} aria-label="Smart Finance Omni Dex" style={{color: 'white'}}>
                {innerLogo} 
               {label}             
              </StyledLink>     
             
          )}

        </Flex>
        </BrowserView>
        <MobileView>
        <Flex>
       
        {isAbsoluteUrl ? (
          // <StyledLink as="a" href={href} aria-label="Pancake home page">
          <StyledLink to={href} aria-label="Smart Finance Omni Dex" style={{color: 'white'}}>
            {innerLogo}    
            {label}  
          </StyledLink>
        ) : (        
            <StyledLink to={href} aria-label="Smart Finance Omni Dex" style={{color: 'white'}}>
              {innerLogo} 
              {label}  
            </StyledLink>       
        )}
      </Flex>
        </MobileView>  
        </>
    )
}


export default React.memo(Logo, (prev, next) => prev.isPushed === next.isPushed)
