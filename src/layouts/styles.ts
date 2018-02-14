import styled, { injectGlobal } from "styled-components"
import { darken, lighten } from "polished"
import "./fonts.css"

// const backgroundImageUrl = require("../assets/bg1.jpg")

const headerFont = "Roboto Condensed, sans-serif"
const bodyFont = "Noto Sans, sans-serif"

const themeColor = "rgb(44, 62, 80)"
const textColor = "rgb(236, 240, 241)"

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html, body {
    font: 17px ${bodyFont};
    color: ${textColor};
    line-height: 1.4;
    letter-spacing: 0.5px;

    padding: 0;
    margin: 0;

    background-color: ${darken(0.1, themeColor)};

    /* background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed; */
  }

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);

  }

  a:hover {
    border: none;
  }

  p {
    margin: 1.2rem 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${headerFont};
    font-weight: 300;
    margin: 0.75rem 0;
  }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.6rem; }
  h3 { font-size: 1.35rem; }
  h4 { font-size: 1.15rem; }
  h5 { font-size: 1.05rem; }
  h6 { font-size: 1rem; }

  strong {
    font-weight: 500;
  }

  fieldset {
    border: none;
  }

  input, button, textarea {
    font: inherit;
    font-size: 0.9rem;
    color: inherit;
    background: ${darken(0.1, themeColor)};
    border: none;
    padding: 0.4rem 0.75rem;
  }
`

export const PageWrapper = styled.main`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  > * {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

export const Header = styled.header`
  background-color: ${lighten(0.025, themeColor)};
  align-self: center;
  width: 50rem;
  max-width: calc(100vw - 2rem);

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const Title = styled.section`
  margin: 0.6rem 0 0.6rem;

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

  h5:not(:first-child) {
    margin-left: 1.25rem;
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
