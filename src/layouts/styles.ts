import styled, { injectGlobal } from "styled-components"
import { darken, lighten } from "polished"

const themeColor = "rgb(44, 62, 80)"
const textColor = "rgb(236, 240, 241)"

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html, body {
    background-color: ${darken(0.05, themeColor)};
    font: 16px Roboto, sans-serif;
    color: ${textColor};
    padding: 0;
    margin: 0;
    line-height: 1.3;
  }

  a {
    color: inherit;
  }

  a:hover {
    text-decoration: none;
  }

  p {
    margin: 1.2rem 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 300;
    margin: 0.75rem 0;
  }

  h1 { font-size: 2.4rem; }
  h2 { font-size: 1.8rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }
  h5 { font-size: 1.1rem; }
  h6 { font-size: 1rem; }
`

export const PageWrapper = styled.main`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  background-color: ${lighten(0.025, themeColor)};
  align-self: stretch;
  padding: 0.6rem 1rem;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const Title = styled.section`
  margin: 0.5rem;

  h1,
  h2 {
    margin: 0rem;
  }

  h1 {
    font-size: 2.4rem;
  }

  h2 {
    font-size: 1.2rem;
    opacity: 0.5;
  }
`

export const NavLinks = styled.nav`
  align-self: center;

  h5 {
    display: inline-block;
    font-weight: 400;
  }

  a {
    padding: 0.8rem;
  }
`

export const ContentWrapper = styled.section`
  background-color: ${themeColor};

  align-self: center;
  flex-grow: 1;
  width: 50rem;
  max-width: calc(100vw - 2rem);

  padding: 1rem;
`
