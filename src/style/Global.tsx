import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from 'toolkit/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
* {
  font-family: 'Osiris !important';
}
iframe {
  display: none;
}
body {
  background-color: black };

  img {
    height: auto;
    //max-width: 100%;
  }

  .osiris {
    font-family: 'Osiris !important'
  }

  .mobile {
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: flex;
    }
  }





  .box-shadow {
    box-shadow: 0 0 3px black
  }



  a {
    // color: inherit !important;
    text-decoration: none !important;
  }
  button:focus {
    outline: none !important;
  }
}
`

export default GlobalStyle
