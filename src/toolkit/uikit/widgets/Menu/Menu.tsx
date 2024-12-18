import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/throttle'
import { Text } from 'toolkit/uikit'
import Overlay from '../../components/Overlay/Overlay'
import Flex from '../../components/Box/Flex'
import { useMatchBreakpoints } from '../../hooks'
import Logo from './components/Logo'
import Panel from './components/Panel'
import UserBlock from './components/UserBlock'
import { NavProps } from './types'
import Avatar from './components/Avatar'
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from './config'
import Select, { OptionProps } from './components/Select'
import LangSelector from './components/LangSelector'

const Wrapper = styled.div`
  position: relative;
  width: 100%;  
  overflow-y: auto;
  
  
`

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: #FFFFFF;
  
  {/* background-image: linear-gradient(#051234, #040e2a); */} 
  background-color: transparent;
  {/* border-bottom: solid 2px rgba(133, 133, 133, 0.1); */}
  z-index: 20;
  transform: translate3d(0, 0, 0);
`

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
  background-color:  #2C3338;
  background-image: #2C3338;
  background-repeat: no-repeat;
  background-size: cover;
background-position: center;   
  justify-content: center !important;
  align-items: center !important;
  height:100vh !important;
`

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
  
   max-width: ${({ isPushed }) => `calc(100% - ${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_FULL}px)`};
  }
`

// margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    // max-width: ${({ isPushed }) => `calc(100% - ${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`

const LanguageWrapper = styled.div`
  margin-top: 0;
`


const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  profile,
  children,
}) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  const [isPushed, setIsPushed] = useState(!isMobile)
  const [showMenu, setShowMenu] = useState(true)
  const refPrevOffset = useRef(window.pageYOffset)
  const { username = 'Anne' } = profile

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === 'Home')

  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <div className='d-flex flex-row justify-content-between'>
        <Logo
          isPushed={isPushed}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
          // isDark={isDark}
          href={homeLink?.href ?? '/'}
        />
        </div>
        {!!login && !!logout && (
          <Flex alignItems='center'>
            <UserBlock account={account} login={login} logout={logout} />
            {/* <LanguageWrapper>
              <LangSelector currentLang={currentLang} langs={langs} setLang={setLang} />
            </LanguageWrapper> */}
            {/* {profile && <Avatar profile={profile} />} */}
          </Flex>
        )}
      </StyledNav>
      <BodyWrapper>
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role='presentation' />
      </BodyWrapper>
    </Wrapper>
  )
}

export default Menu
