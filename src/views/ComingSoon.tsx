import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from 'toolkit/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;  
  justify-content: center;  
`

const ComingSoon = () => {
  // const { t } = useTranslation()

  return (
    <div>
      <StyledNotFound>      
        <img src='images/home/newlogo.svg' style={{ width: '15%',marginTop: '50px' }} alt='Comingsoon' />        
        <Text style={{ color: 'white', fontSize: '38px'}}>Phase Two</Text>
        <Text style={{ color: 'white', fontSize: '38px'}}>Coming Soon</Text>
        {/* <Button as="a" href="/" scale="sm">
          {t('Back Home')}
        </Button> */}
      </StyledNotFound>
    </div>
  )
}

export default ComingSoon
